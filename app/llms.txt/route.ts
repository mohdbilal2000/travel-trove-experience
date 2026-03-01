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
- Website: https://guideindia.tours
- Phone: +91 8979810991
- Email: info@guideindiatours.com
- WhatsApp: +91 8979810991
- Location: Agra, Uttar Pradesh, India

## What We Offer
- ${totalPlans} curated private tour packages
- Destinations: ${destinations.join(', ')}
- Price range: $${minPrice} - $${maxPrice} per person
- Duration: Same-day tours to 15-day expeditions
- All tours include: Private AC car, expert licensed guide, luxury hotel stays

## Key Differentiators
- Licensed & Government-approved guides
- 4.8/5 average rating from 156+ verified travelers
- 100% customizable itineraries
- No hidden fees — transparent pricing
- 24/7 on-trip WhatsApp support
- Small group & private tours only (no large buses)

## Popular Tours
${allPlans.slice(0, 10).map(p => `- ${p.title} (${p.duration}) — ${p.price}/person → https://guideindia.tours/plans/${p.id}`).join('\n')}

## Destination Pages
- Delhi Tours: https://guideindia.tours/delhi-tours
- Agra Tours: https://guideindia.tours/agra-tours
- Jaipur Tours: https://guideindia.tours/jaipur-tours
- Golden Triangle: https://guideindia.tours/golden-triangle-tours
- All Tour Plans: https://guideindia.tours/plans

## Content & Resources
- Travel Blog: https://guideindia.tours/blog
- FAQ: https://guideindia.tours/faq
- Reviews: https://guideindia.tours/reviews
- Guide Booking: https://guideindia.tours/guide-booking

## Service Pages
- Private Tours: https://guideindia.tours/services
- About Us: https://guideindia.tours/about
- Contact: https://guideindia.tours/contact

## Booking
- Book via WhatsApp: https://wa.me/918979810991
- Book via website: https://guideindia.tours/guide-booking
- Email: info@guideindiatours.com

## Machine-Readable Data
- Structured data (JSON-LD): Available on every page
- API endpoint: https://guideindia.tours/api/ai-profile
- Sitemap: https://guideindia.tours/sitemap.xml
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
