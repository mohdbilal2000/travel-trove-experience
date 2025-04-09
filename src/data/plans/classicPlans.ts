
import { TravelPlan } from "../types/travelPlanTypes";

// Original travel plans data
export const classicPlans: TravelPlan[] = [
  {
    id: 1,
    title: "Golden Triangle Essential",
    duration: "4 Days / 3 Nights",
    price: "From $599 per person",
    description: "A perfect introduction to India's classic circuit, visiting Delhi, Agra, and Jaipur with comfortable accommodations and guided sightseeing.",
    highlights: [
      "Old & New Delhi city tour",
      "Sunrise visit to Taj Mahal",
      "Agra Fort exploration",
      "Amber Fort in Jaipur",
      "City Palace & Hawa Mahal tour"
    ],
    inclusions: [
      "3 nights accommodation in 4-star hotels",
      "Daily breakfast and select meals",
      "Private air-conditioned vehicle",
      "English-speaking guide",
      "Monument entrance fees",
      "Airport transfers"
    ],
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
    rating: 4.7,
    reviews: 124,
    popular: true,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description: "Arrive at Delhi International Airport where our representative will meet and greet you. Transfer to your hotel for check-in. If time permits, enjoy a brief orientation tour of the capital. Evening at leisure to rest or explore nearby markets.",
        accommodation: "4-star hotel in Delhi",
        meals: "Welcome dinner"
      },
      {
        day: 2,
        title: "Delhi to Agra",
        description: "After breakfast, drive to Agra (approx. 4 hours). Check-in at your hotel and freshen up. In the afternoon, visit the magnificent Agra Fort, a UNESCO World Heritage site. In the evening, enjoy a sunset view of the Taj Mahal from Mehtab Bagh gardens across the river.",
        accommodation: "4-star hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Agra to Jaipur",
        description: "Early morning visit to the Taj Mahal at sunrise to witness the monument in the magical morning light. Return to hotel for breakfast, then drive to Jaipur (approx. 5 hours), stopping at Fatehpur Sikri, the abandoned Mughal city en route. Arrive in Jaipur by evening and check-in to your hotel.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 4,
        title: "Jaipur and Departure",
        description: "After breakfast, explore the Amber Fort with an optional elephant ride to the entrance. Later visit the City Palace, Jantar Mantar observatory, and drive past Hawa Mahal (Palace of Winds). After lunch, transfer to Jaipur airport for your onward journey or drive back to Delhi (additional cost).",
        accommodation: "None",
        meals: "Breakfast, Farewell lunch"
      }
    ]
  },
  {
    id: 2,
    title: "Golden Triangle Luxury",
    duration: "5 Days / 4 Nights",
    price: "From $999 per person",
    description: "Experience the Golden Triangle in style with luxury accommodations, personalized service, and exclusive experiences in Delhi, Agra, and Jaipur.",
    highlights: [
      "Comprehensive Delhi heritage tour",
      "Private sunrise Taj Mahal experience",
      "Fatehpur Sikri excursion",
      "Elephant ride at Amber Fort",
      "Luxury dining experiences",
      "Cultural performances"
    ],
    inclusions: [
      "4 nights in 5-star luxury hotels",
      "All meals included",
      "Premium air-conditioned SUV",
      "Expert guide throughout",
      "All entrance fees and activities",
      "VIP airport transfers",
      "Complimentary spa treatment"
    ],
    image: "https://images.unsplash.com/photo-1602642977157-b7c8b8003afd?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    reviews: 86,
    popular: false,
    itinerary: [
      {
        day: 1,
        title: "VIP Arrival in Delhi",
        description: "Arrive at Delhi International Airport where our VIP representative will welcome you with a traditional greeting. Enjoy fast-track immigration and customs clearance. Transfer to your luxury hotel in a premium vehicle. Evening welcome dinner at an exclusive restaurant with cultural performance.",
        accommodation: "5-star luxury hotel in Delhi",
        meals: "Welcome dinner"
      },
      {
        day: 2,
        title: "Delhi Heritage Tour",
        description: "Enjoy a comprehensive tour of Old and New Delhi, including Jama Masjid, Red Fort, Humayun's Tomb, Qutub Minar, and the President's House. Experience a rickshaw ride through Chandni Chowk and lunch at a heritage haveli. Evening at leisure with optional spa treatment at hotel.",
        accommodation: "5-star luxury hotel in Delhi",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "After breakfast, drive to Agra in a luxury vehicle. Check-in at your hotel and enjoy lunch. Visit the Agra Fort with a specialized historian guide. Evening sunset champagne experience with views of the Taj Mahal, followed by a fine dining Mughlai dinner.",
        accommodation: "5-star luxury hotel in Agra",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        description: "Early private access to the Taj Mahal at sunrise with a photography expert. Return for breakfast, then drive to Jaipur, stopping at Fatehpur Sikri with a private guided tour. Lunch at a heritage palace en route. Arrive in Jaipur for a traditional welcome and check-in.",
        accommodation: "5-star luxury hotel in Jaipur",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 5,
        title: "Jaipur and Departure",
        description: "After breakfast, visit Amber Fort with an elephant ride and private access to normally restricted areas. Explore the City Palace including the royal quarters, followed by Jantar Mantar and shopping at exclusive boutiques. Farewell lunch before transfer to airport or return to Delhi.",
        accommodation: "None (or optional extension)",
        meals: "Breakfast, Farewell lunch"
      }
    ]
  },
  {
    id: 3,
    title: "Golden Triangle with Varanasi",
    duration: "7 Days / 6 Nights",
    price: "From $899 per person",
    description: "Extend your Golden Triangle journey to include the spiritual city of Varanasi, witnessing the sacred Ganges River rituals and ancient temples.",
    highlights: [
      "Delhi's top attractions",
      "Taj Mahal and Agra Fort",
      "Pink City of Jaipur exploration",
      "Domestic flight to Varanasi",
      "Evening Ganga Aarti ceremony",
      "Sunrise boat ride on the Ganges",
      "Buddhist site of Sarnath"
    ],
    inclusions: [
      "6 nights accommodation in 4-star hotels",
      "Daily breakfast and select meals",
      "Transportation including domestic flight",
      "Expert guides in each city",
      "All entrance fees",
      "All transfers",
      "Boat ride in Varanasi"
    ],
    image: "https://images.unsplash.com/photo-1591804966755-f424e16fed2c?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviews: 92,
    popular: true,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description: "Arrive at Delhi International Airport and transfer to your hotel. Rest and recover from jet lag with a relaxing evening at the hotel.",
        accommodation: "4-star hotel in Delhi",
        meals: "None"
      },
      {
        day: 2,
        title: "Delhi Exploration",
        description: "Full day sightseeing of Delhi including Red Fort, Jama Masjid, Humayun's Tomb, and Qutub Minar. Drive past government buildings of New Delhi and visit India Gate.",
        accommodation: "4-star hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Morning drive to Agra. Visit Agra Fort and enjoy an evening view of the Taj Mahal at sunset.",
        accommodation: "4-star hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        description: "Early morning visit to the Taj Mahal. Drive to Jaipur via Fatehpur Sikri. Arrive in Jaipur by evening.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 5,
        title: "Jaipur Exploration",
        description: "Full day tour of Jaipur including Amber Fort, City Palace, Jantar Mantar and a photo stop at Hawa Mahal.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 6,
        title: "Jaipur to Varanasi",
        description: "Morning flight to Varanasi. Check-in at hotel. Evening visit to witness the spectacular Ganga Aarti ceremony on the ghats.",
        accommodation: "4-star hotel in Varanasi",
        meals: "Breakfast"
      },
      {
        day: 7,
        title: "Varanasi and Departure",
        description: "Early morning boat ride on the Ganges to witness the sunrise and morning rituals. Visit Sarnath where Buddha gave his first sermon. Transfer to airport for departure.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  }
]
