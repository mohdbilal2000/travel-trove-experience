// Shared planner option data — consumed by the hero TripPlanner and the
// "Matching tours for you" results grid so there is a single source of truth.

export interface PlannerCity {
  value: string;
  label: string;
}

export interface TransportOption {
  value: string;
  label: string;
  desc: string;
  icon: "Car" | "Truck" | "Bus";
  /** Soft capacity used only for a gentle "you may need a bigger vehicle" hint. */
  capacity: number;
}

// Available cities from plans (excluding "all" and the Golden Triangle preset,
// which is offered as a dedicated quick-pick).
export const availableCities: PlannerCity[] = [
  { value: "Delhi", label: "Delhi" },
  { value: "Agra", label: "Agra" },
  { value: "Jaipur", label: "Jaipur" },
  { value: "Bikaner", label: "Bikaner" },
  { value: "Jodhpur", label: "Jodhpur" },
  { value: "Udaipur", label: "Udaipur" },
  { value: "Jaisalmer", label: "Jaisalmer" },
  { value: "Ranthambore", label: "Ranthambore" },
  { value: "Pushkar", label: "Pushkar" },
  { value: "Ajmer", label: "Ajmer" },
  { value: "Chittorgarh", label: "Chittorgarh" },
  { value: "Mount Abu", label: "Mount Abu" },
  { value: "Mandawa", label: "Mandawa" },
];

export const transportOptions: TransportOption[] = [
  { value: "private-ac-car", label: "Private AC Car", desc: "Sedan · up to 3 guests", icon: "Car", capacity: 3 },
  { value: "suv", label: "SUV", desc: "Innova/Crysta · up to 5", icon: "Truck", capacity: 5 },
  { value: "tempo-traveller", label: "Tempo Traveller", desc: "Van · 6–12 guests", icon: "Bus", capacity: 12 },
  { value: "luxury-coach", label: "Luxury Coach", desc: "13+ guests", icon: "Bus", capacity: 50 },
];

export const dayPresets = [3, 5, 7, 10] as const;

export const goldenTrianglePreset = ["Delhi", "Agra", "Jaipur"];

export const cityLabel = (value: string): string =>
  availableCities.find((c) => c.value === value)?.label || value;
