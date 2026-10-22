import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schemaGenerator';
import { siteConfig } from '@/lib/siteConfig';
import { guideLangs, getGuideLang } from '@/data/multilingualGuide';
import { MapPin, Star, ArrowRight, ShieldCheck, Check } from 'lucide-react';

const BASE = 'https://www.guideindiatours.com';
const EN_URL = `${BASE}/agra-tour-guide`;

type PageProps = { params: Promise<{ lang: string }> };

export async function generateStaticParams() {
    return guideLangs.map((l) => ({ lang: l.code }));
}

// hreflang map shared by every language page: all languages + English + x-default.
const hreflangLanguages: Record<string, string> = {
    ...Object.fromEntries(guideLangs.map((l) => [l.hreflang ?? l.code, `${BASE}/guide/${l.code}`])),
    en: EN_URL,
    'x-default': EN_URL,
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const g = getGuideLang(lang);
    if (!g) return {};
    const url = `${BASE}/guide/${g.code}`;
    return {
        title: g.title,
        description: g.description,
        alternates: { canonical: url, languages: hreflangLanguages },
        openGraph: {
            title: g.title,
            description: g.description,
            url,
            siteName: 'Guide India Tours',
            locale: g.htmlLang,
            type: 'website',
            images: [{ url: `${BASE}/images/agra/getty-images-x83xvTdlITo-unsplash.jpg`, width: 1200, height: 630 }],
        },
        twitter: { card: 'summary_large_image', title: g.title, description: g.description },
    };
}

export default async function MultilingualGuidePage({ params }: PageProps) {
    const { lang } = await params;
    const g = getGuideLang(lang);
    if (!g) notFound();

    const count = siteConfig.rating.count;
    const fill = (s: string) => s.replace(/\{count\}/g, count);

    const faqSchema = generateFAQSchema(g.faq.map((f) => ({ question: f.q, answer: fill(f.a) })));
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: BASE },
        { name: g.title, url: `${BASE}/guide/${g.code}` },
    ]);
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${BASE}/guide/${g.code}#service`,
        'name': g.title,
        'serviceType': 'Private tour guide',
        'inLanguage': g.htmlLang,
        'provider': { '@id': `${BASE}/#organization` },
        'areaServed': { '@type': 'City', 'name': 'Agra' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': siteConfig.rating.value, 'reviewCount': count, 'bestRating': '5' },
        'offers': { '@type': 'Offer', 'priceCurrency': 'USD', 'price': '49', 'availability': 'https://schema.org/InStock', 'url': `${BASE}/contact` },
    };

    const whatsappHref = siteConfig.whatsappHref;

    return (
        <main className="bg-ivory-100 min-h-screen" lang={g.htmlLang}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

            {/* Hero */}
            <section className="relative h-[50vh] sm:h-[55vh] md:h-[65vh] overflow-hidden bg-black">
                <Image src="/images/agra/getty-images-x83xvTdlITo-unsplash.jpg" alt={g.heroTitle} fill className="object-cover opacity-70" priority sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-14 md:pb-20">
                        <div className="max-w-4xl">
                            <Breadcrumbs items={[{ label: g.badge }]} className="mb-6 text-white/80" />
                            <Badge className="bg-gold-500 text-black border-none px-4 py-1.5 font-black uppercase tracking-widest text-xs mb-6">
                                <MapPin className="w-3 h-3 mr-1.5" /> {g.badge}
                            </Badge>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-5 leading-tight">
                                {g.heroTitle} <span className="text-gold-500">{g.heroHighlight}</span>
                            </h1>
                            <p className="text-lg text-white/80 font-light max-w-2xl mb-6">{g.heroSub}</p>
                            <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
                                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-gold-500 fill-current" /> {fill(g.ratingLabel)}</span>
                                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Ministry of Tourism licensed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Direct answer */}
            <section className="py-14 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <p className="text-lg text-gray-700 font-light leading-relaxed">{fill(g.directAnswer)}</p>
                </div>
            </section>

            {/* Included */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">{g.includedHeading}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {g.included.map((item) => (
                            <div key={item} className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100">
                                <Check className="w-5 h-5 text-maroon-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-600 font-light">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">{g.faqHeading}</h2>
                    </div>
                    <div className="space-y-6">
                        {g.faq.map((f, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{f.q}</h3>
                                <p className="text-gray-500 font-light leading-relaxed">{fill(f.a)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <h2 className="text-2xl md:text-4xl font-display font-bold text-gray-900 mb-4">{g.ctaHeading}</h2>
                    <p className="text-gray-500 font-light mb-8">{g.ctaText}</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                            <Button className="rounded-full px-8 py-6 font-bold text-sm uppercase tracking-widest bg-maroon-600 hover:bg-maroon-700 text-white">
                                <WhatsAppIcon className="w-4 h-4 mr-2" /> {g.ctaBtn}
                            </Button>
                        </a>
                        <Link href="/contact">
                            <Button variant="outline" className="rounded-full px-8 py-6 font-bold text-sm uppercase tracking-widest">
                                {g.altBtn} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Language switcher (internal links + hreflang reinforcement) */}
            <section className="py-10 bg-gray-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-4">Other languages</p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link href="/agra-tour-guide" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm">English</Link>
                        {guideLangs.map((l) => (
                            <Link
                                key={l.code}
                                href={`/guide/${l.code}`}
                                className={`px-4 py-2 rounded-full border text-sm transition-colors ${l.code === g.code ? 'bg-gold-500 text-black border-gold-500 font-bold' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
