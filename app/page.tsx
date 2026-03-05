
import { Metadata } from 'next';
import HomeClient from "@/components/home/HomeClient";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { allPlans } from "@/data/travelPlans";
import Link from 'next/link';

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
        images: [{ url: 'https://guideindiatours.com/images/og-default.jpg' }],
        type: 'website',
    }
};

export default function Home() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "@id": "https://guideindiatours.com/#organization",
        "name": "Guide India Tours",
        "alternateName": "Golden Triangle Tours Specialist",
        "url": "https://guideindiatours.com",
        "logo": "https://guideindiatours.com/logo.png",
        "image": "https://guideindiatours.com/images/og-default.jpg",
        "priceRange": "$$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "31A/110, Jangjeet Nagar, Shamsabad Road",
            "addressLocality": "Agra",
            "addressRegion": "Uttar Pradesh",
            "postalCode": "282001",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+919410000991",
            "contactType": "customer service",
            "email": "info@guideindiatours.com"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "27.1767",
            "longitude": "78.0081"
        },
        "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
        }],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "366"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://guideindiatours.com/#website",
        "url": "https://guideindiatours.com",
        "name": "Guide India Tours",
        "publisher": { "@id": "https://guideindiatours.com/#organization" },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://guideindiatours.com/plans?city={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]) }}
            />

            {/* Semantic SEO content for initial HTML payload */}
            <div className="sr-only">
                <h1>Guide India Tours - Premium Golden Triangle Specialist</h1>
                <h2>Your Authority for Delhi, Agra, and Jaipur Private Tours</h2>
                <p>
                    Explore the magic of India's Golden Triangle with our curated luxury tour plans.
                    Specializing in Taj Mahal sunrise tours, Delhi historical walks, and Jaipur heritage experiences.
                </p>

                <h3>Recent Guest Experiences & Testimonials</h3>
                <ul>
                    <li>
                        <strong>Rohit Kumar:</strong> Amazing experience! The luxury bus was super comfortable and the guide was very knowledgeable.
                    </li>
                    <li>
                        <strong>Emily Smith:</strong> The best tour company in India! Everything was perfectly organized. The Taj Mahal visit was absolutely magical.
                    </li>
                    <li>
                        <strong>John Lee:</strong> We loved every moment of our trip. The hotels, the food, and the sightseeing were all top-notch.
                    </li>
                </ul>

                <h3>Explore Our Tour Plans</h3>
                <ul>
                    {allPlans.slice(0, 10).map(plan => (
                        <li key={plan.id}>
                            <Link href={`/plans/${plan.id}`}>{plan.title}</Link> - {plan.duration}
                        </li>
                    ))}
                </ul>
            </div>

            <HomeClient />
        </>
    );
}
