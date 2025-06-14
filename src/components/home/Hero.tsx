
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
  const [hoveredCity, setHoveredCity] = useState<number | null>(null);

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
      className="relative h-screen overflow-hidden"
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white text-center z-10 px-4">
        <div className="max-w-4xl animate-fade-in">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-light mb-6 text-white leading-tight tracking-wide">
            {currentBg.name}
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto text-white/90 font-light leading-relaxed">
            {currentBg.description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <Button 
              size="lg" 
              className="bg-maroon-600 hover:bg-maroon-700 text-white px-8 py-3 text-base font-medium"
              asChild
            >
              <Link to="/plans">Start Planning</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-maroon-600 px-8 py-3 text-base font-medium bg-transparent"
              asChild
            >
              <Link to="/contact">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* City Navigation */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-12">
            {backgrounds.map((bg, index) => (
              <button
                key={bg.id}
                onClick={() => setActiveIndex(index)}
                className="text-center focus:outline-none group relative"
                onMouseEnter={() => setHoveredCity(index)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                <div className="flex flex-col items-center">
                  <span className={cn(
                    "block w-24 h-0.5 mb-3 mx-auto transition-all duration-500",
                    index === activeIndex ? "bg-amber-400" : "bg-white/30 group-hover:bg-white/60"
                  )} />
                  <span className={cn(
                    "text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300",
                    index === activeIndex ? "text-amber-400" : "text-white/70 group-hover:text-white"
                  )}>
                    {bg.name}
                  </span>
                </div>
                
                {/* Preview Image */}
                {hoveredCity === index && index !== activeIndex && (
                  <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <img 
                        src={bg.thumbnail} 
                        alt={bg.name}
                        className="w-40 h-28 object-cover rounded-lg shadow-2xl border-2 border-white/30"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-medium">{bg.name}</p>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
