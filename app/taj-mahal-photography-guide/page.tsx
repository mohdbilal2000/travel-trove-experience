import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
    title: 'Taj Mahal Photography Guide 2026: Best Spots, Times & Rules',
    description: 'Where to shoot the Taj Mahal — best spots, sunrise vs golden hour, allowed and banned gear, camera settings and Mehtab Bagh from across the river.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/taj-mahal-photography-guide',
        languages: {
            'en': 'https://www.guideindiatours.com/taj-mahal-photography-guide',
            'en-US': 'https://www.guideindiatours.com/taj-mahal-photography-guide',
            'en-GB': 'https://www.guideindiatours.com/taj-mahal-photography-guide',
            'en-IN': 'https://www.guideindiatours.com/taj-mahal-photography-guide',
            'x-default': 'https://www.guideindiatours.com/taj-mahal-photography-guide',
        },
    },
    openGraph: { title: 'Taj Mahal Photography Guide 2026', description: 'Best spots, times, rules and camera settings for shooting the Taj Mahal.', url: 'https://www.guideindiatours.com/taj-mahal-photography-guide', type: 'article' },
};

const faqs = [
    { q: 'Can you take photos at the Taj Mahal?', a: 'Yes. Photography is freely allowed everywhere in the gardens, on the platform and around the mosque and Mehmaan Khana. The only place photography is banned is inside the central mausoleum chamber itself — phones and cameras must be put away on entry.' },
    { q: 'Are tripods allowed?', a: 'No. Tripods, monopods and gimbals are not permitted inside the Taj Mahal complex for general visitors. Commercial photography permits issued by ASI can include tripod use but require advance application.' },
    { q: 'Are drones allowed near the Taj Mahal?', a: 'No. The Taj Mahal sits inside a no-fly zone. Drones — including small consumer drones — are strictly prohibited and may be confiscated by security.' },
    { q: 'What is the best spot for a Taj Mahal photo?', a: 'The most iconic frame is from the central reflection pool with the Taj reflected in the water. The bench halfway down the pool — often called the "Diana bench" — is the classic portrait spot. For a different angle, the mosque side gives you the Taj framed by red sandstone arches.' },
    { q: 'Where can I photograph the Taj from across the river?', a: 'Mehtab Bagh, the Mughal garden on the opposite (north) bank of the Yamuna, gives the famous river-facing view of the Taj. Sunset light from there is exceptional, with the marble glowing against the river.' },
    { q: 'What time of day is best for Taj Mahal photos?', a: 'Sunrise is the prime window. The first 30 minutes of light turn the marble pink, then gold, then cool white as the day starts. Blue hour (just before dawn) gives you a deep navy sky against a softly lit Taj. Sunset from Mehtab Bagh is the runner-up.' },
];

