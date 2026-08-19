import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Star, Shield, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import ProgrammePricing, { PricingLabels } from "@/app/plans/[id]/_components/ProgrammePricing";
import ProgrammeTimeline from "@/app/plans/[id]/_components/ProgrammeTimeline";
import { generateProductSchema, generateFAQSchema } from "@/lib/schemaGenerator";
import type { ProgrammePricing as ProgrammePricingData, TimelineStop, FAQItem } from "@/data/types/travelPlanTypes";

// German UI strings for the shared pricing table.
export const germanPricingLabels: PricingLabels = {
    transportHeading: "Privater Transport (Klimaanlage)",
    vehicle: "Fahrzeug",
    groupSize: "Gruppengröße",
    packageTotal: "Gesamtpreis",
    quoteOnWhatsApp: "Angebot per WhatsApp",
    whatsappMessage: (planTitle) => `Hallo! Bitte senden Sie mir ein Angebot für „${planTitle}" – Gruppengröße und Fahrzeugwunsch teile ich gleich mit.`,
    guideHeading: "Lizenzierter Guide",
    ticketsHeading: "Monument-Tickets",
    monument: "Monument",
    foreignerPrice: "Preis (ausländische Gäste)",
    optional: "Optional",
    ticketsPrefix: "Offizielle ASI-Preise, zahlbar vor Ort — bitte aktuelle Preise prüfen.",
    notIncludedHeading: "Nicht enthalten",
    plannerLinkLabel: "Planen Sie Ihre Reise im Trip-Planer",
    plannerHref: "/contact#trip-planner",
};

export interface GermanProgrammeContent {
    /** German page path, e.g. /de/delhi-agra-same-day */
    path: string;
    /** English counterpart, e.g. /plans/delhi-agra-same-day */
    englishPath: string;
    title: string;
    duration: string;
    fromPriceEUR: number;
    image: string;
    imageAlt: string;
    descriptionParagraphs: string[];
    highlights: string[];
    inclusions: string[];
    pricing: ProgrammePricingData;
    timeline: TimelineStop[];
    faqs: FAQItem[];
    whatsappMessage: string;
}

