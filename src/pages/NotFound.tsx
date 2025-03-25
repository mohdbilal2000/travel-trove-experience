
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/shared/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Phone } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-8xl font-display font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl font-display font-medium mb-6">Page Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're sorry, but the page you're looking for doesn't exist or has been moved.
              Please return to our homepage to continue exploring our Golden Triangle tours.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button as={Link} to="/" className="flex items-center justify-center">
                <Home className="mr-2 h-4 w-4" />
                Return to Homepage
              </Button>
              <Button as={Link} to="/contact" variant="outline" className="flex items-center justify-center">
                <Phone className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NotFound;
