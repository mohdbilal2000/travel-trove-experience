"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import TripPlanner from "@/components/home/TripPlanner";
import type { PlannerState } from "@/lib/planner";

// Single curated hero image (Jal Mahal, Jaipur). One optimised, priority image
// instead of a rotating carousel — better LCP and a calmer, more premium feel.
const HERO_IMAGE = "/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg";

interface PlannerHeroProps {
  state: PlannerState;
  onChange: (patch: Partial<PlannerState>) => void;
  onBrowseTours: () => void;
}

const PlannerHero = ({ state, onChange, onBrowseTours }: PlannerHeroProps) => (
  <section className="relative overflow-hidden bg-royal-900 lg:flex lg:min-h-[92vh] lg:items-center">
    {/* Background image with a slow Ken-Burns drift (disabled for reduced motion) */}
    <div className="absolute inset-0 will-change-transform motion-safe:animate-ken-burns">
      <Image
        src={HERO_IMAGE}
        alt="Jal Mahal water palace at dusk, Jaipur"
        fill
        priority
        quality={82}
        sizes="100vw"
        className="object-cover"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80 lg:bg-gradient-to-r lg:from-black/85 lg:via-black/55 lg:to-black/25" />

    {/* Content */}
    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-24 md:pb-16 md:pt-28">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_minmax(360px,440px)] lg:gap-14">
        {/* Left: brand pitch */}
        <div className="animate-fade-in text-center text-white lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current text-gold-500" />
              ))}
            </div>
            <span className="text-xs font-medium text-white/90 sm:text-sm">4.9/5 from 366+ travellers</span>
          </div>

          <h2 className="mb-5 font-display text-4xl font-light leading-[1.05] tracking-wide sm:text-5xl lg:text-6xl xl:text-7xl">
            Plan Your Perfect
            <span className="block text-gold-500">India Journey</span>
          </h2>

          <p className="mx-auto max-w-xl text-base font-light leading-relaxed text-white/90 sm:text-lg lg:mx-0 lg:text-xl">
            No fixed prices — we tailor every journey to you. Build your trip on the right and get an honest,
            no-obligation quote on WhatsApp in about two minutes.
          </p>

          <div className="mt-8 hidden items-center gap-6 text-sm text-white/80 lg:flex">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> Expert local guides</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> 24/7 support</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> Best-price promise</span>
          </div>
        </div>

        {/* Right: the planner */}
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
          <TripPlanner state={state} onChange={onChange} onBrowseTours={onBrowseTours} />
        </div>
      </div>
    </div>
  </section>
);

export default PlannerHero;
