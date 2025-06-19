
import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
  const contactOptions = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our travel experts',
      action: () => {
        window.open('tel:+918909741833', '_self');
        onClose();
      },
      color: 'bg-blue-500 hover:bg-blue-600',
      number: '+91 89097 41833'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us your travel requirements',
      action: () => {
        window.open('mailto:bilalmohd3160@gmail.com', '_self');
        onClose();
      },
      color: 'bg-red-500 hover:bg-red-600',
      email: 'bilalmohd3160@gmail.com'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      description: 'Quick chat for instant responses',
      action: () => {
        window.open('https://wa.me/918909741833?text=Hi, I am interested in your Golden Triangle tour packages', '_blank');
        onClose();
      },
      color: 'bg-green-500 hover:bg-green-600',
      number: '+91 89097 41833'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 max-w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center text-maroon-700">
            Get in Touch
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Choose your preferred way to contact us
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div
                key={index}
                onClick={option.action}
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-maroon-300 hover:bg-gray-50 cursor-pointer transition-all duration-200 active:scale-95"
              >
                <div className={`p-2.5 rounded-full ${option.color} text-white mr-3 flex-shrink-0`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm">{option.title}</h3>
                  <p className="text-xs text-gray-600 truncate">{option.description}</p>
                  {option.number && (
                    <p className="text-xs text-maroon-600 font-medium mt-0.5">{option.number}</p>
                  )}
                  {option.email && (
                    <p className="text-xs text-maroon-600 font-medium mt-0.5 truncate">{option.email}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;
