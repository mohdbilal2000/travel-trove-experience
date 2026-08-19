import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Car, Users, Briefcase, Info, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { Button } from '@/components/ui/button';
import { generateFAQSchema } from '@/lib/schemaGenerator';

export const metadata: Metadata = {
    title: 'Delhi to Agra Taxi & Agra Car Rental with Driver | Guide India Tours',
    description: 'Private taxi and car rental with driver in Agra, Delhi and the Golden Triangle: sedans from ₹12/km, SUVs, Innova Crysta, tempo travellers and buses. Transparent pricing — no surprises.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/taxi',
        languages: {
            'en': 'https://www.guideindiatours.com/taxi',
            'en-US': 'https://www.guideindiatours.com/taxi',
            'en-GB': 'https://www.guideindiatours.com/taxi',
            'en-IN': 'https://www.guideindiatours.com/taxi',
            'x-default': 'https://www.guideindiatours.com/taxi',
        },
    },
    openGraph: {
        title: 'Taxi & Car Rental with Driver — Agra, Delhi & Golden Triangle',
        description: 'Sedans, SUVs, Innova Crysta, tempo travellers and buses with professional drivers. Transparent per-km pricing with every charge explained.',
        url: 'https://www.guideindiatours.com/taxi',
        type: 'website',
    },
};

// Fleet rates from the GIT business rate card (per-km bands; final quote
// depends on route, season and vehicle availability).
const fleet = [
    { vehicle: 'Sedan', models: 'Dzire, Etios', ratePerKm: '₹12–16', capacity: '3–4', luggage: '2–3 bags', notes: 'Best value, AC' },
    { vehicle: 'SUV', models: 'Innova, Ertiga', ratePerKm: '₹16–22', capacity: '5–6', luggage: '4–5 bags', notes: 'Family tours' },
    { vehicle: 'Innova Crysta', models: 'Crysta', ratePerKm: '₹20–25', capacity: '6–7', luggage: '4–5 bags', notes: 'Premium interior' },
    { vehicle: 'Tempo Traveller 9', models: 'Force TT', ratePerKm: '₹22–28', capacity: '8–9', luggage: '7–8 bags', notes: 'Small groups' },
    { vehicle: 'Tempo Traveller 12–17', models: 'Force TT', ratePerKm: '₹25–32', capacity: '10–17', luggage: 'Large', notes: 'AC / Non-AC' },
    { vehicle: 'Luxury', models: 'BMW, Audi', ratePerKm: '₹70–150', capacity: '2–3', luggage: '2–3 bags', notes: 'VIP travel' },
    { vehicle: 'Mini Bus', models: '18–27 seater', ratePerKm: '₹35–55', capacity: '18–27', luggage: 'Large', notes: 'Weddings & groups' },
    { vehicle: 'Full Bus', models: '35–45 seater', ratePerKm: '₹50–70', capacity: '35–45', luggage: 'Large', notes: 'Long group tours' },
];

// How pricing works — every charge explained in one plain sentence.
const pricingRules = [
    {
        title: 'Per-km rate',
        text: 'The base of every quote is the distance driven multiplied by your vehicle’s per-km rate from the table above.',
    },
    {
        title: 'Driver allowance: ₹300–500 per day',
        text: 'On outstation trips the driver’s food and overnight stay is covered by a fixed daily allowance, so you never haggle over it.',
    },
    {
        title: 'Tolls and parking: at actuals',
        text: 'Highway tolls and monument parking are charged exactly at receipt value — you pay what the booth charged, nothing more.',
    },
    {
        title: 'Outstation minimum: 250 km per day',
        text: 'Outstation days are billed at a minimum of 250 km per day even if you drive less, which is the industry-standard way of covering the car’s committed day.',
    },
    {
        title: 'Night charges: ₹200–300 after 10 PM',
        text: 'If your trip has the driver on the road after 10 PM, a small fixed night charge applies for the late duty.',
    },
    {
        title: 'One-way trips may bill as round trip',
        text: 'The car has to drive back empty to its home city, so one-way outstation fares sometimes include the return distance — we always tell you upfront when this applies.',
    },
];

// Popular routes. Package prices come from the rate card transport column;
// routes without a confirmed package price are quoted on WhatsApp.
// TODO: verify — fill remaining route package prices from GIT_Rate_Card.xlsx.
const routes = [
    { route: 'Delhi → Agra same day (return)', distance: '≈ 470 km round trip', price: 'From ₹5,500 (sedan)' },
    { route: 'Delhi → Agra one way', distance: '≈ 233 km · 3.5 hrs', price: 'Quote on WhatsApp' },
    { route: 'Agra → Jaipur (via Fatehpur Sikri)', distance: '≈ 240 km · 4.5–5 hrs', price: 'Quote on WhatsApp' },
    { route: 'Delhi → Jaipur one way', distance: '≈ 280 km · 5 hrs', price: 'Quote on WhatsApp' },
    { route: 'Agra → Mathura & Vrindavan (return)', distance: '≈ 120 km round trip', price: 'Quote on WhatsApp' },
    { route: 'Golden Triangle 3-day circuit', distance: '≈ 750 km total', price: 'Quote on WhatsApp' },
];