const schema = [
    { '@context': 'https://schema.org', '@type': 'HowTo', speakable: { '@type': 'SpeakableSpecification', cssSelector: ['main h2', 'main ol li'] }, name: 'How to photograph the Taj Mahal', description: 'A step-by-step guide to capturing the best photos of the Taj Mahal, written by licensed Agra guides.', step: [
        { '@type': 'HowToStep', name: 'Arrive 30 minutes before sunrise', text: 'Enter through the East gate before sunrise for the softest light and smallest crowds.' },
        { '@type': 'HowToStep', name: 'Shoot from the Great Gate frame', text: 'The arch of the Darwaza-i-Rauza naturally frames the Taj as you walk in — get this shot first.' },
        { '@type': 'HowToStep', name: 'Use the central reflection pool', text: 'Walk to the "Diana bench" halfway down the pool for the classic reflection frame.' },
        { '@type': 'HowToStep', name: 'Move to the mosque side', text: 'The red sandstone mosque arches frame the Taj from a less photographed angle.' },
        { '@type': 'HowToStep', name: 'Visit Mehtab Bagh for sunset', text: 'Cross the river to Mehtab Bagh for the iconic river-side view at sunset.' },
    ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', speakable: { '@type': 'SpeakableSpecification', cssSelector: ['main h2', 'main details'] }, mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
];

const spots = [
    { name: 'Great Gate (Darwaza-i-Rauza)', what: 'Arch-framed shot of the Taj as you walk in. Best at sunrise.' },
    { name: 'Central reflection pool / "Diana bench"', what: 'The classic postcard frame. Get there in the first 15 minutes after opening to have it to yourself.' },
    { name: 'Mosque platform (west side)', what: 'Red sandstone arches frame the Taj. Underused; great morning light.' },
    { name: 'Mehmaan Khana (east side)', what: 'Mirror image of the mosque side — same red arches with different light direction.' },
    { name: 'Main platform corners', what: 'Detail shots of the marble inlay (pietra dura) and the four minarets.' },
    { name: 'Mehtab Bagh (across the river)', what: 'River-facing sunset view. The only place to shoot the Taj from the north side of the Yamuna.' },
];

export default function PhotographyGuide() {
    return (
        <main className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <PageHero
                breadcrumbs={[{ label: 'Taj Mahal Guide', href: '/taj-mahal-guide' }, { label: 'Photography' }]}
                badge="Photographer's Guide"
                title="Taj Mahal Photography Guide"
                subtitle="The best spots, the right times, the rules — and what to leave at the hotel."
            />

            <section className="py-12 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
                        <p className="text-[11px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-4">Quick Answer</p>
                        <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">In short</h2>
                        <ul className="space-y-3 text-gray-700 font-light">
                            <li><strong className="text-gray-900">Allowed everywhere</strong> in the complex — except inside the mausoleum chamber.</li>
                            <li><strong className="text-gray-900">Banned:</strong> tripods, monopods, gimbals, drones, commercial gear without permit.</li>
                            <li><strong className="text-gray-900">Best time:</strong> 30 minutes before sunrise to about an hour after.</li>
                            <li><strong className="text-gray-900">Best spot:</strong> reflection pool / Diana bench, then mosque side, then Mehtab Bagh at sunset.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-3xl space-y-12 text-lg text-gray-600 font-light leading-relaxed">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">The six spots worth shooting</h2>
                        <ul className="space-y-5">
                            {spots.map((s) => (
                                <li key={s.name} className="border-l-2 border-maroon-600/20 pl-4">
                                    <strong className="block text-gray-900 mb-1">{s.name}</strong>
                                    <span>{s.what}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">What to leave at the hotel</h2>
                        <p>Tripods and monopods are confiscated at security and held until you leave — there is no facility to use them inside. The same applies to gimbals, large lighting rigs and any commercial-looking equipment without an ASI permit. Drones are strictly forbidden inside the city&apos;s no-fly zone around the monument.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Camera settings to start with</h2>
                        <p>At sunrise, set your camera to a low ISO (100&ndash;400), shoot in RAW for the marble&apos;s subtle colour shifts, and slightly underexpose to protect the highlights on the white dome. A 24&ndash;70mm zoom covers most needs; a wider 16&ndash;35mm helps inside the Great Gate. For phone shooters, the standard 1x lens is genuinely your best friend — the ultrawide distorts the symmetry.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">A 90-minute shooting plan</h2>
                        <ol className="space-y-3 list-decimal pl-6">
                            <li>Enter East gate 20 minutes before opening &mdash; clear security in the dark.</li>
                            <li>Stop under the Great Gate as light arrives &mdash; shoot the arch-framed Taj.</li>
                            <li>Move straight to the Diana bench for the reflection shot before crowds.</li>
                            <li>Walk to the mosque side for red-sandstone framing.</li>
                            <li>Climb onto the platform for detail shots of the pietra dura inlay.</li>
                            <li>Leave by the East gate to avoid the West-gate queue building up.</li>
                        </ol>
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
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Want a guide who knows the light?</h2>
                    <p className="text-white/70 font-light mb-8">Avneesh has shot the Taj at every hour. A private photography-focused tour gets you in early, to the right spot, in the right gate.</p>
                    <Button asChild className="bg-gold-500 hover:bg-white text-black py-6 px-10 rounded-2xl text-lg font-bold h-auto">
                        <Link href="/plans" className="flex items-center gap-3">Book a Taj Photography Tour <ArrowRight className="w-5 h-5" /></Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
