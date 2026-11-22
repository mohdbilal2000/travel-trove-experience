import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Car, Clock, Hotel, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { allPlans } from '@/data/travelPlans';
import type { TravelPlan } from '@/data/types/travelPlanTypes';
import PageHero from '@/components/shared/PageHero';
import EnquiryForm from '@/components/enquiry/EnquiryForm';
import { fromPrice, numericPrice } from '@/lib/planPrice';
import { isLuxuryPlan, planCities } from '@/lib/planSeo';
import { generateFAQSchema } from '@/lib/schemaGenerator';
import { siteConfig, ratingCountDisplay } from '@/lib/siteConfig';

const URL = 'https://www.guideindiatours.com/luxury-india-tours';

const luxuryPlans = allPlans.filter(isLuxuryPlan);

const prices = luxuryPlans.map((p) => numericPrice(p.price)).filter((n): n is number => n !== null);
const lowestPrice = Math.min(...prices);
const isOvernight = (p: TravelPlan) => /night/i.test(p.duration) || /(\d+)\s*days/i.test(p.duration);
const lowestOvernight = Math.min(
    ...luxuryPlans.filter(isOvernight).map((p) => numericPrice(p.price)).filter((n): n is number => n !== null)
);

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

export const metadata: Metadata = {
    title: 'Luxury India Tours | Private 5-Star Packages',
    description: `Private luxury India tours: 5-star hotels, chauffeured premium cars, government-approved guides. Golden Triangle & Rajasthan from ${usd(lowestPrice)}. Proposal in 2 hours.`,
    alternates: {
        canonical: URL,
        languages: { en: URL, 'x-default': URL },
    },
    openGraph: {
        type: 'website',
        title: 'Luxury India Tours | Private 5-Star Packages',
        description: 'Private luxury tours of Delhi, Agra, Jaipur and Rajasthan with 5-star hotels and government-approved guides.',
        url: URL,
        images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630, alt: 'Luxury India tours by Guide India Tours' }],
    },
    twitter: { card: 'summary_large_image', title: 'Luxury India Tours | Private 5-Star Packages' },
};

const price = (p: TravelPlan) => numericPrice(p.price) ?? Number.MAX_SAFE_INTEGER;
const byPrice = (a: TravelPlan, b: TravelPlan) => price(a) - price(b);

const groups: { id: string; title: string; blurb: string; plans: TravelPlan[] }[] = [
    {
        id: 'bespoke',
        title: 'Bespoke & VIP journeys',
        blurb: 'Designed from scratch around your dates, interests and pace.',
        plans: luxuryPlans.filter((p) => /vip|premium|customi[sz]ed/i.test(p.title) || /flexible/i.test(p.duration)),
    },
    {
        id: 'golden-triangle',
        title: 'Luxury Golden Triangle tours',
        blurb: 'Delhi, Agra and Jaipur with 5-star hotels and a premium private car.',
        plans: luxuryPlans.filter(
            (p) => /golden triangle/i.test(p.title) && !/\+|rajasthan/i.test(p.title) && !/vip|premium|customi[sz]ed/i.test(p.title)
        ),
    },
    {
        id: 'rajasthan',
        title: 'Golden Triangle + Rajasthan luxury extensions',
        blurb: 'Add Udaipur, Jodhpur, Jaisalmer, Ranthambore and more to the classic circuit.',
        plans: luxuryPlans.filter((p) => /\+|rajasthan/i.test(p.title) && /golden triangle/i.test(p.title) && !/vip|premium|customi[sz]ed/i.test(p.title)),
    },
    {
        id: 'cities',
        title: 'Luxury city & Taj Mahal experiences',
        blurb: 'Same-day to three-day luxury tours of Delhi, Agra and Jaipur.',
        plans: luxuryPlans.filter((p) => !/golden triangle/i.test(p.title) && !/vip|premium|customi[sz]ed/i.test(p.title) && !/flexible/i.test(p.duration)),
    },
]
    .map((g) => ({ ...g, plans: [...g.plans].sort(byPrice) }))
    .filter((g) => g.plans.length > 0);

