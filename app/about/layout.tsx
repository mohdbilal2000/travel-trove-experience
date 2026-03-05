import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Guide India Tours | Our Story, Mission & Expert Team',
    description: 'Learn about Guide India Tours — India\'s trusted Golden Triangle specialist since 2004. Meet our government-approved guides, discover our mission, and see why 366+ travelers rate us 4.9/5.',
    alternates: {
        canonical: 'https://guideindiatours.com/about',
        languages: {
            'en-US': 'https://guideindiatours.com/about',
            'en-GB': 'https://guideindiatours.com/about',
            'x-default': 'https://guideindiatours.com/about',
        },
    },
    openGraph: {
        title: 'About Guide India Tours | Expert Golden Triangle Specialists',
        description: 'India\'s #1 Golden Triangle tour operator. Government-approved guides, 4.9/5 rated by 366+ travelers. Learn about our team and mission.',
        url: 'https://guideindiatours.com/about',
        siteName: 'Guide India Tours',
        type: 'website',
        images: [{ url: 'https://guideindiatours.com/images/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Guide India Tours | Expert Team & Mission',
        description: 'India\'s #1 Golden Triangle tour operator with government-approved guides. 4.9/5 rated by 366+ travelers.',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
