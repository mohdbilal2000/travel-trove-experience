import { TravelPlan } from "../types/travelPlanTypes";

// Specialized travel plans
export const specializedPlans: TravelPlan[] = [
  {
    id: 4,
    title: "Family Golden Triangle Adventure",
    duration: "6 Days / 5 Nights",
    price: "From $748 per adult",
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
    image: "/images/delhi/ashim-d-silva-KF7pv-8OiyY-unsplash.jpg",
    rating: 4.9,
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
    image: "/images/delhi/sagar-dwivedi-iR9xWm1JK20-unsplash.jpg",
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
    price: "From $3,499 per adult",
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
    image: "/images/agra/getty-images-ge82SKhuwCA-unsplash.jpg",
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
  },
  {
    id: 27,
    title: "Premium Luxury Tour, Travel & Guide Services",
    duration: "Flexible (3-21 Days)",
    price: "From $2,499 per adult",
    description: "Experience the ultimate in luxury travel with our exclusive tour, transport, and guide services. Designed for discerning travelers who demand nothing but the finest experiences in the Golden Triangle and beyond.",
    highlights: [
      "Luxury vehicles: Mercedes, BMW, Audi sedans & SUVs",
      "Expert multilingual guides (English, French, Spanish, German)",
      "Fast-track monument entry where available",
      "5-star hotel and restaurant reservations",
      "Private sunrise Taj Mahal tours",
      "Personal photographer services",
      "Curated shopping tours with personal stylists",
      "Sunset views and private boat rides",
      "Professional chauffeurs with WiFi-enabled vehicles"
    ],
    inclusions: [
      "Luxury transport with professional chauffeurs",
      "Licensed expert guides in multiple languages",
      "Fast-track entries and VIP access",
      "5-star dining reservations",
      "Personal photography assistance",
      "Premium refreshments and WiFi",
      "Customized itinerary planning",
      "24/7 concierge support",
      "Special experience arrangements",
      "Airport transfers in luxury vehicles"
    ],
    image: "/images/jaipur/dexter-fernandes-y97sM41-g9k-unsplash.jpg",
    rating: 5.0,
    reviews: 35,
    popular: true,
    itinerary: [
      {
        day: 1,
        title: "Luxury Arrival & Delhi Exploration",
        description: "Arrive in style with luxury airport transfer in Mercedes/BMW. Check into 5-star hotel with VIP treatment. Private guided tour of Delhi's monuments including Red Fort, Humayun's Tomb, and India Gate with fast-track entries. Evening cultural performance at luxury venue.",
        accommodation: "5-star luxury hotel in Delhi (Oberoi/Taj Palace)",
        meals: "Welcome lunch at 5-star restaurant, Dinner with cultural show"
      },
      {
        day: 2,
        title: "Agra - Private Taj Mahal Experience",
        description: "Early departure to Agra in luxury Toyota Fortuner/Land Cruiser. Private sunrise tour of Taj Mahal with expert historian guide. Visit Agra Fort with VIP access. Lunch at ITC Mughal or Oberoi Amarvilas. Evening visit to Mehtab Bagh for sunset views with personal photographer.",
        accommodation: "5-star heritage hotel in Agra",
        meals: "Breakfast, Luxury lunch, Dinner at palace restaurant"
      },
      {
        day: 3,
        title: "Jaipur - Royal Palace Experience",
        description: "Scenic drive to Jaipur via Fatehpur Sikri in luxury vehicle. Private tour of Amber Fort with elephant ride experience. Visit City Palace with curator-led tour and Hawa Mahal photo session. Evening shopping tour with personal stylist at best local boutiques.",
        accommodation: "Heritage palace hotel in Jaipur (Rambagh Palace/Taj Jai Mahal)",
        meals: "Breakfast, Royal lunch at palace, Traditional Rajasthani dinner"
      },
      {
        day: null,
        title: "Customizable Extension",
        description: "Extend your luxury experience to any destination of your choice - Udaipur's lakes, Kerala's backwaters, Goa's beaches, Kashmir's valleys, or even international destinations. Our luxury travel specialists will craft the perfect continuation of your journey with the same level of premium service and attention to detail.",
        accommodation: "Luxury resorts, heritage properties, or premium hotels",
        meals: "Fine dining experiences curated to your preferences"
      }
    ]
  },
]
