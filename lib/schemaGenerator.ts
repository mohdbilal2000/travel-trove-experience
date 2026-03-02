
/**
 * Schema.org JSON-LD generators for SEO
 * This utility helps create structured data for various entity types
 */

export type Organization = {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    street: string;
    locality: string;
    region?: string;
    postalCode: string;
    country: string;
  };
  contactPoint?: {
    telephone: string;
    email?: string;
    contactType?: string;
  };
  sameAs?: string[];
};

export type TourPackage = {
  name: string;
  description: string;
  price: string;
  currency?: string;
  image?: string;
  duration?: string;
  itinerary?: Array<{
    title: string;
    description: string;
  }>;
  destinations?: string[];
};

export type FAQ = {
  question: string;
  answer: string;
};

/**
 * Generate Organization schema
 */
export const generateOrganizationSchema = (org: Organization) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": org.name,
    "url": org.url,
    "description": org.description,
    "logo": org.logo
  };

  if (org.address) {
    schema["address"] = {
      "@type": "PostalAddress",
      "streetAddress": org.address.street,
      "addressLocality": org.address.locality,
      "addressRegion": org.address.region,
      "postalCode": org.address.postalCode,
      "addressCountry": org.address.country
    };
  }

  if (org.contactPoint) {
    schema["contactPoint"] = {
      "@type": "ContactPoint",
      "telephone": org.contactPoint.telephone,
      "contactType": org.contactPoint.contactType || "customer service",
      "email": org.contactPoint.email
    };
  }

  if (org.sameAs && org.sameAs.length > 0) {
    schema["sameAs"] = org.sameAs;
  }

  return schema;
};

/**
 * Generate Local Business schema (Travel Agency)
 */
export const generateTravelAgencySchema = (
  org: Organization,
  openingHours?: Array<{
    days: string[];
    opens: string;
    closes: string;
  }>,
  geo?: { lat: string; long: string }
) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": org.name,
    "url": org.url,
    "description": org.description,
    "logo": org.logo
  };

  if (org.address) {
    schema["address"] = {
      "@type": "PostalAddress",
      "streetAddress": org.address.street,
      "addressLocality": org.address.locality,
      "addressRegion": org.address.region,
      "postalCode": org.address.postalCode,
      "addressCountry": org.address.country
    };
  }

  if (org.contactPoint) {
    schema["telephone"] = org.contactPoint.telephone;
    schema["email"] = org.contactPoint.email;
  }

  if (openingHours && openingHours.length > 0) {
    schema["openingHoursSpecification"] = openingHours.map(hours => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": hours.days,
      "opens": hours.opens,
      "closes": hours.closes
    }));
  }

  if (geo) {
    schema["geo"] = {
      "@type": "GeoCoordinates",
      "latitude": geo.lat,
      "longitude": geo.long
    };
  }

  return schema;
};

/**
 * Generate TouristTrip schema for tour packages
 */
export const generateTourPackageSchema = (
  tour: TourPackage,
  organization: { name: string; url: string }
) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tour.name,
    "description": tour.description,
    "tourOperator": {
      "@type": "TravelAgency",
      "name": organization.name,
      "url": organization.url
    },
    "offers": {
      "@type": "Offer",
      "name": tour.name,
      "price": tour.price.replace(/[^0-9.]/g, ''),
      "priceCurrency": tour.currency || "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0]
    }
  };

  if (tour.image) {
    schema["image"] = tour.image;
  }

  if (tour.itinerary && tour.itinerary.length > 0) {
    schema["itinerary"] = {
      "@type": "ItemList",
      "itemListElement": tour.itinerary.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.title,
        "description": item.description
      }))
    };
  }

  if (tour.destinations && tour.destinations.length > 0) {
    schema["touristType"] = ["Sightseeing", "Cultural", "Historical"];
    schema["touristDestination"] = tour.destinations.map(destination => ({
      "@type": "TouristDestination",
      "name": destination
    }));
  }

  return schema;
};

