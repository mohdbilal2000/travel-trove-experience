
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
}
