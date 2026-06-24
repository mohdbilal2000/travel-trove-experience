"use client";

import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressRailProps {
  /** Short step labels, e.g. ["Route", "Days", "Group", "Ride"]. */
  steps: string[];
  /** Index of the current step (the summary step is `steps.length`). */
  current: number;
  /** Furthest step the visitor may jump back/forward to. */
  maxReached: number;
  onJump: (index: number) => void;
}

/**
 * Compact stepper rail. Completed steps show a check, the current step is
 * ringed, and any reached step is tappable so visitors can edit earlier choices.
 */
const ProgressRail = ({ steps, current, maxReached, onJump }: ProgressRailProps) => (
  <div className="flex items-center">
    {steps.map((label, i) => {
      const done = i < current;
      const active = i === current;
      const reachable = i <= maxReached;
      return (
        <Fragment key={label}>
          <button
            type="button"
            disabled={!reachable}
            onClick={() => onJump(i)}
            className={cn(
              "flex items-center gap-2 rounded-full transition-opacity",
              reachable ? "cursor-pointer" : "cursor-not-allowed opacity-100",
            )}
            aria-current={active ? "step" : undefined}
            aria-label={`Step ${i + 1}: ${label}`}
          >
            <span
              className={cn(
                "grid h-7 w-7 flex-shrink-0 place-items-center rounded-full text-xs font-bold tabular-nums transition-all duration-300",
                done && "bg-maroon-600 text-white",
                active && "bg-maroon-600 text-white ring-4 ring-maroon-600/15",
                !done && !active && "bg-gray-100 text-gray-400",
              )}
            >
              {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
            </span>
            <span
              className={cn(
                "hidden text-xs font-semibold sm:inline",
                active ? "text-royal-800" : done ? "text-maroon-600" : "text-gray-400",
              )}
            >
              {label}
            </span>
          </button>
          {i < steps.length - 1 && (
            <span
              className={cn(
                "mx-1.5 h-0.5 flex-1 rounded-full transition-colors duration-300",
                i < current ? "bg-maroon-600/40" : "bg-gray-200",
              )}
            />
          )}
        </Fragment>
      );
    })}
  </div>
);

export default ProgressRail;
