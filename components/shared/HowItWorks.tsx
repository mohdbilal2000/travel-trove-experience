import { MessageCircle, FileText, CreditCard, MapPin } from "lucide-react";

const steps = [
    {
        icon: MessageCircle,
        title: "1. Tell Us Your Plans",
        description: "Send an inquiry on WhatsApp, through our contact form, or by phone. Share your dates, group size, and interests.",
    },
    {
        icon: FileText,
        title: "2. Get a Custom Quote",
        description: "Within 2 hours our team replies with a tailored itinerary and transparent, all-inclusive pricing — no hidden fees.",
    },
    {
        icon: CreditCard,
        title: "3. Confirm with a Deposit",
        description: "A 25% deposit secures your guide, vehicle, and hotels. The balance is due 30 days before your tour begins.",
    },
    {
        icon: MapPin,
        title: "4. Travel with 24/7 Support",
        description: "Your private guide and driver take care of everything on the ground, with round-the-clock WhatsApp support throughout your trip.",
    },
];

export default function HowItWorks({ className = "" }: { className?: string }) {
    return (
        <section className={`py-14 md:py-20 bg-white ${className}`}>
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                        How Booking <span className="text-maroon-600">Works</span>
                    </h2>
                    <p className="text-gray-500 font-light text-lg">
                        From first message to final farewell — a simple, transparent process.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <div key={step.title} className="bg-ivory-100 rounded-3xl p-8 text-center">
                            <div className="w-14 h-14 mx-auto rounded-2xl bg-maroon-600/10 flex items-center justify-center text-maroon-600 mb-6">
                                <step.icon className="w-7 h-7" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-3">{step.title}</h3>
                            <p className="text-sm text-gray-500 font-light leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
