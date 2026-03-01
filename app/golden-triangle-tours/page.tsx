import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { allPlans } from '@/data/travelPlans';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { generateTouristDestinationSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schemaGenerator';
import {
    MapPin, Clock, Star, ArrowRight, Calendar,
    Users, Check, ChevronRight, Shield, Globe
} from 'lucide-react';

const goldenTriangleFaqs = [
    {
        question: "What is the Golden Triangle tour in India?",
        answer: "The Golden Triangle is India's most popular tourist circuit connecting three iconic cities: Delhi (India's capital), Agra (home of the Taj Mahal), and Jaipur (the Pink City of Rajasthan). The route forms a triangle on the map, with each side approximately 200-270 km. Our private Golden Triangle tours cover all three cities with expert guides, luxury hotels, and private AC transportation."
    },
    {
        question: "How many days do you need for the Golden Triangle?",
        answer: "We recommend 4-6 days for a comfortable Golden Triangle tour. A 4-day tour covers the highlights, while 5-6 days allow for deeper exploration including Fatehpur Sikri, Ranthambore tiger safari, or extra time at each destination. We also offer 3-day express options and 7-10 day extended tours with additional destinations."
    },
    {
        question: "What is the best time to visit the Golden Triangle?",
        answer: "October to March is the best time, with pleasant temperatures (10-25°C). November to February is peak season with the best weather. Avoid April-June (extreme heat, 40-45°C) and July-September (monsoon rains). Our guides help you make the most of any season."
    },
    {
        question: "How much does a Golden Triangle tour cost?",
        answer: "Our Golden Triangle tours start from $150 per person for budget options and go up to $500+ per person for luxury experiences. Prices include private AC car, licensed guides, hotel stays, and breakfast. The cost varies based on hotel category, tour duration, and group size. We offer transparent pricing with no hidden fees."
    },
    {
        question: "Is the Golden Triangle tour safe for solo travelers?",
        answer: "Absolutely! Many of our guests are solo travelers, couples, and families. All our tours include a private car with driver and a licensed guide who stays with you throughout the trip. We provide 24/7 WhatsApp support and can customize the tour to your comfort level."
    }
];

export const metadata: Metadata = {
    title: 'Golden Triangle Tours | Delhi Agra Jaipur Private Tour Packages | Guide India Tours',
    description: 'Book premium Golden Triangle tours covering Delhi, Agra & Jaipur. 4-10 day private packages with Taj Mahal, Amber Fort & Red Fort. From $150/person. 4.9/5 rated by 364+ travelers. Book now!',
    alternates: {
        canonical: 'https://guideindia.tours/golden-triangle-tours',
        languages: {
            'en-US': 'https://guideindia.tours/golden-triangle-tours',
            'en-GB': 'https://guideindia.tours/golden-triangle-tours',
            'x-default': 'https://guideindia.tours/golden-triangle-tours',
        },
    },
    openGraph: {
        title: 'Golden Triangle Tours India | Delhi Agra Jaipur Private Packages',
        description: 'Premium private Golden Triangle tours. Delhi, Agra & Jaipur with expert guides. From $150/person. 4.9/5 rated by 364+ travelers.',
        url: 'https://guideindia.tours/golden-triangle-tours',
        images: [{ url: 'https://guideindia.tours/images/og-default.jpg' }],
    },
};

export default function GoldenTriangleToursPage() {
    const goldenTrianglePlans = allPlans.filter(plan => {
        const text = `${plan.title} ${plan.description} ${plan.highlights?.join(' ')}`.toLowerCase();
        return text.includes('golden triangle') ||
            (text.includes('delhi') && text.includes('agra') && text.includes('jaipur'));
    }).slice(0, 9);

    const destinationSchema = generateTouristDestinationSchema({
        name: 'Golden Triangle India',
        description: 'The Golden Triangle is India\'s most popular tourist circuit connecting Delhi, Agra, and Jaipur — covering the Taj Mahal, Red Fort, Amber Fort, and more.',
        url: 'golden-triangle-tours',
        image: 'https://guideindia.tours/images/og-default.jpg',
        containedInPlace: 'India',
    });

    const faqSchema = generateFAQSchema(goldenTriangleFaqs);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://guideindia.tours' },
        { name: 'Golden Triangle Tours', url: 'https://guideindia.tours/golden-triangle-tours' },
    ]);

    const goldenTriangleHighlights = [
        "Taj Mahal — One of the Seven Wonders of the World",
        "Red Fort — UNESCO World Heritage Site in Delhi",
        "Amber Fort — Majestic hilltop fortress in Jaipur",
        "India Gate — Iconic war memorial in New Delhi",
        "Hawa Mahal — Palace of Winds in Jaipur",
        "Fatehpur Sikri — Abandoned Mughal capital near Agra",
        "Qutub Minar — Tallest brick minaret in the world",
        "City Palace — Royal residence and museum in Jaipur",
        "Chandni Chowk — Historic market in Old Delhi",
    ];

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Hero */}
            <section className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-black">
                <Image
                    src="/images/og-default.jpg"
                    alt="Golden Triangle India - Delhi, Agra, Jaipur Private Tours"
                    fill
                    className="object-cover opacity-60"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-600 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-16 md:pb-24">
                        <div className="max-w-4xl">
                            <Breadcrumbs items={[{ label: 'Golden Triangle Tours' }]} className="mb-6 text-white/80" />
                            <Badge className="bg-gold-500 text-black border-none px-4 py-1.5 font-black uppercase tracking-widest text-[10px] mb-6">
                                <Globe className="w-3 h-3 mr-1.5" /> India&apos;s #1 Tour Circuit
                            </Badge>
                            <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-6 leading-[0.85] tracking-tighter">
                                Golden Triangle <span className="text-gold-500">Tours</span>
                            </h1>
                            <p className="text-xl text-white/80 font-light max-w-2xl mb-8">
                                Delhi. Agra. Jaipur. Experience India&apos;s three most iconic cities with private guides, luxury hotels, and fully customizable itineraries.
                            </p>
                            <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
                                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-gold-500 fill-current" /> 4.9/5 Rating</span>
                                <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 364+ Happy Travelers</span>
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Best: Oct-Mar</span>
                                <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> No Hidden Fees</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Direct Answer */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <p className="text-lg text-gray-600 font-light leading-relaxed">
                        <strong className="text-gray-900">Golden Triangle tours by Guide India Tours</strong> cover India&apos;s three most famous cities — Delhi, Agra, and Jaipur — in 4 to 10 days with private transportation and licensed guides. The circuit starts in Delhi (Red Fort, India Gate, Qutub Minar), continues to Agra (Taj Mahal sunrise, Agra Fort, Fatehpur Sikri), and ends in Jaipur (Amber Fort, City Palace, Hawa Mahal). Packages start from <strong>$150 per person</strong> with luxury hotel stays and all-inclusive pricing. We serve {goldenTrianglePlans.length}+ Golden Triangle packages rated 4.9/5 by 364+ verified Google reviewers.
                    </p>
                </div>
            </section>

            {/* Route Overview */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-4xl font-display font-bold text-gray-900">The <span className="text-maroon-600">Route</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link href="/delhi-tours" className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-maroon-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-maroon-600 group-hover:text-white transition-all">
                                <span className="text-2xl font-display font-bold text-maroon-600 group-hover:text-white">1</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-maroon-600 transition-colors">Delhi</h3>
                            <p className="text-gray-500 font-light mb-4">India&apos;s capital — where ancient Mughal heritage meets modern grandeur.</p>
                            <span className="text-maroon-600 text-xs font-black uppercase tracking-widest flex items-center gap-1">
                                Delhi Tours <ChevronRight className="w-3 h-3" />
                            </span>
                        </Link>
                        <Link href="/agra-tours" className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-maroon-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-maroon-600 group-hover:text-white transition-all">
                                <span className="text-2xl font-display font-bold text-maroon-600 group-hover:text-white">2</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-maroon-600 transition-colors">Agra</h3>
                            <p className="text-gray-500 font-light mb-4">Home of the Taj Mahal — the world&apos;s greatest monument to love.</p>
                            <span className="text-maroon-600 text-xs font-black uppercase tracking-widest flex items-center gap-1">
                                Agra Tours <ChevronRight className="w-3 h-3" />
                            </span>
                        </Link>
                        <Link href="/jaipur-tours" className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-maroon-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-maroon-600 group-hover:text-white transition-all">
                                <span className="text-2xl font-display font-bold text-maroon-600 group-hover:text-white">3</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-maroon-600 transition-colors">Jaipur</h3>
                            <p className="text-gray-500 font-light mb-4">The Pink City — royal palaces, hilltop forts, and vibrant bazaars.</p>
                            <span className="text-maroon-600 text-xs font-black uppercase tracking-widest flex items-center gap-1">
                                Jaipur Tours <ChevronRight className="w-3 h-3" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-4xl font-display font-bold text-gray-900">Must-See <span className="text-maroon-600">Highlights</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {goldenTriangleHighlights.map((highlight, i) => (
                            <div key={i} className="flex items-start gap-4 bg-gray-50 p-6 rounded-3xl">
                                <div className="w-10 h-10 rounded-2xl bg-maroon-600/10 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-5 h-5 text-maroon-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{highlight.split(' — ')[0]}</h3>
                                    {highlight.includes(' — ') && (
                                        <p className="text-sm text-gray-500 mt-1">{highlight.split(' — ')[1]}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tour Plans */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-4xl font-display font-bold text-gray-900">Golden Triangle <span className="text-maroon-600">Packages</span></h2>
                    </div>
                    <p className="text-gray-500 font-light mb-12 ml-16">From express 4-day tours to luxury 10-day expeditions</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {goldenTrianglePlans.map((plan) => (
                            <Link key={plan.id} href={`/plans/${plan.id}`} className="group">
                                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image src={plan.image} alt={plan.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-white/90 backdrop-blur-md text-black border-none px-3 py-1 font-black text-[9px] uppercase tracking-widest">
                                                <Clock className="w-3 h-3 mr-1" /> {plan.duration}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-3.5 h-3.5 text-gold-500 fill-current" />
                                            <span className="text-xs font-bold text-gray-600">{plan.rating} ({plan.reviews})</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-maroon-600 transition-colors line-clamp-2">{plan.title}</h3>
                                        <p className="text-sm text-gray-500 font-light line-clamp-2">{plan.description.substring(0, 120)}...</p>
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                            <span className="text-2xl font-black text-gray-900">{plan.price}</span>
                                            <span className="text-maroon-600 text-xs font-black uppercase tracking-widest flex items-center gap-1">View <ChevronRight className="w-3 h-3" /></span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/plans">
                            <Button variant="outline" className="rounded-full px-8 py-6 font-bold text-sm uppercase tracking-widest">
                                View All Tour Plans <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-4xl font-display font-bold text-gray-900">Golden Triangle <span className="text-maroon-600">FAQ</span></h2>
                    </div>
                    <div className="space-y-6">
                        {goldenTriangleFaqs.map((faq, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                                <p className="text-gray-500 font-light leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cross-links */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display font-bold mb-12 text-center">Explore Each <span className="text-gold-500">Destination</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <Link href="/delhi-tours" className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">Delhi Tours</h3>
                            <p className="text-white/60 text-sm">Red Fort, India Gate & More</p>
                        </Link>
                        <Link href="/agra-tours" className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">Agra Tours</h3>
                            <p className="text-white/60 text-sm">Taj Mahal & Mughal Heritage</p>
                        </Link>
                        <Link href="/jaipur-tours" className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">Jaipur Tours</h3>
                            <p className="text-white/60 text-sm">Pink City & Royal Palaces</p>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
