
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Plans", path: "/plans" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Check if we're on the plan detail page (URL pattern: /plans/[number])
  const isPlanDetail = /^\/plans\/\d+$/.test(location.pathname);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        // Apply different styling for plan detail pages to fix the blurry effect
        isPlanDetail
          ? "py-2 bg-ivory-300/95 backdrop-blur-md shadow-sm" 
          : isScrolled 
            ? "py-2 bg-ivory-300/95 backdrop-blur-md shadow-sm" 
            : "py-3 bg-black/20 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="relative z-10">
          <h1 className="text-2xl font-display font-semibold">
            <span className={cn(
              "text-maroon-600 mr-2", // Use maroon-600 consistently for the "Guide" text
              !isScrolled && !isPlanDetail && "text-maroon-500"
            )}>Guide</span>
            <span className={cn(
              "text-royal-800",
              !isScrolled && !isPlanDetail && "text-white"
            )}>India Tours</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-maroon-600 relative py-1",
                location.pathname === item.path
                  ? "text-maroon-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-maroon-600"
                  : isScrolled || isPlanDetail ? "text-royal-800" : "text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button 
            size="sm"
            variant="turquoise"
            asChild
            className="ml-4 px-6"
          >
            <Link to="/contact">Plan Your Trip</Link>
          </Button>
        </nav>

        <button
          className="md:hidden relative z-10 p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className={`h-5 w-5 ${isScrolled || isPlanDetail ? "text-royal-800" : "text-white"}`} />
          )}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-ivory-300/95 backdrop-blur-md transition-transform duration-300 md:hidden flex flex-col items-center justify-center",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{ top: 0, zIndex: 5 }}
        >
          <div className="container px-4 pt-16 flex flex-col items-center">
            <nav className="flex flex-col items-center space-y-6 mb-8 w-full">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-xl font-display font-medium hover:text-maroon-700 transition-colors w-full text-center py-2",
                    location.pathname === item.path
                      ? "text-maroon-700 border-b-2 border-maroon-700"
                      : "text-royal-800"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-4 w-full">
              <Button asChild variant="default" className="w-full text-lg py-6">
                <Link to="/contact">Plan Your Trip</Link>
              </Button>
              <Button variant="outline" className="w-full text-lg py-6 text-royal-800" asChild>
                <Link to="/contact">Custom Itinerary</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
