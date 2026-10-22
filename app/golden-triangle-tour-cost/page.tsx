import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schemaGenerator';
import { siteConfig } from '@/lib/siteConfig';
import { MapPin, ArrowRight, Check, Wallet, Star } from 'lucide-react';

export const metadata: Metadata = {
    title: 'How Much Does a Golden Triangle Tour Cost? 2026 Prices from $49',
    description: 'Golden Triangle tour cost in 2026: private Agra day tours start from $49 per person and multi-day Delhi-Agra-Jaipur packages from $199. See what affects the price and what is included.',
    keywords: ['golden triangle tour cost', 'how much does a golden triangle tour cost', 'agra tour price', 'taj mahal tour cost', 'india private tour price', 'golden triangle package price'],
    alternates: {
        canonical: 'https://www.guideindiatours.com/golden-triangle-tour-cost',
        languages: {
            'en': 'https://www.guideindiatours.com/golden-triangle-tour-cost',
            'en-US': 'https://www.guideindiatours.com/golden-triangle-tour-cost',
            'en-GB': 'https://www.guideindiatours.com/golden-triangle-tour-cost',
            'en-IN': 'https://www.guideindiatours.com/golden-triangle-tour-cost',
            'x-default': 'https://www.guideindiatours.com/golden-triangle-tour-cost',
        },
    },
    openGraph: {
        title: 'How Much Does a Golden Triangle Tour Cost? (2026)',
        description: 'Private Agra day tours from $49 per person; multi-day Golden Triangle packages from $199. What is included and what changes the price.',
        url: 'https://www.guideindiatours.com/golden-triangle-tour-cost',
        siteName: 'Guide India Tours',
        type: 'article',
        images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Golden Triangle Tour Cost 2026 — from $49',
        description: 'Private India tour prices: Agra day tours from $49/person, multi-day packages from $199. What is included.',
    },
};

const priceTable = [
    { tour: 'Same-Day Agra Tour (Taj Mahal + Agra Fort)', from: '$49', note: 'per person · from Delhi or Agra' },
    { tour: 'Taj Mahal Sunrise Private Tour', from: '$55', note: 'per person' },
    { tour: 'Delhi Full-Day Private City Tour', from: '$55', note: 'per person' },
    { tour: 'Jaipur Full-Day Private Tour', from: '$59', note: 'per person' },
    { tour: '3-Day Golden Triangle (Delhi · Agra · Jaipur)', from: '$199', note: 'per person' },
    { tour: '5-Day Golden Triangle (comfort hotels)', from: '$349', note: 'per person' },
    { tour: '7-Day Golden Triangle + Udaipur / Varanasi', from: '$599', note: 'per person' },
    { tour: 'Private Licensed Guide (guide-only, per day)', from: '$35', note: 'per day' },
];

const faqs = [
    {
        question: 'How much does a Golden Triangle tour cost?',
        answer: 'A private Golden Triangle tour with Guide India Tours starts from $199 per person for a 3-day Delhi-Agra-Jaipur itinerary, and from $349 per person for a 5-day tour with comfort hotels. Single-city options are cheaper: a same-day Agra tour starts from $49 per person. Final pricing depends on your hotel category, group size and travel season.',
    },
    {
        question: 'How much is a private Agra / Taj Mahal tour?',
        answer: 'A same-day private Agra tour covering the Taj Mahal and Agra Fort starts from $49 per person, and a dedicated Taj Mahal sunrise tour from $55 per person. These include a private AC car, a government-licensed guide and all transfers; monument entry tickets can be added.',
    },
    {
        question: 'What is included in the price?',
        answer: 'All private tours include a private air-conditioned car with a professional chauffeur, a government-licensed English-speaking guide, hotel pickup and drop-off, and 24/7 WhatsApp support. Multi-day packages also include hotel stays and daily breakfast. Monument entry fees, lunches and tips are usually extra unless stated.',
    },
    {
        question: 'Why is the price shown as "starting from"?',
        answer: 'Every tour is private and fully customizable, so the final price depends on your chosen hotel category (3-star to 5-star luxury), the number of travelers (per-person cost drops for larger groups), the season, and any add-ons. The "from" price reflects a typical twin-share booking in the standard hotel tier.',
    },
    {
        question: 'Is it cheaper to book direct instead of Viator or GetYourGuide?',
        answer: 'Yes. Booking directly with Guide India Tours avoids the third-party marketplace commission (often 20-30%), so you get the same private tour and the team that actually runs it, usually at a better price. Message us on WhatsApp for a custom quote.',
    },
];