const faqs = [
    {
        question: 'Is the driver English-speaking?',
        answer: 'Drivers speak Hindi and functional English — enough for pickups, timings and roadside needs. For monument commentary and full English (or German, French, Spanish, Italian, Russian) conversation, add a licensed guide to your booking; drivers are not guides.',
    },
    {
        question: 'Are tolls and parking included in the per-km rate?',
        answer: 'No — tolls and parking are charged at actuals, meaning exactly what the toll booth or monument car park charged, shown transparently on your final bill. The per-km rate covers the car, fuel and driver.',
    },
    {
        question: 'Why is a one-way trip sometimes billed as a round trip?',
        answer: 'Because the car and driver must return empty to their home city after dropping you. Where no return passenger exists, the empty return distance is part of the cost. We always tell you before booking whether round-trip billing applies to your route.',
    },
    {
        question: 'What does the 250 km per day minimum mean?',
        answer: 'On outstation (out-of-city) trips, each day is billed for at least 250 km even if you drive less. It compensates the committed vehicle and driver for the full day and is standard across Indian car rental.',
    },
    {
        question: 'What exactly will my final bill contain?',
        answer: 'Distance × per-km rate, plus the driver’s daily allowance (₹300–500/day on outstation trips), tolls and parking at actual receipt value, and a ₹200–300 night charge only if the driver is on duty after 10 PM. No fuel surcharges, no hidden extras.',
    },
    {
        question: 'Are the vehicles air-conditioned and licensed?',
        answer: 'Yes — all vehicles run AC (tempo travellers can be booked AC or non-AC), hold commercial tourist permits, and are driven by verified professional drivers who do these routes daily.',
    },
    {
        question: 'Can I book a car together with a licensed guide?',
        answer: 'Absolutely — that is our core product. See our tour programmes for car + guide packages with published prices, or ask on WhatsApp and we will combine a vehicle and a government-licensed guide for your dates.',
    },
    {
        question: 'How do I get an exact quote?',
        answer: 'Message us on WhatsApp (+91 8979810991) with your route, dates and group size. You get a final all-inclusive quote within 2 hours, itemized exactly as described above.',
    },
];

const faqSchema = generateFAQSchema(faqs);

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.guideindiatours.com/taxi#service',
    name: 'Taxi & Car Rental with Driver',
    serviceType: 'Chauffeur-driven car rental and taxi service',
    description: 'Private chauffeur-driven taxi and car rental across Agra, Delhi, Jaipur and the Golden Triangle: sedans, SUVs, Innova Crysta, tempo travellers, luxury cars and buses with transparent per-km pricing.',
    provider: { '@id': 'https://www.guideindiatours.com/#organization' },
    areaServed: [
        { '@type': 'City', name: 'Agra' },
        { '@type': 'City', name: 'Delhi' },
        { '@type': 'City', name: 'Jaipur' },
        { '@type': 'City', name: 'Mathura' },
        { '@type': 'State', name: 'Uttar Pradesh' },
        { '@type': 'State', name: 'Rajasthan' },
    ],
    url: 'https://www.guideindiatours.com/taxi',
    termsOfService: 'https://www.guideindiatours.com/terms-of-service',
};

const whatsappHref = `https://wa.me/918979810991?text=${encodeURIComponent(
    'Hi! I need a taxi quote. Route: ___, Date: ___, Travellers: ___.'
)}`;

