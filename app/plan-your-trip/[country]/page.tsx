import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Languages, CreditCard, FileText, Mail, MessageCircle } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { allPlans } from "@/data/travelPlans";
import { countries, copy, getCountry, guideNames } from "@/data/countries";
import { getGuideLang } from "@/data/multilingualGuide";
import { generateFAQSchema } from "@/lib/schemaGenerator";
import { numericPrice } from "@/lib/planPrice";
import { siteConfig } from "@/lib/siteConfig";
import { whatsappLink, emailLink } from "@/lib/contact";

type Props = { params: Promise<{ country: string }> };

export const dynamicParams = false;
export async function generateStaticParams() {
    return countries.map((c) => ({ country: c.slug }));
}

const fill = (s: string, n: string) => s.replaceAll("{n}", n);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country } = await params;
    const c = getCountry(country);
    if (!c) return {};
    const t = copy[c.lang];
    const url = `${siteConfig.url}/plan-your-trip/${c.slug}`;
    const title = fill(t.metaTitle, c.name);
    const description = fill(t.metaDesc, c.name);
    return {
        title,
        description,
        alternates: { canonical: url, languages: { [c.hreflang]: url } },
        openGraph: { title, description, url, siteName: siteConfig.name, type: "website", images: [{ url: `${siteConfig.url}/images/og-default.jpg`, width: 1200, height: 630 }] },
        twitter: { card: "summary_large_image", title, description },
    };
}

export default async function CountryPage({ params }: Props) {
    const { country } = await params;
    const c = getCountry(country);
    if (!c) notFound();
    const t = copy[c.lang];
    const n = c.name;

    // Guide-language line, with availability read from the guide pages' own data.
    const guideLines = c.guides.flatMap((code) => {
        const g = getGuideLang(code);
        if (!g) return [];
        const L = guideNames[code] ?? code;
        if (c.lang !== "en") return [{ code, text: t.guideAvail }];
        return [{ code, text: (g.guides === "available" ? t.guideAvail : t.guideReq).replaceAll("{L}", L) }];
    });
    const guideA = [t.guideEn, ...guideLines.map((g) => g.text)].join(" ");

    const faqs = [...t.faqs({ n, tz: c.tz, guideA }), ...(c.faqs ?? [])].map((f) => ({ question: fill(f.q, n), answer: f.a }));
    const url = `${siteConfig.url}/plan-your-trip/${c.slug}`;
    const webPage = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: fill(t.metaTitle, n),
        dateModified: siteConfig.contentUpdated,
        inLanguage: c.hreflang,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": `${siteConfig.url}/#organization` },
    };

    const priceFor = (id: number) => {
        const p = allPlans.find((x) => x.id === id);
        const v = p ? numericPrice(p.price) : null;
        return v ? t.price.replace("{p}", v.toLocaleString("en-US")) : null;
    };
    const waHref = whatsappLink(fill(t.wa, n));
    const mailHref = emailLink(t.mailSub, fill(t.wa, n));

    return (
        <main className="bg-white min-h-screen" lang={c.lang}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([webPage, generateFAQSchema(faqs)]) }} />
            <PageHero
                breadcrumbs={[{ label: "Plan your trip", href: "/plan-your-trip" }, { label: c.label }]}
                badge={fill(t.badge, n)}
                title={fill(t.h1, n)}
                subtitle={fill(t.sub, n)}
            />

            <section className="py-12 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">{t.facts}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-maroon-600 mb-2"><Clock className="w-4 h-4" />{t.time}</p>
                            <p className="text-gray-700 font-light">{c.tz}</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-maroon-600 mb-2"><Languages className="w-4 h-4" />{t.guideLbl}</p>
                            <p className="text-gray-700 font-light">{t.guideEn}</p>
                            {guideLines.map((g) => (
                                <p key={g.code} className="text-gray-700 font-light mt-1">
                                    <Link href={`/guide/${g.code}`} className="font-bold text-maroon-600 underline underline-offset-2">{g.text}</Link>
                                </p>
                            ))}
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-maroon-600 mb-2"><CreditCard className="w-4 h-4" />{t.cur}</p>
                            <p className="text-gray-700 font-light">{t.curText}</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-maroon-600 mb-2"><FileText className="w-4 h-4" />{t.visa}</p>
                            <p className="text-gray-700 font-light">{t.visaText}</p>
                            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                <Link href="/blog/india-e-visa-guide-for-tourists" className="font-bold text-maroon-600 underline underline-offset-2">{t.visaLink}</Link>
                                <a href="https://indianvisaonline.gov.in" target="_blank" rel="noopener noreferrer" className="font-bold text-maroon-600 underline underline-offset-2">indianvisaonline.gov.in</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">{t.start}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {t.cards.map((card) => (
                            <Link key={card.href} href={card.href} className="group block bg-ivory-100 rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                                <h3 className="font-bold text-gray-900 group-hover:text-maroon-600 transition-colors mb-2">{card.t}</h3>
                                <p className="text-sm text-gray-600 font-light leading-relaxed mb-4">{card.d}</p>
                                {priceFor(card.plan) && <p className="text-sm font-black text-maroon-600 flex items-center gap-2">{priceFor(card.plan)} <ArrowRight className="w-4 h-4" /></p>}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-maroon-600 hover:bg-black text-white font-bold px-6 py-3 transition-colors">
                            <MessageCircle className="w-4 h-4" /> {t.cta}
                        </a>
                        <a href={mailHref} className="inline-flex items-center gap-2 rounded-xl border border-maroon-600 text-maroon-600 hover:bg-maroon-600 hover:text-white font-bold px-6 py-3 transition-colors">
                            <Mail className="w-4 h-4" /> {t.mail}
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50 border-t border-gray-100" aria-labelledby="country-faq">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 id="country-faq" className="text-3xl font-display font-bold text-gray-900 mb-8">{fill(t.faqHead, n)}</h2>
                    <div className="space-y-4">
                        {faqs.map((f) => (
                            <div key={f.question} className="bg-white rounded-2xl border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.question}</h3>
                                <p className="text-gray-600 font-light leading-relaxed">{f.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
