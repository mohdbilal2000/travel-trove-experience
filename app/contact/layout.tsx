import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Guide India Tours | Get a Free Quote for Your India Tour',
    description: 'Get in touch with Guide India Tours. Call +91 9410000991, WhatsApp us, or fill out the form for a free custom tour quote. Available 24/7. Based in Agra, Uttar Pradesh.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/contact',
        languages: {
            'en-US': 'https://www.guideindiatours.com/contact',
            'en-GB': 'https://www.guideindiatours.com/contact',
            'x-default': 'https://www.guideindiatours.com/contact',
        },
    },
    openGraph: {
        title: 'Contact Guide India Tours | Free Custom Tour Quote',
        description: 'Reach Guide India Tours for custom Golden Triangle tour quotes. Call, WhatsApp, or email us. Available 24/7.',
        url: 'https://www.guideindiatours.com/contact',
        siteName: 'Guide India Tours',
        type: 'website',
        images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Guide India Tours | Get a Free Tour Quote',
        description: 'Reach out for custom Golden Triangle tour quotes. Available 24/7 via phone, WhatsApp, or email.',
    },
};

const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "url": "https://www.guideindiatours.com/contact",
    "name": "Contact Guide India Tours",
    "mainEntity": {
        "@type": "TravelAgency",
        "@id": "https://www.guideindiatours.com/#organization",
        "name": "Guide India Tours",
        "url": "https://www.guideindiatours.com",
        "email": "info@guideindiatours.com",
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "+91-9410000991",
                "contactType": "customer service",
                "availableLanguage": ["English", "Hindi"],
                "areaServed": "IN"
            },
            {
                "@type": "ContactPoint",
                "telephone": "+91-8979810991",
                "contactType": "reservations",
                "contactOption": "TollFree",
                "availableLanguage": ["English", "Hindi"]
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "31/84A, Jangjeet Nagar, Shamsabad Road",
            "addressLocality": "Agra",
            "addressRegion": "Uttar Pradesh",
            "postalCode": "282001",
            "addressCountry": "IN"
        }
    }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            {children}
        </>
    );
}
