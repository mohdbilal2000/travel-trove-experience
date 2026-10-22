import { Metadata } from 'next';
import { guideLangs } from '@/data/multilingualGuide';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schemaGenerator';
import { siteConfig } from '@/lib/siteConfig';
import {
    MapPin, Star, ArrowRight, ShieldCheck, Globe, Users, Check, Clock,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Agra Tour Guide | Government-Licensed Private Guides | Guide India Tours',
    description: 'Hire a government-licensed private tour guide in Agra for the Taj Mahal, Agra Fort & Fatehpur Sikri. Multilingual expert guides rated 4.9/5 by 400+ travelers. Book your Agra guide today.',
    keywords: ['agra tour guide', 'tour guide agra', 'best tour guide in agra', 'private tour guide agra', 'taj mahal tour guide', 'guide in agra', 'licensed tour guide agra'],
    alternates: {
        canonical: 'https://www.guideindiatours.com/agra-tour-guide',
        languages: {
            'en': 'https://www.guideindiatours.com/agra-tour-guide',
            'en-US': 'https://www.guideindiatours.com/agra-tour-guide',
            'en-GB': 'https://www.guideindiatours.com/agra-tour-guide',
            'en-IN': 'https://www.guideindiatours.com/agra-tour-guide',
            ...Object.fromEntries(guideLangs.map((l) => [l.hreflang ?? l.code, `https://www.guideindiatours.com/guide/${l.code}`])),
            'x-default': 'https://www.guideindiatours.com/agra-tour-guide',
        },
    },
    openGraph: {
        title: 'Agra Tour Guide | Government-Licensed Private Guides',
        description: 'Private, government-licensed tour guides in Agra for the Taj Mahal, Agra Fort & Fatehpur Sikri. Multilingual, rated 4.9/5 by 400+ travelers.',
        url: 'https://www.guideindiatours.com/agra-tour-guide',
        siteName: 'Guide India Tours',
        type: 'website',
        images: [{ url: 'https://www.guideindiatours.com/images/agra/getty-images-x83xvTdlITo-unsplash.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Agra Tour Guide | Government-Licensed Private Guides',
        description: 'Private, licensed, multilingual tour guides in Agra for the Taj Mahal and Mughal monuments. Rated 4.9/5 by 400+ travelers.',
    },
};

const faqs = [
    {
        question: 'How much does a private tour guide cost in Agra?',
        answer: 'A government-licensed private tour guide in Agra is included in our tour packages, which start from $30 per person. Standalone guide-only services can also be arranged — message us on WhatsApp at +91 89798 10991 for a custom quote based on your dates and group size.',
    },
    {
        question: 'Are your Agra tour guides government-licensed?',
        answer: 'Yes. Every guide is approved and licensed by India’s Ministry of Tourism, including our lead guide Avneesh Dixit. This ensures accurate historical commentary and a safe, professional experience at the Taj Mahal and across Agra.',
    },
    {
        question: 'Can I book a private guide just for the Taj Mahal?',
        answer: 'Absolutely. We offer private Taj Mahal guided visits, including early-morning sunrise tours, as well as full-day Agra tours covering Agra Fort and Fatehpur Sikri. Please note the Taj Mahal is closed every Friday.',
    },
    {
        question: 'What languages do your Agra guides speak?',
        answer: 'Our guides speak English and Hindi as standard, with German, French, Italian, and Spanish-speaking guides available on request, plus other languages by prior arrangement.',
    },
    {
        question: 'Is it safe to hire a private guide in Agra as a solo or female traveler?',
        answer: 'Yes. All tours are private, with a licensed guide and professional chauffeur in a dedicated vehicle throughout. We regularly host solo and female travelers and can tailor the pace and itinerary to your comfort.',
    },
];

export default function AgraTourGuidePage() {
    const faqSchema = generateFAQSchema(faqs);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.guideindiatours.com' },
        { name: 'Agra Tour Guide', url: 'https://www.guideindiatours.com/agra-tour-guide' },
    ]);

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://www.guideindiatours.com/agra-tour-guide#service',
        'name': 'Private Tour Guide in Agra',
        'serviceType': 'Licensed private tour guide',
        'description': 'Government-licensed, multilingual private tour guides in Agra for the Taj Mahal, Agra Fort and Fatehpur Sikri.',
        'provider': { '@id': 'https://www.guideindiatours.com/#organization' },
        'areaServed': { '@type': 'City', 'name': 'Agra' },
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': siteConfig.rating.value,
            'reviewCount': siteConfig.rating.count,
            'bestRating': '5',
        },
        'offers': {
            '@type': 'Offer',
            'priceCurrency': 'USD',
            'price': '30',
            'availability': 'https://schema.org/InStock',
            'url': 'https://www.guideindiatours.com/guide-booking',
        },
    };

    const features = [
        { icon: ShieldCheck, title: 'Ministry of Tourism Licensed', text: 'Every guide is government-approved and officially licensed.' },
        { icon: Globe, title: 'Speaks 6 Languages', text: 'English, Hindi, German, French, Italian & Spanish.' },
        { icon: Star, title: '4.9/5 on Google', text: `Rated by ${siteConfig.rating.count}+ verified travelers.` },
        { icon: Clock, title: 'Since 2004', text: 'Two decades sharing Agra’s Mughal heritage.' },
    ];

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

            {/* Hero */}
            <section className="relative h-[55vh] sm:h-[60vh] md:h-[70vh] overflow-hidden bg-black">
                <Image
                    src="/images/agra/getty-images-x83xvTdlITo-unsplash.jpg"
                    alt="Private licensed tour guide at the Taj Mahal, Agra"
                    fill
                    className="object-cover opacity-70"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-16 md:pb-24">
                        <div className="max-w-4xl">
                            <Breadcrumbs items={[{ label: 'Agra Tour Guide' }]} className="mb-6 text-white/80" />
                            <Badge className="bg-gold-500 text-black border-none px-4 py-1.5 font-black uppercase tracking-widest text-xs mb-6">
                                <MapPin className="w-3 h-3 mr-1.5" /> Agra, India
                            </Badge>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-[1.0] md:leading-[0.9] tracking-tight">
                                Agra Tour <span className="text-gold-500">Guide</span>
                            </h1>
                            <p className="text-xl text-white/80 font-light max-w-2xl mb-8">
                                Government-licensed, multilingual private guides for the Taj Mahal, Agra Fort and Fatehpur Sikri — led by Avneesh Dixit.
                            </p>
                            <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
                                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-gold-500 fill-current" /> 4.9/5 on Google</span>
                                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Licensed Guides</span>
                                <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 400+ Happy Travelers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Direct Answer (snippet-optimized) */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <p className="text-lg text-gray-600 font-light leading-relaxed">
                        A <strong className="text-gray-900">private Agra tour guide</strong> from Guide India Tours is a government-licensed, multilingual expert who accompanies you through the Taj Mahal, Agra Fort, and Fatehpur Sikri with accurate history and insider access. Rated <strong>4.9/5 by 400+ travelers on Google</strong>, our guides — led by <Link href="/about/avneesh-dixit" className="text-maroon-600 font-semibold hover:underline">Avneesh Dixit</Link> — have shared Agra&apos;s Mughal heritage since 2004. Private tours with a dedicated guide and chauffeur start from <strong>$30 per person</strong>. The Taj Mahal is closed on Fridays.
                    </p>
                </div>
            </section>

            {/* Why our guides */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-4xl font-display font-bold text-gray-900">Why Our <span className="text-maroon-600">Agra Guides</span></h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                    <div className="w-11 h-11 rounded-2xl bg-maroon-600/10 flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-maroon-600" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">{f.title}</h3>
                                    <p className="text-sm text-gray-500 font-light mt-1">{f.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* What a private guide covers */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-4xl font-display font-bold text-gray-900">What Your <span className="text-maroon-600">Guide</span> Shows You</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'Taj Mahal — skip-the-chaos entry, best photo spots & the real history behind the monument',
                            'Agra Fort — the UNESCO-listed Mughal stronghold and royal palaces',
                            'Fatehpur Sikri — the abandoned Mughal capital (optional add-on)',
                            'Sunrise Taj Mahal visits for the softest light and smallest crowds',
                            'Mehtab Bagh — the sunset garden view across the Yamuna',
                            'Marble inlay & local artisan workshops with trusted vendors',
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100">
                                <Check className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-600 font-light">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Book a Licensed Agra Guide</h2>
                    <p className="text-gray-500 font-light mb-8 max-w-2xl mx-auto">Tell us your dates and interests — we&apos;ll match you with the right guide and build a private itinerary around you.</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/guide-booking">
                            <Button className="rounded-full px-8 py-6 font-bold text-sm uppercase tracking-widest bg-maroon-600 hover:bg-maroon-700 text-white">
                                Book a Guide <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/agra-tours">
                            <Button variant="outline" className="rounded-full px-8 py-6 font-bold text-sm uppercase tracking-widest">
                                See Agra Tours
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-4xl font-display font-bold text-gray-900">Agra Guide <span className="text-maroon-600">FAQ</span></h2>
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

            {/* Multilingual + cost links */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <p className="text-gray-500 font-light mb-4">
                        Prefer a guide in your language? We also offer <Link href="/golden-triangle-tour-cost" className="text-maroon-600 font-semibold hover:underline">transparent pricing</Link> and guides who speak:
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {guideLangs.map((l) => ({ href: `/guide/${l.code}`, label: l.label })).map((l) => (
                            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full bg-ivory-100 border border-gray-200 hover:border-maroon-600/40 hover:bg-maroon-50/30 transition-colors text-sm font-semibold text-gray-700">
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cross-links */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display font-bold mb-12 text-center">Explore More of <span className="text-gold-500">Agra</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <Link href="/agra-tours" className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">Agra Tours</h3>
                            <p className="text-white/60 text-sm">Taj Mahal day trips & packages</p>
                        </Link>
                        <Link href="/taj-mahal-opening-hours" className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">Taj Mahal Timings</h3>
                            <p className="text-white/60 text-sm">Hours, Friday closure & tickets</p>
                        </Link>
                        <Link href="/about/avneesh-dixit" className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">Meet Avneesh Dixit</h3>
                            <p className="text-white/60 text-sm">Our licensed lead guide</p>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
