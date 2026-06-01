import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Camera, Ticket, Sunrise, Shirt, Calendar, ArrowRight, Award } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
    title: 'The Complete Taj Mahal Guide (2026) | Guide India Tours',
    description: 'Everything you need to visit the Taj Mahal: tickets, opening hours, dress code, photography rules, sunrise tips and best time to visit. Written by government-approved Agra guides.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/taj-mahal-guide',
        languages: {
            'en': 'https://www.guideindiatours.com/taj-mahal-guide',
            'en-US': 'https://www.guideindiatours.com/taj-mahal-guide',
            'en-GB': 'https://www.guideindiatours.com/taj-mahal-guide',
            'en-IN': 'https://www.guideindiatours.com/taj-mahal-guide',
            'x-default': 'https://www.guideindiatours.com/taj-mahal-guide',
        },
    },
    openGraph: {
        title: 'The Complete Taj Mahal Guide (2026)',
        description: 'Tickets, hours, dress code, photography rules, sunrise tips and more. Written by licensed Agra guides.',
        url: 'https://www.guideindiatours.com/taj-mahal-guide',
        type: 'article',
        images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
};

const tajAttractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': 'https://www.guideindiatours.com/taj-mahal-guide#taj-mahal',
    name: 'Taj Mahal',
    description: 'A 17th-century ivory-white marble mausoleum on the south bank of the Yamuna in Agra, India, commissioned in 1632 by Mughal emperor Shah Jahan to house the tomb of his wife Mumtaz Mahal. UNESCO World Heritage Site.',
    address: { '@type': 'PostalAddress', addressLocality: 'Agra', addressRegion: 'Uttar Pradesh', postalCode: '282001', addressCountry: 'IN' },
    geo: { '@type': 'GeoCoordinates', latitude: '27.1751', longitude: '78.0421' },
    sameAs: [
        'https://en.wikipedia.org/wiki/Taj_Mahal',
        'https://www.wikidata.org/wiki/Q9141',
        'https://whc.unesco.org/en/list/252/',
    ],
};

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Complete Taj Mahal Guide (2026)',
    description: 'Comprehensive visitor guide to the Taj Mahal: tickets, hours, dress code, photography, sunrise, best time to visit.',
    url: 'https://www.guideindiatours.com/taj-mahal-guide',
    image: 'https://www.guideindiatours.com/images/og-default.jpg',
    author: { '@type': 'Person', name: 'Avneesh Dixit', url: 'https://www.guideindiatours.com/about/avneesh-dixit', jobTitle: 'Government-Approved Tour Guide' },
    publisher: { '@type': 'Organization', '@id': 'https://www.guideindiatours.com/#organization', name: 'Guide India Tours' },
    about: { '@id': 'https://www.guideindiatours.com/taj-mahal-guide#taj-mahal' },
    datePublished: '2026-06-01',
    dateModified: '2026-06-01',
    inLanguage: 'en',
};

const faqs = [
    { q: 'Is the Taj Mahal closed on Fridays?', a: 'Yes. The Taj Mahal is closed to tourists every Friday so the on-site Taj Mahal Mosque can be used for Friday prayers. Plan your visit for any other day of the week.' },
    { q: 'How long do you need at the Taj Mahal?', a: 'Allow 2 to 3 hours for a comfortable visit: roughly 1 hour at the main mausoleum and platform, 30–45 minutes in the gardens, and time at the mosque and Mehmaan Khana on either side.' },
    { q: 'What is the best time of day to visit?', a: 'Sunrise offers the softest light, smallest crowds, and the iconic pink-to-gold colour change on the white marble. The half hour before and after sunrise is the photographic prime time.' },
    { q: 'Can you go inside the Taj Mahal mausoleum?', a: 'Yes. Visitors can enter the central mausoleum chamber with an additional mausoleum-entry ticket. Photography is not permitted inside the mausoleum itself.' },
    { q: 'Is the Taj Mahal a UNESCO World Heritage Site?', a: 'Yes. The Taj Mahal was inscribed on the UNESCO World Heritage list in 1983 and is protected and managed by the Archaeological Survey of India (ASI).' },
];

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

