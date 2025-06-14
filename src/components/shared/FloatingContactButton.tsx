
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import ContactPopup from './ContactPopup';

const FloatingContactButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-maroon-600 hover:bg-maroon-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl animate-pulse"
        aria-label="Contact us"
      >
        <Phone size={24} />
      </button>
      
      <ContactPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  );
};

export default FloatingContactButton;
