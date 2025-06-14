
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Utensils, Plane, Camera, Mountain } from 'lucide-react';
import { TravelPlan } from '@/data/types/travelPlanTypes';

interface ItineraryMapProps {
  plan: TravelPlan;
}

const ItineraryMap = ({ plan }: ItineraryMapProps) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // For customized plan with single item
  if (plan.itinerary.length === 1 && plan.itinerary[0].day === null) {
    return (
      <div className="py-16 bg-gradient-to-br from-ivory-50 to-ivory-100">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center text-royal-800">
            Flexible Itinerary
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-ivory-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-maroon-600 rounded-full flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-royal-800">{plan.itinerary[0].title}</h3>
              </div>
              <p className="text-lg mb-8 text-royal-700 leading-relaxed">{plan.itinerary[0].description}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-royal-800 mb-1">Accommodation:</p>
                    <p className="text-royal-700">{plan.itinerary[0].accommodation}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Utensils className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-royal-800 mb-1">Meals:</p>
                    <p className="text-royal-700">{plan.itinerary[0].meals}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getActivityIcon = (index: number) => {
    const icons = [Plane, Camera, Mountain, MapPin, Utensils, Clock];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="py-16 bg-gradient-to-br from-ivory-50 to-ivory-100">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center text-royal-800">
            Journey Itinerary
          </h2>
          
          {/* Interactive Map Style Layout */}
          <div className="relative">
            {/* Journey Path */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-maroon-600 via-maroon-500 to-maroon-400 transform -translate-x-1/2 z-0"></div>
            
            {/* Itinerary Items */}
            <div className="space-y-12 lg:space-y-16">
              {plan.itinerary.map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center lg:items-start ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Day Number Circle */}
                  <div className="relative z-10 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 ${
                        selectedDay === index 
                          ? 'bg-maroon-600 text-white ring-4 ring-maroon-200' 
                          : 'bg-white text-maroon-600 border-2 border-maroon-600 hover:bg-maroon-50'
                      }`}
                      onClick={() => setSelectedDay(selectedDay === index ? null : index)}
                    >
                      <span className="font-bold text-lg">{day.day}</span>
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 lg:w-5/12 ml-6 lg:ml-0 ${
                    index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'
                  }`}>
                    <motion.div
                      layout
                      className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-ivory-200 hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-maroon-100 rounded-lg flex items-center justify-center mr-4">
                          {getActivityIcon(index)}
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-semibold text-royal-800 mb-1">
                            {day.title}
                          </h3>
                          <div className="flex items-center text-maroon-600 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Day {day.day}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-royal-700 mb-6 leading-relaxed">{day.description}</p>

                      {/* Details Grid */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-royal-800 mb-1">Accommodation:</p>
                            <p className="text-royal-700 text-sm">{day.accommodation}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Utensils className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-royal-800 mb-1">Meals:</p>
                            <p className="text-royal-700 text-sm">{day.meals}</p>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {selectedDay === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-ivory-200"
                        >
                          <h4 className="font-semibold text-royal-800 mb-3">Additional Details:</h4>
                          <div className="space-y-2 text-sm text-royal-700">
                            <p>• Professional guide included</p>
                            <p>• Transportation as per itinerary</p>
                            <p>• Entrance fees to monuments included</p>
                            <p>• Photography opportunities</p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Journey Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-ivory-200">
              <h3 className="text-2xl font-semibold text-royal-800 mb-4">Journey Highlights</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Calendar className="w-6 h-6 text-maroon-600" />
                  </div>
                  <p className="text-sm text-royal-700">{plan.itinerary.length} Days</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-6 h-6 text-maroon-600" />
                  </div>
                  <p className="text-sm text-royal-700">{plan.destinations?.length || 3} Cities</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Camera className="w-6 h-6 text-maroon-600" />
                  </div>
                  <p className="text-sm text-royal-700">Photo Ops</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Utensils className="w-6 h-6 text-maroon-600" />
                  </div>
                  <p className="text-sm text-royal-700">Local Cuisine</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ItineraryMap;
