
"use client";

import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

interface BookingButtonProps {
    planTitle: string;
    planId: number;
    planDuration: string;
    planPrice: string;
    className?: string;
}

export default function BookingButton({ planTitle, planId, planDuration, planPrice, className }: BookingButtonProps) {
    const handleBook = () => {
        const message = `Hi! I'm interested in the "${planTitle}" tour.\n\nTour ID: ${planId}\nDuration: ${planDuration}\nPrice: ${planPrice}\n\nPlease provide more details.`;
        const whatsappUrl = `https://wa.me/918979810991?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Button
            className={className}
            onClick={handleBook}
        >
            <WhatsAppIcon className="w-4 h-4 mr-2" />
            Book This Tour
        </Button>
    );
}
