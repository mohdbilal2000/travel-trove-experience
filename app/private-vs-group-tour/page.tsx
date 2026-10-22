import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schemaGenerator';
import { siteConfig } from '@/lib/siteConfig';
import { Check, X, ArrowRight, Scale } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Private vs Group Tour in India — Which Is Worth It? (2026)',
    description: 'Private vs group Golden Triangle tour: an honest comparison of cost, flexibility, pace and privacy — plus why booking direct beats Viator or GetYourGuide. Private tours from $49/person.',
    keywords: ['private vs group tour india', 'is a private tour worth it india', 'golden triangle private or group', 'book direct vs viator', 'getyourguide vs direct booking india'],
    alternates: {
        canonical: 'https://www.guideindiatours.com/private-vs-group-tour',
        languages: {
            'en': 'https://www.guideindiatours.com/private-vs-group-tour',
            'en-US': 'https://www.guideindiatours.com/private-vs-group-tour',
            'en-GB': 'https://www.guideindiatours.com/private-vs-group-tour',
            'en-IN': 'https://www.guideindiatours.com/private-vs-group-tour',
            'x-default': 'https://www.guideindiatours.com/private-vs-group-tour',
        },
    },
    openGraph: {
        title: 'Private vs Group Tour in India — Which Is Worth It?',
        description: 'Honest comparison of private vs group Golden Triangle tours, and why booking direct beats OTAs like Viator and GetYourGuide.',
        url: 'https://www.guideindiatours.com/private-vs-group-tour',
        siteName: 'Guide India Tours',
        type: 'article',
        images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Private vs Group Tour in India (2026)',
        description: 'Cost, flexibility, pace and privacy compared — plus direct booking vs Viator/GetYourGuide.',
    },
};

const rows = [
    { feature: 'Itinerary', priv: 'Fully customizable to you', group: 'Fixed, same for everyone' },
    { feature: 'Pace', priv: 'Your speed — linger or skip', group: 'Set by the group & schedule' },
    { feature: 'Pickup', priv: 'Private hotel pickup & drop', group: 'Fixed meeting point' },
    { feature: 'Guide attention', priv: '100% on you & your group', group: 'Shared with 10–40 people' },
    { feature: 'Vehicle', priv: 'Private AC car', group: 'Shared coach/van' },
    { feature: 'Starting price', priv: 'From $49 / person', group: 'Often cheaper headline, less value' },
    { feature: 'Best for', priv: 'Couples, families, first-timers', group: 'Solo budget travelers who don’t mind crowds' },
];

const faqs = [
    { question: 'Is a private tour worth it in India?', answer: 'For most travelers, yes. A private Golden Triangle tour gives you a flexible itinerary, private AC transport, hotel pickup, and a guide focused only on your group — for a same-day Agra tour that starts from just $49 per person. Group tours can have a lower headline price but mean fixed schedules, shared guides and crowded coaches.' },
    { question: 'Is it cheaper to book direct or through Viator / GetYourGuide?', answer: 'Booking directly with the operator is usually better value. Marketplaces like Viator and GetYourGuide add a commission (often 20–30%) on top of the operator’s price. Booking direct with Guide India Tours removes that markup, puts you in touch with the team that actually runs the tour, and keeps your itinerary fully customizable.' },
    { question: 'Are private tours safe for solo and female travelers?', answer: 'Yes. A private tour means a licensed guide and professional chauffeur dedicated to you throughout, which many solo and female travelers find safer and more comfortable than large group tours.' },
    { question: 'How much does a private Golden Triangle tour cost?', answer: 'Private Golden Triangle packages start from $199 per person for 3 days; single-city day tours start from $49 per person. See the full breakdown on our tour cost guide.' },
];

