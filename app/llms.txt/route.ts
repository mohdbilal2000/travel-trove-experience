import { allPlans } from '@/data/travelPlans';
import { NextResponse } from 'next/server';

export async function GET() {
    const totalPlans = allPlans.length;
    const destinations = Array.from(new Set(allPlans.flatMap(p => p.destinations || [])));
    const priceRange = allPlans
        .map(p => parseInt(p.price.replace(/[^0-9]/g, '')))
        .filter(p => !isNaN(p));
    const minPrice = Math.min(...priceRange);
    const maxPrice = Math.max(...priceRange);

    const content = `# Guide India Tours
> India's #1 Specialist for Golden Triangle Private Tours

## Business Identity
- Name: Guide India Tours
- Type: Premium Private Tour Operator
- Specialty: Golden Triangle (Delhi, Agra, Jaipur) Private Tours
- Website: https://www.guideindiatours.com
- Phone: +91 9410000991
- Email: info@guideindiatours.com
- WhatsApp: +91 8979810991
- Location: 31/84A, Jangjeet Nagar, Shamsabad Road, Agra, Uttar Pradesh 282001, India
- Hours: Open 24 hours, 7 days a week
- Google Rating: 4.9/5 from 366+ verified reviews

## What We Offer
- ${totalPlans} curated private tour packages
- Destinations: ${destinations.join(', ')}
- Price range: $${minPrice} - $${maxPrice} per person
- Duration: Same-day tours to 15-day expeditions
- All tours include: Private AC car, expert licensed guide, luxury hotel stays

## Key Differentiators
- Licensed & Government-approved guides
- 4.9/5 average rating from 366 verified Google reviews
- 100% customizable itineraries
- No hidden fees — transparent pricing
- 24/7 on-trip WhatsApp support
- Small group & private tours only (no large buses)

## Popular Tours
${allPlans.slice(0, 10).map(p => `- ${p.title} (${p.duration}) — ${p.price}/person → https://www.guideindiatours.com/plans/${p.id}`).join('\n')}

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

## Service Pages
- Private Tours: https://www.guideindiatours.com/services
- About Us: https://www.guideindiatours.com/about
- Contact: https://www.guideindiatours.com/contact

## Booking
- Book via WhatsApp: https://wa.me/918979810991
- Book via website: https://www.guideindiatours.com/guide-booking
- Email: info@guideindiatours.com

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
