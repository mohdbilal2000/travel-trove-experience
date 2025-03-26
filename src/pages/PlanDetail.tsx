import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, Star, Users, PhoneCall, Mail, Calendar as CalendarIcon } from "lucide-react";
import SeoHead from "@/components/shared/SeoHead";

// Import the plans data from Plans.tsx
const travelPlans = [
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
  },
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
  }
];

// Add new destinations
const additionalDestinations = [
  {
    id: 7,
    title: "Golden Triangle with Kerala Backwaters",
    duration: "10 Days / 9 Nights",
    price: "From $1,299 per person",
    description: "Experience the contrasts of India with the historical Golden Triangle and the serene Kerala backwaters in one magnificent journey.",
    highlights: [
      "Complete Golden Triangle tour",
      "Flight to Kochi",
      "Kerala backwater houseboat stay",
      "Ayurvedic experiences",
      "Spice plantation visit",
      "Traditional Kathakali performance",
      "Beach relaxation in Kovalam"
    ],
    inclusions: [
      "9 nights accommodation including houseboat",
      "Daily breakfast and select meals",
      "All transportation including domestic flights",
      "Expert guides throughout",
      "All entrance fees and activities",
      "Airport transfers",
      "Houseboat cruise with meals"
    ],
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=2073&auto=format&fit=crop",
    rating: 4.9,
    reviews: 47,
    popular: true,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description: "Arrive in Delhi and transfer to your hotel. Evening welcome briefing.",
        accommodation: "4-star hotel in Delhi",
        meals: "None"
      },
      {
        day: 2,
        title: "Delhi Exploration",
        description: "Full day tour of Delhi's major attractions.",
        accommodation: "4-star hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Drive to Agra and visit Agra Fort. Evening Taj Mahal view at sunset.",
        accommodation: "4-star hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        description: "Sunrise visit to Taj Mahal. Drive to Jaipur via Fatehpur Sikri.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 5,
        title: "Jaipur Exploration",
        description: "Full day tour of Jaipur's magnificent palaces and forts.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 6,
        title: "Jaipur to Kochi",
        description: "Morning flight to Kochi. Transfer to hotel and evening at leisure.",
        accommodation: "Heritage hotel in Kochi",
        meals: "Breakfast"
      },
      {
        day: 7,
        title: "Kochi Exploration",
        description: "Tour of Fort Kochi including Dutch Palace, Jewish Synagogue, and Chinese fishing nets. Evening Kathakali dance performance.",
        accommodation: "Heritage hotel in Kochi",
        meals: "Breakfast"
      },
      {
        day: 8,
        title: "Kochi to Alleppey Houseboat",
        description: "Transfer to Alleppey to board your private houseboat. Cruise through the picturesque backwaters passing villages and rice paddies.",
        accommodation: "Private houseboat",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 9,
        title: "Alleppey to Kovalam",
        description: "Disembark houseboat and drive to Kovalam beach. Afternoon at leisure for beach activities.",
        accommodation: "Beach resort in Kovalam",
        meals: "Breakfast"
      },
      {
        day: 10,
        title: "Kovalam Departure",
        description: "Morning free for beach relaxation or optional Ayurvedic spa treatment. Transfer to Trivandrum airport for departure.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 8,
    title: "Golden Triangle with Ranthambore",
    duration: "7 Days / 6 Nights",
    price: "From $969 per person",
    description: "Combine the cultural wonders of the Golden Triangle with the thrill of wildlife spotting at Ranthambore National Park, home to the majestic Bengal tiger.",
    highlights: [
      "Golden Triangle sightseeing",
      "Two safari drives in Ranthambore",
      "Chance to spot tigers in the wild",
      "Ancient fort of Ranthambore",
      "Diverse wildlife encounters",
      "Cultural and natural experiences"
    ],
    inclusions: [
      "6 nights accommodation",
      "Daily breakfast and all meals in Ranthambore",
      "Private transportation throughout",
      "2 safari drives with naturalist",
      "Expert guides at all locations",
      "All entrance fees",
      "All transfers"
    ],
    image: "https://images.unsplash.com/photo-1578326457399-3b34dbbf23b8?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviews: 62,
    popular: true,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description: "Arrive in Delhi and transfer to your hotel. Evening at leisure.",
        accommodation: "4-star hotel in Delhi",
        meals: "None"
      },
      {
        day: 2,
        title: "Delhi Exploration",
        description: "Full day sightseeing of Old and New Delhi.",
        accommodation: "4-star hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Drive to Agra and visit Agra Fort. Sunset view of Taj Mahal.",
        accommodation: "4-star hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 4,
        title: "Agra to Ranthambore",
        description: "Morning visit to Taj Mahal at sunrise. Drive to Ranthambore National Park via Fatehpur Sikri.",
        accommodation: "Wildlife resort in Ranthambore",
        meals: "Breakfast, Dinner"
      },
      {
        day: 5,
        title: "Ranthambore National Park",
        description: "Morning and afternoon safari drives in the park with naturalist guide, searching for tigers and other wildlife. Visit to Ranthambore Fort between safaris.",
        accommodation: "Wildlife resort in Ranthambore",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 6,
        title: "Ranthambore to Jaipur",
        description: "Morning safari in Ranthambore. After breakfast, drive to Jaipur. Evening at leisure to explore local markets.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 7,
        title: "Jaipur and Departure",
        description: "Full day exploration of Jaipur including Amber Fort, City Palace and Hawa Mahal. Transfer to airport for departure.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 9,
    title: "Rajasthan Royal Heritage",
    duration: "10 Days / 9 Nights",
    price: "From $1,449 per person",
    description: "Experience the royal heritage of Rajasthan with stays in palace hotels and visits to magnificent forts, colorful markets, and traditional villages.",
    highlights: [
      "Golden Triangle highlights",
      "Jodhpur's blue city exploration",
      "Udaipur's lake palaces",
      "Village safari in rural Rajasthan",
      "Heritage hotel stays",
      "Cultural performances and folk art"
    ],
    inclusions: [
      "9 nights in heritage hotels",
      "Daily breakfast and select meals",
      "Luxury transportation",
      "Expert local guides",
      "All entrance fees",
      "Cultural activities",
      "Airport transfers"
    ],
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2066&auto=format&fit=crop",
    rating: 4.9,
    reviews: 75,
    popular: true,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description: "Arrive in Delhi and transfer to a heritage hotel. Welcome dinner with cultural briefing.",
        accommodation: "Heritage hotel in Delhi",
        meals: "Welcome dinner"
      },
      {
        day: 2,
        title: "Delhi Exploration",
        description: "Full day tour of Old and New Delhi's highlights.",
        accommodation: "Heritage hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Morning drive to Agra. Afternoon visit to Agra Fort and Itimad-ud-Daulah.",
        accommodation: "Heritage hotel in Agra",
        meals: "Breakfast, Dinner"
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        description: "Sunrise Taj Mahal visit. Drive to Jaipur via Fatehpur Sikri.",
        accommodation: "Heritage palace hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 5,
        title: "Jaipur Exploration",
        description: "Full day tour of Amber Fort, City Palace, and other attractions. Evening cultural performance.",
        accommodation: "Heritage palace hotel in Jaipur",
        meals: "Breakfast, Dinner"
      },
      {
        day: 6,
        title: "Jaipur to Jodhpur",
        description: "Drive to Jodhpur. Evening walk in the old blue city.",
        accommodation: "Heritage hotel in Jodhpur",
        meals: "Breakfast"
      },
      {
        day: 7,
        title: "Jodhpur Exploration",
        description: "Visit to Mehrangarh Fort, Jaswant Thada, and local markets. Afternoon village safari.",
        accommodation: "Heritage hotel in Jodhpur",
        meals: "Breakfast, Lunch"
      },
      {
        day: 8,
        title: "Jodhpur to Udaipur",
        description: "Scenic drive to Udaipur visiting Ranakpur Jain Temples en route.",
        accommodation: "Lake view hotel in Udaipur",
        meals: "Breakfast"
      },
      {
        day: 9,
        title: "Udaipur Exploration",
        description: "City Palace complex tour, boat ride on Lake Pichola, and local arts exploration.",
        accommodation: "Lake view hotel in Udaipur",
        meals: "Breakfast, Farewell dinner"
      },
      {
        day: 10,
        title: "Udaipur Departure",
        description: "Morning at leisure. Transfer to airport for departure.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 10,
    title: "Himalayan Expedition",
    duration: "9 Days / 8 Nights",
    price: "From $1,299 per person",
    description: "Experience the majesty of the Himalayas with visits to Shimla, Dharamshala, and other mountain destinations with stunning views and cultural experiences.",
    highlights: [
      "Delhi to Shimla hill train journey",
      "Himalayan panoramic views",
      "Buddhist monasteries",
      "McLeod Ganj and Dalai Lama complex",
      "Nature walks and soft treks",
      "Mountain cultures and cuisine"
    ],
    inclusions: [
      "8 nights mountain accommodation",
      "Daily breakfast and dinners",
      "Transportation including heritage train",
      "Expert mountain guides",
      "All activities and entrance fees",
      "Airport transfers",
      "Guided meditation session"
    ],
    image: "https://images.unsplash.com/photo-1606210122158-eeb10e0823bf?q=80&w=2034&auto=format&fit=crop",
    rating: 4.8,
    reviews: 56,
    popular: false,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description: "Arrive in Delhi and transfer to hotel. Evening briefing about the Himalayan journey ahead.",
        accommodation: "4-star hotel in Delhi",
        meals: "None"
      },
      {
        day: 2,
        title: "Delhi to Shimla",
        description: "Morning train to Kalka followed by the famous toy train journey to Shimla. Evening walk on the Mall Road.",
        accommodation: "Heritage hotel in Shimla",
        meals: "Breakfast, Dinner"
      },
      {
        day: 3,
        title: "Shimla Exploration",
        description: "Visit to Viceregal Lodge, Christ Church, and Jakhu Temple. Afternoon nature walk.",
        accommodation: "Heritage hotel in Shimla",
        meals: "Breakfast, Dinner"
      },
      {
        day: 4,
        title: "Shimla to Dharamshala",
        description: "Scenic drive through the Himalayan foothills to Dharamshala. Evening at leisure in McLeod Ganj.",
        accommodation: "Mountain resort in Dharamshala",
        meals: "Breakfast, Dinner"
      },
      {
        day: 5,
        title: "Dharamshala Exploration",
        description: "Visit to Dalai Lama complex, Namgyal Monastery, and Norbulingka Institute. Afternoon meditation session.",
        accommodation: "Mountain resort in Dharamshala",
        meals: "Breakfast, Dinner"
      },
      {
        day: 6,
        title: "Dharamshala to Dalhousie",
        description: "Drive to the colonial hill station of Dalhousie. Evening walk through pine forests.",
        accommodation: "Heritage hotel in Dalhousie",
        meals: "Breakfast, Dinner"
      },
      {
        day: 7,
        title: "Dalhousie and Khajjiar",
        description: "Day trip to Khajjiar, known as 'Mini Switzerland'. Picnic lunch and nature activities.",
        accommodation: "Heritage hotel in Dalhousie",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 8,
        title: "Dalhousie to Amritsar",
        description: "Descend from the mountains to Amritsar. Evening visit to Golden Temple for the Palki ceremony.",
        accommodation: "4-star hotel in Amritsar",
        meals: "Breakfast"
      },
      {
        day: 9,
        title: "Amritsar Departure",
        description: "Morning visit to Jallianwala Bagh and Wagah Border ceremony (time permitting). Transfer to airport for departure.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  }
];

// Combine all plans
const allPlans = [...travelPlans, ...additionalDestinations
