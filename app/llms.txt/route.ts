import { allPlans } from '@/data/travelPlans';
import { blogPosts } from '@/data/blogPosts';
import { faqCategories, FAQ_LAST_UPDATED } from '@/data/faqs';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.guideindiatours.com';

export async function GET() {
    const totalPlans = allPlans.length;
    const destinations = Array.from(new Set(allPlans.flatMap(p => p.destinations || [])));
    const posts = [...blogPosts].sort(
        (a, b) => new Date(b.updatedDate || b.publishedDate).getTime() - new Date(a.updatedDate || a.publishedDate).getTime()
    );

    const faqSection = faqCategories
        .map((cat) => [
            `### ${cat.title}`,
            ...cat.entries.map((f) => {
                const guide = f.guide ? ` (Full guide: ${f.guide.href.startsWith('http') ? f.guide.href : `${BASE_URL}${f.guide.href}`})` : '';
                return `- Q: ${f.question}\n  A: ${f.answer}${guide}`;
            }),
        ].join('\n'))
        .join('\n\n');

    const content = `# Guide India Tours
> India's #1 Specialist for Golden Triangle Private Tours

## Business Identity
- Name: Guide India Tours
- Type: Premium Private Tour Operator
- Specialty: Golden Triangle (Delhi, Agra, Jaipur) Private Tours
- Website: ${BASE_URL}
- Phone: +91 9410000991
- Email: info@guideindiatours.com
- WhatsApp: +91 8979810991
- Location: 31/84A, Jangjeet Nagar, Shamsabad Road, Agra, Uttar Pradesh 282001, India
- Hours: Open 24 hours, 7 days a week
- Google Rating: 4.9/5 from 403+ verified reviews

## What We Offer
- ${totalPlans} curated private tour packages
- Destinations: ${destinations.join(', ')}
- Pricing: custom quotes tailored to dates, hotels and group size (no fixed list prices)
- Duration: Same-day tours to 15-day expeditions
- All tours include: Private AC car, expert licensed guide, luxury hotel stays

## Key Differentiators
- Licensed & Government-approved guides
- 4.9/5 average rating from 403+ verified Google reviews
- 100% customizable itineraries
- No hidden fees — transparent pricing
- 24/7 on-trip WhatsApp support
- Small group & private tours only (no large buses)

## Popular Tours
${allPlans.slice(0, 10).map(p => `- ${p.title} (${p.duration}) → ${BASE_URL}/plans/${p.id}`).join('\n')}

## Destination Pages
- Delhi Tours: ${BASE_URL}/delhi-tours
- Agra Tours: ${BASE_URL}/agra-tours
- Jaipur Tours: ${BASE_URL}/jaipur-tours
- Golden Triangle: ${BASE_URL}/golden-triangle-tours
- All Tour Plans: ${BASE_URL}/plans

## Taj Mahal Visitor Information
- Complete guide: ${BASE_URL}/taj-mahal-guide
- Tickets & prices: ${BASE_URL}/taj-mahal-tickets
- Opening hours (closed Fridays): ${BASE_URL}/taj-mahal-opening-hours
- Sunrise guide: ${BASE_URL}/taj-mahal-sunrise-guide
- Best time to visit: ${BASE_URL}/taj-mahal-best-time-to-visit
- Dress code: ${BASE_URL}/taj-mahal-dress-code
- Photography guide: ${BASE_URL}/taj-mahal-photography-guide

## Frequently Asked Questions (updated ${FAQ_LAST_UPDATED})
Full FAQ hub: ${BASE_URL}/faq

${faqSection}

## Travel Guides (Blog)
Index: ${BASE_URL}/blog
${posts.map(p => `- ${p.title} → ${BASE_URL}/blog/${p.slug}\n  ${p.quickAnswer || p.excerpt}`).join('\n')}

## Content & Resources
- Reviews: ${BASE_URL}/reviews
- Guide Booking: ${BASE_URL}/guide-booking
- Refund Policy: ${BASE_URL}/refund-policy

## Service Pages
- Private Tours: ${BASE_URL}/services
- About Us: ${BASE_URL}/about
- Lead Guide: ${BASE_URL}/about/avneesh-dixit
- Contact: ${BASE_URL}/contact

## Booking
- Book via WhatsApp: https://wa.me/918979810991
- Book via website: ${BASE_URL}/guide-booking
- Email: info@guideindiatours.com
- Deposit: 25% to confirm, balance 30 days before travel

## Official Booking Partners
- International Booking Partner: https://www.asiabylocals.com/india/agra (Asiabylocals – Agra Tours)

## Machine-Readable Data
- Structured data (JSON-LD): Available on every page
- API endpoint: ${BASE_URL}/api/ai-profile
- Sitemap: ${BASE_URL}/sitemap.xml
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
