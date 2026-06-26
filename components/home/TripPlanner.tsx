"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Minus, Plus, CalendarDays, CalendarOff, MapPin, Car, Truck, Bus,
  Check, Sparkles, Mail, ArrowRight, ChevronLeft, ChevronRight, ShieldCheck,
} from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  availableCities, transportOptions, dayPresets, featuredRoutes, type FeaturedRoute,
} from "@/data/plannerOptions";
import {
  type PlannerState, buildSummaryLines, buildWhatsAppUrl, buildMailto, matchRouteName,
} from "@/lib/planner";
import OptionCard from "@/components/home/planner/OptionCard";
import ProgressRail from "@/components/home/planner/ProgressRail";

const transportIcons = { Car, Truck, Bus } as const;

const STEP_LABELS = ["Route", "Days", "Group", "Ride"];
const SUMMARY_STEP = 4;

interface TripPlannerProps {
  state: PlannerState;
  onChange: (patch: Partial<PlannerState>) => void;
  onBrowseTours: () => void;
}

const StepHeading = ({
  icon: Icon, title, sub,
}: { icon: React.ElementType; title: string; sub?: string }) => (
  <div className="mb-4">
    <h4 className="flex items-center gap-2 font-display text-xl font-semibold text-royal-800">
      <Icon className="h-5 w-5 text-maroon-600" /> {title}
    </h4>
    {sub && <p className="mt-0.5 text-sm text-gray-500">{sub}</p>}
  </div>
);

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
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:border-maroon-600/40 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40"
        aria-label={`Decrease ${label}`}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-6 text-center text-base font-bold tabular-nums text-gray-900">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:border-maroon-600/40 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40"
        aria-label={`Increase ${label}`}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  </div>
);

const slideVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 36 : -36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -36 : 36, opacity: 0 }),
};

