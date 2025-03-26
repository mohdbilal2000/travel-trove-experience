
import { TravelPlan } from "@/data/travelPlans";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, Clock, Utensils } from "lucide-react";

interface ItineraryProps {
  plan: TravelPlan;
}

const Itinerary = ({ plan }: ItineraryProps) => {
  // For customized plan with single item
  if (plan.itinerary.length === 1 && plan.itinerary[0].day === null) {
    return (
      <div className="py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">Flexible Itinerary</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">{plan.itinerary[0].title}</h3>
            <p className="mb-6">{plan.itinerary[0].description}</p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Accommodation:</p>
                  <p>{plan.itinerary[0].accommodation}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Utensils className="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Meals:</p>
                  <p>{plan.itinerary[0].meals}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">Day-by-Day Itinerary</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {plan.itinerary.map((day, index) => (
              <AccordionItem key={index} value={`day-${index}`} className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
                <AccordionTrigger className="px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center text-left">
                    <div className="flex-shrink-0 mr-4 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="font-semibold">{day.day}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{day.title}</h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-white">
                  <p className="mb-6 text-gray-700">{day.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Accommodation:</p>
                        <p>{day.accommodation}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Utensils className="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Meals:</p>
                        <p>{day.meals}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

export default Itinerary;
