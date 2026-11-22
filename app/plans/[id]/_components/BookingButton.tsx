"use client";

import { ArrowDown } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { siteConfig } from "@/lib/siteConfig";
import { trackEvent } from "@/lib/track";
import { cn } from "@/lib/utils";

interface BookingButtonProps {
    planTitle: string;
    planId: number;
    planDuration: string;
    luxury?: boolean;
    className?: string;
}

/**
 * Primary action scrolls to the on-page enquiry form (works for visitors without
 * WhatsApp, captures email + dates). WhatsApp stays one tap away as the secondary
 * action for people who prefer chat.
 */
export default function BookingButton({ planTitle, planId, planDuration, luxury = false, className }: BookingButtonProps) {
    const message = `Hi! I'm interested in the "${planTitle}" tour.\n\nTour ID: ${planId}\nDuration: ${planDuration}\n\nPlease share a quote and more details.`;
    const whatsappUrl = `${siteConfig.whatsappHref}?text=${encodeURIComponent(message)}`;

    return (
        <div className="space-y-3">
            <a
                href="#enquire"
                onClick={() => trackEvent("enquiry_start", { source: "plan_cta", plan_id: planId })}
                className={cn(
                    "flex items-center justify-center gap-2 text-center no-underline",
                    className
                )}
            >
                {luxury ? "Request Private Proposal" : "Check Price & Availability"}
                <ArrowDown className="w-5 h-5" />
            </a>
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "plan_sidebar", plan_id: planId })}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#25D366] px-6 py-3 font-bold text-[#128C7E] transition-colors hover:bg-[#25D366] hover:text-white"
            >
                <WhatsAppIcon className="w-5 h-5" />
                Chat on WhatsApp
            </a>
        </div>
    );
}
