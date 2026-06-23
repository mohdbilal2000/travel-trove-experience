import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
    title: 'Taj Mahal Sunrise Guide 2026: When to Arrive, Which Gate, What to Bring',
    description: 'Why sunrise is the best time at the Taj Mahal — month-by-month sunrise times, which gate to use, how to get there from Delhi, and what to bring.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/taj-mahal-sunrise-guide',
        languages: {
            'en': 'https://www.guideindiatours.com/taj-mahal-sunrise-guide',
            'en-US': 'https://www.guideindiatours.com/taj-mahal-sunrise-guide',
            'en-GB': 'https://www.guideindiatours.com/taj-mahal-sunrise-guide',
            'en-IN': 'https://www.guideindiatours.com/taj-mahal-sunrise-guide',
            'x-default': 'https://www.guideindiatours.com/taj-mahal-sunrise-guide',
        },
    },
    openGraph: { title: 'Taj Mahal Sunrise Guide 2026', description: 'Why sunrise wins, when to arrive, which gate, and how to get there.', url: 'https://www.guideindiatours.com/taj-mahal-sunrise-guide', type: 'article' },
};

const faqs = [
    { q: 'Why is sunrise the best time at the Taj Mahal?', a: 'Three reasons: the marble shifts colour from soft pink to gold to white during the first hour of light, the crowds are a tiny fraction of the mid-day load, and the temperature is cool enough to walk the gardens in comfort. Photographers, especially, get their best shots in this window.' },
    { q: 'What time does the Taj Mahal open for sunrise?', a: 'Gates accept visitors from roughly 30 minutes before sunrise. That means around 06:30 in winter and as early as 05:45 in peak summer. Buy tickets online the night before so you can walk straight to the security line.' },
    { q: 'Which gate is best for sunrise?', a: 'The East gate. It is the closest to the high-end hotels on Taj East Gate Road, and it stays calm at sunrise because most tour groups concentrate at the West gate. Clearing security at East takes a fraction of the time.' },
    { q: 'How do I get to Agra for sunrise from Delhi?', a: 'Either leave Delhi by private car around 02:30 and drive the Yamuna Expressway in 3.5–4 hours, or take the Gatimaan Express train from Hazrat Nizamuddin at 08:10 (this gets you to Agra mid-morning, too late for true sunrise — so for sunrise, a private car or overnight in Agra is essentially required).' },
    { q: 'Should I stay overnight in Agra for sunrise?', a: 'Yes, if you want the easiest version. Overnight stays at the East-gate hotels (Oberoi Amarvilas, ITC Mughal, Trident) let you walk to the gate before the cars even arrive. It is the difference between a relaxed visit and a pre-dawn drive.' },
];

