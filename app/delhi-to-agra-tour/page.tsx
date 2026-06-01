import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Car, Train, Bus, Plane } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
    title: 'Delhi to Agra Tour 2026: Same Day, Overnight, Options & Cost',
    description: 'Delhi to Agra is 230 km on the Yamuna Expressway — 3–4 hours by private car. Compare same-day vs overnight, train vs car, and book a private guided tour.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/delhi-to-agra-tour',
        languages: {
            'en': 'https://www.guideindiatours.com/delhi-to-agra-tour',
            'en-US': 'https://www.guideindiatours.com/delhi-to-agra-tour',
            'en-GB': 'https://www.guideindiatours.com/delhi-to-agra-tour',
            'en-IN': 'https://www.guideindiatours.com/delhi-to-agra-tour',
            'x-default': 'https://www.guideindiatours.com/delhi-to-agra-tour',
        },
    },
    openGraph: { title: 'Delhi to Agra Tour 2026', description: 'Same day vs overnight, train vs car, cost comparison and itinerary.', url: 'https://www.guideindiatours.com/delhi-to-agra-tour', type: 'article' },
};

const faqs = [
    { q: 'How long does it take to get from Delhi to Agra?', a: 'By private car on the Yamuna Expressway, 3–4 hours. By the Gatimaan Express train, 1 hour 40 minutes. By non-expressway road, 5 hours plus. By bus, 5–6 hours.' },
    { q: 'Is a Delhi to Agra same-day tour worth it?', a: 'Yes, if your time in India is tight. It is a long day (12–15 hours door to door) but completely doable. You leave Delhi pre-dawn, are at the Taj for sunrise or mid-morning, see Agra Fort after lunch, and are back in Delhi by evening.' },
    { q: 'Should I take the train or hire a car?', a: 'The Gatimaan Express is fast and comfortable but only runs once a day each way and you still need transport in Agra. A private car door-to-door is more flexible, lets you stop at Fatehpur Sikri or roadside dhabas, and works for groups. Most travelers prefer car for the freedom.' },
    { q: 'How much does a Delhi–Agra tour cost?', a: 'Pricing depends on hotel category, group size and inclusions. As a benchmark, a private same-day tour with car, government-approved guide, monument tickets and lunch starts in the lower hundreds of US dollars per person. See our tour plans for transparent per-person pricing.' },
    { q: 'Is there a flight from Delhi to Agra?', a: 'Yes — Agra Airport (Kheria, AGR) handles limited domestic flights, but schedules are inconsistent and the airport is small. For practical purposes, almost every traveler chooses car or train over flight.' },
    { q: 'Can you visit Taj Mahal and Agra Fort in one day from Delhi?', a: 'Yes, this is the standard same-day itinerary: Taj Mahal in the morning (sunrise if you leave early enough), lunch in Agra, Agra Fort in the afternoon, then drive back to Delhi. Adding Fatehpur Sikri on the return makes for a long but rich day.' },
];

