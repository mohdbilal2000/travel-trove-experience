"use client";

import { FormEvent, useRef, useState } from "react";
import { Check, Mail, Send } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { siteConfig } from "@/lib/siteConfig";
import { trackEvent } from "@/lib/track";
import { cn } from "@/lib/utils";

interface EnquiryFormProps {
    /** Tour the visitor is looking at, when on a plan page. */
    planId?: number;
    planTitle?: string;
    /** Luxury wording + hotel-standard options. */
    luxury?: boolean;
    /** Where the lead came from (shown in the email subject). */
    source: "plan" | "luxury-hub" | "contact";
    id?: string;
    className?: string;
}

type Channel = "whatsapp" | "email";
type Status = "idle" | "sending" | "sent-whatsapp" | "sent-email" | "email-fallback";

const HOTEL_TIERS_LUXURY = [
    "5-star hotels",
    "Heritage palace stays where available",
    "Mix of 5-star and heritage",
    "Not sure yet — advise me",
];
const HOTEL_TIERS_STANDARD = ["3–4 star", "5-star", "Heritage / boutique", "Not sure yet — advise me"];

const fieldClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-maroon-600 focus:outline-none focus:ring-2 focus:ring-maroon-600/20";
const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-widest text-gray-500";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * The visitor chooses how the enquiry reaches us: WhatsApp (opens our business chat
 * with the trip details filled in) or email (sent to our inbox). Neither channel
 * forces the other's contact detail, so nobody has to hand over an email just to
 * use WhatsApp, or a phone number just to use email.
 */
