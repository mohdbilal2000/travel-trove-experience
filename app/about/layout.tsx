import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Guide India Tours | Our Story, Mission & Expert Team',
    description: 'Learn about Guide India Tours — India\'s trusted Golden Triangle specialist since 2004. Meet our government-approved guides, discover our mission, and see why 366+ travelers rate us 4.9/5.',
    alternates: {
        canonical: 'https://www.guideindiatours.com/about',
        languages: {
            'en-US': 'https://www.guideindiatours.com/about',
            'en-GB': 'https://www.guideindiatours.com/about',
            'x-default': 'https://www.guideindiatours.com/about',
        },
    },
    openGraph: {
        title: 'About Guide India Tours | Expert Golden Triangle Specialists',
        description: 'India\'s #1 Golden Triangle tour operator. Government-approved guides, 4.9/5 rated by 366+ travelers. Learn about our team and mission.',
        url: 'https://www.guideindiatours.com/about',
        siteName: 'Guide India Tours',
        type: 'website',
        images: [{ url: 'https://www.guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Guide India Tours | Expert Team & Mission',
        description: 'India\'s #1 Golden Triangle tour operator with government-approved guides. 4.9/5 rated by 366+ travelers.',
    },
};

const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": "https://www.guideindiatours.com/about",
    "name": "About Guide India Tours",
    "mainEntity": {
        "@type": "TravelAgency",
        "@id": "https://www.guideindiatours.com/#organization",
        "name": "Guide India Tours",
        "url": "https://www.guideindiatours.com",
        "foundingDate": "2004",
        "founder": { "@type": "Person", "name": "Bilal", "jobTitle": "Founder" },
        "employee": [
            {
                "@type": "Person",
                "name": "Avneesh Dixit",
                "url": "https://www.guideindiatours.com/about/avneesh-dixit",
                "jobTitle": "Lead Guide (Government-Approved)",
                "knowsLanguage": ["English", "Hindi", "German", "French", "Italian", "Spanish"],
                "worksFor": { "@id": "https://www.guideindiatours.com/#organization" }
            },
            {
                "@type": "Person",
                "name": "Danish",
                "jobTitle": "Ground Operations",
                "worksFor": { "@id": "https://www.guideindiatours.com/#organization" }
            }
        ]
    }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
            />
            {children}
        </>
    );
}
