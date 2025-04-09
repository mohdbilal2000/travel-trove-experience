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
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-border group hover:shadow-md transition-all"
    >
      <Link to={`/plans/${plan.id}`} className="block">
        <div className="relative h-56 overflow-hidden">
          <img 
            src={plan.image} 
            alt={plan.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {plan.popular && (
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
              Popular Choice
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-4 px-6">
            <div className="flex items-center text-white space-x-1.5">
              <Star className="h-4 w-4 text-primary fill-current" />
              <span className="font-medium">{plan.rating}</span>
              <span className="text-xs text-white/80">({plan.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Clock className="h-4 w-4 mr-1.5" />
          {plan.duration}
        </div>
        
        <Link to={`/plans/${plan.id}`} className="block">
          <h3 className="text-xl font-display font-medium mb-2 hover:text-primary transition-colors">{plan.title}</h3>
        </Link>
        <p className="text-primary font-medium mb-3">{plan.price}</p>
        <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Highlights:</h4>
          <ul className="space-y-1.5">
            {plan.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="flex text-sm">
                <ChevronRight className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
            {plan.highlights.length > 3 && (
              <li className="text-sm text-primary">+ {plan.highlights.length - 3} more highlights</li>
            )}
          </ul>
        </div>
        
        <div className="flex space-x-2">
          <Button asChild className="flex-1 justify-center">
            <Link to={`/plans/${plan.id}`}>View Details</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 justify-center">
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
      className="bg-white p-6 rounded-xl border border-border"
    >
      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 text-primary">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground">{feature.description}</p>
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
      
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-b from-muted to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-medium mb-6">
                Our Travel Plans
              </h1>
              <p className="text-lg text-muted-foreground">
                Choose from our thoughtfully crafted itineraries or let us design a custom journey just for you.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {planFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Choose Your Journey" 
              subtitle="Discover our carefully crafted Golden Triangle itineraries designed to provide unforgettable experiences"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {travelPlans.map(plan => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-primary/5 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-sm border border-border"
              >
                <h2 className="text-3xl font-display font-medium mb-4 text-center">
                  Need a Custom Itinerary?
                </h2>
                <p className="text-muted-foreground mb-6 text-center">
                  Our travel experts can create a personalized journey based on your interests, timeframe, and budget. Whether you're a solo traveler, couple, family, or group, we'll design the perfect Golden Triangle experience for you.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Flexible Duration</h3>
                      <p className="text-sm text-muted-foreground">Trips from 3 days to 2+ weeks</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Accommodation Choice</h3>
                      <p className="text-sm text-muted-foreground">From heritage to ultra-luxury</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Special Interests</h3>
                      <p className="text-sm text-muted-foreground">Photography, cuisine, architecture</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Extensions Available</h3>
                      <p className="text-sm text-muted-foreground">Add destinations like Varanasi, Goa</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button size="lg" asChild>
                    <Link to="/contact">Request Custom Itinerary</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute top-1/3 left-0 w-40 h-40 rounded-full bg-primary/10 transform -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/5 transform translate-y-1/3 translate-x-1/3" />
        </section>
        
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Frequently Asked Questions" 
              subtitle="Find answers to common questions about our Golden Triangle tours"
            />
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 shadow-sm border border-border"
                >
                  <h3 className="text-lg font-medium mb-2">What is the best time to visit the Golden Triangle?</h3>
                  <p className="text-muted-foreground">
                    The ideal time to visit is from October to March when the weather is pleasant. Summer months (April to June) can be extremely hot, while July to September brings monsoon rains. December and January may have foggy mornings that can occasionally affect travel plans.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 shadow-sm border border-border"
                >
                  <h3 className="text-lg font-medium mb-2">How many days do I need for a Golden Triangle tour?</h3>
                  <p className="text-muted-foreground">
                    A minimum of 4 days is recommended to cover the basics of Delhi, Agra, and Jaipur. However, 5-7 days allow for a more relaxed pace and deeper exploration of each city. For extensions to places like Varanasi or Udaipur, additional days would be needed.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 shadow-sm border border-border"
                >
                  <h3 className="text-lg font-medium mb-2">Are meals included in your tour packages?</h3>
                  <p className="text-muted-foreground">
                    Most of our packages include daily breakfast at the hotels. Some packages, especially the luxury options, include additional meals. Specific meal inclusions are listed in each tour package. Your guide can recommend excellent dining options for meals not included in the package.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 shadow-sm border border-border"
                >
                  <h3 className="text-lg font-medium mb-2">What's the booking and payment process?</h3>
                  <p className="text-muted-foreground">
                    After finalizing your itinerary, we require a 25% deposit to confirm your booking. The remaining balance is due 30 days before your tour start date. We accept credit cards, bank transfers, and PayPal. For last-minute bookings (within 30 days), full payment is required at the time of booking.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 shadow-sm border border-border"
                >
                  <h3 className="text-lg font-medium mb-2">Can you accommodate dietary restrictions during the tour?</h3>
                  <p className="text-muted-foreground">
                    Yes, we can accommodate various dietary requirements including vegetarian, vegan, gluten-free, and other restrictions. Please inform us of your needs when booking, and we'll ensure that appropriate meals are arranged throughout your journey.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
                Ready to Experience the Golden Triangle?
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Contact us today to book your preferred plan or discuss a custom itinerary tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">Book Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
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