const cluster = [
    { href: '/taj-mahal-tickets', title: 'Taj Mahal Tickets', desc: 'Prices, where to buy, mausoleum entry, night viewing.', icon: Ticket },
    { href: '/taj-mahal-opening-hours', title: 'Opening Hours & Days', desc: 'Daily hours, Friday closures, night viewing schedule.', icon: Clock },
    { href: '/taj-mahal-sunrise-guide', title: 'Sunrise Visit Guide', desc: 'Why sunrise is best, when to arrive, gate strategy.', icon: Sunrise },
    { href: '/taj-mahal-photography-guide', title: 'Photography Guide', desc: 'Best spots, rules, camera tips, banned equipment.', icon: Camera },
    { href: '/taj-mahal-dress-code', title: 'Dress Code & Rules', desc: 'What to wear, shoe covers, prohibited items.', icon: Shirt },
    { href: '/taj-mahal-best-time-to-visit', title: 'Best Time to Visit', desc: 'Month-by-month, weather, crowds, fog warnings.', icon: Calendar },
];

export default function TajMahalGuide() {
    return (
        <main className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([tajAttractionSchema, articleSchema, faqSchema]) }} />

            <section className="relative pt-44 pb-24 bg-gradient-to-br from-royal-900 via-maroon-700 to-black text-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <Breadcrumbs items={[{ label: 'Taj Mahal Guide' }]} className="mb-8 text-white/70" />
                    <Badge className="bg-gold-500 text-black border-none mb-6 px-5 py-1.5 uppercase tracking-[0.3em] text-[10px] font-black">
                        Definitive Guide &middot; Updated 2026
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter leading-[0.95]">
                        The Complete Taj Mahal Guide
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl leading-relaxed">
                        Everything you need to visit one of the seven wonders of the world — tickets, hours, dress code, photography rules and insider tips, written by government-approved Agra guides.
                    </p>
                </div>
            </section>

            <section className="py-12 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-4">Quick Answer</p>
                        <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">The Taj Mahal at a glance</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-gray-700 font-light leading-relaxed">
                            <li><strong className="text-gray-900">Location:</strong> Agra, Uttar Pradesh, India</li>
                            <li><strong className="text-gray-900">Built:</strong> 1632&ndash;1653 by Shah Jahan</li>
                            <li><strong className="text-gray-900">Hours:</strong> Sunrise to sunset (closed Fridays)</li>
                            <li><strong className="text-gray-900">Foreign ticket:</strong> &#8377;1,100 + &#8377;200 mausoleum entry</li>
                            <li><strong className="text-gray-900">Best time:</strong> Sunrise, October&ndash;March</li>
                            <li><strong className="text-gray-900">Time needed:</strong> 2&ndash;3 hours</li>
                            <li><strong className="text-gray-900">UNESCO:</strong> Inscribed 1983</li>
                            <li><strong className="text-gray-900">Managed by:</strong> Archaeological Survey of India</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-3xl space-y-12 text-lg text-gray-600 font-light leading-relaxed">

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">What the Taj Mahal actually is</h2>
                        <p>
                            The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in Agra. It was commissioned by the Mughal emperor Shah Jahan in 1632 to house the tomb of his favourite wife, Mumtaz Mahal, and took roughly 20,000 craftsmen more than two decades to complete. It is a UNESCO World Heritage Site and one of the seven wonders of the modern world.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">When to go</h2>
                        <p>
                            The high season is October to March, when the weather is cool and clear. Visit at sunrise for the softest light, smallest crowds and the famous pink-to-gold colour shift on the marble. Avoid Fridays &mdash; the monument is closed for prayers &mdash; and the harshest summer months of May and June.
                        </p>
                        <p className="mt-4">See the full <Link href="/taj-mahal-best-time-to-visit" className="text-maroon-600 font-medium underline">month-by-month best time to visit</Link> breakdown.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Entry, gates and timing</h2>
                        <p>
                            Three gates lead into the outer complex: East, West and South. The East gate is the calmest entry for sunrise and is closest to the high-end hotels. The West gate is busiest with tour groups. Security is similar to an airport &mdash; large bags, food, tobacco, lighters and tripods are not allowed inside. See the full <Link href="/taj-mahal-opening-hours" className="text-maroon-600 font-medium underline">opening hours</Link> and <Link href="/taj-mahal-tickets" className="text-maroon-600 font-medium underline">tickets guide</Link>.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Inside the complex</h2>
                        <p>
                            Beyond the main mausoleum, the Taj Mahal complex includes the red sandstone mosque to the west, the matching Mehmaan Khana (guest house) to the east, the Char Bagh Mughal gardens divided by water channels, and the Great Gate (Darwaza-i-Rauza). The view from the central reflection pool and the famous &ldquo;Diana bench&rdquo; are the iconic photo locations &mdash; see our <Link href="/taj-mahal-photography-guide" className="text-maroon-600 font-medium underline">photography guide</Link>.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Practical tips from a licensed guide</h2>
                        <ul className="space-y-3 list-disc pl-6">
                            <li>Arrive 30 minutes before opening time to be near the front of the security line.</li>
                            <li>Carry your passport (or government ID for Indian nationals) &mdash; it is required at the ticket counter.</li>
                            <li>Wear comfortable shoes; shoe covers are provided at the mausoleum but you walk a lot before that.</li>
                            <li>Bring only a small bag, a phone and a camera. Most other items must be checked in.</li>
                            <li>Pre-book a government-approved guide rather than hire one at the gate &mdash; quality varies hugely.</li>
                        </ul>
                    </div>

                    <p className="text-sm text-gray-400 italic border-t border-gray-100 pt-6">
                        Sources: <a href="https://www.tajmahal.gov.in/" rel="noopener" className="underline">tajmahal.gov.in</a> (ASI), <a href="https://whc.unesco.org/en/list/252/" rel="noopener" className="underline">UNESCO World Heritage Centre</a>. Ticket prices and timings are subject to change &mdash; verify on the official ASI portal before booking.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4">Deep dives</h2>
                        <p className="text-gray-500 font-light">Detailed guides on every part of visiting the Taj Mahal.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cluster.map((c) => (
                            <Link key={c.href} href={c.href} className="group bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-maroon-600/10 flex items-center justify-center text-maroon-600 mb-6 group-hover:bg-maroon-600 group-hover:text-white transition-all">
                                    <c.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{c.title}</h3>
                                <p className="text-gray-500 font-light leading-relaxed mb-4">{c.desc}</p>
                                <span className="text-maroon-600 font-medium text-sm inline-flex items-center gap-1">Read guide <ArrowRight className="w-4 h-4" /></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28">
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

            <section className="py-20 md:py-28 bg-black text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
                        Visit the Taj Mahal with a <span className="text-gold-500">licensed local guide.</span>
                    </h2>
                    <p className="text-white/70 font-light text-lg mb-12">
                        Private Taj Mahal tours by government-approved guides &mdash; no markup, no group buses, fully customisable.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button asChild className="bg-gold-500 hover:bg-white text-black py-7 px-10 rounded-2xl text-lg font-bold h-auto">
                            <Link href="/plans" className="flex items-center gap-3">View Taj Mahal Tours <ArrowRight className="w-5 h-5" /></Link>
                        </Button>
                        <Button asChild variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-black py-7 px-10 rounded-2xl text-lg font-bold h-auto">
                            <Link href="/about/avneesh-dixit" className="flex items-center gap-3"><Award className="w-5 h-5" /> Meet your guide</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
