
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Additional destinations beyond the Golden Triangle
const additionalDestinations = [
  {
    id: 1,
    name: "Varanasi",
    image: "https://images.unsplash.com/photo-1596295981214-3ccd1b1f110d?q=80&w=2070&auto=format&fit=crop",
    description: "Experience the spiritual heart of India with ancient rituals along the sacred Ganges River.",
    link: "/plans/3" // Link to Golden Triangle with Varanasi plan
  },
  {
    id: 2,
    name: "Udaipur",
    image: "https://images.unsplash.com/photo-1590080554240-485e651e5ac3?q=80&w=2069&auto=format&fit=crop",
    description: "Discover the romantic lake city with its majestic palaces and serene waterfront views.",
    link: "/plans/5" // Link to Golden Triangle with Udaipur plan
  },
  {
    id: 3,
    name: "Ranthambore",
    image: "https://images.unsplash.com/photo-1578326457399-3b34dbbf23b8?q=80&w=2070&auto=format&fit=crop",
    description: "Combine cultural experiences with wildlife adventures in this famous tiger reserve.",
    link: "/plans/8" // Link to Golden Triangle with Ranthambore plan
  },
  {
    id: 4,
    name: "Kerala",
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=2073&auto=format&fit=crop",
    description: "Extend your North India journey with the tranquil backwaters and lush landscapes of God's Own Country.",
    link: "/plans/7" // Link to Golden Triangle with Kerala plan
  }
];

// Main cities of the Golden Triangle
const mainDestinations = [
  {
    id: 5,
    name: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop",
    description: "Explore India's capital, where ancient monuments stand alongside modern landmarks.",
    link: "/plans/1" // Link to Golden Triangle Essential plan
  },
  {
    id: 6,
    name: "Agra",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop",
    description: "Home to the iconic Taj Mahal, one of the world's most beautiful architectural wonders.",
    link: "/plans/1" // Link to Golden Triangle Essential plan
  },
  {
    id: 7,
    name: "Jaipur",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2066&auto=format&fit=crop",
    description: "The Pink City offers magnificent palaces, colorful bazaars, and rich Rajasthani culture.",
    link: "/plans/1" // Link to Golden Triangle Essential plan
  }
];

const DestinationCard = ({ destination, variant = "additional" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={destination.link} className="block">
        <div className="relative overflow-hidden rounded-xl">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-display font-medium text-white mb-2">{destination.name}</h3>
            <p className="text-white/80 text-sm mb-4">{destination.description}</p>
            
            {variant === "additional" && (
              <Button size="sm" variant="outline" className="bg-black/30 text-white border-white/30 hover:bg-white/20 group-hover:bg-amber-900 group-hover:text-white group-hover:border-amber-900">
                Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const FeaturedDestinations = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Discover Iconic Destinations" 
          subtitle="Explore the magnificent cities that make up India's Golden Triangle and beyond"
        />
        
        {/* Main Destinations (Golden Triangle) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mainDestinations.map(destination => (
            <DestinationCard 
              key={destination.id} 
              destination={destination} 
              variant="main" 
            />
          ))}
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-medium mb-3 text-maroon-600">Beyond the Golden Triangle</h2>
          <p className="text-charcoal-500/80 max-w-2xl mx-auto mb-12">
            Enhance your Golden Triangle experience with these extraordinary destinations that showcase India's diversity
          </p>
        </div>
        
        {/* Additional Destinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalDestinations.map(destination => (
            <DestinationCard 
              key={destination.id} 
              destination={destination} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
