"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlannerHero from "@/components/home/PlannerHero";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { type PlannerState, getFilteredPlans, buildWhatsAppMessage, isGoldenTriangle } from "@/lib/planner";
import { cityLabel } from "@/data/plannerOptions";

/**
 * The only interactive island on the homepage: hero trip planner + the tour
 * grid it filters. Everything below this component is server-rendered.
 */
export default function PlannerSection() {
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
        ? "Our Most-Loved India Tour Packages"
        : isGoldenTriangle(planner.cities)
            ? "Golden Triangle Tours For You"
            : `Matching Tours for ${planner.cities.map(cityLabel).join(", ")}`;

    return (
        <>
            <PlannerHero state={planner} onChange={updatePlanner} onBrowseTours={scrollToTours} />

            {/* Matching Tours — driven by the hero planner's city selection */}
            <section id="matching-tours" aria-labelledby="matching-tours-heading" className="py-12 md:py-16 bg-gradient-to-br from-white via-royal-50/30 to-white scroll-mt-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 id="matching-tours-heading" className="text-3xl md:text-4xl font-display font-bold text-royal-800 mb-3">
                                {resultsHeading}
                            </h2>
                            <p className="text-lg text-royal-700/80">
                                {hasCities
                                    ? "Handpicked packages matching your destinations — tap any to view the full itinerary."
                                    : "Pick your cities in the planner above to tailor these to your trip, or browse the best sellers below."}
                            </p>
                        </div>

                        {filteredPlans.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPlans.map((plan) => (
                                    <div key={plan.id} className="group">
                                        <Link href={`/plans/${plan.id}`} className="block h-full">
                                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full border border-gray-200">
                                                <div className="relative h-48 overflow-hidden">
                                                    <OptimizedImage
                                                        src={plan.image}
                                                        alt={`${plan.title} — private guided tour`}
                                                        className="w-full h-full object-cover-optimized transition-transform duration-700 group-hover:scale-110 image-no-blur"
                                                        priority={false}
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                                    {plan.popular && (
                                                        <div className="absolute top-4 right-4">
                                                            <span className="bg-maroon-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                                Popular
                                                            </span>
                                                        </div>
                                                    )}
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

                                                    <Button className="w-full bg-maroon-600 hover:bg-maroon-700 text-white font-medium py-2.5">
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
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
                                <Link href="/plans">View All Tour Packages With Prices</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
