
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the best time to visit the Golden Triangle?",
    answer: "The ideal time to visit is from October to March when the weather is pleasant. Summer months (April to June) can be extremely hot, while July to September brings monsoon rains. December and January may have foggy mornings that can occasionally affect travel plans."
  },
  {
    question: "How many days do I need for a Golden Triangle tour?",
    answer: "A minimum of 4 days is recommended to cover the basics of Delhi, Agra, and Jaipur. However, 5-7 days allow for a more relaxed pace and deeper exploration of each city. For extensions to places like Varanasi or Udaipur, additional days would be needed."
  },
  {
    question: "Are meals included in your tour packages?",
    answer: "Most of our packages include daily breakfast at the hotels. Some packages, especially the luxury options, include additional meals. Specific meal inclusions are listed in each tour package. Your guide can recommend excellent dining options for meals not included in the package."
  },
  {
    question: "What's the booking and payment process?",
    answer: "After finalizing your itinerary, we require a 25% deposit to confirm your booking. The remaining balance is due 30 days before your tour start date. We accept credit cards, bank transfers, and PayPal. For last-minute bookings (within 30 days), full payment is required at the time of booking."
  },
  {
    question: "Can you accommodate dietary restrictions during the tour?",
    answer: "Yes, we can accommodate various dietary requirements including vegetarian, vegan, gluten-free, and other restrictions. Please inform us of your needs when booking, and we'll ensure that appropriate meals are arranged throughout your journey."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-[#FDF6E3]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our Golden Triangle tours
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-maroon-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-maroon-600 flex-shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 pt-0">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-display font-medium mb-4 text-gray-900">
              Ready to Experience the Golden Triangle?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contact us today to book your preferred plan or discuss a custom itinerary tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToTop}
                className="px-6 py-3 bg-maroon-600 text-white font-medium rounded-lg hover:bg-maroon-700 transition-colors"
              >
                Book Now
              </button>
              <button
                onClick={scrollToTop}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Call Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