// German-language version of the programme detail page. Layout mirrors
// /plans/[id] exactly; prices are passed in from the same rate-card data so
// both language versions can never drift apart.
export default function GermanProgrammePage({ content }: { content: GermanProgrammeContent }) {
    const canonical = `https://www.guideindiatours.com${content.path}`;
    const imageUrl = `https://www.guideindiatours.com${content.image}`;

    const productSchema = {
        ...generateProductSchema({
            name: content.title,
            description: content.descriptionParagraphs[0],
            url: canonical,
            image: imageUrl,
            fromPriceEUR: content.fromPriceEUR,
        }),
        inLanguage: "de",
    };
    const faqSchema = { ...generateFAQSchema(content.faqs), inLanguage: "de" };

    const whatsappHref = `https://wa.me/918979810991?text=${encodeURIComponent(content.whatsappMessage)}`;

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, faqSchema]) }}
            />

            {/* Hero Section */}
            <section className="relative h-[58vh] sm:h-[65vh] md:h-[80vh] overflow-hidden bg-black">
                <Image
                    src={content.image}
                    alt={content.imageAlt}
                    fill
                    className="object-cover opacity-80"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-600 via-black/20 to-transparent"></div>

                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-12 md:pb-24">
                        <div className="max-w-4xl">
                            <Breadcrumbs
                                items={[{ label: "Touren", href: "/plans" }, { label: content.title }]}
                                className="mb-0 text-white/80"
                            />
                            <div className="flex flex-wrap items-center gap-4 mb-6 mt-8">
                                <Badge className="bg-gold-500 text-black border-none px-4 py-1.5 font-black uppercase tracking-widest text-[11px] sm:text-[10px]">
                                    <Star className="w-3 h-3 mr-1.5 fill-black" /> 4,9 bei Google · 403+ Bewertungen
                                </Badge>
                                <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-4 py-1.5 font-black uppercase tracking-widest text-[11px] sm:text-[10px]">
                                    <Clock className="w-3 h-3 mr-1.5" /> {content.duration}
                                </Badge>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 md:mb-8 leading-[1.0] md:leading-[0.9] tracking-tight md:tracking-tighter">
                                {content.title}
                            </h1>
                            <div className="flex items-center gap-8 text-white/90">
                                <div>
                                    <span className="text-[11px] sm:text-[10px] font-black uppercase tracking-widest block mb-1 opacity-60">Preis</span>
                                    <span className="text-3xl font-black text-gold-500">Ab {content.fromPriceEUR} €</span>
                                    <span className="opacity-60 text-sm ml-2">pro Person — verbindliches Angebot per WhatsApp innerhalb von 2 Stunden</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-14 md:py-24">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24">

                        {/* Left Main Content */}
                        <div className="lg:col-span-8 space-y-12 md:space-y-20">

                            {/* Overview */}
                            <section id="overview">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-1 bg-maroon-600"></div>
                                    <h2 className="text-4xl font-display font-bold text-gray-900">Die <span className="text-maroon-600">Tour</span></h2>
                                </div>
                                <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed">
                                    {content.descriptionParagraphs.map((para, i) => (
                                        <p key={i} className="mb-6">{para}</p>
                                    ))}
                                </div>
                            </section>

                            {/* Transparent pricing */}
                            <section id="pricing">
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-12 h-1 bg-maroon-600"></div>
                                    <h2 className="text-4xl font-display font-bold text-gray-900">Transparente <span className="text-maroon-600">Preise</span></h2>
                                </div>
                                <ProgrammePricing pricing={content.pricing} planTitle={content.title} labels={germanPricingLabels} />
                            </section>

                            {/* Timeline */}
                            <section id="itinerary">
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-12 h-1 bg-maroon-600"></div>
                                    <h2 className="text-4xl font-display font-bold text-gray-900">Stunde für <span className="text-maroon-600">Stunde</span></h2>
                                </div>
                                <ProgrammeTimeline timeline={content.timeline} dayLabel="Tag" />
                            </section>

                            {/* Highlights & Inclusions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <section id="highlights" className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
                                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                        <Award className="text-maroon-600" /> Höhepunkte
                                    </h3>
                                    <ul className="space-y-4">
                                        {content.highlights.map((h, i) => (
                                            <li key={i} className="flex gap-4 items-start">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-green-600" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <section id="inclusions" className="bg-gray-900 p-10 rounded-3xl text-white">
                                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                        <Shield className="text-gold-500" /> Im Preis enthalten
                                    </h3>
                                    <ul className="space-y-4">
                                        {content.inclusions.map((item, i) => (
                                            <li key={i} className="flex gap-4 items-start">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-gold-500" />
                                                </div>
                                                <span className="text-sm font-light text-white/70">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>

                            {/* FAQ Section */}
                            <section id="faqs">
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-12 h-1 bg-maroon-600"></div>
                                    <h2 className="text-4xl font-display font-bold text-gray-900">Häufige <span className="text-maroon-600">Fragen</span></h2>
                                </div>
                                <div className="space-y-6">
                                    {content.faqs.map((faq, i) => (
                                        <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100">
                                            <h4 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h4>
                                            <p className="text-gray-500 font-light leading-relaxed">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32 space-y-8">
                                <Card className="rounded-3xl border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden bg-white">
                                    <div className="p-10 lg:p-12">
                                        <div className="flex items-center justify-between mb-8">
                                            <span className="text-[11px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-maroon-600">Sichere Buchung</span>
                                            <Badge className="bg-green-50 text-green-700 border-none font-black text-[11px] sm:text-[9px] uppercase tracking-widest">Verfügbar</Badge>
                                        </div>

                                        <div className="mb-10 text-center">
                                            <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-1">Transparente Preise</p>
                                            <div className="flex items-baseline justify-center gap-2">
                                                <span className="text-3xl font-black text-gray-900">Ab {content.fromPriceEUR} €</span>
                                                <span className="text-gray-500 text-sm font-light">pro Person</span>
                                            </div>
                                            <p className="text-gray-400 text-sm font-light mt-2">
                                                Richtpreis für die angegebene Gruppengröße und Saison — verbindliches Angebot per WhatsApp innerhalb von 2 Stunden.
                                            </p>
                                        </div>

                                        <a
                                            href={whatsappHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-full py-5 md:py-10 h-auto rounded-2xl bg-maroon-600 hover:bg-black text-white text-lg md:text-xl font-display font-bold shadow-2xl transition-all duration-500"
                                        >
                                            <WhatsAppIcon className="w-5 h-5 mr-3" />
                                            Tour anfragen
                                        </a>

                                        <div className="mt-8 space-y-4">
                                            <p className="text-center text-sm font-light text-gray-500">
                                                Deutschsprachige Guides (m/w) auf Anfrage: +1.000 ₹ pro Tag
                                            </p>
                                            <div className="flex items-center gap-3 text-sm font-bold text-gray-400 uppercase tracking-tighter justify-center">
                                                <Shield className="w-4 h-4 text-green-500" /> Keine versteckten Kosten
                                            </div>
                                            <Link
                                                href={content.englishPath}
                                                className="flex items-center justify-center gap-2 text-sm font-medium text-maroon-600 hover:text-maroon-700 transition-colors"
                                            >
                                                Diese Seite auf Englisch lesen
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
