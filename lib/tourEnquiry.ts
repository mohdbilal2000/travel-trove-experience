// Schema and message builders for the /plan-my-tour enquiry.
//
// Pure — no React, no side effects — so the wizard, the API route and any
// future channel can all share one definition of what a valid enquiry is and
// how it reads once formatted. Same house style as lib/planner.ts.

import * as z from "zod";
import { cityLabel } from "@/data/plannerOptions";
import { WHATSAPP_NUMBER } from "@/lib/planner";
import { totalGuests, tripLength } from "@/lib/quote";
import {
  nationalityTypes,
  meetingPoints,
  transportChoices,
  vehiclePreferences,
  accommodationTypes,
  guideLanguages,
  tourStyles,
  interestOptions,
  specialAssistanceOptions,
  ticketStatuses,
  vipServiceOptions,
  budgetTiers,
  labelFor,
  labelsFor,
} from "@/data/tourEnquiryOptions";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const optionValues = (options: { value: string }[]): [string, ...string[]] =>
  options.map((o) => o.value) as [string, ...string[]];

/** One leg of the optional day-by-day route (e.g. "Day 1 · Airport → Delhi hotel"). */
export const routeLegSchema = z.object({
  day: z.number().int().min(1),
  from: z.string().trim().max(120),
  to: z.string().trim().max(120),
});

export type RouteLeg = z.infer<typeof routeLegSchema>;

const baseSchema = z.object({
  // §Contact — not in the original WhatsApp template, but an enquiry we can't
  // reply to is worthless.
  fullName: z.string().trim().min(2, { message: "Please enter your full name" }),
  email: z.string().trim().email({ message: "Please enter a valid email address" }),
  phone: z.string().trim().min(7, { message: "Please enter a valid phone / WhatsApp number" }),

  // §1 Nationality
  nationalityType: z.enum(optionValues(nationalityTypes), {
    required_error: "Please tell us your nationality",
  }),
  // Free-text fields are always present and may be empty — keeping them
  // non-optional means z.input and z.output match, so the form and the API
  // route can share one type without generic gymnastics.
  country: z.string().trim().max(80),

  // §2 Number of guests
  adults: z.number().int().min(1, { message: "At least one adult is required" }).max(60),
  children: z.number().int().min(0).max(60),

  // §3 Travel dates
  arrivalDate: z.string().regex(ISO_DATE, { message: "Please choose an arrival date" }),
  departureDate: z.string().regex(ISO_DATE, { message: "Please choose a departure date" }),

  // §4 Destinations
  itineraryUndecided: z.boolean(),
  cities: z.array(z.string()),
  monuments: z.array(z.string()),
  otherDestinations: z.string().trim().max(300),

  // §5 Meeting point
  meetingPoint: z.enum(optionValues(meetingPoints), {
    required_error: "Please choose where we should meet you",
  }),
  meetingPointOther: z.string().trim().max(200),

  // §6 Transportation
  transportChoice: z.enum(optionValues(transportChoices), {
    required_error: "Please tell us about transport",
  }),
  vehiclePreference: z.string(),
  ownVehicleDetails: z.string().trim().max(300),
  /** Optional — visitors who don't want to plan legs simply leave this empty. */
  routeLegs: z.array(routeLegSchema).max(20),

  // §7 Accommodation
  accommodationType: z.enum(optionValues(accommodationTypes), {
    required_error: "Please choose an accommodation option",
  }),
  hotelName: z.string().trim().max(200),

  // §8 Tour guide language
  guideLanguage: z.enum(optionValues(guideLanguages), {
    required_error: "Please choose a guide language",
  }),
  guideLanguageOther: z.string().trim().max(80),

  // §9 Tour style
  tourStyle: z.enum(optionValues(tourStyles), {
    required_error: "Please choose a tour style",
  }),

  // §10 Interests
  interests: z.array(z.string()),

  // §11 Special assistance
  specialAssistance: z.array(z.string()),
  specialAssistanceOther: z.string().trim().max(300),

  // §12 Monument tickets
  ticketStatus: z.enum(optionValues(ticketStatuses), {
    required_error: "Please tell us about monument tickets",
  }),

  // §13 VIP services
  vipServices: z.array(z.string()),

  // §14 First visit to India
  firstVisit: z.enum(["yes", "no"], { required_error: "Please answer this question" }),

  // §15 Budget
  budget: z.enum(optionValues(budgetTiers), {
    required_error: "Please choose a budget preference",
  }),

  // §16 Special wishes
  specialWishes: z.string().trim().max(2000),
});

/**
 * Conditional requirements, kept as a standalone refinement so the same rules
 * apply to the whole enquiry and to a single wizard step.
 *
 * Every check guards on its inputs being present, because the per-step schemas
 * below run it against a `pick`ed subset. Each conditional pair is deliberately
 * kept within one step so no rule is ever split across two.
 */
