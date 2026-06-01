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
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isHomePage = pathname === "/";
  // Dark image hero pages where the navbar should stay on a dark, semi-transparent
  // background with white text. Home (when not scrolled) and plan detail pages.
  const isPlanDetail = /^\/plans\/\d+$/.test(pathname);
  const isDarkHero = (isHomePage || isPlanDetail) && !isScrolled;

  const headerClass = cn(
    "fixed top-0 left-0 w-full z-50 transition-all duration-300",
    isHomePage && !isScrolled
      ? "py-4 bg-transparent backdrop-blur-none"
      : isPlanDetail && !isScrolled
        ? "py-3 bg-black/40 backdrop-blur-md"
        : isScrolled
          ? "py-2 bg-ivory-300/95 backdrop-blur-md shadow-sm"
          : "py-3 bg-ivory-300/95 backdrop-blur-md shadow-sm border-b border-gray-100"
  );

  const wordmarkSecondaryClass = cn(isDarkHero ? "text-white" : "text-royal-800");
  const linkClass = (active: boolean) =>
    cn(
      "text-sm font-medium transition-colors hover:text-maroon-600 relative py-1 tracking-wide",
      active
        ? "text-maroon-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-maroon-600"
        : isDarkHero
          ? "text-white/90 hover:text-white"
          : "text-royal-800"
    );
  const burgerIconClass = cn("h-6 w-6", isDarkHero ? "text-white" : "text-royal-800");

  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={headerClass}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="relative z-10" aria-label="Guide India Tours - Home">
            <span className="text-2xl font-display font-semibold">
              <span className="text-maroon-600 mr-2">Guide</span>
              <span className={wordmarkSecondaryClass}>India Tours</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} className={linkClass(pathname === item.path)}>
                {item.label}
              </Link>
            ))}
            <Button
              size="sm"
              className="ml-6 px-8 py-2 text-sm font-medium transition-all duration-300 rounded-xl bg-maroon-600 hover:bg-maroon-700 text-white border-none shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="/contact">Plan Your Trip</Link>
            </Button>
          </nav>

          <button
            className="md:hidden relative z-10 p-2 rounded-md hover:bg-black/5 transition-colors"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-royal-800" />
            ) : (
              <Menu className={burgerIconClass} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-ivory-300/95 backdrop-blur-md z-50 md:hidden transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          className="absolute top-4 right-4 z-50 p-2 text-royal-800 bg-white/80 rounded-full shadow-md border border-gray-200 hover:bg-white transition-colors"
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          <nav className="flex-1 flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-lg font-display font-medium transition-colors py-3 px-4 rounded-lg",
                  pathname === item.path
                    ? "text-maroon-600 bg-white/40 border-l-4 border-maroon-600"
                    : "text-royal-800 hover:bg-white/20 hover:text-maroon-600"
                )}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-royal-800/20">
            <Button
              asChild
              className="w-full text-base py-4 bg-maroon-600 hover:bg-maroon-700 rounded-lg shadow-lg"
              onClick={closeMobileMenu}
            >
              <Link href="/contact">Plan Your Trip</Link>
            </Button>
            <Button
              variant="outline"
              className="w-full text-base py-4 text-royal-800 border-royal-800 hover:bg-royal-800 hover:text-white rounded-lg"
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
