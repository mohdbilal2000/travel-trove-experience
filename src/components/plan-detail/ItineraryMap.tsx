
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Utensils, Plane, Camera, Mountain, Star, Crown, Car } from 'lucide-react';
import { TravelPlan } from '@/data/types/travelPlanTypes';

interface ItineraryMapProps {
  plan: TravelPlan;
}

const ItineraryMap = ({ plan }: ItineraryMapProps) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Beautiful background images for different types of days
  const dayBackgrounds = [
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop", // Delhi
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=3634&auto=format&fit=crop", // Nature/Wildlife
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=4928&auto=format&fit=crop", // Colorful flowers
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=3648&auto=format&fit=crop", // Mountain landscape
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=3072&auto=format&fit=crop", // Pine trees
    "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=7360&auto=format&fit=crop", // Water body
    "https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=4752&auto=format&fit=crop", // Camels
  ];

  // For customized plan with single item
  if (plan.itinerary.length === 1 && plan.itinerary[0].day === null) {
    return (
      <div className="py-16 bg-gradient-to-br from-ivory-50 to-ivory-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-maroon-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-royal-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center text-royal-800">
            Flexible Luxury Itinerary
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-ivory-200">
              {/* Luxury header with image */}
              <div className="relative h-48 bg-gradient-to-r from-maroon-900 to-royal-800">
                <img 
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
                  alt="Luxury Experience"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Crown className="w-16 h-16 text-white" />
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-maroon-600 to-royal-600 rounded-full flex items-center justify-center mr-4">
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
      </div>
    );
  }

  const getActivityIcon = (index: number) => {
    const icons = [Plane, Camera, Mountain, MapPin, Utensils, Clock, Star, Crown, Car];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-5 h-5" />;
  };

  const getBackgroundImage = (index: number) => {
    return dayBackgrounds[index % dayBackgrounds.length];
  };

  return (
    <div className="py-16 bg-gradient-to-br from-ivory-50 to-ivory-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-16 w-64 h-64 bg-maroon-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-royal-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-maroon-400 to-royal-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
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
            {/* Enhanced Journey Path with gradient */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-maroon-600 via-maroon-500 to-royal-600 transform -translate-x-1/2 z-0 rounded-full shadow-lg"></div>
            
            {/* Floating decorative elements */}
            <div className="hidden lg:block absolute left-1/2 top-1/4 w-4 h-4 bg-maroon-400 rounded-full transform -translate-x-1/2 animate-pulse"></div>
            <div className="hidden lg:block absolute left-1/2 top-3/4 w-4 h-4 bg-royal-400 rounded-full transform -translate-x-1/2 animate-pulse delay-1000"></div>
            
            {/* Itinerary Items */}
            <div className="space-y-12 lg:space-y-20">
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
                  {/* Enhanced Day Number Circle */}
                  <div className="relative z-10 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-500 relative overflow-hidden ${
                        selectedDay === index 
                          ? 'bg-gradient-to-br from-maroon-600 to-royal-600 text-white ring-4 ring-maroon-200 shadow-maroon-300/50' 
                          : 'bg-white text-maroon-600 border-3 border-maroon-600 hover:bg-gradient-to-br hover:from-maroon-50 hover:to-royal-50 shadow-maroon-200/30'
                      }`}
                      onClick={() => setSelectedDay(selectedDay === index ? null : index)}
                    >
                      <span className="font-bold text-xl relative z-10">{day.day}</span>
                      {selectedDay === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 bg-gradient-to-br from-maroon-400/20 to-royal-400/20 rounded-full"
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Enhanced Content Card with background image */}
                  <div className={`flex-1 lg:w-5/12 ml-6 lg:ml-0 ${
                    index % 2 === 0 ? 'lg:pr-20' : 'lg:pl-20'
                  }`}>
                    <motion.div
                      layout
                      whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-ivory-200 transition-all duration-500 group"
                    >
                      {/* Beautiful header with blended image */}
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={getBackgroundImage(index)}
                          alt={`Day ${day.day} Experience`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 via-maroon-600/40 to-transparent"></div>
                        <div className="absolute bottom-4 left-6 right-6">
                          <div className="flex items-center text-white space-x-3">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                              {getActivityIcon(index)}
                            </div>
                            <div>
                              <h3 className="text-xl lg:text-2xl font-semibold mb-1">
                                {day.title}
                              </h3>
                              <div className="flex items-center text-white/90 text-sm">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>Day {day.day}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 lg:p-8">
                        {/* Description with enhanced styling */}
                        <p className="text-royal-700 mb-6 leading-relaxed text-base">{day.description}</p>

                        {/* Enhanced Details Grid */}
                        <div className="grid sm:grid-cols-2 gap-6 mb-6">
                          <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-maroon-50 to-royal-50 rounded-xl">
                            <MapPin className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-semibold text-royal-800 mb-1">Accommodation:</p>
                              <p className="text-royal-700 text-sm">{day.accommodation}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-royal-50 to-maroon-50 rounded-xl">
                            <Utensils className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-semibold text-royal-800 mb-1">Meals:</p>
                              <p className="text-royal-700 text-sm">{day.meals}</p>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Details with enhanced styling */}
                        {selectedDay === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4 }}
                            className="pt-6 border-t border-gradient-to-r from-maroon-200 to-royal-200"
                          >
                            <h4 className="font-semibold text-royal-800 mb-4 flex items-center">
                              <Star className="w-5 h-5 text-maroon-600 mr-2" />
                              Additional Highlights:
                            </h4>
                            <div className="space-y-3 text-sm text-royal-700">
                              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-ivory-100 to-ivory-50 rounded-lg">
                                <div className="w-2 h-2 bg-maroon-600 rounded-full"></div>
                                <p>Professional multilingual guide included</p>
                              </div>
                              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-ivory-50 to-ivory-100 rounded-lg">
                                <div className="w-2 h-2 bg-royal-600 rounded-full"></div>
                                <p>Luxury transportation with WiFi</p>
                              </div>
                              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-ivory-100 to-ivory-50 rounded-lg">
                                <div className="w-2 h-2 bg-maroon-600 rounded-full"></div>
                                <p>Fast-track monument entries where available</p>
                              </div>
                              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-ivory-50 to-ivory-100 rounded-lg">
                                <div className="w-2 h-2 bg-royal-600 rounded-full"></div>
                                <p>Professional photography assistance</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Journey Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 text-center"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto border border-ivory-200">
              {/* Header with gradient */}
              <div className="relative h-24 bg-gradient-to-r from-maroon-600 to-royal-600">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center justify-center h-full">
                  <h3 className="text-2xl font-semibold text-white">Journey Highlights</h3>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-maroon-100 to-maroon-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-8 h-8 text-maroon-600" />
                    </div>
                    <p className="text-sm text-royal-700 font-medium">{plan.itinerary.length} Days</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-royal-100 to-royal-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8 text-royal-600" />
                    </div>
                    <p className="text-sm text-royal-700 font-medium">{plan.destinations?.length || 3} Cities</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-maroon-100 to-royal-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Camera className="w-8 h-8 text-maroon-600" />
                    </div>
                    <p className="text-sm text-royal-700 font-medium">Photo Ops</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-royal-100 to-maroon-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Utensils className="w-8 h-8 text-royal-600" />
                    </div>
                    <p className="text-sm text-royal-700 font-medium">Local Cuisine</p>
                  </div>
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
