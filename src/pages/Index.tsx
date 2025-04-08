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
        <FeaturedDestinations />
        <Services />
        
        {/* CTA Section */}
        <section className="py-20 bg-maroon-600/5 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-medium mb-4 text-maroon-600">
                  Ready to Experience the Magic of Golden Triangle?
                </h2>
                <p className="text-lg mb-8 text-charcoal-500/80">
                  Let us help you plan the perfect journey through Delhi, Agra, and Jaipur. Our expert team will craft an unforgettable experience tailored to your preferences.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" variant="default" asChild>
                    <Link to="/plans">View Our Plans</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/contact">Custom Itinerary</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-0 w-40 h-40 rounded-full bg-amber-500/20 transform -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-maroon-600/10 transform translate-y-1/3 translate-x-1/3" />
        </section>
        
        <Testimonials />
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
