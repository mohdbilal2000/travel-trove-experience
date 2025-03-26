
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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

  return (
    <>
      <SeoHead
        title={`${plan.title} | Guide India Tours`}
        description={plan.description}
        keywords={`${plan.title}, Golden Triangle tour, India travel, ${plan.highlights.join(', ')}`}
        ogImage={plan.image}
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
        
        {/* Features Section */}
        <PlanFeatures plan={plan} />
        
        {/* Itinerary Section */}
        <Itinerary plan={plan} />
        
        {/* Contact Form Section */}
        <ContactForm plan={plan} />
        
        {/* Related Plans */}
        <RelatedPlans currentPlanId={plan.id} />
      </main>
      
      <Footer />
    </>
  );
};

export default PlanDetail;
