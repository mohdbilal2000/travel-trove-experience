
import { TravelPlan } from "../types/travelPlanTypes";

// New tour plans data - renamed the export to avoid conflict with the main export
export const tourPlans: TravelPlan[] = [
  {
    id: 11,
    title: "Express Golden Triangle Tour",
    duration: "3 Days",
    price: "Starting from $350 per person",
    description: "A fast-paced itinerary for travelers with limited time, covering essentials efficiently.",
    highlights: [
      "Delhi: India Gate, Qutub Minar, Lotus Temple",
      "Agra: Taj Mahal, Agra Fort",
      "Jaipur: Amber Fort, City Palace"
    ],
    inclusions: [
      "Budget accommodations",
      "Shared transportation",
      "Daily breakfast"
    ],
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop",
    rating: 4.3,
    reviews: 78,
    popular: false,
    itinerary: [
      {
        day: 1,
        title: "Delhi to Agra",
        description: "Morning tour of Delhi covering India Gate, Qutub Minar, and Lotus Temple. Afternoon drive to Agra.",
        accommodation: "Budget hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 2,
        title: "Agra to Jaipur",
        description: "Early morning visit to Taj Mahal and Agra Fort. Afternoon drive to Jaipur.",
        accommodation: "Budget hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Jaipur and Departure",
        description: "Morning visit to Amber Fort and City Palace. Afternoon return to Delhi for departure.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 12,
    title: "Classic Golden Triangle Tour",
    duration: "4 Days",
    price: "Starting from $700 per person",
    description: "A balanced tour offering comfort and value with a well-paced exploration.",
    highlights: [
      "Delhi: Red Fort, Jama Masjid, Humayun's Tomb, India Gate",
      "Agra: Taj Mahal, Agra Fort, Fatehpur Sikri",
      "Jaipur: Amber Fort, City Palace, Hawa Mahal"
    ],
    inclusions: [
      "3-star hotels",
      "Private car with driver",
      "Daily breakfast",
      "Select dinners"
    ],
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2070&auto=format&fit=crop",
    rating: 4.6,
    reviews: 145,
    popular: true,
    itinerary: [
      {
        day: 1,
        title: "Delhi Exploration",
        description: "Full day tour of Delhi visiting Red Fort, Jama Masjid, Humayun's Tomb, and India Gate.",
        accommodation: "3-star hotel in Delhi",
        meals: "Breakfast, Welcome dinner"
      },
      {
        day: 2,
        title: "Delhi to Agra",
        description: "Morning drive to Agra. Afternoon visit to Taj Mahal and Agra Fort.",
        accommodation: "3-star hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Agra to Jaipur",
        description: "Drive to Jaipur via Fatehpur Sikri. Evening arrival in Jaipur.",
        accommodation: "3-star hotel in Jaipur",
        meals: "Breakfast, Dinner"
      },
      {
        day: 4,
        title: "Jaipur and Departure",
        description: "Morning visit to Amber Fort, City Palace, and Hawa Mahal. Afternoon return to Delhi for departure.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 13,
    title: "Deluxe Golden Triangle Tour",
    duration: "5 Days",
    price: "Starting from $1,200 per person",
    description: "A luxurious experience with premium services and personalized attention.",
    highlights: [
      "Delhi: Red Fort, Qutub Minar, India Gate",
      "Agra: Taj Mahal at sunrise, Agra Fort, Mehtab Bagh",
      "Jaipur: Amber Fort with elephant ride, City Palace, Jantar Mantar"
    ],
    inclusions: [
      "5-star hotels",
      "Private car with driver",
      "All meals",
      "Private local guides"
    ],
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    reviews: 112,
    popular: true,
    itinerary: [
      {
        day: 1,
        title: "Delhi Arrival",
        description: "Arrive in Delhi, transfer to 5-star hotel. Evening welcome dinner.",
        accommodation: "5-star hotel in Delhi",
        meals: "Welcome dinner"
      },
      {
        day: 2,
        title: "Delhi Exploration",
        description: "Full day tour of Delhi with private guide visiting major attractions.",
        accommodation: "5-star hotel in Delhi",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Morning drive to Agra. Afternoon visit to Agra Fort and Mehtab Bagh for sunset views of Taj Mahal.",
        accommodation: "5-star hotel in Agra",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        description: "Sunrise visit to Taj Mahal. Drive to Jaipur with stop at Fatehpur Sikri.",
        accommodation: "5-star hotel in Jaipur",
        meals: "Breakfast, Lunch, Dinner"
      },
      {
        day: 5,
        title: "Jaipur and Departure",
        description: "Morning visit to Amber Fort with elephant ride, City Palace, and Jantar Mantar. Evening return to Delhi.",
        accommodation: "None",
        meals: "Breakfast, Lunch"
      }
    ]
  },
  {
    id: 14,
    title: "Cultural Immersion Golden Triangle Tour",
    duration: "6 Days",
    price: "Starting from $900 per person",
    description: "Deep cultural engagement with hands-on local experiences.",
    highlights: [
      "Delhi: Cooking class, local market visits",
      "Agra: Taj Mahal, marble inlay workshop",
      "Jaipur: Block printing demonstration, village visit, traditional performances"
    ],
    inclusions: [
      "Mid-range hotels",
      "Private car with driver",
      "Daily breakfast",
      "Cultural activities and workshops"
    ],
    image: "https://images.unsplash.com/photo-1558013400-059bfc96373f?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviews: 94,
    popular: false,
    itinerary: [
      {
        day: 1,
        title: "Delhi Arrival",
        description: "Arrive in Delhi, transfer to hotel. Evening orientation walk.",
        accommodation: "Mid-range hotel in Delhi",
        meals: "Welcome dinner"
      },
      {
        day: 2,
        title: "Delhi Cultural Experience",
        description: "Morning sightseeing. Afternoon cooking class and local market tour.",
        accommodation: "Mid-range hotel in Delhi",
        meals: "Breakfast, Cooking class dinner"
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Drive to Agra. Afternoon visit to Taj Mahal followed by marble inlay workshop.",
        accommodation: "Mid-range hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        description: "Morning visit to Agra Fort. Drive to Jaipur with cultural stops en route.",
        accommodation: "Mid-range hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 5,
        title: "Jaipur Cultural Immersion",
        description: "Visit to Amber Fort followed by block printing workshop and village visit.",
        accommodation: "Mid-range hotel in Jaipur",
        meals: "Breakfast, Village lunch"
      },
      {
        day: 6,
        title: "Jaipur and Departure",
        description: "Morning visit to City Palace. Afternoon traditional folk performance before departure to Delhi.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 15,
    title: "Leisurely Golden Triangle Tour",
    duration: "7 Days",
    price: "Starting from $1,000 per person",
    description: "A relaxed pace with extra time for personal exploration or relaxation.",
    highlights: [
      "Delhi: Red Fort, Lodhi Gardens, museums",
      "Agra: Taj Mahal, Agra Fort, leisure time",
      "Jaipur: Amber Fort, City Palace, shopping or spa time"
    ],
    inclusions: [
      "4-star hotels",
      "Private car with driver",
      "Daily breakfast"
    ],
    image: "https://images.unsplash.com/photo-1597646311500-a0722eb0ac6a?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    reviews: 87,
    popular: false,
    itinerary: [
      {
        day: 1,
        title: "Delhi Arrival",
        description: "Arrive in Delhi, transfer to hotel. Rest and acclimatize.",
        accommodation: "4-star hotel in Delhi",
        meals: "None"
      },
      {
        day: 2,
        title: "Delhi Exploration - Day 1",
        description: "Relaxed pace tour of Old Delhi including Red Fort and Jama Masjid.",
        accommodation: "4-star hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Delhi Exploration - Day 2",
        description: "New Delhi tour including Lodhi Gardens and museums with free time.",
        accommodation: "4-star hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 4,
        title: "Delhi to Agra",
        description: "Midday drive to Agra. Evening at leisure.",
        accommodation: "4-star hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 5,
        title: "Agra to Jaipur",
        description: "Morning visit to Taj Mahal and Agra Fort. Afternoon drive to Jaipur.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 6,
        title: "Jaipur Exploration",
        description: "Morning visit to Amber Fort. Afternoon at leisure for shopping or spa.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 7,
        title: "Jaipur and Departure",
        description: "Morning visit to City Palace. Afternoon at leisure before transfer to Delhi.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 16,
    title: "Adventure Golden Triangle Tour",
    duration: "5 Days",
    price: "Starting from $1,100 per person",
    description: "A thrilling mix of cultural sightseeing and adventure.",
    highlights: [
      "Delhi: Cycle tour through Old Delhi",
      "Agra: Hot air balloon ride over the Taj Mahal",
      "Ranthambore: Tiger safari",
      "Jaipur: Elephant ride at Amber Fort"
    ],
    inclusions: [
      "Mid-range hotels",
      "Private car with driver",
      "Adventure activities",
      "Daily breakfast"
    ],
    image: "https://images.unsplash.com/photo-1543306983-a562d8739781?q=80&w=1974&auto=format&fit=crop",
    rating: 4.8,
    reviews: 103,
    popular: true,
    itinerary: [
      {
        day: 1,
        title: "Delhi Adventure",
        description: "Morning cycle tour through Old Delhi. Afternoon zipline adventure at adventure park.",
        accommodation: "Mid-range hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 2,
        title: "Delhi to Agra",
        description: "Drive to Agra. Evening adventure activities near Yamuna River.",
        accommodation: "Mid-range hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Agra to Ranthambore",
        description: "Hot air balloon ride over Taj Mahal at sunrise. Drive to Ranthambore National Park.",
        accommodation: "Wildlife lodge in Ranthambore",
        meals: "Breakfast, Dinner"
      },
      {
        day: 4,
        title: "Ranthambore to Jaipur",
        description: "Morning tiger safari in Ranthambore. Afternoon drive to Jaipur.",
        accommodation: "Mid-range hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 5,
        title: "Jaipur and Departure",
        description: "Elephant ride at Amber Fort. Afternoon zip-lining at Neemrana before return to Delhi.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 17,
    title: "Budget Backpacker Golden Triangle Tour",
    duration: "4 Days",
    price: "Starting from $200 per person",
    description: "An ultra-affordable option for backpackers seeking authentic local experiences.",
    highlights: [
      "Delhi: Street food tour in Chandni Chowk, India Gate",
      "Agra: Taj Mahal, Agra Fort",
      "Jaipur: Hawa Mahal, local bazaars"
    ],
    inclusions: [
      "Budget hostels or guesthouses",
      "Public transportation (trains, buses)",
      "Daily breakfast",
      "Self-guided tour maps"
    ],
    image: "https://images.unsplash.com/photo-1585264550248-1778be3b6368?q=80&w=1974&auto=format&fit=crop",
    rating: 4.2,
    reviews: 156,
    popular: true,
    itinerary: [
      {
        day: 1,
        title: "Delhi Budget Exploration",
        description: "Self-guided tour of Delhi using public transport. Evening street food tour.",
        accommodation: "Hostel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 2,
        title: "Delhi to Agra",
        description: "Morning train to Agra. Self-guided tour of Taj Mahal and Agra Fort.",
        accommodation: "Budget guesthouse in Agra",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Agra to Jaipur",
        description: "Bus journey to Jaipur. Evening walk through local markets.",
        accommodation: "Hostel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 4,
        title: "Jaipur and Departure",
        description: "Budget tour of Hawa Mahal and City Palace. Evening bus/train back to Delhi.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 18,
    title: "Golden Triangle Foodie Adventure",
    duration: "5 Days",
    price: "Starting from $850 per person",
    description: "A culinary journey blending sightseeing with food-focused experiences.",
    highlights: [
      "Delhi: Paratha tasting in Paranthe Wali Gali, kebab crawl",
      "Agra: Petha sampling, Mughal cuisine dinner",
      "Jaipur: Rajasthani thali experience, cooking class"
    ],
    inclusions: [
      "3-star hotels",
      "Private car with driver",
      "Daily breakfast and select gourmet meals",
      "Food tours and cooking classes"
    ],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2071&auto=format&fit=crop",
    rating: 4.8,
    reviews: 74,
    popular: false,
    itinerary: [
      {
        day: 1,
        title: "Delhi Food Tour",
        description: "Old Delhi food walk including Paranthe Wali Gali and kebab tasting. Evening Mughal cuisine dinner.",
        accommodation: "3-star hotel in Delhi",
        meals: "Breakfast, Food tour tastings, Dinner"
      },
      {
        day: 2,
        title: "Delhi to Agra",
        description: "Drive to Agra. Afternoon visit to Taj Mahal. Evening Mughlai cooking class.",
        accommodation: "3-star hotel in Agra",
        meals: "Breakfast, Cooking class dinner"
      },
      {
        day: 3,
        title: "Agra to Jaipur",
        description: "Morning visit to Agra Fort with petha tasting. Drive to Jaipur with food stops en route.",
        accommodation: "3-star hotel in Jaipur",
        meals: "Breakfast, Roadside lunch"
      },
      {
        day: 4,
        title: "Jaipur Food Exploration",
        description: "Morning sightseeing at Amber Fort. Afternoon cooking class and Rajasthani thali dinner.",
        accommodation: "3-star hotel in Jaipur",
        meals: "Breakfast, Thali dinner"
      },
      {
        day: 5,
        title: "Jaipur and Departure",
        description: "Morning visit to local markets and sweet shops. Departure to Delhi with food stops en route.",
        accommodation: "None",
        meals: "Breakfast, Farewell lunch"
      }
    ]
  },
  {
    id: 19,
    title: "Golden Triangle Monsoon Magic",
    duration: "6 Days",
    price: "Starting from $950 per person",
    description: "A seasonal tour showcasing the Golden Triangle's beauty during the monsoon.",
    highlights: [
      "Delhi: Rain-soaked Lodhi Gardens, Humayun's Tomb",
      "Agra: Taj Mahal with monsoon reflections, Mehtab Bagh",
      "Jaipur: Amber Fort, rooftop tea at a heritage haveli"
    ],
    inclusions: [
      "4-star hotels",
      "Private car with driver",
      "Daily breakfast",
      "Rain gear (umbrellas, ponchos)"
    ],
    image: "https://images.unsplash.com/photo-1441484295955-db07de1fdbad?q=80&w=1974&auto=format&fit=crop",
    rating: 4.6,
    reviews: 42,
    popular: false,
    itinerary: [
      {
        day: 1,
        title: "Delhi Arrival",
        description: "Arrive in Delhi, transfer to hotel. Evening walk in rain-soaked Lodhi Gardens if weather permits.",
        accommodation: "4-star hotel in Delhi",
        meals: "None"
      },
      {
        day: 2,
        title: "Delhi Monsoon Tour",
        description: "Monsoon-themed tour of Delhi including Humayun's Tomb with its lush rain-drenched gardens.",
        accommodation: "4-star hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Drive to Agra. Afternoon visit to Agra Fort and evening visit to Mehtab Bagh for monsoon views of Taj Mahal.",
        accommodation: "4-star hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        description: "Morning visit to Taj Mahal to see monsoon reflections. Drive to Jaipur through verdant countryside.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 5,
        title: "Jaipur Exploration",
        description: "Visit to Amber Fort and water structures. Afternoon tea at heritage haveli with monsoon views.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast, Afternoon tea"
      },
      {
        day: 6,
        title: "Jaipur and Departure",
        description: "Morning visit to City Palace with its rainwater harvesting systems. Afternoon return to Delhi.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 20,
    title: "Family-Friendly Golden Triangle Tour",
    duration: "5 Days",
    price: "Starting from $800 per person (discounts for kids under 12)",
    description: "Designed for families with engaging activities for all ages.",
    highlights: [
      "Delhi: National Rail Museum, Delhi Zoo",
      "Agra: Taj Mahal, Agra Fort with kid-friendly guides",
      "Jaipur: Amber Fort elephant ride, puppet show"
    ],
    inclusions: [
      "Family-friendly 3-star hotels",
      "Private minivan with driver",
      "Daily breakfast",
      "Kid-tailored activities"
    ],
    image: "https://images.unsplash.com/photo-1470290378698-263af93d8ea1?q=80&w=2069&auto=format&fit=crop",
    rating: 4.7,
    reviews: 89,
    popular: true,
    itinerary: [
      {
        day: 1,
        title: "Delhi Family Fun",
        description: "Visit to National Rail Museum and Delhi Zoo with kid-friendly guide.",
        accommodation: "Family suite in 3-star hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 2,
        title: "Delhi to Agra",
        description: "Drive to Agra with kid-friendly stops. Afternoon visit to Taj Mahal with special children's tour.",
        accommodation: "Family room in 3-star hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Agra to Jaipur",
        description: "Morning visit to Agra Fort with treasure hunt activity. Drive to Jaipur with family-friendly stops.",
        accommodation: "Family suite in 3-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 4,
        title: "Jaipur Family Activities",
        description: "Elephant ride at Amber Fort. Afternoon puppet show and interactive craft session for kids.",
        accommodation: "Family suite in 3-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 5,
        title: "Jaipur and Departure",
        description: "Morning visit to Jaipur markets for souvenir shopping. Afternoon return to Delhi.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 21,
    title: "Golden Triangle Photography Expedition",
    duration: "6 Days",
    price: "Starting from $1,050 per person",
    description: "A guided tour for photography enthusiasts focusing on iconic backdrops.",
    highlights: [
      "Delhi: Sunrise at Jama Masjid, twilight at India Gate",
      "Agra: Taj Mahal at dawn, Mehtab Bagh sunset",
      "Jaipur: Amber Fort, Patrika Gate for vibrant shots"
    ],
    inclusions: [
      "4-star hotels",
      "Private car with driver",
      "Daily breakfast",
      "Photography guide and workshops"
    ],
    image: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    reviews: 56,
    popular: false,
    itinerary: [
      {
        day: 1,
        title: "Delhi Photography - Day 1",
        description: "Sunrise shoot at Jama Masjid, daytime at Humayun's Tomb, sunset at India Gate.",
        accommodation: "4-star hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 2,
        title: "Delhi Photography - Day 2",
        description: "Early morning shoot at Lotus Temple, afternoon photography workshop, evening shoot at Lodhi Art District.",
        accommodation: "4-star hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Drive to Agra. Sunset photography session at Mehtab Bagh with Taj Mahal views.",
        accommodation: "4-star hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 4,
        title: "Agra to Jaipur",
        description: "Sunrise shoot at Taj Mahal. Drive to Jaipur with photography stops en route.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 5,
        title: "Jaipur Photography",
        description: "Golden hour shoot at Amber Fort, midday at City Palace, sunset at Nahargarh Fort.",
        accommodation: "4-star hotel in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 6,
        title: "Jaipur and Departure",
        description: "Morning photo walk through the Pink City. Photo editing workshop before return to Delhi.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 22,
    title: "Golden Triangle Heritage and Handicrafts",
    duration: "7 Days",
    price: "Starting from $1,150 per person",
    description: "A deep dive into the region's artisanal heritage with historic stays.",
    highlights: [
      "Delhi: Crafts Museum, Dilli Haat",
      "Agra: Taj Mahal, marble inlay demonstration",
      "Jaipur: Amber Fort, jewelry and textile workshops"
    ],
    inclusions: [
      "Heritage hotels (e.g., havelis)",
      "Private car with driver",
      "Daily breakfast",
      "Handicraft workshops and shopping assistance"
    ],
    image: "https://images.unsplash.com/photo-1516641051054-9df6a1aad654?q=80&w=1974&auto=format&fit=crop",
    rating: 4.9,
    reviews: 47,
    popular: false,
    itinerary: [
      {
        day: 1,
        title: "Delhi Arrival",
        description: "Arrive in Delhi, transfer to heritage hotel. Evening orientation walk.",
        accommodation: "Heritage hotel in Delhi",
        meals: "Welcome dinner"
      },
      {
        day: 2,
        title: "Delhi Craft Exploration",
        description: "Visit to Crafts Museum and Dilli Haat crafts bazaar. Textile workshop in the afternoon.",
        accommodation: "Heritage hotel in Delhi",
        meals: "Breakfast"
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Drive to Agra. Afternoon visit to Taj Mahal followed by marble inlay demonstration.",
        accommodation: "Heritage hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 4,
        title: "Agra Crafts",
        description: "Morning visit to Agra Fort. Afternoon leather crafts workshop and zardozi embroidery demonstration.",
        accommodation: "Heritage hotel in Agra",
        meals: "Breakfast"
      },
      {
        day: 5,
        title: "Agra to Jaipur",
        description: "Drive to Jaipur via Abhaneri Stepwell. Evening visit to handicraft markets.",
        accommodation: "Heritage haveli in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 6,
        title: "Jaipur Handicrafts",
        description: "Morning visit to Amber Fort. Afternoon block printing workshop and blue pottery demonstration.",
        accommodation: "Heritage haveli in Jaipur",
        meals: "Breakfast"
      },
      {
        day: 7,
        title: "Jaipur and Departure",
        description: "Morning jewelry and gem cutting workshop. Afternoon return to Delhi with shopping assistance.",
        accommodation: "None",
        meals: "Breakfast, Farewell lunch"
      }
    ]
  }
]
