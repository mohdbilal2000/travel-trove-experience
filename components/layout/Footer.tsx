"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Next.js Link automatically handles scrolling to top, but if we want explicit behavior:
  // We can't use window in Server Components, but this is a client component now.
  // Actually, standard Next.js Link behavior is fine, we don't need the onClick handler.

  return (
    <footer className="bg-ivory-300 text-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-medium mb-6 text-maroon-700">
              Guide India Tours
            </h3>
            <p className="text-gray-600 max-w-sm leading-relaxed">
              Discover the magic of India's Golden Triangle with our curated travel experiences, luxury accommodations, and personalized services.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="/contact" className="text-gray-500 hover:text-maroon-700 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="/contact" className="text-gray-500 hover:text-maroon-700 transition-colors" aria-label="Twitter / X">
                <Twitter size={18} />
              </a>
              <a href="/contact" className="text-gray-500 hover:text-maroon-700 transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-maroon-700 transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-medium mb-6 text-maroon-700">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-maroon-700 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-maroon-700 transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/plans" className="text-gray-600 hover:text-maroon-700 transition-colors">Travel Plans</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-maroon-700 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-maroon-700 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/guide-booking" className="text-gray-600 hover:text-maroon-700 transition-colors">Book a Guide</Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-maroon-700 transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-maroon-700 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-600 hover:text-maroon-700 transition-colors">Reviews</Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-display font-medium mb-6 text-maroon-700">Destinations</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/delhi-tours" className="text-gray-600 hover:text-maroon-700 transition-colors">Delhi Tours</Link>
              </li>
              <li>
                <Link href="/agra-tours" className="text-gray-600 hover:text-maroon-700 transition-colors">Agra & Taj Mahal</Link>
              </li>
              <li>
                <Link href="/jaipur-tours" className="text-gray-600 hover:text-maroon-700 transition-colors">Jaipur & Rajasthan</Link>
              </li>
              <li>
                <Link href="/golden-triangle-tours" className="text-gray-600 hover:text-maroon-700 transition-colors">Golden Triangle Package</Link>
              </li>
              <li>
                <Link href="/plans" className="text-gray-600 hover:text-maroon-700 transition-colors">Customized Tours</Link>
              </li>
              <li>
                <Link href="/plans" className="text-gray-600 hover:text-maroon-700 transition-colors">Honeymoon Tour</Link>
              </li>
              <li>
                <Link href="/plans" className="text-gray-600 hover:text-maroon-700 transition-colors">Corporate Tour</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display font-medium mb-6 text-maroon-700">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-maroon-600" />
                <span className="text-gray-600 text-sm">
                  Flate No: 31/84A, Rajpur Jangjeet Nagar, Shamsabad Road, Agra 282001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0 text-maroon-600" />
                <a href="tel:+918979810991" className="text-gray-600 hover:text-maroon-700 transition-colors">
                  +91 8979810991
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0 text-maroon-600" />
                <a href="mailto:info@guideindiatours.com" className="text-gray-600 hover:text-maroon-700 transition-colors">
                  info@guideindiatours.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; 2012–{currentYear} Guide India Tours. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-maroon-700 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-gray-500 hover:text-maroon-700 transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="text-sm text-gray-500 hover:text-maroon-700 transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

