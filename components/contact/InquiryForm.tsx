"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useForm, FormProvider, useFormContext, Controller, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle, BedDouble, CalendarDays, Check, CheckCircle2, ChevronLeft, ChevronRight,
  Copy, FileText, Globe, Landmark, Languages, Loader2, Mail, MapPin, Minus, Pencil, Plus,
  RotateCcw, Sparkles, Ticket, User, Users, Wallet,
} from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  currencyOptions, experienceOptions, guideLanguages, hotelOptions, vehicleOptions,
  yesNoOptions, type Choice,
} from "@/data/inquiryOptions";
import {
  buildInquiryMailto, buildInquiryMessage, buildInquiryWhatsAppUrl, buildSummaryRows,
  inquiryDefaults, inquirySchema, nightsBetween, type InquiryValues,
} from "@/lib/inquiry";
import { isFriday } from "@/lib/planner";

const DRAFT_KEY = "git-tour-inquiry-draft-v1";

/** Clearance for the site's fixed navbar when scrolling the wizard into view. */
const NAVBAR_OFFSET = 80;

type FieldName = FieldPath<InquiryValues>;

interface Step {
  id: string;
  title: string;
  short: string;
  blurb: string;
  icon: React.ElementType;
  /** Validated before the guest may continue past this step. */
  fields: FieldName[];
}

const STEPS: Step[] = [
  {
    id: "you",
    title: "About You",
    short: "You",
    blurb: "So we know who we're planning for and how to reach you.",
    icon: User,
    fields: ["name", "email", "phone", "city", "nationality"],
  },
  {
    id: "trip",
    title: "Your Trip",
    short: "Trip",
    blurb: "Group size, dates and where your journey starts and ends.",
    icon: CalendarDays,
    fields: ["adults", "children", "startDate", "endDate", "pickup", "dropoff"],
  },
  {
    id: "stay",
    title: "Stay & Sights",
    short: "Stay",
    blurb: "Hotels, the monuments on your list, and any itinerary you already have.",
    icon: Landmark,
    fields: ["hotel", "hotelName", "places", "itinerary"],
  },
  {
    id: "services",
    title: "Experience & Services",
    short: "Services",
    blurb: "Tickets, guides and transport — pick only what you need.",
    icon: Sparkles,
    fields: [
      "experience", "tickets", "guide", "guideLanguage", "guideLanguageOther",
      "transport", "vehicle", "vehicleOther",
    ],
  },
  {
    id: "review",
    title: "Quote & Review",
    short: "Review",
    blurb: "Choose your currency, add any special requests, then send.",
    icon: CheckCircle2,
    fields: ["currency", "currencyOther", "notes"],
  },
];

/* ------------------------------------------------------------------ */
/* Shared field chrome — matches the homepage trip planner              */
/* ------------------------------------------------------------------ */

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 placeholder:font-normal placeholder:text-gray-400 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/20 outline-none transition-all";

const inputErrorClass = "border-red-400 focus:border-red-500 focus:ring-red-500/20";

const QuestionLabel = ({
  n, children, icon: Icon, optional,
}: { n: number; children: React.ReactNode; icon?: React.ElementType; optional?: boolean }) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-md bg-maroon-600/10 text-maroon-600 text-[11px] font-bold tabular-nums">
      {n}
    </span>
    <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
      {Icon && <Icon className="w-4 h-4 text-maroon-600" aria-hidden="true" />}
      {children}
    </span>
    {optional && (
      <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Optional</span>
    )}
  </div>
);

const ErrorText = ({ message }: { message?: string }) =>
  message ? (
    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
      {message}
    </p>
  ) : null;

