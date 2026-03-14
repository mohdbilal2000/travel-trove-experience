
import { Metadata } from 'next';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageCircle, Phone, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
    title: 'FAQ | Essential Travel Guide for Golden Triangle Tours',
    description: 'Find answers to common questions about booking, safety, payments, and travel tips for your India tour. Start your Golden Triangle adventure well-informed.',
    alternates: {
        canonical: 'https://guideindiatours.com/faq',
        languages: {
            'en-US': 'https://guideindiatours.com/faq',
            'en-GB': 'https://guideindiatours.com/faq',
            'en-AU': 'https://guideindiatours.com/faq',
            'x-default': 'https://guideindiatours.com/faq',
        },
    },
};

const faqCategories = [
    {
        id: "booking",
        title: "Booking & Reservations",
        icon: <HelpCircle className="text-maroon-600" />,
        questions: [
            {
                question: "How do I book a tour with Guide India Tours?",
                answer: "You can book directly via our website by selecting a plan and clicking 'Book This Tour', which opens a WhatsApp chat with our agents. Alternatively, use our contact form for a custom quote or call us at +91 9410000991."
            },
            {
                question: "How far in advance should I book my India tour?",
                answer: "For the best experience and availability of 5-star hotels, we recommend booking 2-4 months in advance, especially for the peak season from October to March."
            },
            {
                question: "What is the cancellation and refund policy?",
                answer: "We offer free cancellation up to 7 days before the tour start date for a full refund. Cancellations within 3-7 days receive a 50% refund. Within 3 days, no refund is available. In case of emergencies, we work with you to reschedule at no extra charge."
            },
            {
                question: "What payment methods do you accept?",
                answer: "We accept credit cards, debit cards, bank transfers, UPI, and cash payments. We accept USD, EUR, GBP, and INR. A 20% advance is required to confirm your booking, with the balance payable before the tour starts."
            }
        ]
    },
    {
        id: "tours",
        title: "Tour Details & Destinations",
        icon: <HelpCircle className="text-maroon-600" />,
        questions: [
            {
                question: "What is the best time to visit the Golden Triangle in India?",
                answer: "The best time to visit Delhi, Agra, and Jaipur is from October to March when temperatures are pleasant (15-25°C). The peak tourist season is November to February. Avoid the summer months (April-June) when temperatures can exceed 45°C. The monsoon season (July-September) brings rain but fewer crowds."
            },
            {
                question: "How many days do I need for a Golden Triangle tour?",
                answer: "A classic Golden Triangle tour covering Delhi, Agra, and Jaipur takes 4-6 days. We offer same-day Agra tours from Delhi (12-14 hours), 2-day Delhi-Agra trips, and extended 7-15 day tours that include Udaipur, Jaisalmer, Varanasi, or Ranthambore. The ideal duration depends on your interests and pace."
            },
            {
                question: "What is included in your tour packages?",
                answer: "All our tour packages include a private air-conditioned vehicle with professional driver, licensed government-approved English-speaking guide, luxury hotel accommodation, airport/railway station pickup and drop-off, monument entry fees, bottled water, and 24/7 WhatsApp support. Meals, personal shopping, and tips are not included unless specified."
            },
            {
                question: "Can I do a same-day Taj Mahal tour from Delhi?",
                answer: "Yes, our same-day Agra tour from Delhi is one of our most popular packages. We depart early morning (around 6 AM), drive via the Yamuna Expressway (3 hours), visit the Taj Mahal at sunrise, explore Agra Fort, and return to Delhi by evening. The tour includes a private car, guide, entry tickets, and lunch."
            },
            {
                question: "Which are the best tour companies in Agra for Taj Mahal visits?",
                answer: "Guide India Tours is rated 4.9/5 by 366+ verified travelers on Google, making us one of the highest-rated tour operators in Agra. We specialize in private Taj Mahal tours with government-licensed guides who provide in-depth historical knowledge. Unlike large group tours, we offer personalized private experiences with flexible timings."
            }
        ]
    },
    {
        id: "safety",
        title: "Safety & Travel Protocols",
        icon: <HelpCircle className="text-maroon-600" />,
        questions: [
            {
                question: "Is it safe for solo female travelers in the Golden Triangle?",
                answer: "Yes, it is safe. We specialize in private tours where you are accompanied by a government-authorized guide and a professional chauffeur in a private vehicle at all times, providing an extra layer of security and local expertise. We also offer female guides on request for added comfort."
            },
            {
                question: "What is your health and safety policy?",
                answer: "We ensure all vehicles are sanitized daily. Our guides and drivers are fully vaccinated and trained to follow the latest safety protocols to ensure a worry-free experience."
            },
            {
                question: "Do I need a visa to visit India?",
                answer: "Most foreign nationals need a visa to enter India. Citizens of over 150 countries can apply for an e-Visa online, which is valid for tourism and can be obtained within 72 hours. We recommend applying at least 2 weeks before travel. Our team can guide you through the visa application process if needed."
            }
        ]
    },
    {
        id: "itinerary",
        title: "Tour Customization",
        icon: <HelpCircle className="text-maroon-600" />,
        questions: [
            {
                question: "Can I customize the Golden Triangle itinerary?",
                answer: "Absolutely. We are specialists in tailor-made India tours. You can add extra days in any city, include more destinations like Udaipur or Varanasi, or focus on specific interests like photography or cuisine."
            },
            {
                question: "Do you offer tours in languages other than English?",
                answer: "Yes, we offer guided tours in 8 languages: English, Hindi, French, Spanish, German, Japanese, Russian, and Italian. Our multilingual guides are all government-licensed and have deep knowledge of Indian history and culture. Please mention your preferred language when booking."
            },
            {
                question: "Can you arrange hotel bookings and airport transfers?",
                answer: "Yes, all our tour packages include luxury hotel bookings at heritage properties and 5-star hotels, as well as airport and railway station pickups and drop-offs. We work with top-rated hotels in each city and can accommodate special requests for specific properties or room categories."
            }
        ]
    }
];

