
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const backgrounds = [
  {
    id: 1,
    name: "Agra",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop",
    description: "Experience the majestic Taj Mahal and Mughal architectural wonders",
    thumbnail: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop",
    description: "Explore the historical monuments and vibrant culture of India's capital",
    thumbnail: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Jaipur",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2066&auto=format&fit=crop",
    description: "Discover the pink city with its royal palaces and rich Rajasthani heritage",
    thumbnail: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=400&auto=format&fit=crop"
  }
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const currentBg = backgrounds[activeIndex];

  return (
    <section 
      className="relative min-h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images */}
      {backgrounds.map((bg, index) => (
        <div
          key={bg.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center",
            index === activeIndex ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${bg.image})` }}
        >
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>
      ))}

      {/* Content */}
      <div className="relative min-h-screen flex flex-col justify-center items-center text-white text-center z-10 px-4 pt-20">
        <div className="max-w-5xl animate-fade-in">
          {/* Main Heading - Larger and more prominent */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-light mb-8 text-white leading-tight tracking-wide">
            {currentBg.name}
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-16 max-w-4xl mx-auto text-white/95 font-light leading-relaxed">
            {currentBg.description}
          </p>
          
          {/* Action Buttons - Enhanced styling */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
            <Button 
              size="lg" 
              className="bg-[#800000] hover:bg-[#600000] text-white px-12 py-4 text-lg font-medium rounded-none border-none shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/plans">Start Planning</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#800000] px-12 py-4 text-lg font-medium rounded-none bg-transparent shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/contact">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
