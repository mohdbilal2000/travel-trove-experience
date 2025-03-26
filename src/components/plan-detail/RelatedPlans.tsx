
import { TravelPlan, allPlans } from "@/data/travelPlans";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface RelatedPlansProps {
  currentPlanId: number;
}

const RelatedPlans = ({ currentPlanId }: RelatedPlansProps) => {
  // Get 3 related plans excluding the current one
  const relatedPlans = allPlans
    .filter(plan => plan.id !== currentPlanId)
    .sort(() => 0.5 - Math.random()) // Random sort
    .slice(0, 3);

  return (
    <div className="py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">
          Related Plans
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link to={`/plans/${plan.id}`} className="block h-full">
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={plan.image} 
                      alt={plan.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                    {plan.popular && (
                      <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-gray-600">{plan.duration}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm ml-1">{plan.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{plan.title}</h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {plan.description}
                    </p>
                    
                    <div className="flex items-center text-gray-500 text-xs">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>Golden Triangle, India</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 mt-auto">
                    <div className="text-primary font-semibold">{plan.price}</div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedPlans;
