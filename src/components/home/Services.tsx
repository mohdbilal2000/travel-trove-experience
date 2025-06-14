
import { motion } from "framer-motion";
import { 
  Car, Bed, CalendarRange, Users, MapPin, Coffee, 
  Plane, Camera, ShieldCheck 
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Expert Local Guides",
    description: "Male and female guides available to provide cultural and historical insights based on your preference.",
    icon: Users,
    link: "/services"
  },
  {
    id: 2,
    title: "Luxury Transportation",
    description: "Travel in comfort with our fleet of premium vehicles and professional drivers.",
    icon: Car,
    link: "/services"
  },
  {
    id: 3,
    title: "Hotel Bookings",
    description: "Stay at handpicked luxury hotels and heritage properties across all destinations.",
    icon: Bed,
    link: "/services"
  },
  {
    id: 4,
    title: "Custom Itineraries",
    description: "Personalized travel plans tailored to your preferences, time, and budget.",
    icon: CalendarRange,
    link: "/services"
  },
  {
    id: 5,
    title: "Sightseeing Tours",
    description: "Curated tours of iconic landmarks and hidden gems in each destination.",
    icon: MapPin,
    link: "/services"
  },
  {
    id: 6,
    title: "Authentic Culinary Experiences",
    description: "Traditional food tours and dining recommendations to savor local flavors.",
    icon: Coffee,
    link: "/services"
  },
  {
    id: 7,
    title: "Airport Transfers",
    description: "Hassle-free pickups and drop-offs at all airports and railway stations.",
    icon: Plane,
    link: "/services"
  },
  {
    id: 8,
    title: "Photography Services",
    description: "Optional professional photography to capture your memorable journey.",
    icon: Camera,
    link: "/services"
  },
  {
    id: 9,
    title: "24/7 Support",
    description: "Round-the-clock assistance for a smooth and worry-free travel experience.",
    icon: ShieldCheck,
    link: "/services"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  
  return (
    <motion.div variants={item} className="group">
      <Link 
        to={service.link}
        className="h-full block p-8 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-maroon-100 hover:translate-y-[-2px]"
      >
        <div className="w-14 h-14 rounded-full bg-maroon-50 flex items-center justify-center mb-6 text-maroon-600 transition-all duration-300 group-hover:bg-maroon-600 group-hover:text-white">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-display font-medium mb-3 text-royal-800">{service.title}</h3>
        <p className="text-royal-700/70 leading-relaxed">{service.description}</p>
      </Link>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="py-20 bg-gray-50">
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
              Our Premium Services
            </h2>
            <p className="text-lg text-royal-700/80 max-w-2xl mx-auto leading-relaxed">
              Enjoy a seamless travel experience with our comprehensive range of premium services designed to make your journey comfortable and memorable.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
