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

type Status = "idle" | "sending" | "sent" | "fallback";

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

export default function EnquiryForm({ planId, planTitle, luxury = false, source, id: idProp, className }: EnquiryFormProps) {
    const id = idProp ?? `enquiry-${source}`;
    const [status, setStatus] = useState<Status>("idle");
    const [summary, setSummary] = useState("");
    const [firstName, setFirstName] = useState("");
    const started = useRef(false);

    const hotelOptions = luxury ? HOTEL_TIERS_LUXURY : HOTEL_TIERS_STANDARD;

    const onFirstInteraction = () => {
        if (started.current) return;
        started.current = true;
        trackEvent("enquiry_start", { source, plan_id: planId });
    };

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
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

        const lines = [
            `Hi Guide India Tours! I'd like ${luxury ? "a private proposal" : "a quote"}${planTitle ? ` for "${planTitle}"` : ""}.`,
            "",
            `• Name: ${payload.name}`,
            payload.country && `• From: ${payload.country}`,
            payload.travelDate && `• Arrival: ${payload.travelDate}${payload.flexibleDates ? " (flexible)" : ""}`,
            `• Travellers: ${payload.adults} adult(s)${payload.children ? `, ${payload.children} child(ren)` : ""}`,
            payload.hotelTier && `• Hotels: ${payload.hotelTier}`,
            payload.message && `• Notes: ${payload.message}`,
            `• Email: ${payload.email}`,
        ].filter((l): l is string => typeof l === "string");
        setSummary(lines.join("\n"));
        setFirstName(payload.name.split(" ")[0] ?? "");
        setStatus("sending");

        try {
            const res = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(String(res.status));
            trackEvent("generate_lead", { source, plan_id: planId, luxury });
            setStatus("sent");
            form.reset();
        } catch (err) {
            trackEvent("enquiry_error", { source, plan_id: planId });
            setStatus("fallback");
        }
    }

    const waHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent(summary || `Hi! I'd like a quote${planTitle ? ` for "${planTitle}"` : ""}.`)}`;
    const mailHref = `${siteConfig.mailtoHref}?subject=${encodeURIComponent(`Tour enquiry${planTitle ? ` — ${planTitle}` : ""}`)}&body=${encodeURIComponent(summary)}`;

    if (status === "sent" || status === "fallback") {
        const sent = status === "sent";
        return (
            <div id={id} className={cn("rounded-3xl bg-white p-6 md:p-10 text-center shadow-sm border border-gray-100", className)} role="status">
                <div className={cn("mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full", sent ? "bg-green-50" : "bg-gold-500/20")}>
                    {sent ? <Check className="h-7 w-7 text-green-600" /> : <Send className="h-6 w-6 text-maroon-600" />}
                </div>
                <h3 className="mb-3 text-2xl font-display font-bold text-gray-900">
                    {sent ? `Thank you${firstName ? `, ${firstName}` : ""} — request received` : "One more step to reach us"}
                </h3>
                <p className="mx-auto mb-6 max-w-md text-gray-600 font-light leading-relaxed">
                    {sent
                        ? "We will email you a written quote within 2 hours. For the fastest reply, send the same details on WhatsApp — it opens with your trip already filled in."
                        : "We couldn't send this automatically. Please send it on WhatsApp or email — your trip details are already filled in, so it takes one tap."}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("whatsapp_click", { source, plan_id: planId, after_form: true })}
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#128C7E]"
                    >
                        <WhatsAppIcon className="h-5 w-5" /> Continue on WhatsApp
                    </a>
                    {!sent && (
                        <a href={mailHref} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-bold text-gray-800 hover:border-maroon-600">
                            <Mail className="h-5 w-5" /> Send by email
                        </a>
                    )}
                </div>
            </div>
        );
    }

    return (
        <form
            id={id}
            onSubmit={onSubmit}
            onFocus={onFirstInteraction}
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
                    <input id={`${id}-name`} name="name" required minLength={2} maxLength={100} autoComplete="name" className={fieldClass} placeholder="Full name" />
                </div>
                <div>
                    <label htmlFor={`${id}-email`} className={labelClass}>Email *</label>
                    <input id={`${id}-email`} name="email" type="email" required maxLength={200} autoComplete="email" className={fieldClass} placeholder="you@example.com" />
                </div>
                <div>
                    <label htmlFor={`${id}-phone`} className={labelClass}>WhatsApp / phone</label>
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

            <button
                type="submit"
                disabled={status === "sending"}
                className="mt-7 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-maroon-600 px-6 py-4 text-lg font-display font-bold text-white shadow-xl transition-colors hover:bg-black disabled:opacity-60"
            >
                <Send className="h-5 w-5" />
                {status === "sending" ? "Sending…" : luxury ? "Request my private proposal" : "Get my free quote"}
            </button>
            <p className="mt-4 text-center text-sm text-gray-500 font-light">
                Free, no obligation. Written quote within 2 hours. We never share your details.
            </p>
        </form>
    );
}
