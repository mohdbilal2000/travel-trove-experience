
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
    Car, Bed, Users, Coffee, ArrowRight, Star, Clock
} from "lucide-react";
import { allPlans } from "@/data/travelPlans";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PlanFilters from "@/components/plans/PlanFilters";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const { city } = await searchParams;
    const title = city && city !== 'All'
        ? `${city} Tour Packages | Premium Golden Triangle Tours India`
        : 'Tour Packages | Premium Golden Triangle Tours India';
    const description = city && city !== 'All'
        ? `Book private ${city} tours with expert guides. Explore the history and beauty of ${city} in luxury. Part of our curated Golden Triangle collection.`
        : 'Explore our curated tour plans for Delhi, Agra, Jaipur, and beyond. Private guides, luxury vehicles, and handpicked hotels for the ultimate India experience.';

    return {
        title,
        description,
        alternates: {
            canonical: city && city !== 'All' ? `https://guideindiatours.com/plans?city=${city}` : 'https://guideindiatours.com/plans',
            languages: {
                'en-US': 'https://guideindiatours.com/plans',
                'en-GB': 'https://guideindiatours.com/plans',
                'en-AU': 'https://guideindiatours.com/plans',
                'x-default': 'https://guideindiatours.com/plans',
            },
        },
        openGraph: {
            title,
            description,
            url: 'https://guideindiatours.com/plans',
            images: [{ url: 'https://guideindiatours.com/images/og-plans.jpg' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        }
    };
}

const planFeatures = [
    { icon: Car, title: "Private Transport", description: "Premium AC vehicles." },
    { icon: Bed, title: "Luxury Stays", description: "5-star hotels." },
    { icon: Users, title: "Expert Guides", description: "Govt-authorized specialists." },
    { icon: Coffee, title: "Fine Dining", description: "Authentic cuisines." }
];

interface PageProps {
    searchParams: Promise<{ city?: string }>;
}

export default async function PlansPage({ searchParams }: PageProps) {
    const { city } = await searchParams;

    const filteredPlans = !city || city === 'All'
        ? allPlans
        : allPlans.filter(plan =>
            plan.title.toLowerCase().includes(city.toLowerCase()) ||
            plan.description.toLowerCase().includes(city.toLowerCase()) ||
            plan.destinations?.some(d => d.toLowerCase() === city.toLowerCase())
        );

    return (
        <main className="min-h-screen bg-ivory-100">
            {/* Hero Section */}
            <section className="relative pt-44 pb-32 overflow-hidden bg-black">
                <Image
                    src="/images/agra/getty-images-Mfck6jSVcbY-unsplash.jpg"
                    alt="India Tour Plans Hero"
                    fill
                    className="object-cover opacity-50 grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-maroon-600/80 via-black to-black" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 mb-8 px-6 py-2 uppercase tracking-[0.2em] text-[10px] font-black">
                            Curated Travel Experiences
                        </Badge>
                        <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-8 leading-[0.9] tracking-tighter">
                            Our Signature <br /><span className="text-gold-500">Tour Plans</span>
                        </h1>
                        <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                            Experience the Golden Triangle and beyond in absolute luxury with our meticulously designed itineraries.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <Breadcrumbs items={[{ label: 'Tour Plans' }]} className="mb-12" />

                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-gray-100 pb-12">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                                Experience <span className="text-maroon-600">Authentic India</span>
                            </h2>
                            <p className="text-gray-500 font-light text-lg">
                                Filter by your preferred city or browse our most popular curated packages.
                            </p>
                        </div>
                        <PlanFilters />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                        {filteredPlans.map((plan) => (
                            <div key={plan.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
                                <Link href={`/plans/${plan.id}`} className="block relative h-72 overflow-hidden">
                                    <Image
                                        src={plan.image}
                                        alt={`${plan.title} - Tour to ${city || 'India'}`}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                                    {plan.popular && (
                                        <div className="absolute top-6 right-6 bg-gold-500 text-black text-[9px] font-black py-2 px-5 rounded-full shadow-xl uppercase tracking-widest z-10">
                                            Popular Choice
                                        </div>
                                    )}

                                    <div className="absolute bottom-6 left-8 right-8 z-10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-gold-500 fill-current" />)}
                                            </div>
                                            <span className="text-white/80 text-[9px] font-black uppercase tracking-widest">{plan.reviews} Reviews</span>
                                        </div>
                                        <p className="text-white text-xs font-bold flex items-center gap-2">
                                            <Clock className="w-3 h-3 text-gold-500" /> {plan.duration}
                                        </p>
                                    </div>
                                </Link>

                                <div className="p-10">
                                    <h3 className="text-2xl font-display font-bold text-gray-900 group-hover:text-maroon-600 transition-colors leading-tight mb-4 min-h-[3.5rem] line-clamp-2">
                                        {plan.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm font-light leading-relaxed mb-8 line-clamp-2">
                                        {plan.description}
                                    </p>

                                    <div className="flex items-center justify-between py-6 border-t border-gray-50">
                                        <div>
                                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">Starting From</span>
                                            <span className="text-3xl font-black text-maroon-600">{plan.price}</span>
                                        </div>
                                        <Button asChild className="rounded-2xl bg-maroon-600 hover:bg-black w-14 h-14 p-0 shadow-xl shadow-maroon-600/20 transition-all duration-300">
                                            <Link href={`/plans/${plan.id}`}>
                                                <ArrowRight className="w-6 h-6" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPlans.length === 0 && (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold text-gray-400">No tours found matching your selection.</h3>
                            <Button variant="link" asChild className="mt-4 text-maroon-600">
                                <Link href="/plans">View all tour plans</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Summary Section for AEO */}
            <section className="py-24 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 text-center underline decoration-gold-500 underline-offset-8">
                        Why Choose Our Tour Packages?
                    </h2>
                    <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed">
                        <p className="mb-6">
                            Our tour packages are more than just itineraries; they are carefully crafted experiences designed to show you the heart and soul of India. From the majestic Taj Mahal in Agra to the colorful streets of Jaipur and the spiritual ghats of Varanasi, we ensure every detail is covered.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-2">Expert Local Guides</h4>
                                <p className="text-sm">Licensed by the Ministry of Tourism, our guides provide deep historical context you won't find in guidebooks.</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-2">Bespoke Logistics</h4>
                                <p className="text-sm">Travel in premium, air-conditioned vehicles with professional chauffeurs who prioritize your safety and comfort.</p>
                            </div>
                        </div>
                        <p>
                            Whether you're visiting for a single day or a multi-week adventure, our commitment to quality remains the same. Explore the Golden Triangle with the authority of Guide India Tours.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
