
import SeoHead from "@/components/shared/SeoHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, Bed, Users, Coffee, Check, ChevronRight, Star, Clock } from "lucide-react";
import { allPlans } from "@/data/travelPlans";

const travelPlans = allPlans;

const planFeatures = [
  {
    icon: Car,
    title: "Private Transportation",
    description: "Travel comfortably in air-conditioned vehicles with professional drivers."
  },
  {
    icon: Bed,
    title: "Quality Accommodations",
    description: "Stay in carefully selected hotels that offer comfort and authentic experiences."
  },
  {
    icon: Users,
    title: "Expert Guides",
    description: "Learn from knowledgeable local guides who bring history and culture to life."
  },
  {
    icon: Coffee,
    title: "Culinary Experiences",
    description: "Savor authentic local cuisine and specialty dining experiences."
  }
];

const PlanCard = ({ plan }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-lg transition-all duration-300"
    >
      <Link to={`/plans/${plan.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={plan.image} 
            alt={plan.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {plan.popular && (
            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-medium py-2 px-3 rounded-full">
              Popular Choice
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-6 px-6">
            <div className="flex items-center text-white space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{plan.rating}</span>
              <span className="text-xs text-white/80">({plan.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1.5" />
            {plan.duration}
          </div>
          <div className="text-red-600 font-semibold text-lg">{plan.price}</div>
        </div>
        
        <Link to={`/plans/${plan.id}`} className="block">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 hover:text-red-600 transition-colors line-clamp-2">{plan.title}</h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{plan.description}</p>
        
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-gray-900">Highlights:</h4>
          <ul className="space-y-2">
            {plan.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="flex text-sm text-gray-600">
                <Check className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
            {plan.highlights.length > 3 && (
              <li className="text-sm text-red-600 font-medium">+ {plan.highlights.length - 3} more highlights</li>
            )}
          </ul>
        </div>
        
        <div className="flex space-x-3">
          <Button asChild className="flex-1 bg-red-600 hover:bg-red-700 text-white">
            <Link to={`/plans/${plan.id}`}>View Details</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 border-red-600 text-red-600 hover:bg-red-50">
            <Link to="/contact">Inquire</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="w-16 h-16 rounded-xl bg-red-50 flex items-center justify-center mb-6 text-red-600">
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-semibold mb-3 text-gray-900">{feature.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};

const Plans = () => {
  return (
    <>
      <SeoHead
        title="Travel Plans | Guide India Tours"
        description="Explore our curated Golden Triangle travel plans with options for every budget and preference. From essential packages to luxury experiences, find your perfect India journey."
        keywords="Golden Triangle packages, India tour packages, Delhi Agra Jaipur tours, Taj Mahal tours, India travel plans, luxury India tours"
        canonicalUrl="https://guideindia.tours/plans"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": travelPlans.map((plan, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "TouristTrip",
              "name": plan.title,
              "description": plan.description,
              "image": plan.image,
              "offers": {
                "@type": "Offer",
                "price": plan.price.replace(/[^0-9]/g, ''),
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": plan.rating,
                "reviewCount": plan.reviews
              }
            }
          }))
        }}
      />
      
      <Navbar />
      
      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-6xl font-light mb-6 text-gray-900">
                  Our Travel Plans
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Choose from our thoughtfully crafted itineraries or let us design a custom journey just for you. 
                  Each plan is carefully curated to provide authentic experiences and unforgettable memories.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-900">
                Why Choose Our Plans
              </h2>
              <p className="text-lg text-gray-600">
                Every journey is crafted with attention to detail and designed to exceed your expectations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {planFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Plans Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-900">
                Choose Your Journey
              </h2>
              <p className="text-lg text-gray-600">
                Discover our carefully crafted Golden Triangle itineraries designed to provide unforgettable experiences
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {travelPlans.map(plan => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Custom Itinerary Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-900">
                    Need a Custom Itinerary?
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Our travel experts can create a personalized journey based on your interests, timeframe, and budget. 
                    Whether you're a solo traveler, couple, family, or group, we'll design the perfect Golden Triangle experience for you.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900">Flexible Duration</h3>
                      <p className="text-sm text-gray-600">Trips from 3 days to 2+ weeks</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900">Accommodation Choice</h3>
                      <p className="text-sm text-gray-600">From heritage to ultra-luxury</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900">Special Interests</h3>
                      <p className="text-sm text-gray-600">Photography, cuisine, architecture</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900">Extensions Available</h3>
                      <p className="text-sm text-gray-600">Add destinations like Varanasi, Goa</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3" asChild>
                    <Link to="/contact">Request Custom Itinerary</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Find answers to common questions about our Golden Triangle tours
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-8"
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">What is the best time to visit the Golden Triangle?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    The ideal time to visit is from October to March when the weather is pleasant. Summer months (April to June) can be extremely hot, while July to September brings monsoon rains. December and January may have foggy mornings that can occasionally affect travel plans.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-8"
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">How many days do I need for a Golden Triangle tour?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    A minimum of 4 days is recommended to cover the basics of Delhi, Agra, and Jaipur. However, 5-7 days allow for a more relaxed pace and deeper exploration of each city. For extensions to places like Varanasi or Udaipur, additional days would be needed.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-8"
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Are meals included in your tour packages?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Most of our packages include daily breakfast at the hotels. Some packages, especially the luxury options, include additional meals. Specific meal inclusions are listed in each tour package. Your guide can recommend excellent dining options for meals not included in the package.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-8"
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">What's the booking and payment process?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    After finalizing your itinerary, we require a 25% deposit to confirm your booking. The remaining balance is due 30 days before your tour start date. We accept credit cards, bank transfers, and PayPal. For last-minute bookings (within 30 days), full payment is required at the time of booking.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-light mb-6">
                Ready to Experience the Golden Triangle?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Contact us today to book your preferred plan or discuss a custom itinerary tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3" asChild>
                  <Link to="/contact">Book Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3" asChild>
                  <a href="tel:+911234567890">Call Us</a>
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

export default Plans;