export default function FAQPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqCategories.flatMap(cat => cat.questions).map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section className="relative pt-44 pb-24 bg-white border-b border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-maroon-600/5 rounded-bl-full translate-x-1/2 -translate-y-12" />
                <div className="container mx-auto px-4 relative z-10">
                    <Breadcrumbs items={[{ label: 'FAQ' }]} className="mb-12" />
                    <div className="max-w-3xl">
                        <Badge className="bg-maroon-600/10 text-maroon-600 border-none px-6 py-2 uppercase tracking-[0.3em] text-xs font-black mb-8">
                            Knowledge Base
                        </Badge>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-gray-900 mb-8 leading-tight tracking-tighter">
                            Your Questions, <span className="text-maroon-600">Answered.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            Everything you need to know about planning your luxury Golden Triangle experience with India's most trusted guides.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="space-y-16">
                        {faqCategories.map((category) => (
                            <div key={category.id}>
                                <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-6">
                                    <h2 className="text-3xl font-display font-bold text-gray-900">{category.title}</h2>
                                </div>
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    {category.questions.map((faq, i) => (
                                        <AccordionItem
                                            key={i}
                                            value={`${category.id}-${i}`}
                                            className="bg-white px-8 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-all"
                                        >
                                            <AccordionTrigger className="text-left font-bold text-lg py-8 hover:no-underline text-gray-900 focus-visible:bg-gray-50 focus-visible:ring-2 focus-visible:ring-maroon-600/30 focus-visible:outline-none rounded-lg px-2 -mx-2">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-gray-500 font-light text-lg leading-relaxed pb-8">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto bg-black p-16 md:p-24 rounded-3xl text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-maroon-600/40 to-transparent" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Still Have <span className="text-gold-500">Questions?</span></h2>
                            <p className="text-xl text-white/50 font-light mb-16 max-w-2xl mx-auto">Our travel architects are available 24/7 to provide personalized assistance for your journey.</p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Button asChild size="lg" className="h-20 px-12 rounded-3xl bg-maroon-600 hover:bg-white hover:text-black text-xl font-bold shadow-2xl transition-all duration-500 group/btn">
                                    <Link href="/contact" className="flex items-center gap-3">
                                        Inquire Now <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                                    </Link>
                                </Button>
                                <Button variant="outline" size="lg" asChild className="h-20 px-12 rounded-3xl border-white/20 text-white hover:bg-white/10 text-xl font-bold">
                                    <a href="tel:+919410000991" className="flex items-center gap-3">
                                        <Phone size={24} /> Call Concierge
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
