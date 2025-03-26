import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import Button from "@/components/shared/Button";
import { Link } from "react-router-dom";
import { 
  Car, Bed, CalendarRange, Users, MapPin, Coffee, 
  Plane, Camera, ShieldCheck, Globe, CreditCard, PhoneCall,
  Clock, Award, Umbrella
} from "lucide-react";

const servicesData = [
  {
    id: 1,
    title: "Luxury Transportation",
    description: "Travel comfortably with our fleet of premium air-conditioned vehicles. Choose from sedans, SUVs, or luxury vans based on your group size. All vehicles are maintained to the highest standards of cleanliness and safety.",
    features: [
      "Professional, English-speaking drivers",
      "Air-conditioned vehicles with WiFi",
      "Flexible pickup and drop-off locations",
      "Bottled water and refreshments on board",
      "City-to-city transfers between all destinations"
    ],
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop",
    icon: Car
  },
  {
    id: 2,
    title: "Hotel Bookings",
    description: "Stay at handpicked luxury hotels and heritage properties across all destinations. Our accommodation partners are selected for their exceptional service, authentic character, and prime locations.",
    features: [
      "5-star luxury hotels and heritage properties",
      "Boutique hotels with local character",
      "All rooms with modern amenities",
      "Breakfast included at all properties",
      "Special arrangements for celebrations"
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    icon: Bed
  },
  {
    id: 3,
    title: "Custom Itineraries",
    description: "We design personalized travel experiences tailored to your interests, timeframe, and budget. Whether you're interested in history, architecture, photography, or cuisine, we'll create a journey that highlights what matters most to you.",
    features: [
      "Personalized planning consultations",
      "Flexibility to modify during your journey",
      "Balance of iconic sites and hidden gems",
      "Special interest tours (photography, food, etc.)",
      "Consideration of your pace and preferences"
    ],
    image: "https://images.unsplash.com/photo-1672243776618-cc31e362e43a?q=80&w=2070&auto=format&fit=crop",
    icon: CalendarRange
  },
  {
    id: 4,
    title: "Expert Guides",
    description: "Our knowledgeable guides bring history and culture to life with engaging storytelling and in-depth knowledge. All guides are government-certified, experienced, and fluent in English.",
    features: [
      "Licensed, professional guides",
      "Multiple language options available",
      "In-depth historical and cultural knowledge",
      "Insider access to special experiences",
      "Flexibility to accommodate your interests"
    ],
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop",
    icon: Users
  },
  {
    id: 5,
    title: "Taxi Services",
    description: "Beyond your tour, our reliable taxi services can help you explore the cities at your own pace. Book our taxis for shopping excursions, dining trips, or any additional sightseeing outside your planned itinerary.",
    features: [
      "24/7 availability",
      "Fair, transparent pricing",
      "Local drivers with excellent area knowledge",
      "Multiple vehicle options",
      "Ability to book in advance or on short notice"
    ],
    image: "https://images.unsplash.com/photo-1621801306245-acba9a4135f7?q=80&w=2070&auto=format&fit=crop",
    icon: Car
  },
  {
    id: 6,
    title: "International Travel Assistance",
    description: "We provide comprehensive support for international travelers, from visa guidance to currency exchange advice. Our team is experienced in addressing the specific needs of visitors from around the world.",
    features: [
      "Visa application assistance",
      "Foreign exchange guidance",
      "SIM card arrangements",
      "Travel insurance recommendations",
      "Weather and packing advice"
    ],
    image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=2074&auto=format&fit=crop",
    icon: Globe
  }
];

const additionalServices = [
  {
    title: "Airport Transfers",
    description: "Hassle-free pickups and drop-offs at all airports",
    icon: Plane
  },
  {
    title: "Photography Services",
    description: "Professional photography to capture your journey",
    icon: Camera
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock assistance throughout your trip",
    icon: ShieldCheck
  },
  {
    title: "Culinary Experiences",
    description: "Food tours and authentic dining recommendations",
    icon: Coffee
  },
  {
    title: "Easy Payments",
    description: "Secure online payment options in multiple currencies",
    icon: CreditCard
  },
  {
    title: "Sightseeing Tours",
    description: "Guided tours of iconic landmarks and hidden gems",
    icon: MapPin
  },
  {
    title: "Multilingual Support",
    description: "Assistance available in several languages",
    icon: PhoneCall
  },
  {
    title: "Flexible Scheduling",
    description: "Adjust your itinerary as needed during your trip",
    icon: Clock
  },
  {
    title: "Quality Guarantee",
    description: "Commitment to excellence in all services provided",
    icon: Award
  },
  {
    title: "Travel Insurance",
    description: "Optional comprehensive travel protection plans",
    icon: Umbrella
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  
  return (
    <div className="flex gap-4 p-5 rounded-lg bg-white border border-border shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div className="w-12 h-12 rounded-md bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1">{service.title}</h3>
        <p className="text-sm text-muted-foreground">{service.description}</p>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Golden Triangle Tours</title>
        <meta name="description" content="Discover our comprehensive travel services including luxury transportation, premium hotel bookings, custom itineraries, expert guides, and more for your Golden Triangle journey." />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-muted to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-medium mb-6">
                Our Premium Services
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Experience the Golden Triangle in comfort and style with our comprehensive range of premium travel services designed to make your journey memorable.
              </p>
            </div>
          </div>
        </section>
        
        {/* Main Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {servicesData.map((service, index) => (
                <div 
                  key={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`relative rounded-2xl overflow-hidden h-[400px] ${
                      index % 2 === 1 ? 'lg:order-2' : ''
                    }`}
                  >
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                          <service.icon size={20} />
                        </div>
                        <h2 className="text-2xl font-display font-medium">{service.title}</h2>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={index % 2 === 1 ? 'lg:order-1' : ''}
                  >
                    <h2 className="text-3xl font-display font-medium mb-4">{service.title}</h2>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      <h3 className="font-medium">Key Features:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3 mt-0.5">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Additional Services */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Additional Services" 
              subtitle="We offer a wide range of complementary services to enhance your travel experience"
            />
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            >
              {additionalServices.map((service, index) => (
                <motion.div key={index} variants={item}>
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
                Ready to Plan Your Golden Triangle Journey?
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Contact us to discuss your travel needs and let us create a personalized itinerary for your perfect Indian adventure.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/plans">View Our Plans</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Services;
