"use client";

// Step 2 — §3 Travel dates, §4 Destinations (cities → monuments), §7 Accommodation.

import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Info, Sparkles } from "lucide-react";
import type { TourEnquiry } from "@/lib/tourEnquiry";
import { tripLength } from "@/lib/quote";
import { availableCities, goldenTrianglePreset, cityLabel } from "@/data/plannerOptions";
import { monumentsForCity, citiesWithMonuments } from "@/data/cityMonuments";
import { accommodationTypes } from "@/data/tourEnquiryOptions";
import { cn } from "@/lib/utils";
import {
  StepHeading,
  FieldLabel,
  ErrorText,
  TextInput,
  OptionCards,
  ChipGroup,
} from "@/components/plan-my-tour/fields";

const today = () => new Date().toISOString().split("T")[0];

/**
 * True when any day of the trip falls on a Friday and Agra is on the list —
 * the Taj Mahal closes for prayers on Fridays, the single most common surprise
 * for visitors. Capped at a year so a mistyped date can't spin the loop.
 */
const hasFridayInAgra = (arrival: string, departure: string, cities: string[]): boolean => {
  if (!cities.includes("Agra") || !arrival || !departure) return false;
  const start = new Date(`${arrival}T00:00:00`);
  const end = new Date(`${departure}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) return false;
  if ((end.getTime() - start.getTime()) / 86_400_000 > 365) return false;

  for (const day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    if (day.getDay() === 5) return true;
  }
  return false;
};

export default function StepYourTrip({ form }: { form: UseFormReturn<TourEnquiry> }) {
  const { register, setValue, watch, formState } = form;
  const errors = formState.errors;

  const arrivalDate = watch("arrivalDate");
  const departureDate = watch("departureDate");
  const cities = watch("cities");
  const monuments = watch("monuments");
  const itineraryUndecided = watch("itineraryUndecided");
  const accommodationType = watch("accommodationType");

  const length = tripLength(arrivalDate, departureDate);
  const fridayWarning = hasFridayInAgra(arrivalDate, departureDate, cities);
  const isGoldenTriangle =
    cities.length === goldenTrianglePreset.length &&
    goldenTrianglePreset.every((c) => cities.includes(c));

  // Monument sub-picker only covers the cities we guide monument-by-monument.
  const monumentCities = useMemo(
    () => cities.filter((c) => citiesWithMonuments.includes(c)),
    [cities],
  );

  const toggleCity = (city: string) => {
    const next = cities.includes(city) ? cities.filter((c) => c !== city) : [...cities, city];
    setValue("cities", next, { shouldValidate: true });
    // Drop monuments belonging to a city that is no longer selected.
    const stillValid = monuments.filter((m) => next.some((c) => monumentsForCity(c).includes(m)));
    if (stillValid.length !== monuments.length) setValue("monuments", stillValid);
  };

  const toggleGoldenTriangle = () => {
    const next = isGoldenTriangle ? [] : [...goldenTrianglePreset];
    setValue("cities", next, { shouldValidate: true });
    if (next.length === 0) setValue("monuments", []);
  };

  const toggleMonument = (monument: string) => {
    setValue(
      "monuments",
      monuments.includes(monument)
        ? monuments.filter((m) => m !== monument)
        : [...monuments, monument],
    );
  };

  return (
    <div className="space-y-10">
      <StepHeading n={2} title="Your Trip" subtitle="When you arrive, where you want to go, and where you'll stay." />

      {/* §3 */}
      <div>
        <FieldLabel required>Travel Dates</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5" htmlFor="arrivalDate">
              Arrival
            </label>
            <TextInput
              id="arrivalDate"
              type="date"
              min={today()}
              {...register("arrivalDate")}
              invalid={!!errors.arrivalDate}
            />
            <ErrorText message={errors.arrivalDate?.message} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5" htmlFor="departureDate">
              Departure
            </label>
            <TextInput
              id="departureDate"
              type="date"
              min={arrivalDate || today()}
              {...register("departureDate")}
              invalid={!!errors.departureDate}
            />
            <ErrorText message={errors.departureDate?.message} />
          </div>
        </div>

        {length && (
          <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-maroon-600 bg-maroon-600/5 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4" />
            {length.days} {length.days === 1 ? "day" : "days"} / {length.nights}{" "}
            {length.nights === 1 ? "night" : "nights"}
          </p>
        )}
      </div>

      {/* §4 */}
      <div>
        <FieldLabel>Destinations You Wish to Visit</FieldLabel>

        <label className="flex items-start gap-3 p-4 rounded-2xl border-2 border-gold-300 bg-gold-50 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={itineraryUndecided}
            onChange={(e) => setValue("itineraryUndecided", e.target.checked, { shouldValidate: true })}
            className="mt-0.5 w-5 h-5 accent-maroon-600 shrink-0"
          />
          <span>
            <span className="block text-sm font-bold text-gray-900">
              I haven&apos;t planned my itinerary yet
            </span>
            <span className="block text-xs text-gray-600 mt-0.5">
              Tick this and our team will design the best itinerary for your dates and interests.
            </span>
          </span>
        </label>

        {!itineraryUndecided && (
          <>
            <button
              type="button"
              onClick={toggleGoldenTriangle}
              className={cn(
                "mb-4 inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full border-2 text-sm font-bold transition-all",
                isGoldenTriangle
                  ? "border-gold-500 bg-gold-500 text-white shadow-md"
                  : "border-gold-400 bg-white text-gold-700 hover:bg-gold-50",
              )}
            >
              <Sparkles className="w-4 h-4" />
              Golden Triangle — Delhi, Agra &amp; Jaipur
            </button>

            <ChipGroup
              name="Cities"
              options={availableCities}
              values={cities}
              onToggle={toggleCity}
            />
            <ErrorText message={errors.cities?.message} />

            <div className="mt-4 max-w-xl">
              <FieldLabel>Other destinations</FieldLabel>
              <TextInput
                {...register("otherDestinations")}
                placeholder="e.g. Varanasi, Khajuraho"
                invalid={!!errors.otherDestinations}
              />
              <ErrorText message={errors.otherDestinations?.message} />
            </div>

            {monumentCities.length > 0 && (
              <div className="mt-8 space-y-6">
                <p className="text-sm text-gray-600">
                  Pick the monuments you want to see. Not sure yet? Leave them blank and we&apos;ll
                  suggest the best ones.
                </p>
                {monumentCities.map((city) => (
                  <div key={city}>
                    <p className="text-[11px] font-black uppercase tracking-widest text-maroon-600 mb-2.5">
                      {cityLabel(city)}
                    </p>
                    <ChipGroup
                      name={`${city} monuments`}
                      options={monumentsForCity(city).map((m) => ({ value: m, label: m }))}
                      values={monuments}
                      onToggle={toggleMonument}
                    />
                  </div>
                ))}
              </div>
            )}

            {fridayWarning && (
              <div className="mt-6 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl flex gap-4">
                <Info className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <p className="font-bold text-amber-900 text-sm">Friday notice</p>
                  <p className="text-amber-700 text-xs leading-relaxed">
                    Your dates include a Friday, when the Taj Mahal is closed for prayers. Agra Fort,
                    Fatehpur Sikri and the other monuments stay open — we&apos;ll plan around it.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* §7 */}
      <div>
        <FieldLabel required>Accommodation</FieldLabel>
        <OptionCards
          name="Accommodation"
          options={accommodationTypes}
          value={accommodationType}
          onChange={(v) => setValue("accommodationType", v, { shouldValidate: true })}
        />
        <ErrorText message={errors.accommodationType?.message} />

        {accommodationType === "hotel-stay" && (
          <div className="mt-4 max-w-md">
            <FieldLabel required>Hotel Name</FieldLabel>
            <TextInput
              {...register("hotelName")}
              placeholder="Hotel name, or 'not booked yet'"
              invalid={!!errors.hotelName}
            />
            <ErrorText message={errors.hotelName?.message} />
          </div>
        )}
      </div>
    </div>
  );
}
