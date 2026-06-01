import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
    title: 'Taj Mahal Tickets 2026: Prices, Categories & Where to Buy | Guide India Tours',
    description: 'Current Taj Mahal ticket prices for foreign, SAARC and Indian visitors, mausoleum entry, combo tickets and night viewing — explained by licensed Agra guides.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/taj-mahal-tickets',
        languages: {
            'en': 'https://www.guideindiatours.com/taj-mahal-tickets',
            'en-US': 'https://www.guideindiatours.com/taj-mahal-tickets',
            'en-GB': 'https://www.guideindiatours.com/taj-mahal-tickets',
            'en-IN': 'https://www.guideindiatours.com/taj-mahal-tickets',
            'x-default': 'https://www.guideindiatours.com/taj-mahal-tickets',
        },
    },
    openGraph: { title: 'Taj Mahal Tickets 2026', description: 'Prices, categories, where to buy, mausoleum entry and night viewing.', url: 'https://www.guideindiatours.com/taj-mahal-tickets', type: 'article', images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }] },
};

const faqs = [
    { q: 'How much is a Taj Mahal ticket for foreigners?', a: 'The Archaeological Survey of India charges foreign visitors ₹1,100 for entry to the Taj Mahal complex plus an additional ₹200 to enter the central mausoleum chamber, for a total of ₹1,300. Prices are subject to change — verify on the official ASI portal before your visit.' },
    { q: 'How much is a Taj Mahal ticket for Indian citizens?', a: 'Indian citizens pay ₹50 for entry to the complex plus ₹200 for the mausoleum, totalling ₹250. SAARC and BIMSTEC nationals pay ₹540 plus ₹200.' },
    { q: 'Are children free at the Taj Mahal?', a: 'Yes. Children under the age of 15 enter the Taj Mahal complex free of charge, regardless of nationality. They still need to be ticketed for the mausoleum chamber if you wish to enter it.' },
    { q: 'Can I buy Taj Mahal tickets online?', a: 'Yes. Tickets can be booked through the official ASI ticketing portal (asi.payumoney.com or tickets.tajmahal.gov.in). Buying online avoids the queue at the gate counters and is the recommended option, especially at sunrise.' },
    { q: 'Is there a combo ticket for Taj Mahal and Agra Fort?', a: 'Yes. A combined Agra monuments ticket is available that includes the Taj Mahal, Agra Fort, Fatehpur Sikri, Itimad-ud-Daulah and Akbar\'s Tomb (Sikandra) within a 24-hour window — useful if you are sightseeing across two days.' },
    { q: 'Are night viewing tickets sold at the gate?', a: 'No. Night viewing happens only on 5 nights per month around the full moon (excluded during Ramadan), and tickets must be booked at least 24 hours in advance from the ASI office in Agra. Capacity is limited and slots fill quickly.' },
];

const schema = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: 'Taj Mahal Tickets 2026', author: { '@type': 'Person', name: 'Avneesh Dixit', url: 'https://www.guideindiatours.com/about/avneesh-dixit' }, publisher: { '@id': 'https://www.guideindiatours.com/#organization' }, url: 'https://www.guideindiatours.com/taj-mahal-tickets', datePublished: '2026-06-01', dateModified: '2026-06-01', about: { '@id': 'https://www.guideindiatours.com/taj-mahal-guide#taj-mahal' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
];

const prices = [
    { label: 'Foreign visitor', complex: '₹1,100', mausoleum: '₹200', total: '₹1,300' },
    { label: 'SAARC / BIMSTEC', complex: '₹540', mausoleum: '₹200', total: '₹740' },
    { label: 'Indian citizen', complex: '₹50', mausoleum: '₹200', total: '₹250' },
    { label: 'Child under 15', complex: 'Free', mausoleum: '₹200 (optional)', total: 'Free (or ₹200)' },
];

