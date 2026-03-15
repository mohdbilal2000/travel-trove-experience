import { Metadata } from 'next';
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Shield, Eye, Cookie, Globe, Lock, UserCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
    title: 'Privacy Policy | Guide India Tours',
    description: 'Learn how Guide India Tours collects, uses, and protects your personal information. Our privacy policy covers data handling for tour bookings, communications, and website usage.',
    alternates: {
        canonical: 'https://guideindiatours.com/privacy-policy',
        languages: {
            'en-US': 'https://guideindiatours.com/privacy-policy',
            'en-GB': 'https://guideindiatours.com/privacy-policy',
            'en-AU': 'https://guideindiatours.com/privacy-policy',
            'x-default': 'https://guideindiatours.com/privacy-policy',
        },
    },
};

const sections = [
    {
        id: "information-we-collect",
        icon: Eye,
        title: "Information We Collect",
        content: [
            {
                subtitle: "Personal Information",
                text: "When you book a tour, submit an inquiry, or contact us, we may collect your full name, email address, phone number, nationality, passport details (for tour arrangements), travel dates, accommodation preferences, and any special requirements or dietary needs you share with us."
            },
            {
                subtitle: "Automatically Collected Information",
                text: "When you visit our website, we automatically collect certain technical information including your IP address, browser type and version, device type, operating system, referring URLs, pages visited, time spent on pages, and your general geographic location derived from your IP address."
            },
            {
                subtitle: "Booking & Payment Information",
                text: "When you make a booking, we collect transaction-related details such as your billing address, payment method type, and the last four digits of your card number. Full payment card details are processed securely by our third-party payment processors and are never stored on our servers."
            }
        ]
    },
    {
        id: "how-we-use-it",
        icon: Shield,
        title: "How We Use Your Information",
        content: [
            {
                subtitle: "Tour Services & Operations",
                text: "We use your personal information to process and confirm tour bookings, arrange accommodations and transportation, coordinate with local guides and service providers, communicate itinerary details, handle special requests, and provide customer support before, during, and after your trip."
            },
            {
                subtitle: "Communications",
                text: "With your consent, we may send you promotional offers, travel inspiration, seasonal deals, and newsletters about our tour packages. You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly."
            },
            {
                subtitle: "Website Improvement",
                text: "We use aggregated and anonymized data to analyze website traffic patterns, improve our website performance and user experience, develop new tour packages based on traveler interests, and ensure our services meet the expectations of our guests."
            }
        ]
    },
    {
        id: "cookie-policy",
        icon: Cookie,
        title: "Cookie Policy",
        content: [
            {
                subtitle: "Essential Cookies",
                text: "These cookies are necessary for our website to function properly. They enable core features such as page navigation, secure access to booking forms, and session management. You cannot opt out of essential cookies as the website would not function without them."
            },
            {
                subtitle: "Analytics Cookies",
                text: "We use analytics tools such as Google Analytics to understand how visitors interact with our website. These cookies collect information in an aggregated, anonymous form, including the number of visitors, the pages they visit, and the sources of traffic. You can disable analytics cookies through your browser settings."
            },
            {
                subtitle: "Marketing Cookies",
                text: "With your consent, we may use marketing cookies to deliver relevant advertisements and measure the effectiveness of our advertising campaigns. These cookies track your browsing activity across websites and are used by third-party advertising platforms."
            }
        ]
    },
    {
        id: "third-party-services",
        icon: Globe,
        title: "Third-Party Services",
        content: [
            {
                subtitle: "Service Providers",
                text: "We share necessary information with trusted third-party partners who assist in delivering our tour services, including hotel chains, transportation providers, licensed local guides, restaurant partners, and monument ticket booking platforms. These partners are contractually obligated to protect your data."
            },
            {
                subtitle: "Payment Processors",
                text: "All online payments are processed through PCI-DSS compliant third-party payment gateways. We do not store, process, or have access to your full credit card or debit card numbers. Payment processors we work with maintain the highest industry standards for data security."
            },
            {
                subtitle: "Analytics & Marketing Platforms",
                text: "We may share anonymized, aggregated data with analytics platforms such as Google Analytics and advertising partners to improve our marketing efforts. No personally identifiable information is shared for these purposes without your explicit consent."
            }
        ]
    },
    {
        id: "data-security",
        icon: Lock,
        title: "Data Security",
        content: [
            {
                subtitle: "Security Measures",
                text: "We implement industry-standard security measures to protect your personal information, including SSL/TLS encryption for all data transmitted between your browser and our servers, encrypted database storage for sensitive personal data, regular security audits and vulnerability assessments, access controls limiting employee access to personal data on a need-to-know basis, and secure backup procedures."
            },
            {
                subtitle: "Data Retention",
                text: "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including satisfying legal, accounting, or reporting requirements. Booking records are typically retained for a period of seven years for compliance with Indian tax and legal regulations. You may request earlier deletion of your data subject to applicable legal obligations."
            }
        ]
    },
    {
        id: "your-rights",
        icon: UserCheck,
        title: "Your Rights",
        content: [
            {
                subtitle: "Access & Correction",
                text: "You have the right to request access to the personal information we hold about you and to request corrections to any inaccurate or incomplete data. We will respond to such requests within 30 days."
            },
            {
                subtitle: "Deletion & Portability",
                text: "You may request the deletion of your personal data, subject to our legal obligations to retain certain information. You also have the right to receive a copy of your personal data in a structured, commonly used, and machine-readable format."
            },
            {
                subtitle: "Consent Withdrawal",
                text: "Where we rely on your consent to process personal data, you have the right to withdraw that consent at any time. This will not affect the lawfulness of processing carried out before the withdrawal. To exercise any of these rights, please contact us using the details provided below."
            }
        ]
    },
    {
        id: "contact-us",
        icon: Mail,
        title: "Contact Us",
        content: [
            {
                subtitle: "Privacy Inquiries",
                text: "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please do not hesitate to contact us. We are committed to resolving any privacy-related issues promptly and transparently."
            }
        ]
    }
];

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-ivory-100 min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-44 pb-24 bg-white border-b border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-maroon-600/5 rounded-bl-full translate-x-1/2 -translate-y-12" />
                <div className="container mx-auto px-4 relative z-10">
                    <Breadcrumbs items={[{ label: 'Privacy Policy' }]} className="mb-12" />
                    <div className="max-w-3xl">
                        <span className="inline-block bg-maroon-600/10 text-maroon-600 px-6 py-2 uppercase tracking-[0.3em] text-[10px] font-black rounded-full mb-8">
                            Legal
                        </span>
                        <h1 className="text-6xl md:text-8xl font-display font-bold text-gray-900 mb-8 leading-tight tracking-tighter">
                            Privacy <span className="text-maroon-600">Policy.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed">
                            Your privacy matters to us. This policy explains how Guide India Tours collects, uses, and safeguards your personal information when you use our website and services.
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
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">Guide India Tours</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                                <div className="space-y-3">
                                    <p className="font-medium text-gray-900">Registered Office</p>
                                    <p className="font-light">Agra, Uttar Pradesh, India</p>
                                </div>
                                <div className="space-y-3">
                                    <p className="font-medium text-gray-900">Contact Details</p>
                                    <p className="font-light">Email: info@guideindiatours.com</p>
                                    <p className="font-light">Phone: +91 89798 10991</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