export default function TaxiPage() {
    return (
        <main className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema]) }} />

            <PageHero
                breadcrumbs={[{ label: 'Services', href: '/services' }, { label: 'Taxi & Car Rental' }]}
                badge="Transport & Car Rental"
                title={<>Taxi &amp; Car Rental <span className="text-maroon-600">with Driver</span></>}
                subtitle="Delhi to Agra taxi, Agra car rental with driver, tempo travellers and buses — the same transparent pricing we publish on our tours, applied to pure transport."
                meta={
                    <>
                        <span className="flex items-center gap-2"><Car className="w-4 h-4 text-maroon-600" /> Sedan to 45-seat bus</span>
                        <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-maroon-600" /> Commercial permits, verified drivers</span>
                        <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-maroon-600" /> Quote on WhatsApp within 2 hours</span>
                    </>
                }
            />

            {/* Fleet table */}
            <section className="py-14 md:py-20 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-1 bg-maroon-600"></div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Our <span className="text-maroon-600">Fleet</span></h2>
                    </div>
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[640px]">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Vehicle</th>
                                        <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Rate / km</th>
                                        <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Seats</th>
                                        <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Luggage</th>
                                        <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fleet.map((v) => (
                                        <tr key={v.vehicle} className="border-b border-gray-50 last:border-b-0">
                                            <td className="p-4">
                                                <span className="font-bold text-gray-900 block">{v.vehicle}</span>
                                                <span className="text-sm text-gray-500 font-light">{v.models}</span>
                                            </td>
                                            <td className="p-4 font-black text-maroon-600 whitespace-nowrap">{v.ratePerKm}</td>
                                            <td className="p-4 text-gray-700"><span className="inline-flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-maroon-600" />{v.capacity}</span></td>
                                            <td className="p-4 text-gray-700"><span className="inline-flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-maroon-600" />{v.luggage}</span></td>
                                            <td className="p-4 text-gray-500 font-light">{v.notes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-4 pb-5 pt-1">
                            <p className="text-xs text-gray-500 font-light flex items-start gap-2">
                                <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gold-500" />
                                Rates are indicative bands — the exact rate depends on route, season and availability. Your WhatsApp quote is final and all-inclusive.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How pricing works */}
            <section className="py-14 md:py-20 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-1 bg-maroon-600"></div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">How pricing works — <span className="text-maroon-600">no surprises</span></h2>
                    </div>
                    <p className="text-gray-500 font-light text-lg mb-10 max-w-3xl">
                        Indian car rental has a few industry-standard charges that surprise first-time visitors. Here is every one of them, explained before you book instead of on the bill.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pricingRules.map((rule) => (
                            <div key={rule.title} className="bg-ivory-100 rounded-3xl border border-gray-100 p-8">
                                <h3 className="font-bold text-gray-900 mb-2">{rule.title}</h3>
                                <p className="text-gray-600 font-light leading-relaxed text-sm">{rule.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular routes */}
            <section className="py-14 md:py-20 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-1 bg-maroon-600"></div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Popular <span className="text-maroon-600">Routes</span></h2>
                    </div>
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[560px]">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Route</th>
                                        <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Distance</th>
                                        <th className="p-4 font-bold text-gray-400 uppercase text-[11px] sm:text-[10px] tracking-widest">Package Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routes.map((r) => (
                                        <tr key={r.route} className="border-b border-gray-50 last:border-b-0">
                                            <td className="p-4 font-bold text-gray-900">{r.route}</td>
                                            <td className="p-4 text-gray-600 font-light whitespace-nowrap">{r.distance}</td>
                                            <td className="p-4">
                                                {r.price.startsWith('From') ? (
                                                    <span className="font-black text-maroon-600 whitespace-nowrap">{r.price}</span>
                                                ) : (
                                                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#128C7E] hover:underline whitespace-nowrap">
                                                        <WhatsAppIcon className="w-3.5 h-3.5" /> {r.price}
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-4 pb-5 pt-1">
                            <p className="text-xs text-gray-500 font-light flex items-start gap-2">
                                <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gold-500" />
                                Want the monuments too? Our <Link href="/plans" className="text-maroon-600 font-medium underline underline-offset-2">tour programmes</Link> bundle these routes with a licensed guide and published from-prices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Photo + CTA */}
            <section className="py-14 md:py-20 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="relative rounded-3xl overflow-hidden bg-black">
                        <Image
                            src="/images/services/transport/dextar-vision-X5wjk_yD9IA-unsplash.jpg"
                            alt="Private chauffeur-driven car rental in Agra and Delhi"
                            width={1600}
                            height={700}
                            className="object-cover w-full h-64 md:h-80 opacity-60"
                        />
                        <div className="absolute inset-0 flex items-center">
                            <div className="px-8 md:px-16 max-w-2xl">
                                <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">Tell us your route — get a final quote in 2 hours</h2>
                                <p className="text-white/70 font-light mb-8">Itemized exactly like this page: km rate, driver allowance, tolls at actuals. Nothing else.</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl px-8 py-6 text-base font-bold">
                                        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                                            <WhatsAppIcon className="w-5 h-5 mr-2" /> WhatsApp +91 8979810991
                                        </a>
                                    </Button>
                                    <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white hover:text-gray-900 rounded-xl px-8 py-6 text-base font-bold">
                                        <a href="tel:+919410000991">
                                            <Phone className="w-5 h-5 mr-2" /> Call +91 9410000991
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-14 md:py-20 bg-ivory-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-maroon-600"></div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Taxi &amp; Transport <span className="text-maroon-600">FAQs</span></h2>
                    </div>
                    <div className="space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="bg-white p-8 rounded-2xl border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                                <p className="text-gray-500 font-light leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Button asChild variant="link" className="text-maroon-600 text-base">
                            <Link href="/plans">
                                Prefer car + licensed guide? See tour programmes with prices <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
