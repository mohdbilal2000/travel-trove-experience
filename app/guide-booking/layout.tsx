import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Book a Guide | Licensed Tour Guides for Delhi, Agra & Jaipur | Guide India Tours',
    description: 'Book a government-licensed tour guide for Taj Mahal, Red Fort, Amber Fort & more. Choose your language, preferred monuments, and tour package. Instant WhatsApp booking.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/guide-booking',
        languages: {
            'en-US': 'https://www.guideindiatours.com/guide-booking',
            'en-GB': 'https://www.guideindiatours.com/guide-booking',
            'x-default': 'https://www.guideindiatours.com/guide-booking',
        },
    },
    openGraph: {
        title: 'Book a Licensed Tour Guide | Guide India Tours',
        description: 'Book government-approved tour guides for Delhi, Agra & Jaipur. Multi-language support, instant WhatsApp confirmation.',
        url: 'https://www.guideindiatours.com/guide-booking',
        siteName: 'Guide India Tours',
        type: 'website',
        images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Book a Licensed Tour Guide | Guide India Tours',
        description: 'Book government-approved tour guides for Delhi, Agra & Jaipur monuments.',
    },
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Licensed Tour Guide Booking',
    'serviceType': 'Tour Guide',
    'provider': { '@id': 'https://www.guideindiatours.com/#organization' },
    'areaServed': [
        { '@type': 'City', 'name': 'Agra' },
        { '@type': 'City', 'name': 'Delhi' },
        { '@type': 'City', 'name': 'Jaipur' }
    ],
    'availableLanguage': ['English', 'French', 'German', 'Spanish', 'Japanese', 'Russian', 'Italian'],
    'url': 'https://www.guideindiatours.com/guide-booking',
    'description': 'Book a government-approved, licensed tour guide for the Taj Mahal, Agra Fort, Red Fort, Amber Fort and more — across Agra, Delhi and Jaipur, in seven languages.',
    'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Guide Packages',
        'itemListElement': [
            { '@type': 'Offer', 'name': 'Basic - Licensed Guide Per Monument', 'price': '11.99', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' },
            { '@type': 'Offer', 'name': 'Standard - Half/Full Day Tour', 'priceCurrency': 'USD', 'priceSpecification': { '@type': 'PriceSpecification', 'minPrice': '28.99', 'maxPrice': '38.99', 'priceCurrency': 'USD' }, 'availability': 'https://schema.org/InStock' },
            { '@type': 'Offer', 'name': 'Luxury - VIP Expert Guide', 'priceCurrency': 'USD', 'priceSpecification': { '@type': 'PriceSpecification', 'minPrice': '55.99', 'maxPrice': '111.99', 'priceCurrency': 'USD' }, 'availability': 'https://schema.org/InStock' },
            { '@type': 'Offer', 'name': 'Golden Triangle Multi-City', 'price': '299', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' }
        ]
    }
};

export default function GuideBookingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            {children}
        </>
    );
}
