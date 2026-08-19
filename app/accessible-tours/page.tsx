import { Metadata } from 'next';
import Link from 'next/link';
import { Accessibility, Car, HeartHandshake, AlertTriangle, CheckCircle2, MinusCircle, Phone } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { Button } from '@/components/ui/button';
import { generateFAQSchema } from '@/lib/schemaGenerator';

export const metadata: Metadata = {
    title: 'Wheelchair-Accessible Taj Mahal & Golden Triangle Tours | Guide India Tours',
    description: 'Honest guide to visiting the Taj Mahal and Golden Triangle with a wheelchair or limited mobility: what is genuinely possible, what is hard, and how we plan private tours around your needs.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/accessible-tours',
        languages: {
            'en': 'https://www.guideindiatours.com/accessible-tours',
            'en-US': 'https://www.guideindiatours.com/accessible-tours',
            'en-GB': 'https://www.guideindiatours.com/accessible-tours',
            'en-IN': 'https://www.guideindiatours.com/accessible-tours',
            'x-default': 'https://www.guideindiatours.com/accessible-tours',
        },
    },
    openGraph: {
        title: 'Wheelchair-Accessible Taj Mahal & Golden Triangle Tours',
        description: 'What is genuinely possible with a wheelchair or limited mobility — and how we plan around it.',
        url: 'https://www.guideindiatours.com/accessible-tours',
        type: 'website',
    },
};

// Monument accessibility notes. Conditions on the ground change — every claim
// below is written conservatively and should be re-verified periodically.
// TODO: verify — golf cart/battery bus routes and free wheelchair availability
// at the Taj Mahal gates before each season; ramp coverage can change with
// ASI conservation works.
const monumentAccess = [
    {
        site: 'Taj Mahal, Agra',
        level: 'good',
        summary: 'The most wheelchair-friendly major monument in India.',
        details: [
            'Electric buggies/golf carts run from the remote parking to the East and West gates (petrol vehicles are banned near the monument), so the long approach is covered.',
            'Wheelchairs are available free of charge at the entry for visitors who need them — ask at the gate, availability is first-come.',
            'Paved, mostly level paths run through the gardens, and a ramp gives step-free access up to the raised marble plinth.',
            'The interior of the main mausoleum is tight and can be crowded; many wheelchair guests view it from the plinth and skip the chamber.',
        ],
    },
    {
        site: 'Agra Fort',
        level: 'partial',
        summary: 'Partially accessible — grand courtyards yes, upper palaces mostly no.',
        details: [
            'The entrance is a long, fairly steep stone ramp (originally built for elephants and palanquins) — manageable with a strong companion or our guide pushing.',
            'The main courtyard level, including Diwan-i-Am, is broadly accessible on paved ground.',
            'Several palace sections and the Musamman Burj Taj-view balcony involve steps and cannot be reached by wheelchair.',
        ],
    },
    {
        site: 'Mehtab Bagh (sunset Taj view)',
        level: 'good',
        summary: 'Flat Mughal garden directly across the river from the Taj.',
        details: [
            'Garden paths are level, though partly gravel — wide tyres or a helper make it easy.',
            'The classic sunset view of the Taj Mahal requires no climbing at all, which makes this the best-value accessible stop in Agra.',
        ],
    },
    {
        site: 'Fatehpur Sikri',
        level: 'hard',
        summary: 'Honestly difficult — we usually recommend skipping or adapting it.',
        details: [
            'Access from the parking is by shuttle bus, followed by uneven historic stone surfaces throughout.',
            'The Buland Darwaza gateway sits atop a long, steep staircase with no step-free alternative.',
            'Parts of the palace complex are flatter once inside, but getting there involves steps — tell us your needs and we will advise honestly whether it is worth it for you.',
        ],
    },
    {
        site: 'Delhi (Humayun’s Tomb, Qutub Minar, Red Fort)',
        level: 'partial',
        summary: 'Garden levels are good; raised tomb platforms are not.',
        details: [
            'Humayun’s Tomb gardens have paved, ramped paths, but the tomb itself stands on a high plinth reached by steep stairs.',
            'Qutub Minar’s grounds are largely level with paved walkways around the main monuments.',
            'Red Fort is broadly flat inside; Jama Masjid, by contrast, involves major staircases and is hard with a wheelchair.',
        ],
    },
    {
        site: 'Jaipur (Amber Fort, City Palace, Hawa Mahal)',
        level: 'partial',
        summary: 'Spectacular from the right vantage points; interiors vary.',
        details: [
            'Amber Fort sits on a hill: vehicles can drive up to the main courtyard level, but the palace interiors beyond involve steps and narrow passages.',
            'City Palace’s main courtyards and museum ground floor are mostly level.',
            'Hawa Mahal’s famous façade is enjoyed from street level — fully accessible as a photo stop.',
        ],
    },
];

