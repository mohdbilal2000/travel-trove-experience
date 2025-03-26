
import { TravelPlan } from "@/data/travelPlans";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PlanFeaturesProps {
  plan: TravelPlan;
}

const PlanFeatures = ({ plan }: PlanFeaturesProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Highlights */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">Trip Highlights</h2>
            <ul className="space-y-3">
              {plan.highlights.map((highlight, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  variants={item}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </span>
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Inclusions */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">What's Included</h2>
            <ul className="space-y-3">
              {plan.inclusions.map((inclusion, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  variants={item}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </span>
                  <span>{inclusion}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlanFeatures;
