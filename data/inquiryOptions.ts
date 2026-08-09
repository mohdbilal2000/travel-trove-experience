// Option data for the contact-page tour inquiry questionnaire.
// Single source of truth shared by the form UI and the message builder in
// `lib/inquiry.ts`, so the labels a guest sees are the labels we send.

export interface Choice {
  value: string;
  label: string;
  /** Optional one-line helper shown under the label in card-style pickers. */
  desc?: string;
}

/** Q6 — Hotel accommodation. */
export const hotelOptions: Choice[] = [
  { value: "required", label: "Hotel Required", desc: "Please arrange it for us" },
  { value: "not-required", label: "Hotel Not Required", desc: "We are only booking the tour" },
  { value: "booked", label: "Already Booked", desc: "We will share the hotel name" },
];

/** Q9 — Preferred tour experience. */
export const experienceOptions: Choice[] = [
  { value: "standard", label: "Standard", desc: "Comfortable & professional" },
  { value: "premium", label: "Premium", desc: "Enhanced comfort & personalised service" },
  { value: "luxury", label: "Luxury", desc: "Exclusive & VIP experience" },
  { value: "not-sure", label: "Not Sure", desc: "Please recommend the best option" },
];

/** Q12 — Preferred guide language. */
export const guideLanguages: Choice[] = [
  { value: "English", label: "English" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Spanish", label: "Spanish" },
  { value: "Italian", label: "Italian" },
  { value: "Russian", label: "Russian" },
  { value: "Japanese", label: "Japanese" },
  { value: "Chinese", label: "Chinese" },
  { value: "Other", label: "Other" },
];

/** Q14 — Preferred vehicle. */
export const vehicleOptions: Choice[] = [
  { value: "Sedan", label: "Sedan", desc: "Up to 3 guests" },
  { value: "SUV", label: "SUV", desc: "Innova / Crysta · up to 5" },
  { value: "Luxury", label: "Luxury", desc: "Premium chauffeured car" },
  { value: "Tempo Traveller", label: "Tempo Traveller", desc: "6–12 guests" },
  { value: "Other", label: "Other", desc: "Tell us what you need" },
];

/** Q15 — Preferred quotation currency. */
export const currencyOptions: Choice[] = [
  { value: "USD", label: "USD", desc: "US Dollar" },
  { value: "EUR", label: "EUR", desc: "Euro" },
  { value: "GBP", label: "GBP", desc: "British Pound" },
  { value: "INR", label: "INR", desc: "Indian Rupee" },
  { value: "Other", label: "Other", desc: "Name your currency" },
];

/** Shared Required / Not Required pair used by Q10, Q11 and Q13. */
export const yesNoOptions: Choice[] = [
  { value: "required", label: "Required" },
  { value: "not-required", label: "Not Required" },
];

export const labelFor = (options: Choice[], value: string): string =>
  options.find((o) => o.value === value)?.label || value;