export default function PrivateVsGroupPage() {
    const faqSchema = generateFAQSchema(faqs);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.guideindiatours.com' },
        { name: 'Private vs Group Tour', url: 'https://www.guideindiatours.com/private-vs-group-tour' },
    ]);

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Hero */}
            <section className="bg-gray-900 text-white py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Breadcrumbs items={[{ label: 'Private vs Group Tour' }]} className="mb-6 text-white/70" />
                    <Badge className="bg-gold-500 text-black border-none px-4 py-1.5 font-black uppercase tracking-widest text-xs mb-6">
                        <Scale className="w-3 h-3 mr-1.5" /> Honest Comparison
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-5 leading-tight">
                        Private vs Group Tour in India — <span className="text-gold-500">Which Is Worth It?</span>
                    </h1>
                    <p className="text-lg text-white/70 font-light max-w-2xl">
                        Cost, flexibility, pace and privacy compared — plus why booking direct beats Viator and GetYourGuide.
                    </p>
                </div>
            </section>

            {/* Direct answer */}
            <section className="py-14 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <p className="text-lg text-gray-600 font-light leading-relaxed">
                        A <strong className="text-gray-900">private tour</strong> is worth it for most travelers visiting the Golden Triangle: you get a fully customizable itinerary, a private AC car, hotel pickup and a guide focused only on your group — starting from <strong>$49 per person</strong> for a same-day Agra tour. <strong>Group tours</strong> can look cheaper up front but mean fixed schedules, shared guides and crowded coaches. And booking <strong>direct</strong> (not via Viator or GetYourGuide) avoids the 20–30% marketplace commission. Guide India Tours is rated 4.9/5 by {siteConfig.rating.count}+ travelers on Google.
                    </p>
                </div>
            </section>

            {/* Comparison table */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Private vs Group — <span className="text-maroon-600">Side by Side</span></h2>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-3xl p-4 sm:p-6 overflow-x-auto shadow-sm">
                        <table className="w-full text-left min-w-[520px]">
                            <thead>
                                <tr className="border-b border-gray-100 text-[11px] sm:text-xs font-black uppercase tracking-widest text-gray-400">
                                    <th className="py-3 pr-4">&nbsp;</th>
                                    <th className="py-3 pr-4 text-maroon-600">Private Tour</th>
                                    <th className="py-3">Group Tour</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r) => (
                                    <tr key={r.feature} className="border-b border-gray-50 align-top">
                                        <td className="py-4 pr-4 font-bold text-gray-900">{r.feature}</td>
                                        <td className="py-4 pr-4 text-sm text-gray-700"><span className="inline-flex items-start gap-1.5"><Check className="w-4 h-4 text-maroon-600 flex-shrink-0 mt-0.5" />{r.priv}</span></td>
                                        <td className="py-4 text-sm text-gray-500"><span className="inline-flex items-start gap-1.5"><X className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />{r.group}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Direct vs OTA */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Booking Direct vs <span className="text-maroon-600">Viator / GetYourGuide</span></h2>
                    </div>
                    <p className="text-gray-600 font-light leading-relaxed mb-6">
                        Marketplaces are convenient, but they charge the operator a commission that is built into the price you pay — often 20–30%. When you book directly with Guide India Tours you get the same private tour, run by the same team, usually at a better price, plus:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['No third-party markup — better value', 'Direct WhatsApp line to the team that runs your tour', 'Fully customizable itinerary (not a fixed package)', 'Flexible changes and honest, local advice'].map((item) => (
                            <div key={item} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100"><Check className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 font-light">{item}</span></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">FAQ</h2>
                    </div>
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-ivory-100 p-8 rounded-3xl border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                                <p className="text-gray-500 font-light leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-black text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-2xl md:text-4xl font-display font-bold mb-4">Get a private tour quote — direct</h2>
                    <p className="text-white/70 font-light mb-8">No fixed packages, no marketplace markup. Tell us your dates and we&apos;ll send an honest quote on WhatsApp.</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/contact"><Button className="rounded-full px-8 py-6 font-bold text-sm uppercase tracking-widest bg-gold-500 hover:bg-white text-black">Get a Free Quote <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
                        <Link href="/golden-triangle-tour-cost"><Button variant="outline" className="rounded-full px-8 py-6 font-bold text-sm uppercase tracking-widest border-white/30 text-white hover:bg-white/10">See Pricing</Button></Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
