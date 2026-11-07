/**
 * Source markets for the "Plan your trip from ..." pages, chosen from Search
 * Console impressions (US, UK, Germany, Australia, Canada, Singapore, France,
 * Brazil, Japan, Italy, Spain, Mexico, Netherlands, Switzerland).
 *
 * Only facts that are stable and checkable live here: the time difference to
 * India, and which guide-language pages the site has. Guide availability is
 * read from data/multilingualGuide.ts so it can never disagree with those pages.
 */

export type PageLang = "en" | "es" | "de";

export type Country = {
  slug: string;
  /** English label for hubs, breadcrumbs and navigation. */
  label: string;
  /** Name as used inside a sentence in the page language, e.g. "the United States", "México". */
  name: string;
  lang: PageLang;
  hreflang: string;
  /** Time difference sentence in the page language. */
  tz: string;
  /** Codes of /guide/[code] pages relevant to this market. */
  guides: string[];
};

const eu = "India is 3.5 to 4.5 hours ahead of {n}, depending on daylight saving.";

export const countries: Country[] = [
  { slug: "usa", label: "United States", name: "the United States", lang: "en", hreflang: "en-US", guides: [],
    tz: "India is 9.5 to 10.5 hours ahead of US Eastern time and 12.5 to 13.5 hours ahead of US Pacific time, depending on daylight saving." },
  { slug: "uk", label: "United Kingdom", name: "the United Kingdom", lang: "en", hreflang: "en-GB", guides: [],
    tz: "India is 4.5 to 5.5 hours ahead of the UK, depending on daylight saving." },
  { slug: "canada", label: "Canada", name: "Canada", lang: "en", hreflang: "en-CA", guides: ["fr"],
    tz: "India is 9.5 to 10.5 hours ahead of Toronto and 12.5 to 13.5 hours ahead of Vancouver, depending on daylight saving." },
  { slug: "australia", label: "Australia", name: "Australia", lang: "en", hreflang: "en-AU", guides: [],
    tz: "Sydney and Melbourne are 4.5 to 5.5 hours ahead of India, depending on daylight saving, and Perth is 2.5 hours ahead." },
  { slug: "germany", label: "Germany", name: "Deutschland", lang: "de", hreflang: "de-DE", guides: ["de"],
    tz: "Indien ist Deutschland je nach Sommerzeit 3,5 bis 4,5 Stunden voraus." },
  { slug: "france", label: "France", name: "France", lang: "en", hreflang: "en-FR", guides: ["fr"], tz: eu.replace("{n}", "France") },
  { slug: "netherlands", label: "Netherlands", name: "the Netherlands", lang: "en", hreflang: "en-NL", guides: [], tz: eu.replace("{n}", "the Netherlands") },
  { slug: "switzerland", label: "Switzerland", name: "Switzerland", lang: "en", hreflang: "en-CH", guides: ["de", "fr", "it"], tz: eu.replace("{n}", "Switzerland") },
  { slug: "italy", label: "Italy", name: "Italy", lang: "en", hreflang: "en-IT", guides: ["it"], tz: eu.replace("{n}", "Italy") },
  { slug: "spain", label: "Spain", name: "España", lang: "es", hreflang: "es-ES", guides: ["es"],
    tz: "La India va entre 3,5 y 4,5 horas por delante de la España peninsular, según el horario de verano." },
  { slug: "mexico", label: "Mexico", name: "México", lang: "es", hreflang: "es-MX", guides: ["es"],
    tz: "La India va 11,5 horas por delante de la Ciudad de México." },
  { slug: "brazil", label: "Brazil", name: "Brazil", lang: "en", hreflang: "en-BR", guides: ["pt"],
    tz: "India is 8.5 hours ahead of Brasília." },
  { slug: "singapore", label: "Singapore", name: "Singapore", lang: "en", hreflang: "en-SG", guides: ["zh", "ms"],
    tz: "Singapore is 2.5 hours ahead of India." },
  { slug: "japan", label: "Japan", name: "Japan", lang: "en", hreflang: "en-JP", guides: ["ja"],
    tz: "Japan is 3.5 hours ahead of India." },
];

export const getCountry = (slug: string) => countries.find((c) => c.slug === slug);

