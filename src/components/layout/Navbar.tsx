
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

  // Check if we're on the home page
  const isHomePage = location.pathname === "/";
  // Check if we're on the plan detail page (URL pattern: /plans/[number])
  const isPlanDetail = /^\/plans\/\d+$/.test(location.pathname);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        // Different styling based on page and scroll state
        isHomePage && !isScrolled
          ? "py-4 bg-transparent backdrop-blur-none" 
          : isPlanDetail
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
              "text-[#800000] mr-2", // Updated to use exact #800000
              isHomePage && !isScrolled && "text-[#800000]"
            )}>Guide</span>
            <span className={cn(
              "text-royal-800",
              isHomePage && !isScrolled ? "text-white" : 
              !isScrolled && !isPlanDetail && "text-white"
            )}>India Tours</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#800000] relative py-1 tracking-wide",
                location.pathname === item.path
                  ? "text-[#800000] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#800000]"
                  : isHomePage && !isScrolled ? "text-white/90 hover:text-white" :
                    isScrolled || isPlanDetail ? "text-royal-800" : "text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button 
            size="sm"
            className={cn(
              "ml-6 px-8 py-2 text-sm font-medium transition-all duration-300 rounded-none",
              "bg-[#800000] hover:bg-[#600000] text-white border-none shadow-lg hover:shadow-xl"
            )}
            asChild
          >
            <Link to="/contact">Plan Your Trip</Link>
          </Button>
        </nav>

        <button
          className="md:hidden relative z-10 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-royal-800" />
          ) : (
            <Menu className={cn(
              "h-5 w-5",
              isHomePage && !isScrolled ? "text-white" :
              isScrolled || isPlanDetail ? "text-royal-800" : "text-white"
            )} />
          )}
        </button>

        {/* Mobile Menu */}
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
                    "text-xl font-display font-medium hover:text-[#800000] transition-colors w-full text-center py-2",
                    location.pathname === item.path
                      ? "text-[#800000] border-b-2 border-[#800000]"
                      : "text-royal-800"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-4 w-full">
              <Button asChild className="w-full text-lg py-6 bg-[#800000] hover:bg-[#600000] rounded-none">
                <Link to="/contact">Plan Your Trip</Link>
              </Button>
              <Button variant="outline" className="w-full text-lg py-6 text-royal-800 border-royal-800 hover:bg-royal-800 hover:text-white rounded-none" asChild>
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
