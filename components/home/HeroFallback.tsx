"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Discover the Golden Triangle",
    subtitle: "Experience the magic of Delhi, Agra & Jaipur",
    description: "Journey through India's most iconic destinations with our expertly crafted tours",
    image: "/images/delhi/getty-images-C4Yf3Wbymg8-unsplash.jpg",
    thumbnail: "/images/delhi/getty-images-C4Yf3Wbymg8-unsplash.jpg"
  },
  {
    id: 2,
    title: "The Majestic Taj Mahal",
    subtitle: "A symbol of eternal love in Agra",
    description: "Witness the world's most beautiful monument at sunrise",
    image: "/images/agra/getty-images-ge82SKhuwCA-unsplash.jpg",
    thumbnail: "/images/agra/getty-images-ge82SKhuwCA-unsplash.jpg"
  },
  {
    id: 3,
    title: "The Pink City of Jaipur",
    subtitle: "Where royalty meets culture",
    description: "Explore magnificent palaces and vibrant markets",
    image: "/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg",
    thumbnail: "/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg"
  }
];

const HeroFallback = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const currentBg = heroSlides[activeIndex];

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images — Next.js Image for performance */}
      {heroSlides.map((bg, index) => (
        <div
          key={bg.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === activeIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={bg.image}
            alt={bg.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
            quality={85}
          />
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>
      ))}

      {/* Content */}
      <div className="relative min-h-screen flex flex-col justify-center items-center text-white text-center z-10 px-4 pt-20">
        <div className="max-w-5xl animate-fade-in">
          {/* Social proof badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-gold-500 fill-current" />
              ))}
            </div>
            <span className="text-white/90 text-sm font-medium">4.9/5 from 360+ travelers</span>
          </div>

          {/* Heading — h2 because the real h1 is in page.tsx sr-only */}
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-display font-light mb-8 text-white leading-tight tracking-wide">
            {currentBg.title}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl lg:text-2xl mb-10 md:mb-16 max-w-4xl mx-auto text-white/95 font-light leading-relaxed">
            {currentBg.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
            <Button
              size="lg"
              className="bg-maroon-600 hover:bg-maroon-700 text-white px-12 py-4 text-lg font-medium rounded-xl border-none shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/plans">Start Planning</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-maroon-600 px-12 py-4 text-lg font-medium rounded-xl bg-transparent shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/contact">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroFallback;