export default function TourCostPage() {
    const faqSchema = generateFAQSchema(faqs);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.guideindiatours.com' },
        { name: 'Golden Triangle Tour Cost', url: 'https://www.guideindiatours.com/golden-triangle-tour-cost' },
    ]);
    const offerSchema = {
        '@context': 'https://schema.org',
        '@type': 'AggregateOffer',
        '@id': 'https://www.guideindiatours.com/golden-triangle-tour-cost#offers',
        'name': 'Private Golden Triangle & India Tour Packages',
        'priceCurrency': 'USD',
        'lowPrice': '49',
        'highPrice': '599',
        'offerCount': priceTable.length.toString(),
        'availability': 'https://schema.org/InStock',
        'seller': { '@id': 'https://www.guideindiatours.com/#organization' },
        'url': 'https://www.guideindiatours.com/golden-triangle-tour-cost',
    };

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />

            {/* Hero */}
            <section className="relative h-[45vh] sm:h-[50vh] md:h-[60vh] overflow-hidden bg-black">
                <Image src="/images/agra/getty-images-x83xvTdlITo-unsplash.jpg" alt="Private Golden Triangle tour — Taj Mahal, Agra" fill className="object-cover opacity-60" priority sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-14 md:pb-20">
                        <div className="max-w-4xl">
                            <Breadcrumbs items={[{ label: 'Golden Triangle Tour Cost' }]} className="mb-6 text-white/80" />
                            <Badge className="bg-gold-500 text-black border-none px-4 py-1.5 font-black uppercase tracking-widest text-xs mb-6">
                                <Wallet className="w-3 h-3 mr-1.5" /> 2026 Pricing
                            </Badge>
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-5 leading-tight">
                                How Much Does a <span className="text-gold-500">Golden Triangle Tour</span> Cost?
                            </h1>
                            <p className="text-lg text-white/80 font-light max-w-2xl">
                                Private tours from <strong className="text-white">$49 per person</strong> — here is an honest 2026 price breakdown and what changes the final number.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Direct answer */}
            <section className="py-14 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <p className="text-lg text-gray-600 font-light leading-relaxed">
                        A <strong className="text-gray-900">private Golden Triangle tour</strong> with Guide India Tours starts from <strong>$199 per person</strong> for a 3-day Delhi-Agra-Jaipur itinerary and from <strong>$349 per person</strong> for a 5-day tour with comfort hotels. Prefer a single city? A <strong>same-day private Agra tour starts from $49 per person</strong>. Every tour is private and includes an AC car, a government-licensed guide and 24/7 support — rated 4.9/5 by {siteConfig.rating.count}+ travelers on Google. Final pricing depends on your hotel category, group size and season.
                    </p>
                </div>
            </section>

            {/* Price table */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">2026 Price <span className="text-maroon-600">Guide</span></h2>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-3xl p-4 sm:p-6 overflow-x-auto shadow-sm">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 text-[11px] sm:text-xs font-black uppercase tracking-widest text-gray-400">
                                    <th className="py-3 pr-4">Tour</th>
                                    <th className="py-3 pr-4 whitespace-nowrap">Starting From</th>
                                    <th className="py-3 hidden sm:table-cell">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {priceTable.map((row) => (
                                    <tr key={row.tour} className="border-b border-gray-50">
                                        <td className="py-4 pr-4 font-semibold text-gray-900">{row.tour}</td>
                                        <td className="py-4 pr-4 text-xl font-black text-maroon-600 whitespace-nowrap">{row.from}</td>
                                        <td className="py-4 text-sm text-gray-500 font-light hidden sm:table-cell">{row.note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-gray-400 mt-4 italic">All prices are &ldquo;starting from&rdquo; per person (twin-share, standard hotel tier). Every tour is private and fully customizable — <Link href="/contact" className="text-maroon-600 hover:underline font-semibold">request a custom quote</Link> for your exact dates and group.</p>
                </div>
            </section>

            {/* What affects price */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">What Changes the <span className="text-maroon-600">Price</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'Hotel category — 3-star to 5-star luxury (the biggest factor)',
                            'Group size — per-person cost drops as your group grows',
                            'Season — October–March peak costs more than monsoon months',
                            'Trip length & cities — extra days, Udaipur or Varanasi add-ons',
                            'Vehicle class — sedan, SUV or luxury van',
                            'Add-ons — monument tickets, sunrise entry, experiences & meals',
                        ].map((item) => (
                            <div key={item} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100">
                                <Check className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-600 font-light">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Cost <span className="text-maroon-600">FAQ</span></h2>
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
                    <div className="flex items-center justify-center gap-2 mb-4 text-gold-500">
                        {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        <span className="text-white/70 text-sm ml-2">4.9/5 · {siteConfig.rating.count}+ Google reviews</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-display font-bold mb-4">Get your exact price in ~2 minutes</h2>
                    <p className="text-white/70 font-light mb-8">No fixed packages — tell us your dates, hotel preference and group, and we&apos;ll send an honest quote on WhatsApp.</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/contact"><Button className="rounded-full px-8 py-6 font-bold text-sm uppercase tracking-widest bg-gold-500 hover:bg-white text-black">Get a Free Quote <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
                        <Link href="/plans"><Button variant="outline" className="rounded-full px-8 py-6 font-bold text-sm uppercase tracking-widest border-white/30 text-white hover:bg-white/10">Browse Tours</Button></Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
