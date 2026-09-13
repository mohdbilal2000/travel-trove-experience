/**
 * Single source of truth for the business's identity (NAP), URLs and social
 * profiles. Import this everywhere instead of re-typing literals — it prevents
 * the phone/address/rating drift that fragments SEO and confuses AI answer
 * engines.
 *
 * The business has TWO distinct public numbers (matching its Google Business
 * Profile) — a voice number and a WhatsApp number. They are intentionally
 * different; do NOT merge them.
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
  // CALL (voice) number — used for tel: links and "Call" CTAs. This is the
  // number Google Business Profile lists for calls.
  phoneE164: "+919410000991",
  phoneDisplay: "+91 94100 00991",
  telHref: "tel:+919410000991",
  // WhatsApp (chat / booking) number — used for wa.me links only. This is the
  // number the website promotes for WhatsApp booking.
  whatsappE164: "+918979810991",
  whatsappDisplay: "+91 89798 10991",
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
  // Keep in sync with the Google Business Profile review count.
  rating: { value: "4.9", count: "425", best: "5" },

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