export default function TajMahalTickets() {
    return (
        <main className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <PageHero
                breadcrumbs={[{ label: 'Taj Mahal Guide', href: '/taj-mahal-guide' }, { label: 'Tickets' }]}
                badge="Updated 2026"
                title="Taj Mahal Tickets"
                subtitle="Current prices for every visitor category, where to buy them, and how to skip the queue."
            />

            <section className="py-12 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-sm overflow-x-auto">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-4">Quick Answer</p>
                        <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">Current ticket prices (ASI, 2026)</h2>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <th className="py-3 pr-4">Category</th>
                                    <th className="py-3 pr-4">Complex entry</th>
                                    <th className="py-3 pr-4">Mausoleum</th>
                                    <th className="py-3">Total</th>
                                </tr>
                            </thead>
                            <tbody className="font-light text-gray-700">
                                {prices.map((p) => (
                                    <tr key={p.label} className="border-b border-gray-50">
                                        <td className="py-4 pr-4 font-semibold text-gray-900">{p.label}</td>
                                        <td className="py-4 pr-4">{p.complex}</td>
                                        <td className="py-4 pr-4">{p.mausoleum}</td>
                                        <td className="py-4 font-bold">{p.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-xs text-gray-400 italic mt-6">Prices are set by the Archaeological Survey of India and are subject to change. Verify on the official ASI portal before your visit.</p>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-3xl space-y-12 text-lg text-gray-600 font-light leading-relaxed">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Where to buy</h2>
                        <p>The cleanest option is to book online through the official ASI ticketing portals (<a href="https://asi.payumoney.com" rel="noopener" className="text-maroon-600 underline">asi.payumoney.com</a> or <a href="https://tickets.tajmahal.gov.in" rel="noopener" className="text-maroon-600 underline">tickets.tajmahal.gov.in</a>). You print or show the QR code at the gate and skip the cash counter queue.</p>
                        <p className="mt-4">Tickets are also sold at the East, West and South gate counters, but at sunrise these can build a 30-minute queue and they only accept cash (foreign exchange is not handled).</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">The mausoleum entry add-on</h2>
                        <p>The standard ticket gets you into the complex, gardens and onto the main platform. To step inside the central mausoleum chamber (where the cenotaphs of Mumtaz and Shah Jahan sit) you need the additional &#8377;200 mausoleum entry on top &mdash; this is the same for every visitor category.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Combo ticket: Taj + Agra Fort</h2>
                        <p>The combined Agra monuments ticket bundles the Taj Mahal with Agra Fort, Fatehpur Sikri, Itimad-ud-Daulah (the Baby Taj) and Sikandra (Akbar&apos;s Tomb). It is valid for 24 hours from the first entry, so it works best if you are sightseeing across a day or two.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Night viewing</h2>
                        <p>Night viewing of the Taj Mahal happens on 5 nights per month &mdash; the night of the full moon plus 2 nights either side &mdash; and is closed during the month of Ramadan. Tickets are issued by the ASI office in Agra (22 Mall Road) at least 24 hours in advance. Slots are limited to about 400 people per night, divided into 50-person batches of 30 minutes each.</p>
                    </div>

                    <p className="text-sm text-gray-400 italic border-t border-gray-100 pt-6">Source: <a href="https://www.tajmahal.gov.in/" rel="noopener" className="underline">tajmahal.gov.in</a> (Archaeological Survey of India). Always verify current rates and rules on the official portal.</p>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-gray-50">
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
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Skip the queue entirely.</h2>
                    <p className="text-white/70 font-light mb-8">Book a private Taj Mahal tour and we handle tickets, the best gate, and a government-approved guide.</p>
                    <Button asChild className="bg-gold-500 hover:bg-white text-black py-6 px-10 rounded-2xl text-lg font-bold h-auto">
                        <Link href="/plans" className="flex items-center gap-3">View Taj Mahal Tours <ArrowRight className="w-5 h-5" /></Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
