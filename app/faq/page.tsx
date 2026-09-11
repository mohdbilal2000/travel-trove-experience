import { Metadata } from 'next';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, ArrowRight, BookOpen, Search } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { faqCategories, allFaqs, FAQ_LAST_UPDATED } from "@/data/faqs";

const BASE_URL = 'https://www.guideindiatours.com';
const PAGE_URL = `${BASE_URL}/faq`;

export const metadata: Metadata = {
    title: 'India Travel FAQ: Golden Triangle Questions Answered | Guide India Tours',
    description: 'Direct answers to the questions travelers search before visiting Delhi, Agra and Jaipur — distances, visas, safety, tipping, cash vs cards, Taj Mahal rules, booking and refunds.',
    alternates: {
        canonical: PAGE_URL,
        languages: {
            'en': PAGE_URL,
            'en-US': PAGE_URL,
            'en-GB': PAGE_URL,
            'en-IN': PAGE_URL,
            'en-AU': PAGE_URL,
            'x-default': PAGE_URL,
        },
    },
    openGraph: {
        title: 'India Travel FAQ — Golden Triangle Questions Answered',
        description: 'Distances, visas, safety, tipping, cash vs cards, Taj Mahal rules, booking and refunds — answered by licensed Agra guides.',
        url: PAGE_URL,
        type: 'website',
        images: [{ url: `${BASE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: 'Guide India Tours FAQ' }],
    },
};

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function FAQPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        "url": PAGE_URL,
        "name": "India Travel FAQ — Guide India Tours",
        "dateModified": FAQ_LAST_UPDATED,
        "inLanguage": "en",
        "isPartOf": { "@id": `${BASE_URL}/#website` },
        "publisher": { "@id": `${BASE_URL}/#organization` },
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["main h1", "[data-faq-answer]"]
        },
        "mainEntity": allFaqs.map(faq => ({
            "@type": "Question",
            "@id": `${PAGE_URL}#${faq.id}`,
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
                ...(faq.guide && { "url": faq.guide.href.startsWith('http') ? faq.guide.href : `${BASE_URL}${faq.guide.href}` }),
            }
        }))
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "FAQ", "item": PAGE_URL }
        ]
    };

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, breadcrumbSchema]) }}
            />

            <PageHero
                breadcrumbs={[{ label: 'FAQ' }]}
                badge="Knowledge base"
                title={<>India Travel Questions, <span className="text-maroon-600">Answered.</span></>}
                subtitle="Everything travelers ask before a Golden Triangle trip — distances, visas, safety, money, Taj Mahal rules, booking and refunds — answered by the licensed guides who run the tours."
                meta={
                    <>
                        <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-maroon-600" /> {allFaqs.length} answers · {faqCategories.length} topics</span>
                        <span className="text-gray-400">Updated {formatDate(FAQ_LAST_UPDATED)}</span>
                    </>
                }
            />

            {/* Topic jump links */}
            <nav aria-label="FAQ topics" className="sticky top-12 z-30 bg-ivory-100/95 backdrop-blur-md border-b border-gray-200/70">
                <div className="container mx-auto px-4 max-w-5xl">
                    <ul className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
                        {faqCategories.map((cat) => (
                            <li key={cat.id} className="flex-shrink-0">
                                <a
                                    href={`#${cat.id}`}
                                    className="inline-block px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:border-maroon-600 hover:text-maroon-600 transition-colors whitespace-nowrap"
                                >
                                    {cat.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <section className="py-14 md:py-20">
                <div className="container mx-auto px-4 max-w-5xl space-y-16 md:space-y-24">
                    {faqCategories.map((category, ci) => (
                        <div key={category.id} id={category.id} className="scroll-mt-32">
                            <div className="mb-8 md:mb-10">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-600 mb-2">
                                    {String(ci + 1).padStart(2, '0')} {ci === 0 && <Search className="inline w-3.5 h-3.5 ml-1 -mt-0.5" />}
                                </p>
                                <h2 className="text-2xl md:text-4xl font-display font-bold text-gray-900 mb-3">{category.title}</h2>
                                <p className="text-gray-500 font-light max-w-2xl">{category.blurb}</p>
                            </div>

                            <div className="space-y-4">
                                {category.entries.map((faq) => (
                                    <details
                                        key={faq.id}
                                        id={faq.id}
                                        className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow scroll-mt-36 open:border-gold-200"
                                    >
                                        <summary className="cursor-pointer list-none px-6 md:px-8 py-5 md:py-6 flex items-start justify-between gap-4">
                                            <h3 className="text-base md:text-lg font-bold text-gray-900 leading-snug">{faq.question}</h3>
                                            <span aria-hidden="true" className="text-maroon-600 transition-transform group-open:rotate-45 text-2xl leading-none flex-shrink-0 mt-0.5">+</span>
                                        </summary>
                                        <div className="px-6 md:px-8 pb-6 md:pb-8">
                                            <p data-faq-answer className="text-gray-600 font-light leading-relaxed text-base md:text-lg">{faq.answer}</p>
                                            {faq.guide && (
                                                <Link
                                                    href={faq.guide.href}
                                                    className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-maroon-600 hover:text-black transition-colors"
                                                >
                                                    {faq.guide.label} <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            )}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="pb-20 md:pb-28">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-gray-900 p-10 md:p-20 rounded-3xl text-white relative overflow-hidden text-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-maroon-600/40 to-transparent pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-5">Still have a <span className="text-gold-500">question?</span></h2>
                            <p className="text-lg text-white/60 font-light mb-10 max-w-2xl mx-auto">A guide answers WhatsApp messages around the clock — usually within minutes, always within 2 hours for a quote.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="h-14 px-8 rounded-2xl bg-maroon-600 hover:bg-white hover:text-black text-base font-bold shadow-2xl transition-all">
                                    <a href="https://wa.me/918979810991?text=Hi%20Guide%20India%20Tours!%20I%20have%20a%20question%20about%20planning%20my%20trip." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                                        <MessageCircle className="w-5 h-5" /> Ask on WhatsApp
                                    </a>
                                </Button>
                                <Button variant="outline" size="lg" asChild className="h-14 px-8 rounded-2xl border-white/30 text-white hover:bg-white/10 text-base font-bold bg-transparent">
                                    <a href="tel:+918979810991" className="flex items-center gap-3">
                                        <Phone className="w-5 h-5" /> +91 89798 10991
                                    </a>
                                </Button>
                            </div>
                            <p className="mt-8 text-sm text-white/50">
                                Or read our guides in depth on the <Link href="/blog" className="text-gold-500 hover:text-white underline underline-offset-2">travel blog</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
