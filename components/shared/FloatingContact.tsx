"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Share2, Check, Mail, Link2, X, ChevronUp } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { usePathname } from "next/navigation";

const COLLAPSE_KEY = "floating-contact-collapsed";

const FloatingContact = () => {
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Restore the collapsed preference after mount (avoids hydration mismatch).
  useEffect(() => {
    if (localStorage.getItem(COLLAPSE_KEY) === "true") setCollapsed(true);
  }, []);

  // Hide on plan detail pages where StickyBookingBar is shown
  const isPlanDetail = /^\/plans\/\d+$/.test(pathname);

  // WhatsApp with pre-filled message
  const whatsappUrl = "https://wa.me/918979810991?text=" + encodeURIComponent("Hello, I am interested in a Golden Triangle tour.");

  const collapse = useCallback(() => {
    setCollapsed(true);
    setShareMenuOpen(false);
    localStorage.setItem(COLLAPSE_KEY, "true");
  }, []);

  const expand = useCallback(() => {
    setCollapsed(false);
    localStorage.setItem(COLLAPSE_KEY, "false");
  }, []);

  const handleShare = useCallback(async () => {
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
    setShareMenuOpen((v) => !v);
  }, []);

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
      {/* Spacer for mobile bottom bar — shorter when collapsed so content isn't over-pushed */}
      <div className={`${collapsed ? "h-16" : "h-20"} md:hidden`} aria-hidden="true" />

      {/* Mobile Floating Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1 safe-area-inset-bottom">
        <AnimatePresence mode="wait" initial={false}>
          {collapsed ? (
            /* Collapsed: single WhatsApp pill + expand handle */
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-full shadow-lg px-5 py-3.5 flex items-center justify-center gap-2.5 active:scale-[0.97] transition-transform touch-manipulation"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">Chat on WhatsApp</span>
              </a>
              <button
                onClick={expand}
                className="w-12 h-12 flex-shrink-0 bg-white rounded-full shadow-lg border border-gray-100 text-gray-500 flex items-center justify-center active:scale-95 transition-transform touch-manipulation"
                aria-label="Show all contact options"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            /* Expanded: 3 labeled segments + collapse handle */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative flex items-stretch gap-2"
            >
              <div className="flex-1 flex items-stretch bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
                {/* WhatsApp — primary, dominant */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-[1.6] bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-3 py-2.5 flex flex-col items-center justify-center gap-0.5 active:scale-[0.97] transition-transform touch-manipulation"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span className="text-[11px] font-semibold leading-none">WhatsApp</span>
                </a>

                {/* Call */}
                <a
                  href="tel:+918979810991"
                  className="flex-1 bg-white text-maroon-600 px-3 py-2.5 flex flex-col items-center justify-center gap-0.5 border-l border-gray-100 active:scale-[0.97] transition-transform touch-manipulation"
                  aria-label="Call us"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-[11px] font-semibold leading-none">Call</span>
                </a>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="flex-1 bg-white text-gray-600 px-3 py-2.5 flex flex-col items-center justify-center gap-0.5 border-l border-gray-100 active:scale-[0.97] transition-transform touch-manipulation"
                  aria-label="Share this page"
                  aria-expanded={shareMenuOpen}
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-[11px] font-semibold leading-none">Share</span>
                </button>
              </div>

              {/* Collapse handle */}
              <button
                onClick={collapse}
                className="w-10 flex-shrink-0 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 text-gray-400 flex items-center justify-center active:scale-95 transition-transform touch-manipulation"
                aria-label="Minimise contact bar"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Share Menu Dropdown (fallback when Web Share API unavailable) */}
              <AnimatePresence>
                {shareMenuOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShareMenuOpen(false)}
                      className="fixed inset-0 bg-black/20 z-40"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden min-w-[180px] z-50"
                    >
                      <a
                        href="mailto:info@guideindiatours.com?subject=Golden Triangle Tour Inquiry"
                        onClick={() => setShareMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-sm text-gray-700"
                      >
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>Send via Email</span>
                      </a>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FloatingContact;
