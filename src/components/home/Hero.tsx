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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white text-center z-10 px-4">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="hero-text text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 text-white leading-tight">
            Discover The Magic Of <span className="text-amber-400">India's Golden Triangle</span>
          </h1>
          <p className="hero-text text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white">
            Immerse yourself in the rich culture, stunning architecture, and vibrant energy of Agra, Delhi, and Jaipur with our curated travel experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="bg-maroon-600 hover:bg-maroon-700 text-white">
              <Link to="/plans">View Our Plans</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 bg-white/10">
              <Link to="/contact">Custom Itinerary</Link>
            </Button>
          </div>
        </div>

        {/* City Indicators with Preview */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-8">
          {backgrounds.map((bg, index) => (
            <button
              key={bg.id}
              onClick={() => setActiveIndex(index)}
              className="text-center focus:outline-none group relative"
              onMouseEnter={() => setHoveredCity(index)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              <span className={cn(
                "block w-20 h-1 mb-2 mx-auto transition-all duration-300",
                index === activeIndex ? "bg-amber-500" : "bg-white/40 group-hover:bg-white/60"
              )} />
              <span className={cn(
                "text-sm uppercase tracking-wider font-medium transition-colors",
                index === activeIndex ? "text-amber-500" : "text-white/80 group-hover:text-white"
              )}>
                {bg.name}
              </span>
              
              {/* Preview Image */}
              {hoveredCity === index && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <img 
                      src={bg.thumbnail} 
                      alt={bg.name}
                      className="w-32 h-24 object-cover rounded-lg shadow-lg border-2 border-white/20"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-lg" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
