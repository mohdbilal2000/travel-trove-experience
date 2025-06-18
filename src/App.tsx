
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Helmet } from "react-helmet";
import ScrollToTop from "./components/shared/ScrollToTop";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Plans from "./pages/Plans";
import PlanDetail from "./pages/PlanDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
      <Helmet titleTemplate="%s | Guide India Tours" defaultTitle="Guide India Tours | Delhi, Agra, Jaipur">
        <meta name="description" content="Experience the magic of India's Golden Triangle with our premium travel services. Explore Delhi, Agra, and Jaipur with customized tours, luxury accommodations, and expert guides." />
        <meta name="keywords" content="Golden Triangle Tours, Delhi tours, Agra tours, Jaipur tours, Taj Mahal visit, India travel packages, luxury India tours, Rajasthan tours, Kerala backwaters, Himalayan tours" />
        <meta name="author" content="Guide India Tours" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Guide India Tours | Luxury Travel Experiences" />
        <meta property="og:description" content="Experience the magic of India's Golden Triangle with our premium travel services. Explore Delhi, Agra, Jaipur and beyond with customized tours." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guide India Tours | Luxury Travel Experiences" />
        <meta name="twitter:description" content="Experience the magic of India's Golden Triangle with our premium travel services." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop" />
        <link rel="canonical" href="https://guideindia.com" />
      </Helmet>
      
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/:id" element={<PlanDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
