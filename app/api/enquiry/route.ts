import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { siteConfig } from "@/lib/siteConfig";

export const runtime = "nodejs";

/**
 * Tour enquiry endpoint.
 *
 * Delivery needs SMTP credentials in the Vercel project env (none are set by
 * default, so until then the endpoint answers 503 and the form falls back to
 * WhatsApp/email — the lead is never silently dropped):
 *   SMTP_HOST, SMTP_PORT (465 = TLS, else STARTTLS), SMTP_USER, SMTP_PASS
 *   ENQUIRY_TO   optional, defaults to info@guideindiatours.com
 *   SMTP_FROM    optional, defaults to SMTP_USER
 * A Gmail account with an app password works (host smtp.gmail.com, port 465).
 */

const enquirySchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().max(40).optional().default(""),
    country: z.string().trim().max(80).optional().default(""),
    travelDate: z.string().trim().max(40).optional().default(""),
    flexibleDates: z.boolean().optional().default(false),
    adults: z.coerce.number().int().min(1).max(40).default(2),
    children: z.coerce.number().int().min(0).max(40).default(0),
    hotelTier: z.string().trim().max(80).optional().default(""),
    message: z.string().trim().max(2000).optional().default(""),
    planId: z.coerce.number().int().optional(),
    planTitle: z.string().trim().max(200).optional().default(""),
    source: z.string().trim().max(60).optional().default("website"),
    // Honeypot: real visitors never see or fill this field.
    company: z.string().optional().default(""),
});

type Enquiry = z.infer<typeof enquirySchema>;

// Best-effort per-instance throttle (serverless instances are short-lived, so this
// only blunts bursts; the honeypot and zod limits do the rest).
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function throttled(ip: string): boolean {
    const now = Date.now();
    const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    hits.push(now);
    recent.set(ip, hits);
    return hits.length > MAX_PER_WINDOW;
}

const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const line = (label: string, value: string | number | undefined) =>
    value === undefined || value === "" ? null : `${label}: ${value}`;

function toLines(e: Enquiry): string[] {
    return [
        line("Name", e.name),
        line("Email", e.email),
        line("Phone / WhatsApp", e.phone),
        line("Country", e.country),
        line("Tour", e.planTitle && `${e.planTitle}${e.planId ? ` (#${e.planId})` : ""}`),
        line("Travel date", e.travelDate && `${e.travelDate}${e.flexibleDates ? " (flexible)" : ""}`),
        line("Travellers", `${e.adults} adult(s)${e.children ? `, ${e.children} child(ren)` : ""}`),
        line("Hotel standard", e.hotelTier),
        line("Message", e.message),
        line("Source", e.source),
    ].filter((l): l is string => l !== null);
}

export async function POST(request: NextRequest) {
    let parsed: Enquiry;
    try {
        parsed = enquirySchema.parse(await request.json());
    } catch {
        return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    // Bots fill the honeypot — pretend success so they don't retry.
    if (parsed.company) return NextResponse.json({ success: true });

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (throttled(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO, SMTP_FROM } = process.env;
    const lines = toLines(parsed);

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        // Not configured: keep the lead in the runtime logs and tell the client to use WhatsApp/email.
        console.error("[enquiry] SMTP not configured — lead not emailed:\n" + lines.join("\n"));
        return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }

    try {
        const port = Number(SMTP_PORT) || 465;
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port,
            secure: port === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
        });

        const subject = `${parsed.source === "luxury-hub" ? "[LUXURY] " : ""}Tour enquiry — ${parsed.planTitle || "general"} — ${parsed.name}`;
        await transporter.sendMail({
            from: `"${siteConfig.name} website" <${SMTP_FROM || SMTP_USER}>`,
            to: ENQUIRY_TO || siteConfig.email,
            replyTo: `"${parsed.name.replace(/"/g, "")}" <${parsed.email}>`,
            subject,
            text: lines.join("\n"),
            html: `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${lines
                .map((l) => {
                    const [k, ...rest] = l.split(": ");
                    return `<tr><td><b>${esc(k)}</b></td><td>${esc(rest.join(": "))}</td></tr>`;
                })
                .join("")}</table>`,
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[enquiry] send failed:", error, "\n" + lines.join("\n"));
        return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
}