const schema = [
    { '@context': 'https://schema.org', '@type': 'HowTo', speakable: { '@type': 'SpeakableSpecification', cssSelector: ['main h2', 'main ol li'] }, name: 'How to visit the Taj Mahal at sunrise', step: [
        { '@type': 'HowToStep', name: 'Buy your ticket online the night before', text: 'Use asi.payumoney.com so you can skip the cash counter at sunrise.' },
        { '@type': 'HowToStep', name: 'Get into position 30 minutes before sunrise', text: 'Arrive at the East gate well before opening. Carry your passport.' },
        { '@type': 'HowToStep', name: 'Clear security and head straight to the Great Gate', text: 'Walk through the Darwaza-i-Rauza as first light hits the marble.' },
        { '@type': 'HowToStep', name: 'Spend the first 20 minutes at the reflection pool', text: 'This is when you have the iconic frame to yourself.' },
        { '@type': 'HowToStep', name: 'Move onto the main platform', text: 'By 30 minutes after sunrise the platform is the place for detail shots and the changing marble colour.' },
    ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', speakable: { '@type': 'SpeakableSpecification', cssSelector: ['main h2', 'main details'] }, mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
];

const sunriseTimes = [
    { month: 'January', time: '~07:10' },
    { month: 'February', time: '~06:50' },
    { month: 'March', time: '~06:25' },
    { month: 'April', time: '~05:55' },
    { month: 'May', time: '~05:30' },
    { month: 'June', time: '~05:20' },
    { month: 'July', time: '~05:30' },
    { month: 'August', time: '~05:50' },
    { month: 'September', time: '~06:10' },
    { month: 'October', time: '~06:25' },
    { month: 'November', time: '~06:45' },
    { month: 'December', time: '~07:05' },
];

export default function SunriseGuide() {
    return (
        <main className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <PageHero
                breadcrumbs={[{ label: 'Taj Mahal Guide', href: '/taj-mahal-guide' }, { label: 'Sunrise' }]}
                badge="The Best Hour"
                title="Taj Mahal at Sunrise"
                subtitle="Why dawn is the only hour that matters, and exactly how to nail it."
            />

            <section className="py-12 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-4">Quick Answer</p>
                        <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">The sunrise plan</h2>
                        <ul className="space-y-3 text-gray-700 font-light">
                            <li><strong className="text-gray-900">Arrive:</strong> 30 minutes before sunrise</li>
                            <li><strong className="text-gray-900">Gate:</strong> East</li>
                            <li><strong className="text-gray-900">Tickets:</strong> Online the night before</li>
                            <li><strong className="text-gray-900">From Delhi:</strong> Leave by 02:30 in a private car, or stay overnight in Agra</li>
                            <li><strong className="text-gray-900">Time inside:</strong> 90&ndash;120 minutes</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-3xl space-y-12 text-lg text-gray-600 font-light leading-relaxed">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Why sunrise is the only hour worth chasing</h2>
                        <p>The marble of the Taj Mahal is not actually white — it is translucent. As the first light hits the dome it picks up the pink of the sky, then shifts through gold, then settles into bright white as the sun climbs. You see that progression in the first 45 minutes after sunrise, and you only see it in that window. After 09:00 the dome is uniformly white and the crowds have multiplied tenfold.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Approximate sunrise times by month</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {sunriseTimes.map((s) => (
                                <div key={s.month} className="bg-white border border-gray-100 rounded-xl p-4">
                                    <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">{s.month}</span>
                                    <span className="text-xl font-display font-bold text-gray-900">{s.time}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-400 mt-4 italic">Times are local IST. Aim to be at the East gate roughly 30 minutes before these times.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Getting there from Delhi</h2>
                        <p>The Gatimaan Express train (08:10 from Hazrat Nizamuddin) is fast and comfortable but lands you in Agra around 09:50 &mdash; too late for a true sunrise visit. To make sunrise, you either drive overnight (leave Delhi ~02:30, arrive Agra ~06:00) or stay the night before in Agra. We recommend the overnight option for anyone who values their sleep. See our <Link href="/delhi-to-agra-tour" className="text-maroon-600 underline">Delhi to Agra tour</Link> page for route details.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">What to bring</h2>
                        <ul className="space-y-3 list-disc pl-6">
                            <li>Passport (or government ID for Indians).</li>
                            <li>Pre-booked ticket on your phone.</li>
                            <li>A light layer &mdash; pre-dawn Agra is cool even in spring.</li>
                            <li>Phone or camera (no tripods, no drones).</li>
                            <li>A small bottle of water.</li>
                            <li>Patience for security &mdash; even at 06:00, expect 10 minutes.</li>
                        </ul>
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
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Skip the logistics. Book a private sunrise tour.</h2>
                    <p className="text-white/70 font-light mb-8">We pick you up before dawn, handle tickets and the East-gate entry, and put a government-approved guide beside you.</p>
                    <Button asChild className="bg-gold-500 hover:bg-white text-black py-6 px-10 rounded-2xl text-lg font-bold h-auto">
                        <Link href="/plans" className="flex items-center gap-3">Book a Sunrise Tour <ArrowRight className="w-5 h-5" /></Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
