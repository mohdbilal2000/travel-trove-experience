
import { TravelPlan } from "../types/travelPlanTypes";

// Specialized travel plans
export const specializedPlans: TravelPlan[] = [
  {
    id: 4,
    title: "Family Golden Triangle Adventure",
    duration: "6 Days / 5 Nights",
    price: "From $749 per person",
    description: "A family-friendly exploration of the Golden Triangle with activities and experiences designed to engage travelers of all ages.",
    highlights: [
      "Interactive historical tours",
      "Elephant ride & painting activity",
      "Pottery workshop in Jaipur",
      "Wildlife safari in Ranthambore",
      "Cooking class with local family",
      "Bollywood movie experience"
    ],
    inclusions: [
      "5 nights in family-friendly hotels",
      "All breakfasts and select meals",
      "Comfortable family van with WiFi",
      "Kid-friendly guides",
      "All activities and entrance fees",
      "Airport transfers",
      "Welcome gifts for children"
    ],
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviews: 68,
    popular: false,
    itinerary: [
      {
        day: 1,
        title: "Family Arrival in Delhi",
        description: "Arrive in Delhi and transfer to your family-friendly hotel. Welcome kit for children with India-themed games and activities. Evening orientation and interactive welcome dinner.",
        accommodation: "Family suite at 4-star hotel in Delhi",
        meals: "Welcome dinner"
      },
      {
        day: 2,
        title: "Delhi Family Exploration",
        description: "Interactive tour of Delhi with child-friendly storytelling at major sites. Rickshaw ride through Old Delhi, kite flying at India Gate, and hands-on crafts workshop. Evening Bollywood movie experience.",
        accommodation: "Family suite at 4-star hotel in Delhi",
        meals: "Breakfast, Lunch"
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Drive to Agra with engaging stories and games during journey. Visit Wildlife SOS Elephant Conservation Center. Afternoon visit to Agra Fort with treasure hunt activity. Evening view of Taj Mahal from Mehtab Bagh.",
        accommodation: "Family suite at 4-star hotel in Agra",
        meals: "Breakfast, Picnic lunch"
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        description: "Early morning visit to Taj Mahal with specialized children's guide. Drive to Jaipur via Fatehpur Sikri with interactive history lessons. Evening puppet show and Rajasthani folk performance at hotel.",
        accommodation: "Family suite at 4-star hotel in Jaipur",
        meals: "Breakfast, Dinner"
      },
      {
        day: 5,
        title: "Jaipur Family Activities",
        description: "Morning elephant ride at Amber Fort followed by elephant painting workshop. Family pottery class and block printing activity. Afternoon cooking class with local family learning to make simple Indian dishes.",
        accommodation: "Family suite at 4-star hotel in Jaipur",
        meals: "Breakfast, Cooking class dinner"
      },
      {
        day: 6,
        title: "Jaipur and Departure",
        description: "Morning at leisure for shopping or optional activities. Visit to local school (when possible) for cultural exchange. Transfer to airport for departure with farewell gifts.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 5,
    title: "Golden Triangle & Udaipur",
    duration: "8 Days / 7 Nights",
    price: "From $1,099 per person",
    description: "Combine the classic Golden Triangle with the romantic lake city of Udaipur for a comprehensive North India experience.",
    highlights: [
      "Delhi's historical monuments",
      "Sunrise Taj Mahal visit",
      "Jaipur's majestic palaces",
      "Scenic drive to Udaipur",
      "Lake Pichola boat cruise",
      "City Palace complex tour",
      "Vintage car museum"
    ],
    inclusions: [
      "7 nights in 4-5 star hotels",
      "Daily breakfast and select dinners",
      "Private air-conditioned vehicle",
      "Professional English-speaking guides",
      "All entrance fees",
      "Airport & hotel transfers",
      "Lake cruise in Udaipur"
    ],
    image: "https://images.unsplash.com/photo-1590080554240-485e651e5ac3?q=80&w=2069&auto=format&fit=crop",
    rating: 4.9,
    reviews: 54,
    popular: true,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description: "Arrive at Delhi International Airport and transfer to your hotel. Rest and refresh before a brief orientation meeting with your guide.",
        accommodation: "4-star hotel in Delhi",
        meals: "None"
      },
      {
        day: 2,
        title: "Delhi Exploration",
        description: "Full day tour of Delhi visiting major attractions including Red Fort, Jama Masjid, Humayun's Tomb, and Qutub Minar. Drive past government buildings in New Delhi.",
        accommodation: "4-star hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Morning drive to Agra. Afternoon visit to Agra Fort and Itimad-ud-Daulah (Baby Taj). Evening at leisure or optional visit to Kalakriti cultural show.",
        accommodation: "4-star hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        description: "Early morning visit to the Taj Mahal at sunrise. Return for breakfast, then drive to Jaipur via Fatehpur Sikri. Evening arrival in Jaipur.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 5,
        title: "Jaipur Exploration",
        description: "Full day sightseeing of Jaipur including Amber Fort, City Palace, Jantar Mantar observatory, and a photo stop at Hawa Mahal. Optional evening cultural performance or bazaar visit.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 6,
        title: "Jaipur to Udaipur",
        description: "Morning drive to Udaipur (approx. 6-7 hours) through the scenic Aravalli Hills. Afternoon arrival and check-in at hotel. Evening at leisure to explore the surroundings.",
        accommodation: "4-star hotel in Udaipur",
        meals: "Breakfast"
      },
      {
        day: 7,
        title: "Udaipur Exploration",
        description: "Full day tour of Udaipur including City Palace, Jagdish Temple, Saheliyon-ki-Bari gardens, and the Vintage Car Museum. Evening boat cruise on Lake Pichola with views of the Lake Palace.",
        accommodation: "4-star hotel in Udaipur",
        meals: "Breakfast, Farewell dinner"
      },
      {
        day: 8,
        title: "Udaipur Departure",
        description: "Morning at leisure or optional visit to nearby Eklingji and Nagda temples. Transfer to Udaipur airport for departure flight.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 6,
    title: "Customized Golden Triangle",
    duration: "Flexible",
    price: "Custom quote",
    description: "Design your perfect Golden Triangle experience with our expert planners. Customize every aspect from accommodations to activities based on your interests and preferences.",
    highlights: [
      "Personalized itinerary planning",
      "Choice of accommodation categories",
      "Flexible pace and schedule",
      "Special interest focus options",
      "Unique experiences and activities",
      "Dining preferences accommodated"
    ],
    inclusions: [
      "Accommodations of your choice",
      "Meals as per your preference",
      "Transportation options",
      "Specialized guides as needed",
      "Customized activities",
      "Personalized service throughout",
      "24/7 concierge support"
    ],
    image: "https://images.unsplash.com/photo-1567157577697-31de07e43f9b?q=80&w=2070&auto=format&fit=crop",
    rating: 5.0,
    reviews: 42,
    popular: false,
    itinerary: [
      {
        day: null,
        title: "Fully Customizable",
        description: "This plan is completely customizable based on your preferences, interests, timeframe, and budget. Our expert travel planners will work with you to create a personalized itinerary that matches your exact requirements.",
        accommodation: "Your choice of accommodations from heritage properties to luxury resorts",
        meals: "Flexible meal plans based on your preferences"
      }
    ]
  },
  {
    id: 26,
    title: "VIP Luxury Golden Triangle Experience",
    duration: "Flexible (5-15 Days)",
    price: "From $3,500 per person",
    description: "The ultimate luxury experience combining the Golden Triangle with any destination of your choice. Enjoy exclusive VIP services, heritage palace hotels, private jet transfers, and bespoke experiences crafted just for you.",
    highlights: [
      "Private jet or helicopter transfers available",
      "Exclusive stays in palace hotels and luxury resorts",
      "Personal butler and concierge services",
      "Private guided tours with renowned historians",
      "Michelin-starred dining experiences",
      "Exclusive access to monuments after hours",
      "Custom spa and wellness treatments",
      "Luxury shopping with personal stylists",
      "Private cultural performances"
    ],
    inclusions: [
      "Luxury palace hotels and heritage properties",
      "All meals at finest restaurants",
      "Private luxury vehicles with chauffeur",
      "Personal guide and butler services",
      "Private jet/helicopter transfers (optional)",
      "Exclusive experiences and access",
      "24/7 VIP concierge support",
      "Custom itinerary planning",
      "Premium spa treatments",
      "Luxury shopping assistance"
    ],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    rating: 5.0,
    reviews: 28,
    popular: true,
    itinerary: [
      {
        day: null,
        title: "Bespoke Luxury Experience",
        description: "This exclusive VIP experience is completely tailored to your desires. Whether you want to explore the Golden Triangle with private monument access, add destinations like Kashmir, Goa, Kerala, or international locations, our luxury travel specialists will create an unforgettable journey with the finest accommodations, transport, and experiences money can buy.",
        accommodation: "Heritage palaces, luxury resorts, or exclusive private villas",
        meals: "World-class cuisine with personal chefs and exclusive dining venues"
      }
    ]
  }
]
