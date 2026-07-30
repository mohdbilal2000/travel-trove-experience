import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Plan My Tour | Free Custom India Itinerary & Quote | Guide India Tours',
    description: 'Tell us your dates, guests, destinations and interests — we build a personalised India itinerary with a transparent quotation and no hidden charges. Government-approved guides since 2007.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/plan-my-tour',
        languages: {
            'en-US': 'https://www.guideindiatours.com/plan-my-tour',
            'en-GB': 'https://www.guideindiatours.com/plan-my-tour',
            'x-default': 'https://www.guideindiatours.com/plan-my-tour',
        },
    },
    openGraph: {
        title: 'Plan My Tour | Free Custom India Itinerary & Quote',
        description: 'Share your travel dates, group size and interests. We send back a personalised itinerary and a transparent quote — no hidden charges.',
        url: 'https://www.guideindiatours.com/plan-my-tour',
        siteName: 'Guide India Tours',
        type: 'website',
        images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Plan My Tour | Free Custom India Itinerary & Quote',
        description: 'Share your dates and interests — get a personalised India itinerary and transparent quote.',
    },
};

const planMyTourSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://www.guideindiatours.com/plan-my-tour",
    "name": "Plan My Tour — Guide India Tours",
    "description": "Custom India tour enquiry form. Share your travel dates, guests, destinations, transport and interests to receive a personalised itinerary and transparent quotation.",
    "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.guideindiatours.com/#website"
    },
    "provider": {
        "@type": "TravelAgency",
        "@id": "https://www.guideindiatours.com/#organization",
        "name": "Guide India Tours",
        "url": "https://www.guideindiatours.com",
        "email": "info@guideindiatours.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "31/84A, Jangjeet Nagar, Shamsabad Road",
            "addressLocality": "Agra",
            "addressRegion": "Uttar Pradesh",
            "postalCode": "282001",
            "addressCountry": "IN"
        }
    },
    "potentialAction": {
        "@type": "ReserveAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.guideindiatours.com/plan-my-tour",
            "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
            ]
        },
        "result": {
            "@type": "Reservation",
            "name": "Custom India tour itinerary and quotation"
        }
    }
};

export default function PlanMyTourLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(planMyTourSchema) }}
            />
            {children}
        </>
    );
}
