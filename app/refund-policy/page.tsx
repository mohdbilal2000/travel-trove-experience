import { Metadata } from 'next';
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Clock, CalendarCog, CloudLightning, MailCheck } from "lucide-react";

export const metadata: Metadata = {
    title: 'Refund Policy | Guide India Tours',
    description: 'Understand our cancellation and refund policy for tour bookings. Covers timeline-based refund percentages, modification terms, force majeure provisions, and how to request a refund.',
    alternates: {
        canonical: 'https://guideindiatours.com/refund-policy',
        languages: {
            'en-US': 'https://guideindiatours.com/refund-policy',
            'en-GB': 'https://guideindiatours.com/refund-policy',
            'en-AU': 'https://guideindiatours.com/refund-policy',
            'x-default': 'https://guideindiatours.com/refund-policy',
        },
    },
};

const cancellationTiers = [
    { period: "60+ days before tour start", refund: "85%", description: "Full refund minus 15% administrative and processing fee." },
    { period: "30 - 59 days before tour start", refund: "60%", description: "60% refund of the total tour cost." },
    { period: "15 - 29 days before tour start", refund: "40%", description: "40% refund of the total tour cost." },
    { period: "7 - 14 days before tour start", refund: "20%", description: "20% refund of the total tour cost." },
    { period: "Less than 7 days before tour start", refund: "0%", description: "No refund. Full tour cost is forfeited." },
    { period: "No-show on tour date", refund: "0%", description: "No refund for failure to appear at the designated pickup point." },
];

const sections = [
    {
        id: "cancellation-policy",
        icon: Clock,
        title: "Cancellation Policy",
        content: [
            {
                subtitle: "Overview",
                text: "We understand that travel plans can change. Our cancellation policy is designed to be fair while accounting for the advance arrangements and commitments we make with hotels, transportation providers, and local partners on your behalf. All cancellation requests must be submitted in writing via email to info@guideindiatours.com."
            },
            {
                subtitle: "Refund Processing",
                text: "Approved refunds will be processed within 10 to 15 business days from the date of cancellation approval. Refunds will be issued to the original payment method used at the time of booking. Please note that bank processing times may add an additional 5 to 7 business days before the refund appears in your account."
            },
            {
                subtitle: "Non-Refundable Components",
                text: "Certain third-party services booked as part of your tour may be non-refundable, including but not limited to domestic flight tickets, special event tickets, pre-purchased monument entry fees, and special experience bookings (e.g., private dining, heritage walks). These will be clearly communicated at the time of booking."
            }
        ]
    },
    {
        id: "modifications",
        icon: CalendarCog,
        title: "Modifications",
        content: [
            {
                subtitle: "Date Changes",
                text: "If you wish to change your tour dates, we will do our best to accommodate your request subject to availability. Date change requests made more than 30 days before the original tour start date can be processed free of charge for one change. Subsequent date changes or changes made within 30 days of the tour start date may incur an administrative fee of up to 10% of the total tour cost."
            },
            {
                subtitle: "Itinerary Modifications",
                text: "Modifications to the tour itinerary, such as adding or removing destinations, upgrading accommodations, or changing the group size, can be requested up to 15 days before the tour start date. Pricing adjustments (increases or decreases) will be communicated and must be agreed upon before the modification is confirmed."
            },
            {
                subtitle: "Downgrade Requests",
                text: "If you wish to reduce the scope of your tour (e.g., fewer days, lower hotel category, smaller vehicle), the difference in cost may not be fully refundable, as commitments to service providers may have already been made. Downgrade requests are assessed on a case-by-case basis."
            }
        ]
    },
    {
        id: "force-majeure",
        icon: CloudLightning,
        title: "Force Majeure",
        content: [
            {
                subtitle: "Definition",
                text: "Force Majeure refers to extraordinary circumstances beyond the reasonable control of either party, including but not limited to natural disasters (earthquakes, floods, cyclones), pandemics or epidemics, government-imposed travel restrictions, political instability or civil unrest, acts of terrorism, severe weather conditions making travel unsafe, and strikes or industrial actions affecting essential services."
            },
            {
                subtitle: "Our Commitment",
                text: "In the event of a Force Majeure situation that prevents the tour from being operated as planned, Guide India Tours will offer you the following options: full credit toward a future tour of equal or greater value (valid for 18 months from the original tour date), rescheduling the same tour to a mutually agreeable future date at no additional cost, or a full refund of all payments made minus any irrecoverable third-party costs already incurred."
            },
            {
                subtitle: "Irrecoverable Costs",
                text: "In Force Majeure situations, certain costs may be irrecoverable due to advance payments made to third-party service providers (e.g., non-refundable hotel deposits, prepaid flight tickets). We will provide transparent documentation of any such costs and make every reasonable effort to recover the maximum amount possible on your behalf."
            }
        ]
    },
    {
        id: "how-to-request-refund",
        icon: MailCheck,
        title: "How to Request a Refund",
        content: [
            {
                subtitle: "Step 1: Submit Your Request",
                text: "Send an email to info@guideindiatours.com with the subject line \"Refund Request - [Your Booking Reference Number]\". Include your full name, booking reference number, tour name and dates, reason for cancellation, and your preferred refund method."
            },
            {
                subtitle: "Step 2: Confirmation & Review",
                text: "Our team will acknowledge your request within 24 hours and review it against the applicable cancellation policy. You will receive a detailed breakdown of the refund amount within 3 business days of submitting your request."
            },
            {
                subtitle: "Step 3: Refund Processing",
                text: "Once you confirm acceptance of the refund amount, the refund will be processed within 10 to 15 business days. You will receive an email confirmation with the transaction reference once the refund has been initiated."
            },
            {
                subtitle: "Disputes",
                text: "If you disagree with the calculated refund amount, you may appeal by responding to the refund breakdown email with your concerns. Our management team will review the appeal and respond within 7 business days. We are committed to resolving all refund disputes fairly and transparently."
            }
        ]
    }
];

