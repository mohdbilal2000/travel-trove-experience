
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "United States",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    text: "Our Golden Triangle tour was absolutely magical! The guides were knowledgeable, accommodations were luxurious, and every detail was perfectly arranged. The Taj Mahal at sunrise was a life-changing experience."
  },
  {
    id: 2,
    name: "David Chen",
    location: "Australia",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    text: "The personalized itinerary made our family trip special. Our children loved the elephant ride in Jaipur, and we appreciated the flexibility to explore at our own pace. Highly recommend the private car service!"
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "United Kingdom",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    text: "As someone of Indian heritage returning to explore my roots, this tour exceeded all expectations. The cultural insights, food experiences, and attention to detail were impeccable. A journey I'll cherish forever."
  },
  {
    id: 4,
    name: "Thomas Weber",
    location: "Germany",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 5,
    text: "Impeccable service from start to finish. The hotels were stunning, especially the heritage property in Jaipur. Our guide Raj was outstanding - his knowledge of history made each site come alive for us."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Client Testimonials" 
          subtitle="Hear what our clients have to say about their unforgettable journeys through India's Golden Triangle."
        />
        
        <div className="relative max-w-4xl mx-auto my-12">
          {/* Testimonial Slider */}
          <div className="overflow-hidden rounded-xl bg-background p-6 md:p-10 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-8"
              >
                {/* Image */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute -bottom-3 -right-3 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <Star size={16} fill="white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-2">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-primary" fill="currentColor" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg italic mb-4">
                    "{testimonials[currentIndex].text}"
                  </blockquote>
                  
                  <div>
                    <p className="font-medium text-lg">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transform -translate-x-1/2 pointer-events-auto focus:outline-none hover:bg-primary/10 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transform translate-x-1/2 pointer-events-auto focus:outline-none hover:bg-primary/10 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
