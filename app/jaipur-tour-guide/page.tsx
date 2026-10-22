import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schemaGenerator';
import { siteConfig } from '@/lib/siteConfig';
import { MapPin, Star, ArrowRight, ShieldCheck, Globe, Users, Check, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Jaipur Tour Guide | Government-Licensed Private Guides | Guide India Tours',
    description: 'Hire a government-licensed private tour guide in Jaipur for Amber Fort, City Palace, Hawa Mahal & Jantar Mantar. Multilingual expert guides rated 4.9/5 by 400+ travelers.',
    keywords: ['jaipur tour guide', 'tour guide jaipur', 'best tour guide in jaipur', 'private tour guide jaipur', 'pink city guide', 'amber fort guide'],
    alternates: {
        canonical: 'https://www.guideindiatours.com/jaipur-tour-guide',
        languages: {
            'en': 'https://www.guideindiatours.com/jaipur-tour-guide',
            'en-US': 'https://www.guideindiatours.com/jaipur-tour-guide',
            'en-GB': 'https://www.guideindiatours.com/jaipur-tour-guide',
            'en-IN': 'https://www.guideindiatours.com/jaipur-tour-guide',
            'x-default': 'https://www.guideindiatours.com/jaipur-tour-guide',
        },
    },
    openGraph: {
        title: 'Jaipur Tour Guide | Government-Licensed Private Guides',
        description: 'Private, government-licensed tour guides in Jaipur for Amber Fort, City Palace & Hawa Mahal. Multilingual, rated 4.9/5 by 400+ travelers.',
        url: 'https://www.guideindiatours.com/jaipur-tour-guide',
        siteName: 'Guide India Tours',
        type: 'website',
        images: [{ url: 'https://www.guideindiatours.com/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Jaipur Tour Guide | Government-Licensed Private Guides',
        description: 'Private, licensed, multilingual tour guides in Jaipur’s Pink City. Rated 4.9/5 by 400+ travelers.',
    },
};

const faqs = [
    { question: 'How much does a private tour guide cost in Jaipur?', answer: 'A government-licensed private tour guide in Jaipur is included in our tour packages, which start from $59 per person for a full day. Standalone guide-only services can be arranged — message us on WhatsApp at +91 89798 10991 for a custom quote.' },
    { question: 'Are your Jaipur tour guides government-licensed?', answer: 'Yes. Every guide is approved and licensed by India’s Ministry of Tourism, ensuring accurate history of Amber Fort, the City Palace and the Pink City, and a safe, professional experience.' },
    { question: 'What does a Jaipur guide show you?', answer: 'A full-day private tour covers Amber Fort, the City Palace, Hawa Mahal (Palace of Winds), Jantar Mantar observatory, and optional stops like Nahargarh Fort, Jal Mahal and the bazaars for textiles and jewellery.' },
    { question: 'What languages do your Jaipur guides speak?', answer: 'English and Hindi as standard, with French, German, Italian and Spanish guides available on request, and Japanese or Mandarin arranged by prior arrangement.' },
];

export default function JaipurTourGuidePage() {
    const faqSchema = generateFAQSchema(faqs);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.guideindiatours.com' },
        { name: 'Jaipur Tour Guide', url: 'https://www.guideindiatours.com/jaipur-tour-guide' },
    ]);
    const serviceSchema = {
        '@context': 'https://schema.org', '@type': 'Service',
        '@id': 'https://www.guideindiatours.com/jaipur-tour-guide#service',
        'name': 'Private Tour Guide in Jaipur', 'serviceType': 'Licensed private tour guide',
        'description': 'Government-licensed, multilingual private tour guides in Jaipur for Amber Fort, City Palace, Hawa Mahal and Jantar Mantar.',
        'provider': { '@id': 'https://www.guideindiatours.com/#organization' },
        'areaServed': { '@type': 'City', 'name': 'Jaipur' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': siteConfig.rating.value, 'reviewCount': siteConfig.rating.count, 'bestRating': '5' },
        'offers': { '@type': 'Offer', 'priceCurrency': 'USD', 'price': '59', 'availability': 'https://schema.org/InStock', 'url': 'https://www.guideindiatours.com/guide-booking' },
    };
    const features = [
        { icon: ShieldCheck, title: 'Ministry of Tourism Licensed', text: 'Every guide is government-approved and officially licensed.' },
        { icon: Globe, title: 'Multilingual Guides', text: 'English, Hindi, French, German, Italian & Spanish.' },
        { icon: Star, title: '4.9/5 on Google', text: `Rated by ${siteConfig.rating.count}+ verified travelers.` },
        { icon: Clock, title: 'Since 2004', text: 'Two decades across Rajasthan’s Pink City.' },
    ];

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

            <section className="relative h-[55vh] sm:h-[60vh] md:h-[70vh] overflow-hidden bg-black">
                <Image src="/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg" alt="Private licensed tour guide in Jaipur, Rajasthan" fill className="object-cover opacity-70" priority sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-16 md:pb-24">
                        <div className="max-w-4xl">
                            <Breadcrumbs items={[{ label: 'Jaipur Tour Guide' }]} className="mb-6 text-white/80" />
                            <Badge className="bg-gold-500 text-black border-none px-4 py-1.5 font-black uppercase tracking-widest text-xs mb-6">
                                <MapPin className="w-3 h-3 mr-1.5" /> Jaipur, India
                            </Badge>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-[1.0] md:leading-[0.9] tracking-tight">
                                Jaipur Tour <span className="text-gold-500">Guide</span>
                            </h1>
                            <p className="text-xl text-white/80 font-light max-w-2xl mb-8">
                                Government-licensed, multilingual private guides for Amber Fort, the City Palace, Hawa Mahal and the Pink City.
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

            <section className="py-16 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <p className="text-lg text-gray-600 font-light leading-relaxed">
                        A <strong className="text-gray-900">private Jaipur tour guide</strong> from Guide India Tours is a government-licensed, multilingual expert who walks you through Amber Fort, the City Palace, Hawa Mahal and Jantar Mantar with real history and insider access. Rated <strong>4.9/5 by 400+ travelers on Google</strong>, our guides — led by <Link href="/about/avneesh-dixit" className="text-maroon-600 font-semibold hover:underline">Avneesh Dixit</Link> — have shared Rajasthan&apos;s royal heritage since 2004. Private full-day tours start from <strong>$59 per person</strong>.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-4xl font-display font-bold text-gray-900">Why Our <span className="text-maroon-600">Jaipur Guides</span></h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                    <div className="w-11 h-11 rounded-2xl bg-maroon-600/10 flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-maroon-600" /></div>
                                    <h3 className="font-bold text-gray-900">{f.title}</h3>
                                    <p className="text-sm text-gray-500 font-light mt-1">{f.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-4xl font-display font-bold text-gray-900">What Your <span className="text-maroon-600">Guide</span> Shows You</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Amber Fort — hilltop palace with optional jeep ride', 'City Palace — royal courtyards & museums', 'Hawa Mahal — the iconic Palace of Winds', 'Jantar Mantar — UNESCO astronomical observatory', 'Nahargarh & Jal Mahal — views and the lake palace', 'Bazaars — textiles, gemstones & handicrafts with trusted vendors'].map((item) => (
                            <div key={item} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100"><Check className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 font-light">{item}</span></div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Book a Licensed Jaipur Guide</h2>
                    <p className="text-gray-500 font-light mb-8 max-w-2xl mx-auto">Tell us your dates and interests — we&apos;ll match you with the right guide and build a private itinerary around you.</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/guide-booking"><Button className="rounded-full px-8 py-6 font-bold text-sm uppercase tracking-widest bg-maroon-600 hover:bg-maroon-700 text-white">Book a Guide <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
                        <Link href="/jaipur-tours"><Button variant="outline" className="rounded-full px-8 py-6 font-bold text-sm uppercase tracking-widest">See Jaipur Tours</Button></Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-4xl font-display font-bold text-gray-900">Jaipur Guide <span className="text-maroon-600">FAQ</span></h2>
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

            <section className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display font-bold mb-12 text-center">Explore the <span className="text-gold-500">Golden Triangle</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <Link href="/agra-tour-guide" className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-center"><h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">Agra Tour Guide</h3><p className="text-white/60 text-sm">Taj Mahal & Mughal Agra</p></Link>
                        <Link href="/delhi-tour-guide" className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-center"><h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">Delhi Tour Guide</h3><p className="text-white/60 text-sm">Old & New Delhi</p></Link>
                        <Link href="/jaipur-tours" className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-center"><h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">Jaipur Tours</h3><p className="text-white/60 text-sm">Pink City packages</p></Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
