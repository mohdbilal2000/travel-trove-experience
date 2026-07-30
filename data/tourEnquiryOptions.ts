// Option lists for the /plan-my-tour enquiry wizard. Numbering in the comments
// tracks the sections of the enquiry template the office already uses on
// WhatsApp, so the form, the email and the reply template stay in step.
//
// Cities and the underlying transport capacity data live in
// `data/plannerOptions.ts`; monuments live in `data/cityMonuments.ts`.

export interface EnquiryOption {
  value: string;
  label: string;
}

/** §1 Nationality — `country` is only collected for international visitors. */
export const nationalityTypes: EnquiryOption[] = [
  { value: "indian", label: "Indian Citizen" },
  { value: "international", label: "International Visitor" },
];

/** §5 Meeting point — "other" reveals a free-text field. */
export const meetingPoints: EnquiryOption[] = [
  { value: "hotel", label: "Hotel" },
  { value: "airport", label: "Airport" },
  { value: "railway-station", label: "Railway Station" },
  { value: "other", label: "Other" },
];

/** §6 Transport — own vehicle requires driver/vehicle details instead. */
export const transportChoices: EnquiryOption[] = [
  { value: "arrange", label: "Please arrange a private vehicle for me" },
  { value: "own", label: "I have my own taxi / car" },
];

export interface VehiclePreference extends EnquiryOption {
  /** Seats comfortably, excluding the driver. Drives the auto-recommendation. */
  capacity: number;
  /** Matching `transportOptions` value in data/plannerOptions.ts. */
  transportValue: string;
  desc: string;
  /**
   * False for options chosen as an upgrade rather than for seat count — they
   * are offered, but never auto-suggested purely from headcount.
   */
  autoRecommend: boolean;
}

/** §6 Vehicle preference. Ordered smallest capacity first — `recommendedVehicle()` relies on it. */
export const vehiclePreferences: VehiclePreference[] = [
  {
    value: "sedan",
    label: "Sedan",
    desc: "Dzire / Etios · up to 3 guests",
    capacity: 3,
    transportValue: "private-ac-car",
    autoRecommend: true,
  },
  {
    value: "luxury",
    label: "Luxury Vehicle",
    desc: "Mercedes / BMW class · up to 3 guests",
    capacity: 3,
    transportValue: "private-ac-car",
    autoRecommend: false,
  },
  {
    value: "suv",
    label: "SUV",
    desc: "Ertiga / Xylo · up to 5 guests",
    capacity: 5,
    transportValue: "suv",
    autoRecommend: true,
  },
  {
    value: "innova-crysta",
    label: "Innova Crysta",
    desc: "Premium SUV · up to 6 guests",
    capacity: 6,
    transportValue: "suv",
    autoRecommend: true,
  },
  {
    value: "tempo-traveller",
    label: "Tempo Traveller",
    desc: "Van · 7–12 guests",
    capacity: 12,
    transportValue: "tempo-traveller",
    autoRecommend: true,
  },
  {
    value: "coach",
    label: "Luxury Coach",
    desc: "Group bus · 13+ guests",
    capacity: 50,
    transportValue: "luxury-coach",
    autoRecommend: true,
  },
];

/** §7 Accommodation — "hotel-stay" reveals the hotel name field. */
export const accommodationTypes: EnquiryOption[] = [
  { value: "same-day", label: "Same-Day Visit" },
  { value: "hotel-stay", label: "Hotel Stay" },
];

/** §8 Tour guide language. */
export interface GuideLanguage extends EnquiryOption {
  flag: string;
}

export const guideLanguages: GuideLanguage[] = [
  { value: "english", label: "English", flag: "🇬🇧" },
  { value: "french", label: "French", flag: "🇫🇷" },
  { value: "german", label: "German", flag: "🇩🇪" },
  { value: "spanish", label: "Spanish", flag: "🇪🇸" },
  { value: "italian", label: "Italian", flag: "🇮🇹" },
  { value: "japanese", label: "Japanese", flag: "🇯🇵" },
  { value: "russian", label: "Russian", flag: "🇷🇺" },
  { value: "chinese", label: "Chinese", flag: "🇨🇳" },
  { value: "other", label: "Other", flag: "🌐" },
];

/** §9 Tour style. */
export const tourStyles: EnquiryOption[] = [
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "vip-luxury", label: "VIP / Luxury" },
  { value: "customized", label: "Fully Customized" },
];

/** §10 Interests. */
export const interestOptions: EnquiryOption[] = [
  { value: "history", label: "History" },
  { value: "architecture", label: "Architecture" },
  { value: "photography", label: "Photography" },
  { value: "local-culture", label: "Local Culture" },
  { value: "food", label: "Food Experience" },
  { value: "shopping", label: "Shopping" },
  { value: "sunrise", label: "Sunrise Tour" },
  { value: "sunset", label: "Sunset Tour" },
  { value: "hidden-gems", label: "Hidden Gems" },
];

/** §11 Special assistance — "other" reveals a free-text field. */
export const specialAssistanceOptions: EnquiryOption[] = [
  { value: "senior-citizen", label: "Senior Citizen" },
  { value: "children", label: "Children" },
  { value: "wheelchair", label: "Wheelchair Assistance" },
  { value: "medical", label: "Medical Assistance" },
  { value: "vegetarian", label: "Vegetarian Meals" },
  { value: "vegan", label: "Vegan Meals" },
  { value: "other", label: "Other" },
];

/** §12 Monument tickets. */
export const ticketStatuses: EnquiryOption[] = [
  { value: "arrange", label: "Please arrange tickets for me" },
  { value: "booked", label: "Already booked" },
];

/** §13 VIP services. */
export const vipServiceOptions: EnquiryOption[] = [
  { value: "skip-the-line", label: "Skip-the-Line Entry" },
  { value: "golf-cart", label: "Golf Cart" },
  { value: "wheelchair", label: "Wheelchair" },
  { value: "photography", label: "Professional Photography Assistance" },
];

/** §15 Budget preference. */
export const budgetTiers: EnquiryOption[] = [
  { value: "economy", label: "Economy" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Luxury" },
];

/** Resolve an option `value` back to its display label for summaries and emails. */
export const labelFor = (options: EnquiryOption[], value: string): string =>
  options.find((o) => o.value === value)?.label || value;

/** Map several selected values to their labels, preserving option order. */
export const labelsFor = (options: EnquiryOption[], values: string[]): string[] =>
  options.filter((o) => values.includes(o.value)).map((o) => o.label);