/** Page copy per language. Strings with {n} take the country name. */
export const copy = {
  en: {
    badge: "Planning from {n}",
    h1: "Private India Tours for Travellers from {n}",
    sub: "Golden Triangle, Taj Mahal and Rajasthan tours with government-approved guides and your own vehicle, planned around your trip from {n}.",
    metaTitle: "Private India Tours from {n} | Guide India Tours",
    metaDesc: "Private Golden Triangle, Taj Mahal and Rajasthan tours for travellers from {n}. Government-approved guides, your own vehicle and a written quote in your own currency. Taj Mahal tours from $149 per adult.",
    facts: "Planning facts",
    time: "Time difference", guideLbl: "Guide languages", cur: "Quote currency", visa: "Visa",
    curText: "Prices on this site are in US dollars. We issue your written quote in your own currency, and you can pay by bank transfer.",
    visaText: "Visitors need an Indian visa. Check on the official Indian government portal whether you can apply for an e-Visa, and read our e-Visa guide.",
    visaLink: "Read the e-Visa guide",
    guideEn: "English-speaking government-approved guides on all our tours.",
    guideAvail: "{L}-speaking guides are available. See our {L} guide page.",
    guideReq: "{L}-speaking guides can be arranged on request. See our {L} guide page.",
    start: "Tours to start with",
    cards: [
      { href: "/same-day-agra-tour-from-delhi", t: "Same Day Agra Tour from Delhi", d: "The Taj Mahal, Agra Fort and Fatehpur Sikri in one day, with a private car and guide.", plan: 2001 },
      { href: "/golden-triangle-tours", t: "4-Day Classic Golden Triangle", d: "Delhi, Agra and Jaipur with a private car and driver. More options, from 3 to 7 days, are on the Golden Triangle page.", plan: 12 },
      { href: "/rajasthan-golden-triangle-tour", t: "10-Day Rajasthan and Golden Triangle", d: "Delhi, Agra, Jaipur, Jodhpur and Udaipur with heritage hotels and local guides.", plan: 9 },
    ],
    price: "From ${p} per adult",
    cta: "Get a quote on WhatsApp",
    wa: "Hi Guide India Tours! I'm travelling from {n} and would like a quote.",
    faqHead: "Questions from travellers in {n}",
    faqs: (c: { n: string; tz: string; guideA: string }) => [
      { q: "Do I need a visa to visit India from {n}?", a: "Yes, visitors need an Indian visa. Many nationalities can apply for an e-Visa online before travel, but eligibility, fees and processing times change, so check the official Indian government portal. Our e-Visa guide explains the steps." },
      { q: "What is the time difference between {n} and India?", a: c.tz },
      { q: "Will my guide speak my language?", a: c.guideA },
      { q: "When is the Taj Mahal closed?", a: "The Taj Mahal is closed every Friday. We plan Agra itineraries around it." },
    ],
  },
  es: {
    badge: "Planifica desde {n}",
    h1: "Tours privados por la India para viajeros desde {n}",
    sub: "Triángulo Dorado, Taj Mahal y Rajastán con guías autorizados por el gobierno y vehículo privado, organizados en torno a tu viaje desde {n}.",
    metaTitle: "Tours privados por la India desde {n} | Guide India Tours",
    metaDesc: "Tours privados por el Triángulo Dorado, el Taj Mahal y Rajastán para viajeros desde {n}. Guías autorizados por el gobierno, vehículo privado y presupuesto por escrito en tu moneda. Tours al Taj Mahal desde $149 por adulto.",
    facts: "Datos para planificar",
    time: "Diferencia horaria", guideLbl: "Idiomas del guía", cur: "Presupuesto en tu moneda", visa: "Visado",
    curText: "Los precios de esta web están en dólares estadounidenses. Te enviamos el presupuesto por escrito en tu propia moneda y puedes pagar por transferencia bancaria.",
    visaText: "Necesitas un visado para viajar a la India. Comprueba en el portal oficial del gobierno indio si puedes solicitar el e-Visa y lee nuestra guía del e-Visa (en inglés).",
    visaLink: "Leer la guía del e-Visa (en inglés)",
    guideEn: "Guías en inglés autorizados por el gobierno en todos nuestros tours.",
    guideAvail: "Hay guías en español disponibles. Consulta nuestra página de guías en español.",
    guideReq: "Hay guías en español disponibles. Consulta nuestra página de guías en español.",
    start: "Tours para empezar (páginas en inglés)",
    cards: [
      { href: "/same-day-agra-tour-from-delhi", t: "Excursión de un día a Agra desde Delhi", d: "El Taj Mahal, el Fuerte de Agra y Fatehpur Sikri en un día, con coche privado y guía.", plan: 2001 },
      { href: "/golden-triangle-tours", t: "Triángulo Dorado de 4 días", d: "Delhi, Agra y Jaipur con coche privado y conductor. En la página del Triángulo Dorado hay más opciones, de 3 a 7 días.", plan: 12 },
      { href: "/rajasthan-golden-triangle-tour", t: "Rajastán y Triángulo Dorado en 10 días", d: "Delhi, Agra, Jaipur, Jodhpur y Udaipur con hoteles patrimoniales y guías locales.", plan: 9 },
    ],
    price: "Desde ${p} por adulto",
    cta: "Pide un presupuesto por WhatsApp",
    wa: "Hola Guide India Tours, viajo desde {n} y me gustaría recibir un presupuesto.",
    faqHead: "Preguntas de viajeros desde {n}",
    faqs: (c: { n: string; tz: string; guideA: string }) => [
      { q: "¿Necesito visado para viajar a la India desde {n}?", a: "Sí, necesitas un visado indio. Muchas nacionalidades pueden solicitar un e-Visa en línea antes del viaje, pero los requisitos, las tasas y los plazos cambian, así que consulta el portal oficial del gobierno indio. Nuestra guía del e-Visa (en inglés) explica los pasos." },
      { q: "¿Qué diferencia horaria hay entre {n} y la India?", a: c.tz },
      { q: "¿Mi guía hablará español?", a: c.guideA },
      { q: "¿Qué día cierra el Taj Mahal?", a: "El Taj Mahal cierra todos los viernes. Organizamos los itinerarios de Agra en torno a ese día." },
    ],
  },
  de: {
    badge: "Reiseplanung aus {n}",
    h1: "Private Indien-Touren für Reisende aus {n}",
    sub: "Goldenes Dreieck, Taj Mahal und Rajasthan mit staatlich zugelassenen Guides und eigenem Fahrzeug, geplant rund um Ihre Reise aus {n}.",
    metaTitle: "Private Indien-Touren aus {n} | Guide India Tours",
    metaDesc: "Private Touren durch das Goldene Dreieck, zum Taj Mahal und nach Rajasthan für Reisende aus {n}. Staatlich zugelassene Guides, eigenes Fahrzeug und schriftliches Angebot in Ihrer Währung. Taj-Mahal-Touren ab $149 pro Erwachsenem.",
    facts: "Fakten zur Planung",
    time: "Zeitverschiebung", guideLbl: "Sprachen der Guides", cur: "Angebot in Ihrer Währung", visa: "Visum",
    curText: "Die Preise auf dieser Website sind in US-Dollar angegeben. Ihr schriftliches Angebot erstellen wir in Ihrer eigenen Währung, bezahlen können Sie per Banküberweisung.",
    visaText: "Für Indien benötigen Sie ein Visum. Prüfen Sie auf dem offiziellen Portal der indischen Regierung, ob Sie ein e-Visum beantragen können, und lesen Sie unseren e-Visa-Ratgeber (auf Englisch).",
    visaLink: "e-Visa-Ratgeber lesen (auf Englisch)",
    guideEn: "Englischsprachige, staatlich zugelassene Guides auf allen unseren Touren.",
    guideAvail: "Deutschsprachige Guides sind verfügbar. Siehe unsere deutsche Guide-Seite.",
    guideReq: "Deutschsprachige Guides sind verfügbar. Siehe unsere deutsche Guide-Seite.",
    start: "Touren für den Einstieg (Seiten auf Englisch)",
    cards: [
      { href: "/same-day-agra-tour-from-delhi", t: "Agra-Tagestour ab Delhi", d: "Taj Mahal, Agra Fort und Fatehpur Sikri an einem Tag, mit Privatwagen und Guide.", plan: 2001 },
      { href: "/golden-triangle-tours", t: "Goldenes Dreieck in 4 Tagen", d: "Delhi, Agra und Jaipur mit Privatwagen und Fahrer. Weitere Optionen von 3 bis 7 Tagen finden Sie auf der Seite zum Goldenen Dreieck.", plan: 12 },
      { href: "/rajasthan-golden-triangle-tour", t: "Rajasthan und Goldenes Dreieck in 10 Tagen", d: "Delhi, Agra, Jaipur, Jodhpur und Udaipur mit Heritage-Hotels und lokalen Guides.", plan: 9 },
    ],
    price: "Ab ${p} pro Erwachsenem",
    cta: "Angebot per WhatsApp anfragen",
    wa: "Guten Tag Guide India Tours, ich reise aus {n} und hätte gern ein Angebot.",
    faqHead: "Fragen von Reisenden aus {n}",
    faqs: (c: { n: string; tz: string; guideA: string }) => [
      { q: "Brauche ich für Indien ein Visum, wenn ich aus {n} reise?", a: "Ja, Besucher benötigen ein indisches Visum. Viele Staatsangehörige können vor der Reise online ein e-Visum beantragen, doch Voraussetzungen, Gebühren und Bearbeitungszeiten ändern sich, daher prüfen Sie bitte das offizielle Portal der indischen Regierung. Unser e-Visa-Ratgeber (auf Englisch) erklärt die Schritte." },
      { q: "Wie groß ist die Zeitverschiebung zwischen {n} und Indien?", a: c.tz },
      { q: "Spricht mein Guide Deutsch?", a: c.guideA },
      { q: "An welchem Tag ist das Taj Mahal geschlossen?", a: "Das Taj Mahal ist jeden Freitag geschlossen. Wir planen die Agra-Etappen um diesen Tag herum." },
    ],
  },
} as const;

export const guideNames: Record<string, string> = { fr: "French", es: "Spanish", de: "German", it: "Italian", ja: "Japanese", pt: "Portuguese", zh: "Chinese", ms: "Malay", ru: "Russian", ko: "Korean" };
