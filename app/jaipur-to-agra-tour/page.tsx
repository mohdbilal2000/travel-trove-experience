import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
    title: 'Jaipur to Agra Tour 2026: Route, Time, En-Route Stops',
    description: 'Jaipur to Agra is 240 km, 4–5 hours by car via Fatehpur Sikri. Here is the route, the best en-route stops, and how to book a private guided tour.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/jaipur-to-agra-tour',
        languages: {
            'en': 'https://www.guideindiatours.com/jaipur-to-agra-tour',
            'en-US': 'https://www.guideindiatours.com/jaipur-to-agra-tour',
            'en-GB': 'https://www.guideindiatours.com/jaipur-to-agra-tour',
            'en-IN': 'https://www.guideindiatours.com/jaipur-to-agra-tour',
            'x-default': 'https://www.guideindiatours.com/jaipur-to-agra-tour',
        },
    },
    openGraph: { title: 'Jaipur to Agra Tour 2026', description: 'Route, time, en-route stops and private tour options.', url: 'https://www.guideindiatours.com/jaipur-to-agra-tour', type: 'article' },
};

const faqs = [
    { q: 'How far is Jaipur from Agra?', a: 'About 240 km by road via Bharatpur and Fatehpur Sikri. By private car, plan for 4–5 hours of driving — slightly more if you stop at Fatehpur Sikri en route, which we strongly recommend.' },
    { q: 'What is the best route from Jaipur to Agra?', a: 'NH-21 via Bharatpur and Fatehpur Sikri is the standard route and the most scenic. The road is reasonable, drops you straight into Agra from the west, and lets you tick off Fatehpur Sikri without any detour.' },
    { q: 'Should I stop at Fatehpur Sikri on the way?', a: 'Yes, almost everyone should. Fatehpur Sikri is a UNESCO-listed ghost city of red sandstone, the abandoned capital of Mughal emperor Akbar, sitting 35 km west of Agra exactly on the Jaipur road. A 2-hour visit fits naturally into the drive.' },
    { q: 'Is there a train from Jaipur to Agra?', a: 'Yes, several daily services including the Marudhar Express and the Jaipur–Agra Fort superfast — journey time 4–5 hours. Trains are fine but a private car is more flexible if you want to stop at Fatehpur Sikri or Bharatpur bird sanctuary.' },
    { q: 'Can I do Jaipur to Agra as part of a Golden Triangle tour?', a: 'Yes — this leg is the standard third day of a classic Golden Triangle itinerary (Delhi → Jaipur → Agra → Delhi). Most travelers do Jaipur sightseeing in the morning, drive to Agra in the afternoon with a Fatehpur Sikri stop, and overnight in Agra ready for a sunrise Taj visit the next day.' },
];

