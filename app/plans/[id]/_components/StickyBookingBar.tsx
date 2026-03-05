"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

interface StickyBookingBarProps {
    planTitle: string;
    planPrice: string;
}

export default function StickyBookingBar({ planTitle, planPrice }: StickyBookingBarProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past 600px (roughly past the hero)
            setIsVisible(window.scrollY > 600);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const whatsappMessage = encodeURIComponent(
        `Hi, I'm interested in booking the "${planTitle}" tour. Could you share more details?`
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
                        <div className="flex-shrink-0">
                            <p className="text-xs font-black uppercase tracking-widest text-gray-500">From</p>
                            <p className="text-xl font-black text-gray-900">{planPrice}</p>
                            <p className="text-xs text-gray-500">per person</p>
                        </div>
                        <div className="flex gap-2">
                            <a
                                href="tel:+919410000991"
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200"
                            >
                                <Phone className="w-4 h-4" />
                                Call
                            </a>
                            <a
                                href={`https://wa.me/918979810991?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] active:scale-95 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg transition-all duration-200"
                            >
                                <WhatsAppIcon className="w-4 h-4" />
                                Book Now
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
