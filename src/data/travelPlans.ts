
import { TravelPlan } from "./types/travelPlanTypes";
import { classicPlans } from "./plans/classicPlans";
import { specializedPlans } from "./plans/specializedPlans";
import { extensionDestinations } from "./plans/extensionDestinations";
import { newTourPlans } from "./plans/newTourPlans";

// Original travel plans data (for backwards compatibility)
export const travelPlans = [...classicPlans, ...specializedPlans, ...extensionDestinations];

// Additional destinations data (for backwards compatibility)
export const additionalDestinations = extensionDestinations;

// New tour plans data
export const newTourPlans = newTourPlans;

// Combine all plans for easy access
export const allPlans = [...classicPlans, ...specializedPlans, ...extensionDestinations, ...newTourPlans];

// Re-export types for easier imports
export type { TravelPlan, ItineraryDay, FAQItem } from "./types/travelPlanTypes";
