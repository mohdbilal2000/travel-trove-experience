
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
    Check, Clock, Star, MapPin, Calendar,
    Shield, Award, Users, Globe, ArrowLeft,
    ChevronRight, Info, HelpCircle
} from "lucide-react";
import { getPlanById, allPlans } from "@/data/travelPlans";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AtAGlance from "./_components/AtAGlance";
import BookingButton from "./_components/BookingButton";
import StickyBookingBar from "./_components/StickyBookingBar";
import { generateTourPackageSchema, generateFAQSchema } from "@/lib/schemaGenerator";

export const revalidate = 3600; // Revalidate every hour

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const plan = getPlanById(parseInt(id));

    if (!plan) {
        return {
            title: 'Tour Not Found | Guide India Tours',
        };
    }

    const title = `${plan.title} | Premium India Tour Packages`;
    const description = `${plan.description.substring(0, 155)}... Book your dream ${plan.duration} tour to ${plan.destinations?.join(', ') || 'India'} with expert guides.`;

    return {
        title,
        description,
        alternates: {
            canonical: `https://guideindiatours.com/plans/${id}`,
            languages: {
                'en-US': `https://guideindiatours.com/plans/${id}`,
                'en-GB': `https://guideindiatours.com/plans/${id}`,
                'x-default': `https://guideindiatours.com/plans/${id}`,
            },
        },
        openGraph: {
            title,
            description,
            url: `https://guideindiatours.com/plans/${id}`,
            images: [
                {
                    url: plan.image.startsWith('http') ? plan.image : `https://guideindiatours.com${plan.image}`,
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
            images: [plan.image.startsWith('http') ? plan.image : `https://guideindiatours.com${plan.image}`],
        },
    };
}

export default async function PlanDetailPage({ params }: PageProps) {
    const { id } = await params;
    const plan = getPlanById(parseInt(id));

    if (!plan) {
        notFound();
    }

    // Prepare Schema
    const tourSchema = generateTourPackageSchema({
        name: plan.title,
        description: plan.description,
        price: plan.price,
        image: plan.image.startsWith('http') ? plan.image : `https://guideindiatours.com${plan.image}`,
        duration: plan.duration,
        itinerary: plan.itinerary,
        destinations: plan.destinations
    }, {
        name: "Guide India Tours",
        url: "https://guideindiatours.com"
    });

    const faqSchema = plan.faqs ? generateFAQSchema(plan.faqs) : null;

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-black">
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
                                <Badge className="bg-gold-500 text-black border-none px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">
                                    <Star className="w-3 h-3 mr-1.5 fill-black" /> {plan.rating} ({plan.reviews} Reviews)
                                </Badge>
                                <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">
                                    <Clock className="w-3 h-3 mr-1.5" /> {plan.duration}
                                </Badge>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-8 leading-[0.85] tracking-tighter">
                                {plan.title}
                            </h1>
                            <div className="flex items-center gap-8 text-white/90">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest block mb-1 opacity-60">Starting Point</span>
                                    <span className="text-3xl font-black text-gold-500">{plan.price}</span>
                                    <span className="opacity-60 text-sm ml-2">/ per person</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                        {/* Left Main Content */}
                        <div className="lg:col-span-8 space-y-20">

                            {/* At a Glance - AI Priority */}
                            <section id="at-a-glance">
                                <AtAGlance
                                    duration={plan.duration}
                                    price={plan.price}
                                    highlights={plan.highlights}
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

                            {/* Detailed Itinerary */}
                            <section id="itinerary">
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-12 h-1 bg-maroon-600"></div>
                                    <h2 className="text-4xl font-display font-bold text-gray-900">Your <span className="text-maroon-600">Journey</span></h2>
                                </div>
                                <div className="space-y-4">
                                    {plan.itinerary.map((item, index) => (
                                        <div key={index} className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm group hover:shadow-xl transition-all duration-500">
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
                                                                <Badge variant="outline" className="px-4 py-2 rounded-xl border-gray-100 bg-gray-50 text-gray-600 font-bold text-[10px] uppercase tracking-wider">
                                                                    Meals: {item.meals}
                                                                </Badge>
                                                            )}
                                                            {item.accommodation && (
                                                                <Badge variant="outline" className="px-4 py-2 rounded-xl border-gray-100 bg-gray-50 text-gray-600 font-bold text-[10px] uppercase tracking-wider">
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
                            {plan.faqs && plan.faqs.length > 0 && (
                                <section id="faqs">
                                    <div className="flex items-center gap-4 mb-12">
                                        <div className="w-12 h-1 bg-maroon-600"></div>
                                        <h2 className="text-4xl font-display font-bold text-gray-900">Common <span className="text-maroon-600">Questions</span></h2>
                                    </div>
                                    <div className="space-y-6">
                                        {plan.faqs.map((faq, i) => (
                                            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100">
                                                <h4 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h4>
                                                <p className="text-gray-500 font-light leading-relaxed">{faq.answer}</p>
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
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-maroon-600">Secure Booking</span>
                                            <Badge className="bg-green-50 text-green-700 border-none font-black text-[9px] uppercase tracking-widest">Available Now</Badge>
                                        </div>

                                        <div className="mb-10 text-center">
                                            <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-1">Transparent Pricing</p>
                                            <div className="flex items-baseline justify-center gap-2">
                                                <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                                                <span className="text-gray-400 font-medium">/ person</span>
                                            </div>
                                        </div>

                                        <BookingButton
                                            planTitle={plan.title}
                                            planId={plan.id}
                                            planDuration={plan.duration}
                                            planPrice={plan.price}
                                            className="w-full py-10 rounded-2xl bg-maroon-600 hover:bg-black text-white text-xl font-display font-bold shadow-2xl transition-all duration-500"
                                        />

                                        <div className="mt-8 space-y-4">
                                            <div className="flex items-center gap-3 text-sm font-bold text-gray-400 uppercase tracking-tighter justify-center">
                                                <Shield className="w-4 h-4 text-green-500" /> No Hidden Fees
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Sticky Booking Bar */}
            <StickyBookingBar planTitle={plan.title} planPrice={plan.price} />
        </main>
    );
}

export async function generateStaticParams() {
    return allPlans.map((plan) => ({
        id: plan.id.toString(),
    }));
}