type EnquiryFields = z.infer<typeof baseSchema>;

const refineEnquiry = (data: Partial<EnquiryFields>, ctx: z.RefinementCtx): void => {
  if (data.nationalityType === "international" && !data.country) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["country"],
      message: "Please tell us which country you are travelling from",
    });
  }

  if (data.arrivalDate && data.departureDate && !tripLength(data.arrivalDate, data.departureDate)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["departureDate"],
      message: "Departure must be on or after the arrival date",
    });
  }

  if (data.cities && !data.itineraryUndecided && data.cities.length === 0 && !data.otherDestinations) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["cities"],
      message: "Pick at least one destination, or tick \"I haven't planned my itinerary yet\"",
    });
  }

  if (data.meetingPoint === "other" && !data.meetingPointOther) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["meetingPointOther"],
      message: "Please tell us the meeting point",
    });
  }

  if (data.transportChoice === "own" && !data.ownVehicleDetails) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["ownVehicleDetails"],
      message: "Please share the driver's contact number and vehicle details",
    });
  }

  if (data.transportChoice === "arrange") {
    const known = vehiclePreferences.some((v) => v.value === data.vehiclePreference);
    if (!known) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["vehiclePreference"],
        message: "Please choose a vehicle",
      });
    }
  }

  if (data.accommodationType === "hotel-stay" && !data.hotelName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["hotelName"],
      message: "Please tell us the hotel name (or type \"not booked yet\")",
    });
  }

  if (data.guideLanguage === "other" && !data.guideLanguageOther) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["guideLanguageOther"],
      message: "Please tell us the language",
    });
  }

  if (data.specialAssistance?.includes("other") && !data.specialAssistanceOther) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["specialAssistanceOther"],
      message: "Please describe the assistance needed",
    });
  }
};

/** Full enquiry schema — what the API route validates against. */
export const tourEnquirySchema = baseSchema.superRefine(refineEnquiry);

/** One type for the form, the API route and the formatters — input matches output. */
export type TourEnquiry = z.infer<typeof tourEnquirySchema>;

/**
 * Fields belonging to each wizard step, in order. Used both to build the
 * per-step schemas below and to decide which errors a step should surface.
 */
export const STEP_FIELDS = [
  ["fullName", "email", "phone", "nationalityType", "country", "adults", "children", "firstVisit"],
  [
    "arrivalDate",
    "departureDate",
    "itineraryUndecided",
    "cities",
    "monuments",
    "otherDestinations",
    "accommodationType",
    "hotelName",
  ],
  [
    "meetingPoint",
    "meetingPointOther",
    "transportChoice",
    "vehiclePreference",
    "ownVehicleDetails",
    "routeLegs",
  ],
  ["guideLanguage", "guideLanguageOther", "tourStyle", "interests", "budget"],
  ["specialAssistance", "specialAssistanceOther", "ticketStatus", "vipServices", "specialWishes"],
] as const satisfies readonly (readonly (keyof EnquiryFields)[])[];

const maskFor = (fields: readonly string[]): Record<string, true> =>
  Object.fromEntries(fields.map((f) => [f, true as const]));

/**
 * One schema per step. Validating a step in isolation matters because zod only
 * runs `superRefine` after the whole object parses — against the full schema, a
 * blank date on step 2 would suppress the "country required" error on step 1.
 */
export const stepSchemas = STEP_FIELDS.map((fields) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (baseSchema.pick(maskFor(fields) as any) as z.AnyZodObject).superRefine(refineEnquiry),
);

export const TOTAL_STEPS = STEP_FIELDS.length;

/** Blank enquiry used as the wizard's `defaultValues`. */
export const emptyEnquiry: TourEnquiry = {
  fullName: "",
  email: "",
  phone: "",
  nationalityType: "international",
  country: "",
  adults: 2,
  children: 0,
  arrivalDate: "",
  departureDate: "",
  itineraryUndecided: false,
  cities: [],
  monuments: [],
  otherDestinations: "",
  meetingPoint: "hotel",
  meetingPointOther: "",
  transportChoice: "arrange",
  vehiclePreference: "",
  ownVehicleDetails: "",
  routeLegs: [],
  accommodationType: "hotel-stay",
  hotelName: "",
  guideLanguage: "english",
  guideLanguageOther: "",
  tourStyle: "standard",
  interests: [],
  specialAssistance: [],
  specialAssistanceOther: "",
  ticketStatus: "arrange",
  vipServices: [],
  firstVisit: "yes",
  budget: "standard",
  specialWishes: "",
};

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

const listOrDash = (values: string[]): string => (values.length > 0 ? values.join(", ") : "—");

