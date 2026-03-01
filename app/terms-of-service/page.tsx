import { Metadata } from 'next';
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { FileText, CalendarX, CreditCard, ShieldAlert, Copyright, Scale } from "lucide-react";

export const metadata: Metadata = {
    title: 'Terms of Service | Guide India Tours',
    description: 'Read the terms and conditions for booking tours with Guide India Tours. Covers booking policies, cancellation terms, payment conditions, liability, and governing law.',
    alternates: {
        canonical: 'https://guideindia.tours/terms-of-service',
        languages: {
            'en-US': 'https://guideindia.tours/terms-of-service',
            'en-GB': 'https://guideindia.tours/terms-of-service',
            'en-AU': 'https://guideindia.tours/terms-of-service',
            'x-default': 'https://guideindia.tours/terms-of-service',
        },
    },
};

const sections = [
    {
        id: "acceptance-of-terms",
        icon: FileText,
        title: "Acceptance of Terms",
        content: [
            {
                subtitle: "Agreement to Terms",
                text: "By accessing, browsing, or using the Guide India Tours website (guideindia.tours) or booking any of our tour services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services."
            },
            {
                subtitle: "Eligibility",
                text: "You must be at least 18 years of age to make a booking with Guide India Tours. By placing a booking, you confirm that you are of legal age and have the authority to enter into a binding agreement. If you are booking on behalf of other travelers, you confirm that you have obtained their consent and are authorized to accept these terms on their behalf."
            },
            {
                subtitle: "Modifications to Terms",
                text: "Guide India Tours reserves the right to update or modify these Terms of Service at any time without prior notice. Changes become effective immediately upon posting on this page. Your continued use of our website or services after any changes constitutes acceptance of the revised terms. We encourage you to review this page periodically."
            }
        ]
    },
    {
        id: "tour-bookings-cancellation",
        icon: CalendarX,
        title: "Tour Bookings & Cancellation",
        content: [
            {
                subtitle: "Booking Confirmation",
                text: "A booking is considered confirmed only after we have received the required deposit or full payment (as applicable) and have sent you a written confirmation via email. Submitting a booking request or inquiry does not constitute a confirmed reservation. All bookings are subject to availability."
            },
            {
                subtitle: "Itinerary Changes",
                text: "While we make every effort to operate tours as described, Guide India Tours reserves the right to make changes to any itinerary, accommodation, or service when necessary due to circumstances beyond our control, including but not limited to weather conditions, road closures, monument closures by government authorities, local festivals, or safety concerns. In such cases, suitable alternatives of equivalent or higher standard will be arranged."
            },
            {
                subtitle: "Cancellation by Traveler",
                text: "All cancellations must be communicated in writing via email to info@guideindiatours.com. Cancellation charges are calculated based on the date we receive your written cancellation notice relative to the tour start date. Please refer to our Refund Policy page for the detailed cancellation fee schedule and refund timelines."
            },
            {
                subtitle: "Cancellation by Guide India Tours",
                text: "In rare circumstances, we may need to cancel a tour due to insufficient minimum group size, extreme weather, natural disasters, political unrest, pandemic-related restrictions, or other force majeure events. In such cases, you will be offered the choice of an alternative tour of equal or greater value, rescheduling to a future date, or a full refund of all payments made."
            }
        ]
    },
    {
        id: "payment-terms",
        icon: CreditCard,
        title: "Payment Terms",
        content: [
            {
                subtitle: "Pricing",
                text: "All tour prices listed on our website are in US Dollars (USD) or Indian Rupees (INR) as indicated. Prices include the services explicitly mentioned in the tour itinerary. Prices are subject to change without notice; however, once a booking is confirmed with payment, the quoted price is guaranteed."
            },
            {
                subtitle: "Deposit & Balance",
                text: "A non-refundable deposit of 25% of the total tour cost is required at the time of booking to secure your reservation. The remaining balance must be paid at least 30 days prior to the tour start date. For bookings made within 30 days of the tour start date, full payment is required at the time of booking."
            },
            {
                subtitle: "Payment Methods",
                text: "We accept payments via international bank transfers, major credit and debit cards (Visa, MasterCard, American Express), UPI, and other approved digital payment methods. All online transactions are processed through secure, PCI-DSS compliant payment gateways. Any bank charges or currency conversion fees are the responsibility of the traveler."
            },
            {
                subtitle: "Taxes & Additional Costs",
                text: "Tour prices include applicable GST (Goods and Services Tax) as required by Indian law. Monument entrance fees, camera fees, personal expenses, tips, travel insurance, visa fees, and any services not explicitly included in the itinerary are the responsibility of the traveler unless otherwise stated."
            }
        ]
    },
    {
        id: "liability-limitations",
        icon: ShieldAlert,
        title: "Liability Limitations",
        content: [
            {
                subtitle: "Scope of Liability",
                text: "Guide India Tours acts as a tour organizer and coordinator. While we exercise due diligence in selecting reputable hotels, transportation providers, restaurants, and local partners, we are not liable for any injury, illness, death, loss, damage, accident, delay, or irregularity that may occur through the acts, defaults, or omissions of any third-party service provider."
            },
            {
                subtitle: "Traveler Responsibility",
                text: "Travelers are responsible for ensuring they hold valid travel documents including passports, visas, and any required vaccinations. Guide India Tours is not responsible for any loss or expense arising from the failure to comply with entry or health requirements of India. Travelers must also ensure they are physically fit for the tour activities they have booked."
            },
            {
                subtitle: "Travel Insurance",
                text: "We strongly recommend that all travelers purchase comprehensive travel insurance covering trip cancellation, medical emergencies, evacuation, loss of baggage, and personal liability. Guide India Tours is not responsible for any costs that would otherwise be covered by adequate travel insurance."
            },
            {
                subtitle: "Maximum Liability",
                text: "In any event, the maximum liability of Guide India Tours shall not exceed the total amount paid by the traveler for the specific tour booking in question. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services."
            }
        ]
    },
    {
        id: "intellectual-property",
        icon: Copyright,
        title: "Intellectual Property",
        content: [
            {
                subtitle: "Ownership",
                text: "All content on the Guide India Tours website, including but not limited to text, photographs, graphics, logos, icons, videos, audio, software, and design layouts, is the exclusive property of Guide India Tours or its licensed content providers and is protected by Indian and international copyright, trademark, and intellectual property laws."
            },
            {
                subtitle: "Permitted Use",
                text: "You may view and download content from this website for personal, non-commercial use only, provided you retain all copyright and proprietary notices. Any reproduction, distribution, modification, republication, or commercial use of our content without prior written permission from Guide India Tours is strictly prohibited."
            },
            {
                subtitle: "User-Generated Content",
                text: "By submitting reviews, testimonials, photographs, or any other content to Guide India Tours (including via social media tags or email), you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and display such content for marketing and promotional purposes across all media."
            }
        ]
    },
    {
        id: "governing-law",
        icon: Scale,
        title: "Governing Law",
        content: [
            {
                subtitle: "Jurisdiction",
                text: "These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms, your use of the website, or any tour booking shall be subject to the exclusive jurisdiction of the courts located in Agra, Uttar Pradesh, India."
            },
            {
                subtitle: "Dispute Resolution",
                text: "Before initiating any legal proceedings, both parties agree to attempt to resolve any disputes amicably through good-faith negotiation. If a resolution cannot be reached within 30 days of written notice of the dispute, either party may pursue arbitration under the Arbitration and Conciliation Act, 1996 of India, with the arbitration to be held in Agra."
            },
            {
                subtitle: "Severability",
                text: "If any provision of these Terms of Service is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be replaced with a valid provision that most closely matches the intent of the original."
            }
        ]
    }
];

