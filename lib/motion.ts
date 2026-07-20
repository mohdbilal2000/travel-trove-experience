/**
 * Shared framer-motion variants so section entrance animation is consistent
 * across the site (Refactoring UI: systematise, don't repeat). Global CSS
 * already disables animation under `prefers-reduced-motion`.
 */
import type { Variants } from "framer-motion";

/** Fade + rise, for a single element entering on scroll. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Parent that staggers its children in. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Child item used inside `staggerContainer`. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Standard viewport config: animate once, a little before fully in view. */
export const viewportOnce = { once: true, margin: "-80px" } as const;
