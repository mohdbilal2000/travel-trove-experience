// Derived values for the /plan-my-tour wizard: everything the visitor should
// not have to type because we can work it out from what they already told us.
//
// Pure functions only — no React, no side effects, same style as lib/planner.ts.
// Deliberately typed against narrow inputs rather than the full enquiry object
// so this module stays free of any dependency on lib/tourEnquiry.ts.

import { getFilteredPlans } from "@/lib/planner";
import type { TravelPlan } from "@/data/types/travelPlanTypes";
import { vehiclePreferences, type VehiclePreference } from "@/data/tourEnquiryOptions";
import {
  RATES_READY,
  CURRENCY,
  vehicleDayRates,
  guideDayRates,
  tourStyleMultipliers,
  monumentTickets,
  vipServiceRates,
  childTicketMultiplier,
} from "@/data/tourRates";

/** Total party size. Children are counted — they still need a seat. */
export const totalGuests = (adults: number, children: number): number =>
  (adults || 0) + (children || 0);

export interface TripLength {
  days: number;
  nights: number;
}

/**
 * Trip length from the arrival/departure dates (ISO `yyyy-mm-dd`).
 * Arrival and departure on the same day is a 1-day, 0-night trip.
 * Returns null when either date is missing or unparseable.
 */
export const tripLength = (arrival: string, departure: string): TripLength | null => {
  if (!arrival || !departure) return null;

  const start = new Date(`${arrival}T00:00:00`);
  const end = new Date(`${departure}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;

  const nights = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  if (nights < 0) return null;

  return { days: nights + 1, nights };
};

/**
 * Smallest vehicle that seats the whole party, ignoring options that exist as
 * an upgrade rather than a capacity tier (see `autoRecommend`). Falls back to
 * the largest option for very big groups. Advisory only — the visitor can
 * always override, same soft-hint approach as the home TripPlanner.
 */
export const recommendedVehicle = (guests: number): VehiclePreference => {
  const tiers = vehiclePreferences.filter((v) => v.autoRecommend);
  return tiers.find((v) => v.capacity >= guests) || tiers[tiers.length - 1];
};

/** True when the chosen vehicle seats fewer guests than the party — a hint, not a block. */
export const isOverCapacity = (vehicleValue: string, guests: number): boolean => {
  const vehicle = vehiclePreferences.find((v) => v.value === vehicleValue);
  return !!vehicle && guests > vehicle.capacity;
};

/** Tour packages matching the selected cities — delegates to the shared planner filter. */
export const matchingPlans = (cities: string[]): TravelPlan[] => getFilteredPlans(cities);

// ---------------------------------------------------------------------------
// Price estimate
//
// Fully implemented, but gated: `estimateQuote` returns null while
// `RATES_READY` is false in data/tourRates.ts, so the UI shows no price until
// real rates are supplied. Fill that file in and flip the flag to switch it on.
// ---------------------------------------------------------------------------

export interface QuoteInput {
  adults: number;
  children: number;
  arrivalDate: string;
  departureDate: string;
  nationalityType: string;
  cities: string[];
  monuments: string[];
  transportChoice: string;
  vehiclePreference: string;
  tourStyle: string;
  vipServices: string[];
}

export interface QuoteBreakdown {
  currency: string;
  vehicle: number;
  guide: number;
  tickets: number;
  vipServices: number;
  total: number;
  /** Days the estimate was calculated over. */
  days: number;
}

const ticketsTotal = (input: QuoteInput): number => {
  const foreign = input.nationalityType === "international";
  return input.monuments.reduce((sum, monument) => {
    const price = monumentTickets[monument];
    if (!price) return sum;
    const perPerson = foreign ? price.foreigner : price.indian;
    return sum + perPerson * input.adults + perPerson * childTicketMultiplier * input.children;
  }, 0);
};

const guideTotal = (input: QuoteInput, days: number): number => {
  const multiplier = tourStyleMultipliers[input.tourStyle] ?? 1;
  // One guide day per travel day, priced off the first selected city.
  const city = input.cities[0];
  const dayRate = (city && guideDayRates[city]) || guideDayRates.default || 0;
  return dayRate * days * multiplier;
};

/**
 * Indicative total for the enquiry, or null when rates are not configured or
 * the dates are incomplete. Never treat the result as a binding quote — the
 * office confirms the final figure.
 */
export const estimateQuote = (input: QuoteInput): QuoteBreakdown | null => {
  if (!RATES_READY) return null;

  const length = tripLength(input.arrivalDate, input.departureDate);
  if (!length) return null;

  const { days } = length;

  // Visitors using their own car are not charged for a vehicle.
  const vehicle =
    input.transportChoice === "own"
      ? 0
      : (vehicleDayRates[input.vehiclePreference] || 0) * days;

  const guide = guideTotal(input, days);
  const tickets = ticketsTotal(input);
  const vipServices = input.vipServices.reduce(
    (sum, service) => sum + (vipServiceRates[service] || 0),
    0,
  );

  return {
    currency: CURRENCY,
    vehicle,
    guide,
    tickets,
    vipServices,
    total: vehicle + guide + tickets + vipServices,
    days,
  };
};

export { RATES_READY };
