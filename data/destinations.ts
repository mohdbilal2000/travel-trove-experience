export interface Destination {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  intro: string;
  highlights: string[];
  bestTimeToVisit: string;
  image: string;
  relatedPlans: number[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const destinations: Destination[] = [
  {
    slug: "delhi",
    name: "Delhi",
    shortName: "Delhi",
    tagline: "Where ancient meets modern",
    description: "Discover the heart of India with our knowledgeable Delhi guides. Explore historic monuments, vibrant markets, and modern landmarks.",
    intro: "Delhi, India's capital, is a fascinating blend of ancient history and modern development. From the Mughal-era Red Fort to the contemporary India Gate, Delhi offers a rich tapestry of experiences.",
    highlights: [
      "Red Fort - UNESCO World Heritage Site",
      "India Gate - Iconic war memorial",
      "Qutub Minar - Tallest brick minaret",
      "Lotus Temple - Architectural marvel",
      "Jama Masjid - Largest mosque in India",
      "Chandni Chowk - Historic market area"
    ],
    bestTimeToVisit: "October to March (pleasant weather, 10-25°C)",
    image: "/images/delhi/getty-images-C4Yf3Wbymg8-unsplash.jpg",
    relatedPlans: [1, 2, 3, 23, 24],
    faqs: [
      {
        question: "How many days do I need in Delhi?",
        answer: "We recommend 2-3 days to explore Delhi's major attractions. A full day tour covers the main highlights, while 2-3 days allow for deeper exploration of Old and New Delhi."
      },
      {
        question: "What are the must-see places in Delhi?",
        answer: "Must-see attractions include Red Fort, India Gate, Qutub Minar, Lotus Temple, and Jama Masjid. Don't miss the vibrant markets of Chandni Chowk for authentic Delhi experiences."
      },
      {
        question: "Is Delhi safe for tourists?",
        answer: "Yes, Delhi is generally safe for tourists. We recommend using our professional guides and private transportation for the best and safest experience."
      }
    ]
  },
  {
    slug: "agra",
    name: "Agra",
    shortName: "Agra",
    tagline: "Home of the Taj Mahal",
    description: "Experience the magic of the Taj Mahal and explore Agra's rich Mughal heritage with our expert local guides.",
    intro: "Agra is home to one of the world's most iconic monuments - the Taj Mahal. This city offers a glimpse into India's Mughal past with stunning architecture and rich history.",
    highlights: [
      "Taj Mahal - One of the Seven Wonders",
      "Agra Fort - Majestic Mughal fortress",
      "Fatehpur Sikri - Abandoned Mughal city",
      "Itimad-ud-Daulah - Baby Taj",
      "Mehtab Bagh - Moonlight Garden",
      "Akbar's Tomb - Grand mausoleum"
    ],
    bestTimeToVisit: "October to March (best weather, 8-25°C). Avoid summer (April-June) due to extreme heat.",
    image: "/images/agra/getty-images-x83xvTdlITo-unsplash.jpg",
    relatedPlans: [23, 24, 25, 1, 2],
    faqs: [
      {
        question: "When is the best time to visit the Taj Mahal?",
        answer: "Sunrise (6-7 AM) is the best time for fewer crowds and beautiful lighting. Sunset (5-6 PM) is also excellent. Avoid midday due to crowds and heat."
      },
      {
        question: "Is the Taj Mahal closed on any day?",
        answer: "Yes, the Taj Mahal is closed every Friday for prayers. All other days it's open from sunrise to sunset."
      },
      {
        question: "How long does a Taj Mahal visit take?",
        answer: "A typical visit takes 2-3 hours. With our guided tours, you'll get detailed insights and the best photography spots, making the experience more meaningful."
      }
    ]
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    shortName: "Jaipur",
    tagline: "The Pink City",
    description: "Explore the royal heritage of Jaipur, the capital of Rajasthan, with its magnificent palaces, forts, and vibrant culture.",
    intro: "Jaipur, known as the Pink City, is a treasure trove of royal palaces, ancient forts, and vibrant markets. It's a perfect blend of history, culture, and modern amenities.",
    highlights: [
      "Amber Fort - Hilltop fortress with stunning views",
      "City Palace - Royal residence and museum",
      "Hawa Mahal - Palace of Winds",
      "Jantar Mantar - Ancient astronomical observatory",
      "Nahargarh Fort - Sunset point",
      "Jal Mahal - Water palace"
    ],
    bestTimeToVisit: "October to March (pleasant weather, 10-27°C). Perfect for exploring forts and palaces.",
    image: "/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg",
    relatedPlans: [1, 2, 3, 4, 5],
    faqs: [
      {
        question: "Why is Jaipur called the Pink City?",
        answer: "Jaipur was painted pink in 1876 to welcome the Prince of Wales. The tradition continues, and the old city maintains its pink facade."
      },
      {
        question: "What is the best way to explore Jaipur?",
        answer: "We recommend a 2-day tour to cover all major attractions. Our guided tours include Amber Fort, City Palace, Hawa Mahal, and Jantar Mantar with expert insights."
      },
      {
        question: "Are there shopping opportunities in Jaipur?",
        answer: "Yes! Jaipur is famous for jewelry, textiles, handicrafts, and gemstones. Our guides can take you to authentic markets and trusted shops."
      }
    ]
  }
];

export const getDestinationBySlug = (slug: string): Destination | undefined => {
  return destinations.find(dest => dest.slug === slug);
};




