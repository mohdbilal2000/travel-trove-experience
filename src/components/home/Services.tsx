
import { motion } from "framer-motion";
import { 
  Car, Bed, CalendarRange, Users, MapPin, Coffee, 
  Plane, Camera, ShieldCheck 
} from "lucide-react";
import SectionHeading from "../shared/SectionHeading";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Luxury Transportation",
    description: "Travel in comfort with our fleet of premium vehicles and professional drivers.",
    icon: Car,
    link: "/services"
  },
  {
    id: 2,
    title: "Hotel Bookings",
    description: "Stay at handpicked luxury hotels and heritage properties across all destinations.",
    icon: Bed,
    link: "/services"
  },
  {
    id: 3,
    title: "Custom Itineraries",
    description: "Personalized travel plans tailored to your preferences, time, and budget.",
    icon: CalendarRange,
    link: "/services"
  },
  {
    id: 4,
    title: "Expert Guides",
    description: "Knowledgeable local guides to provide cultural and historical insights.",
    icon: Users,
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
    title: "Culinary Experiences",
    description: "Authentic food tours and dining recommendations to savor local flavors.",
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
  hidden: { opacity: (0), y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  
  return (
    <motion.div variants={item} className="group">
      <Link 
        to={service.link}
        className="h-full block p-6 bg-white rounded-xl shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:border-maroon-600/20 hover:translate-y-[-5px]"
      >
        <div className="w-12 h-12 rounded-md bg-maroon-600/10 flex items-center justify-center mb-4 text-maroon-600 transition-all duration-300 group-hover:bg-maroon-600 group-hover:text-white">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-display font-medium mb-2">{service.title}</h3>
        <p className="text-sm text-charcoal-500/80">{service.description}</p>
      </Link>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="section-padding bg-ivory-300">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Our Premium Services" 
          subtitle="Enjoy a seamless travel experience with our comprehensive range of premium services designed to make your journey comfortable and memorable."
        />
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