const faqs = [
    {
        question: 'What makes a Guide India Tours package a luxury tour?',
        answer:
            'Luxury packages use 5-star hotels on overnight itineraries (heritage hotels on selected ones), a premium private air-conditioned car with a professional chauffeur, and a senior government-approved guide. Same-day luxury tours add the premium car and a more unhurried, fully private day. Each package page lists exactly what is included.',
    },
    {
        question: 'How much does a luxury India tour cost?',
        answer: `Luxury packages start from ${usd(lowestPrice)} per adult for a same-day luxury tour and from ${usd(lowestOvernight)} per adult for multi-day tours with luxury stays. The final price is confirmed in a written quote and depends on the hotels you choose, travel dates, season and group size.`,
    },
    {
        question: 'Can a luxury itinerary be customised?',
        answer:
            'Yes. Every tour is private and flexible. You can change the number of days, add Rajasthan cities, choose different hotels, or ask us to build a fully bespoke journey. Tell us your preferences in the enquiry form and we send a revised written proposal.',
    },
    {
        question: 'Who guides luxury tours?',
        answer:
            'Tours are led by government-approved, licensed guides, including our lead guide Avneesh Dixit. Guides are matched to your interests and language; English and Hindi are standard, with French, Spanish, German, Japanese, Russian and Italian guides available on request.',
    },
    {
        question: 'When is the best time to take a luxury tour of Rajasthan and the Golden Triangle?',
        answer:
            'October to March has the most comfortable weather and is the busiest season, so enquire early for those months. Tours run year-round. Note that the Taj Mahal is closed every Friday, so we plan your Agra days around it.',
    },
    {
        question: 'Do children get free entry to monuments on a luxury tour?',
        answer:
            'Children under 15 enter all Archaeological Survey of India monuments, including the Taj Mahal, free of charge. We build child-friendly pacing into family itineraries.',
    },
    {
        question: 'How do I book, and what are the payment and cancellation terms?',
        answer:
            'Send an enquiry (or message us on WhatsApp), receive a written proposal within 2 hours, then confirm. Payment and cancellation terms are stated in your proposal and set out on our Refund Policy page.',
    },
];

const pillars = [
    { icon: Hotel, title: '5-star stays', text: 'Overnight luxury packages use 5-star hotels, with heritage hotels on selected itineraries.' },
    { icon: Car, title: 'Premium private car', text: 'Your own air-conditioned vehicle with a professional chauffeur for the whole trip.' },
    { icon: Award, title: 'Senior licensed guides', text: 'Government-approved guides led by Avneesh Dixit, matched to your interests and language.' },
    { icon: MessageCircle, title: 'One point of contact', text: 'A single WhatsApp line to our team from first enquiry to departure day.' },
];

