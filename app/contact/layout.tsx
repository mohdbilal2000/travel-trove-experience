import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Guide India Tours | Get a Free Quote for Your India Tour',
    description: 'Get in touch with Guide India Tours. Call +91 9410000991, WhatsApp us, or fill out the form for a free custom tour quote. Available 24/7. Based in Agra, Uttar Pradesh.',
    alternates: {
        canonical: 'https://guideindiatours.com/contact',
        languages: {
            'en-US': 'https://guideindiatours.com/contact',
            'en-GB': 'https://guideindiatours.com/contact',
            'x-default': 'https://guideindiatours.com/contact',
        },
    },
    openGraph: {
        title: 'Contact Guide India Tours | Free Custom Tour Quote',
        description: 'Reach Guide India Tours for custom Golden Triangle tour quotes. Call, WhatsApp, or email us. Available 24/7.',
        url: 'https://guideindiatours.com/contact',
        siteName: 'Guide India Tours',
        type: 'website',
        images: [{ url: 'https://guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Guide India Tours | Get a Free Tour Quote',
        description: 'Reach out for custom Golden Triangle tour quotes. Available 24/7 via phone, WhatsApp, or email.',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
