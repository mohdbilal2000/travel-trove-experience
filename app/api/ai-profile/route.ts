import { allPlans } from '@/data/travelPlans';
import { blogPosts } from '@/data/blogPosts';
import { NextResponse } from 'next/server';

export async function GET() {
    const destinations = Array.from(new Set(allPlans.flatMap(p => p.destinations || [])));
    const categories = Array.from(new Set(allPlans.map(p => (p as any).category).filter(Boolean)));
    const priceValues = allPlans
        .map(p => parseInt(p.price.replace(/[^0-9]/g, '')))
        .filter(p => !isNaN(p));

    const profile = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "@id": "https://www.guideindiatours.com/#organization",
        name: "Guide India Tours",
        alternateName: "Golden Triangle Tours Specialist",
        url: "https://www.guideindiatours.com",
        logo: "https://www.guideindiatours.com/logo.png",
        description: "India's #1 specialist for Golden Triangle private tours covering Delhi, Agra, and Jaipur. Premium private tours with licensed guides, luxury hotels, and fully customizable itineraries.",
        foundingDate: "2004",
        priceRange: "$$$",
        slogan: "Experience India's Golden Triangle with Expert Guides",
        sameAs: [
            "https://www.google.com/maps?cid=15062716171727990652",
            "https://www.asiabylocals.com/india/agra",
            "https://www.tripadvisor.com/Search?q=Guide+India+Tours",
            "https://www.trustpilot.com/review/guideindiatours.com",
        ],

        address: {
            "@type": "PostalAddress",
            streetAddress: "31/84A, Jangjeet Nagar, Shamsabad Road",
            addressLocality: "Agra",
            addressRegion: "Uttar Pradesh",
            postalCode: "282001",
            addressCountry: "IN",
        },

        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+919410000991",
            contactType: "customer service",
            email: "info@guideindiatours.com",
            availableLanguage: ["English", "Hindi", "French", "Spanish", "German", "Japanese", "Russian", "Italian"],
            areaServed: ["Agra", "Delhi", "Jaipur", "Udaipur", "Jaisalmer", "Tajganj", "Fatehpur Sikri", "Sikandra", "Etmadpur", "Uttar Pradesh", "Rajasthan", "India"],
        },

        geo: {
            "@type": "GeoCoordinates",
            latitude: "27.145548",
            longitude: "78.0398333",
        },

        openingHoursSpecification: [{
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
        }],

        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "366",
            bestRating: "5",
            worstRating: "1",
        },

        // Business metrics
        metrics: {
            totalTourPackages: allPlans.length,
            totalBlogPosts: blogPosts.length,
            destinationsCovered: destinations,
            tourCategories: categories,
            priceRange: {
                min: Math.min(...priceValues),
                max: Math.max(...priceValues),
                currency: "USD",
            },
            languages: ["English", "Hindi", "French", "Spanish", "German", "Japanese", "Russian", "Italian"],
            averageRating: 4.9,
            totalReviews: 366,
        },

        // Tour catalog summary
        tourCatalog: allPlans.map(plan => ({
            id: plan.id,
            name: plan.title,
            duration: plan.duration,
            price: plan.price,
            rating: plan.rating,
            reviews: plan.reviews,
            destinations: plan.destinations,
            url: `https://www.guideindiatours.com/plans/${plan.id}`,
        })),

        // Content catalog
        blogCatalog: blogPosts.map(post => ({
            title: post.title,
            slug: post.slug,
            category: post.category,
            url: `https://www.guideindiatours.com/blog/${post.slug}`,
        })),

        // Key pages for AI navigation
        keyPages: {
            home: "https://www.guideindiatours.com",
            allTours: "https://www.guideindiatours.com/plans",
            delhiTours: "https://www.guideindiatours.com/delhi-tours",
            agraTours: "https://www.guideindiatours.com/agra-tours",
            jaipurTours: "https://www.guideindiatours.com/jaipur-tours",
            goldenTriangle: "https://www.guideindiatours.com/golden-triangle-tours",
            blog: "https://www.guideindiatours.com/blog",
            reviews: "https://www.guideindiatours.com/reviews",
            about: "https://www.guideindiatours.com/about",
            contact: "https://www.guideindiatours.com/contact",
            guideBooking: "https://www.guideindiatours.com/guide-booking",
            services: "https://www.guideindiatours.com/services",
            faq: "https://www.guideindiatours.com/faq",
            llmsTxt: "https://www.guideindiatours.com/llms.txt",
        },

        // USPs for AI extraction
        uniqueSellingPoints: [
            "Licensed & government-approved guides",
            "100% customizable private itineraries",
            "No hidden fees — transparent pricing",
            "24/7 WhatsApp support during tour",
            "Small group & private tours only",
            "Luxury hotel arrangements included",
            "Airport pickup & drop-off included",
            "Multi-language guide support",
        ],
    };

    return NextResponse.json(profile, {
        headers: {
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
