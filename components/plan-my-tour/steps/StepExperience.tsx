"use client";

// Step 4 — §8 Guide language, §9 Tour style, §10 Interests, §15 Budget.

import type { UseFormReturn } from "react-hook-form";
import type { TourEnquiry } from "@/lib/tourEnquiry";
import { guideLanguages, tourStyles, interestOptions, budgetTiers } from "@/data/tourEnquiryOptions";
import { cn } from "@/lib/utils";
import {
  StepHeading,
  FieldLabel,
  ErrorText,
  TextInput,
  OptionCards,
  ChipGroup,
} from "@/components/plan-my-tour/fields";

export default function StepExperience({ form }: { form: UseFormReturn<TourEnquiry> }) {
  const { register, setValue, watch, formState } = form;
  const errors = formState.errors;

  const guideLanguage = watch("guideLanguage");
  const tourStyle = watch("tourStyle");
  const interests = watch("interests");
  const budget = watch("budget");

  const toggleInterest = (value: string) => {
    setValue(
      "interests",
      interests.includes(value) ? interests.filter((i) => i !== value) : [...interests, value],
    );
  };

  return (
    <div className="space-y-10">
      <StepHeading n={4} title="Your Experience" subtitle="The details that shape how your days actually feel." />

      {/* §8 */}
      <div>
        <FieldLabel required>Tour Guide Language</FieldLabel>
        <div role="radiogroup" aria-label="Guide language" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {guideLanguages.map((lang) => (
            <button
              key={lang.value}
              type="button"
              role="radio"
              aria-checked={guideLanguage === lang.value}
              onClick={() => setValue("guideLanguage", lang.value, { shouldValidate: true })}
              className={cn(
                "flex items-center gap-2.5 p-3.5 min-h-[56px] rounded-2xl border-2 transition-all text-left",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40",
                guideLanguage === lang.value
                  ? "border-maroon-600 bg-maroon-600 text-white shadow-lg"
                  : "border-gray-200 bg-white hover:border-maroon-600/40",
              )}
            >
              <span className="text-xl leading-none">{lang.flag}</span>
              <span className="text-sm font-bold">{lang.label}</span>
            </button>
          ))}
        </div>
        <ErrorText message={errors.guideLanguage?.message} />

        {guideLanguage === "other" && (
          <div className="mt-4 max-w-md">
            <FieldLabel required>Which language?</FieldLabel>
            <TextInput
              {...register("guideLanguageOther")}
              placeholder="e.g. Portuguese"
              invalid={!!errors.guideLanguageOther}
            />
            <ErrorText message={errors.guideLanguageOther?.message} />
          </div>
        )}
      </div>

      {/* §9 */}
      <div>
        <FieldLabel required>Tour Style</FieldLabel>
        <OptionCards
          name="Tour style"
          options={tourStyles}
          value={tourStyle}
          columns={4}
          onChange={(v) => setValue("tourStyle", v, { shouldValidate: true })}
        />
        <ErrorText message={errors.tourStyle?.message} />
      </div>

      {/* §10 */}
      <div>
        <FieldLabel>Your Interests</FieldLabel>
        <p className="text-sm text-gray-600 mb-3">
          Pick as many as you like — this is what we build the storytelling around.
        </p>
        <ChipGroup name="Interests" options={interestOptions} values={interests} onToggle={toggleInterest} />
      </div>

      {/* §15 */}
      <div>
        <FieldLabel required>Budget Preference</FieldLabel>
        <OptionCards
          name="Budget"
          options={budgetTiers}
          value={budget}
          columns={4}
          onChange={(v) => setValue("budget", v, { shouldValidate: true })}
        />
        <ErrorText message={errors.budget?.message} />
      </div>
    </div>
  );
}
