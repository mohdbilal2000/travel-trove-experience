import type { TravelPlan } from "@/data/types/travelPlanTypes";

/** "From $169 per adult" for a priced plan, "Custom quote" when no numeric price is stored. */
export const fromPrice = (price: TravelPlan["price"]): string => {
  const m = price.match(/\$\s?[\d,]+(?:\.\d+)?/);
  return m ? `From ${m[0]} per adult` : "Custom quote";
};

/** Bare USD number for schema.org Offer, or null for quote-only plans. */
export const numericPrice = (price: TravelPlan["price"]): number | null => {
  const m = price.match(/\$\s?([\d,]+(?:\.\d+)?)/);
  return m ? Number(m[1].replace(/,/g, "")) : null;
};
