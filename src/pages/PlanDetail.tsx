import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  }
];

// Combine all plans
const allPlans = [...travelPlans, ...additionalDestinations];

const PlanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    // Find the plan by ID
    const selectedPlan = allPlans.find(p => p.id === parseInt(id));
    
    if (selectedPlan) {
      setPlan(selectedPlan);
    } else {
      // If plan not found, redirect to plans page
      navigate("/plans");
    }
  }, [id, navigate]);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Create structured data for this tour package
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": plan.title,
    "description": plan.description,
    "touristType": ["Couples", "Solo traveler", "Family", "Group"],
    "image": plan.image,
    "offers": {
      "@type": "Offer",
      "price": plan.price.replace("From $", "").replace(" per person", ""),
      "priceCurrency": "USD",
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      "availability": "https://schema.org/InStock"
    },
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": plan.itinerary.map((day, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": day.title,
        "description": day.description
      }))
    },
    "provider": {
      "@type": "Organization",
      "name": "Guide India Tours",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Delhi",
        "addressRegion": "Delhi",
        "addressCountry": "India"
      }
    }
  };

  return (
    <>
      <SeoHead 
        title={`${plan.title} | Guide India Tours`}
        description={`Experience ${plan.title} with Guide India Tours. ${plan.description}`}
        keywords={`India tour, ${plan.title}, Golden Triangle, travel packages, ${plan.duration}`}
        ogImage={plan.image}
        ogType="article"
        structuredData={structuredData}
      />

      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${plan.image})` }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
          </div>

          <div className="relative h-full flex flex-col justify-end text-white z-10 px-4 pb-12">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                  className="mb-6 text-white border-white/30 hover:bg-white/10"
                >
                  <Link to="/plans">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Plans
                  </Link>
                </Button>

                <div className="flex items-center text-sm text-white/90 mb-3 space-x-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1.5" />
                    {plan.duration}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-primary fill-current mr-1.5" />
                    <span>{plan.rating}</span>
                    <span className="ml-1 text-white/80">({plan.reviews} reviews)</span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-display font-semibold mb-3">
                  {plan.title}
                </h1>
                <p className="text-xl font-medium text-primary">{plan.price}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <h2 className="text-2xl font-display font-medium mb-4">Overview</h2>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl border border-border">
                    <h3 className="text-lg font-medium mb-4">Highlights</h3>
                    <ul className="space-y-2">
                      {plan.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-border">
                    <h3 className="text-lg font-medium mb-4">Inclusions</h3>
                    <ul className="space-y-2">
                      {plan.inclusions.map((inclusion, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white p-6 rounded-xl border border-border sticky top-24">
                  <h3 className="text-xl font-medium mb-4">Interested in this tour?</h3>
                  <p className="text-muted-foreground mb-6">Contact us to book this tour or customize it to your specific requirements.</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <PhoneCall className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Call us</
