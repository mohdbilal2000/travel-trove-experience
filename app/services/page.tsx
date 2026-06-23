"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Car, Bed, CalendarRange, Users, MapPin, Coffee,
    Plane, Camera, ShieldCheck, Globe, CreditCard, PhoneCall,
    Clock, Award, Umbrella, ArrowRight, Check, Sparkles
} from "lucide-react";
import Image from "next/image";
import RelatedPages from "@/components/shared/RelatedPages";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const servicesData = [
    {
        id: 1,
        title: "Exclusive Fleet",
        subtitle: "Luxury Transportation",
        description: "Experience effortless travel with our private chauffeur-driven fleet. From executive sedans to luxury multi-purpose vans, we ensure your journey between iconic monuments is as comfortable as the destinations themselves.",
        features: [
            "Professional, multi-lingual chauffeurs",
            "Latest model premium AC vehicles",
            "Complimentary WiFi & refreshments",
            "Flexible door-to-door transfers",
            "Hassle-free luggage handling"
        ],
        image: "/images/services/transport/dextar-vision-X5wjk_yD9IA-unsplash.jpg",
        icon: Car
    },
    {
        id: 2,
        title: "Curated Stays",
        subtitle: "Accommodation Selection",
        description: "Rest in the grandeur of India's finest properties. We partner exclusively with 5-star hotels and historic heritage palaces that offer authentic charm combined with world-class hospitality.",
        features: [
            "Handpicked heritage & palace hotels",
            "Prime locations near iconic landmarks",
            "Verified safety & hygiene standards",
            "Gourmet breakfast inclusions",
            "VIP room upgrades (subject to availability)"
        ],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
        icon: Bed
    },
    {
        id: 3,
        title: "Bespoke Routes",
        subtitle: "Custom Itineraries",
        description: "Your journey, your rules. Our travel architects craft personalized sequences that balance high-energy sightseeing with moments of quiet reflection and cultural discovery.",
        features: [
            "Personalized travel architecture",
            "Flexible pacing and sequence",
            "Exclusive access to hidden gems",
            "Special interest modules (Photography, Culinary)",
            "One-on-one expert consultations"
        ],
        image: "/images/services/itineraries/getty-images-KJMGJdloTCQ-unsplash.jpg",
        icon: CalendarRange
    },
    {
        id: 4,
        title: "Historian Guides",
        subtitle: "Expert Storytelling",
        description: "Our guides are more than narrators—they are guardians of history. Government-authorized and deeply knowledgeable, they transform every monument visit into a vivid step back in time.",
        features: [
            "Govt-licensed heritage experts",
            "Multilingual fluency (Global languages)",
            "Exclusive historical insights",
            "Skip-the-line monument logistics",
            "Candid local perspectives"
        ],
        image: "/images/services/guide/molly-the-cat-zxoRWz2G8Dc-unsplash.jpg",
        icon: Users
    }
];

