
import { motion } from "framer-motion";
import { Clock, MapPin, Star, Users } from "lucide-react";
import { TravelPlan } from "@/data/travelPlans";

interface PlanHeaderProps {
  plan: TravelPlan;
}

const PlanHeader = ({ plan }: PlanHeaderProps) => {
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="h-[50vh] md:h-[60vh] w-full relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${plan.image})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container max-w-6xl mx-auto"
          >
            <div className="flex items-center mb-2 space-x-2">
              <span className="px-3 py-1 bg-primary rounded-full text-sm font-medium">
                {plan.duration}
              </span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span className="ml-1 text-sm">{plan.rating} ({plan.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">{plan.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base mb-6">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Golden Triangle, India</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{plan.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>Groups up to 12</span>
              </div>
            </div>

            <p className="text-white/90 max-w-2xl mb-4">
              {plan.description}
            </p>
            
            <div className="text-xl md:text-2xl font-display">
              <span className="font-bold">{plan.price}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlanHeader;
