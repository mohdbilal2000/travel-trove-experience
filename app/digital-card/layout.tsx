import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Digital Business Card | Guide India Tours',
    description: 'Guide India Tours digital business card. Quick access to contact details, tour packages, and booking options for India\'s #1 Golden Triangle tour specialist.',
    alternates: {
        canonical: 'https://guideindiatours.com/digital-card',
    },
    openGraph: {
        title: 'Guide India Tours | Digital Business Card',
        description: 'Quick access to Guide India Tours contact details, tour packages, and booking.',
        url: 'https://guideindiatours.com/digital-card',
        siteName: 'Guide India Tours',
        type: 'website',
        images: [{ url: 'https://guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
    robots: {
        index: false,
        follow: true,
    },
};

export default function DigitalCardLayout({ children }: { children: React.ReactNode }) {
    return children;
}
