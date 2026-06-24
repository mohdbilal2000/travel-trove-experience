"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Tactile, selectable card used across the planner steps. Gives a small tap
 * "pop", a maroon selected ring, and an animated gold-on-maroon check badge —
 * the satisfying micro-interaction that makes the planner feel alive.
 * Ref-forwarding so it can act as a Radix Tooltip trigger.
 */
const OptionCard = forwardRef<HTMLButtonElement, OptionCardProps>(
  ({ selected, onClick, children, className, ariaLabel, ...rest }, ref) => (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      aria-pressed={selected}
      aria-label={ariaLabel}
      className={cn(
        "relative text-left rounded-2xl border-2 bg-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600/40 focus-visible:ring-offset-1",
        selected
          ? "border-maroon-600 shadow-md"
          : "border-gray-200 hover:border-maroon-600/40 hover:shadow-sm",
        className,
      )}
      {...rest}
    >
      {children}
      <AnimatePresence>
        {selected && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="absolute -top-2 -right-2 z-10 grid h-6 w-6 place-items-center rounded-full bg-maroon-600 text-white shadow-md ring-2 ring-white"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  ),
);

OptionCard.displayName = "OptionCard";

export default OptionCard;
