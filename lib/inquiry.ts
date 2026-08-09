// Contact-page tour inquiry: validation schema plus the WhatsApp / email
// message builders. Pure — no React, no side effects — so the wizard in
// `components/contact/InquiryForm.tsx` stays purely presentational.

import * as z from "zod";
import {
  currencyOptions,
  experienceOptions,
  hotelOptions,
  labelFor,
  vehicleOptions,
} from "@/data/inquiryOptions";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/planner";

export const inquirySchema = z
  .object({
    // 1. Full name
    name: z.string().trim().min(2, "Please tell us your full name"),
    email: z.string().trim().email("Please enter a valid email address"),
    phone: z.string().trim().min(8, "Please enter a reachable phone / WhatsApp number"),
    // 2. City of residence & nationality
    city: z.string().trim().min(2, "Which city do you live in?"),
    nationality: z.string().trim().min(2, "Please enter your nationality"),
    // 3. Number of guests
    adults: z.number().int().min(1).max(40),
    children: z.number().int().min(0).max(20),
    // 4. Travel dates
    startDate: z.string().min(1, "Please pick your start date"),
    endDate: z.string().min(1, "Please pick your finish date"),
    // 5. Pickup & drop-off
    pickup: z.string().trim().min(2, "Where should we pick you up?"),
    dropoff: z.string().trim(),
    // 6. Hotel accommodation
    hotel: z.enum(["required", "not-required", "booked"]),
    hotelName: z.string().trim(),
    // 7. Places / monuments
    places: z.string().trim().min(3, "Tell us at least one place you'd like to see"),
    // 8. Existing itinerary
    itinerary: z.string().trim(),
    // 9. Preferred tour experience
    experience: z.enum(["standard", "premium", "luxury", "not-sure"]),
    // 10. Monument entry tickets
    tickets: z.enum(["required", "not-required"]),
    // 11. Guide service
    guide: z.enum(["required", "not-required"]),
    // 12. Preferred guide language
    guideLanguage: z.string(),
    guideLanguageOther: z.string().trim(),
    // 13. Transportation
    transport: z.enum(["required", "not-required"]),
    // 14. Preferred vehicle
    vehicle: z.string(),
    vehicleOther: z.string().trim(),
    // 15. Preferred quotation currency
    currency: z.string().min(1, "Pick the currency for your quotation"),
    currencyOther: z.string().trim(),
    // 16. Special requests
    notes: z.string().trim(),
  })
  .superRefine((v, ctx) => {
    if (v.startDate && v.endDate && v.endDate < v.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "Your finish date can't be before your start date",
      });
    }
    if (v.hotel === "booked" && v.hotelName.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["hotelName"],
        message: "Please share the hotel name so we can plan pickups",
      });
    }
    if (v.guide === "required" && !v.guideLanguage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guideLanguage"],
        message: "Which language should your guide speak?",
      });
    }
    if (v.guide === "required" && v.guideLanguage === "Other" && v.guideLanguageOther.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["guideLanguageOther"],
        message: "Please name the language",
      });
    }
    if (v.transport === "required" && !v.vehicle) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["vehicle"],
        message: "Pick the vehicle you'd prefer",
      });
    }
    if (v.transport === "required" && v.vehicle === "Other" && v.vehicleOther.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["vehicleOther"],
        message: "Please describe the vehicle you need",
      });
    }
    if (v.currency === "Other" && v.currencyOther.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currencyOther"],
        message: "Please name the currency",
      });
    }
  });

export type InquiryValues = z.infer<typeof inquirySchema>;

export const inquiryDefaults: InquiryValues = {
  name: "",
  email: "",
  phone: "",
  city: "",
  nationality: "",
  adults: 2,
  children: 0,
  startDate: "",
  endDate: "",
  pickup: "",
  dropoff: "",
  hotel: "required",
  hotelName: "",
  places: "",
  itinerary: "",
  experience: "not-sure",
  tickets: "required",
  guide: "required",
  guideLanguage: "English",
  guideLanguageOther: "",
  transport: "required",
  vehicle: "SUV",
  vehicleOther: "",
  currency: "USD",
  currencyOther: "",
  notes: "",
};

