import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
    title: 'Taj Mahal Dress Code & Rules 2026: What to Wear, What to Avoid',
    description: 'There is no strict dress code at the Taj Mahal, but modest dress is recommended out of respect. Here is what to wear, what to leave behind, and what security will confiscate.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/taj-mahal-dress-code',
        languages: {
            'en': 'https://www.guideindiatours.com/taj-mahal-dress-code',
            'en-US': 'https://www.guideindiatours.com/taj-mahal-dress-code',
            'en-GB': 'https://www.guideindiatours.com/taj-mahal-dress-code',
            'en-IN': 'https://www.guideindiatours.com/taj-mahal-dress-code',
            'x-default': 'https://www.guideindiatours.com/taj-mahal-dress-code',
        },
    },
    openGraph: { title: 'Taj Mahal Dress Code & Rules 2026', description: 'What to wear, what not to bring, and what security confiscates.', url: 'https://www.guideindiatours.com/taj-mahal-dress-code', type: 'article' },
};

const faqs = [
    { q: 'Is there a strict dress code at the Taj Mahal?', a: 'No formal dress code is enforced for tourists, but modest dress is recommended out of respect — shoulders and knees covered is a sensible rule of thumb. The active mosque inside the complex does have stricter expectations if you wish to enter.' },
    { q: 'Can I wear shorts at the Taj Mahal?', a: 'Yes, shorts are not prohibited. That said, lightweight long trousers or a long skirt are more respectful and protect you from the sun on the gardens and platform.' },
    { q: 'Do I need to take my shoes off?', a: 'You do not enter the gardens barefoot. To step onto the main marble platform you either remove your shoes or use the disposable shoe covers handed out at the base — they come included with your ticket.' },
    { q: 'What is banned inside the Taj Mahal?', a: 'Banned items include food (other than a sealed water bottle), tobacco and lighters, large bags, tripods and drones, electronics like chargers, knives, and headphones in some periods. Pretty much treat it like airport security.' },
    { q: 'Can I bring a backpack?', a: 'Small day bags are allowed but everything is X-rayed at the gate. Large backpacks have to be checked in to the cloakroom outside the gate. The lighter you travel, the faster you clear security.' },
    { q: 'Are there cloakrooms at the gates?', a: 'Yes, free cloakrooms operate just outside each gate for items you cannot bring inside — drones, large bags, food, tripods. Hold on to the token; you collect items on the way out.' },
];

const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

const allowed = ['Phone and small camera', 'Sealed water bottle', 'Small day bag', 'Sunglasses, hat, sunscreen', 'Light jacket in cool months'];
const banned = ['Food and snacks', 'Tobacco, lighters, matches', 'Tripods, monopods, gimbals', 'Drones (no-fly zone)', 'Large bags / backpacks', 'Knives, sharp objects', 'Pet animals'];

export default function DressCode() {
    return (
        <main className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <PageHero
                breadcrumbs={[{ label: 'Taj Mahal Guide', href: '/taj-mahal-guide' }, { label: 'Dress Code' }]}
                badge="Visitor Rules"
                title={<>Dress Code &amp; Rules</>}
                subtitle="What you can wear, what to bring, and what security will absolutely confiscate."
            />

            <section className="py-12 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
                        <p className="text-[11px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-4">Quick Answer</p>
                        <h2 className="text-2xl font-display font-bold mb-6 text-gray-900">In short</h2>
                        <p className="text-gray-700 font-light leading-relaxed">No strict dress code, but cover shoulders and knees out of respect. Travel like airport security &mdash; only phone, camera, water, ID. Shoe covers are provided for the main marble platform.</p>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white border border-gray-100 rounded-3xl p-8">
                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3"><Check className="text-green-600" /> Allowed</h3>
                            <ul className="space-y-3 text-gray-600 font-light">
                                {allowed.map((a) => <li key={a} className="flex gap-3"><Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-1.5" /> <span>{a}</span></li>)}
                            </ul>
                        </div>
                        <div className="bg-gray-900 text-white rounded-3xl p-8">
                            <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3"><X className="text-red-400" /> Banned / Confiscated</h3>
                            <ul className="space-y-3 text-white/80 font-light">
                                {banned.map((a) => <li key={a} className="flex gap-3"><X className="w-4 h-4 text-red-400 flex-shrink-0 mt-1.5" /> <span>{a}</span></li>)}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 space-y-10 text-lg text-gray-600 font-light leading-relaxed">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">A note on the mosque</h2>
                            <p>The functional mosque inside the complex (on the western side) accepts visitors outside of prayer times but expects covered shoulders, covered knees, and shoes removed. If you want to step inside, dress accordingly. The mausoleum chamber itself has a strict no-photography rule once inside &mdash; phones in pockets.</p>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">Pack light, get in fast</h2>
                            <p>The single biggest thing you can do to enjoy the Taj Mahal is travel light. Every extra item at security is friction. Pre-booked ticket on your phone, passport in a pocket, a phone, a small camera, water &mdash; you are through in five minutes. With a backpack of stuff you do not need, it is twenty.</p>
                        </div>
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
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Travel with a guide who knows the rules.</h2>
                    <p className="text-white/70 font-light mb-8">A private tour means we tell you exactly what to wear and bring before you leave the hotel.</p>
                    <Button asChild className="bg-gold-500 hover:bg-white text-black py-6 px-10 rounded-2xl text-lg font-bold h-auto">
                        <Link href="/plans" className="flex items-center gap-3">View Taj Mahal Tours <ArrowRight className="w-5 h-5" /></Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
