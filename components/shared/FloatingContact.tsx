"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Share2 } from "lucide-react";

const FloatingContact = () => {
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  // WhatsApp with pre-filled message
  const whatsappUrl = "https://wa.me/918979810991?text=" + encodeURIComponent("Hello, I am interested in a Golden Triangle tour.");

  const shareOptions = [
    {
      label: "Email",
      href: "mailto:info@guideindiatours.com?subject=Golden Triangle Tour Inquiry",
      icon: "✉️"
    },
    {
      label: "Copy Link",
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        setShareMenuOpen(false);
      },
      icon: "🔗"
    }
  ];

  return (
    <>
      {/* Global style for mobile padding */}
      <style>{`
        @media (max-width: 767px) {
          body {
            padding-bottom: 90px;
          }
        }
      `}</style>

      {/* Mobile Floating Bar - Premium Asymmetrical Design */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 safe-area-inset-bottom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* WhatsApp Button - 60% width */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[0.6] bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-4 flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 touch-manipulation"
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold whitespace-nowrap">Chat on WhatsApp</span>
          </motion.a>

          {/* Call Button - 20% width (icon only) */}
          <motion.a
            href="tel:+918979810991"
            className="flex-[0.2] bg-maroon-600 hover:bg-maroon-700 text-white p-4 flex items-center justify-center active:scale-95 transition-all duration-200 touch-manipulation"
            whileTap={{ scale: 0.98 }}
            aria-label="Call us"
          >
            <Phone className="w-6 h-6" />
          </motion.a>

          {/* Share/Menu Button - 20% width (icon only) */}
          <div className="flex-[0.2] relative">
            <motion.button
              onClick={() => setShareMenuOpen(!shareMenuOpen)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 p-4 flex items-center justify-center active:scale-95 transition-all duration-200 touch-manipulation"
              whileTap={{ scale: 0.98 }}
              aria-label="Share options"
            >
              <Share2 className="w-6 h-6" />
            </motion.button>

            {/* Share Menu Dropdown */}
            <AnimatePresence>
              {shareMenuOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShareMenuOpen(false)}
                    className="fixed inset-0 bg-black/20 z-40"
                    style={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  />
                  {/* Menu */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden min-w-[160px] z-50"
                  >
                    {shareOptions.map((option, index) => (
                      option.href ? (
                        <motion.a
                          key={option.label}
                          href={option.href}
                          onClick={() => setShareMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-sm text-gray-700"
                        >
                          <span className="text-lg">{option.icon}</span>
                          <span>{option.label}</span>
                        </motion.a>
                      ) : (
                        <motion.button
                          key={option.label}
                          onClick={() => {
                            if (option.action) {
                              option.action();
                            }
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-sm text-gray-700 text-left"
                        >
                          <span className="text-lg">{option.icon}</span>
                          <span>{option.label}</span>
                        </motion.button>
                      )
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

    </>
  );
};

export default FloatingContact;
