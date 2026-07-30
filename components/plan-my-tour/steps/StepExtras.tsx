"use client";

// Step 5 — §11 Special assistance, §12 Monument tickets, §13 VIP services,
// §16 Special wishes, plus the final review of everything entered.

import type { UseFormReturn } from "react-hook-form";
import type { TourEnquiry } from "@/lib/tourEnquiry";
import { enquirySections } from "@/lib/tourEnquiry";
import {
  specialAssistanceOptions,
  ticketStatuses,
  vipServiceOptions,
} from "@/data/tourEnquiryOptions";
import {
  StepHeading,
  FieldLabel,
  ErrorText,
  TextInput,
  TextArea,
  OptionCards,
  ChipGroup,
} from "@/components/plan-my-tour/fields";

export default function StepExtras({ form }: { form: UseFormReturn<TourEnquiry> }) {
  const { register, setValue, watch, formState } = form;
  const errors = formState.errors;

  const specialAssistance = watch("specialAssistance");
  const ticketStatus = watch("ticketStatus");
  const vipServices = watch("vipServices");

  const toggle = (field: "specialAssistance" | "vipServices", value: string) => {
    const current = field === "specialAssistance" ? specialAssistance : vipServices;
    setValue(
      field,
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
      { shouldValidate: true },
    );
  };

  // Safe to format: this step is only reachable once the earlier steps validated.
  const review = enquirySections(watch());

  return (
    <div className="space-y-10">
      <StepHeading n={5} title="Extras & Review" subtitle="Anything else we should arrange before you go." />

      {/* §11 */}
      <div>
        <FieldLabel>Special Assistance</FieldLabel>
        <ChipGroup
          name="Special assistance"
          options={specialAssistanceOptions}
          values={specialAssistance}
          onToggle={(v) => toggle("specialAssistance", v)}
        />
        {specialAssistance.includes("other") && (
          <div className="mt-4 max-w-xl">
            <FieldLabel required>What assistance do you need?</FieldLabel>
            <TextInput
              {...register("specialAssistanceOther")}
              placeholder="Tell us what would help"
              invalid={!!errors.specialAssistanceOther}
            />
            <ErrorText message={errors.specialAssistanceOther?.message} />
          </div>
        )}
      </div>

      {/* §12 */}
      <div>
        <FieldLabel required>Monument Tickets</FieldLabel>
        <OptionCards
          name="Monument tickets"
          options={ticketStatuses}
          value={ticketStatus}
          onChange={(v) => setValue("ticketStatus", v, { shouldValidate: true })}
        />
        <ErrorText message={errors.ticketStatus?.message} />
      </div>

      {/* §13 */}
      <div>
        <FieldLabel>VIP Services</FieldLabel>
        <ChipGroup
          name="VIP services"
          options={vipServiceOptions}
          values={vipServices}
          onToggle={(v) => toggle("vipServices", v)}
        />
      </div>

      {/* §16 */}
      <div>
        <FieldLabel>Any Special Wishes, Concerns, or Questions?</FieldLabel>
        <TextArea
          {...register("specialWishes")}
          placeholder="An anniversary, a dietary need, a monument you've dreamed of, a worry about the heat — anything at all."
          invalid={!!errors.specialWishes}
        />
        <ErrorText message={errors.specialWishes?.message} />
      </div>

      {/* Final review */}
      <div className="rounded-2xl border-2 border-gray-200 bg-ivory-300/40 overflow-hidden">
        <div className="px-5 md:px-6 py-4 border-b border-gray-200 bg-white">
          <h3 className="text-lg font-display font-bold text-gray-900">Review your enquiry</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Go back to any step to change something before sending.
          </p>
        </div>
        <dl className="divide-y divide-gray-200">
          {review.map((section, i) => (
            <div key={`${section.n}-${i}`} className="px-5 md:px-6 py-3 sm:flex sm:gap-6">
              <dt className="text-[11px] font-black uppercase tracking-widest text-maroon-600 sm:w-52 sm:shrink-0 sm:pt-0.5">
                {section.title}
              </dt>
              <dd className="text-sm text-gray-800 mt-1 sm:mt-0 break-words min-w-0">
                {Array.isArray(section.value)
                  ? section.value.map((line) => <div key={line}>{line}</div>)
                  : section.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
