import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContactButton from "@/components/shared/FloatingContactButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import SeoHead from "@/components/shared/SeoHead";
import { getPlanById } from "@/data/travelPlans";
import PlanHeader from "@/components/plan-detail/PlanHeader";
import PlanFeatures from "@/components/plan-detail/PlanFeatures";
import Itinerary from "@/components/plan-detail/Itinerary";
import ContactForm from "@/components/plan-detail/ContactForm";
import RelatedPlans from "@/components/plan-detail/RelatedPlans";

const PlanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const planId = parseInt(id);
      const foundPlan = getPlanById(planId);
      
      if (foundPlan) {
        setPlan(foundPlan);
      } else {
        navigate('/plans');
      }
    }
    
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-royal-800">Loading...</div>
      </div>
    );
  }

  if (!plan) {
    return null;
  }

  const planDestinations = plan.destinations || ["Delhi", "Agra", "Jaipur"];

  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": plan.title,
    "description": plan.description,
    "touristType": ["Sightseeing", "Cultural", "Historical"],
    "tourOperator": {
      "@type": "TravelAgency",
      "name": "Guide India Tours",
      "url": "https://guideindia.tours"
    },
    "offers": {
      "@type": "Offer",
      "name": plan.title,
      "price": plan.price.substring(1),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0]
    },
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": plan.itinerary.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.title,
        "description": item.description
      }))
    },
    "touristDestination": planDestinations.map(destination => ({
      "@type": "TouristDestination",
      "name": destination
    }))
  };

  const faqSchema = plan.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": plan.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://guideindia.tours/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Plans",
        "item": "https://guideindia.tours/plans"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": plan.title,
        "item": `https://guideindia.tours/plans/${plan.id}`
      }
    ]
  };

  const structuredData = faqSchema ? 
    [tourSchema, faqSchema, breadcrumbSchema] : 
    [tourSchema, breadcrumbSchema];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'faq', label: 'FAQ' }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-ivory-50">
      <SeoHead
        title={`${plan.title} | Guide India Tours`}
        description={plan.description}
        keywords={`${plan.title}, Golden Triangle tour, India travel, ${plan.highlights.join(', ')}, ${planDestinations.join(', ')}`}
        ogImage={plan.image}
        canonicalUrl={`https://guideindia.tours/plans/${plan.id}`}
        ogType="product"
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main>
        <div className="container max-w-6xl mx-auto px-4 pt-24 pb-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-royal-700 hover:text-maroon-600"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plans
            </Button>
          </motion.div>
        </div>

        <PlanHeader plan={plan} />
        
        {/* Navigation Tabs */}
        <div className="sticky top-20 z-40 bg-white border-b border-ivory-200 shadow-sm">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-maroon-600 text-maroon-600'
                      : 'border-transparent text-royal-600 hover:text-maroon-600 hover:border-maroon-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div id="overview" className="bg-pattern-light">
          <PlanFeatures plan={plan} />
        </div>
        
        <div id="itinerary">
          <Itinerary plan={plan} />
        </div>
        
        <div id="reviews">
          <ContactForm plan={plan} />
        </div>
        
        <div id="hotels">
          <RelatedPlans currentPlanId={plan.id} />
        </div>
      </main>
      
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default PlanDetail;