export default function EnquiryForm({ planId, planTitle, luxury = false, source, id: idProp, className }: EnquiryFormProps) {
    const id = idProp ?? `enquiry-${source}`;
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");
    const [summary, setSummary] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const started = useRef(false);

    const hotelOptions = luxury ? HOTEL_TIERS_LUXURY : HOTEL_TIERS_STANDARD;

    const onFirstInteraction = () => {
        if (started.current) return;
        started.current = true;
        trackEvent("enquiry_start", { source, plan_id: planId });
    };

    const waUrl = (text: string) => `${siteConfig.whatsappHref}?text=${encodeURIComponent(text)}`;
    const mailUrl = (text: string) =>
        `${siteConfig.mailtoHref}?subject=${encodeURIComponent(`Tour enquiry${planTitle ? ` — ${planTitle}` : ""}`)}&body=${encodeURIComponent(text)}`;

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
        const channel: Channel = submitter?.value === "email" ? "email" : "whatsapp";

        const data = new FormData(form);
        const val = (k: string) => String(data.get(k) ?? "").trim();
        const payload = {
            name: val("name"),
            email: val("email"),
            phone: val("phone"),
            country: val("country"),
            travelDate: val("travelDate"),
            flexibleDates: data.get("flexibleDates") === "on",
            adults: Number(val("adults")) || 2,
            children: Number(val("children")) || 0,
            hotelTier: val("hotelTier"),
            message: val("message"),
            company: val("company"), // honeypot
            planId,
            planTitle,
            source,
        };

        if (payload.name.length < 2) return setError("Please enter your name.");
        if (channel === "email" && !EMAIL_RE.test(payload.email)) return setError("Please enter a valid email address to send by email.");
        if (payload.email && !EMAIL_RE.test(payload.email)) return setError("That email address doesn't look right.");
        setError("");

        const text = [
            `Hi Guide India Tours! I'd like ${luxury ? "a private proposal" : "a quote"}${planTitle ? ` for "${planTitle}"` : ""}.`,
            "",
            `• Name: ${payload.name}`,
            payload.country && `• From: ${payload.country}`,
            payload.travelDate && `• Arrival: ${payload.travelDate}${payload.flexibleDates ? " (flexible)" : ""}`,
            `• Travellers: ${payload.adults} adult(s)${payload.children ? `, ${payload.children} child(ren)` : ""}`,
            payload.hotelTier && `• Hotels: ${payload.hotelTier}`,
            payload.message && `• Notes: ${payload.message}`,
            payload.email && `• Email: ${payload.email}`,
            payload.phone && `• Phone: ${payload.phone}`,
        ]
            .filter((l): l is string => typeof l === "string")
            .join("\n");
        setSummary(text);
        setFirstName(payload.name.split(" ")[0] ?? "");
        setEmail(payload.email);

        if (channel === "whatsapp") {
            // Open synchronously inside the click so mobile browsers don't treat it as a blocked popup.
            window.open(waUrl(text), "_blank", "noopener,noreferrer");
            trackEvent("generate_lead", { source, plan_id: planId, luxury, channel: "whatsapp" });
            trackEvent("whatsapp_click", { source, plan_id: planId, after_form: true });
            setStatus("sent-whatsapp");
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(String(res.status));
            trackEvent("generate_lead", { source, plan_id: planId, luxury, channel: "email" });
            setStatus("sent-email");
        } catch {
            // Server email not available: hand the visitor a ready-to-send email instead.
            trackEvent("enquiry_error", { source, plan_id: planId, channel: "email" });
            setStatus("email-fallback");
        }
    }

    const panelBase = cn("rounded-3xl bg-white p-6 md:p-10 text-center shadow-sm border border-gray-100", className);
    const waButton = (label: string) => (
        <a
            href={waUrl(summary)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { source, plan_id: planId, after_form: true })}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#128C7E]"
        >
            <WhatsAppIcon className="h-5 w-5" /> {label}
        </a>
    );
    const mailButton = (label: string) => (
        <a
            href={mailUrl(summary)}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-bold text-gray-800 hover:border-maroon-600"
        >
            <Mail className="h-5 w-5" /> {label}
        </a>
    );

    if (status === "sent-whatsapp") {
        return (
            <div id={id} className={panelBase} role="status">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="mb-3 text-2xl font-display font-bold text-gray-900">
                    WhatsApp is opening{firstName ? `, ${firstName}` : ""}
                </h3>
                <p className="mx-auto mb-6 max-w-md text-gray-600 font-light leading-relaxed">
                    Your trip details are already typed in — just tap <strong>Send</strong> in WhatsApp and we&apos;ll reply with your {luxury ? "private proposal" : "quote"}.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {waButton("Open WhatsApp again")}
                    {mailButton("Email it instead")}
                </div>
            </div>
        );
    }

    if (status === "sent-email") {
        return (
            <div id={id} className={panelBase} role="status">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="mb-3 text-2xl font-display font-bold text-gray-900">
                    Thank you{firstName ? `, ${firstName}` : ""} — request received
                </h3>
                <p className="mx-auto max-w-md text-gray-600 font-light leading-relaxed">
                    We&apos;ll email a written {luxury ? "proposal" : "quote"} to <strong>{email}</strong> within 2 hours. No WhatsApp needed.
                </p>
            </div>
        );
    }

    if (status === "email-fallback") {
        return (
            <div id={id} className={panelBase} role="status">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/20">
                    <Send className="h-6 w-6 text-maroon-600" />
                </div>
                <h3 className="mb-3 text-2xl font-display font-bold text-gray-900">One tap to send your email</h3>
                <p className="mx-auto mb-6 max-w-md text-gray-600 font-light leading-relaxed">
                    We couldn&apos;t send it from here. Tap below to open your email app with the details filled in, or write to us at{" "}
                    <a href={siteConfig.mailtoHref} className="font-bold text-maroon-600 underline underline-offset-2">{siteConfig.email}</a>.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {mailButton("Open my email app")}
                    {waButton("Use WhatsApp instead")}
                </div>
            </div>
        );
    }

    return (
        <form
            id={id}
            onSubmit={onSubmit}
            onFocus={onFirstInteraction}
            noValidate
            className={cn("rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10", className)}
        >
            {/* Honeypot — hidden from people and assistive tech */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label>
                    Company
                    <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor={`${id}-name`} className={labelClass}>Your name *</label>
                    <input id={`${id}-name`} name="name" required maxLength={100} autoComplete="name" className={fieldClass} placeholder="Full name" />
                </div>
                <div>
                    <label htmlFor={`${id}-email`} className={labelClass}>Email <span className="font-normal normal-case tracking-normal text-gray-400">(needed to reply by email)</span></label>
                    <input id={`${id}-email`} name="email" type="email" maxLength={200} autoComplete="email" className={fieldClass} placeholder="you@example.com" />
                </div>
                <div>
                    <label htmlFor={`${id}-phone`} className={labelClass}>WhatsApp / phone <span className="font-normal normal-case tracking-normal text-gray-400">(optional)</span></label>
                    <input id={`${id}-phone`} name="phone" type="tel" maxLength={40} autoComplete="tel" className={fieldClass} placeholder="+1 555 000 0000" />
                </div>
                <div>
                    <label htmlFor={`${id}-country`} className={labelClass}>Travelling from</label>
                    <input id={`${id}-country`} name="country" maxLength={80} autoComplete="country-name" className={fieldClass} placeholder="Country" />
                </div>
                <div>
                    <label htmlFor={`${id}-date`} className={labelClass}>Arrival date</label>
                    <input id={`${id}-date`} name="travelDate" type="date" className={fieldClass} />
                    <label className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" name="flexibleDates" className="h-4 w-4 accent-maroon-600" /> My dates are flexible
                    </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor={`${id}-adults`} className={labelClass}>Adults</label>
                        <select id={`${id}-adults`} name="adults" defaultValue="2" className={fieldClass}>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor={`${id}-children`} className={labelClass}>Children</label>
                        <select id={`${id}-children`} name="children" defaultValue="0" className={fieldClass}>
                            {Array.from({ length: 7 }, (_, i) => i).map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor={`${id}-hotel`} className={labelClass}>Hotel standard</label>
                    <select id={`${id}-hotel`} name="hotelTier" defaultValue={hotelOptions[hotelOptions.length - 1]} className={fieldClass}>
                        {hotelOptions.map((o) => (
                            <option key={o} value={o}>{o}</option>
                        ))}
                    </select>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor={`${id}-message`} className={labelClass}>Anything we should know?</label>
                    <textarea
                        id={`${id}-message`}
                        name="message"
                        rows={3}
                        maxLength={2000}
                        className={fieldClass}
                        placeholder={luxury ? "Occasion, special requests, must-see places, dietary needs…" : "Interests, mobility needs, special requests…"}
                    />
                </div>
            </div>

            <p className="mt-7 mb-3 text-center text-sm font-bold uppercase tracking-widest text-gray-500">
                How would you like to send this?
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
                <button
                    type="submit"
                    name="channel"
                    value="whatsapp"
                    disabled={status === "sending"}
                    className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[#128C7E] disabled:opacity-60"
                >
                    <WhatsAppIcon className="h-5 w-5" /> Send on WhatsApp
                </button>
                <button
                    type="submit"
                    name="channel"
                    value="email"
                    disabled={status === "sending"}
                    className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border-2 border-maroon-600 bg-white px-6 py-4 text-lg font-bold text-maroon-600 transition-colors hover:bg-maroon-600 hover:text-white disabled:opacity-60"
                >
                    <Mail className="h-5 w-5" /> {status === "sending" ? "Sending…" : "Send by email instead"}
                </button>
            </div>
            <p role="alert" className={cn("mt-4 text-center text-sm font-medium text-red-600", !error && "hidden")}>{error}</p>
            <p className="mt-4 text-center text-sm text-gray-500 font-light">
                Prefer not to use WhatsApp? Choose email — we&apos;ll reply there. Free, no obligation, and we only use your details to answer this enquiry.
            </p>
        </form>
    );
}