export default function TermsOfServicePage() {
    return (
        <main className="bg-ivory-100 min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-44 pb-24 bg-white border-b border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-maroon-600/5 rounded-bl-full translate-x-1/2 -translate-y-12" />
                <div className="container mx-auto px-4 relative z-10">
                    <Breadcrumbs items={[{ label: 'Terms of Service' }]} className="mb-12" />
                    <div className="max-w-3xl">
                        <span className="inline-block bg-maroon-600/10 text-maroon-600 px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black rounded-full mb-8">
                            Legal
                        </span>
                        <h1 className="text-6xl md:text-8xl font-display font-bold text-gray-900 mb-8 leading-tight tracking-tighter">
                            Terms of <span className="text-maroon-600">Service.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            Please review the following terms carefully before using our website or booking any tour with Guide India Tours. These terms govern your relationship with us.
                        </p>
                        <p className="text-sm text-gray-400 mt-6">Last updated: January 1, 2025</p>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="space-y-12">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                id={section.id}
                                className="bg-white p-10 md:p-14 rounded-3xl border border-gray-50 shadow-sm"
                            >
                                <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-maroon-600/10 flex items-center justify-center text-maroon-600">
                                        <section.icon size={24} />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold text-gray-900">{section.title}</h2>
                                </div>
                                <div className="space-y-8">
                                    {section.content.map((item, i) => (
                                        <div key={i}>
                                            <h3 className="text-lg font-bold text-gray-900 mb-3">{item.subtitle}</h3>
                                            <p className="text-gray-500 font-light text-lg leading-relaxed">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Contact Details Card */}
                        <div className="bg-maroon-600/5 p-10 md:p-14 rounded-3xl border border-maroon-600/10">
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">Questions About These Terms?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                                <div className="space-y-3">
                                    <p className="font-medium text-gray-900">Guide India Tours</p>
                                    <p className="font-light">Agra, Uttar Pradesh, India</p>
                                </div>
                                <div className="space-y-3">
                                    <p className="font-medium text-gray-900">Contact Details</p>
                                    <p className="font-light">Email: info@guideindiatours.com</p>
                                    <p className="font-light">Phone: +91 8979810991</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
