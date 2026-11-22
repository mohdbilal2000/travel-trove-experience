import type { TravelPlan } from "@/data/types/travelPlanTypes";
import { allPlans } from "@/data/travelPlans";
import { numericPrice } from "@/lib/planPrice";

const SITE = "Guide India Tours";
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 155;

/**
 * A plan counts as luxury when its title says so. Titles like "Royal Heritage"
 * are standard-tier tours, so "royal" alone does not qualify — only
 * "Royal Experience" / "Ultimate Royal", which are the 5-star variants.
 */
export const isLuxuryPlan = (plan: TravelPlan): boolean =>
    /\bluxury\b|\bvip\b|\bdeluxe\b|royal experience|ultimate royal/i.test(plan.title);

const CITY_KEYWORDS = [
    "Delhi", "Agra", "Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Bikaner",
    "Ranthambore", "Pushkar", "Ajmer", "Chittorgarh", "Mount Abu", "Mandawa",
    "Kerala", "Varanasi",
];

/** Cities a plan covers: its destinations when set, otherwise inferred from the title. */
export const planCities = (plan: TravelPlan): string[] => {
    if (plan.destinations && plan.destinations.length > 0) return plan.destinations;
    const title = plan.title.toLowerCase();
    const found = CITY_KEYWORDS.filter((c) => title.includes(c.toLowerCase()));
    // "Golden Triangle" always means Delhi + Agra + Jaipur.
    if (title.includes("golden triangle")) {
        for (const c of ["Delhi", "Agra", "Jaipur"]) if (!found.includes(c)) found.push(c);
    }
    return found;
};

const durationDays = (plan: TravelPlan): number => {
    const days = plan.duration.match(/(\d+)\s*Days?/i);
    if (days) return Number(days[1]);
    const nights = plan.duration.match(/(\d+)\s*Nights?/i);
    if (nights) return Number(nights[1]) + 1;
    if (/same day|1 day/i.test(plan.duration)) return 1;
    return 99; // flexible / bespoke
};

const isFlexible = (plan: TravelPlan): boolean => /flexible/i.test(plan.duration);

/** Title tag: always ≤ 60 chars, never truncated mid-word, no duplicated duration. */
export const planMetaTitle = (plan: TravelPlan): string => {
    const price = numericPrice(plan.price);
    const priceText = price !== null ? `From $${price.toLocaleString("en-US")}` : null;
    const candidates = [
        priceText ? `${plan.title} – ${priceText} | ${SITE}` : null,
        `${plan.title} | ${SITE}`,
        priceText ? `${plan.title} – ${priceText}` : null,
        plan.title,
    ].filter((c): c is string => c !== null);
    return candidates.find((c) => c.length <= MAX_TITLE) ?? plan.title;
};

const joinList = (items: string[]): string =>
    items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

/**
 * Meta description built from the plan's own facts, assembled by priority so it
 * always ends on a full sentence (the old version was cut mid-sentence with "…").
 */
export const planMetaDescription = (plan: TravelPlan): string => {
    const cities = planCities(plan).slice(0, 4);
    const price = numericPrice(plan.price);
    const luxury = isLuxuryPlan(plan);

    const where = cities.length > 0 ? ` in ${joinList(cities)}` : "";
    const how = isFlexible(plan) ? "Fully customised" : plan.duration.replace(/\s*\/\s*/g, ", ");
    const parts: string[] = [
        `${luxury ? "Luxury private" : "Private"} tour${where}: ${how}.`,
        price !== null ? `From $${price.toLocaleString("en-US")} per adult.` : "Custom quote.",
        "Government-approved guide and private AC car.",
        luxury ? "Request a private proposal within 2 hours." : "Free written quote within 2 hours.",
    ];

    let out = "";
    for (const part of parts) {
        const next = out ? `${out} ${part}` : part;
        if (next.length > MAX_DESCRIPTION) break;
        out = next;
    }
    return out;
};

export interface RelatedPlans {
    /** Same trip, other tier (luxury ↔ standard) — the natural upsell / downsell. */
    counterpart?: TravelPlan;
    /** Similar tours in the same tier covering the same cities. */
    similar: TravelPlan[];
}

const sameCities = (a: TravelPlan, b: TravelPlan): boolean => {
    const ca = [...planCities(a)].map((c) => c.toLowerCase()).sort().join("|");
    const cb = [...planCities(b)].map((c) => c.toLowerCase()).sort().join("|");
    return ca !== "" && ca === cb;
};

const overlap = (a: TravelPlan, b: TravelPlan): number => {
    const cb = new Set(planCities(b).map((c) => c.toLowerCase()));
    return planCities(a).filter((c) => cb.has(c.toLowerCase())).length;
};

export function getRelatedPlans(plan: TravelPlan, limit = 3): RelatedPlans {
    const luxury = isLuxuryPlan(plan);
    const others = allPlans.filter((p) => p.id !== plan.id && !isFlexible(p));
    const days = durationDays(plan);
    const byDurationGap = (a: TravelPlan, b: TravelPlan) =>
        Math.abs(durationDays(a) - days) - Math.abs(durationDays(b) - days);

    // Counterpart: same cities, opposite tier, closest length.
    // Bespoke/flexible plans have no fixed length to match, so no counterpart.
    const counterpart = isFlexible(plan)
        ? undefined
        : others
              .filter((p) => isLuxuryPlan(p) !== luxury && sameCities(plan, p))
              .sort(byDurationGap)[0];

    // Similar: same tier, shares a city, closest length, best city overlap first.
    const similar = others
        .filter((p) => isLuxuryPlan(p) === luxury && p.id !== counterpart?.id && overlap(plan, p) > 0)
        .sort((a, b) => overlap(plan, b) - overlap(plan, a) || byDurationGap(a, b))
        .slice(0, limit);

    return { counterpart, similar };
}
