import { Metadata } from 'next';
import Link from 'next/link';
import { Award, Globe, Landmark, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Avneesh Dixit | Government-Approved Tour Guide | Guide India Tours',
    description:
        'Meet Avneesh Dixit, the government-approved lead guide at Guide India Tours. A licensed expert in Mughal history and the Golden Triangle, guiding in English, Hindi, German, French, Italian and Spanish.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/about/avneesh-dixit',
        languages: {
            'en': 'https://www.guideindiatours.com/about/avneesh-dixit',
            'en-US': 'https://www.guideindiatours.com/about/avneesh-dixit',
            'en-GB': 'https://www.guideindiatours.com/about/avneesh-dixit',
            'en-IN': 'https://www.guideindiatours.com/about/avneesh-dixit',
            'x-default': 'https://www.guideindiatours.com/about/avneesh-dixit',
        },
    },
    openGraph: {
        title: 'Avneesh Dixit | Government-Approved Tour Guide',
        description:
            'Licensed lead guide at Guide India Tours, specialising in the Golden Triangle and Mughal heritage. Multilingual, government-approved, and trusted by travelers worldwide.',
        url: 'https://www.guideindiatours.com/about/avneesh-dixit',
        siteName: 'Guide India Tours',
        type: 'profile',
        images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Avneesh Dixit | Government-Approved Tour Guide',
        description: 'Licensed, multilingual lead guide at Guide India Tours specialising in the Golden Triangle and Mughal heritage.',
    },
};

const profileSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    'url': 'https://www.guideindiatours.com/about/avneesh-dixit',
    'mainEntity': {
        '@type': 'Person',
        'name': 'Avneesh Dixit',
        'jobTitle': 'Government-Approved Tour Guide',
        'worksFor': {
            '@type': 'TravelAgency',
            '@id': 'https://www.guideindiatours.com/#organization',
            'name': 'Guide India Tours',
            'url': 'https://www.guideindiatours.com',
        },
        'knowsLanguage': ['English', 'Hindi', 'German', 'French', 'Italian', 'Spanish'],
        'knowsAbout': [
            'Mughal History',
            'Taj Mahal',
            'Golden Triangle Tours',
            'Agra Heritage',
            'Indian Architecture',
        ],
        'url': 'https://www.guideindiatours.com/about/avneesh-dixit',
        'areaServed': ['Agra', 'Delhi', 'Jaipur', 'India'],
    },
};

const credentials = [
    {
        icon: ShieldCheck,
        title: 'Government-Approved',
        description: 'Licensed and verified by the Ministry of Tourism, ensuring accurate history and a safe, professional experience.',
    },
    {
        icon: Globe,
        title: 'Six Languages',
        description: 'Guides in English, Hindi, German, French, Italian and Spanish, with cultural context for international travelers.',
    },
    {
        icon: Landmark,
        title: 'Mughal Heritage Expert',
        description: 'Deep specialisation in the Taj Mahal, Agra Fort, Fatehpur Sikri and the wider Golden Triangle.',
    },
    {
        icon: Award,
        title: 'Trusted by Travelers',
        description: 'Consistently rated five stars by guests for storytelling, patience and attention to detail.',
    },
];

export default function AvneeshDixitPage() {
    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
            />

            {/* Hero */}
            <section className="relative pt-44 pb-28 bg-gradient-to-br from-royal-900 via-maroon-700 to-black text-white overflow-hidden">
                <div className="container mx-auto px-4 max-w-5xl">
                    <Breadcrumbs
                        items={[{ label: 'About', href: '/about' }, { label: 'Avneesh Dixit' }]}
                        className="mb-8 text-white/70"
                    />
                    <Badge className="bg-gold-500 text-black border-none mb-8 px-6 py-2 uppercase tracking-[0.3em] text-[9px] font-black">
                        Government-Approved Guide
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[0.95] tracking-tighter">
                        Avneesh Dixit
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl leading-relaxed">
                        Lead guide at Guide India Tours — a licensed, multilingual expert in Mughal heritage and
                        the Golden Triangle of Delhi, Agra, and Jaipur.
                    </p>
                    <div className="flex flex-wrap items-center gap-6 mt-10 text-white/70 text-sm font-medium">
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold-500" /> Based in Agra, India</span>
                        <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-gold-500" /> Speaks 6 languages</span>
                    </div>
                </div>
            </section>

            {/* Bio */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-3xl space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                    <p>
                        Avneesh Dixit is the lead guide at Guide India Tours and a government-approved, licensed
                        tour guide. Born and raised in the shadow of the Taj Mahal, he has spent his career sharing
                        the living history of India&apos;s Golden Triangle with travelers from around the world.
                    </p>
                    <p>
                        His approach blends rigorous historical accuracy with genuine storytelling. Whether decoding
                        the calligraphy of the Taj Mahal, walking the ramparts of Agra Fort, or navigating the bazaars
                        of Jaipur&apos;s Pink City, Avneesh turns monuments into narratives — connecting Mughal
                        architecture, dynastic intrigue, and everyday Indian life.
                    </p>
                    <p>
                        Fluent in English, Hindi, German, French, Italian and Spanish, he tailors every tour to the
                        interests and pace of his guests. It is this combination of credentials, language skills, and
                        warmth that has earned Guide India Tours a 4.9/5 rating from hundreds of travelers.
                    </p>
                </div>
            </section>

            {/* Credentials */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">Why Travel With Avneesh</h2>
                        <p className="text-gray-500 uppercase tracking-[0.2em] text-xs font-black">Credentials &amp; expertise</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {credentials.map((c) => (
                            <div key={c.title} className="bg-white p-10 rounded-3xl shadow-sm flex gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-maroon-600/10 flex items-center justify-center text-maroon-600 flex-shrink-0">
                                    <c.icon size={26} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{c.title}</h3>
                                    <p className="text-gray-500 font-light leading-relaxed">{c.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 md:py-28 bg-black text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
                        Tour with a <span className="text-gold-500">licensed expert.</span>
                    </h2>
                    <p className="text-white/70 font-light text-lg mb-12 max-w-2xl mx-auto">
                        Book a private, guided journey through the Golden Triangle with Guide India Tours and travel
                        with government-approved guides like Avneesh Dixit.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button asChild className="bg-gold-500 hover:bg-white text-black py-7 px-10 rounded-2xl text-lg font-bold h-auto">
                            <Link href="/guide-booking" className="flex items-center gap-3">Book a Guide <ArrowRight className="w-5 h-5" /></Link>
                        </Button>
                        <Button asChild variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-black py-7 px-10 rounded-2xl text-lg font-bold h-auto">
                            <Link href="/plans">Explore Tour Plans</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
