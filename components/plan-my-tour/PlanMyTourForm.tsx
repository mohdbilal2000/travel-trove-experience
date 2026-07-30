"use client";

// The /plan-my-tour wizard. One react-hook-form instance over the whole
// enquiry, five steps, and a live summary sidebar. Steps are validated one at
// a time against `stepSchemas` (see lib/tourEnquiry.ts for why that matters).

import { useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Send, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  tourEnquirySchema,
  stepSchemas,
  STEP_FIELDS,
  TOTAL_STEPS,
  emptyEnquiry,
  type TourEnquiry,
} from "@/lib/tourEnquiry";
import StepAboutYou from "@/components/plan-my-tour/steps/StepAboutYou";
import StepYourTrip from "@/components/plan-my-tour/steps/StepYourTrip";
import StepGettingAround from "@/components/plan-my-tour/steps/StepGettingAround";
import StepExperience from "@/components/plan-my-tour/steps/StepExperience";
import StepExtras from "@/components/plan-my-tour/steps/StepExtras";
import EnquirySummary from "@/components/plan-my-tour/EnquirySummary";
import EnquirySent from "@/components/plan-my-tour/EnquirySent";

const STEP_LABELS = ["About You", "Your Trip", "Getting Around", "Experience", "Extras & Send"];

export default function PlanMyTourForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<TourEnquiry | null>(null);

  const form = useForm<TourEnquiry>({
    resolver: zodResolver(tourEnquirySchema),
    defaultValues: emptyEnquiry,
    mode: "onSubmit",
  });

  const values = form.watch();
  const isLastStep = step === TOTAL_STEPS - 1;

  /** Validate just this step, surfacing each issue on the field that caused it. */
  const validateStep = (index: number): boolean => {
    STEP_FIELDS[index].forEach((field) => form.clearErrors(field as FieldPath<TourEnquiry>));

    const result = stepSchemas[index].safeParse(form.getValues());
    if (result.success) return true;

    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".") as FieldPath<TourEnquiry>;
      form.setError(path, { type: "manual", message: issue.message });
    });
    return false;
  };

  const goToStep = (next: number) => {
    setStep(next);
    // Bring the visitor back to the top of the form, not wherever they scrolled to.
    document.getElementById("plan-my-tour-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      toast({
        title: "A few details are missing",
        description: "Please check the highlighted fields before continuing.",
        variant: "destructive",
      });
      return;
    }
    goToStep(step + 1);
  };

  const handleBack = () => goToStep(Math.max(0, step - 1));

  const handleSubmit = async () => {
    // Re-check every step, in case an earlier one was edited after passing.
    for (let i = 0; i < TOTAL_STEPS; i++) {
      if (!validateStep(i)) {
        goToStep(i);
        toast({
          title: "A few details are missing",
          description: "Please check the highlighted fields before sending.",
          variant: "destructive",
        });
        return;
      }
    }

    const submitted = form.getValues();
    // Rows the visitor added but never filled in shouldn't reach the office.
    const enquiry: TourEnquiry = {
      ...submitted,
      routeLegs: submitted.routeLegs.filter((leg) => leg.from.trim() || leg.to.trim()),
    };
    setSubmitting(true);
    try {
      const response = await fetch("/api/tour-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        toast({
          title: "We couldn't send your enquiry",
          description: data?.error || "Please try again, or reach us on WhatsApp.",
          variant: "destructive",
        });
        return;
      }

      setSent(enquiry);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast({
        title: "Network error",
        description: "Please check your connection and try again, or reach us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) return <EnquirySent enquiry={sent} />;

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div id="plan-my-tour-form" className="scroll-mt-28">
      {/* Progress */}
      <div className="sticky top-14 md:top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-tight text-maroon-600 whitespace-nowrap">
              Step {step + 1}/{TOTAL_STEPS}
              <span className="hidden sm:inline"> · {STEP_LABELS[step]}</span>
            </span>
            <div className="h-1 bg-gray-100 flex-1 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-maroon-600"
              />
            </div>
            <div className="flex items-center gap-1.5" title="Your details stay private">
              <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
              <span className="hidden md:inline text-xs font-bold text-gray-500 uppercase">Secure</span>
            </div>
          </div>
        </div>
      </div>

      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              {/* Step tabs — jumping back is free; jumping forward validates. */}
              <nav aria-label="Form steps" className="flex flex-wrap gap-2 mb-8">
                {STEP_LABELS.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      if (i <= step) return goToStep(i);
                      if (validateStep(step)) goToStep(i > step + 1 ? step + 1 : i);
                    }}
                    aria-current={i === step ? "step" : undefined}
                    className={cn(
                      "px-3.5 py-2 rounded-full text-xs font-bold transition-colors border-2",
                      i === step
                        ? "border-maroon-600 bg-maroon-600 text-white"
                        : i < step
                          ? "border-maroon-600/30 bg-maroon-600/5 text-maroon-600 hover:border-maroon-600/60"
                          : "border-gray-200 bg-white text-gray-400",
                    )}
                  >
                    {i + 1}. {label}
                  </button>
                ))}
              </nav>

              <form
                // `noValidate` keeps zod as the single source of truth. Without
                // it the browser's own constraint checks (e.g. `min` on the date
                // inputs) silently swallow the submit event, so our styled
                // messages never render and the visitor is stuck with no feedback.
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  if (isLastStep) handleSubmit();
                  else handleNext();
                }}
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.15)] p-5 sm:p-8 md:p-10"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step === 0 && <StepAboutYou form={form} />}
                    {step === 1 && <StepYourTrip form={form} />}
                    {step === 2 && <StepGettingAround form={form} />}
                    {step === 3 && <StepExperience form={form} />}
                    {step === 4 && <StepExtras form={form} />}
                  </motion.div>
                </AnimatePresence>

                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-10 pt-8 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 0}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[52px] rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:border-gray-300 disabled:opacity-0 disabled:pointer-events-none transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[52px] rounded-xl bg-maroon-600 text-white font-bold text-base hover:bg-black transition-colors disabled:opacity-60 shadow-lg shadow-maroon-600/20"
                  >
                    {isLastStep ? (
                      <>
                        {submitting ? "Sending…" : "Send My Enquiry"}
                        <Send className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center sm:text-left">
                No payment is taken here. We reply with a personalised itinerary and a transparent
                quotation, with no hidden charges.
              </p>
            </div>

            <aside className="lg:col-span-4">
              <EnquirySummary values={values} />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