const formatDate = (iso: string): string => {
  if (!ISO_DATE.test(iso)) return iso || "—";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

const guestsLine = (enquiry: TourEnquiry): string => {
  const parts = [`${enquiry.adults} ${enquiry.adults === 1 ? "Adult" : "Adults"}`];
  if (enquiry.children > 0) {
    parts.push(`${enquiry.children} ${enquiry.children === 1 ? "Child" : "Children"} (below 15)`);
  }
  return `${parts.join(", ")} — ${totalGuests(enquiry.adults, enquiry.children)} total`;
};

const datesLine = (enquiry: TourEnquiry): string => {
  const length = tripLength(enquiry.arrivalDate, enquiry.departureDate);
  const range = `${formatDate(enquiry.arrivalDate)} → ${formatDate(enquiry.departureDate)}`;
  return length ? `${range} (${length.days} days / ${length.nights} nights)` : range;
};

const nationalityLine = (enquiry: TourEnquiry): string => {
  const base = labelFor(nationalityTypes, enquiry.nationalityType);
  return enquiry.country ? `${base} — ${enquiry.country}` : base;
};

const destinationsLine = (enquiry: TourEnquiry): string => {
  if (enquiry.itineraryUndecided) {
    return "Itinerary not planned yet — asked us to build the best itinerary";
  }
  const parts = enquiry.cities.map(cityLabel);
  if (enquiry.otherDestinations) parts.push(`Other: ${enquiry.otherDestinations}`);
  return listOrDash(parts);
};

const meetingPointLine = (enquiry: TourEnquiry): string =>
  enquiry.meetingPoint === "other"
    ? `Other — ${enquiry.meetingPointOther}`
    : labelFor(meetingPoints, enquiry.meetingPoint);

const transportLine = (enquiry: TourEnquiry): string => {
  if (enquiry.transportChoice === "own") {
    return `Has own taxi/car — ${enquiry.ownVehicleDetails}`;
  }
  const vehicle = vehiclePreferences.find((v) => v.value === enquiry.vehiclePreference);
  return vehicle ? `Arrange a private vehicle — ${vehicle.label} (${vehicle.desc})` : "Arrange a private vehicle";
};

const accommodationLine = (enquiry: TourEnquiry): string => {
  const base = labelFor(accommodationTypes, enquiry.accommodationType);
  return enquiry.hotelName ? `${base} — ${enquiry.hotelName}` : base;
};

const guideLanguageLine = (enquiry: TourEnquiry): string =>
  enquiry.guideLanguage === "other"
    ? `Other — ${enquiry.guideLanguageOther}`
    : labelFor(guideLanguages, enquiry.guideLanguage);

const assistanceLine = (enquiry: TourEnquiry): string => {
  const labels = labelsFor(specialAssistanceOptions, enquiry.specialAssistance)
    .filter((l) => l !== "Other");
  if (enquiry.specialAssistanceOther) labels.push(`Other: ${enquiry.specialAssistanceOther}`);
  return listOrDash(labels);
};

const routeLines = (enquiry: TourEnquiry): string[] =>
  enquiry.routeLegs
    .filter((leg) => leg.from || leg.to)
    .map((leg) => `Day ${leg.day}: ${leg.from || "?"} → ${leg.to || "?"}`);

interface EnquirySection {
  n: number;
  title: string;
  /** Single-line value, or several lines rendered as a list. */
  value: string | string[];
}

/**
 * The enquiry as the numbered sections the office already works from, so a
 * submitted form reads exactly like the WhatsApp template it replaces.
 */
export const enquirySections = (enquiry: TourEnquiry): EnquirySection[] => {
  const sections: EnquirySection[] = [
    { n: 1, title: "Nationality", value: nationalityLine(enquiry) },
    { n: 2, title: "Number of Guests", value: guestsLine(enquiry) },
    { n: 3, title: "Travel Dates", value: datesLine(enquiry) },
    { n: 4, title: "Destinations", value: destinationsLine(enquiry) },
  ];

  if (enquiry.monuments.length > 0) {
    sections.push({ n: 4, title: "Monuments", value: listOrDash(enquiry.monuments) });
  }

  sections.push(
    { n: 5, title: "Meeting Point", value: meetingPointLine(enquiry) },
    { n: 6, title: "Transportation", value: transportLine(enquiry) },
  );

  const route = routeLines(enquiry);
  if (route.length > 0) {
    sections.push({ n: 6, title: "Day-by-Day Route", value: route });
  }

  sections.push(
    { n: 7, title: "Accommodation", value: accommodationLine(enquiry) },
    { n: 8, title: "Tour Guide Language", value: guideLanguageLine(enquiry) },
    { n: 9, title: "Tour Style", value: labelFor(tourStyles, enquiry.tourStyle) },
    { n: 10, title: "Interests", value: listOrDash(labelsFor(interestOptions, enquiry.interests)) },
    { n: 11, title: "Special Assistance", value: assistanceLine(enquiry) },
    { n: 12, title: "Monument Tickets", value: labelFor(ticketStatuses, enquiry.ticketStatus) },
    { n: 13, title: "VIP Services", value: listOrDash(labelsFor(vipServiceOptions, enquiry.vipServices)) },
    { n: 14, title: "First Visit to India", value: enquiry.firstVisit === "yes" ? "Yes" : "No" },
    { n: 15, title: "Budget Preference", value: labelFor(budgetTiers, enquiry.budget) },
    { n: 16, title: "Special Wishes / Questions", value: enquiry.specialWishes || "—" },
  );

  return sections;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export interface EnquiryEmail {
  subject: string;
  text: string;
  html: string;
}

/** The enquiry as an email for the office inbox. */
export const buildEnquiryEmail = (enquiry: TourEnquiry): EnquiryEmail => {
  const length = tripLength(enquiry.arrivalDate, enquiry.departureDate);
  const guests = totalGuests(enquiry.adults, enquiry.children);
  const subject =
    `Tour enquiry — ${enquiry.fullName} · ${guests} guest${guests === 1 ? "" : "s"}` +
    (length ? ` · ${length.days} days` : "") +
    ` · from ${formatDate(enquiry.arrivalDate)}`;

  const sections = enquirySections(enquiry);

  const textLines = [
    "NEW TOUR ENQUIRY — guideindiatours.com/plan-my-tour",
    "",
    `Name:  ${enquiry.fullName}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone}`,
    "",
    "----------------------------------------",
    "",
  ];

  sections.forEach((section) => {
    if (Array.isArray(section.value)) {
      textLines.push(`${section.n}. ${section.title}:`);
      section.value.forEach((line) => textLines.push(`     ${line}`));
    } else {
      textLines.push(`${section.n}. ${section.title}: ${section.value}`);
    }
  });

  const rows = sections
    .map((section) => {
      const value = Array.isArray(section.value)
        ? section.value.map((l) => escapeHtml(l)).join("<br>")
        : escapeHtml(section.value);
      return `<tr>
  <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#800000;font-weight:700;white-space:nowrap;vertical-align:top;">${section.n}. ${escapeHtml(section.title)}</td>
  <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#222;">${value}</td>
</tr>`;
    })
    .join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;">
  <h2 style="color:#800000;margin:0 0 4px;">New Tour Enquiry</h2>
  <p style="color:#777;margin:0 0 20px;font-size:13px;">Submitted from guideindiatours.com/plan-my-tour</p>
  <table style="width:100%;border-collapse:collapse;margin-bottom:20px;background:#faf4e1;">
    <tr><td style="padding:10px 14px;font-weight:700;white-space:nowrap;">Name</td><td style="padding:10px 14px;">${escapeHtml(enquiry.fullName)}</td></tr>
    <tr><td style="padding:10px 14px;font-weight:700;">Email</td><td style="padding:10px 14px;"><a href="mailto:${escapeHtml(enquiry.email)}">${escapeHtml(enquiry.email)}</a></td></tr>
    <tr><td style="padding:10px 14px;font-weight:700;">Phone</td><td style="padding:10px 14px;">${escapeHtml(enquiry.phone)}</td></tr>
  </table>
  <table style="width:100%;border-collapse:collapse;">
${rows}
  </table>
</div>`;

  return { subject, text: textLines.join("\n"), html };
};

/**
 * Condensed summary for the WhatsApp handoff. Deliberately short — the full
 * enquiry goes by email, because long `wa.me` deeplinks get truncated and can
 * fail to open on iOS.
 */
export const buildEnquiryWhatsAppText = (enquiry: TourEnquiry): string => {
  const length = tripLength(enquiry.arrivalDate, enquiry.departureDate);
  const destinations = enquiry.itineraryUndecided
    ? "Itinerary not planned yet"
    : listOrDash(enquiry.cities.map(cityLabel));

  const lines = [
    `Hi Guide India Tours! I've just submitted the tour enquiry form.`,
    ``,
    `Name: ${enquiry.fullName}`,
    `Guests: ${guestsLine(enquiry)}`,
    `Dates: ${formatDate(enquiry.arrivalDate)} → ${formatDate(enquiry.departureDate)}${length ? ` (${length.days} days)` : ""}`,
    `Destinations: ${destinations}`,
    `Transport: ${transportLine(enquiry)}`,
    `Budget: ${labelFor(budgetTiers, enquiry.budget)}`,
    ``,
    `Full details are in the email. Please share the itinerary and quotation. Thanks!`,
  ];

  return lines.join("\n");
};

export const buildEnquiryWhatsAppUrl = (enquiry: TourEnquiry): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildEnquiryWhatsAppText(enquiry))}`;
