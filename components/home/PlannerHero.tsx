"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroSlides } from "@/components/home/HeroFallback";

const PlannerHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselReady, setCarouselReady] = useState(false);
  const [paused, setPaused] = useState(false);

  // Mount the hidden slides only after the LCP window so slides 2-3 don't
  // compete with the first slide's download; respect reduced-motion and
  // pause on hover/focus (WCAG 2.2.2).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const readyTimer = setTimeout(() => setCarouselReady(true), 3500);
    return () => clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    if (!carouselReady || paused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [carouselReady, paused]);

  return (
    <section
      className="relative overflow-hidden bg-royal-900"
      aria-labelledby="home-hero-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative background imagery (hidden from assistive tech) */}
      {heroSlides.map((bg, index) => (
        (index === 0 || carouselReady) && (
          <div
            key={bg.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === activeIndex ? "opacity-100" : "opacity-0"
            )}
            aria-hidden="true"
          >
            <Image
              src={bg.image}
              alt=""
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              quality={85}
            />
          </div>
        )
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/75 md:bg-gradient-to-r md:from-black/80 md:via-black/55 md:to-black/30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Brand pitch */}
          <div className="text-center text-white animate-fade-in">
            <a
              href="https://www.google.com/maps/place/Guide+India+Tours/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read our reviews on Google"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6 hover:bg-white/20 transition-colors"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold-500 fill-current" />
                ))}
              </div>
              <span className="text-white/90 text-xs sm:text-sm font-medium">4.9/5 from 403+ travelers on Google</span>
            </a>

            <h1 id="home-hero-title" className="font-display font-light leading-[1.05] tracking-wide text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-5">
              Private Golden Triangle Tours
              <span className="block text-gold-500">Delhi, Agra &amp; Jaipur</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-xl mx-auto">
              Fully customizable private tours with government-licensed guides, air-conditioned cars and 24/7 support — run from Agra since 2004. Plan your trip below and get a quote on WhatsApp within 2 hours.
            </p>

            <div className="hidden lg:flex items-center justify-center gap-6 mt-8 text-white/80 text-sm">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Government-licensed guides</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> 24/7 support</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-500" /> No hidden fees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlannerHero;
