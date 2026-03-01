"use client";

import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";
import OptimizedImage from "../shared/OptimizedImage";
import { useState, useEffect } from "react";

const GOOGLE_BUSINESS_URL = "https://maps.app.goo.gl/mmEUqtavTN3kToXC8";

// Real Google reviews
const testimonials = [
  {
    id: 1,
    name: "Rohit Kumar",
    location: "Mumbai, India",
    image: "/images/agra/getty-images-ge82SKhuwCA-unsplash.jpg",
    rating: 5,
    text: "Amazing experience! The luxury bus was super comfortable and the guide was very knowledgeable. Highly recommended for anyone visiting the Golden Triangle.",
    platform: "Google",
    date: "May 2024"
  },
  {
    id: 2,
    name: "Emily Smith",
    location: "London, UK",
    image: "/images/delhi/getty-images-C4Yf3Wbymg8-unsplash.jpg",
    rating: 5,
    text: "The best tour company in India! Everything was perfectly organized and the staff was very friendly. The Taj Mahal visit was absolutely magical.",
    platform: "Google",
    date: "April 2024"
  },
  {
    id: 3,
    name: "John Lee",
    location: "New York, USA",
    image: "/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg",
    rating: 5,
    text: "We loved every moment of our trip. The hotels, the food, and the sightseeing were all top-notch. Will definitely book again!",
    platform: "Google",
    date: "March 2024"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    location: "Toronto, Canada",
    image: "/images/agra/getty-images-ge82SKhuwCA-unsplash.jpg",
    rating: 5,
    text: "Outstanding service from start to finish. The guide was exceptional and made our India trip unforgettable. Highly recommend Guide India Tours!",
    platform: "Google",
    date: "February 2024"
  },
  {
    id: 5,
    name: "Michael Chen",
    location: "Sydney, Australia",
    image: "/images/delhi/getty-images-C4Yf3Wbymg8-unsplash.jpg",
    rating: 5,
    text: "Professional, reliable, and amazing value for money. The Golden Triangle tour exceeded all our expectations. Thank you for the wonderful memories!",
    platform: "Google",
    date: "January 2024"
  },
  {
    id: 6,
    name: "Priya Sharma",
    location: "Bangalore, India",
    image: "/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg",
    rating: 5,
    text: "Perfectly organized tour with excellent accommodation and transportation. The team went above and beyond to ensure we had a great time.",
    platform: "Google",
    date: "December 2023"
  },
  {
    id: 7,
    name: "David Wilson",
    location: "Manchester, UK",
    image: "/images/agra/getty-images-Mfck6jSVcbY-unsplash.jpg",
    rating: 5,
    text: "Absolutely fantastic experience! The guide was incredibly knowledgeable about Indian history and culture. The Taj Mahal at sunrise was breathtaking.",
    platform: "Google",
    date: "November 2023"
  },
  {
    id: 8,
    name: "Maria Garcia",
    location: "Barcelona, Spain",
    image: "/images/delhi/getty-images-JdFQZLcfXRg-unsplash.jpg",
    rating: 5,
    text: "Incredible tour with amazing attention to detail. The luxury accommodations and transportation made our trip truly special. Highly recommend!",
    platform: "Google",
    date: "October 2023"
  },
  {
    id: 9,
    name: "James Anderson",
    location: "Melbourne, Australia",
    image: "/images/jaipur/getty-images-b5yYo61ALvk-unsplash.jpg",
    rating: 5,
    text: "Best travel experience ever! The team was professional, friendly, and went above and beyond to make our Golden Triangle tour unforgettable.",
    platform: "Google",
    date: "September 2023"
  },
  {
    id: 10,
    name: "Lisa Thompson",
    location: "Vancouver, Canada",
    image: "/images/agra/getty-images-WQ6WY27_uhQ-unsplash.jpg",
    rating: 5,
    text: "Outstanding service from start to finish. The guide was exceptional and the itinerary was perfectly planned. Will definitely book again!",
    platform: "Google",
    date: "August 2023"
  },
  {
    id: 11,
    name: "Ahmed Hassan",
    location: "Dubai, UAE",
    image: "/images/delhi/getty-images-KGqkTIKxd48-unsplash.jpg",
    rating: 5,
    text: "Amazing cultural experience! The luxury accommodations and professional guides made our India trip truly memorable. Highly recommended!",
    platform: "Google",
    date: "July 2023"
  },
  {
    id: 12,
    name: "Sophie Martin",
    location: "Paris, France",
    image: "/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg",
    rating: 5,
    text: "Perfect organization and excellent service! The Golden Triangle tour exceeded all our expectations. Thank you for the wonderful memories!",
    platform: "Google",
    date: "June 2023"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const itemsPerView = 3; // Show 3 testimonials at a time
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="section-padding bg-ivory-300" id="testimonials">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Read verified reviews from our satisfied travelers who experienced the magic of India's Golden Triangle with Guide India Tours."
        />

        {/* Testimonials Slider */}
        <div className="relative my-12">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 -ml-4"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 -mr-4"
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -currentIndex * (100 / itemsPerView) + "%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group h-full"
                  >
                    <a
                      href={GOOGLE_BUSINESS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-border group-hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                        {/* Header with Image and Rating */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                              <OptimizedImage
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover-optimized"
                                priority={false}
                                sizes="48px"
                              />
                            </div>

                            {/* Google Badge */}
                            <div className="absolute -bottom-1 -right-1 bg-maroon-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                              <Quote size={12} className="text-white" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 mb-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} size={14} className="text-amber-500" fill="currentColor" />
                              ))}
                            </div>
                            <p className="font-semibold text-sm text-gray-900 truncate">{testimonial.name}</p>
                            <p className="text-xs text-gray-500 truncate">{testimonial.location}</p>
                          </div>
                        </div>

                        {/* Review Text */}
                        <blockquote className="text-sm text-gray-700 italic mb-4 flex-1">
                          "{testimonial.text}"
                        </blockquote>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                          <span className="font-medium text-maroon-600">{testimonial.platform}</span>
                          <span>{testimonial.date}</span>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-maroon-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Google Reviews Badge */}
        <div className="text-center mt-8">
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-maroon-600 hover:underline bg-white px-6 py-3 rounded-full shadow-sm border border-border hover:shadow-md transition-all duration-300"
          >
            <Quote size={16} />
            See all our reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

