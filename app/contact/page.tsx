"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Mail, ArrowRight, ShieldCheck, PhoneCall, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import RelatedPages from "@/components/shared/RelatedPages";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { homeFaqs } from "@/data/homeFaqs";
import TripPlanner from "@/components/home/TripPlanner";
import { type PlannerState } from "@/lib/planner";

export default function ContactPage() {
    const router = useRouter();

    // Same planner state shape and wiring as the homepage (PlannerSection).
    const [planner, setPlanner] = useState<PlannerState>({
        adults: 1,
        children: 0,
        days: null,
        cities: [],
        transport: "",
        startDate: "",
    });

    const updatePlanner = useCallback((patch: Partial<PlannerState>) => {
        setPlanner((prev) => ({ ...prev, ...patch }));
    }, []);

    const browseTours = useCallback(() => {
        router.push("/plans");
    }, [router]);

    return (
        <main className="min-h-screen bg-ivory-100">
            {/* Minimal High-End Hero */}
            <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden bg-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Badge className="bg-maroon-600/10 text-maroon-600 border-none mb-6 px-5 py-1.5 uppercase tracking-[0.3em] text-[11px] font-bold">
                            Concierge Access
                        </Badge>
                        <h1 className="font-display font-light leading-[1.05] tracking-wide text-4xl sm:text-5xl lg:text-6xl text-royal-800 mb-5">
                            Let&apos;s Talk <span className="text-maroon-600">Adventure</span>
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
                            Whether you&apos;re ready to book or just starting to dream, our travel architects are here to
                            guide your every step — with a reply on WhatsApp within 2 hours.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="pb-16 md:pb-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                        {/* Info Column */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-royal-800 to-royal-900 px-5 sm:px-7 py-4 flex items-center gap-3 text-white">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <PhoneCall size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-semibold">Immediate Help</h3>
                                        <p className="text-[11px] text-white/70 uppercase tracking-widest font-medium">Global Support · 24/7</p>
                                    </div>
                                </div>
                                <div className="p-5 sm:p-7 space-y-3">
                                    <a href="tel:+919410000991" className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-maroon-600/40 hover:bg-maroon-50/30 transition-colors">
                                        <span>
                                            <span className="block text-xs text-gray-500">Call us</span>
                                            <span className="block text-base font-bold text-maroon-600">+91 94100 00991</span>
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-maroon-600 flex-shrink-0" />
                                    </a>
                                    <a href="https://wa.me/918979810991" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-maroon-600/40 hover:bg-maroon-50/30 transition-colors">
                                        <span>
                                            <span className="block text-xs text-gray-500">WhatsApp</span>
                                            <span className="block text-base font-bold text-maroon-600">+91 89798 10991</span>
                                        </span>
                                        <WhatsAppIcon className="w-5 h-5 text-[#25D366] flex-shrink-0" />
                                    </a>
                                    <a href="mailto:info@guideindiatours.com" className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-maroon-600/40 hover:bg-maroon-50/30 transition-colors">
                                        <span className="min-w-0">
                                            <span className="block text-xs text-gray-500">Email concierge</span>
                                            <span className="block text-base font-bold text-gray-900 truncate">info@guideindiatours.com</span>
                                        </span>
                                        <Mail className="w-4 h-4 text-maroon-600 flex-shrink-0 ml-2" />
                                    </a>
                                    <p className="text-xs text-gray-500 pt-1">
                                        Open 24/7 &middot; India Standard Time (UTC+5:30)
                                    </p>
                                </div>
                            </div>

                            <div className="bg-royal-800 rounded-3xl shadow-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-maroon-600/30 to-transparent" />
                                <div className="relative z-10 text-white p-5 sm:p-7">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-xl font-semibold">Agra Office</h3>
                                            <p className="text-[11px] text-white/60 uppercase tracking-widest font-medium">Visit us in person</p>
                                        </div>
                                    </div>
                                    <address className="not-italic text-base text-white/75 leading-relaxed font-light mb-5">
                                        31/84A, Jangjeet Nagar,<br />
                                        Shamsabad Road, Agra 282001, Uttar Pradesh, India
                                    </address>
                                    <a
                                        href="https://maps.google.com/?q=Guide+India+Tours+Agra"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-gold-500 hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        Get Directions <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-5 bg-white border border-gray-200 rounded-2xl flex flex-col items-center text-center">
                                    <ShieldCheck className="w-7 h-7 text-maroon-600 mb-2" />
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">100% Secure</span>
                                </div>
                                <div className="p-5 bg-white border border-gray-200 rounded-2xl flex flex-col items-center text-center">
                                    <Headphones className="w-7 h-7 text-maroon-600 mb-2" />
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">Expert Support</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Column — the exact same trip planner as the homepage */}
                        <div className="lg:col-span-7">
                            <TripPlanner state={planner} onChange={updatePlanner} onBrowseTours={browseTours} />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Preview */}
            <section className="py-14 md:py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-10 text-center">
                        Quick Answers Before You <span className="text-maroon-600">Write</span>
                    </h2>
                    <div className="space-y-4">
                        {homeFaqs.slice(0, 4).map((faq) => (
                            <details key={faq.question} className="group bg-ivory-100 rounded-2xl p-6">
                                <summary className="cursor-pointer font-bold text-gray-900 text-lg list-none flex justify-between items-center gap-4">
                                    {faq.question}
                                    <span aria-hidden="true" className="text-maroon-600 transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                                </summary>
                                <p className="text-gray-600 font-light leading-relaxed mt-4">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/faq" className="text-sm font-bold text-maroon-600 hover:text-black uppercase tracking-widest">
                            See all FAQs →
                        </Link>
                    </div>
                </div>
            </section>

            <RelatedPages
                title="Explore More"
                pages={[
                    {
                        href: "/plans",
                        title: "Browse Tours",
                        description: "Explore our curated tour packages for the Golden Triangle and beyond.",
                    },
                    {
                        href: "/guide-booking",
                        title: "Book a Guide",
                        description: "Reserve a government-authorized heritage guide for your next monument visit.",
                    },
                    {
                        href: "/faq",
                        title: "Frequently Asked Questions",
                        description: "Find answers to common questions about bookings, guides, and travel logistics.",
                    },
                ]}
            />
        </main>
    );
}
