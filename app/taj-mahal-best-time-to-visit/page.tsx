import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
    title: 'Best Time to Visit the Taj Mahal 2026: Month-by-Month Guide',
    description: 'October to March is the prime season, sunrise is the prime hour. Here is the month-by-month breakdown of weather, crowds and fog warnings.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/taj-mahal-best-time-to-visit',
        languages: {
            'en': 'https://www.guideindiatours.com/taj-mahal-best-time-to-visit',
            'en-US': 'https://www.guideindiatours.com/taj-mahal-best-time-to-visit',
            'en-GB': 'https://www.guideindiatours.com/taj-mahal-best-time-to-visit',
            'en-IN': 'https://www.guideindiatours.com/taj-mahal-best-time-to-visit',
            'x-default': 'https://www.guideindiatours.com/taj-mahal-best-time-to-visit',
        },
    },
    openGraph: { title: 'Best Time to Visit the Taj Mahal 2026', description: 'Month-by-month guide to weather, crowds, fog and festivals.', url: 'https://www.guideindiatours.com/taj-mahal-best-time-to-visit', type: 'article' },
};

const faqs = [
    { q: 'What is the best month to visit the Taj Mahal?', a: 'November and February are the sweet spot. The weather is cool and dry, mornings are clear, fog risk is much lower than December–January, and tourist numbers are manageable. October and March are close seconds.' },
    { q: 'When should I avoid the Taj Mahal?', a: 'Avoid May and June if you possibly can — daytime temperatures regularly clear 42°C and the heat reflecting off the marble platform is genuinely unpleasant. Late December and early January carry a real fog risk that can hide the Taj for hours.' },
    { q: 'Is the Taj Mahal open in the monsoon?', a: 'Yes, it is open July–September. The Yamuna swells, the gardens are at their greenest, and tourist numbers drop — but expect humid days, occasional heavy showers, and rolling cloud cover that softens the dome.' },
    { q: 'Are weekends busier than weekdays?', a: 'Significantly. Indian visitors crowd the Taj on Saturdays and Sundays. Tuesday through Thursday are the calmest weekdays. Sunrise on any weekday is the most peaceful version of the monument.' },
    { q: 'Does fog ruin the Taj Mahal view?', a: 'Sometimes. Through late December and into mid-January, thick morning fog can hang over Agra until 10:00 or later, completely hiding the Taj. If you are visiting in that window, plan for two attempts: one at sunrise and a back-up at midday.' },
];

const schema = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: 'Best Time to Visit the Taj Mahal 2026', url: 'https://www.guideindiatours.com/taj-mahal-best-time-to-visit', datePublished: '2026-06-01', dateModified: '2026-06-01', author: { '@type': 'Person', name: 'Avneesh Dixit', url: 'https://www.guideindiatours.com/about/avneesh-dixit' }, publisher: { '@id': 'https://www.guideindiatours.com/#organization' }, about: { '@id': 'https://www.guideindiatours.com/taj-mahal-guide#taj-mahal' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', speakable: { '@type': 'SpeakableSpecification', cssSelector: ['main h2', 'main details'] }, mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
];

const months = [
    { m: 'January', verdict: 'Cool but foggy', notes: 'Daytime ~20°C, mornings can be hidden by fog until 10:00. Sunset is reliable.' },
    { m: 'February', verdict: 'Excellent', notes: 'Cool, dry, clear mornings, manageable crowds. One of the best months.' },
    { m: 'March', verdict: 'Very good', notes: 'Warming up but still pleasant. Holi adds colour around mid-month.' },
    { m: 'April', verdict: 'Warm', notes: 'Day temperatures climbing into the mid-30s. Sunrise still comfortable.' },
    { m: 'May', verdict: 'Avoid', notes: 'Daytime regularly 40°C+. Marble platform becomes too hot to stand on.' },
    { m: 'June', verdict: 'Avoid', notes: 'Pre-monsoon heat at its worst.' },
    { m: 'July', verdict: 'Quiet, humid', notes: 'Monsoon hits. Fewer tourists, dramatic skies, but humid.' },
    { m: 'August', verdict: 'Quiet, humid', notes: 'Monsoon continues. Yamuna fills up, lush gardens.' },
    { m: 'September', verdict: 'Improving', notes: 'Monsoon ends. Skies clear, temperatures drop.' },
    { m: 'October', verdict: 'Very good', notes: 'Clear, dry, mild. High season begins.' },
    { m: 'November', verdict: 'Excellent', notes: 'Peak weather. The single best month for most visitors.' },
    { m: 'December', verdict: 'Good but foggy', notes: 'Cool and clear by afternoon but heavy morning fog is a real risk.' },
];

export default function BestTime() {
    return (
        <main className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <PageHero
                breadcrumbs={[{ label: 'Taj Mahal Guide', href: '/taj-mahal-guide' }, { label: 'Best Time to Visit' }]}
                badge="Month by Month"
                title="Best Time to Visit the Taj Mahal"
                subtitle="A licensed Agra guide's honest take on which months work and which to avoid."
            />

            <section className="py-12 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-4">Quick Answer</p>
                        <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">The headline answer</h2>
                        <p className="text-gray-700 font-light leading-relaxed"><strong className="text-gray-900">November and February</strong> are the best months &mdash; cool, dry, clear and manageable crowds. October and March are close seconds. Avoid <strong className="text-gray-900">May&ndash;June</strong> for heat and watch out for fog in <strong className="text-gray-900">late December and January</strong>. At any time of year, <strong className="text-gray-900">sunrise</strong> is the prime hour.</p>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-12">Month-by-month</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {months.map((mo) => (
                            <div key={mo.m} className="bg-white border border-gray-100 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-display font-bold text-gray-900">{mo.m}</h3>
                                    <Badge className="bg-maroon-600/10 text-maroon-600 border-none text-[10px] font-black uppercase tracking-widest">{mo.verdict}</Badge>
                                </div>
                                <p className="text-gray-500 font-light leading-relaxed">{mo.notes}</p>
                            </div>
                        ))}
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
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Pick your dates. We&apos;ll handle the rest.</h2>
                    <p className="text-white/70 font-light mb-8">Tell us when you can travel and we&apos;ll match it to the right plan and the right weather window.</p>
                    <Button asChild className="bg-gold-500 hover:bg-white text-black py-6 px-10 rounded-2xl text-lg font-bold h-auto">
                        <Link href="/plans" className="flex items-center gap-3">View Tour Plans <ArrowRight className="w-5 h-5" /></Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
