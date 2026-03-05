"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Check,
    ChevronRight,
    Shield,
    Award,
    Globe,
    MapPin,
    Clock,
    Users,
    Compass,
    History,
    Heart,
    ArrowRight
} from "lucide-react";
import OptimizedImage from "@/components/shared/OptimizedImage";
import RelatedPages from "@/components/shared/RelatedPages";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const guideNetworkStats = [
    {
        icon: Users,
        title: "Elite Network",
        description: "15+ professional, government-approved specialists."
    },
    {
        icon: Award,
        title: "Civic Honor",
        description: "Ministry of Tourism certified & background verified."
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "Fluency in 8+ international languages."
    }
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Visual Narrative Hero */}
            <section className="relative pt-44 pb-32 overflow-hidden bg-ivory-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Badge className="bg-maroon-600/10 text-maroon-600 border-none mb-8 px-6 py-2 uppercase tracking-[0.3em] text-[9px] font-black">
                                Since 2004
                            </Badge>
                            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-gray-900 mb-8 leading-[0.9] tracking-tighter">
                                Heritage. <br />Trust. <br /><span className="text-maroon-600">Excellence.</span>
                            </h1>
                            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-lg">
                                We are the local guardians of India's Golden Triangle heritage, dedicated to presenting history through a lens of absolute truth and luxury.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl rotate-2">
                                <OptimizedImage
                                    src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
                                    alt="About Hero"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center p-6 text-white -rotate-6">
                                <span className="text-4xl font-black mb-1">12+</span>
                                <span className="text-xs font-bold uppercase tracking-widest leading-none">Years of <br />Guiding</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-maroon-600/5 -z-10" />
            </section>

            {/* Core Narrative */}
            <section className="py-16 md:py-24 lg:py-40">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        <div className="lg:col-span-5">
                            <h2 className="text-sm font-black uppercase text-maroon-600 tracking-[0.3em] mb-8">Our DNA</h2>
                            <h3 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
                                From Local Roots to <span className="text-gray-400">Global Standards.</span>
                            </h3>
                        </div>
                        <div className="lg:col-span-7 space-y-8">
                            <p className="text-xl text-gray-600 leading-relaxed font-light">
                                Founded in the shadows of the Taj Mahal, Guide India Tours began as a small collective of history students and local storytellers who were tired of the generic tourism industry. We wanted to offer something raw, authentic, and historically accurate.
                            </p>
                            <p className="text-lg text-gray-500 leading-relaxed font-light">
                                Today, we have evolved into the premier choice for luxury travelers, luxury buses, and individual heritage seekers. While our scale has grown, our methodology remains intimate. Every itinerary is still vetted by our local regional experts.
                            </p>
                            <div className="flex flex-wrap gap-8 pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-maroon-600">
                                        <History size={24} />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-500">Authentic Lineage</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-maroon-600">
                                        <Heart size={24} />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-500">Passion Driven</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guide Network Grid */}
            <section className="py-16 md:py-24 lg:py-40 bg-gray-50">
                <div className="container mx-auto px-4 text-center mb-24">
                    <h2 className="text-5xl font-display font-bold text-gray-900 mb-6">Built on Expertise.</h2>
                    <p className="text-gray-500 uppercase tracking-[0.2em] text-xs font-black">Our intellectual capital</p>
                </div>

                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {guideNetworkStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-12 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 group"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center mb-10 text-maroon-600 group-hover:bg-maroon-600 group-hover:text-white transition-all duration-500">
                                    <stat.icon size={32} />
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4">{stat.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{stat.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Multi-Image Aesthetic Block */}
            <section className="py-16 md:py-24 lg:py-40">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[700px]">
                        <div className="md:col-span-8 rounded-3xl overflow-hidden shadow-2xl relative order-2 md:order-1">
                            <OptimizedImage
                                src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2070&auto=format&fit=crop"
                                alt="Narrative Image"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="absolute bottom-20 left-20 max-w-md">
                                <h3 className="text-4xl font-display font-bold text-white mb-6">Our Perspective is Local. Our Promise is Global.</h3>
                                <Button asChild className="bg-gold-500 hover:bg-white text-black py-8 px-12 rounded-3xl text-xl font-bold h-auto shadow-2xl">
                                    <Link href="/contact">Join Our Journey</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="md:col-span-4 grid grid-rows-2 gap-6 order-1 md:order-2">
                            <div className="rounded-3xl overflow-hidden shadow-xl">
                                <OptimizedImage
                                    src="/images/jaipur/ved-SRAUI9X4Ep8-unsplash.jpg"
                                    alt="Accent 1"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="rounded-3xl overflow-hidden shadow-xl">
                                <OptimizedImage
                                    src="/images/agra/getty-images-ge82SKhuwCA-unsplash.jpg"
                                    alt="Accent 2"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Luxury CTA */}
            <section className="py-16 md:py-24 lg:py-40 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-6xl md:text-8xl font-display font-bold mb-12">Experience the <br /><span className="text-gold-500">True India.</span></h2>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                        <Link href="/plans" className="text-2xl font-bold hover:text-gold-500 flex items-center gap-4 transition-colors">
                            Explore Signature Plans <ArrowRight className="w-8 h-8" />
                        </Link>
                        <div className="w-px h-12 bg-white/20 hidden sm:block" />
                        <Link href="/contact" className="text-2xl font-bold hover:text-gold-500 flex items-center gap-4 transition-colors">
                            Inquire for Bespoke Journeys <ArrowRight className="w-8 h-8" />
                        </Link>
                    </div>
                </div>
            </section>

            <RelatedPages
                title="Explore More"
                pages={[
                    {
                        href: "/services",
                        title: "Our Services",
                        description: "Discover our full suite of luxury travel services including transport, stays, and custom itineraries.",
                    },
                    {
                        href: "/reviews",
                        title: "Guest Reviews",
                        description: "Read what our travelers say about their experiences with Guide India Tours.",
                    },
                    {
                        href: "/contact",
                        title: "Get in Touch",
                        description: "Connect with our team to start planning your bespoke Indian heritage journey.",
                    },
                ]}
            />
        </main>
    );
}
