import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Book a Guide | Licensed Tour Guides for Delhi, Agra & Jaipur | Guide India Tours',
    description: 'Book a government-licensed tour guide for Taj Mahal, Red Fort, Amber Fort & more. Choose your language, preferred monuments, and tour package. Instant WhatsApp booking.',
    alternates: {
        canonical: 'https://guideindiatours.com/guide-booking',
        languages: {
            'en-US': 'https://guideindiatours.com/guide-booking',
            'en-GB': 'https://guideindiatours.com/guide-booking',
            'x-default': 'https://guideindiatours.com/guide-booking',
        },
    },
    openGraph: {
        title: 'Book a Licensed Tour Guide | Guide India Tours',
        description: 'Book government-approved tour guides for Delhi, Agra & Jaipur. Multi-language support, instant WhatsApp confirmation.',
        url: 'https://guideindiatours.com/guide-booking',
        siteName: 'Guide India Tours',
        type: 'website',
        images: [{ url: 'https://guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Book a Licensed Tour Guide | Guide India Tours',
        description: 'Book government-approved tour guides for Delhi, Agra & Jaipur monuments.',
    },
};

export default function GuideBookingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
