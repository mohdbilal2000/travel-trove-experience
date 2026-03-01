"use client";

import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  // Auto-popup after 20 seconds (only on desktop)
  useEffect(() => {
    // Don't auto-open on mobile devices
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return;
    }

    // Check if user has previously dismissed the auto-popup
    const dismissedToday = localStorage.getItem('contact-popup-dismissed');
    const today = new Date().toDateString();

    if (dismissedToday === today) {
      return; // Don't auto-open if dismissed today
    }

    const timer = setTimeout(() => {
      if (!hasAutoOpened) {
        setIsOpen(true);
        setHasAutoOpened(true);
      }
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDismissForToday = () => {
    const today = new Date().toDateString();
    localStorage.setItem('contact-popup-dismissed', today);
    setIsOpen(false);
  };

  const contactOptions = [
    {
      icon: Phone,
      title: 'Call Us',
      description: '+91 8979810991',
      action: () => window.open('tel:+918979810991', '_self'),
      color: 'bg-maroon-600 hover:bg-maroon-700',
      iconColor: 'text-white'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'info@guideindiatours.com',
      action: () => window.open('mailto:info@guideindiatours.com', '_self'),
      color: 'bg-royal-600 hover:bg-royal-700',
      iconColor: 'text-white'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Quick chat support',
      action: () => window.open('https://wa.me/918979810991?text=Hi, I am interested in your Golden Triangle tour packages', '_blank'),
      color: 'bg-green-600 hover:bg-green-700',
      iconColor: 'text-white'
    }
  ];

  return (
    <>
      {/* Main Contact Button - Hidden on mobile, only visible on desktop */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative bg-gradient-to-r from-maroon-600 to-maroon-700 hover:from-maroon-700 hover:to-maroon-800 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contact us"
        >
          <MessageCircle
            size={24}
            className="group-hover:rotate-12 transition-transform duration-300"
          />

          {/* Subtle pulse animation */}
          <div className="absolute inset-0 rounded-full bg-maroon-400 animate-ping opacity-20"></div>
        </motion.button>

        {/* Contact Options Modal */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={handleClose}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-80 z-50"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-display">
                      Get in Touch
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      We're here to help with your travel plans
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>

                {/* Contact Options */}
                <div className="space-y-3">
                  {contactOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <motion.button
                        key={index}
                        onClick={() => {
                          option.action();
                          handleClose();
                        }}
                        className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`p-3 rounded-full ${option.color} mr-4 group-hover:scale-110 transition-transform duration-200`}>
                          <Icon size={18} className={option.iconColor} />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {option.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {option.description}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleDismissForToday}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Don't show today
                    </button>
                    <p className="text-xs text-gray-500">
                      Quick & easy contact options
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ContactButton;
