"use client";

import { useEffect } from "react";

type Gtag = (command: "event", name: string, params: Record<string, unknown>) => void;

const channelFor = (href: string): string | null => {
    if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) return "whatsapp";
    if (href.startsWith("tel:")) return "phone";
    if (href.startsWith("mailto:")) return "email";
    return null;
};

/** Report one contact click to GA4. Safe to call when analytics is not loaded. */
export const trackContact = (channel: string, label = "") => {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag !== "function") return;
    gtag("event", "contact_click", {
        channel,
        link_text: label.trim().slice(0, 80),
        page_path: window.location.pathname,
    });
};

/**
 * One listener for the whole site: any click on a WhatsApp, phone or email link
 * is sent to GA4 as `contact_click` with the channel and the page it came from.
 * Mark `contact_click` as a key event in GA4 to see which pages produce enquiries.
 */
export default function ContactClickTracker() {
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
            if (!a) return;
            const channel = channelFor(a.getAttribute("href") || "");
            if (channel) trackContact(channel, a.getAttribute("aria-label") || a.textContent || "");
        };
        document.addEventListener("click", onClick, { capture: true });
        return () => document.removeEventListener("click", onClick, { capture: true });
    }, []);
    return null;
}
