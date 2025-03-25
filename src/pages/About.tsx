
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import Button from "@/components/shared/Button";
import { Link } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";

// Team members data
const teamMembers = [
  {
    name: "Raj Sharma",
    position: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop",
    bio: "With over 15 years of experience in the travel industry, Raj founded Golden Triangle Tours with a vision to showcase the authentic beauty of India to travelers from around the world."
  },
  {
    name: "Priya Agarwal",
    position: "Head of Operations",
    image: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=1972&auto=format&fit=crop",
    bio: "Priya ensures that every journey runs smoothly, managing our team of guides and drivers while maintaining our high standards of service excellence."
  },
  {
    name: "Amit Patel",
    position: "Senior Tour Guide",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    bio: "A history enthusiast with encyclopedic knowledge of Indian culture and heritage, Amit has been leading tours for over a decade with passion and insight."
  },
  {
    name: "Neha Singh",
    position: "Customer Relations Manager",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop",
    bio: "Neha works closely with clients to understand their needs and preferences, ensuring personalized service from the first inquiry to post-trip follow-up."
  }
];

// Values data
const values = [
  {
    title: "Authentic Experiences",
    description: "We go beyond tourist attractions to provide genuine cultural immersion and meaningful connections with local communities."
  },
  {
    title: "Personalized Service",
    description: "Every journey is tailored to your interests, pace, and preferences, ensuring a truly personalized travel experience."
  },
  {
    title: "Responsible Tourism",
    description: "We are committed to sustainable practices that respect local cultures and minimize environmental impact."
  },
  {
    title: "Attention to Detail",
    description: "From luxury accommodations to seamless transfers, we handle every aspect of your journey with meticulous care."
  },
  {
    title: "Local Expertise",
    description: "Our team of guides and planners offers in-depth knowledge and insider perspectives on India's history and culture."
  },
  {
    title: "Quality Assurance",
    description: "We maintain the highest standards in all our services, regularly evaluating and improving our offerings."
  }
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Golden Triangle Tours</title>
        <meta name="description" content="Learn about Golden Triangle Tours, our story, mission, and the passionate team dedicated to creating unforgettable travel experiences in Delhi, Agra, and Jaipur." />
      </Helmet>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-muted to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-medium mb-6">
                About Us
              </h1>
              <p className="text-lg text-muted-foreground">
                Passionate travel experts dedicated to creating authentic, unforgettable experiences across India's Golden Triangle.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop" 
                  alt="Golden Triangle Tours team" 
                  className="rounded-xl shadow-lg w-full h-[500px] object-cover"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-display font-medium mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2010, Golden Triangle Tours began with a simple mission: to share the authentic beauty, rich history, and vibrant culture of India's iconic Golden Triangle with travelers from around the world.
                  </p>
                  <p>
                    What started as a small family business has grown into a respected travel company, but our core values remain unchanged. We believe that travel should be transformative, educational, and deeply personal.
                  </p>
                  <p>
                    Over the years, we've had the privilege of introducing thousands of visitors to the wonders of Delhi, Agra, and Jaipur. Each journey we plan is crafted with attention to detail, cultural sensitivity, and a commitment to excellence.
                  </p>
                  <p>
                    Our team consists of passionate travel experts, many of whom were born and raised in the regions we explore. This local expertise, combined with our commitment to customer service, ensures that every Golden Triangle experience is authentic and unforgettable.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button as={Link} to="/services">
                    Our Services
                  </Button>
                  <Button variant="outline" as={Link} to="/contact">
                    Contact Us
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Our Values" 
              subtitle="The principles that guide us in creating exceptional travel experiences"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-border h-full"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Check className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-display font-medium mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Meet Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Meet Our Team" 
              subtitle="The passionate experts behind your unforgettable Golden Triangle experience"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-border group hover:shadow-md transition-all"
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-medium">{member.name}</h3>
                    <p className="text-primary text-sm mb-3">{member.position}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <h2 className="text-3xl font-display font-medium mb-6">Why Choose Golden Triangle Tours?</h2>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <ChevronRight className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Local Expertise</h3>
                      <p className="text-muted-foreground">Our team has insider knowledge and deep connections to the destinations we serve.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <ChevronRight className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Personalized Experiences</h3>
                      <p className="text-muted-foreground">We tailor every journey to match your interests, preferences, and pace.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <ChevronRight className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Exceptional Value</h3>
                      <p className="text-muted-foreground">Premium experiences at fair prices, with no hidden costs or surprise fees.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <ChevronRight className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Attention to Detail</h3>
                      <p className="text-muted-foreground">We handle every aspect of your journey with meticulous care and precision.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <ChevronRight className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">24/7 Support</h3>
                      <p className="text-muted-foreground">Our team is always available to assist you throughout your journey.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button as={Link} to="/plans">
                    Explore Our Plans
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2070&auto=format&fit=crop" 
                    alt="Golden Triangle experience" 
                    className="rounded-xl shadow-lg w-full h-auto"
                  />
                  <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                    <img 
                      src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=2070&auto=format&fit=crop" 
                      alt="Cultural experience" 
                      className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg shadow-xl border-4 border-white"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
                Ready to Explore with Us?
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Let us help you create unforgettable memories in India's Golden Triangle. Contact our team today to begin planning your journey.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" as={Link} to="/contact">
                  Get in Touch
                </Button>
                <Button size="lg" variant="outline" as={Link} to="/plans">
                  View Travel Plans
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

export default About;