const tripSchema = {
    '@context': 'https://schema.org', '@type': 'TouristTrip',
    name: 'Delhi to Agra Same-Day Tour',
    description: 'Private guided tour from Delhi to Agra and back, covering the Taj Mahal and Agra Fort with a government-approved guide.',
    url: 'https://www.guideindiatours.com/delhi-to-agra-tour',
    touristType: ['Sightseeing', 'Cultural', 'Historical'],
    itinerary: {
        '@type': 'ItemList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Delhi pickup', description: 'Hotel pickup in Delhi between 02:30 and 06:00 depending on visit type.' },
            { '@type': 'ListItem', position: 2, name: 'Drive to Agra', description: 'Yamuna Expressway, approximately 230 km / 3–4 hours.' },
            { '@type': 'ListItem', position: 3, name: 'Taj Mahal visit', description: 'Guided visit with a government-approved guide.' },
            { '@type': 'ListItem', position: 4, name: 'Lunch in Agra', description: 'At a recommended local restaurant.' },
            { '@type': 'ListItem', position: 5, name: 'Agra Fort', description: 'Guided visit to the Mughal fort.' },
            { '@type': 'ListItem', position: 6, name: 'Return to Delhi', description: 'Drive back via Yamuna Expressway.' },
        ],
    },
    touristDestination: [
        { '@type': 'Place', '@id': 'https://www.guideindiatours.com/taj-mahal-guide#taj-mahal', name: 'Taj Mahal', address: { '@type': 'PostalAddress', addressLocality: 'Agra', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' } },
        { '@type': 'Place', name: 'Agra Fort', address: { '@type': 'PostalAddress', addressLocality: 'Agra', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' } },
    ],
    provider: { '@id': 'https://www.guideindiatours.com/#organization' },
};

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

const options = [
    { mode: 'Private car', icon: Car, time: '3–4 hours', verdict: 'Best for most', note: 'Door-to-door flexibility, lets you stop at Fatehpur Sikri, works for groups.' },
    { mode: 'Gatimaan Express train', icon: Train, time: '1h 40m', verdict: 'Fast but fixed', note: 'One service each way per day. You still need transport in Agra.' },
    { mode: 'Bus', icon: Bus, time: '5–6 hours', verdict: 'Cheapest, slowest', note: 'Volvo AC services from Sarai Kale Khan. Not recommended for sightseeing trips.' },
    { mode: 'Flight', icon: Plane, time: '~50 min flight', verdict: 'Impractical', note: 'Limited Agra airport schedules; car or train always wins on time door-to-door.' },
];

export default function DelhiToAgraTour() {
    return (
        <main className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([tripSchema, faqSchema]) }} />

            <PageHero
                breadcrumbs={[{ label: 'Delhi to Agra Tour' }]}
                badge="230 km · 3–4 hours"
                title="Delhi to Agra Tour"
                subtitle="Same-day or overnight, train or car — here is exactly how to do Delhi to Agra and back, properly."
            />

            <section className="py-12 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-4">Quick Answer</p>
                        <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">Delhi to Agra at a glance</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-gray-700 font-light">
                            <li><strong className="text-gray-900">Distance:</strong> 230 km via Yamuna Expressway</li>
                            <li><strong className="text-gray-900">Drive time:</strong> 3&ndash;4 hours</li>
                            <li><strong className="text-gray-900">Fastest train:</strong> Gatimaan Express, 1h 40m</li>
                            <li><strong className="text-gray-900">Same-day tour:</strong> 12&ndash;15 hours door to door</li>
                            <li><strong className="text-gray-900">Best route:</strong> Pre-dawn pickup &rarr; Taj at sunrise</li>
                            <li><strong className="text-gray-900">Add-on:</strong> Fatehpur Sikri on the return</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-12">How to get from Delhi to Agra</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {options.map((o) => (
                            <div key={o.mode} className="bg-white border border-gray-100 rounded-2xl p-6 flex gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-maroon-600/10 flex items-center justify-center text-maroon-600 flex-shrink-0"><o.icon size={24} /></div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1"><h3 className="text-xl font-display font-bold text-gray-900">{o.mode}</h3><span className="text-xs font-bold text-gray-400">{o.time}</span></div>
                                    <Badge className="bg-maroon-600/10 text-maroon-600 border-none text-[10px] font-black uppercase tracking-widest mb-3">{o.verdict}</Badge>
                                    <p className="text-gray-500 font-light leading-relaxed text-base">{o.note}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl space-y-12 text-lg text-gray-600 font-light leading-relaxed">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Same-day Delhi to Agra itinerary</h2>
                        <ol className="space-y-3 list-decimal pl-6">
                            <li><strong className="text-gray-900">02:30 – Delhi pickup.</strong> Hotel pickup, drive Yamuna Expressway.</li>
                            <li><strong className="text-gray-900">06:00 – Arrive Agra, breakfast.</strong></li>
                            <li><strong className="text-gray-900">06:30 – Taj Mahal at sunrise.</strong> Full guided visit, ~2 hours.</li>
                            <li><strong className="text-gray-900">09:30 – Check-in lounge or hotel.</strong> Fresh up.</li>
                            <li><strong className="text-gray-900">11:00 – Agra Fort.</strong> Full guided visit.</li>
                            <li><strong className="text-gray-900">13:30 – Lunch.</strong> Recommended local restaurant.</li>
                            <li><strong className="text-gray-900">15:00 – Fatehpur Sikri (optional add-on).</strong></li>
                            <li><strong className="text-gray-900">18:30 – Drive back to Delhi.</strong> Arrive by ~22:00.</li>
                        </ol>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Or stay the night — and do it relaxed</h2>
                        <p>If you can spare 24 hours, overnight in Agra is the better experience. Check in the evening before, do Taj at sunrise the next day with no exhaustion, then Agra Fort and Itimad-ud-Daulah at your own pace, and drive back to Delhi or onwards to Jaipur in the afternoon. The East-gate hotels (Oberoi Amarvilas, ITC Mughal, Trident) let you walk to the Taj gate.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Why book this as a private guided tour</h2>
                        <p>Self-driving the Yamuna Expressway is fine on paper but Indian highway driving is not for first-timers. Renting a cab without a guide leaves you queueing at the ticket counter and missing the history that makes the Taj make sense. A private tour means the car, the driver, the guide, the tickets and the timing are all handled &mdash; you just show up.</p>
                    </div>
                </div>
            </section>

            <section className="py-20">
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
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Book a private Delhi to Agra tour.</h2>
                    <p className="text-white/70 font-light mb-8">Car, government-approved guide, tickets and timing handled. Same day or overnight.</p>
                    <Button asChild className="bg-gold-500 hover:bg-white text-black py-6 px-10 rounded-2xl text-lg font-bold h-auto">
                        <Link href="/plans" className="flex items-center gap-3">View Delhi&ndash;Agra Tours <ArrowRight className="w-5 h-5" /></Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