const howWeHelp = [
    {
        icon: Car,
        title: 'The right vehicle',
        text: 'We assign an Innova Crysta or Force Urbania with wide door openings and room for a folded wheelchair — never a cramped sedan — and the same driver stays with you throughout.',
    },
    {
        icon: HeartHandshake,
        title: 'Guide assistance',
        text: 'Your licensed guide manages tickets, buggy transfers and gate staff, pushes when welcome, and knows which entrance has the ramp — so your companion can just enjoy the day.',
    },
    {
        icon: Accessibility,
        title: 'Pace built around you',
        text: 'Private means private: extra time at every stop, rest breaks planned in shade, sunrise slots to avoid crowds, and zero pressure to keep up with anyone.',
    },
    {
        icon: Phone,
        title: 'Advance planning',
        text: 'We confirm current conditions before you travel — wheelchair availability at gates, which buggy route runs, where the accessible restrooms are — instead of improvising on the day.',
    },
];

const faqs = [
    {
        question: 'Is the Taj Mahal wheelchair accessible?',
        answer: 'Largely yes — it is the most wheelchair-friendly major monument in India. Electric buggies cover the long approach from parking to the gates, free wheelchairs are available at the entry, garden paths are paved and mostly level, and a ramp reaches the raised marble plinth. The tight interior chamber of the mausoleum is the one part many wheelchair users choose to skip.',
    },
    {
        question: 'Can I rent or borrow a wheelchair at the monuments?',
        answer: 'The Taj Mahal provides wheelchairs free at the entry gates (first-come availability). Most other monuments do not offer them reliably, so if you use a chair we recommend bringing your own or telling us in advance — we can arrange one for the whole trip.',
    },
    {
        question: 'Which Golden Triangle sights are hardest with limited mobility?',
        answer: 'Fatehpur Sikri (shuttle bus plus a long staircase at Buland Darwaza), Jama Masjid in Delhi (major staircases), the raised plinth of Humayun’s Tomb, and the palace interiors of Amber Fort beyond its main courtyard. We say this plainly so you can decide — there is plenty of spectacular India without them.',
    },
    {
        question: 'What vehicle do you use for accessible tours?',
        answer: 'An Innova Crysta for up to 5–6 guests or a Force Urbania van for more space — both with wide openings and boot room for a folded wheelchair. We do not run lift-equipped vehicles, so travellers need to transfer to the seat with or without assistance; tell us your situation and we will be honest about fit.',
    },
    {
        question: 'Are accessible restrooms available during the tours?',
        answer: 'At the Taj Mahal and other major ASI sites, facilities exist but standards vary and distances can be long. Your guide knows where the most usable options are at each monument and at good hotels and restaurants en route, and we build those stops into the day’s plan.',
    },
    {
        question: 'Do you charge extra for accessibility planning?',
        answer: 'No. The larger vehicle is priced at its normal rate and the planning, guide assistance and pacing cost nothing extra. Tell us your mobility needs on WhatsApp and we quote the trip like any other — within 2 hours.',
    },
];

const faqSchema = generateFAQSchema(faqs);

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.guideindiatours.com/accessible-tours#service',
    name: 'Wheelchair-Accessible Taj Mahal & Golden Triangle Tours',
    serviceType: 'Accessible private guided tours',
    description: 'Private, wheelchair-aware tours of the Taj Mahal, Agra and the Golden Triangle with suitable vehicles, guide assistance and honest advice about what is and is not accessible.',
    provider: { '@id': 'https://www.guideindiatours.com/#organization' },
    areaServed: [
        { '@type': 'City', name: 'Agra' },
        { '@type': 'City', name: 'Delhi' },
        { '@type': 'City', name: 'Jaipur' },
    ],
    url: 'https://www.guideindiatours.com/accessible-tours',
    audience: { '@type': 'Audience', audienceType: 'Travellers with limited mobility' },
};

const whatsappHref = `https://wa.me/918979810991?text=${encodeURIComponent(
    'Hi! I’m planning a trip and have mobility needs: ___. Could you advise what’s possible and quote a suitable tour?'
)}`;

const levelStyles: Record<string, { label: string; classes: string }> = {
    good: { label: 'Good access', classes: 'bg-green-50 text-green-700' },
    partial: { label: 'Partial access', classes: 'bg-amber-50 text-amber-700' },
    hard: { label: 'Difficult', classes: 'bg-red-50 text-red-700' },
};

