
import { TravelPlan } from "./types/travelPlanTypes";
import { classicPlans } from "./plans/classicPlans";
import { specializedPlans } from "./plans/specializedPlans";
import { extensionDestinations } from "./plans/extensionDestinations";
import { tourPlans } from "./plans/newTourPlans"; // Changed import name to avoid conflict

// Original travel plans data (for backwards compatibility)
export const travelPlans = [...classicPlans, ...specializedPlans, ...extensionDestinations];

// Additional destinations data (for backwards compatibility)
export const additionalDestinations = extensionDestinations;

// New tour plans data (renamed the imported variable to avoid conflict)
export const newTourPlans = tourPlans;

// Combine all plans for easy access
export const allPlans = [...classicPlans, ...specializedPlans, ...extensionDestinations, ...tourPlans];

// Helper function to get a plan by ID (adding this as it's used in PlanDetail.tsx)
export const getPlanById = (id: number): TravelPlan | undefined => {
  return allPlans.find(plan => plan.id === id);
};

// Re-export types for easier imports
export type { TravelPlan, ItineraryDay, FAQItem } from "./types/travelPlanTypes";