/** Plain text/email/tel/date input wired to react-hook-form. */
const TextField = ({
  name, label, placeholder, type = "text", min, hint, autoComplete,
}: {
  name: FieldName;
  label: string;
  placeholder?: string;
  type?: string;
  min?: string;
  hint?: string;
  autoComplete?: string;
}) => {
  const { register, formState: { errors } } = useFormContext<InquiryValues>();
  const error = errors[name as keyof InquiryValues]?.message as string | undefined;
  const id = `inq-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        min={min}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`${inputClass} ${error ? inputErrorClass : ""}`}
        {...register(name)}
      />
      {hint && !error && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
      <ErrorText message={error} />
    </div>
  );
};

/** Multi-line input wired to react-hook-form. */
const TextArea = ({
  name, placeholder, rows = 4,
}: { name: FieldName; placeholder?: string; rows?: number }) => {
  const { register, formState: { errors } } = useFormContext<InquiryValues>();
  const error = errors[name as keyof InquiryValues]?.message as string | undefined;
  return (
    <div>
      <textarea
        id={`inq-${name}`}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`${inputClass} resize-none leading-relaxed ${error ? inputErrorClass : ""}`}
        {...register(name)}
      />
      <ErrorText message={error} />
    </div>
  );
};

/** +/- stepper, same interaction as the homepage planner's group-size control. */
const Counter = ({
  label, sub, value, min, max, onChange,
}: {
  label: string; sub: string; value: number; min: number; max: number; onChange: (v: number) => void;
}) => (
  <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
    <div>
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-maroon-600/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40"
        aria-label={`Decrease ${label}`}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-6 text-center text-base font-bold text-gray-900 tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-maroon-600/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40"
        aria-label={`Increase ${label}`}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

/** Card-style single-select — used where each option needs a description. */
const CardSelect = ({
  name, options, columns = 2, ariaLabel,
}: { name: FieldName; options: Choice[]; columns?: 1 | 2; ariaLabel: string }) => {
  const { control, formState: { errors } } = useFormContext<InquiryValues>();
  const error = errors[name as keyof InquiryValues]?.message as string | undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <div
            role="radiogroup"
            aria-label={ariaLabel}
            className={`grid gap-2.5 ${columns === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}
          >
            {options.map((opt) => {
              const active = field.value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => field.onChange(opt.value)}
                  className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40 ${
                    active
                      ? "border-maroon-600 bg-maroon-50/50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-maroon-600/40 hover:bg-maroon-50/20"
                  }`}
                >
                  <span
                    className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                      active ? "border-maroon-600 bg-maroon-600" : "border-gray-300"
                    }`}
                    aria-hidden="true"
                  >
                    {active && <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-gray-800">{opt.label}</span>
                    {opt.desc && <span className="block text-xs text-gray-500 mt-0.5">{opt.desc}</span>}
                  </span>
                </button>
              );
            })}
          </div>
          <ErrorText message={error} />
        </>
      )}
    />
  );
};

