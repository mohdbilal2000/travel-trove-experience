"use client";

// Step 1 — contact details, §1 Nationality, §2 Guests, §14 First visit.

import type { UseFormReturn } from "react-hook-form";
import type { TourEnquiry } from "@/lib/tourEnquiry";
import { nationalityTypes } from "@/data/tourEnquiryOptions";
import {
  StepHeading,
  FieldLabel,
  ErrorText,
  TextInput,
  Counter,
  OptionCards,
  YesNo,
} from "@/components/plan-my-tour/fields";

export default function StepAboutYou({ form }: { form: UseFormReturn<TourEnquiry> }) {
  const { register, setValue, watch, formState } = form;
  const errors = formState.errors;
  const nationalityType = watch("nationalityType");
  const adults = watch("adults");
  const children = watch("children");
  const firstVisit = watch("firstVisit");

  return (
    <div className="space-y-10">
      <div>
        <StepHeading n={1} title="About You" subtitle="So we know who we are planning for and how to reach you." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <FieldLabel required>Full Name</FieldLabel>
            <TextInput
              {...register("fullName")}
              placeholder="e.g. Sophie Martin"
              autoComplete="name"
              invalid={!!errors.fullName}
            />
            <ErrorText message={errors.fullName?.message} />
          </div>

          <div>
            <FieldLabel required>Email Address</FieldLabel>
            <TextInput
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              invalid={!!errors.email}
            />
            <ErrorText message={errors.email?.message} />
          </div>

          <div>
            <FieldLabel required>Phone / WhatsApp</FieldLabel>
            <TextInput
              {...register("phone")}
              type="tel"
              placeholder="+33 6 12 34 56 78"
              autoComplete="tel"
              invalid={!!errors.phone}
            />
            <ErrorText message={errors.phone?.message} />
          </div>
        </div>
      </div>

      {/* §1 */}
      <div>
        <FieldLabel required>Nationality</FieldLabel>
        <OptionCards
          name="Nationality"
          options={nationalityTypes}
          value={nationalityType}
          onChange={(v) => setValue("nationalityType", v, { shouldValidate: true })}
        />
        <ErrorText message={errors.nationalityType?.message} />

        {nationalityType === "international" && (
          <div className="mt-4 max-w-md">
            <FieldLabel required>Country</FieldLabel>
            <TextInput
              {...register("country")}
              placeholder="e.g. France"
              autoComplete="country-name"
              invalid={!!errors.country}
            />
            <ErrorText message={errors.country?.message} />
          </div>
        )}
      </div>

      {/* §2 */}
      <div>
        <FieldLabel required>Number of Guests</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          <Counter
            label="Adults"
            sub="15 years and above"
            value={adults}
            min={1}
            max={60}
            onChange={(v) => setValue("adults", v, { shouldValidate: true })}
          />
          <Counter
            label="Children"
            sub="Below 15 years"
            value={children}
            min={0}
            max={60}
            onChange={(v) => setValue("children", v, { shouldValidate: true })}
          />
        </div>
        <ErrorText message={errors.adults?.message} />
      </div>

      {/* §14 */}
      <div>
        <FieldLabel required>Is this your first visit to India?</FieldLabel>
        <YesNo
          label="First visit to India"
          value={firstVisit}
          onChange={(v) => setValue("firstVisit", v, { shouldValidate: true })}
        />
        <ErrorText message={errors.firstVisit?.message} />
      </div>
    </div>
  );
}
