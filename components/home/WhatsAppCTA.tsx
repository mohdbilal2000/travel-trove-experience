"use client";

import { motion } from "framer-motion";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { MessageCircle } from "lucide-react";

interface WhatsAppCTAProps {
  /** Pre-filled WhatsApp text. */
  message?: string;
  /** "band" = full-width section; "button" = inline button only. */
  variant?: "band" | "button";
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  className?: string;
}

const WHATSAPP_NUMBER = "918979810991";

const buildUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const WhatsAppCTA = ({
  message = "Hi Guide India Tours! I'd like help planning my trip. Please share the best options.",
  variant = "band",
  title = "Have questions? Chat with a travel expert.",
  subtitle = "Get instant answers on WhatsApp — itineraries, pricing, and custom requests welcome.",
  buttonLabel = "Chat on WhatsApp",
  className = "",
}: WhatsAppCTAProps) => {
  if (variant === "button") {
    return (
      <a
        href={buildUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20BA5A] hover:to-[#0fa873] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all ${className}`}
      >
        <WhatsAppIcon className="w-5 h-5" />
        {buttonLabel}
      </a>
    );
  }

  return (
    <section className={`py-14 md:py-20 bg-gradient-to-br from-[#25D366]/10 via-white to-jade-50 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#128C7E] to-[#25D366] p-8 md:p-12 shadow-2xl text-white text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/15 items-center justify-center flex-shrink-0">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">{title}</h2>
              <p className="text-white/90 leading-relaxed">{subtitle}</p>
            </div>
            <a
              href={buildUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-white text-[#128C7E] hover:bg-gray-50 font-bold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap flex-shrink-0"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {buttonLabel}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppCTA;
