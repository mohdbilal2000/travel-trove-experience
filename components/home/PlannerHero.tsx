"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroSlides } from "@/components/home/HeroFallback";
import TripPlanner from "@/components/home/TripPlanner";
import type { PlannerState } from "@/lib/planner";

interface PlannerHeroProps {
  state: PlannerState;
  onChange: (patch: Partial<PlannerState>) => void;
  onBrowseTours: () => void;
}

const PlannerHero = ({ state, onChange, onBrowseTours }: PlannerHeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Rotate background imagery only after first paint (LCP-friendly).
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-royal-900">
      {/* Background imagery */}
      {heroSlides.map((bg, index) => (
        <div
          key={bg.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === activeIndex ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={bg.image}
            alt={bg.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
            quality={80}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/75 md:bg-gradient-to-r md:from-black/80 md:via-black/55 md:to-black/30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-12 md:pt-36 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: brand pitch */}
          <div className="text-center lg:text-left text-white animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold-500 fill-current" />
                ))}
              </div>
              <span className="text-white/90 text-xs sm:text-sm font-medium">4.9/5 from 366+ travelers</span>
            </div>

            <h2 className="font-display font-light leading-[1.05] tracking-wide text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-5">
              Plan Your Perfect
              <span className="block text-gold-500">India Journey</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Tell us your group, days, cities and ride — get an instant, personalised quote on WhatsApp in two minutes. No forms, no waiting.
            </p>

            <div className="hidden lg:flex items-center gap-6 mt-8 text-white/80 text-sm">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Expert local guides</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> 24/7 support</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Best price promise</span>
            </div>
          </div>

          {/* Right: the planner */}
          <div className="w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">
            <TripPlanner state={state} onChange={onChange} onBrowseTours={onBrowseTours} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlannerHero;
