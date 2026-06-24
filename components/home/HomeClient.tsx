"use client";

import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import PlannerHero from "@/components/home/PlannerHero";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { Star, Clock, Users, ShieldCheck } from "lucide-react";
import { useState, useCallback } from "react";
import { type PlannerState, getFilteredPlans, buildWhatsAppMessage, isGoldenTriangle } from "@/lib/planner";
import { cityLabel } from "@/data/plannerOptions";

const HomeClient = () => {
    const [planner, setPlanner] = useState<PlannerState>({
        adults: 1,
        children: 0,
        days: null,
        cities: [],
        transport: "",
    });

    const updatePlanner = useCallback((patch: Partial<PlannerState>) => {
        setPlanner((prev) => ({ ...prev, ...patch }));
    }, []);

    const scrollToTours = useCallback(() => {
        document.getElementById("matching-tours")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    const filteredPlans = getFilteredPlans(planner.cities);
    const hasCities = planner.cities.length > 0;

    const resultsHeading = !hasCities
        ? "Our Most-Loved Tours"
        : isGoldenTriangle(planner.cities)
            ? "Golden Triangle Tours For You"
            : `Matching Tours for ${planner.cities.map(cityLabel).join(", ")}`;

    return (
        <main>
            <PlannerHero state={planner} onChange={updatePlanner} onBrowseTours={scrollToTours} />

            {/* Main H1 Heading for SEO */}
            <section className="py-12 md:py-16 bg-gradient-to-br from-royal-50 to-amber-50">
                <div className="container mx-auto px-4 text-center">
                    <span className="inline-block w-16 h-1 bg-gold-500 rounded-full mb-6" />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-royal-800 mb-6">
                        Premium Golden Triangle Tours in India
                    </h1>
                    <p className="text-xl text-royal-700 max-w-4xl mx-auto leading-relaxed mb-8">
                        Discover <Link href="/plans" className="text-royal-600 hover:text-royal-800 font-semibold underline">Delhi, Agra, and Jaipur tours</Link> with our expert guides. Experience luxury accommodations,
                        private transportation, and 24/7 support for your perfect India tour.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-maroon-600 hover:bg-maroon-700 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            asChild
                        >
                            <Link href="/plans">View All Tour Packages</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-maroon-600 text-maroon-600 hover:bg-maroon-600 hover:text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            asChild
                        >
                            <Link href="/guide-booking">Book a Guide</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Matching Tours — driven by the hero planner's city selection */}
            <section id="matching-tours" className="py-12 md:py-16 bg-gradient-to-br from-white via-royal-50/30 to-white scroll-mt-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-royal-800 mb-3">
                                {resultsHeading}
                            </h2>
                            <p className="text-lg text-royal-700/80">
                                {hasCities
                                    ? "Handpicked packages matching your destinations — tap any to view the full itinerary."
                                    : "Pick your cities in the planner above to tailor these to your trip."}
                            </p>
                        </motion.div>

                        {filteredPlans.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPlans.map((plan, index) => (
                                    <motion.div
                                        key={plan.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.08 }}
                                        viewport={{ once: true }}
                                        className="group"
                                    >
                                        <Link href={`/plans/${plan.id}`} className="block h-full">
                                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full border border-gray-200">
                                                <div className="relative h-48 overflow-hidden">
                                                    <OptimizedImage
                                                        src={plan.image}
                                                        alt={plan.title}
                                                        className="w-full h-full object-cover-optimized transition-transform duration-700 group-hover:scale-110 image-no-blur"
                                                        priority={false}
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                                    <div className="absolute top-4 right-4">
                                                        {plan.popular && (
                                                            <span className="bg-maroon-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                                Popular
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="absolute bottom-4 left-4 right-4">
                                                        <h3 className="text-lg font-display font-semibold text-white mb-1 line-clamp-2">
                                                            {plan.title}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-white/90 text-sm">
                                                            <Clock size={14} />
                                                            <span>{plan.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-5">
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                                                        {plan.description}
                                                    </p>

                                                    <div className="space-y-2 mb-4">
                                                        {plan.highlights.slice(0, 2).map((highlight, idx) => (
                                                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                                                <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full flex-shrink-0" />
                                                                <span className="line-clamp-1">{highlight}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-1">
                                                            <Star size={16} className="text-amber-500" fill="currentColor" />
                                                            <span className="text-sm font-medium text-gray-900">{plan.rating}</span>
                                                            <span className="text-sm text-gray-500">({plan.reviews})</span>
                                                        </div>
                                                        <span className="text-lg font-bold text-maroon-600">{plan.price}</span>
                                                    </div>

                                                    <Button
                                                        className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-medium py-2.5"
                                                    >
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8 text-center border border-gray-200">
                                <p className="text-gray-600 mb-5">
                                    No ready-made package matches that exact combination — but we&apos;ll happily craft a custom itinerary for you.
                                </p>
                                <WhatsAppCTA
                                    variant="button"
                                    message={buildWhatsAppMessage(planner)}
                                    buttonLabel="Request a Custom Itinerary"
                                />
                            </div>
                        )}

                        <div className="text-center mt-10">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-maroon-600 text-maroon-600 hover:bg-maroon-600 hover:text-white px-8 py-3"
                                asChild
                            >
                                <Link href="/plans">View All Tour Packages</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Choose Your Perfect Tour Package Section */}
            <section className="py-14 md:py-20 bg-gradient-to-b from-white via-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                            Choose Your Perfect Tour Package
                        </h2>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Select from our flexible booking options. Customize your Golden Triangle experience with our expert guides and premium services.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {/* Guide Only */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group flex flex-col h-full"
                        >
                            <div className="bg-gradient-to-br from-gray-50 to-white p-8 text-center border-b border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Guide Only</h3>
                                <p className="text-sm text-gray-500 font-medium px-4">Professional certified guide for your personalized tour</p>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <ul className="space-y-4 mb-8 flex-grow">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Certified multi-language guide</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Historical & cultural insights</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Monument navigation assistance</span>
                                    </li>
                                </ul>
                                <Button className="w-full bg-maroon-600 hover:bg-maroon-700 text-white h-12 rounded-xl transition-all duration-300 font-semibold" asChild>
                                    <Link href="/guide-booking">Book Guide</Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Guide + Cab */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border-2 border-maroon-600/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group relative flex flex-col h-full"
                        >
                            <div className="absolute top-4 right-4 z-10">
                                <span className="bg-maroon-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">POPULAR</span>
                            </div>
                            <div className="bg-gradient-to-br from-maroon-600/5 to-white p-8 text-center border-b border-maroon-600/10">
                                <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Guide + Cab</h3>
                                <p className="text-sm text-gray-500 font-medium px-4">Complete private sightseeing package</p>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <ul className="space-y-4 mb-8 flex-grow">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Everything in Guide Only</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Private luxury AC vehicle</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Fuel, parking & driver allowance</span>
                                    </li>
                                </ul>
                                <Button className="w-full bg-maroon-600 hover:bg-maroon-700 text-white h-12 rounded-xl transition-all duration-300 font-semibold" asChild>
                                    <Link href="/contact">Get Quote</Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* All Inclusive */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group flex flex-col h-full"
                        >
                            <div className="bg-gradient-to-br from-gray-50 to-white p-8 text-center border-b border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">All Inclusive</h3>
                                <p className="text-sm text-gray-500 font-medium px-4">Guide + Cab + Hotels + Monuments</p>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <ul className="space-y-4 mb-8 flex-grow">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Everything in Guide + Cab</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Luxury 4/5 star hotels</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">All monument tickets (Skip-line)</span>
                                    </li>
                                </ul>
                                <Button className="w-full bg-maroon-600 hover:bg-maroon-700 text-white h-12 rounded-xl transition-all duration-300 font-semibold" asChild>
                                    <Link href="/plans">Explore Plans</Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Custom Tour */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group flex flex-col h-full"
                        >
                            <div className="bg-gradient-to-br from-gray-50 to-white p-8 text-center border-b border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-maroon-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Custom Tour</h3>
                                <p className="text-sm text-gray-500 font-medium px-4">Bespoke itinerary designed just for you</p>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <ul className="space-y-4 mb-8 flex-grow">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Flexible itinerary planning</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Mix & match destinations</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-maroon-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed">Special requests catered</span>
                                    </li>
                                </ul>
                                <Button className="w-full bg-maroon-600 hover:bg-maroon-700 text-white h-12 rounded-xl transition-all duration-300 font-semibold" asChild>
                                    <Link href="/contact">Plan My Trip</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <FeaturedDestinations />
            <Services />

            {/* Why Choose Us Section */}
            <section className="py-14 md:py-20 bg-royal-800 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-6 leading-tight">
                                Why Choose Guide India Tours?
                            </h2>
                            <p className="text-lg text-white/80 mb-8 leading-relaxed">
                                We don't just show you India's monuments; we help you experience its soul. Our local expertise, attention to detail, and commitment to quality ensure your Golden Triangle tour is nothing short of extraordinary.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Users className="text-gold-500" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2 text-gold-500">Expert Local Guides</h3>
                                        <p className="text-white/70">Our government-approved guides are storytellers who bring history to life.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck className="text-gold-500" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2 text-gold-500">Safety & Comfort</h3>
                                        <p className="text-white/70">Background-verified drivers and premium vehicles for a safe, relaxed journey.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Star className="text-gold-500" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2 text-gold-500">Top-Rated Service</h3>
                                        <p className="text-white/70">Consistent 5-star reviews from travelers worldwide. We treat you like family.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                                <OptimizedImage
                                    src="/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg"
                                    alt="Tourists enjoying Jaipur"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-500/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-maroon-600/30 rounded-full blur-3xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            <Testimonials />

            <WhatsAppCTA />

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-cover bg-center relative" style={{ backgroundImage: 'url("/images/agra/getty-images-ge82SKhuwCA-unsplash.jpg")' }}>
                <div className="absolute inset-0 bg-black/60" />
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-6">
                            Ready for Your Indian Adventure?
                        </h2>
                        <p className="text-xl text-white/90 mb-10 leading-relaxed font-light">
                            Let us help you plan the perfect Golden Triangle tour. Whether you need a guide, a car, or a complete package, we're here to serve you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button
                                size="lg"
                                className="bg-maroon-600 hover:bg-maroon-700 text-white px-10 py-6 text-xl rounded-xl border-none shadow-xl hover:shadow-2xl transition-all duration-300"
                                asChild
                            >
                                <Link href="/contact">Book Now</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white text-white hover:bg-white hover:text-maroon-600 px-10 py-6 text-xl rounded-xl bg-transparent"
                                asChild
                            >
                                <Link href="/plans">View All Plans</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default HomeClient;