const tripSchema = {
    '@context': 'https://schema.org', '@type': 'TouristTrip',
    name: 'Jaipur to Agra Tour',
    description: 'Private guided transfer and tour from Jaipur to Agra via Fatehpur Sikri.',
    url: 'https://www.guideindiatours.com/jaipur-to-agra-tour',
    touristType: ['Sightseeing', 'Cultural', 'Historical'],
    itinerary: {
        '@type': 'ItemList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Jaipur pickup', description: 'Hotel pickup in Jaipur, typically mid-morning.' },
            { '@type': 'ListItem', position: 2, name: 'Drive towards Agra', description: 'NH-21 via Bharatpur, approximately 240 km.' },
            { '@type': 'ListItem', position: 3, name: 'Fatehpur Sikri', description: 'Guided visit to the UNESCO World Heritage site.' },
            { '@type': 'ListItem', position: 4, name: 'Continue to Agra', description: 'Drive into Agra, hotel check-in.' },
        ],
    },
    touristDestination: [
        { '@type': 'Place', name: 'Fatehpur Sikri', address: { '@type': 'PostalAddress', addressLocality: 'Fatehpur Sikri', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' } },
        { '@type': 'Place', '@id': 'https://www.guideindiatours.com/taj-mahal-guide#taj-mahal', name: 'Taj Mahal', address: { '@type': 'PostalAddress', addressLocality: 'Agra', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' } },
    ],
    provider: { '@id': 'https://www.guideindiatours.com/#organization' },
};

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

const stops = [
    { name: 'Fatehpur Sikri', distance: '35 km from Agra', what: 'UNESCO-listed abandoned Mughal capital. Red sandstone, mostly intact, fascinating. Allow 2 hours.' },
    { name: 'Bharatpur (Keoladeo Bird Sanctuary)', distance: '55 km from Agra', what: 'UNESCO bird sanctuary, world-class for winter migrations. Worth a stop October–February if you have time.' },
    { name: 'Abhaneri Stepwell (Chand Baori)', distance: '95 km from Jaipur (detour)', what: 'One of the deepest and most ornate stepwells in India. A short detour off the Jaipur side of the route.' },
];

export default function JaipurToAgraTour() {
    return (
        <main className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([tripSchema, faqSchema]) }} />

            <PageHero
                breadcrumbs={[{ label: 'Jaipur to Agra Tour' }]}
                badge="240 km · 4–5 hours"
                title="Jaipur to Agra Tour"
                subtitle="The third leg of the Golden Triangle, done right — with Fatehpur Sikri en route."
            />

            <section className="py-12 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-4">Quick Answer</p>
                        <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">Jaipur to Agra at a glance</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-gray-700 font-light">
                            <li><strong className="text-gray-900">Distance:</strong> 240 km via NH-21</li>
                            <li><strong className="text-gray-900">Drive time:</strong> 4&ndash;5 hours</li>
                            <li><strong className="text-gray-900">Best route:</strong> via Bharatpur and Fatehpur Sikri</li>
                            <li><strong className="text-gray-900">Recommended stop:</strong> Fatehpur Sikri (UNESCO)</li>
                            <li><strong className="text-gray-900">Train option:</strong> Marudhar / superfast services, 4&ndash;5 hours</li>
                            <li><strong className="text-gray-900">Best done as:</strong> the third day of a Golden Triangle tour</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-3xl space-y-12 text-lg text-gray-600 font-light leading-relaxed">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">The route, properly</h2>
                        <p>Out of Jaipur, NH-21 takes you east through Dausa and Bharatpur, joining the Agra approach from the west. The road is reasonable, though not expressway-grade. Most groups leave Jaipur after a mid-morning breakfast, do Fatehpur Sikri en route as a 2-hour stop, then arrive in Agra by late afternoon. The drive itself is unremarkable; the stops make it worth the time.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">En-route stops worth your time</h2>
                        <ul className="space-y-5">
                            {stops.map((s) => (
                                <li key={s.name} className="border-l-2 border-maroon-600/20 pl-4">
                                    <strong className="block text-gray-900 mb-1">{s.name}</strong>
                                    <span className="block text-sm text-gray-400 mb-1">{s.distance}</span>
                                    <span>{s.what}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Where this fits in a Golden Triangle tour</h2>
                        <p>This drive is the standard <strong>Day 3</strong> of a Delhi &rarr; Jaipur &rarr; Agra &rarr; Delhi loop. The smart sequence is: morning sightseeing in Jaipur (Amber Fort, City Palace), leave Jaipur after lunch, hit Fatehpur Sikri in late afternoon, check into Agra in the evening, and visit the Taj Mahal at sunrise the next morning. See our <Link href="/golden-triangle-tours" className="text-maroon-600 underline">Golden Triangle tours</Link>.</p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-12 text-center">Frequently asked questions</h2>
                    <div className="space-y-4">
                        {faqs.map((f, i) => (
                            <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                <summary className="cursor-pointer list-none px-8 py-6 flex items-center justify-between gap-4 text-lg font-bold text-gray-900">
                                    <span>{f.q}</span>
                                    <span className="text-maroon-600 transition-transform group-open:rotate-45 text-2xl leading-none flex-shrink-0">+</span>
                                </summary>
                                <div className="px-8 pb-8 -mt-2 text-gray-500 font-light leading-relaxed">{f.a}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-black text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Book a private Jaipur to Agra transfer.</h2>
                    <p className="text-white/70 font-light mb-8">Car, government-approved guide, Fatehpur Sikri stop, hotel-to-hotel.</p>
                    <Button asChild className="bg-gold-500 hover:bg-white text-black py-6 px-10 rounded-2xl text-lg font-bold h-auto">
                        <Link href="/plans" className="flex items-center gap-3">View Tours <ArrowRight className="w-5 h-5" /></Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
