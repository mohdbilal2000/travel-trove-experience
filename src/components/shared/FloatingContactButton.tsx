
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ContactPopup from './ContactPopup';

const FloatingContactButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 bg-[#800000] hover:bg-[#600000] text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl animate-pulse active:scale-95"
        aria-label="Contact us"
      >
        <MessageCircle size={20} className="sm:w-6 sm:h-6" />
      </button>
      
      <ContactPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  );
};

export default FloatingContactButton;
