"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Plans", path: "/plans" },
  { label: "Blog", path: "/blog" },
  { label: "Book Guide", path: "/guide-booking" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Digital Card", path: "/digital-card" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  // Close mobile menu when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Check if we're on the home page
  const isHomePage = pathname === "/";
  // Check if we're on the plan detail page (URL pattern: /plans/[number])
  const isPlanDetail = /^\/plans\/\d+$/.test(pathname);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          // Different styling based on page and scroll state
          isHomePage && !isScrolled
            ? "py-4 bg-transparent backdrop-blur-none"
            : isScrolled
              ? "py-2 bg-ivory-300/95 backdrop-blur-md shadow-sm"
              : "py-3 bg-black/20 backdrop-blur-sm"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="relative z-10">
            <h1 className="text-2xl font-display font-semibold">
              <span className={cn(
                "text-maroon-600 mr-2",
                isHomePage && !isScrolled && "text-maroon-600"
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
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-maroon-600 relative py-1 tracking-wide",
                  pathname === item.path
                    ? "text-maroon-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-maroon-600"
                    : isHomePage && !isScrolled ? "text-white/90 hover:text-white" :
                      isScrolled ? "text-royal-800" : "text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button
              size="sm"
              className={cn(
                "ml-6 px-8 py-2 text-sm font-medium transition-all duration-300 rounded-none",
                "bg-maroon-600 hover:bg-maroon-700 text-white border-none shadow-lg hover:shadow-xl"
              )}
              asChild
            >
              <Link href="/contact">Plan Your Trip</Link>
            </Button>
          </nav>

          <button
            className="menu-button md:hidden relative z-10 p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-royal-800" />
            ) : (
              <Menu className={cn(
                "h-6 w-6",
                isHomePage && !isScrolled ? "text-white" :
                  isScrolled ? "text-royal-800" : "text-white"
              )} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-ivory-300/95 backdrop-blur-md z-50 md:hidden transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-50 p-2 text-royal-800 bg-white/80 rounded-full shadow-md border border-gray-200 hover:bg-white transition-colors"
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-xl font-display font-medium transition-colors py-3 px-4 rounded-lg hover:bg-white/20",
                  pathname === item.path
                    ? "text-maroon-600 bg-white/30 border-l-4 border-maroon-600"
                    : "text-royal-800 hover:text-maroon-600"
                )}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-6 border-t border-royal-800/20">
            <Button
              asChild
              className="w-full text-lg py-4 bg-maroon-600 hover:bg-maroon-700 rounded-lg shadow-lg"
              onClick={closeMobileMenu}
            >
              <Link href="/contact">Plan Your Trip</Link>
            </Button>
            <Button
              variant="outline"
              className="w-full text-lg py-4 text-royal-800 border-royal-800 hover:bg-royal-800 hover:text-white rounded-lg"
              asChild
              onClick={closeMobileMenu}
            >
              <Link href="/contact">Custom Itinerary</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

