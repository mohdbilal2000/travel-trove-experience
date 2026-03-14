
import { Metadata } from 'next';
import HomeClient from "@/components/home/HomeClient";

export const metadata: Metadata = {
    title: "Guide India Tours | #1 Specialist for Golden Triangle Tours Delhi, Agra, Jaipur",
    description: "Experience India's Golden Triangle with the most trusted specialist. Private Agra tours, Taj Mahal sunset visits, and luxury Jaipur experiences. 4.9/5 Rated by 366+ travelers on Google. Book your premium private tour today.",
    keywords: "Golden Triangle Tours, Delhi tours, Agra tours, Jaipur tours, Taj Mahal visit, India travel packages, luxury India tours, same day Agra tour, Jaipur sightseeing, private tour India",
    alternates: {
        canonical: 'https://guideindiatours.com',
        languages: {
            'en-US': 'https://guideindiatours.com',
            'en-GB': 'https://guideindiatours.com',
            'en-AU': 'https://guideindiatours.com',
            'x-default': 'https://guideindiatours.com',
        },
    },
    openGraph: {
        title: "Guide India Tours | Premium Golden Triangle Specialist",
        description: "Official Guide India Tours - India's #1 Private Tour Specialist for Delhi, Agra & Jaipur.",
        url: 'https://guideindiatours.com',
        siteName: 'Guide India Tours',
        images: [{ url: 'https://guideindiatours.com/images/og-default.jpg', width: 1200, height: 630, alt: 'Guide India Tours - Golden Triangle Private Tours' }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Guide India Tours | #1 Golden Triangle Specialist',
        description: 'Private Agra, Delhi & Jaipur tours with government-approved guides. Rated 4.9/5 by 366+ travelers. Book your Golden Triangle tour today.',
        images: ['https://guideindiatours.com/images/og-default.jpg'],
    },
};

export default function Home() {
    return (
        <>

            {/* Accessible heading for screen readers - matches visible hero content */}
            <h1 className="sr-only">Guide India Tours - Premium Golden Triangle Specialist for Delhi, Agra and Jaipur</h1>

            <HomeClient />
        </>
    );
}
