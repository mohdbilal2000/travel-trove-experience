
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
    Check, Clock, Star,
    Shield, Award
} from "lucide-react";
import { getPlanBySlugOrId, getPlanPath, allPlans } from "@/data/travelPlans";
import { getReviewsForTour } from "@/data/reviews";
import { getTourFaqs } from "@/lib/tourFaqs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AtAGlance from "./_components/AtAGlance";
import BookingButton from "./_components/BookingButton";
import StickyBookingBar from "./_components/StickyBookingBar";
import ProgrammePricing from "./_components/ProgrammePricing";
import ProgrammeTimeline from "./_components/ProgrammeTimeline";
import {
    generateTourPackageSchema,
    generateFAQSchema,
    generateProductSchema
} from "@/lib/schemaGenerator";

export const revalidate = 3600; // Revalidate every hour

const BASE_URL = "https://www.guideindiatours.com";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const plan = getPlanBySlugOrId(id);

    if (!plan) {
        return {
            title: 'Tour Not Found | Guide India Tours',
        };
    }

    const path = getPlanPath(plan);
    const canonical = `${BASE_URL}/plans/${path}`;
    const title = plan.fromPriceEUR
        ? `${plan.title} — from €${plan.fromPriceEUR} | Guide India Tours`
        : `${plan.title} | Premium India Tour Packages`;
    const description = plan.fromPriceEUR
        ? `${plan.description.substring(0, 120)}... Private ${plan.duration} tour from €${plan.fromPriceEUR} per person with itemized pricing — transport, licensed guide and monument tickets listed openly.`
        : `${plan.description.substring(0, 155)}... Book your dream ${plan.duration} tour to ${plan.destinations?.join(', ') || 'India'} with expert guides.`;

    const languages: Record<string, string> = {
        'en': canonical,
        'x-default': canonical,
    };
    if (plan.germanPath) {
        languages['de'] = `${BASE_URL}${plan.germanPath}`;
    }

    return {
        title,
        description,
        alternates: {
            canonical,
            languages,
        },
        openGraph: {
            title,
            description,
            url: canonical,
            images: [
                {
                    url: plan.image.startsWith('http') ? plan.image : `${BASE_URL}${plan.image}`,
                    width: 1200,
                    height: 630,
                    alt: plan.title,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [plan.image.startsWith('http') ? plan.image : `${BASE_URL}${plan.image}`],
        },
    };
}

export default async function PlanDetailPage({ params }: PageProps) {
    const { id } = await params;
    const plan = getPlanBySlugOrId(id);

    if (!plan) {
        notFound();
    }

    const path = getPlanPath(plan);
    const canonical = `${BASE_URL}/plans/${path}`;
    const isProgramme = Boolean(plan.fromPriceEUR && plan.pricing);
    const priceLabel = plan.fromPriceEUR ? `From €${plan.fromPriceEUR}` : "Custom Quote";
    const imageUrl = plan.image.startsWith('http') ? plan.image : `${BASE_URL}${plan.image}`;

    // Per-tour reviews (relevant subset of the global review pool — shown as
    // testimonials only, never emitted as per-tour schema ratings)
    const tourReviews = getReviewsForTour(plan.title, plan.destinations || []);

    // Prepare schema. Programmes with a published from-price get Product +
    // Offer; bespoke plans keep TouristTrip without a price. Neither emits
    // invented per-plan review counts.
    const mainSchema = isProgramme
        ? generateProductSchema({
            name: plan.title,
            description: plan.description,
            url: canonical,
            image: imageUrl,
            fromPriceEUR: plan.fromPriceEUR!,
            sku: plan.slug,
        })
        : generateTourPackageSchema({
            name: plan.title,
            description: plan.description,
            price: "", // pricing is by custom quote — generator omits the Offer price
            image: imageUrl,
            duration: plan.duration,
            itinerary: plan.itinerary,
            destinations: plan.destinations,
            url: canonical,
        }, {
            name: "Guide India Tours",
            url: BASE_URL
        });

    // BreadcrumbList schema is emitted by the shared <Breadcrumbs> component
    // in the hero — adding another here would duplicate it.
    const tourFaqs = getTourFaqs(plan);
    const faqSchema = tourFaqs.length > 0 ? generateFAQSchema(tourFaqs) : null;

    const schemas = [mainSchema, ...(faqSchema ? [faqSchema] : [])];

    return (
        <main className="bg-ivory-100 min-h-screen pb-24 md:pb-0">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />

            {/* Hero Section */}
            <section className="relative h-[58vh] sm:h-[65vh] md:h-[80vh] overflow-hidden bg-black">
                <Image
                    src={plan.image}
                    alt={`${plan.title} - Private India Tour`}
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
                                items={[{ label: 'Tour Plans', href: '/plans' }, { label: plan.title }]}
                                className="mb-0 text-white/80"
                            />
                            <div className="flex flex-wrap items-center gap-4 mb-6 mt-8">
                                <Badge className="bg-gold-500 text-black border-none px-4 py-1.5 font-black uppercase tracking-widest text-[11px] sm:text-[10px]">
                                    <Star className="w-3 h-3 mr-1.5 fill-black" /> 4.9 on Google · 403+ reviews
                                </Badge>
                                <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-4 py-1.5 font-black uppercase tracking-widest text-[11px] sm:text-[10px]">
                                    <Clock className="w-3 h-3 mr-1.5" /> {plan.duration}
                                </Badge>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-bold text-white mb-6 md:mb-8 leading-[1.0] md:leading-[0.85] tracking-tight md:tracking-tighter">
                                {plan.title}
                            </h1>
                            <div className="flex items-center gap-8 text-white/90">
                                <div>
                                    <span className="text-[11px] sm:text-[10px] font-black uppercase tracking-widest block mb-1 opacity-60">Pricing</span>
                                    {isProgramme ? (
                                        <>
                                            <span className="text-3xl font-black text-gold-500">From €{plan.fromPriceEUR}</span>
                                            <span className="opacity-60 text-sm ml-2">per person — final quote on WhatsApp within 2 hours</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-3xl font-black text-gold-500">Custom Quote</span>
                                            <span className="opacity-60 text-sm ml-2">tailored to your trip</span>
                                        </>
                                    )}
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

                            {/* At a Glance - AI Priority */}
                            <section id="at-a-glance">
                                <AtAGlance
                                    duration={plan.duration}
                                    highlights={plan.highlights}
                                    pricingLabel={isProgramme
                                        ? `From €${plan.fromPriceEUR} per person — final quote on WhatsApp within 2 hours`
                                        : undefined}
                                />
                            </section>

                            {/* Overview */}
                            <section id="overview">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-1 bg-maroon-600"></div>
                                    <h2 className="text-4xl font-display font-bold text-gray-900">Tour <span className="text-maroon-600">Overview</span></h2>
                                </div>
                                <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed">
                                    {plan.description.split('\n\n').map((para, i) => (
                                        <p key={i} className="mb-6">{para}</p>
                                    ))}
                                </div>
                            </section>

                            {/* Transparent, itemized pricing (real programmes only) */}
                            {plan.pricing && (
                                <section id="pricing">
                                    <div className="flex items-center gap-4 mb-12">
                                        <div className="w-12 h-1 bg-maroon-600"></div>
                                        <h2 className="text-4xl font-display font-bold text-gray-900">Transparent <span className="text-maroon-600">Pricing</span></h2>
                                    </div>
                                    <ProgrammePricing pricing={plan.pricing} planTitle={plan.title} />
                                </section>
                            )}

                            {/* Hour-by-hour timeline (programmes) or day-based itinerary (bespoke) */}
                            {plan.timeline && plan.timeline.length > 0 ? (
                                <section id="itinerary">
                                    <div className="flex items-center gap-4 mb-12">
                                        <div className="w-12 h-1 bg-maroon-600"></div>
                                        <h2 className="text-4xl font-display font-bold text-gray-900">Hour by <span className="text-maroon-600">Hour</span></h2>
                                    </div>
                                    <ProgrammeTimeline timeline={plan.timeline} />
                                </section>
                            ) : (
                                <section id="itinerary">
                                    <div className="flex items-center gap-4 mb-12">
                                        <div className="w-12 h-1 bg-maroon-600"></div>
                                        <h2 className="text-4xl font-display font-bold text-gray-900">Your <span className="text-maroon-600">Journey</span></h2>
                                    </div>
                                    <div className="space-y-4">
                                        {plan.itinerary.map((item, index) => (
                                            <div key={index} className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 border border-gray-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                                                <div className="flex flex-col md:flex-row gap-8">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-20 h-20 rounded-3xl bg-maroon-600 text-white flex flex-col items-center justify-center font-display shadow-lg group-hover:rotate-6 transition-transform">
                                                            <span className="text-xs uppercase font-black opacity-60">Day</span>
                                                            <span className="text-3xl font-bold">{index + 1}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                                        <p className="text-gray-500 font-light leading-relaxed text-lg mb-6">
                                                            {item.description}
                                                        </p>
                                                        {(item.meals || item.accommodation) && (
                                                            <div className="flex flex-wrap gap-4">
                                                                {item.meals && (
                                                                    <Badge variant="outline" className="px-4 py-2 rounded-xl border-gray-100 bg-gray-50 text-gray-600 font-bold text-[11px] sm:text-[10px] uppercase tracking-wider">
                                                                        Meals: {item.meals}
                                                                    </Badge>
                                                                )}
                                                                {item.accommodation && (
                                                                    <Badge variant="outline" className="px-4 py-2 rounded-xl border-gray-100 bg-gray-50 text-gray-600 font-bold text-[11px] sm:text-[10px] uppercase tracking-wider">
                                                                        Stay: {item.accommodation}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Highlights & Inclusions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <section id="highlights" className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
                                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                        <Award className="text-maroon-600" /> Highlights
                                    </h3>
                                    <ul className="space-y-4">
                                        {plan.highlights.map((h, i) => (
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
                                        <Shield className="text-gold-500" /> What's Included
                                    </h3>
                                    <ul className="space-y-4">
                                        {(plan.inclusions || ["Private AC Car", "Expert Language Guide", "Luxury Hotel Stays", "Daily Breakfast"]).map((item, i) => (
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

                            {/* FAQ Section - AI Search Optimization */}
                            {tourFaqs.length > 0 && (
                                <section id="faqs">
                                    <div className="flex items-center gap-4 mb-12">
                                        <div className="w-12 h-1 bg-maroon-600"></div>
                                        <h2 className="text-4xl font-display font-bold text-gray-900">Common <span className="text-maroon-600">Questions</span></h2>
                                    </div>
                                    <div className="space-y-6">
                                        {tourFaqs.map((faq, i) => (
                                            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100">
                                                <h4 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h4>
                                                <p className="text-gray-500 font-light leading-relaxed">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Traveler testimonials from the agency-wide review pool */}
                            {tourReviews.length > 0 && (
                                <section id="reviews">
                                    <div className="flex items-center gap-4 mb-12">
                                        <div className="w-12 h-1 bg-maroon-600"></div>
                                        <h2 className="text-4xl font-display font-bold text-gray-900">Traveler <span className="text-maroon-600">Reviews</span></h2>
                                    </div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <span className="text-3xl font-black text-gray-900">4.9</span>
                                        <span className="flex text-gold-500">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className="w-5 h-5 fill-gold-500" />
                                            ))}
                                        </span>
                                        <span className="text-gray-500 font-light">Guide India Tours — 403+ Google reviews</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {tourReviews.map((review) => (
                                            <div key={review.id} className="bg-white p-8 rounded-2xl border border-gray-100">
                                                <div className="flex items-center gap-1 text-gold-500 mb-3">
                                                    {Array.from({ length: review.rating }).map((_, i) => (
                                                        <Star key={i} className="w-4 h-4 fill-gold-500" />
                                                    ))}
                                                </div>
                                                <p className="text-gray-600 font-light leading-relaxed mb-4">&ldquo;{review.reviewText}&rdquo;</p>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-bold text-gray-900">{review.name}</span>
                                                    <span className="text-gray-400">{review.location}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32 space-y-8">
                                <Card className="rounded-3xl border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden bg-white">
                                    <div className="p-10 lg:p-12">
                                        <div className="flex items-center justify-between mb-8">
                                            <span className="text-[11px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-maroon-600">Secure Booking</span>
                                            <Badge className="bg-green-50 text-green-700 border-none font-black text-[11px] sm:text-[9px] uppercase tracking-widest">Available Now</Badge>
                                        </div>

                                        <div className="mb-10 text-center">
                                            <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-1">Transparent Pricing</p>
                                            <div className="flex items-baseline justify-center gap-2">
                                                <span className="text-3xl font-black text-gray-900">{priceLabel}</span>
                                                {isProgramme && <span className="text-gray-500 text-sm font-light">per person</span>}
                                            </div>
                                            <p className="text-gray-400 text-sm font-light mt-2">
                                                {isProgramme
                                                    ? "Indicative for the stated group size and season — final quote on WhatsApp within 2 hours."
                                                    : "Tailored to your dates, hotels & group size — free quote within 2 hours."}
                                            </p>
                                        </div>

                                        <BookingButton
                                            planTitle={plan.title}
                                            planId={plan.id}
                                            planDuration={plan.duration}
                                            className="w-full py-5 md:py-10 h-auto rounded-2xl bg-maroon-600 hover:bg-black text-white text-lg md:text-xl font-display font-bold shadow-2xl transition-all duration-500"
                                        />

                                        <div className="mt-8 space-y-4">
                                            <Link
                                                href="/contact#trip-planner"
                                                className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-maroon-600 transition-colors underline underline-offset-4"
                                            >
                                                Or build your trip in the planner
                                            </Link>
                                            <div className="flex items-center gap-3 text-sm font-bold text-gray-400 uppercase tracking-tighter justify-center">
                                                <Shield className="w-4 h-4 text-green-500" /> No Hidden Fees
                                            </div>
                                            <Link
                                                href="/about/avneesh-dixit"
                                                className="flex items-center justify-center gap-2 text-sm font-medium text-maroon-600 hover:text-maroon-700 transition-colors"
                                            >
                                                <Award className="w-4 h-4" /> Led by government-approved guides
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Sticky Booking Bar */}
            <StickyBookingBar planTitle={plan.title} priceLabel={priceLabel} />
        </main>
    );
}
export const dynamicParams = false;
export async function generateStaticParams() {
    return allPlans.map((plan) => ({
        id: getPlanPath(plan),
    }));
}
