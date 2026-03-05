"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Share2, Check, Mail, Link2 } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { usePathname } from "next/navigation";

const FloatingContact = () => {
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  // Hide on plan detail pages where StickyBookingBar is shown
  const isPlanDetail = /^\/plans\/\d+$/.test(pathname);

  // WhatsApp with pre-filled message
  const whatsappUrl = "https://wa.me/918979810991?text=" + encodeURIComponent("Hello, I am interested in a Golden Triangle tour.");

  const handleShare = useCallback(async () => {
    // Try native Web Share API first (available on most mobile browsers)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Guide India Tours",
          text: "Check out these amazing India tours!",
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or API failed — fall back to dropdown
      }
    }
    // Fallback: show dropdown menu
    setShareMenuOpen(!shareMenuOpen);
  }, [shareMenuOpen]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShareMenuOpen(false);
    }, 1500);
  }, []);

  if (isPlanDetail) return null;

  return (
    <>
      {/* Spacer for mobile bottom bar */}
      <div className="h-20 md:hidden" aria-hidden="true" />

      {/* Mobile Floating Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1 safe-area-inset-bottom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-stretch bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden"
        >
          {/* WhatsApp Button — primary CTA */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20BA5A] hover:to-[#0fa873] text-white px-4 py-3.5 flex items-center justify-center gap-2.5 active:scale-[0.97] transition-all duration-200 touch-manipulation rounded-l-2xl"
            whileTap={{ scale: 0.97 }}
          >
            <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold whitespace-nowrap">Chat on WhatsApp</span>
          </motion.a>

          {/* Call Button */}
          <motion.a
            href="tel:+919410000991"
            className="w-14 bg-maroon-600 hover:bg-maroon-700 text-white flex items-center justify-center active:scale-[0.95] transition-all duration-200 touch-manipulation"
            whileTap={{ scale: 0.95 }}
            aria-label="Call us"
          >
            <Phone className="w-5 h-5" />
          </motion.a>

          {/* Share Button */}
          <div className="relative">
            <motion.button
              onClick={handleShare}
              className="w-14 h-full bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center justify-center active:scale-[0.95] transition-all duration-200 touch-manipulation rounded-r-2xl"
              whileTap={{ scale: 0.95 }}
              aria-label="Share this page"
              aria-expanded={shareMenuOpen}
            >
              <Share2 className="w-5 h-5" />
            </motion.button>

            {/* Share Menu Dropdown (fallback when Web Share API unavailable) */}
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
                  />
                  {/* Menu */}
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden min-w-[180px] z-50"
                  >
                    {/* Email option */}
                    <a
                      href="mailto:info@guideindiatours.com?subject=Golden Triangle Tour Inquiry"
                      onClick={() => setShareMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-sm text-gray-700"
                    >
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>Send via Email</span>
                    </a>
                    {/* Copy Link option */}
                    <button
                      onClick={handleCopyLink}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-sm text-gray-700 text-left"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Link2 className="w-4 h-4 text-gray-500" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
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
