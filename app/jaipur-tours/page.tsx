import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { allPlans } from '@/data/travelPlans';
import { getDestinationBySlug } from '@/data/destinations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { generateTouristDestinationSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schemaGenerator';
import {
    MapPin, Clock, Star, ArrowRight, Calendar,
    Users, Check, ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Jaipur Tours | Pink City Private Guided Tours & Rajasthan Trips | Guide India Tours',
    description: 'Explore Jaipur with expert guides. Visit Amber Fort, City Palace, Hawa Mahal & Jantar Mantar. Private Rajasthan tours from $35/person. Book your Jaipur tour today!',
    alternates: {
        canonical: 'https://guideindia.tours/jaipur-tours',
        languages: {
            'en-US': 'https://guideindia.tours/jaipur-tours',
            'en-GB': 'https://guideindia.tours/jaipur-tours',
            'x-default': 'https://guideindia.tours/jaipur-tours',
        },
    },
    openGraph: {
        title: 'Jaipur Tours | Pink City Private Guided Tours',
        description: 'Private Jaipur tours visiting Amber Fort, City Palace, Hawa Mahal. Expert guides, luxury transport. 4.8/5 rated.',
        url: 'https://guideindia.tours/jaipur-tours',
        images: [{ url: 'https://guideindia.tours/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg' }],
    },
};

export default function JaipurToursPage() {
    const destination = getDestinationBySlug('jaipur');
    const jaipurPlans = allPlans.filter(plan => {
        const text = `${plan.title} ${plan.description} ${plan.highlights?.join(' ')}`.toLowerCase();
        return (text.includes('jaipur') || text.includes('pink city') || text.includes('rajasthan')) && !text.includes('golden triangle');
    }).slice(0, 8);

    const allJaipurPlans = allPlans.filter(plan => {
        const text = `${plan.title} ${plan.description}`.toLowerCase();
        return text.includes('jaipur') || text.includes('rajasthan');
    });

    const destinationSchema = generateTouristDestinationSchema({
        name: 'Jaipur',
        description: 'Explore Jaipur, the Pink City of Rajasthan, with private guided tours of royal palaces, ancient forts, and vibrant bazaars.',
        url: 'jaipur-tours',
        image: 'https://guideindia.tours/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg',
        containedInPlace: 'India',
        geo: { lat: '26.9124', long: '75.7873' },
    });

    const faqSchema = destination?.faqs ? generateFAQSchema(destination.faqs) : null;
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://guideindia.tours' },
        { name: 'Jaipur Tours', url: 'https://guideindia.tours/jaipur-tours' },
    ]);

    return (
        <main className="bg-ivory-100 min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }} />
            {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Hero */}
            <section className="relative h-[60vh] md:h-[75vh] overflow-hidden bg-black">
                <Image
                    src="/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg"
                    alt="Hawa Mahal Palace of Winds - Private Jaipur Tours"
                    fill
                    className="object-cover opacity-70"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-16 md:pb-24">
                        <div className="max-w-4xl">
                            <Breadcrumbs items={[{ label: 'Jaipur Tours' }]} className="mb-6 text-white/80" />
                            <Badge className="bg-gold-500 text-black border-none px-4 py-1.5 font-black uppercase tracking-widest text-[10px] mb-6">
                                <MapPin className="w-3 h-3 mr-1.5" /> Jaipur, India
                            </Badge>
                            <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-6 leading-[0.85] tracking-tighter">
                                Jaipur <span className="text-gold-500">Tours</span>
                            </h1>
                            <p className="text-xl text-white/80 font-light max-w-2xl mb-8">
                                Step into the Pink City&apos;s royal heritage. Explore magnificent forts, ornate palaces, and vibrant bazaars with expert Rajasthan guides.
                            </p>
                            <div className="flex items-center gap-6 text-white/70 text-sm">
                                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-gold-500 fill-current" /> 4.8/5 Rating</span>
                                <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 156+ Happy Travelers</span>
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Best: Oct-Mar</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Direct Answer */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <p className="text-lg text-gray-600 font-light leading-relaxed">
                        <strong className="text-gray-900">Jaipur tours by Guide India Tours</strong> offer immersive private experiences through Rajasthan&apos;s royal capital. Our guided tours cover Amber Fort (with optional elephant/jeep ride), City Palace, Hawa Mahal (Palace of Winds), and Jantar Mantar astronomical observatory. We also offer Jaipur shopping tours for jewelry, textiles, and handicrafts with visits to trusted artisan workshops. Tours start from <strong>$35 per person</strong> with {allJaipurPlans.length}+ packages available, all rated 4.8/5.
                    </p>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-maroon-600" />
                        <h2 className="text-4xl font-display font-bold text-gray-900">Jaipur <span className="text-maroon-600">Highlights</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destination?.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <div className="w-10 h-10 rounded-2xl bg-maroon-600/10 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-5 h-5 text-maroon-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{highlight.split(' - ')[0]}</h3>
                                    {highlight.includes(' - ') && (
                                        <p className="text-sm text-gray-500 mt-1">{highlight.split(' - ')[1]}</p>
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
                        <h2 className="text-4xl font-display font-bold text-gray-900">Jaipur Tour <span className="text-maroon-600">Packages</span></h2>
                    </div>
                    <p className="text-gray-500 font-light mb-12 ml-16">Royal heritage tours, shopping experiences, and multi-day Rajasthan itineraries</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jaipurPlans.map((plan) => (
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
            {destination?.faqs && destination.faqs.length > 0 && (
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-1 bg-maroon-600" />
                            <h2 className="text-4xl font-display font-bold text-gray-900">Jaipur Tours <span className="text-maroon-600">FAQ</span></h2>
                        </div>
                        <div className="space-y-6">
                            {destination.faqs.map((faq, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                                    <p className="text-gray-500 font-light leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Cross-links */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display font-bold mb-12 text-center">Continue Your <span className="text-gold-500">Golden Triangle</span> Journey</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <Link href="/delhi-tours" className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">Delhi Tours</h3>
                            <p className="text-white/60 text-sm">Ancient Meets Modern Capital</p>
                        </Link>
                        <Link href="/agra-tours" className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">Agra Tours</h3>
                            <p className="text-white/60 text-sm">Taj Mahal & Mughal Heritage</p>
                        </Link>
                        <Link href="/golden-triangle-tours" className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-center">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gold-500 transition-colors">Golden Triangle</h3>
                            <p className="text-white/60 text-sm">Delhi + Agra + Jaipur Combined</p>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
