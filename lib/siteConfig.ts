/**
 * Single source of truth for the business's identity (NAP), URLs and social
 * profiles. Import this everywhere instead of re-typing literals — it prevents
 * the phone/address/rating drift that fragments SEO and confuses AI answer
 * engines. Phone is intentionally ONE number sitewide.
 */

export const siteConfig = {
  name: "Guide India Tours",
  legalName: "Guide India Tours",
  alternateName: "Golden Triangle Tours Specialist",
  slogan: "Experience India's Golden Triangle with Expert Guides",
  description:
    "India's specialist for Golden Triangle private tours covering Delhi, Agra, and Jaipur. Government-approved licensed guides, luxury hotels, and 24/7 support.",
  foundingDate: "2004",

  // Canonical production origin (www is canonical; apex 308-redirects to www).
  url: "https://www.guideindiatours.com",
  ogImage: "/images/og-default.jpg",
  logo: "https://www.guideindiatours.com/logo.png",

  // ── Contact ──────────────────────────────────────────────────────────────
  // ONE phone number sitewide. Do not reintroduce a second number.
  phoneE164: "+918979810991",
  phoneDisplay: "+91 89798 10991",
  telHref: "tel:+918979810991",
  whatsapp: "918979810991",
  whatsappHref: "https://wa.me/918979810991",
  email: "info@guideindiatours.com",
  mailtoHref: "mailto:info@guideindiatours.com",

  // ── Address / geo ────────────────────────────────────────────────────────
  address: {
    street: "31/84A, Jangjeet Nagar, Shamsabad Road",
    locality: "Agra",
    region: "Uttar Pradesh",
    postalCode: "282001",
    country: "IN",
  },
  geo: { latitude: "27.1767", longitude: "78.0081" },

  // ── Reputation ───────────────────────────────────────────────────────────
  rating: { value: "4.9", count: "366", best: "5" },

  languages: ["English", "Hindi", "French", "Spanish", "German", "Japanese", "Russian", "Italian"],

  // ── Social / sameAs ──────────────────────────────────────────────────────
  social: {
    youtube: "https://www.youtube.com/@guideindiatours",
    googleMaps: "https://www.google.com/maps/place/Guide+India+Tours/",
    tripadvisor: "https://www.tripadvisor.com/Search?q=Guide+India+Tours",
    trustpilot: "https://www.trustpilot.com/review/guideindiatours.com",
    asiabylocals: "https://www.asiabylocals.com/india/agra",
  },
} as const;

/** Profiles for schema.org `sameAs`. */
export const sameAs: string[] = [
  siteConfig.social.googleMaps,
  siteConfig.social.asiabylocals,
  siteConfig.social.tripadvisor,
  siteConfig.social.trustpilot,
  siteConfig.social.youtube,
];

/** Absolute URL helper. */
export const absoluteUrl = (path = "/"): string =>
  `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;

export type SiteConfig = typeof siteConfig;
