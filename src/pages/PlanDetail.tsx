
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (id) {
      const planId = parseInt(id);
      const foundPlan = getPlanById(planId);
      
      if (foundPlan) {
        setPlan(foundPlan);
      } else {
        // Plan not found, redirect to plans page
        navigate('/plans');
      }
    }
    
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  if (!plan) {
    return null;
  }

  // Create structured data for the tour package
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
      "price": plan.price.substring(1), // Remove currency symbol
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
    }
  };
  
  // Add FAQ structured data if plan has FAQs
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
  
  // Breadcrumbs structured data
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
  
  // Create an array of structured data objects
  const structuredData = faqSchema ? 
    [tourSchema, faqSchema, breadcrumbSchema] : 
    [tourSchema, breadcrumbSchema];

  return (
    <>
      <SeoHead
        title={`${plan.title} | Guide India Tours`}
        description={plan.description}
        keywords={`${plan.title}, Golden Triangle tour, India travel, ${plan.highlights.join(', ')}, ${plan.destinations.join(', ')}`}
        ogImage={plan.image}
        canonicalUrl={`https://guideindia.tours/plans/${plan.id}`}
        ogType="product"
        structuredData={structuredData}
      />
      
      <Navbar />
      
      <main>
        {/* Back Button */}
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-muted-foreground hover:text-foreground"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plans
            </Button>
          </motion.div>
        </div>

        {/* Hero Section */}
        <PlanHeader plan={plan} />
        <PlanFeatures plan={plan} />
        <Itinerary plan={plan} />
        <ContactForm plan={plan} />
        <RelatedPlans currentPlanId={plan.id} />
      </main>
      
      <Footer />
    </>
  );
};

export default PlanDetail;
