
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-royal-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-medium mb-6">
              <span className="text-amber-400">Guide</span>India Tours
            </h3>
            <p className="text-white/90 max-w-xs">
              Discover the magic of India's Golden Triangle with our curated travel experiences, luxury accommodations, and personalized services.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white/80 hover:text-amber-400 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white/80 hover:text-amber-400 transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white/80 hover:text-amber-400 transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white/80 hover:text-amber-400 transition-colors" aria-label="Youtube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-medium mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-amber-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-amber-400 transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/plans" className="text-white/80 hover:text-amber-400 transition-colors">Travel Plans</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-amber-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-amber-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-display font-medium mb-6 text-white">Destinations</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/plans" className="text-white/80 hover:text-amber-400 transition-colors">Delhi Tours</Link>
              </li>
              <li>
                <Link to="/plans" className="text-white/80 hover:text-amber-400 transition-colors">Agra & Taj Mahal</Link>
              </li>
              <li>
                <Link to="/plans" className="text-white/80 hover:text-amber-400 transition-colors">Jaipur & Rajasthan</Link>
              </li>
              <li>
                <Link to="/plans" className="text-white/80 hover:text-amber-400 transition-colors">Golden Triangle Package</Link>
              </li>
              <li>
                <Link to="/plans" className="text-white/80 hover:text-amber-400 transition-colors">Customized Tours</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display font-medium mb-6 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-amber-400" />
                <span className="text-white/80">
                  123 Travel Street, New Delhi, India, 110001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0 text-amber-400" />
                <a href="tel:+911234567890" className="text-white/80 hover:text-amber-400 transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0 text-amber-400" />
                <a href="mailto:info@guideindia.tours" className="text-white/80 hover:text-amber-400 transition-colors">
                  info@guideindia.tours
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/60">
              &copy; {currentYear} Guide India Tours. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-white/60 hover:text-amber-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-white/60 hover:text-amber-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
