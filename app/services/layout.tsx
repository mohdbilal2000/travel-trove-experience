import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Services | Private Tours, Hotel Booking & Transport | Guide India Tours',
    description: 'Explore Guide India Tours services: private guided tours, luxury hotel arrangements, AC car transport, airport transfers, monument tickets & 24/7 WhatsApp support across India.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/services',
        languages: {
            'en-US': 'https://www.guideindiatours.com/services',
            'en-GB': 'https://www.guideindiatours.com/services',
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

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