const TripPlanner = ({ state, onChange, onBrowseTours }: TripPlannerProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [buildYourOwn, setBuildYourOwn] = useState(false);

  useEffect(() => {
    setMaxReached((m) => Math.max(m, step));
  }, [step]);

  const totalTravelers = state.adults + state.children;
  const isCustomDays = state.days !== null && state.days > 10;
  const summaryLines = useMemo(() => buildSummaryLines(state), [state]);
  const selectedRouteName = matchRouteName(state.cities);

  const selectedTransport = transportOptions.find((t) => t.value === state.transport);
  const overCapacity = !!selectedTransport && totalTravelers > selectedTransport.capacity;

  const goTo = (next: number) => {
    setDirection(next >= step ? 1 : -1);
    setStep(next);
  };
  const advanceSoon = (to: number) => {
    window.setTimeout(() => {
      setDirection(1);
      setStep(to);
    }, 230);
  };

  // Only the destination (Route) step blocks; duration is optional (flexible).
  const canAdvance = (s: number): boolean => {
    if (s === 0) return state.cities.length > 0;
    return true;
  };

  const pickRoute = (r: FeaturedRoute) => {
    onChange({ cities: [...r.cities], days: r.suggestedDays, flexibleDays: false });
    setBuildYourOwn(false);
    advanceSoon(1);
  };

  const toggleCity = (city: string) => {
    const next = state.cities.includes(city)
      ? state.cities.filter((c) => c !== city)
      : [...state.cities, city];
    onChange({ cities: next });
  };

  const pickDays = (d: number, advance = true) => {
    onChange({ days: d, flexibleDays: false });
    if (advance) advanceSoon(2);
  };

  const pickFlexibleDays = () => {
    onChange({ days: null, flexibleDays: true });
    advanceSoon(2);
  };

  const handleWhatsApp = () => {
    window.open(buildWhatsAppUrl(state), "_blank");
    toast({ title: "Opening WhatsApp", description: "Your trip details are pre-filled — just hit send!" });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <StepHeading icon={MapPin} title="Where to?" sub="Tap a popular route, or build your own." />
            <div className="grid grid-cols-2 gap-2.5">
              {featuredRoutes.map((r) => (
                <OptionCard
                  key={r.id}
                  selected={selectedRouteName === r.name}
                  onClick={() => pickRoute(r)}
                  ariaLabel={r.name}
                  className="overflow-hidden !p-0"
                >
                  <div className="relative h-[68px] w-full">
                    <Image src={r.thumbnail} alt="" fill sizes="220px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <p className="absolute inset-x-2.5 bottom-1.5 text-sm font-bold leading-tight text-white">{r.name}</p>
                  </div>
                  <div className="px-2.5 py-2">
                    <p className="text-[11px] leading-snug text-gray-500">{r.tagline}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-maroon-600">~{r.suggestedDays} days</p>
                  </div>
                </OptionCard>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setBuildYourOwn((v) => !v)}
              className="mx-auto mt-3 flex items-center gap-1.5 text-xs font-semibold text-royal-600 transition-colors hover:text-maroon-600"
            >
              <span className="h-px w-6 bg-gray-300" />
              {buildYourOwn ? "Hide cities" : "or build your own"}
              <span className="h-px w-6 bg-gray-300" />
            </button>
            <AnimatePresence initial={false}>
              {buildYourOwn && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-3">
                    {availableCities.map((city) => {
                      const active = state.cities.includes(city.value);
                      return (
                        <button
                          key={city.value}
                          type="button"
                          onClick={() => toggleCity(city.value)}
                          aria-pressed={active}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                            active
                              ? "border-royal-800 bg-royal-800 text-white shadow-sm"
                              : "border-gray-200 bg-white text-gray-700 hover:border-royal-400 hover:bg-royal-50/50"
                          }`}
                        >
                          {city.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 1:
        return (
          <div>
            <StepHeading icon={CalendarDays} title="How many days?" sub="A rough idea is fine — we'll tailor it." />
            <div className="grid grid-cols-3 gap-2.5">
              {dayPresets.map((d) => (
                <OptionCard
                  key={d}
                  selected={state.days === d}
                  onClick={() => pickDays(d)}
                  ariaLabel={`${d} days`}
                  className="grid place-items-center py-4"
                >
                  <span className="text-2xl font-bold leading-none text-royal-800">{d}</span>
                  <span className="mt-1 text-[11px] font-medium text-gray-500">days</span>
                </OptionCard>
              ))}
              <OptionCard
                selected={isCustomDays}
                onClick={() => pickDays(isCustomDays ? (state.days as number) : 11, false)}
                ariaLabel="More than 10 days"
                className="grid place-items-center py-4"
              >
                <span className="text-2xl font-bold leading-none text-royal-800">{isCustomDays ? state.days : "10+"}</span>
                <span className="mt-1 text-[11px] font-medium text-gray-500">days</span>
              </OptionCard>
            </div>
            {isCustomDays && (
              <div className="mt-3 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onChange({ days: Math.max(11, (state.days as number) - 1), flexibleDays: false })}
                  disabled={(state.days as number) <= 11}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Remove a day"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-20 text-center text-sm font-bold tabular-nums text-maroon-700">{state.days} days</span>
                <button
                  type="button"
                  onClick={() => onChange({ days: Math.min(60, (state.days as number) + 1), flexibleDays: false })}
                  disabled={(state.days as number) >= 60}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Add a day"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Flexible — for travellers who don't want to commit to a length */}
            <OptionCard
              selected={state.flexibleDays}
              onClick={pickFlexibleDays}
              ariaLabel="I'm flexible on duration"
              className="mt-2.5 flex w-full items-center gap-3 px-4 py-3"
            >
              <CalendarOff className={`h-5 w-5 flex-shrink-0 ${state.flexibleDays ? "text-maroon-600" : "text-gray-500"}`} />
              <div>
                <p className="text-sm font-semibold text-gray-800">I&apos;m flexible</p>
                <p className="text-[11px] text-gray-500">Not sure yet — suggest the ideal length</p>
              </div>
            </OptionCard>
          </div>
        );

      case 2:
        return (
          <div>
            <StepHeading icon={Users} title="Who's coming?" sub="We'll size everything to your group." />
            <div className="space-y-3">
              <Counter label="Adults" sub="15+ years" value={state.adults} min={1} max={20}
                onChange={(v) => onChange({ adults: v })} />
              <Counter label="Children" sub="0–14 years" value={state.children} min={0} max={10}
                onChange={(v) => onChange({ children: v })} />
            </div>
            <p className="mt-3 text-center text-xs text-gray-500" aria-live="polite">
              {totalTravelers} {totalTravelers === 1 ? "traveller" : "travellers"} total
            </p>
          </div>
        );

      case 3:
        return (
          <div>
            <StepHeading icon={Car} title="Your ride" sub="Optional — we'll recommend the best fit." />
            <TooltipProvider delayDuration={150}>
              <div className="grid grid-cols-2 gap-2.5">
                {transportOptions.map((t) => {
                  const Icon = transportIcons[t.icon];
                  const active = state.transport === t.value;
                  const tooSmall = totalTravelers > t.capacity;
                  const card = (
                    <OptionCard
                      selected={active}
                      onClick={() => onChange({ transport: active ? "" : t.value })}
                      ariaLabel={t.label}
                      className="p-3"
                    >
                      <Icon className={`mb-1.5 h-5 w-5 ${active ? "text-maroon-600" : "text-gray-500"}`} />
                      <p className="text-sm font-semibold text-gray-800">{t.label}</p>
                      <p className="text-[11px] text-gray-500">{t.desc}</p>
                    </OptionCard>
                  );
                  return tooSmall ? (
                    <Tooltip key={t.value}>
                      <TooltipTrigger asChild>{card}</TooltipTrigger>
                      <TooltipContent>For {totalTravelers} guests a larger vehicle may suit better.</TooltipContent>
                    </Tooltip>
                  ) : (
                    <div key={t.value}>{card}</div>
                  );
                })}
              </div>
            </TooltipProvider>
            {overCapacity && (
              <p className="mt-2 text-xs text-amber-700">
                Heads up: {totalTravelers} guests may need a larger vehicle — we&apos;ll confirm options.
              </p>
            )}
          </div>
        );

      default:
        return (
          <div>
            <StepHeading icon={Sparkles} title="Your trip" sub="Looks great — send it over for a quick, honest quote." />
            <div className="rounded-2xl border border-gold-500/20 bg-gradient-to-br from-royal-50 to-amber-50/60 p-4">
              <ul className="space-y-1.5">
                {summaryLines.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-royal-800">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-jade-600" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-3 flex items-start gap-1.5 text-xs text-gray-500">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-jade-600" />
              No fixed prices — we tailor every trip to you. Free, no-obligation quote.
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <Button
                onClick={handleWhatsApp}
                className="h-14 w-full rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-base font-bold text-white shadow-lg transition-all hover:from-[#20BA5A] hover:to-[#0fa873] hover:shadow-xl"
              >
                <WhatsAppIcon className="mr-2 h-5 w-5" />
                Send on WhatsApp
              </Button>
              <div className="flex gap-2.5">
                <Button asChild variant="outline"
                  className="h-11 flex-1 rounded-xl border-gray-300 font-semibold text-gray-700 hover:bg-gray-50">
                  <a href={buildMailto(state)}>
                    <Mail className="mr-2 h-4 w-4" /> Email
                  </a>
                </Button>
                <Button onClick={onBrowseTours} variant="ghost"
                  className="h-11 flex-1 rounded-xl font-semibold text-maroon-600 hover:bg-maroon-50">
                  Browse tours <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/95 text-left shadow-2xl ring-1 ring-black/5 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-maroon-600 to-maroon-700 px-5 py-3.5 sm:px-6">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="h-5 w-5 text-gold-500" />
          <h3 className="font-display text-xl font-semibold sm:text-2xl">Plan Your Trip</h3>
        </div>
        <span className="hidden text-[11px] uppercase tracking-widest text-white/80 sm:inline">Free · 2-min quote</span>
      </div>

      {/* Progress rail */}
      <div className="px-5 pb-1 pt-4 sm:px-6">
        <ProgressRail steps={STEP_LABELS} current={step} maxReached={maxReached} onJump={goTo} />
      </div>

      {/* Step body (height reserved to minimise layout shift) */}
      <div className="relative min-h-[300px] px-5 py-5 sm:px-6">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer nav (input steps only) */}
      {step < SUMMARY_STEP && (
        <div className="flex items-center gap-3 border-t border-gray-100 px-5 py-4 sm:px-6">
          {step > 0 ? (
            <Button
              variant="ghost"
              onClick={() => goTo(step - 1)}
              className="h-12 px-4 font-semibold text-gray-600 hover:bg-gray-100"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
          ) : (
            <span className="hidden text-xs text-gray-400 sm:block">No forms · instant WhatsApp quote</span>
          )}
          <Button
            onClick={() => canAdvance(step) && goTo(step + 1)}
            disabled={!canAdvance(step)}
            className="ml-auto h-12 flex-1 rounded-xl bg-maroon-600 font-semibold text-white transition-all hover:bg-maroon-700 disabled:opacity-50 sm:flex-none sm:min-w-[176px]"
          >
            {step === 3 ? "See my quote" : "Continue"} <ChevronRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;
