import { TravelPlan } from "../types/travelPlanTypes";

export const delhiPlans: TravelPlan[] = [
  // Same Day Delhi Plans
  {
    id: 1001,
    title: "Same Day Delhi Tour",
    duration: "Same Day",
    price: "From $89 per adult",
    description: "Explore the best of Delhi in a single day with our comprehensive same-day tour covering major historical and cultural landmarks.",
    highlights: [
      "Red Fort & Jama Masjid",
      "Qutub Minar Complex",
      "India Gate & Parliament",
      "Lotus Temple",
      "Humayun's Tomb",
      "Chandni Chowk Market"
    ],
    inclusions: [
      "Private air-conditioned vehicle",
      "English-speaking guide",
      "All monument entrance fees",
      "Bottled water",
      "Hotel pickup and drop-off"
    ],
    image: "/images/delhi/getty-images-C4Yf3Wbymg8-unsplash.jpg",
    rating: 4.8,
    reviews: 156,
    popular: true,
    destinations: ["Delhi"],
    itinerary: [
      {
        day: 1,
        title: "Full Day Delhi Exploration",
        description: "Start with a visit to the iconic Red Fort, followed by Jama Masjid, India's largest mosque. Explore the bustling lanes of Chandni Chowk. Afternoon visit to Qutub Minar, Humayun's Tomb, and Lotus Temple. End the day at India Gate and drive past the Parliament House and Rashtrapati Bhavan.",
        accommodation: "Not included (same day tour)",
        meals: "Lunch at local restaurant"
      }
    ],
    faqs: [
      {
        question: "What time does the tour start?",
        answer: "The tour typically starts at 8:00 AM with hotel pickup. We can adjust the timing based on your preference."
      },
      {
        question: "How long is the tour?",
        answer: "The same day Delhi tour lasts approximately 8-10 hours, covering all major attractions."
      }
    ]
  },
  {
    id: 1002,
    title: "Delhi Heritage Walk - 1 Night",
    duration: "1 Night / 2 Days",
    price: "From $149 per adult",
    description: "Immerse yourself in Delhi's rich heritage with a one-night stay, exploring both Old and New Delhi's historical treasures.",
    highlights: [
      "Old Delhi heritage walk",
      "Red Fort & Jama Masjid",
      "Qutub Minar",
      "Humayun's Tomb",
      "India Gate & Rajpath",
      "Chandni Chowk food tour"
    ],
    inclusions: [
      "1 night accommodation in 3-star hotel",
      "Daily breakfast",
      "Private vehicle with driver",
      "English-speaking guide",
      "All monument entrance fees",
      "Airport transfers"
    ],
    image: "/images/delhi/getty-images-AaZSrGeC6Fg-unsplash.jpg",
    rating: 4.7,
    reviews: 98,
    popular: false,
    destinations: ["Delhi"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Old Delhi Tour",
        description: "Arrive in Delhi and transfer to hotel. After check-in, explore Old Delhi including Red Fort, Jama Masjid, and take a rickshaw ride through the narrow lanes of Chandni Chowk. Evening food tour to sample authentic Delhi street food.",
        accommodation: "3-star hotel in Delhi",
        meals: "Breakfast, Street food tour"
      },
      {
        day: 2,
        title: "New Delhi & Departure",
        description: "After breakfast, visit New Delhi attractions including Qutub Minar, Humayun's Tomb, Lotus Temple, and India Gate. Drive past Parliament House and Rashtrapati Bhavan. Transfer to airport or railway station for departure.",
        accommodation: "None",
        meals: "Breakfast"
      }
    ]
  },
  {
    id: 1003,
    title: "Delhi Cultural Experience - 2 Nights",
    duration: "2 Nights / 3 Days",
    price: "From $249 per adult",
    description: "A comprehensive 2-night Delhi tour allowing you to explore the city at a relaxed pace with deeper cultural immersion.",
    highlights: [
      "Complete Old & New Delhi tour",
      "Heritage walk in Old Delhi",
      "Qutub Minar & Humayun's Tomb",
      "Akshardham Temple",
      "Spice Market exploration",
      "Cultural show & dinner"
    ],
    inclusions: [
      "2 nights accommodation in 4-star hotel",
      "Daily breakfast",
      "One dinner with cultural show",
      "Private vehicle with driver",
      "English-speaking guide",
      "All monument entrance fees",
      "Airport transfers"
    ],
    image: "/images/delhi/getty-images-7sJAG2dJVJo-unsplash.jpg",
    rating: 4.9,
    reviews: 142,
    popular: true,
    destinations: ["Delhi"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Old Delhi",
        description: "Arrive in Delhi and transfer to hotel. After check-in, explore Old Delhi including Red Fort, Jama Masjid, and Chandni Chowk market. Evening rickshaw ride through the old lanes and street food experience.",
        accommodation: "4-star hotel in Delhi",
        meals: "Breakfast, Street food"
      },
      {
        day: 2,
        title: "New Delhi Exploration",
        description: "Full day tour of New Delhi visiting Qutub Minar, Humayun's Tomb, Lotus Temple, India Gate, and drive past government buildings. Afternoon visit to Akshardham Temple. Evening cultural show with traditional dinner.",
        accommodation: "4-star hotel in Delhi",
        meals: "Breakfast, Cultural dinner"
      },
      {
        day: 3,
        title: "Spice Market & Departure",
        description: "Morning visit to Khari Baoli spice market for a sensory experience. Explore Daryaganj book market (if Sunday). After lunch, transfer to airport or railway station for departure.",
        accommodation: "None",
        meals: "Breakfast, Lunch"
      }
    ]
  },
  // Luxury Delhi Plans
  {
    id: 1004,
    title: "Same Day Delhi Luxury Tour",
    duration: "Same Day",
    price: "From $199 per adult",
    description: "Experience Delhi in ultimate luxury with VIP access, premium dining, and exclusive experiences in a single day.",
    highlights: [
      "VIP access to monuments",
      "Private guide & luxury vehicle",
      "Fine dining at heritage restaurant",
      "Exclusive cultural performance",
      "Spa treatment included",
      "Personalized shopping assistance"
    ],
    inclusions: [
      "Premium luxury vehicle (Mercedes/BMW)",
      "Expert historian guide",
      "VIP monument access",
      "Fine dining lunch & dinner",
      "Spa treatment (1 hour)",
      "Personal shopping assistant",
      "All entrance fees"
    ],
    image: "/images/delhi/getty-images-DVSUA1uZ6Mo-unsplash.jpg",
    rating: 5.0,
    reviews: 67,
    popular: false,
    destinations: ["Delhi"],
    itinerary: [
      {
        day: 1,
        title: "Luxury Delhi Experience",
        description: "Morning VIP access to Red Fort with private historian guide. Luxury breakfast at heritage haveli. Visit Qutub Minar and Humayun's Tomb with skip-the-line access. Fine dining lunch at exclusive restaurant. Afternoon spa treatment. Evening cultural show with gourmet dinner at luxury hotel.",
        accommodation: "Not included (same day tour)",
        meals: "Luxury breakfast, Fine dining lunch & dinner"
      }
    ]
  },
  {
    id: 1005,
    title: "Delhi Luxury Heritage - 1 Night",
    duration: "1 Night / 2 Days",
    price: "From $349 per adult",
    description: "Indulge in Delhi's heritage with luxury accommodations, exclusive experiences, and personalized service.",
    highlights: [
      "5-star luxury hotel stay",
      "Private heritage walk",
      "VIP monument access",
      "Fine dining experiences",
      "Cultural performance",
      "Spa & wellness"
    ],
    inclusions: [
      "1 night in 5-star luxury hotel",
      "All meals (breakfast, lunch, dinner)",
      "Premium luxury vehicle",
      "Expert historian guide",
      "VIP monument access",
      "Cultural show tickets",
      "Spa treatment",
      "Airport transfers"
    ],
    image: "/images/delhi/getty-images-7sJAG2dJVJo-unsplash.jpg",
    rating: 4.9,
    reviews: 89,
    popular: false,
    destinations: ["Delhi"],
    itinerary: [
      {
        day: 1,
        title: "Luxury Arrival & Old Delhi",
        description: "VIP airport arrival with fast-track services. Transfer to luxury hotel. After check-in, private heritage walk in Old Delhi with exclusive access to hidden gems. Fine dining lunch at heritage restaurant. Evening cultural show with gourmet dinner.",
        accommodation: "5-star luxury hotel in Delhi",
        meals: "Lunch, Dinner"
      },
      {
        day: 2,
        title: "New Delhi Luxury Tour",
        description: "After breakfast, visit New Delhi's iconic sites with VIP access. Private tour of Qutub Minar and Humayun's Tomb. Luxury lunch at exclusive venue. Afternoon spa treatment. Evening transfer to airport with farewell dinner.",
        accommodation: "None",
        meals: "Breakfast, Luxury lunch, Farewell dinner"
      }
    ]
  },
  {
    id: 1006,
    title: "Delhi Royal Experience - 2 Nights",
    duration: "2 Nights / 3 Days",
    price: "From $599 per adult",
    description: "The ultimate Delhi luxury experience with royal treatment, exclusive access, and world-class hospitality.",
    highlights: [
      "5-star palace hotel stay",
      "Private royal experiences",
      "VIP access everywhere",
      "Michelin-starred dining",
      "Exclusive cultural shows",
      "Personal butler service"
    ],
    inclusions: [
      "2 nights in 5-star palace hotel",
      "All meals at premium restaurants",
      "Premium luxury vehicle with chauffeur",
      "Expert historian guide",
      "VIP monument access",
      "Spa & wellness treatments",
      "Personal butler service",
      "Airport transfers with meet & greet"
    ],
    image: "/images/delhi/manoj-balotia-UO9vYZq2NNA-unsplash.jpg",
    rating: 5.0,
    reviews: 45,
    popular: true,
    destinations: ["Delhi"],
    itinerary: [
      {
        day: 1,
        title: "Royal Arrival & Old Delhi",
        description: "VIP airport arrival with royal welcome. Transfer to palace hotel in luxury vehicle. After check-in, private heritage walk in Old Delhi with exclusive access. Fine dining lunch at heritage haveli. Evening private cultural performance with gourmet dinner.",
        accommodation: "5-star palace hotel in Delhi",
        meals: "Lunch, Dinner"
      },
      {
        day: 2,
        title: "New Delhi Royal Tour",
        description: "After breakfast, comprehensive New Delhi tour with VIP access to all monuments. Private tour of Qutub Minar, Humayun's Tomb, and Lotus Temple. Luxury lunch at exclusive venue. Afternoon spa and wellness treatments. Evening fine dining at Michelin-starred restaurant.",
        accommodation: "5-star palace hotel in Delhi",
        meals: "Breakfast, Luxury lunch, Fine dining dinner"
      },
      {
        day: 3,
        title: "Exclusive Experiences & Departure",
        description: "Morning optional helicopter tour of Delhi (additional cost). Visit exclusive heritage sites. Private shopping experience with personal stylist. Farewell lunch at luxury venue. Transfer to airport with royal send-off.",
        accommodation: "None",
        meals: "Breakfast, Farewell lunch"
      }
    ]
  },
  // Delhi + Agra Plans
  {
    id: 1008,
    title: "Delhi to Agra Same Day Tour",
    duration: "Same Day",
    price: "From $199 per adult",
    description: "Explore Delhi's heritage in the morning, then visit Agra to witness the Taj Mahal, returning to Delhi the same day.",
    highlights: [
      "Delhi morning tour (Red Fort, Qutub Minar)",
      "Taj Mahal at Agra",
      "Agra Fort exploration",
      "Round trip Delhi-Agra-Delhi",
      "Professional guide",
      "Traditional meals"
    ],
    inclusions: [
      "Delhi city tour",
      "Round-trip transportation Delhi-Agra-Delhi",
      "Private air-conditioned vehicle",
      "English-speaking guide",
      "All monument entrance fees",
      "Breakfast and lunch",
      "Bottled water"
    ],
    image: "/images/delhi/ashim-d-silva-KF7pv-8OiyY-unsplash.jpg",
    rating: 4.8,
    reviews: 178,
    popular: true,
    destinations: ["Delhi", "Agra"],
    itinerary: [
      {
        day: 1,
        title: "Delhi & Agra in One Day",
        description: "Early morning Delhi city tour covering Red Fort, Qutub Minar, and India Gate. Drive to Agra (3-4 hours). Visit the magnificent Taj Mahal. Explore Agra Fort. Enjoy traditional lunch. Return to Delhi in the evening with drop-off at your location.",
        accommodation: "Not included (same day tour)",
        meals: "Breakfast, Traditional lunch"
      }
    ]
  },
  {
    id: 1009,
    title: "Delhi to Agra - 1 Night",
    duration: "1 Night / 2 Days",
    price: "From $299 per adult",
    description: "Comprehensive Delhi and Agra tour with one night stay, allowing you to explore both cities at a relaxed pace.",
    highlights: [
      "Complete Delhi tour",
      "Taj Mahal at sunrise",
      "Agra Fort exploration",
      "Fatehpur Sikri visit",
      "1 night accommodation in Agra",
      "Traditional meals"
    ],
    inclusions: [
      "1 night accommodation in 3-star hotel",
      "Daily breakfast",
      "Private vehicle with driver",
      "English-speaking guide",
      "All monument entrance fees",
      "Traditional meals",
      "Delhi-Agra-Delhi transfers"
    ],
    image: "/images/delhi/getty-images-KGqkTIKxd48-unsplash.jpg",
    rating: 4.9,
    reviews: 145,
    popular: true,
    destinations: ["Delhi", "Agra"],
    itinerary: [
      {
        day: 1,
        title: "Delhi Tour & Drive to Agra",
        description: "Full day Delhi tour covering Red Fort, Jama Masjid, Qutub Minar, Humayun's Tomb, India Gate, and Lotus Temple. After lunch, drive to Agra (3-4 hours). Check into hotel. Evening at leisure.",
        accommodation: "3-star hotel in Agra",
        meals: "Breakfast, Lunch"
      },
      {
        day: 2,
        title: "Agra Tour & Return to Delhi",
        description: "Early morning visit to Taj Mahal at sunrise. Return to hotel for breakfast. Explore Agra Fort. Visit Fatehpur Sikri (optional). After lunch, return to Delhi with drop-off at your location.",
        accommodation: "None",
        meals: "Breakfast, Lunch"
      }
    ]
  },
  {
    id: 1010,
    title: "Delhi to Agra - 2 Nights",
    duration: "2 Nights / 3 Days",
    price: "From $449 per adult",
    description: "Extended Delhi and Agra tour with two nights stay, allowing deeper exploration of both cities with cultural experiences.",
    highlights: [
      "Complete Delhi & Agra tour",
      "Taj Mahal multiple visits",
      "Agra Fort comprehensive tour",
      "Fatehpur Sikri day trip",
      "2 nights accommodation",
      "Cultural experiences"
    ],
    inclusions: [
      "2 nights accommodation in 4-star hotel",
      "Daily breakfast",
      "One dinner with cultural show",
      "Private vehicle with driver",
      "English-speaking guide",
      "All monument entrance fees",
      "Cultural show tickets",
      "Delhi-Agra-Delhi transfers"
    ],
    image: "/images/delhi/axp-photography--hwq4OHDJWI-unsplash.jpg",
    rating: 4.9,
    reviews: 167,
    popular: false,
    destinations: ["Delhi", "Agra"],
    itinerary: [
      {
        day: 1,
        title: "Delhi Comprehensive Tour",
        description: "Full day Delhi tour covering Old Delhi (Red Fort, Jama Masjid, Chandni Chowk) and New Delhi (Qutub Minar, Humayun's Tomb, India Gate, Lotus Temple). After lunch, drive to Agra. Check into hotel. Evening at leisure.",
        accommodation: "4-star hotel in Agra",
        meals: "Breakfast, Lunch"
      },
      {
        day: 2,
        title: "Agra Full Day Tour",
        description: "Early morning visit to Taj Mahal at sunrise. Return to hotel for breakfast. Comprehensive tour of Agra Fort. Full day trip to Fatehpur Sikri. Evening cultural show with traditional dinner.",
        accommodation: "4-star hotel in Agra",
        meals: "Breakfast, Cultural dinner"
      },
      {
        day: 3,
        title: "Agra & Return to Delhi",
        description: "After breakfast, visit Itimad-ud-Daulah (Baby Taj). Local market shopping. After lunch, return to Delhi with drop-off at your location.",
        accommodation: "None",
        meals: "Breakfast, Lunch"
      }
    ]
  },
  {
    id: 1011,
    title: "Delhi to Agra Luxury Tour",
    duration: "1 Night / 2 Days",
    price: "From $599 per adult",
    description: "Luxury Delhi and Agra experience with premium accommodations, VIP access, and exclusive experiences.",
    highlights: [
      "5-star luxury hotels",
      "VIP monument access",
      "Fine dining experiences",
      "Private guide & luxury vehicle",
      "Cultural performances",
      "Spa & wellness"
    ],
    inclusions: [
      "1 night in 5-star luxury hotel",
      "All meals at premium restaurants",
      "Premium luxury vehicle",
      "Expert historian guide",
      "VIP monument access",
      "Cultural show tickets",
      "Spa treatment",
      "Delhi-Agra-Delhi transfers"
    ],
    image: "/images/delhi/getty-images-AaZSrGeC6Fg-unsplash.jpg",
    rating: 5.0,
    reviews: 98,
    popular: false,
    destinations: ["Delhi", "Agra"],
    itinerary: [
      {
        day: 1,
        title: "Delhi Luxury Tour & Drive to Agra",
        description: "VIP Delhi tour with exclusive access to monuments. Fine dining lunch at heritage restaurant. Drive to Agra in luxury vehicle. Check into 5-star hotel. Evening cultural show with gourmet dinner.",
        accommodation: "5-star luxury hotel in Agra",
        meals: "Lunch, Dinner"
      },
      {
        day: 2,
        title: "Agra Luxury Tour & Return",
        description: "Early morning VIP access to Taj Mahal with private historian guide. Luxury breakfast at heritage palace. Comprehensive Agra Fort tour. Fine dining lunch. Afternoon spa treatment. Return to Delhi with farewell dinner.",
        accommodation: "None",
        meals: "Breakfast, Luxury lunch, Farewell dinner"
      }
    ]
  },
  {
    id: 1012,
    title: "Customized Delhi to Agra Tour",
    duration: "Flexible",
    price: "Custom Quote",
    description: "Design your perfect Delhi to Agra experience tailored to your interests, budget, and timeframe. We'll create a personalized itinerary just for you.",
    highlights: [
      "Fully customizable itinerary",
      "Choose your duration",
      "Select your interests",
      "Flexible budget options",
      "Personalized experiences",
      "Expert consultation"
    ],
    inclusions: [
      "Customized itinerary planning",
      "Accommodation as per preference",
      "Private vehicle & guide",
      "Meals as per your choice",
      "Activities based on interests",
      "24/7 support"
    ],
    image: "/images/delhi/getty-images-DVSUA1uZ6Mo-unsplash.jpg",
    rating: 4.9,
    reviews: 134,
    popular: false,
    destinations: ["Delhi", "Agra"],
    itinerary: [
      {
        day: 1,
        title: "Customized Experience",
        description: "Your personalized Delhi to Agra tour will be designed based on your interests - whether it's history, architecture, food, shopping, photography, or a mix of everything. Our travel experts will work with you to create the perfect itinerary.",
        accommodation: "As per your preference",
        meals: "As per your choice"
      }
    ]
  },
  // Customized Delhi Plan
  {
    id: 1007,
    title: "Customized Delhi Tour",
    duration: "Flexible",
    price: "Custom Quote",
    description: "Design your perfect Delhi experience tailored to your interests, budget, and timeframe. We'll create a personalized itinerary just for you.",
    highlights: [
      "Fully customizable itinerary",
      "Choose your duration",
      "Select your interests",
      "Flexible budget options",
      "Personalized experiences",
      "Expert consultation"
    ],
    inclusions: [
      "Customized itinerary planning",
      "Accommodation as per preference",
      "Private vehicle & guide",
      "Meals as per your choice",
      "Activities based on interests",
      "24/7 support"
    ],
    image: "/images/delhi/axp-photography-wHm3rnlMhdY-unsplash.jpg",
    rating: 4.9,
    reviews: 203,
    popular: false,
    destinations: ["Delhi"],
    itinerary: [
      {
        day: 1,
        title: "Customized Experience",
        description: "Your personalized Delhi tour will be designed based on your interests - whether it's history, culture, food, shopping, architecture, or a mix of everything. Our travel experts will work with you to create the perfect itinerary.",
        accommodation: "As per your preference",
        meals: "As per your choice"
      }
    ],
    faqs: [
      {
        question: "How do I customize my Delhi tour?",
        answer: "Contact us with your interests, duration, budget, and any specific requirements. Our travel experts will create a personalized itinerary for you."
      },
      {
        question: "What can be customized?",
        answer: "Everything! Duration, accommodation level, activities, dining preferences, special interests, and budget can all be customized to your needs."
      }
    ]
  },
  // Luxury Customized Delhi Plan
  {
    id: 1013,
    title: "Luxury Customized Delhi Tour",
    duration: "Flexible",
    price: "Custom Quote",
    description: "Design your perfect luxury Delhi experience with premium accommodations, VIP access, fine dining, and exclusive personalized experiences tailored to your interests and preferences.",
    highlights: [
      "Fully customizable luxury itinerary",
      "5-star palace hotels & heritage properties",
      "VIP monument access & skip-the-line",
      "Fine dining at exclusive restaurants",
      "Personal butler & concierge service",
      "Private luxury vehicle & expert guide",
      "Spa & wellness treatments",
      "Exclusive cultural experiences"
    ],
    inclusions: [
      "Customized luxury itinerary planning",
      "5-star luxury or palace hotel accommodation",
      "Premium luxury vehicle (Mercedes/BMW) with chauffeur",
      "Expert historian guide",
      "VIP monument access",
      "All meals at premium restaurants",
      "Spa & wellness treatments",
      "Cultural performances & exclusive experiences",
      "Personal butler service",
      "24/7 concierge support"
    ],
    image: "/images/delhi/sagar-dwivedi-iR9xWm1JK20-unsplash.jpg",
    rating: 5.0,
    reviews: 89,
    popular: false,
    destinations: ["Delhi"],
    itinerary: [
      {
        day: 1,
        title: "Luxury Customized Experience",
        description: "Your personalized luxury Delhi tour will be designed based on your interests - whether it's royal heritage, fine dining, exclusive shopping, photography, architecture, wellness, or a mix of everything. Our luxury travel experts will work with you to create the perfect high-end itinerary with VIP access, premium accommodations, and exclusive experiences.",
        accommodation: "5-star luxury or palace hotel as per your preference",
        meals: "Fine dining as per your choice"
      }
    ],
    faqs: [
      {
        question: "How do I customize my luxury Delhi tour?",
        answer: "Contact us with your interests, duration, budget, and luxury preferences. Our luxury travel experts will create a personalized high-end itinerary with premium accommodations, VIP access, and exclusive experiences."
      },
      {
        question: "What luxury features can be included?",
        answer: "Everything from 5-star palace hotels, VIP monument access, fine dining at exclusive restaurants, personal butler service, spa treatments, private cultural performances, luxury transportation, and exclusive experiences can be customized to your preferences."
      }
    ]
  }
];