export default function LuxuryIndiaToursPage() {
    const itemList = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Luxury India Tours by Guide India Tours',
        url: URL,
        numberOfItems: luxuryPlans.length,
        itemListElement: [...luxuryPlans].sort(byPrice).map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://www.guideindiatours.com/plans/${p.id}`,
            name: p.title,
        })),
    };

    const webPage = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${URL}#webpage`,
        url: URL,
        name: 'Luxury India Tours',
        dateModified: siteConfig.contentUpdated,
        isPartOf: { '@id': 'https://www.guideindiatours.com/#website' },
        about: { '@id': 'https://www.guideindiatours.com/#organization' },
    };

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([webPage, itemList, generateFAQSchema(faqs)]) }}
            />

            <PageHero
                breadcrumbs={[{ label: 'Luxury India Tours' }]}
                badge="Private · Chauffeured · 5-Star"
                title={<>Luxury India Tours, <span className="text-maroon-600">Privately Guided</span></>}
                subtitle="Golden Triangle, Rajasthan and beyond with 5-star hotels, a premium private car and government-approved guides — planned around you, not a group."
                meta={
                    <>
                        <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold-500" /> {siteConfig.rating.value}/5 from {ratingCountDisplay} Google reviews</span>
                        <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-600" /> No hidden fees</span>
                        <a href="#enquire" className="font-bold text-maroon-600 underline underline-offset-4">Request a private proposal</a>
                    </>
                }
            />

            <section className="py-14 md:py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Answer-first summary for search and AI answer engines */}
                    <div className="mb-14 rounded-3xl border border-gold-500/40 bg-white p-8 md:p-10">
                        <h2 className="mb-3 text-2xl font-display font-bold text-gray-900">Luxury India tours in brief</h2>
                        <p className="text-lg text-gray-600 font-light leading-relaxed">
                            Guide India Tours runs private luxury tours of Delhi, Agra, Jaipur and Rajasthan from {usd(lowestPrice)} per adult.
                            Overnight packages use 5-star hotels, a premium private air-conditioned car with chauffeur and a
                            government-approved guide. Every itinerary is customisable, and you receive a written proposal within 2 hours.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
                        {pillars.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="rounded-2xl border border-gray-100 bg-white p-6">
                                <Icon className="mb-4 h-7 w-7 text-maroon-600" />
                                <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
                                <p className="text-sm text-gray-600 font-light leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>

                    {groups.map((group) => (
                        <section key={group.id} id={group.id} className="mb-20" aria-labelledby={`${group.id}-h`}>
                            <h2 id={`${group.id}-h`} className="mb-2 text-3xl font-display font-bold text-gray-900">{group.title}</h2>
                            <p className="mb-8 text-gray-500 font-light">{group.blurb}</p>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {group.plans.map((plan) => (
                                    <Link
                                        key={plan.id}
                                        href={`/plans/${plan.id}`}
                                        className="group block overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-2xl"
                                    >
                                        <div className="relative h-52 overflow-hidden">
                                            <Image
                                                src={plan.image}
                                                alt={`${plan.title} — private luxury tour in ${planCities(plan).join(', ') || 'India'}`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                                                <Clock className="h-3 w-3 text-gold-500" /> {plan.duration}
                                            </p>
                                            <h3 className="mb-3 text-xl font-display font-bold text-gray-900 group-hover:text-maroon-600 transition-colors">{plan.title}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="font-black text-maroon-600">{fromPrice(plan.price)}</span>
                                                <span className="flex items-center gap-1 text-sm font-bold text-gray-900">View itinerary <ArrowRight className="h-4 w-4" /></span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}

                    <section id="enquire" className="scroll-mt-28 mb-20">
                        <h2 className="mb-3 text-3xl md:text-4xl font-display font-bold text-gray-900">
                            Request your <span className="text-maroon-600">private proposal</span>
                        </h2>
                        <p className="mb-8 text-lg text-gray-600 font-light leading-relaxed">
                            Share your dates and group size. We reply with a written proposal within 2 hours — no payment needed to enquire.
                        </p>
                        <EnquiryForm luxury source="luxury-hub" id="enquiry-luxury" />
                    </section>

                    <section aria-labelledby="luxury-faq-h">
                        <h2 id="luxury-faq-h" className="mb-10 text-3xl md:text-4xl font-display font-bold text-gray-900">
                            Luxury tour <span className="text-maroon-600">questions</span>
                        </h2>
                        <div className="space-y-6">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
                                    <h3 className="mb-3 text-lg md:text-xl font-bold text-gray-900">{faq.question}</h3>
                                    <p className="text-gray-600 font-light leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-gray-600 font-light">
                            Prefer a standard-tier trip? See <Link href="/plans" className="font-bold text-maroon-600 underline underline-offset-2">all tour plans</Link> or
                            our <Link href="/golden-triangle-tours" className="font-bold text-maroon-600 underline underline-offset-2">Golden Triangle tours</Link>. Meet your guide:{' '}
                            <Link href="/about/avneesh-dixit" className="font-bold text-maroon-600 underline underline-offset-2">Avneesh Dixit</Link>.
                        </p>
                    </section>
                </div>
            </section>
        </main>
    );
}
