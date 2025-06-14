
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const destinations = [
  {
    id: 1,
    name: "Agra",
    description: "Home to the iconic Taj Mahal, one of the world's most beautiful architectural wonders.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
    highlights: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri"]
  },
  {
    id: 2,
    name: "Delhi",
    description: "Explore India's capital, where ancient monuments stand alongside modern landmarks.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop",
    highlights: ["Red Fort", "India Gate", "Lotus Temple"]
  },
  {
    id: 3,
    name: "Jaipur",
    description: "The Pink City offers magnificent palaces, colorful bazaars, and rich Rajasthani culture.",
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal mb-4 text-royal-800">
              Discover Iconic Destinations
            </h2>
            <p className="text-lg text-royal-700/80 max-w-4xl mx-auto leading-relaxed">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={item}
              className="group cursor-pointer"
            >
              <Link to="/plans" className="block">
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* City Name Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-display font-medium text-white mb-3">
                        {destination.name}
                      </h3>
                      <p className="text-white/90 text-base leading-relaxed">
                        {destination.description}
                      </p>
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
