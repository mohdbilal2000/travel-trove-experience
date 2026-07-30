// Rate card for the /plan-my-tour price estimator.
//
// ⚠️ PLACEHOLDER — every number below is 0 and `RATES_READY` is false, so the
// site shows NO price to visitors. Nothing is quoted until real rates land here.
//
// To turn the live estimate on:
//   1. Fill in the tables below with real figures (INR).
//   2. Flip RATES_READY to true.
// No component changes are needed — the estimator and the UI already read from
// this file. See `lib/quote.ts` for how each number is applied.

/** Master switch. While false, the wizard shows derived facts but never a price. */
export const RATES_READY = false;

export const CURRENCY = "INR";

/**
 * Per-day hire rate by vehicle, keyed by `value` in `vehiclePreferences`
 * (data/tourEnquiryOptions.ts). Should cover driver, fuel and local taxes.
 */
export const vehicleDayRates: Record<string, number> = {
  sedan: 0,
  luxury: 0,
  suv: 0,
  "innova-crysta": 0,
  "tempo-traveller": 0,
  coach: 0,
};

/**
 * Guide fee per day, keyed by city (matching `availableCities` values).
 * `default` is used for any city without its own entry.
 */
export const guideDayRates: Record<string, number> = {
  default: 0,
  Delhi: 0,
  Agra: 0,
  Jaipur: 0,
};

/**
 * Multiplier applied to the guide fee by tour style, keyed by `value` in
 * `tourStyles`. 1 = no change.
 */
export const tourStyleMultipliers: Record<string, number> = {
  standard: 1,
  premium: 1,
  "vip-luxury": 1,
  customized: 1,
};

/**
 * Monument entry tickets per person, split by visitor type — Indian nationals
 * and foreign nationals pay different published rates at ASI monuments.
 * Keys match the monument names in `data/cityMonuments.ts`.
 */
export interface TicketPrice {
  indian: number;
  foreigner: number;
}

export const monumentTickets: Record<string, TicketPrice> = {
  "Taj Mahal": { indian: 0, foreigner: 0 },
  "Agra Fort": { indian: 0, foreigner: 0 },
  "Fatehpur Sikri": { indian: 0, foreigner: 0 },
  "Itimad-ud-Daulah": { indian: 0, foreigner: 0 },
  "Mehtab Garden": { indian: 0, foreigner: 0 },
  "Akbar Tomb": { indian: 0, foreigner: 0 },
  "Taj View Point": { indian: 0, foreigner: 0 },
  "Red Fort": { indian: 0, foreigner: 0 },
  "India Gate": { indian: 0, foreigner: 0 },
  "Qutub Minar": { indian: 0, foreigner: 0 },
  "Lotus Temple": { indian: 0, foreigner: 0 },
  "Jama Masjid": { indian: 0, foreigner: 0 },
  "Humayun's Tomb": { indian: 0, foreigner: 0 },
  "Akshardham Temple": { indian: 0, foreigner: 0 },
  "Amber Fort": { indian: 0, foreigner: 0 },
  "City Palace": { indian: 0, foreigner: 0 },
  "Hawa Mahal": { indian: 0, foreigner: 0 },
  "Jantar Mantar": { indian: 0, foreigner: 0 },
  "Nahargarh Fort": { indian: 0, foreigner: 0 },
  "Jal Mahal": { indian: 0, foreigner: 0 },
  "Albert Hall Museum": { indian: 0, foreigner: 0 },
};

/** Flat add-on charges, keyed by `value` in `vipServiceOptions`. */
export const vipServiceRates: Record<string, number> = {
  "skip-the-line": 0,
  "golf-cart": 0,
  wheelchair: 0,
  photography: 0,
};

/** Children below 15 usually pay a reduced ticket. 1 = full price, 0 = free. */
export const childTicketMultiplier = 1;
