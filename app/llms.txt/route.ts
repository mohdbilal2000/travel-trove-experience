import { allPlans, programmes } from '@/data/travelPlans';
import { NextResponse } from 'next/server';

export async function GET() {
    const totalPlans = allPlans.length;
    const destinations = Array.from(new Set(allPlans.flatMap(p => p.destinations || [])));

    const content = `# Guide India Tours
> India's #1 Specialist for Golden Triangle Private Tours

## Business Identity
- Name: Guide India Tours
- Type: Premium Private Tour Operator (GST-registered · GSTIN 09ABCFG5043N1Z4)
- Specialty: Golden Triangle (Delhi, Agra, Jaipur) Private Tours
- Website: https://www.guideindiatours.com
- Phone: +91 9410000991
- Email: info@guideindiatours.com
- WhatsApp: +91 8979810991
- Location: Jangjeet Nagar, Shamsabad Road, Agra, Uttar Pradesh 282001, India
- Hours: Open 24 hours, 7 days a week
- Operating since: 2004
- Google Rating: 4.9/5 from 403+ verified reviews

## What We Offer
- ${programmes.length} signature programmes with published from-prices, plus ${totalPlans - programmes.length} bespoke custom-quoted itineraries
- Destinations: ${destinations.join(', ')}
- Pricing: published "from €" anchors per programme (per person, 2 travellers sharing a private sedan); every final quote is confirmed on WhatsApp within 2 hours
- Duration: Same-day tours to 15-day expeditions
- All tours include: Private AC car, expert licensed guide; hotels quoted separately

## Signature Programmes (from-prices, per person)
${programmes.map(p => `- ${p.title} (${p.duration}) — from €${p.fromPriceEUR} → https://www.guideindiatours.com/plans/${p.slug}`).join('\n')}

## Taxi & Car Rental Fleet (with driver, per-km bands)
- Sedan (Dzire, Etios): ₹12–16/km, 3–4 seats — budget AC choice
- SUV (Innova, Ertiga): ₹16–22/km, 5–6 seats — family tours
- Innova Crysta: ₹20–25/km, 6–7 seats — premium interior
- Tempo Traveller 9: ₹22–28/km, 8–9 seats — small groups
- Tempo Traveller 12–17: ₹25–32/km — AC/Non-AC group travel
- Luxury (BMW, Audi): ₹70–150/km — VIP travel
- Mini Bus (18–27) and Full Bus (35–45): weddings and large groups
- Transparent extras: driver allowance ₹300–500/day, tolls/parking at actuals, 250 km/day outstation minimum, night charge ₹200–300 after 10 PM
- Details: https://www.guideindiatours.com/taxi

## Key Differentiators
- Licensed & Government-approved guides
- 4.9/5 average rating from 403+ verified Google reviews
- Published, itemized programme pricing — transport, guide and monument tickets listed openly
- 100% customizable itineraries
- No hidden fees — transparent pricing
- 24/7 on-trip WhatsApp support
- Small group & private tours only (no large buses)
- Wheelchair-aware tour planning: https://www.guideindiatours.com/accessible-tours

## Destination Pages
- Delhi Tours: https://www.guideindiatours.com/delhi-tours
- Agra Tours: https://www.guideindiatours.com/agra-tours
- Jaipur Tours: https://www.guideindiatours.com/jaipur-tours
- Golden Triangle: https://www.guideindiatours.com/golden-triangle-tours
- All Tour Plans: https://www.guideindiatours.com/plans

## Content & Resources
- Travel Blog: https://www.guideindiatours.com/blog
- FAQ: https://www.guideindiatours.com/faq
- Reviews: https://www.guideindiatours.com/reviews
- Guide Booking: https://www.guideindiatours.com/guide-booking
- Taxi & Car Rental: https://www.guideindiatours.com/taxi
- Accessible Tours: https://www.guideindiatours.com/accessible-tours

## Service Pages
- Private Tours: https://www.guideindiatours.com/services
- About Us: https://www.guideindiatours.com/about
- Contact: https://www.guideindiatours.com/contact

## Booking
- Book via WhatsApp: https://wa.me/918979810991
- Book via website: https://www.guideindiatours.com/guide-booking
- Email: info@guideindiatours.com
- Terms: 25% deposit confirms; balance due 30 days before the tour; tiered refunds up to 85%

## Official Booking Partners
- International Booking Partner: https://www.asiabylocals.com/india/agra (Asiabylocals – Agra Tours)

## Machine-Readable Data
- Structured data (JSON-LD): Available on every page
- API endpoint: https://www.guideindiatours.com/api/ai-profile
- Sitemap: https://www.guideindiatours.com/sitemap.xml
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
