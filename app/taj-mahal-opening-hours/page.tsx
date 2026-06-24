import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
    title: 'Taj Mahal Opening Hours 2026: Days, Times & Friday Closure',
    description: 'When the Taj Mahal opens, why it closes Fridays, the night-viewing schedule, and the best times to arrive. Updated 2026.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/taj-mahal-opening-hours',
        languages: {
            'en': 'https://www.guideindiatours.com/taj-mahal-opening-hours',
            'en-US': 'https://www.guideindiatours.com/taj-mahal-opening-hours',
            'en-GB': 'https://www.guideindiatours.com/taj-mahal-opening-hours',
            'en-IN': 'https://www.guideindiatours.com/taj-mahal-opening-hours',
            'x-default': 'https://www.guideindiatours.com/taj-mahal-opening-hours',
        },
    },
    openGraph: { title: 'Taj Mahal Opening Hours 2026', description: 'Daily hours, Friday closures, night viewing schedule.', url: 'https://www.guideindiatours.com/taj-mahal-opening-hours', type: 'article' },
};

const faqs = [
    { q: 'What time does the Taj Mahal open?', a: 'The Taj Mahal opens at sunrise, which is roughly 30 minutes before the official sunrise time published by ASI. In peak winter that means around 06:30, and in summer as early as 05:45. Gates accept visitors until 30 minutes before sunset.' },
    { q: 'Is the Taj Mahal really closed every Friday?', a: 'Yes. The monument is closed all day every Friday to allow the Taj Mahal Mosque inside the complex to be used for Friday prayers. The only Friday access is to the mosque itself for those attending prayers.' },
    { q: 'When is night viewing of the Taj Mahal allowed?', a: 'Night viewing is allowed on 5 nights every month — the night of the full moon plus the two nights before and after — except during the month of Ramadan. Tickets are issued by the ASI Agra office 24 hours in advance.' },
    { q: 'Is the Taj Mahal closed on public holidays?', a: 'No. The Taj Mahal stays open on Indian national holidays such as Republic Day and Independence Day. The only weekly closure is Friday.' },
    { q: 'What time should I actually arrive?', a: 'For the best experience, arrive 30 minutes before opening at the East gate. You will be among the first 50 inside, beating both the heat and the queues. For sunset, plan to be inside by 2 hours before sunset to enjoy the changing light without rushing.' },
];

const schema = [
    {
        '@context': 'https://schema.org', '@type': 'TouristAttraction',
        '@id': 'https://www.guideindiatours.com/taj-mahal-guide#taj-mahal',
        name: 'Taj Mahal', address: { '@type': 'PostalAddress', addressLocality: 'Agra', addressRegion: 'Uttar Pradesh', postalCode: '282001', addressCountry: 'IN' },
        openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'], opens: 'sunrise', closes: 'sunset' },
            { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '00:00', closes: '00:00', description: 'Closed Fridays' },
        ],
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
];

const seasonalHours = [
    { period: 'October – February (winter)', open: '06:30', close: '18:00' },
    { period: 'March – April (spring)', open: '06:00', close: '18:30' },
    { period: 'May – June (summer)', open: '05:45', close: '19:00' },
    { period: 'July – September (monsoon)', open: '06:00', close: '18:45' },
];

export default function OpeningHours() {
    return (
        <main className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <PageHero
                breadcrumbs={[{ label: 'Taj Mahal Guide', href: '/taj-mahal-guide' }, { label: 'Opening Hours' }]}
                badge="Updated 2026"
                title="Taj Mahal Opening Hours"
                subtitle="Daily hours, Friday closures, night viewing — exactly when you can and can't visit."
            />

            <section className="py-12 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
                        <p className="text-[11px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-4">Quick Answer</p>
                        <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">When the Taj Mahal is open</h2>
                        <ul className="space-y-3 text-gray-700 font-light">
                            <li><strong className="text-gray-900">Daily:</strong> Sunrise to sunset (approx 30 min either side)</li>
                            <li><strong className="text-gray-900">Closed:</strong> Every Friday, all day</li>
                            <li><strong className="text-gray-900">Night viewing:</strong> 5 nights/month around the full moon (closed during Ramadan)</li>
                            <li><strong className="text-gray-900">Last entry:</strong> 30 minutes before sunset</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-3xl space-y-12 text-lg text-gray-600 font-light leading-relaxed">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Seasonal hours</h2>
                        <p className="mb-6">Because the Taj Mahal opens at sunrise and closes at sunset, the exact hours shift with the season. As a rough planning guide:</p>
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 overflow-x-auto">
                            <table className="w-full text-left text-base">
                                <thead>
                                    <tr className="border-b border-gray-100 text-[11px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <th className="py-3 pr-4">Period</th>
                                        <th className="py-3 pr-4">Opens</th>
                                        <th className="py-3">Closes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {seasonalHours.map((s) => (
                                        <tr key={s.period} className="border-b border-gray-50">
                                            <td className="py-3 pr-4 font-semibold text-gray-900">{s.period}</td>
                                            <td className="py-3 pr-4">{s.open}</td>
                                            <td className="py-3">{s.close}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Why Fridays are closed</h2>
                        <p>The Taj Mahal complex contains a working mosque on the western side, and Friday is reserved for the noon congregational (Jumu&apos;ah) prayer. ASI closes the entire complex to tourists for the day so that prayers can take place without interruption. If you only have Friday in Agra, see <Link href="/agra-tours" className="text-maroon-600 underline">Agra Fort</Link>, Itimad-ud-Daulah and Mehtab Bagh instead, then return to the Taj the next morning.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Night viewing schedule</h2>
                        <p>Night viewing happens on the full moon and 2 nights either side, in 50-person batches of 30 minutes between 20:30 and 00:30. Tickets must be bought from the ASI office at 22 Mall Road in Agra at least 24 hours ahead — they are not sold online or at the Taj gates. The full Ramadan month is excluded each year.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">When to actually arrive</h2>
                        <p>The headline trick is to arrive 30 minutes before opening at the East gate. Tour groups concentrate at the West gate, while East stays calm. You clear security in the dark, walk through the gardens as the sun comes up, and reach the platform with the marble glowing pink. By 09:00 it&apos;s packed.</p>
                    </div>

                    <p className="text-sm text-gray-400 italic border-t border-gray-100 pt-6">Source: <a href="https://www.tajmahal.gov.in/" rel="noopener" className="underline">tajmahal.gov.in</a> (ASI). Times may shift slightly with the official sunrise/sunset for the day.</p>
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
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Plan around the right hours.</h2>
                    <p className="text-white/70 font-light mb-8">A private guided tour books the gate time, the route and the right photography window for you.</p>
                    <Button asChild className="bg-gold-500 hover:bg-white text-black py-6 px-10 rounded-2xl text-lg font-bold h-auto">
                        <Link href="/plans" className="flex items-center gap-3">View Taj Mahal Tours <ArrowRight className="w-5 h-5" /></Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
