
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
  const schema = {
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
  const schema = {
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
  const schema = {
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
