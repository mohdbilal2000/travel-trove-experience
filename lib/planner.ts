// Pure helpers for the home Trip Planner: shared filtering logic plus the
// WhatsApp / email handoff message builders. No React, no side effects.

import { allPlans } from "@/data/travelPlans";
import type { TravelPlan } from "@/data/types/travelPlanTypes";
import { cityLabel, goldenTrianglePreset, transportOptions } from "@/data/plannerOptions";

export interface PlannerState {
  adults: number;
  children: number;
  /** null until the visitor picks a duration. */
  days: number | null;
  cities: string[];
  /** transport option `value`, or "" if not chosen. */
  transport: string;
}

const WHATSAPP_NUMBER = "918979810991";
const CONTACT_EMAIL = "info@guideindiatours.com";

const byPopularityThenRating = (a: TravelPlan, b: TravelPlan): number => {
  if (a.popular && !b.popular) return -1;
  if (!a.popular && b.popular) return 1;
  return b.rating - a.rating;
};

/** True when exactly the three Golden Triangle cities are selected. */
export const isGoldenTriangle = (cities: string[]): boolean =>
  cities.length === goldenTrianglePreset.length &&
  goldenTrianglePreset.every((c) => cities.includes(c));

/**
 * Filter plans by the planner's selected cities.
 * - No cities → top 6 by popularity/rating.
 * - Golden Triangle → plans covering all three cities.
 * - Otherwise → plans matching ANY selected city.
 */
export const getFilteredPlans = (cities: string[]): TravelPlan[] => {
  if (cities.length === 0) {
    return [...allPlans].sort(byPopularityThenRating).slice(0, 6);
  }

  if (isGoldenTriangle(cities)) {
    return allPlans
      .filter((plan) => {
        const title = plan.title.toLowerCase();
        const destinations = plan.destinations || [];
        const planHasDelhi = destinations.includes("Delhi") || title.includes("delhi");
        const planHasAgra = destinations.includes("Agra") || title.includes("agra");
        const planHasJaipur = destinations.includes("Jaipur") || title.includes("jaipur");
        return (planHasDelhi && planHasAgra && planHasJaipur) || title.includes("golden triangle");
      })
      .sort(byPopularityThenRating)
      .slice(0, 6);
  }

  return allPlans
    .filter((plan) => {
      const title = plan.title.toLowerCase();
      const destinations = plan.destinations || [];
      const description = plan.description.toLowerCase();
      return cities.some((city) => {
        const cityLower = city.toLowerCase();
        return destinations.includes(city) || title.includes(cityLower) || description.includes(cityLower);
      });
    })
    .sort(byPopularityThenRating)
    .slice(0, 6);
};

const travellersLine = (adults: number, children: number): string => {
  const parts = [`${adults} ${adults === 1 ? "Adult" : "Adults"}`];
  if (children > 0) parts.push(`${children} ${children === 1 ? "Child" : "Children"}`);
  const total = adults + children;
  return `${parts.join(", ")} (${total} total)`;
};

const transportLabel = (value: string): string =>
  transportOptions.find((t) => t.value === value)?.label || "";

/** Human-readable bullet lines summarising the current selection. */
export const buildSummaryLines = (state: PlannerState): string[] => {
  const lines = [`Travellers: ${travellersLine(state.adults, state.children)}`];
  if (state.days) lines.push(`Duration: ${state.days} Days`);
  if (state.cities.length > 0) {
    const cityNames = state.cities.map(cityLabel).join(", ");
    const prefix = isGoldenTriangle(state.cities) ? "Golden Triangle — " : "";
    lines.push(`Cities: ${prefix}${cityNames}`);
  }
  if (state.transport) lines.push(`Transport: ${transportLabel(state.transport)}`);
  return lines;
};

const tripLabel = (cities: string[]): string =>
  isGoldenTriangle(cities) ? "Golden Triangle" : "custom India";

/** Full WhatsApp message body (decoded — caller encodes). */
export const buildWhatsAppMessage = (state: PlannerState): string => {
  const intro = `Hi Guide India Tours! I'd like a quote for a ${tripLabel(state.cities)} trip.`;
  const bullets = buildSummaryLines(state)
    .map((l) => `• ${l}`)
    .join("\n");
  return `${intro}\n\n${bullets}\n\nPlease share the best package and pricing. Thanks!`;
};

export const buildWhatsAppUrl = (state: PlannerState): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(state))}`;

/** mailto: link with subject + summary body (CRLF line breaks for clients). */
export const buildMailto = (state: PlannerState): string => {
  const subject = `Trip enquiry — ${tripLabel(state.cities)} (${state.days ? `${state.days} Days` : "flexible"})`;
  const bodyLines = [
    `Hi Guide India Tours,`,
    ``,
    `I'd like a quote for the following trip:`,
    ``,
    ...buildSummaryLines(state).map((l) => `- ${l}`),
    ``,
    `Please share the best package and pricing. Thanks!`,
  ];
  const body = bodyLines.join("\r\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export { WHATSAPP_NUMBER, CONTACT_EMAIL };
