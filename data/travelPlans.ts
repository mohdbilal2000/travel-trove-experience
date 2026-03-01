
import { TravelPlan } from "./types/travelPlanTypes";
import { classicPlans } from "./plans/classicPlans";
import { specializedPlans } from "./plans/specializedPlans";
import { extensionDestinations } from "./plans/extensionDestinations";
import { tourPlans } from "./plans/newTourPlans"; // Changed import name to avoid conflict
import { delhiPlans } from "./plans/delhiPlans";
import { agraPlans } from "./plans/agraPlans";
import { jaipurPlans } from "./plans/jaipurPlans";
import { rajasthanPlans } from "./plans/rajasthanPlans";

// Original travel plans data (for backwards compatibility)
export const travelPlans = [...classicPlans, ...specializedPlans, ...extensionDestinations];

// Additional destinations data (for backwards compatibility)
export const additionalDestinations = extensionDestinations;

// New tour plans data (renamed the imported variable to avoid conflict)
export const newTourPlans = tourPlans;

// Helper function to determine plan city priority for sorting
// Returns: 1 = Delhi, 2 = Agra, 3 = Jaipur, 4 = Golden Triangle (all cities)
const getCityPriority = (plan: TravelPlan): number => {
  const title = plan.title.toLowerCase();
  const description = plan.description.toLowerCase();
  const highlights = plan.highlights?.join(' ').toLowerCase() || '';
  const fullText = `${title} ${description} ${highlights}`;

  // Agra-specific plans (same day tours, Agra-focused)
  if (title.includes('agra tour') || title.includes('same day agra') || 
      (fullText.includes('agra') && !fullText.includes('delhi') && !fullText.includes('jaipur'))) {
    return 2; // Agra
  }

  // Jaipur-specific plans
  if ((title.includes('jaipur') || fullText.includes('jaipur')) && 
      !fullText.includes('delhi') && !fullText.includes('agra') && 
      !fullText.includes('golden triangle')) {
    return 3; // Jaipur
  }

  // Delhi-specific plans
  if ((title.includes('delhi') || fullText.includes('delhi')) && 
      !fullText.includes('agra') && !fullText.includes('jaipur') && 
      !fullText.includes('golden triangle')) {
    return 1; // Delhi
  }

  // Golden Triangle plans (cover all three cities)
  if (fullText.includes('golden triangle') || 
      (fullText.includes('delhi') && fullText.includes('agra') && fullText.includes('jaipur'))) {
    return 4; // Golden Triangle
  }

  // Default: if it mentions Delhi first, it's Delhi-priority
  if (fullText.includes('delhi')) return 1;
  if (fullText.includes('agra')) return 2;
  if (fullText.includes('jaipur')) return 3;

  return 5; // Other/Unknown
};

// Combine all plans and sort by city sequence: Delhi → Agra → Jaipur → Rajasthan → Golden Triangle → Others
const allPlansUnsorted = [...delhiPlans, ...agraPlans, ...jaipurPlans, ...rajasthanPlans, ...classicPlans, ...specializedPlans, ...extensionDestinations, ...tourPlans];

export const allPlans = allPlansUnsorted.sort((a, b) => {
  const priorityA = getCityPriority(a);
  const priorityB = getCityPriority(b);
  
  // First sort by city priority
  if (priorityA !== priorityB) {
    return priorityA - priorityB;
  }
  
  // Within same city, sort by duration (shorter first) or by ID
  const durationA = a.duration || '';
  const durationB = b.duration || '';
  
  // Extract days from duration for comparison
  const daysA = parseInt(durationA.match(/\d+/)?.[0] || '999');
  const daysB = parseInt(durationB.match(/\d+/)?.[0] || '999');
  
  if (daysA !== daysB) {
    return daysA - daysB;
  }
  
  // Finally sort by ID
  return a.id - b.id;
});

// Helper function to get a plan by ID (adding this as it's used in PlanDetail.tsx)
export const getPlanById = (id: number): TravelPlan | undefined => {
  return allPlans.find(plan => plan.id === id);
};

// Re-export types for easier imports
export type { TravelPlan, ItineraryDay, FAQItem } from "./types/travelPlanTypes";
