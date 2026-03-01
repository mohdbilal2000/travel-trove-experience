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
        "@id": "https://guideindia.tours/#organization",
        name: "Guide India Tours",
        alternateName: "Golden Triangle Tours Specialist",
        url: "https://guideindia.tours",
        logo: "https://guideindia.tours/logo.png",
        description: "India's #1 specialist for Golden Triangle private tours covering Delhi, Agra, and Jaipur. Premium private tours with licensed guides, luxury hotels, and fully customizable itineraries.",
        foundingDate: "2015",
        priceRange: "$$$",
        slogan: "Experience India's Golden Triangle with Expert Guides",

        address: {
            "@type": "PostalAddress",
            streetAddress: "Flate No: 31/84A, Rajpur Jangjeet Nagar, Shamsabad Road",
            addressLocality: "Agra",
            addressRegion: "Uttar Pradesh",
            postalCode: "282001",
            addressCountry: "IN",
        },

        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+918979810991",
            contactType: "customer service",
            email: "info@guideindiatours.com",
            availableLanguage: ["English", "Hindi", "French", "Spanish", "German"],
            areaServed: "Worldwide",
        },

        geo: {
            "@type": "GeoCoordinates",
            latitude: "27.1767",
            longitude: "78.0081",
        },

        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "364",
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
            languages: ["English", "Hindi", "French", "Spanish", "German"],
            averageRating: 4.9,
            totalReviews: 364,
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
            url: `https://guideindia.tours/plans/${plan.id}`,
        })),

        // Content catalog
        blogCatalog: blogPosts.map(post => ({
            title: post.title,
            slug: post.slug,
            category: post.category,
            url: `https://guideindia.tours/blog/${post.slug}`,
        })),

        // Key pages for AI navigation
        keyPages: {
            home: "https://guideindia.tours",
            allTours: "https://guideindia.tours/plans",
            delhiTours: "https://guideindia.tours/delhi-tours",
            agraTours: "https://guideindia.tours/agra-tours",
            jaipurTours: "https://guideindia.tours/jaipur-tours",
            goldenTriangle: "https://guideindia.tours/golden-triangle-tours",
            blog: "https://guideindia.tours/blog",
            reviews: "https://guideindia.tours/reviews",
            about: "https://guideindia.tours/about",
            contact: "https://guideindia.tours/contact",
            guideBooking: "https://guideindia.tours/guide-booking",
            services: "https://guideindia.tours/services",
            faq: "https://guideindia.tours/faq",
            llmsTxt: "https://guideindia.tours/llms.txt",
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