/**
 * Generate FAQ schema
 */
export const generateFAQSchema = (faqs: FAQ[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Generate BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

/**
 * Generate Review schema
 */
export type ReviewData = {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  tourName?: string;
};

export const generateReviewSchema = (review: ReviewData) => {
  return {
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.reviewBody,
    "datePublished": review.datePublished,
    ...(review.tourName && { "itemReviewed": { "@type": "TouristTrip", "name": review.tourName } })
  };
};

/**
 * Generate AggregateRating schema
 */
export const generateAggregateRatingSchema = (
  ratingValue: string,
  reviewCount: string,
  itemName: string,
  itemType: string = "TravelAgency"
) => {
  return {
    "@type": "AggregateRating",
    "ratingValue": ratingValue,
    "reviewCount": reviewCount,
    "bestRating": "5",
    "worstRating": "1",
    "itemReviewed": {
      "@type": itemType,
      "name": itemName
    }
  };
};

/**
 * Generate TouristDestination schema for city cluster pages
 */
export const generateTouristDestinationSchema = (destination: {
  name: string;
  description: string;
  url: string;
  image?: string;
  containedInPlace?: string;
  geo?: { lat: string; long: string };
}) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `https://guideindiatours.com/${destination.url}#destination`,
    "name": destination.name,
    "description": destination.description,
    "url": `https://guideindiatours.com/${destination.url}`,
    "touristType": ["Cultural tourism", "Heritage tourism", "Historical tourism"],
  };

  if (destination.image) {
    schema["image"] = destination.image;
  }

  if (destination.containedInPlace) {
    schema["containedInPlace"] = {
      "@type": "Country",
      "name": destination.containedInPlace
    };
  }

  if (destination.geo) {
    schema["geo"] = {
      "@type": "GeoCoordinates",
      "latitude": destination.geo.lat,
      "longitude": destination.geo.long
    };
  }

  return schema;
};

/**
 * Generate Article schema for blog posts
 */
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  author: string;
  category?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": article.url,
    "image": article.image,
    "datePublished": article.datePublished,
    "dateModified": article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://guideindiatours.com/#organization",
      "name": "Guide India Tours",
      "logo": {
        "@type": "ImageObject",
        "url": "https://guideindiatours.com/logo.png"
      }
    },
    ...(article.category && { "articleSection": article.category }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
};

/**
 * Generate connected @graph schema for global site identity
 */
export const generateConnectedGraphSchema = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://guideindiatours.com/#organization",
        "name": "Guide India Tours",
        "alternateName": "Golden Triangle Tours Specialist",
        "url": "https://guideindiatours.com",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://guideindiatours.com/#logo",
          "url": "https://guideindiatours.com/logo.png",
          "contentUrl": "https://guideindiatours.com/logo.png",
          "caption": "Guide India Tours Logo"
        },
        "image": "https://guideindiatours.com/images/og-default.jpg",
        "description": "India's #1 specialist for Golden Triangle private tours covering Delhi, Agra, and Jaipur.",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Flate No: 31/84A, Rajpur Jangjeet Nagar, Shamsabad Road",
          "addressLocality": "Agra",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "282001",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+918979810991",
          "contactType": "customer service",
          "email": "info@guideindiatours.com",
          "availableLanguage": ["English", "Hindi", "French", "Spanish", "German"]
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "27.1767",
          "longitude": "78.0081"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "364",
          "bestRating": "5"
        },
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "knowsAbout": [
          "Golden Triangle Tours",
          "Taj Mahal Tours",
          "Delhi Sightseeing",
          "Jaipur Heritage Tours",
          "India Private Tours"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://guideindiatours.com/#website",
        "url": "https://guideindiatours.com",
        "name": "Guide India Tours",
        "publisher": { "@id": "https://guideindiatours.com/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://guideindiatours.com/plans?city={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };
};
