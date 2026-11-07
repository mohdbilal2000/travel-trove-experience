import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import PlanningFromAbroad from "@/components/shared/PlanningFromAbroad";
import { allPlans } from "@/data/travelPlans";
import { fromPrice, numericPrice } from "@/lib/planPrice";
import { siteConfig } from "@/lib/siteConfig";
import { generateFAQSchema } from "@/lib/schemaGenerator";
import type { LandingConfig } from "@/data/landingPages";

const BASE = siteConfig.url;

export const landingMetadata = (c: LandingConfig): Metadata => {
    const url = `${BASE}/${c.slug}`;
    return {
        title: c.metaTitle,
        description: c.metaDescription,
        alternates: { canonical: url, languages: { en: url, "x-default": url } },
        openGraph: {
            title: c.metaTitle,
            description: c.metaDescription,
            url,
            siteName: siteConfig.name,
            type: "website",
            images: [{ url: `${BASE}/images/og-default.jpg`, width: 1200, height: 630 }],
        },
        twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDescription },
    };
};

const waHref = (text: string) => `${siteConfig.whatsappHref}?text=${encodeURIComponent(text)}`;

export default function TourLanding({ config: c }: { config: LandingConfig }) {
    const plans = c.planIds.map((id) => allPlans.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p));
    const url = `${BASE}/${c.slug}`;

    const webPage = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: c.metaTitle,
        description: c.metaDescription,
        dateModified: siteConfig.contentUpdated,
        inLanguage: "en",
        isPartOf: { "@id": `${BASE}/#website` },
        about: { "@id": `${BASE}/#organization` },
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["main h1", "#quick-answer"] },
    };
    const itemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: c.optionsHeading,
        itemListElement: plans.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${BASE}/plans/${p.id}`,
            name: p.title,
            item: {
                "@type": "TouristTrip",
                name: p.title,
                url: `${BASE}/plans/${p.id}`,
                ...(numericPrice(p.price)
                    ? { offers: { "@type": "Offer", price: String(numericPrice(p.price)), priceCurrency: "USD", availability: "https://schema.org/InStock" } }
                    : {}),
            },
        })),
    };

    return (
        <main className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([webPage, itemList, generateFAQSchema(c.faqs)]) }} />

            <PageHero breadcrumbs={[{ label: c.h1 }]} badge={c.badge} title={c.h1} subtitle={c.subtitle} />

            <section className="py-12 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div id="quick-answer" className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
                        <p className="text-[11px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-4">Quick Answer</p>
                        <ul className="space-y-3 text-gray-700 font-light">
                            {c.quick.map((q) => (
                                <li key={q.lead}><strong className="text-gray-900">{q.lead}</strong> {q.text}</li>
                            ))}
                        </ul>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <a href={waHref(c.whatsappText)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-maroon-600 hover:bg-black text-white font-bold px-6 py-3 transition-colors">
                                <MessageCircle className="w-4 h-4" /> Get a quote on WhatsApp
                            </a>
                            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 hover:border-maroon-600 text-gray-800 font-bold px-6 py-3 transition-colors">
                                Send an enquiry <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20" aria-labelledby="options-heading">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 id="options-heading" className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">{c.optionsHeading}</h2>
                    <p className="text-gray-500 font-light mb-10 max-w-3xl">{c.optionsIntro}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {plans.map((p) => (
                            <Link key={p.id} href={`/plans/${p.id}`} className="group block bg-ivory-100 rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-maroon-600 transition-colors">{p.title}</h3>
                                    <span className="shrink-0 text-sm font-black text-maroon-600">{fromPrice(p.price)}</span>
                                </div>
                                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">{p.duration}</p>
                                <ul className="space-y-1.5">
                                    {p.inclusions.slice(0, 4).map((i) => (
                                        <li key={i} className="flex gap-2 text-sm text-gray-600 font-light"><Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />{i}</li>
                                    ))}
                                </ul>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {c.days && (
                <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-100" aria-labelledby="days-heading">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 id="days-heading" className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-10">{c.daysHeading}</h2>
                        <ol className="space-y-4">
                            {c.days.map((d) => (
                                <li key={d.title} className="bg-white rounded-2xl border border-gray-100 p-6">
                                    <h3 className="font-bold text-gray-900 mb-1">{d.title}</h3>
                                    <p className="text-gray-600 font-light leading-relaxed">{d.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>
            )}

            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 max-w-3xl space-y-12 text-lg text-gray-600 font-light leading-relaxed">
                    {c.sections.map((s) => (
                        <div key={s.heading}>
                            <h2 className="text-3xl font-display font-bold text-gray-900 mb-5">{s.heading}</h2>
                            {s.paragraphs?.map((t) => (<p key={t} className="mb-4">{t}</p>))}
                            {s.bullets && (
                                <ul className="space-y-2 list-disc pl-6">{s.bullets.map((b) => (<li key={b}>{b}</li>))}</ul>
                            )}
                            {s.table && (
                                <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 overflow-x-auto mt-4">
                                    <table className="w-full text-left text-base">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-[11px] font-black uppercase tracking-widest text-gray-400">
                                                {s.table.head.map((h) => (<th key={h} className="py-3 pr-4">{h}</th>))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {s.table.rows.map((r) => (
                                                <tr key={r[0]} className="border-b border-gray-50">
                                                    {r.map((cell, i) => (<td key={i} className={`py-3 pr-4 ${i === 0 ? "font-semibold text-gray-900" : ""}`}>{cell}</td>))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100" aria-labelledby="faq-heading">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 id="faq-heading" className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-10">Frequently asked <span className="text-maroon-600">questions</span></h2>
                    <div className="space-y-4">
                        {c.faqs.map((f) => (
                            <div key={f.question} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{f.question}</h3>
                                <p className="text-gray-600 font-light leading-relaxed">{f.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <PlanningFromAbroad />

            <section className="py-14 border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-xl font-bold text-gray-900 mb-5">Related guides and tours</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {c.related.map((r) => (
                            <li key={r.href}>
                                <Link href={r.href} className="flex items-center justify-between rounded-xl border border-gray-100 px-5 py-3 text-gray-700 hover:border-maroon-600 hover:text-maroon-600 transition-colors">
                                    {r.label} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