export default function AccessibleToursPage() {
    return (
        <main className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema]) }} />

            <PageHero
                breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Accessible Tours' }]}
                badge="Accessible Travel"
                title={<>Wheelchair-Accessible <span className="text-maroon-600">Taj Mahal &amp; Golden Triangle</span></>}
                subtitle="An honest guide to what is genuinely possible with a wheelchair or limited mobility — and how a private tour is planned around you, not the other way round."
                meta={
                    <>
                        <span className="flex items-center gap-2"><Accessibility className="w-4 h-4 text-maroon-600" /> Free wheelchairs at the Taj entry</span>
                        <span className="flex items-center gap-2"><Car className="w-4 h-4 text-maroon-600" /> Crysta / Urbania vehicles</span>
                        <span className="flex items-center gap-2"><HeartHandshake className="w-4 h-4 text-maroon-600" /> Guide assistance throughout</span>
                    </>
                }
            />

            {/* What's genuinely possible */}
            <section className="py-14 md:py-20 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-1 bg-maroon-600"></div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">What&rsquo;s genuinely <span className="text-maroon-600">possible</span></h2>
                    </div>
                    <p className="text-gray-500 font-light text-lg mb-10 max-w-3xl">
                        Site by site, without the marketing gloss. Conditions can change with conservation works, so we re-confirm the details for your specific dates before you travel.
                    </p>
                    <div className="space-y-6">
                        {monumentAccess.map((m) => (
                            <div key={m.site} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <h3 className="text-xl font-bold text-gray-900">{m.site}</h3>
                                    <span className={`text-[11px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${levelStyles[m.level].classes}`}>
                                        {levelStyles[m.level].label}
                                    </span>
                                </div>
                                <p className="text-gray-700 font-medium mb-4">{m.summary}</p>
                                <ul className="space-y-2">
                                    {m.details.map((d, i) => (
                                        <li key={i} className="flex gap-3 items-start text-sm text-gray-600 font-light leading-relaxed">
                                            {m.level === 'hard' ? (
                                                <MinusCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                                            ) : (
                                                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                                            )}
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How we handle it */}
            <section className="py-14 md:py-20 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-1 bg-maroon-600"></div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">How we plan <span className="text-maroon-600">around you</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {howWeHelp.map((item) => (
                            <div key={item.title} className="bg-ivory-100 rounded-3xl border border-gray-100 p-8">
                                <div className="w-11 h-11 rounded-2xl bg-maroon-600/10 flex items-center justify-center mb-4">
                                    <item.icon className="w-5 h-5 text-maroon-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 font-light leading-relaxed text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Honest limitations */}
            <section className="py-14 md:py-20 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertTriangle className="w-6 h-6 text-amber-500" />
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">The honest limitations</h2>
                        </div>
                        <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                            <p>
                                India&rsquo;s historic monuments were built centuries before accessibility standards, and no operator can change that. Some palace interiors, minarets and raised tombs are simply not reachable by wheelchair, and we will never pretend otherwise.
                            </p>
                            <p>
                                Pavements between sights are often uneven or absent, crowds can be dense at peak hours, and accessible restrooms — while present at the major sites — are inconsistent in standard. Distances inside monument complexes are longer than most first-time visitors expect.
                            </p>
                            <p>
                                We do not operate lift-equipped or hand-control vehicles: travellers need to be able to transfer into a normal car seat, with whatever assistance your companions or our team can respectfully provide.
                            </p>
                            <p className="text-gray-900 font-medium">
                                What we promise instead: honest advice about what will and will not work for you, the right vehicle, a guide who has done this many times — and an itinerary where everything included is genuinely doable.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-14 md:py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                        Tell us your mobility needs — <span className="text-maroon-600">we plan around them</span>
                    </h2>
                    <p className="text-gray-500 font-light text-lg mb-8 max-w-2xl mx-auto">
                        A two-minute WhatsApp message about how you get around lets us design the day honestly: the right vehicle, the right gates, the right pace. Quote within 2 hours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl px-8 py-6 text-base font-bold">
                            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                                <WhatsAppIcon className="w-5 h-5 mr-2" /> WhatsApp your needs
                            </a>
                        </Button>
                        <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-8 py-6 text-base font-bold">
                            <Link href="/plans">Browse tour programmes</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-14 md:py-20 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-maroon-600"></div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Accessibility <span className="text-maroon-600">FAQs</span></h2>
                    </div>
                    <div className="space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="bg-white p-8 rounded-2xl border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                                <p className="text-gray-500 font-light leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