/** Format an ISO date for humans, e.g. "Fri, 14 Nov 2026". Falls back to the raw value. */
export const formatDate = (iso: string): string => {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

/** Whole nights between the two dates, or null when either date is missing/invalid. */
export const nightsBetween = (start: string, end: string): number | null => {
  if (!start || !end) return null;
  const a = new Date(`${start}T00:00:00`).getTime();
  const b = new Date(`${end}T00:00:00`).getTime();
  if (isNaN(a) || isNaN(b) || b < a) return null;
  return Math.round((b - a) / 86_400_000);
};

const guestLine = (v: InquiryValues): string => {
  const adults = `${v.adults} Adult${v.adults === 1 ? "" : "s"}`;
  return v.children > 0
    ? `${adults} | ${v.children} Child${v.children === 1 ? "" : "ren"} (below 15 yrs)`
    : `${adults} | No children`;
};

const hotelLine = (v: InquiryValues): string => {
  if (v.hotel === "booked") return `Already booked — ${v.hotelName || "hotel name to follow"}`;
  return labelFor(hotelOptions, v.hotel);
};

const datesLine = (v: InquiryValues): string => {
  const nights = nightsBetween(v.startDate, v.endDate);
  const range = `${formatDate(v.startDate)} → ${formatDate(v.endDate)}`;
  return nights === null ? range : `${range} (${nights} night${nights === 1 ? "" : "s"})`;
};

const pickupLine = (v: InquiryValues): string =>
  v.dropoff && v.dropoff !== v.pickup ? `${v.pickup} → ${v.dropoff}` : `${v.pickup} (same for drop-off)`;

export const resolvedLanguage = (v: InquiryValues): string =>
  v.guideLanguage === "Other" ? v.guideLanguageOther || "Other" : v.guideLanguage;

export const resolvedVehicle = (v: InquiryValues): string =>
  v.vehicle === "Other" ? v.vehicleOther || "Other" : labelFor(vehicleOptions, v.vehicle);

export const resolvedCurrency = (v: InquiryValues): string =>
  v.currency === "Other" ? v.currencyOther || "Other" : v.currency;

export interface SummaryRow {
  /** Question number from the Guide India Tours inquiry sheet. */
  n: number;
  label: string;
  value: string;
  /** Wizard step this row belongs to, so "Edit" can jump straight there. */
  step: number;
}

/** The 16-point inquiry, resolved to human-readable rows. Used for the on-page review and the message. */
export const buildSummaryRows = (v: InquiryValues): SummaryRow[] => [
  { n: 1, label: "Full Name", value: v.name, step: 0 },
  { n: 2, label: "City & Nationality", value: `${v.city}, ${v.nationality}`, step: 0 },
  { n: 3, label: "Number of Guests", value: guestLine(v), step: 1 },
  { n: 4, label: "Travel Dates", value: datesLine(v), step: 1 },
  { n: 5, label: "Pickup & Drop-off", value: pickupLine(v), step: 1 },
  { n: 6, label: "Hotel Accommodation", value: hotelLine(v), step: 2 },
  { n: 7, label: "Places / Monuments", value: v.places, step: 2 },
  { n: 8, label: "Existing Itinerary", value: v.itinerary || "None — please suggest one", step: 2 },
  { n: 9, label: "Tour Experience", value: labelFor(experienceOptions, v.experience), step: 3 },
  { n: 10, label: "Monument Entry Tickets", value: v.tickets === "required" ? "Required" : "Not Required", step: 3 },
  { n: 11, label: "Guide Service", value: v.guide === "required" ? "Required" : "Not Required", step: 3 },
  { n: 12, label: "Guide Language", value: v.guide === "required" ? resolvedLanguage(v) : "—", step: 3 },
  { n: 13, label: "Transportation", value: v.transport === "required" ? "Required" : "Not Required", step: 3 },
  { n: 14, label: "Preferred Vehicle", value: v.transport === "required" ? resolvedVehicle(v) : "—", step: 3 },
  { n: 15, label: "Quotation Currency", value: resolvedCurrency(v), step: 4 },
  { n: 16, label: "Special Requests", value: v.notes || "None", step: 4 },
];

/** The full inquiry as plain text, mirroring the Guide India Tours enquiry sheet. */
export const buildInquiryMessage = (v: InquiryValues): string =>
  [
    "🌏 GUIDE INDIA TOURS — TOUR INQUIRY",
    "",
    ...buildSummaryRows(v).map((row) => `${row.n}. ${row.label}: ${row.value}`),
    "",
    `Contact: ${v.email} · ${v.phone}`,
    "",
    "Please send me a personalised itinerary and quotation. Thank you!",
  ].join("\n");

export const buildInquiryWhatsAppUrl = (v: InquiryValues): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildInquiryMessage(v))}`;

export const buildInquiryMailto = (v: InquiryValues): string => {
  const subject = `Tour Inquiry — ${v.name} · ${formatDate(v.startDate) || "dates TBC"}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    buildInquiryMessage(v),
  )}`;
};
