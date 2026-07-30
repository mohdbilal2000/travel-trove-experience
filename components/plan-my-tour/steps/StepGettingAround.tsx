"use client";

// Step 3 — §5 Meeting point, §6 Transport + vehicle, and the optional
// day-by-day route builder (pickup/drop legs like
// "Day 1: Airport → Delhi hotel", "Day 2: Delhi hotel → Agra monuments → hotel").

import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { ArrowRight, Plus, Trash2, Route, AlertTriangle } from "lucide-react";
import type { TourEnquiry } from "@/lib/tourEnquiry";
import { recommendedVehicle, totalGuests, isOverCapacity, tripLength } from "@/lib/quote";
import { meetingPoints, transportChoices, vehiclePreferences, labelFor } from "@/data/tourEnquiryOptions";
import { cityLabel } from "@/data/plannerOptions";
import { cn } from "@/lib/utils";
import {
  StepHeading,
  FieldLabel,
  ErrorText,
  TextInput,
  TextArea,
  OptionCards,
} from "@/components/plan-my-tour/fields";

const MAX_LEGS = 20;

export default function StepGettingAround({ form }: { form: UseFormReturn<TourEnquiry> }) {
  const { register, setValue, watch, formState } = form;
  const errors = formState.errors;

  const meetingPoint = watch("meetingPoint");
  const transportChoice = watch("transportChoice");
  const vehiclePreference = watch("vehiclePreference");
  const adults = watch("adults");
  const children = watch("children");
  const cities = watch("cities");
  const arrivalDate = watch("arrivalDate");
  const departureDate = watch("departureDate");

  const { fields, append, remove, replace } = useFieldArray({ control: form.control, name: "routeLegs" });

  const guests = totalGuests(adults, children);
  const suggested = recommendedVehicle(guests);
  const overCapacity = isOverCapacity(vehiclePreference, guests);

  /**
   * Seed the arrival transfer plus one leg per city change — a starting point
   * to edit, not a fixed plan. Deliberately driven by the cities rather than
   * the day count: padding to trip length just produces blank rows the visitor
   * has to delete.
   */
  const startRouteBuilder = () => {
    const length = tripLength(arrivalDate, departureDate);
    const maxLegs = Math.min(length?.days ?? MAX_LEGS, MAX_LEGS);
    const meetLabel =
      meetingPoint === "other"
        ? watch("meetingPointOther") || "Meeting point"
        : labelFor(meetingPoints, meetingPoint);

    const legs: { day: number; from: string; to: string }[] = [
      { day: 1, from: meetLabel, to: cities[0] ? `${cityLabel(cities[0])} hotel` : "" },
    ];

    for (let i = 1; i < cities.length && legs.length < maxLegs; i++) {
      legs.push({
        day: legs.length + 1,
        from: `${cityLabel(cities[i - 1])} hotel`,
        to: cityLabel(cities[i]),
      });
    }

    replace(legs);
  };

  return (
    <div className="space-y-10">
      <StepHeading n={3} title="Getting Around" subtitle="Where we meet you, and how you'd like to travel." />

      {/* §5 */}
      <div>
        <FieldLabel required>Meeting Point</FieldLabel>
        <OptionCards
          name="Meeting point"
          options={meetingPoints}
          value={meetingPoint}
          onChange={(v) => setValue("meetingPoint", v, { shouldValidate: true })}
        />
        <ErrorText message={errors.meetingPoint?.message} />

        {meetingPoint === "other" && (
          <div className="mt-4 max-w-md">
            <FieldLabel required>Where should we meet you?</FieldLabel>
            <TextInput
              {...register("meetingPointOther")}
              placeholder="e.g. Agra Cantt bus stand"
              invalid={!!errors.meetingPointOther}
            />
            <ErrorText message={errors.meetingPointOther?.message} />
          </div>
        )}
      </div>

      {/* §6 */}
      <div>
        <FieldLabel required>Transportation</FieldLabel>
        <OptionCards
          name="Transportation"
          options={transportChoices}
          value={transportChoice}
          onChange={(v) => setValue("transportChoice", v, { shouldValidate: true })}
        />
        <ErrorText message={errors.transportChoice?.message} />

        {transportChoice === "own" && (
          <div className="mt-4 max-w-xl">
            <FieldLabel required>Driver &amp; Vehicle Details</FieldLabel>
            <TextArea
              {...register("ownVehicleDetails")}
              placeholder="Driver's name and contact number, vehicle type and registration."
              invalid={!!errors.ownVehicleDetails}
            />
            <ErrorText message={errors.ownVehicleDetails?.message} />
          </div>
        )}

        {transportChoice === "arrange" && (
          <div className="mt-6">
            <FieldLabel required>Vehicle Preference</FieldLabel>
            <p className="text-sm text-gray-600 mb-3">
              For {guests} {guests === 1 ? "guest" : "guests"} we recommend a{" "}
              <strong className="text-maroon-600">{suggested.label}</strong>. Pick anything you prefer.
            </p>
            <OptionCards
              name="Vehicle preference"
              options={vehiclePreferences}
              value={vehiclePreference}
              columns={3}
              onChange={(v) => setValue("vehiclePreference", v, { shouldValidate: true })}
              renderMeta={(option) =>
                option.value === suggested.value ? (
                  <span
                    className={cn(
                      "inline-block mt-2 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                      vehiclePreference === option.value
                        ? "bg-white/20 text-white"
                        : "bg-gold-100 text-gold-700",
                    )}
                  >
                    Recommended
                  </span>
                ) : null
              }
            />
            <ErrorText message={errors.vehiclePreference?.message} />

            {overCapacity && (
              <p className="mt-3 inline-flex items-start gap-2 text-sm font-medium text-amber-700 bg-amber-50 px-4 py-2.5 rounded-xl">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                That vehicle seats fewer than {guests} guests. We can still arrange it — we may
                suggest a second car or a larger vehicle when we confirm.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Optional route builder */}
      <div className="p-5 md:p-6 rounded-2xl border-2 border-dashed border-gray-200 bg-white">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-1">
          <div className="flex items-start gap-3">
            <Route className="w-5 h-5 text-maroon-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-gray-900">Day-by-day pickups &amp; drops</p>
              <p className="text-xs text-gray-500 mt-0.5 max-w-xl">
                Optional. If you already know your movements — airport to Delhi hotel, then Agra
                monuments and back — map them out and we&apos;ll cost the exact route. Skip it and
                we&apos;ll propose one.
              </p>
            </div>
          </div>
          {fields.length === 0 && (
            <button
              type="button"
              onClick={startRouteBuilder}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border-2 border-maroon-600 text-maroon-600 text-sm font-bold hover:bg-maroon-600 hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
              Plan my route
            </button>
          )}
        </div>

        {fields.length > 0 && (
          <div className="mt-5 space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col sm:flex-row sm:items-end gap-3">
                <div className="sm:w-20 shrink-0">
                  <label className="block text-[11px] font-black uppercase tracking-widest text-gray-500 mb-2">
                    Day
                  </label>
                  <TextInput
                    type="number"
                    min={1}
                    {...register(`routeLegs.${index}.day`, { valueAsNumber: true })}
                    className="text-center"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-black uppercase tracking-widest text-gray-500 mb-2">
                    Pick up from
                  </label>
                  <TextInput {...register(`routeLegs.${index}.from`)} placeholder="e.g. Delhi airport" />
                </div>
                <ArrowRight className="hidden sm:block w-5 h-5 text-gray-300 shrink-0 mb-3.5" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-black uppercase tracking-widest text-gray-500 mb-2">
                    Drop at
                  </label>
                  <TextInput {...register(`routeLegs.${index}.to`)} placeholder="e.g. Hotel in Delhi" />
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label={`Remove leg ${index + 1}`}
                  className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl border-2 border-gray-200 text-gray-400 hover:border-maroon-600/40 hover:text-maroon-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {fields.length < MAX_LEGS && (
              <button
                type="button"
                onClick={() => append({ day: fields.length + 1, from: "", to: "" })}
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-bold hover:border-maroon-600/40 hover:text-maroon-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add another leg
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
