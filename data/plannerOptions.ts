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
  { value: "Varanasi", label: "Varanasi" },
];

export const transportOptions: TransportOption[] = [
  { value: "private-ac-car", label: "Private AC Car", desc: "Sedan · up to 3 guests", icon: "Car", capacity: 3 },
  { value: "suv", label: "SUV", desc: "Innova/Crysta · up to 5", icon: "Truck", capacity: 5 },
  { value: "tempo-traveller", label: "Tempo Traveller", desc: "Van · 6–12 guests", icon: "Bus", capacity: 12 },
  { value: "luxury-coach", label: "Luxury Coach", desc: "13+ guests", icon: "Bus", capacity: 50 },
];

export const dayPresets = [3, 5, 7, 10] as const;

export const goldenTrianglePreset = ["Delhi", "Agra", "Jaipur"];

export interface FeaturedRoute {
  id: string;
  name: string;
  /** Plan-matching city values (also drives the "matching tours" grid). */
  cities: string[];
  /** One-line emotional descriptor shown on the card. */
  tagline: string;
  /** Smart-default duration applied when the route is picked. */
  suggestedDays: number;
  /** Card background image (real asset under /public/images). */
  thumbnail: string;
}

// Curated one-tap journeys — lead the planner so undecided travellers can start
// in a single tap (the tailor-made operator pattern). "Build your own" stays
// available underneath via `availableCities`.
export const featuredRoutes: FeaturedRoute[] = [
  {
    id: "golden-triangle",
    name: "Golden Triangle",
    cities: ["Delhi", "Agra", "Jaipur"],
    tagline: "India's iconic first journey",
    suggestedDays: 5,
    thumbnail: "/images/jaipur/getty-images-zlqHXvaEIiI-unsplash.jpg",
  },
  {
    id: "triangle-udaipur",
    name: "Triangle + Udaipur",
    cities: ["Delhi", "Agra", "Jaipur", "Udaipur"],
    tagline: "Add the City of Lakes",
    suggestedDays: 7,
    thumbnail: "/images/udaipur/getty-images-Cjohb1N1Ikw-unsplash.jpg",
  },
  {
    id: "triangle-ranthambore",
    name: "Triangle + Ranthambore",
    cities: ["Delhi", "Agra", "Jaipur", "Ranthambore"],
    tagline: "Tigers, forts & palaces",
    suggestedDays: 7,
    thumbnail: "/images/ranthambore/kartik-iyer-VzErgGzTkPU-unsplash.jpg",
  },
  {
    id: "triangle-varanasi",
    name: "Triangle + Varanasi",
    cities: ["Delhi", "Agra", "Jaipur", "Varanasi"],
    tagline: "The spiritual Ganges",
    suggestedDays: 8,
    thumbnail: "/images/varanasi/aditya-prakash-rJcakYQpxkw-unsplash.jpg",
  },
];

export const cityLabel = (value: string): string =>
  availableCities.find((c) => c.value === value)?.label || value;
