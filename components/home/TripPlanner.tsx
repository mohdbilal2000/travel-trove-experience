"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Minus, Plus, CalendarDays, MapPin, Car, Truck, Bus,
  Check, Sparkles, Mail, ArrowRight,
} from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  availableCities, transportOptions, dayPresets, goldenTrianglePreset,
} from "@/data/plannerOptions";
import {
  type PlannerState, buildSummaryLines, buildWhatsAppUrl, buildMailto, isGoldenTriangle,
} from "@/lib/planner";

const transportIcons = { Car, Truck, Bus } as const;

interface TripPlannerProps {
  state: PlannerState;
  onChange: (patch: Partial<PlannerState>) => void;
  onBrowseTours: () => void;
}

const StepBadge = ({ n, label, icon: Icon }: { n: number; label: string; icon: React.ElementType }) => (
  <div className="flex items-center gap-2.5 mb-3">
    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-maroon-600 text-white text-sm font-bold font-sans shadow-sm">
      {n}
    </span>
    <span className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-royal-800">
      <Icon className="w-4 h-4 text-maroon-600" />
      {label}
    </span>
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
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-maroon-600/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40"
        aria-label={`Decrease ${label}`}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="w-6 text-center text-base font-bold text-gray-900 tabular-nums" aria-live="polite">{value}</span>
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

const TripPlanner = ({ state, onChange, onBrowseTours }: TripPlannerProps) => {
  const { toast } = useToast();
  const totalTravelers = state.adults + state.children;

  const toggleCity = (city: string) => {
    const next = state.cities.includes(city)
      ? state.cities.filter((c) => c !== city)
      : [...state.cities, city];
    onChange({ cities: next });
  };

  const toggleGoldenTriangle = () => {
    onChange({ cities: isGoldenTriangle(state.cities) ? [] : [...goldenTrianglePreset] });
  };

  const isValid = state.cities.length > 0 && state.days !== null;
  const summaryLines = useMemo(() => buildSummaryLines(state), [state]);

  // Soft transport-capacity hint (no hard block).
  const selectedTransport = transportOptions.find((t) => t.value === state.transport);
  const overCapacity = !!selectedTransport && totalTravelers > selectedTransport.capacity;

  const handleWhatsApp = () => {
    window.open(buildWhatsAppUrl(state), "_blank");
    toast({ title: "Opening WhatsApp", description: "Your trip details are pre-filled — just hit send!" });
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden text-left">
      {/* Header */}
      <div className="bg-gradient-to-r from-maroon-600 to-maroon-700 px-5 sm:px-7 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-gold-500" />
          <h3 className="font-display text-xl sm:text-2xl font-semibold">Plan Your Trip</h3>
        </div>
        <span className="hidden sm:inline text-white/80 text-xs uppercase tracking-widest">Free · 2-min quote</span>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* 1. Group size */}
        <section>
          <StepBadge n={1} label="Group Size" icon={Users} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Counter label="Adults" sub="15+ years" value={state.adults} min={1} max={20}
              onChange={(v) => onChange({ adults: v })} />
            <Counter label="Children" sub="0–14 years" value={state.children} min={0} max={10}
              onChange={(v) => onChange({ children: v })} />
          </div>
        </section>

        {/* 2. Days */}
        <section>
          <StepBadge n={2} label="Duration" icon={CalendarDays} />
          <div className="flex flex-wrap gap-2">
            {dayPresets.map((d) => {
              const active = state.days === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => onChange({ days: d })}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    active
                      ? "bg-maroon-600 text-white border-maroon-600 shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:border-maroon-600/50 hover:bg-maroon-50/40"
                  }`}
                  aria-pressed={active}
                >
                  {d} Days
                </button>
              );
            })}
            {/* 10+ custom stepper */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              state.days !== null && state.days > 10
                ? "bg-maroon-50/60 border-maroon-600/50"
                : "bg-white border-gray-200"
            }`}>
              <span className="text-sm font-semibold text-gray-700">10+</span>
              <button
                type="button"
                onClick={() => onChange({ days: Math.max(11, (state.days ?? 10) + 1) })}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Add a day beyond 10"
              >
                <Plus className="w-3 h-3" />
              </button>
              {state.days !== null && state.days > 10 && (
                <>
                  <span className="text-sm font-bold text-maroon-700 tabular-nums">{state.days}</span>
                  <button
                    type="button"
                    onClick={() => onChange({ days: Math.max(11, (state.days as number) - 1) })}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                    aria-label="Remove a day"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* 3. Cities */}
        <section>
          <StepBadge n={3} label="Destinations" icon={MapPin} />
          <button
            type="button"
            onClick={toggleGoldenTriangle}
            className={`w-full mb-3 flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
              isGoldenTriangle(state.cities)
                ? "border-gold-500 bg-gradient-to-r from-gold-500/10 to-amber-50"
                : "border-dashed border-gold-500/50 bg-gold-500/5 hover:bg-gold-500/10"
            }`}
            aria-pressed={isGoldenTriangle(state.cities)}
          >
            <span className="flex items-center gap-2 text-sm font-bold text-royal-800">
              <Sparkles className="w-4 h-4 text-gold-500" />
              Golden Triangle
              <span className="font-normal text-gray-500">Delhi · Agra · Jaipur</span>
            </span>
            {isGoldenTriangle(state.cities) && <Check className="w-5 h-5 text-gold-600" />}
          </button>
          <div className="flex flex-wrap gap-2">
            {availableCities.map((city) => {
              const active = state.cities.includes(city.value);
              return (
                <button
                  key={city.value}
                  type="button"
                  onClick={() => toggleCity(city.value)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-all ${
                    active
                      ? "bg-royal-800 text-white border-royal-800 shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:border-royal-400 hover:bg-royal-50/50"
                  }`}
                  aria-pressed={active}
                >
                  {city.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. Transport */}
        <section>
          <StepBadge n={4} label="Transport" icon={Car} />
          <TooltipProvider delayDuration={150}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {transportOptions.map((t) => {
                const Icon = transportIcons[t.icon];
                const active = state.transport === t.value;
                const tooSmall = totalTravelers > t.capacity;
                const btn = (
                  <button
                    type="button"
                    onClick={() => onChange({ transport: active ? "" : t.value })}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                      active
                        ? "border-maroon-600 bg-maroon-50/50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-maroon-600/40"
                    }`}
                    aria-pressed={active}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-maroon-600" : "text-gray-500"}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{t.label}</p>
                      <p className="text-xs text-gray-500 truncate">{t.desc}</p>
                    </div>
                    {active && <Check className="w-4 h-4 text-maroon-600 ml-auto flex-shrink-0" />}
                  </button>
                );
                return tooSmall ? (
                  <Tooltip key={t.value}>
                    <TooltipTrigger asChild>{btn}</TooltipTrigger>
                    <TooltipContent>For {totalTravelers} guests a larger vehicle may suit better.</TooltipContent>
                  </Tooltip>
                ) : (
                  <div key={t.value}>{btn}</div>
                );
              })}
            </div>
          </TooltipProvider>
          {overCapacity && (
            <p className="mt-2 text-xs text-amber-700">
              Heads up: {totalTravelers} guests may need a larger vehicle — we&apos;ll confirm options.
            </p>
          )}
        </section>

        {/* Summary + "boom" CTAs */}
        <div className="border-t border-gray-100 pt-5">
          <AnimatePresence>
            {isValid && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mb-4 rounded-2xl bg-gradient-to-br from-royal-50 to-amber-50/60 border border-gold-500/20 p-4"
              >
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-maroon-600 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" /> Your Trip
                </p>
                <ul className="space-y-1">
                  {summaryLines.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-royal-800">
                      <Check className="w-4 h-4 text-jade-600 mt-0.5 flex-shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {!isValid && (
            <p className="text-center text-xs text-gray-500 mb-3">
              Pick at least one destination and a duration to get your instant quote.
            </p>
          )}

          <div className="flex flex-col gap-2.5">
            <Button
              onClick={handleWhatsApp}
              disabled={!isValid}
              className="w-full h-14 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20BA5A] hover:to-[#0fa873] text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <WhatsAppIcon className="w-5 h-5 mr-2" />
              Send on WhatsApp
            </Button>
            <div className="flex gap-2.5">
              <Button
                asChild={isValid}
                disabled={!isValid}
                variant="outline"
                className="flex-1 h-11 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl disabled:opacity-50"
              >
                {isValid ? (
                  <a href={buildMailto(state)}>
                    <Mail className="w-4 h-4 mr-2" /> Email instead
                  </a>
                ) : (
                  <span><Mail className="w-4 h-4 mr-2 inline" /> Email instead</span>
                )}
              </Button>
              <Button
                onClick={onBrowseTours}
                variant="ghost"
                className="flex-1 h-11 text-maroon-600 hover:bg-maroon-50 font-semibold rounded-xl"
              >
                Browse tours <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
