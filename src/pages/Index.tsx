
import SeoHead from "@/components/shared/SeoHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  // Structured data for the travel agency
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://guideindia.tours/#organization",
    "name": "Guide India Tours",
    "description": "Premium travel services for India's Golden Triangle: Delhi, Agra, and Jaipur",
    "url": "https://guideindia.tours",
    "logo": {
      "@type": "ImageObject",
      "url": "https://guideindia.tours/logo.png",
      "width": "180",
      "height": "60"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Travel Street",
      "addressLocality": "New Delhi",
      "postalCode": "110001",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-123-456-7890",
      "contactType": "customer service",
      "email": "info@guideindia.tours",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.facebook.com/guideindia",
      "https://www.instagram.com/guideindia",
      "https://twitter.com/guideindia"
    ],
    "areaServed": ["Delhi", "Agra", "Jaipur"],
    "priceRange": "$$$"
  };
  
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://guideindia.tours/#website",
    "url": "https://guideindia.tours",
    "name": "Guide India Tours",
    "description": "Premium travel services for Golden Triangle: Delhi, Agra, and Jaipur",
    "publisher": {
      "@id": "https://guideindia.tours/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://guideindia.tours/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://guideindia.tours/"
      }
    ]
  };

  return (
    <>
      <SeoHead
        title="Guide India Tours | Delhi, Agra, Jaipur Travel Expert"
        description="Experience the magic of India's Golden Triangle with our premium travel services. Explore Delhi, Agra, and Jaipur with customized tours, luxury accommodations, and expert guides."
        keywords="Golden Triangle Tours, Delhi tours, Agra tours, Jaipur tours, Taj Mahal visit, India travel packages, luxury India tours, same day Agra tour, Jaipur sightseeing"
        canonicalUrl="https://guideindia.tours"
        structuredData={[organizationSchema, websiteSchema, breadcrumbSchema]}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Beyond the Golden Triangle Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light mb-4 text-royal-800">
                  Beyond the Golden Triangle
                </h2>
                <p className="text-lg text-royal-700/80 max-w-3xl mx-auto leading-relaxed">
                  Enhance your Golden Triangle experience with these extraordinary destinations that showcase India's diversity
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Varanasi",
                  description: "Experience the spiritual heart of India with its ancient temples and River Ganges ceremonies.",
                  image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop"
                },
                {
                  name: "Udaipur",
                  description: "Discover the romantic city of lakes with its stunning palaces and rich cultural heritage.",
                  image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop"
                },
                {
                  name: "Gujarat",
                  description: "Explore the vibrant state with its rich history, spiritual sites, and cultural landmarks.",
                  image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop"
                },
                {
                  name: "Shimla",
                  description: "Escape to the hills and enjoy the stunning Himalayan landscapes and colonial charm.",
                  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop"
                }
              ].map((destination, index) => (
                <motion.div
                  key={destination.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <Link to="/plans" className="block">
                    <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-lg font-display font-medium text-white mb-1">
                            {destination.name}
                          </h3>
                          <p className="text-white/90 text-sm leading-relaxed">
                            {destination.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <FeaturedDestinations />
        <Services />
        
        {/* CTA Section */}
        <section className="py-20 bg-royal-800 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light mb-6 text-white">
                  Ready to Experience the Magic of Golden Triangle?
                </h2>
                <p className="text-lg md:text-xl mb-10 text-white/90 leading-relaxed max-w-3xl mx-auto">
                  Let us help you plan the perfect journey through Delhi, Agra, and Jaipur. Our expert team will craft an unforgettable experience tailored to your preferences.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-royal-800 px-8 py-3" asChild>
                    <Link to="/plans">View Our Plans</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-royal-800 px-8 py-3" asChild>
                    <Link to="/contact">Custom Itinerary</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-0 w-40 h-40 rounded-full bg-amber-500/20 transform -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-amber-500/10 transform translate-y-1/3 translate-x-1/3" />
        </section>
        
        <Testimonials />
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
