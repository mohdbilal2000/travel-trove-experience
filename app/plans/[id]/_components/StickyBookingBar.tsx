"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { siteConfig } from "@/lib/siteConfig";
import { trackEvent } from "@/lib/track";

interface StickyBookingBarProps {
    planId: number;
    planTitle: string;
    /** Same label the page shows, e.g. "From $499 per adult" or "Custom quote". */
    priceLabel: string;
    luxury?: boolean;
}

export default function StickyBookingBar({ planId, planTitle, priceLabel, luxury = false }: StickyBookingBarProps) {
    const [pastHero, setPastHero] = useState(false);
    const [formInView, setFormInView] = useState(false);
    const isVisible = pastHero && !formInView;

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past 600px (roughly past the hero)
            setPastHero(window.scrollY > 600);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Hide the bar while the enquiry form is on screen so it never covers the submit button.
    useEffect(() => {
        const form = document.getElementById("enquire");
        if (!form || typeof IntersectionObserver === "undefined") return;
        const observer = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), { threshold: 0.05 });
        observer.observe(form);
        return () => observer.disconnect();
    }, []);

    // "From $499 per adult" is too wide for a phone bar: show "From $499" and put "per adult" below.
    const shortPrice = priceLabel.replace(/\s+per adult$/i, "");
    const perAdult = shortPrice !== priceLabel;

    const whatsappMessage = encodeURIComponent(
        `Hi, I'm interested in the "${planTitle}" tour. Could you share more details?`
    );

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3"
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <p className="text-lg font-black leading-tight text-gray-900 truncate">{shortPrice}</p>
                            <p className="text-xs text-gray-500">{perAdult ? "per adult · " : ""}quote in 2 hrs</p>
                        </div>
                        <div className="flex flex-shrink-0 gap-2">
                            <a
                                href={siteConfig.telHref}
                                aria-label="Call Guide India Tours"
                                onClick={() => trackEvent("call_click", { source: "plan_sticky", plan_id: planId })}
                                className="flex h-12 w-12 items-center justify-center bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 rounded-xl transition-all duration-200"
                            >
                                <Phone className="w-5 h-5" />
                            </a>
                            <a
                                href={`${siteConfig.whatsappHref}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Chat on WhatsApp"
                                onClick={() => trackEvent("whatsapp_click", { source: "plan_sticky", plan_id: planId })}
                                className="flex h-12 w-12 items-center justify-center bg-[#25D366] hover:bg-[#128C7E] active:scale-95 text-white rounded-xl shadow-lg transition-all duration-200"
                            >
                                <WhatsAppIcon className="w-5 h-5" />
                            </a>
                            <a
                                href="#enquire"
                                onClick={() => trackEvent("enquiry_start", { source: "plan_sticky", plan_id: planId })}
                                className="flex min-h-[48px] items-center bg-maroon-600 hover:bg-black active:scale-95 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-lg transition-all duration-200"
                            >
                                {luxury ? "Get Proposal" : "Get Quote"}
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
