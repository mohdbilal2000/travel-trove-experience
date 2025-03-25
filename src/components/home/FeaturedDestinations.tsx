
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../shared/SectionHeading";
import Button from "../shared/Button";

const destinations = [
  {
    id: 1,
    name: "Delhi",
    image: "https://images.unsplash.com/photo-1597074866212-9ae6511d953e?q=80&w=2070&auto=format&fit=crop",
    description: "Experience the perfect blend of old and new in India's vibrant capital city.",
    highlights: ["Red Fort", "Qutub Minar", "Humayun's Tomb", "India Gate", "Lotus Temple"],
    link: "/plans"
  },
  {
    id: 2,
    name: "Agra",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
    description: "Home to the iconic Taj Mahal and other UNESCO World Heritage sites.",
    highlights: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Itimad-ud-Daulah", "Mehtab Bagh"],
    link: "/plans"
  },
  {
    id: 3,
    name: "Jaipur",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop",
    description: "Discover the Pink City with its majestic palaces, forts and vibrant culture.",
    highlights: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", "Albert Hall Museum"],
    link: "/plans"
  }
];

const FeaturedDestinations = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDestination = destinations[activeIndex];

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Explore Our Destinations" 
          subtitle="Discover the iconic cities of India's Golden Triangle, each with its unique charm and cultural heritage."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: index === activeIndex ? 1 : 0,
                  x: index === activeIndex ? 0 : 100,
                  zIndex: index === activeIndex ? 10 : 0
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-display font-medium mb-1">{destination.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div>
            <div className="flex border-b border-border mb-6">
              {destinations.map((destination, index) => (
                <button
                  key={destination.id}
                  onClick={() => setActiveIndex(index)}
                  className={`px-4 py-3 font-medium text-sm md:text-base transition-colors relative ${
                    index === activeIndex
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {destination.name}
                  {index === activeIndex && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>

            <motion.div
              key={activeDestination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <p className="text-muted-foreground">{activeDestination.description}</p>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Highlights:</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {activeDestination.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center text-sm">
                      <ChevronRight className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <Button asChild>
                  <Link to={activeDestination.link}>
                    Explore {activeDestination.name}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
