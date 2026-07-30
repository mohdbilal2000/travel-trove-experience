"use client";

// Small presentational building blocks shared by the wizard steps. Styling
// follows the existing site language: maroon-600 accents, rounded-2xl cards,
// uppercase micro-labels, 44px minimum tap targets.

import { Minus, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EnquiryOption } from "@/data/tourEnquiryOptions";

export const StepHeading = ({
  n,
  title,
  subtitle,
}: {
  n: number;
  title: string;
  subtitle?: string;
}) => (
  <div className="flex items-start gap-4 mb-6 md:mb-8">
    <span className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-maroon-600 text-white flex items-center justify-center text-lg md:text-xl font-display font-bold shadow-lg shadow-maroon-600/20">
      {n}
    </span>
    <div>
      <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 leading-tight">{title}</h2>
      {subtitle && <p className="text-sm md:text-base text-gray-500 mt-1">{subtitle}</p>}
    </div>
  </div>
);

export const FieldLabel = ({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => (
  <span className="block text-[11px] font-black uppercase tracking-widest text-gray-500 mb-2">
    {children}
    {required && <span className="text-maroon-600 ml-1">*</span>}
  </span>
);

export const ErrorText = ({ message }: { message?: string }) =>
  message ? <p className="mt-2 text-sm font-medium text-maroon-500">{message}</p> : null;

/** Bordered text/date/email input matching the site's form styling. */
export const TextInput = ({
  className,
  invalid,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) => (
  <input
    {...props}
    aria-invalid={invalid || undefined}
    className={cn(
      "w-full px-4 py-3 min-h-[48px] bg-white border-2 rounded-xl text-base font-medium text-gray-900 outline-none transition-colors",
      "placeholder:font-normal placeholder:text-gray-400",
      "focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/20",
      invalid ? "border-maroon-400" : "border-gray-200 hover:border-gray-300",
      className,
    )}
  />
);

export const TextArea = ({
  className,
  invalid,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) => (
  <textarea
    {...props}
    aria-invalid={invalid || undefined}
    className={cn(
      "w-full px-4 py-3 bg-white border-2 rounded-xl text-base font-medium text-gray-900 outline-none transition-colors resize-y min-h-[120px]",
      "placeholder:font-normal placeholder:text-gray-400",
      "focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/20",
      invalid ? "border-maroon-400" : "border-gray-200 hover:border-gray-300",
      className,
    )}
  />
);

/** +/- counter for guest numbers — same interaction as the home TripPlanner. */
export const Counter = ({
  label,
  sub,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  sub: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) => (
  <div className="flex items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-4 py-3">
    <div>
      <p className="text-sm font-bold text-gray-800">{label}</p>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-11 h-11 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-maroon-600/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40"
        aria-label={`Decrease ${label}`}
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-7 text-center text-lg font-bold text-gray-900 tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-11 h-11 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-maroon-600/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40"
        aria-label={`Increase ${label}`}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
);

/**
 * Radio-style card group. `columns` controls the grid at sm+ — single column
 * on mobile throughout.
 */
export const OptionCards = ({
  name,
  options,
  value,
  onChange,
  columns = 2,
  renderMeta,
}: {
  name: string;
  options: (EnquiryOption & { desc?: string })[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2 | 3 | 4;
  renderMeta?: (option: EnquiryOption) => React.ReactNode;
}) => (
  <div
    role="radiogroup"
    aria-label={name}
    className={cn(
      "grid gap-3 grid-cols-1",
      columns === 2 && "sm:grid-cols-2",
      columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
      columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
    )}
  >
    {options.map((option) => {
      const selected = value === option.value;
      return (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={selected}
          onClick={() => onChange(option.value)}
          className={cn(
            "text-left p-4 rounded-2xl border-2 transition-all duration-200 min-h-[56px] flex items-start justify-between gap-3",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40",
            selected
              ? "border-maroon-600 bg-maroon-600 text-white shadow-lg"
              : "border-gray-200 bg-white hover:border-maroon-600/40 hover:shadow-sm",
          )}
        >
          <span className="min-w-0">
            <span className="block text-sm font-bold leading-tight">{option.label}</span>
            {option.desc && (
              <span className={cn("block text-xs mt-1", selected ? "text-white/70" : "text-gray-500")}>
                {option.desc}
              </span>
            )}
            {renderMeta?.(option)}
          </span>
          {selected && <Check className="w-5 h-5 shrink-0" />}
        </button>
      );
    })}
  </div>
);

/** Multi-select chips for interests, VIP services, assistance, monuments. */
export const ChipGroup = ({
  name,
  options,
  values,
  onToggle,
}: {
  name: string;
  options: EnquiryOption[];
  values: string[];
  onToggle: (value: string) => void;
}) => (
  <div role="group" aria-label={name} className="flex flex-wrap gap-2.5">
    {options.map((option) => {
      const selected = values.includes(option.value);
      return (
        <button
          key={option.value}
          type="button"
          aria-pressed={selected}
          onClick={() => onToggle(option.value)}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full border-2 text-sm font-bold transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40",
            selected
              ? "border-maroon-600 bg-maroon-600 text-white shadow-md"
              : "border-gray-200 bg-white text-gray-700 hover:border-maroon-600/40",
          )}
        >
          {selected && <Check className="w-4 h-4" />}
          {option.label}
        </button>
      );
    })}
  </div>
);

/** Yes/No pair, used for "first visit to India". */
export const YesNo = ({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: "yes" | "no") => void;
  label: string;
}) => (
  <div role="radiogroup" aria-label={label} className="flex gap-3">
    {(["yes", "no"] as const).map((option) => (
      <button
        key={option}
        type="button"
        role="radio"
        aria-checked={value === option}
        onClick={() => onChange(option)}
        className={cn(
          "px-8 py-3 min-h-[48px] rounded-xl border-2 text-sm font-bold uppercase tracking-wide transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40",
          value === option
            ? "border-maroon-600 bg-maroon-600 text-white shadow-md"
            : "border-gray-200 bg-white text-gray-600 hover:border-maroon-600/40",
        )}
      >
        {option === "yes" ? "Yes" : "No"}
      </button>
    ))}
  </div>
);
