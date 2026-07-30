"use client";

// Sticky sidebar showing what we can already work out from the answers so far:
// party size, trip length, recommended vehicle and matching packages. Price is
// deliberately absent until real rates land in data/tourRates.ts.

import { useMemo } from "react";
import Link from "next/link";
import { Users, CalendarDays, MapPin, Car, Sparkles, ShieldCheck } from "lucide-react";
import type { TourEnquiry } from "@/lib/tourEnquiry";
import {
  totalGuests,
  tripLength,
  recommendedVehicle,
  matchingPlans,
  estimateQuote,
} from "@/lib/quote";
import { cityLabel } from "@/data/plannerOptions";
import { vehiclePreferences, labelFor, budgetTiers } from "@/data/tourEnquiryOptions";

const Row = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <Icon className="w-4 h-4 text-maroon-600 mt-1 shrink-0" />
    <div className="min-w-0">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</p>
      <p className="text-sm font-bold text-gray-900 break-words">{value}</p>
    </div>
  </div>
);

export default function EnquirySummary({ values }: { values: TourEnquiry }) {
  const guests = totalGuests(values.adults, values.children);
  const length = tripLength(values.arrivalDate, values.departureDate);
  const suggested = recommendedVehicle(guests);

  const chosenVehicle =
    values.transportChoice === "own"
      ? "Own taxi / car"
      : vehiclePreferences.find((v) => v.value === values.vehiclePreference)?.label ||
        `${suggested.label} (suggested)`;

  const plans = useMemo(() => matchingPlans(values.cities).slice(0, 2), [values.cities]);
  const quote = estimateQuote({
    adults: values.adults,
    children: values.children,
    arrivalDate: values.arrivalDate,
    departureDate: values.departureDate,
    nationalityType: values.nationalityType,
    cities: values.cities,
    monuments: values.monuments,
    transportChoice: values.transportChoice,
    vehiclePreference: values.vehiclePreference,
    tourStyle: values.tourStyle,
    vipServices: values.vipServices,
  });

  const destinations = values.itineraryUndecided
    ? "We'll build your itinerary"
    : values.cities.length > 0
      ? values.cities.map(cityLabel).join(", ")
      : "Not chosen yet";

  return (
    <div className="lg:sticky lg:top-28 space-y-5">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)] overflow-hidden">
        <div className="bg-gradient-to-r from-maroon-600 to-maroon-700 px-6 py-4 flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-gold-500" />
          <h2 className="font-display text-xl font-semibold">Your Trip So Far</h2>
        </div>

        <div className="p-6 space-y-5">
          <Row
            icon={Users}
            label="Guests"
            value={`${guests} total · ${values.adults} adult${values.adults === 1 ? "" : "s"}${
              values.children > 0 ? `, ${values.children} child${values.children === 1 ? "" : "ren"}` : ""
            }`}
          />
          <Row
            icon={CalendarDays}
            label="Duration"
            value={
              length ? `${length.days} days / ${length.nights} nights` : "Add your dates"
            }
          />
          <Row icon={MapPin} label="Destinations" value={destinations} />
          <Row icon={Car} label="Vehicle" value={chosenVehicle} />

          {values.budget && (
            <Row icon={ShieldCheck} label="Budget" value={labelFor(budgetTiers, values.budget)} />
          )}

          {quote && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                Indicative total
              </p>
              <p className="text-2xl font-black text-maroon-600">
                {quote.currency} {quote.total.toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                Estimate only — we confirm the final price with your itinerary.
              </p>
            </div>
          )}
        </div>
      </div>

      {plans.length > 0 && (
        <div className="bg-ivory-300/50 rounded-3xl border border-gold-200 p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-maroon-600 mb-3">
            Tours matching your cities
          </p>
          <div className="space-y-3">
            {plans.map((plan) => (
              <Link
                key={plan.id}
                href={`/plans/${plan.id}`}
                className="block group"
              >
                <p className="text-sm font-bold text-gray-900 group-hover:text-maroon-600 transition-colors leading-snug">
                  {plan.title}
                </p>
                <p className="text-xs text-gray-500">{plan.duration}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