export default function RefundPolicyPage() {
    return (
        <main className="bg-ivory-100 min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-44 pb-24 bg-white border-b border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-maroon-600/5 rounded-bl-full translate-x-1/2 -translate-y-12" />
                <div className="container mx-auto px-4 relative z-10">
                    <Breadcrumbs items={[{ label: 'Refund Policy' }]} className="mb-12" />
                    <div className="max-w-3xl">
                        <span className="inline-block bg-maroon-600/10 text-maroon-600 px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black rounded-full mb-8">
                            Legal
                        </span>
                        <h1 className="text-6xl md:text-8xl font-display font-bold text-gray-900 mb-8 leading-tight tracking-tighter">
                            Refund <span className="text-maroon-600">Policy.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            We want you to book with confidence. Our refund policy is designed to be fair and transparent, protecting both our guests and the quality of our tour arrangements.
                        </p>
                        <p className="text-sm text-gray-400 mt-6">Last updated: January 1, 2025</p>
                    </div>
                </div>
            </section>

            {/* Cancellation Tiers Table */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="bg-white p-10 md:p-14 rounded-3xl border border-gray-50 shadow-sm mb-12">
                        <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-6">
                            <div className="w-12 h-12 rounded-2xl bg-maroon-600/10 flex items-center justify-center text-maroon-600">
                                <Clock size={24} />
                            </div>
                            <h2 className="text-3xl font-display font-bold text-gray-900">Cancellation Schedule</h2>
                        </div>
                        <p className="text-gray-500 font-light text-lg leading-relaxed mb-10">
                            The following refund percentages apply based on when we receive your written cancellation notice relative to the tour start date.
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-100">
                                        <th className="text-left py-4 pr-4 text-sm font-black uppercase tracking-wider text-gray-400">Cancellation Period</th>
                                        <th className="text-center py-4 px-4 text-sm font-black uppercase tracking-wider text-gray-400">Refund</th>
                                        <th className="text-left py-4 pl-4 text-sm font-black uppercase tracking-wider text-gray-400 hidden md:table-cell">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cancellationTiers.map((tier, i) => (
                                        <tr key={i} className="border-b border-gray-50 last:border-b-0">
                                            <td className="py-5 pr-4 text-gray-900 font-medium">{tier.period}</td>
                                            <td className="py-5 px-4 text-center">
                                                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${
                                                    tier.refund === "0%"
                                                        ? "bg-red-50 text-red-600"
                                                        : tier.refund === "85%"
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-amber-50 text-amber-700"
                                                }`}>
                                                    {tier.refund}
                                                </span>
                                            </td>
                                            <td className="py-5 pl-4 text-gray-500 font-light hidden md:table-cell">{tier.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Detailed Sections */}
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
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">Need Help With a Refund?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                                <div className="space-y-3">
                                    <p className="font-medium text-gray-900">Refund Requests</p>
                                    <p className="font-light">Email: info@guideindiatours.com</p>
                                    <p className="font-light">Subject: Refund Request - [Booking Ref]</p>
                                </div>
                                <div className="space-y-3">
                                    <p className="font-medium text-gray-900">Customer Support</p>
                                    <p className="font-light">Phone: +91 89798 10991</p>
                                    <p className="font-light">Available 24 hours, 7 days a week</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
