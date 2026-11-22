/**
 * Conversion tracking. Safe no-op when GA4 / Clarity are not loaded (they only
 * load when NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_CLARITY_ID are set), so call sites
 * never need to guard.
 */
type GtagFn = (command: "event", name: string, params?: Record<string, unknown>) => void;
type ClarityFn = (command: "event", name: string) => void;

declare global {
    interface Window {
        gtag?: GtagFn;
        clarity?: ClarityFn;
    }
}

export type TrackedEvent =
    | "whatsapp_click"
    | "call_click"
    | "enquiry_start"
    | "generate_lead"
    | "enquiry_error";

export function trackEvent(name: TrackedEvent, params: Record<string, unknown> = {}): void {
    if (typeof window === "undefined") return;
    try {
        window.gtag?.("event", name, params);
        window.clarity?.("event", name);
    } catch {
        /* analytics must never break the page */
    }
}
