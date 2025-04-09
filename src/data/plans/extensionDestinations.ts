
import { TravelPlan } from "../types/travelPlanTypes";

// Additional destinations and extension options
export const extensionDestinations: TravelPlan[] = [
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
]
