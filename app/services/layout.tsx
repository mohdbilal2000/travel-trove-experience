import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Services | Private Tours, Hotel Booking & Transport | Guide India Tours',
    description: 'Explore Guide India Tours services: private guided tours, luxury hotel arrangements, AC car transport, airport transfers, monument tickets & 24/7 WhatsApp support across India.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/services',
        languages: {
            'en': 'https://www.guideindiatours.com/services',
            'en-US': 'https://www.guideindiatours.com/services',
            'en-GB': 'https://www.guideindiatours.com/services',
            'en-IN': 'https://www.guideindiatours.com/services',
            'en-AU': 'https://www.guideindiatours.com/services',
            'x-default': 'https://www.guideindiatours.com/services',
        },
    },
    openGraph: {
        title: 'Our Services | Guide India Tours',
        description: 'Complete tour services: private guides, luxury hotels, AC transport, airport transfers. All-inclusive India tour packages.',
        url: 'https://www.guideindiatours.com/services',
        siteName: 'Guide India Tours',
        type: 'website',
        images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Services | Guide India Tours',
        description: 'Complete tour services: private guides, luxury hotels, AC transport, airport transfers.',
    },
};

const servicesSchema = [
    {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://www.guideindiatours.com/services#service',
        'name': 'Guide India Tours - Full Service Travel',
        'serviceType': 'Travel Agency Services',
        'provider': { '@id': 'https://www.guideindiatours.com/#organization' },
        'areaServed': [
            { '@type': 'Country', 'name': 'India' },
            { '@type': 'City', 'name': 'Delhi' },
            { '@type': 'City', 'name': 'Agra' },
            { '@type': 'City', 'name': 'Jaipur' }
        ],
        'url': 'https://www.guideindiatours.com/services',
        'description': 'Complete India tour services including government-licensed private guides, luxury hotel bookings, AC car transport, airport transfers, monument tickets, and 24/7 WhatsApp support.',
        'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Travel Services',
            'itemListElement': [
                { '@type': 'OfferCatalog', 'name': 'Private Guided Tours', 'description': 'Government-licensed expert guides for monuments and full-day tours.' },
                { '@type': 'OfferCatalog', 'name': 'Luxury Hotel Booking', 'description': 'Curated 4 and 5-star hotel reservations at the best negotiated rates.' },
                { '@type': 'OfferCatalog', 'name': 'Private AC Transport', 'description': 'Premium air-conditioned vehicles with professional chauffeurs.' },
                { '@type': 'OfferCatalog', 'name': 'Airport Transfers', 'description': '24/7 private airport pickup and drop-off across all Indian cities.' },
                { '@type': 'OfferCatalog', 'name': 'Monument Ticketing', 'description': 'Skip-the-line tickets for the Taj Mahal, Agra Fort, Amber Fort and more.' },
                { '@type': 'OfferCatalog', 'name': 'Custom Itinerary Design', 'description': 'Bespoke multi-city tour planning tailored to your interests.' }
            ]
        },
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.9',
            'reviewCount': '366',
            'bestRating': '5',
            'worstRating': '1'
        }
    },
    {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.guideindiatours.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Services', 'item': 'https://www.guideindiatours.com/services' }
        ]
    }
];

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
            />
            {children}
        </>
    );
}
