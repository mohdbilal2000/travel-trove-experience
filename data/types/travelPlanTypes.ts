
// Define types for our travel plans
export interface ItineraryDay {
  day: number | null;
  title: string;
  description: string;
  accommodation: string;
  meals: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// One stop in an hour-by-hour programme timeline. `day` is only set on
// multi-day programmes ("Day 2 · 06:00"); single-day tours omit it.
export interface TimelineStop {
  day?: number;
  time: string;
  title: string;
  description: string;
}

// One vehicle tier in the itemized pricing table. `totalEUR` is the package
// total for that vehicle from the rate card; null renders as
// "quote on WhatsApp" until the value is confirmed from GIT_Rate_Card.xlsx.
export interface VehicleTier {
  tier: string;
  models: string;
  capacity: string;
  totalEUR: number | null;
  basis?: string;
}

export interface MonumentTicket {
  monument: string;
  foreignerPrice: string;
  optional?: boolean;
}

// Itemized, transparent pricing block for real programmes.
export interface ProgrammePricing {
  basis: string;
  vehicleTiers: VehicleTier[];
  guideIncluded: string;
  languageSupplement: string;
  tickets: MonumentTicket[];
  ticketsNote: string;
  notIncluded: string[];
}

export interface TravelPlan {
  id: number;
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  image: string;
  rating: number;
  reviews: number;
  popular: boolean;
  itinerary: ItineraryDay[];
  destinations?: string[];
  price: string;
  faqs?: FAQItem[];
  // Real programmes (fixed itineraries with published from-prices) also carry:
  slug?: string;
  fromPriceEUR?: number;
  pricing?: ProgrammePricing;
  timeline?: TimelineStop[];
  // Path of the German-language version of this page, when one exists (e.g.
  // "/de/delhi-agra-same-day"), used to emit hreflang pairs.
  germanPath?: string;
}