/** Compact pill single-select — used for languages and currencies. */
const ChipSelect = ({
  name, options, ariaLabel,
}: { name: FieldName; options: Choice[]; ariaLabel: string }) => {
  const { control, formState: { errors } } = useFormContext<InquiryValues>();
  const error = errors[name as keyof InquiryValues]?.message as string | undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap gap-2">
            {options.map((opt) => {
              const active = field.value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => field.onChange(opt.value)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40 ${
                    active
                      ? "bg-royal-800 text-white border-royal-800 shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:border-royal-400 hover:bg-royal-50/50"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          <ErrorText message={error} />
        </>
      )}
    />
  );
};

/** Required / Not Required segmented toggle. */
const YesNoToggle = ({ name, ariaLabel }: { name: FieldName; ariaLabel: string }) => {
  const { control } = useFormContext<InquiryValues>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div
          role="radiogroup"
          aria-label={ariaLabel}
          className="inline-flex w-full sm:w-auto rounded-xl border border-gray-200 bg-gray-50 p-1"
        >
          {yesNoOptions.map((opt) => {
            const active = field.value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => field.onChange(opt.value)}
                className={`flex-1 sm:flex-none sm:min-w-[8rem] px-4 py-2 rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40 ${
                  active ? "bg-white text-maroon-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    />
  );
};

/* ------------------------------------------------------------------ */
/* Steps                                                                */
/* ------------------------------------------------------------------ */

const StepYou = () => (
  <div className="space-y-5">
    <div>
      <QuestionLabel n={1} icon={User}>Full Name</QuestionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextField name="name" label="Your name" placeholder="John Doe" autoComplete="name" />
        <TextField name="email" label="Email" type="email" placeholder="john@example.com" autoComplete="email" />
      </div>
      <div className="mt-3">
        <TextField
          name="phone"
          label="Phone / WhatsApp"
          type="tel"
          placeholder="+44 7700 900000"
          autoComplete="tel"
          hint="Include your country code — this is where we send your itinerary."
        />
      </div>
    </div>

    <div>
      <QuestionLabel n={2} icon={Globe}>City of Residence &amp; Nationality</QuestionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextField name="city" label="City" placeholder="London" autoComplete="address-level2" />
        <TextField name="nationality" label="Nationality" placeholder="British" autoComplete="country-name" />
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Nationality decides your monument ticket rate, so we can quote it exactly.
      </p>
    </div>
  </div>
);

const StepTrip = () => {
  const { control, watch } = useFormContext<InquiryValues>();
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const nights = nightsBetween(startDate, endDate);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-5">
      <div>
        <QuestionLabel n={3} icon={Users}>Number of Guests</QuestionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Controller
            control={control}
            name="adults"
            render={({ field }) => (
              <Counter label="Adults" sub="15+ years" value={field.value} min={1} max={40} onChange={field.onChange} />
            )}
          />
          <Controller
            control={control}
            name="children"
            render={({ field }) => (
              <Counter label="Children" sub="Below 15 years" value={field.value} min={0} max={20} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div>
        <QuestionLabel n={4} icon={CalendarDays}>Travel Dates</QuestionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextField name="startDate" label="Start" type="date" min={today} />
          <TextField name="endDate" label="Finish" type="date" min={startDate || today} />
        </div>
        {startDate && isFriday(startDate) ? (
          <p className="mt-2 flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
            <span aria-hidden="true">⚠️</span>
            <span>
              Your start date is a <strong>Friday — the Taj Mahal is closed on Fridays</strong>. Everything else stays
              open and we&apos;ll reorder your itinerary so you never miss it.
            </span>
          </p>
        ) : nights !== null ? (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-jade-700">
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
            {nights === 0 ? "Same-day trip" : `${nights} night${nights === 1 ? "" : "s"} in India`}
          </p>
        ) : null}
      </div>

      <div>
        <QuestionLabel n={5} icon={MapPin}>Pickup &amp; Drop-off Location</QuestionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextField name="pickup" label="Pickup from" placeholder="Delhi Airport (DEL)" />
          <TextField name="dropoff" label="Drop-off at" placeholder="Same as pickup" />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Hotel, airport or railway station — leave drop-off blank if it&apos;s the same place.
        </p>
      </div>
    </div>
  );
};

const StepStay = () => {
  const { watch } = useFormContext<InquiryValues>();
  const hotel = watch("hotel");

  return (
    <div className="space-y-5">
      <div>
        <QuestionLabel n={6} icon={BedDouble}>Hotel Accommodation</QuestionLabel>
        <CardSelect name="hotel" options={hotelOptions} ariaLabel="Hotel accommodation" />
        <AnimatePresence initial={false}>
          {hotel === "booked" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div className="pt-3">
                <TextField name="hotelName" label="Hotel name" placeholder="e.g. The Oberoi Amarvilas, Agra" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <QuestionLabel n={7} icon={Landmark}>Places / Monuments You Wish to Visit</QuestionLabel>
        <TextArea
          name="places"
          rows={3}
          placeholder="Taj Mahal, Agra Fort, Fatehpur Sikri, Amber Fort, Qutub Minar…"
        />
        <p className="mt-2 text-xs text-gray-500">
          Not sure yet? Just name a city or two — we&apos;ll suggest the highlights.
        </p>
      </div>

      <div>
        <QuestionLabel n={8} icon={FileText} optional>Existing Itinerary</QuestionLabel>
        <TextArea
          name="itinerary"
          rows={3}
          placeholder="Paste your day-by-day plan here if you already have one, or leave blank and we'll build it for you."
        />
      </div>
    </div>
  );
};

const StepServices = () => {
  const { watch } = useFormContext<InquiryValues>();
  const guide = watch("guide");
  const guideLanguage = watch("guideLanguage");
  const transport = watch("transport");
  const vehicle = watch("vehicle");

  return (
    <div className="space-y-5">
      <div>
        <QuestionLabel n={9} icon={Sparkles}>Preferred Tour Experience</QuestionLabel>
        <CardSelect name="experience" options={experienceOptions} ariaLabel="Preferred tour experience" />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <QuestionLabel n={10} icon={Ticket}>Monument Entry Tickets</QuestionLabel>
          <YesNoToggle name="tickets" ariaLabel="Monument entry tickets" />
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <QuestionLabel n={11} icon={User}>Guide Service</QuestionLabel>
            <YesNoToggle name="guide" ariaLabel="Guide service" />
          </div>
          <AnimatePresence initial={false}>
            {guide === "required" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="pt-3">
                  <QuestionLabel n={12} icon={Languages}>Preferred Guide Language</QuestionLabel>
                  <ChipSelect name="guideLanguage" options={guideLanguages} ariaLabel="Preferred guide language" />
                  {guideLanguage === "Other" && (
                    <div className="mt-3">
                      <TextField name="guideLanguageOther" label="Which language?" placeholder="e.g. Portuguese" />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <QuestionLabel n={13} icon={MapPin}>Transportation</QuestionLabel>
            <YesNoToggle name="transport" ariaLabel="Transportation" />
          </div>
          <AnimatePresence initial={false}>
            {transport === "required" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="pt-3">
                  <QuestionLabel n={14} icon={MapPin}>Preferred Vehicle</QuestionLabel>
                  <CardSelect name="vehicle" options={vehicleOptions} ariaLabel="Preferred vehicle" />
                  {vehicle === "Other" && (
                    <div className="mt-3">
                      <TextField name="vehicleOther" label="Which vehicle?" placeholder="e.g. Wheelchair-accessible van" />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const StepReview = ({ onEditStep }: { onEditStep: (step: number) => void }) => {
  const { watch } = useFormContext<InquiryValues>();
  const values = watch();
  const currency = values.currency;
  const rows = useMemo(() => buildSummaryRows(values as InquiryValues), [values]);

  return (
    <div className="space-y-5">
      <div>
        <QuestionLabel n={15} icon={Wallet}>Preferred Quotation Currency</QuestionLabel>
        <ChipSelect name="currency" options={currencyOptions} ariaLabel="Preferred quotation currency" />
        {currency === "Other" && (
          <div className="mt-3">
            <TextField name="currencyOther" label="Which currency?" placeholder="e.g. AUD" />
          </div>
        )}
      </div>

      <div>
        <QuestionLabel n={16} icon={Sparkles} optional>Special Requests / Requirements</QuestionLabel>
        <TextArea
          name="notes"
          rows={3}
          placeholder="Dietary needs, mobility support, anniversary surprise, photography stops…"
        />
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-royal-50 to-amber-50/60 border border-gold-500/20 p-4">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-maroon-600 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" aria-hidden="true" /> Your Inquiry
        </p>
        <dl className="divide-y divide-royal-100">
          {rows.map((row) => (
            <div key={row.n} className="flex items-start gap-3 py-2 first:pt-0 last:pb-0">
              <dt className="w-[42%] sm:w-[38%] flex-shrink-0 text-xs font-semibold uppercase tracking-wide text-royal-600">
                {row.label}
              </dt>
              <dd className="flex-1 min-w-0 text-sm text-royal-800 break-words">{row.value || "—"}</dd>
              <button
                type="button"
                onClick={() => onEditStep(row.step)}
                className="flex-shrink-0 text-royal-400 hover:text-maroon-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40 rounded"
                aria-label={`Edit ${row.label}`}
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Wizard                                                               */
/* ------------------------------------------------------------------ */

const InquiryForm = () => {
  const { toast } = useToast();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [furthest, setFurthest] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const restored = useRef(false);

  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: inquiryDefaults,
    mode: "onTouched",
  });

  // Restore a saved draft after mount so server and client render the same markup.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) {
        form.reset({ ...inquiryDefaults, ...JSON.parse(raw) }, { keepDefaultValues: true });
        toast({ title: "Draft restored", description: "We kept the answers you started earlier." });
      }
    } catch {
      /* A corrupt or unavailable draft is not worth interrupting the guest for. */
    } finally {
      restored.current = true;
    }
    // Run once on mount; `form` and `toast` are stable for this component's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist the draft as the guest types, so a refresh never costs them the form.
  useEffect(() => {
    const subscription = form.watch((values) => {
      if (!restored.current) return;
      try {
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      } catch {
        /* Private mode or a full quota — the form still works without a draft. */
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Bring the card's header — and with it the progress rail — back under the
  // site's fixed navbar so the guest sees which step they just landed on.
  const scrollToTop = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
    if (window.scrollY <= top) return; // Already showing the whole card — don't yank the page down.
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion]);

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > step ? 1 : -1);
      setStep(next);
      setFurthest((f) => Math.max(f, next));
      scrollToTop();
    },
    [step, scrollToTop],
  );

  const handleNext = async () => {
    const valid = await form.trigger(STEPS[step].fields, { shouldFocus: true });
    if (!valid) return;
    if (step < STEPS.length - 1) goTo(step + 1);
  };

  const handleBack = () => {
    if (step > 0) goTo(step - 1);
  };

  /** Jump to an already-visited step without re-validating the current one. */
  const jumpTo = (target: number) => {
    if (target === step || target > furthest) return;
    goTo(target);
  };

  const finish = (deliver: (values: InquiryValues) => void) =>
    form.handleSubmit(
      (values) => {
        setSending(true);
        try {
          deliver(values);
          setSent(true);
          try {
            window.localStorage.removeItem(DRAFT_KEY);
          } catch {
            /* Nothing to clean up if storage is unavailable. */
          }
        } finally {
          setSending(false);
        }
      },
      () => {
        // Land the guest on the first step that still has an unanswered question.
        const firstBad = STEPS.findIndex((s) =>
          s.fields.some((f) => !!form.getFieldState(f).error),
        );
        if (firstBad >= 0 && firstBad !== step) goTo(firstBad);
        toast({
          title: "A few details are missing",
          description: "We've highlighted what still needs an answer.",
          variant: "destructive",
        });
      },
    );

  const sendWhatsApp = finish((values) => {
    window.open(buildInquiryWhatsAppUrl(values), "_blank", "noopener,noreferrer");
    toast({ title: "Opening WhatsApp", description: "Your inquiry is pre-filled — just hit send." });
  });

  const sendEmail = finish((values) => {
    window.location.href = buildInquiryMailto(values);
  });

  const copyInquiry = form.handleSubmit(async (values) => {
    try {
      await navigator.clipboard.writeText(buildInquiryMessage(values));
      toast({ title: "Copied", description: "Your full inquiry is on the clipboard." });
    } catch {
      toast({
        title: "Couldn't copy",
        description: "Your browser blocked clipboard access — use WhatsApp or email instead.",
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    form.reset(inquiryDefaults);
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* Storage may be unavailable; the in-memory reset is what matters. */
    }
    setSent(false);
    setFurthest(0);
    goTo(0);
  };

  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;
  const Current = STEPS[step];

  const slide = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: direction * 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -24 },
      };

  return (
    <div
      ref={cardRef}
      className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden text-left"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-maroon-600 to-maroon-700 px-5 sm:px-7 pt-4 pb-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white min-w-0">
            <Sparkles className="w-5 h-5 text-gold-500 flex-shrink-0" aria-hidden="true" />
            <h2 className="font-display text-lg sm:text-2xl font-semibold leading-tight">
              Tour Inquiry &amp; Quotation
            </h2>
          </div>
          <span className="text-white/80 text-[11px] sm:text-xs uppercase tracking-widest whitespace-nowrap tabular-nums flex-shrink-0">
            Step {step + 1} / {STEPS.length}
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-white/70">
          Government-approved guides &amp; travel services since 2007 · Reply within 2 hours
        </p>

        {/* Step rail */}
        <nav aria-label="Inquiry steps" className="mt-4 -mx-5 sm:-mx-7 px-5 sm:px-7 overflow-x-auto scrollbar-hide">
          <ol className="flex items-center gap-1 min-w-max pb-3">
            {STEPS.map((s, i) => {
              const done = i < step;
              const active = i === step;
              const reachable = i <= furthest;
              const Icon = s.icon;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    disabled={!reachable}
                    aria-current={active ? "step" : undefined}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/70 ${
                      active
                        ? "bg-white text-maroon-700 shadow-sm"
                        : done
                          ? "text-white/90 hover:bg-white/10"
                          : "text-white/45"
                    } ${reachable && !active ? "cursor-pointer" : ""} ${!reachable ? "cursor-not-allowed" : ""}`}
                  >
                    {done ? (
                      <Check className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
                    ) : (
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    {s.short}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Progress */}
        <div
          className="h-1 -mx-5 sm:-mx-7 bg-black/20"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-label="Inquiry progress"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-500"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-jade-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-jade-700" aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-royal-800 mb-2">Your inquiry is ready to send</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
              We opened WhatsApp (or your mail app) with all 16 answers pre-filled — just press send. Our team replies
              within 2 hours, 24/7 India Standard Time.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <Button
                type="button"
                onClick={() => setSent(false)}
                variant="outline"
                className="h-11 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl"
              >
                <ChevronLeft className="w-4 h-4 mr-1.5" /> Back to my answers
              </Button>
              <Button
                type="button"
                onClick={resetForm}
                variant="ghost"
                className="h-11 text-maroon-600 hover:bg-maroon-50 font-semibold rounded-xl"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" /> Start a new inquiry
              </Button>
            </div>
          </motion.div>
        ) : (
          <FormProvider {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isLast) sendWhatsApp();
                else handleNext();
              }}
              noValidate
            >
              <div className="mb-5">
                <h3 className="font-display text-2xl font-semibold text-royal-800">{Current.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{Current.blurb}</p>
              </div>

              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={Current.id}
                  initial={slide.initial}
                  animate={slide.animate}
                  exit={slide.exit}
                  transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
                >
                  {step === 0 && <StepYou />}
                  {step === 1 && <StepTrip />}
                  {step === 2 && <StepStay />}
                  {step === 3 && <StepServices />}
                  {step === 4 && <StepReview onEditStep={jumpTo} />}
                </motion.div>
              </AnimatePresence>

              {/* Footer actions */}
              <div className="border-t border-gray-100 mt-6 pt-5">
                {isLast ? (
                  <div className="flex flex-col gap-2.5">
                    <Button
                      type="submit"
                      disabled={sending}
                      className="w-full h-14 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20BA5A] hover:to-[#0fa873] text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                      {sending ? (
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ) : (
                        <WhatsAppIcon className="w-5 h-5 mr-2" />
                      )}
                      {sending ? "Opening WhatsApp…" : "Send Inquiry on WhatsApp"}
                    </Button>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <Button
                        type="button"
                        onClick={handleBack}
                        variant="ghost"
                        className="sm:w-auto h-11 text-gray-600 hover:bg-gray-50 font-semibold rounded-xl"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1.5" /> Back
                      </Button>
                      <Button
                        type="button"
                        onClick={sendEmail}
                        variant="outline"
                        className="flex-1 h-11 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl"
                      >
                        <Mail className="w-4 h-4 mr-2" /> Email instead
                      </Button>
                      <Button
                        type="button"
                        onClick={copyInquiry}
                        variant="outline"
                        className="flex-1 h-11 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl"
                      >
                        <Copy className="w-4 h-4 mr-2" /> Copy details
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <Button
                      type="button"
                      onClick={handleBack}
                      disabled={step === 0}
                      variant="ghost"
                      className="h-12 text-gray-600 hover:bg-gray-50 font-semibold rounded-xl disabled:opacity-0 disabled:pointer-events-none"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1.5" /> Back
                    </Button>
                    <Button
                      type="submit"
                      className="h-12 px-7 bg-maroon-600 hover:bg-maroon-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      Continue <ChevronRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                )}

                <p className="mt-4 text-center text-[11px] text-gray-400">
                  Your answers stay on this device until you send them. No spam, ever.
                </p>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
};

export default InquiryForm;
