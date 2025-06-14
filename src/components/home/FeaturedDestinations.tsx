
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Agra",
    description: "Home to the iconic Taj Mahal and other Mughal architectural wonders, Agra offers a glimpse into India's glorious past.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
    highlights: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri"]
  },
  {
    id: 2,
    name: "Delhi",
    description: "India's bustling capital where ancient monuments coexist with modern infrastructure and vibrant culture.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop",
    highlights: ["Red Fort", "India Gate", "Lotus Temple"]
  },
  {
    id: 3,
    name: "Jaipur",
    description: "The Pink City offers magnificent palaces and Rajasthani culture that showcases royal heritage.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop",
    highlights: ["Amber Palace", "City Palace", "Hawa Mahal"]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const FeaturedDestinations = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light mb-4 text-royal-800">
              Discover Iconic Destinations
            </h2>
            <p className="text-lg text-royal-700/80 max-w-2xl mx-auto leading-relaxed">
              Explore the magnificent cities that make up India's Golden Triangle and beyond
            </p>
          </motion.div>
        </div>

        {/* Destinations Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={item}
              className="group cursor-pointer"
            >
              <Link to="/plans" className="block">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* City Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-display font-medium text-white mb-2">
                        {destination.name}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 bg-white">
                    <p className="text-royal-700/80 mb-4 leading-relaxed">
                      {destination.description}
                    </p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    {/* Explore Link */}
                    <div className="flex items-center text-maroon-600 font-medium group-hover:text-maroon-700 transition-colors">
                      <span className="mr-2">Explore</span>
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
