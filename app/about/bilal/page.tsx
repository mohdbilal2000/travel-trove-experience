import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Award, Heart, Compass } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
    title: 'Bilal | Founder of Guide India Tours | Our Story Since 2004',
    description: 'Meet Bilal, the Agra-born founder of Guide India Tours. The story behind India\'s trusted Golden Triangle specialist — what we do, why we do it, and how we work.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/about/bilal',
        languages: {
            'en': 'https://www.guideindiatours.com/about/bilal',
            'en-US': 'https://www.guideindiatours.com/about/bilal',
            'en-GB': 'https://www.guideindiatours.com/about/bilal',
            'en-IN': 'https://www.guideindiatours.com/about/bilal',
            'x-default': 'https://www.guideindiatours.com/about/bilal',
        },
    },
    openGraph: { title: 'Bilal | Founder of Guide India Tours', description: 'Meet the Agra-born founder behind Guide India Tours. Our story since 2004.', url: 'https://www.guideindiatours.com/about/bilal', type: 'profile', images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }] },
};

const profileSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: 'https://www.guideindiatours.com/about/bilal',
    mainEntity: {
        '@type': 'Person',
        name: 'Bilal',
        jobTitle: 'Founder',
        worksFor: { '@type': 'TravelAgency', '@id': 'https://www.guideindiatours.com/#organization', name: 'Guide India Tours', url: 'https://www.guideindiatours.com' },
        founder: { '@id': 'https://www.guideindiatours.com/#organization' },
        url: 'https://www.guideindiatours.com/about/bilal',
        areaServed: ['Agra', 'Delhi', 'Jaipur', 'India'],
        knowsAbout: ['Golden Triangle Tours', 'Mughal Heritage', 'Private Tour Operations', 'Agra Tourism'],
    },
};

const pillars = [
    { icon: Award, title: 'Licensed and local', desc: 'Government-approved guides, born and raised in Agra. Not freelancers, not foreign agents.' },
    { icon: Heart, title: 'Direct, no markup', desc: 'We are the operator. You book direct, talk to the team that runs your tour, and pay no third-party fee.' },
    { icon: Compass, title: 'Fully customisable', desc: 'Every tour is private. We adjust the itinerary, the pace and the hotels to fit you — not a fixed package.' },
];

export default function BilalPage() {
    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />

            <PageHero
                breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Bilal' }]}
                badge="Founder · Since 2004"
                title="Bilal"
                subtitle="The Agra-born founder of Guide India Tours and the person behind India's most-trusted Golden Triangle specialist."
                meta={
                    <>
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-maroon-600" /> Based in Agra, India</span>
                        <span className="flex items-center gap-2"><Award className="w-4 h-4 text-maroon-600" /> Operating since 2004</span>
                    </>
                }
            />

            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-3xl space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                    <p>
                        Bilal founded Guide India Tours in <strong>2004</strong> from a single conviction: that the people who actually know Agra &mdash; the licensed local guides, the drivers who grew up on these roads, the team who lives within sight of the Taj Mahal &mdash; should be the ones running tours, not faceless aggregators selling the same trip on commission.
                    </p>
                    <p>
                        Twenty-plus years on, that conviction is the entire business model. Guide India Tours is operator-owned, the guides are government-approved (including lead guide <Link href="/about/avneesh-dixit" className="text-maroon-600 underline">Avneesh Dixit</Link>), and every tour you see on this site is one Bilal&apos;s team has run hundreds of times &mdash; not a re-sold package.
                    </p>
                    <p>
                        The promise is simple: you book direct, you talk to the actual operator, and you travel with a licensed local guide. No middlemen, no surprises.
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">What we believe</h2>
                        <p className="text-gray-500 uppercase tracking-[0.2em] text-xs font-black">Three principles</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pillars.map((p) => (
                            <div key={p.title} className="bg-white p-10 rounded-3xl shadow-sm">
                                <div className="w-14 h-14 rounded-2xl bg-maroon-600/10 flex items-center justify-center text-maroon-600 mb-6"><p.icon size={26} /></div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
                                <p className="text-gray-500 font-light leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-black text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
                        Travel with a real operator.
                    </h2>
                    <p className="text-white/70 font-light text-lg mb-12 max-w-2xl mx-auto">
                        Book a private Golden Triangle tour with Guide India Tours &mdash; designed and run by Bilal&apos;s team in Agra.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button asChild className="bg-gold-500 hover:bg-white text-black py-7 px-10 rounded-2xl text-lg font-bold h-auto">
                            <Link href="/plans" className="flex items-center gap-3">Explore Tour Plans <ArrowRight className="w-5 h-5" /></Link>
                        </Button>
                        <Button asChild variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-black py-7 px-10 rounded-2xl text-lg font-bold h-auto">
                            <Link href="/contact">Contact Bilal&apos;s team</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