const additionalServices = [
    { title: "VIP Transfers", icon: Plane },
    { title: "Photography", icon: Camera },
    { title: "24/7 Concierge", icon: ShieldCheck },
    { title: "Food Tours", icon: Coffee },
    { title: "Secure Pay", icon: CreditCard },
    { title: "Expert Guides", icon: Users },
    { title: "Hotel Access", icon: Bed },
    { title: "Flexible Dates", icon: Clock },
    { title: "Insurance", icon: Umbrella },
    { title: "Group Plans", icon: Globe }
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-ivory-100">
            {/* Minimal High-End Hero */}
            <section className="relative pt-44 pb-32 overflow-hidden bg-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Badge className="bg-maroon-600/10 text-maroon-600 border-none mb-8 px-6 py-2 uppercase tracking-[0.3em] text-[9px] font-black">
                            Our Portfolio
                        </Badge>
                        <h1 className="text-6xl md:text-8xl font-display font-bold text-gray-900 mb-8 leading-tight tracking-tighter">
                            Seamless <span className="text-maroon-600">Excellence.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                            Beyond transportation and hotels—we manage every pulse of your journey to ensure absolute comfort and authentic discovery.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-maroon-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </section>

            {/* Alternating Service Blocks */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="space-y-16 md:space-y-32 lg:space-y-48">
                        {servicesData.map((service, index) => (
                            <div key={service.id} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className={cn("relative group", index % 2 === 1 ? "lg:order-2" : "")}
                                >
                                    <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                                        <Image
                                            src={service.image}
                                            alt={`${service.title} - Guide India Tours`}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            quality={85}
                                        />
                                        <div className="absolute inset-0 bg-black/20" />
                                    </div>
                                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white rounded-3xl shadow-2xl p-8 hidden lg:flex flex-col items-center justify-center text-center">
                                        <service.icon className="w-12 h-12 text-maroon-600 mb-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Verified Service</span>
                                    </div>
                                    {/* Abstract Decor */}
                                    <div className={cn(
                                        "absolute -top-8 -left-8 w-32 h-32 border-8 border-gray-100 rounded-full -z-10",
                                        index % 2 === 1 ? "left-auto -right-8" : ""
                                    )} />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className={cn(index % 2 === 1 ? "lg:order-1" : "")}
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-0.5 bg-maroon-600" />
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-maroon-600">{service.subtitle}</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8 leading-tight">{service.title}</h2>
                                    <p className="text-lg text-gray-500 font-light leading-relaxed mb-10">{service.description}</p>

                                    <div className="space-y-6 mb-12">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-5">
                                                <div className="w-6 h-6 rounded-full bg-maroon-600/10 flex items-center justify-center shrink-0">
                                                    <Check className="w-3 h-3 text-maroon-600" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-700 tracking-tight">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button asChild className="rounded-2xl px-12 py-8 bg-maroon-600 hover:bg-black text-lg font-bold shadow-xl shadow-maroon-600/20 transition-all">
                                        <Link href="/contact" className="flex items-center gap-3">
                                            Experience This <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </Button>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid of Extras */}
            <section className="py-16 md:py-24 lg:py-40 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <Sparkles className="w-10 h-10 text-gold-500 mx-auto mb-6" />
                        <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Complete Suite</h2>
                        <p className="text-gray-500 uppercase tracking-widest text-[10px] font-black">Complementary services for a total experience</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
                        {additionalServices.map((s, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 text-gray-400 mb-6 flex items-center justify-center group-hover:bg-maroon-600 group-hover:text-white transition-all duration-500">
                                    <s.icon size={24} />
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm tracking-tight">{s.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section className="py-16 md:py-24 lg:py-40 bg-white">
                <div className="container mx-auto px-4">
                    <div className="bg-black rounded-3xl p-12 md:p-24 relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-maroon-600/20 blur-[100px]" />
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight">Elite Travel <br />Support <span className="text-gold-500">24/7.</span></h2>
                            <p className="text-lg text-white/60 mb-16 font-light">Whether you need a last-minute flight adjustment or a specialized culinary reservation, our elite support team is always standing by.</p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Button asChild size="lg" className="bg-white text-black hover:bg-maroon-600 hover:text-white py-10 px-16 rounded-2xl text-2xl font-bold shadow-2xl transition-all h-auto">
                                    <Link href="/contact">Book Inquiry</Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-black py-10 px-16 rounded-2xl text-2xl font-bold h-auto transition-all">
                                    <Link href="tel:+918979810991" className="flex items-center gap-3">
                                        <PhoneCall className="w-6 h-6" /> Call Agent
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <RelatedPages
                title="Explore More"
                pages={[
                    {
                        href: "/plans",
                        title: "All Tour Packages",
                        description: "Browse our curated collection of tour packages across India's Golden Triangle and beyond.",
                    },
                    {
                        href: "/guide-booking",
                        title: "Book a Guide",
                        description: "Reserve a government-authorized heritage guide for a personalized monument experience.",
                    },
                    {
                        href: "/contact",
                        title: "Contact Us",
                        description: "Get in touch with our travel architects to plan your perfect Indian journey.",
                    },
                ]}
            />
        </main>
    );
}
