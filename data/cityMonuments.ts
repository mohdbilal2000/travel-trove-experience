// Single source of truth for the monuments we guide in each city.
// Consumed by the /guide-booking flow and the /plan-my-tour enquiry wizard so
// both offer the same list. Keys match the `value` in `availableCities`
// (data/plannerOptions.ts); lookups are case-insensitive because the
// guide-booking page keys its own city state in lowercase.

export const cityMonuments: Record<string, string[]> = {
  Agra: [
    "Taj Mahal",
    "Agra Fort",
    "Fatehpur Sikri",
    "Itimad-ud-Daulah",
    "Mehtab Garden",
    "Akbar Tomb",
    "Taj View Point",
  ],
  Delhi: [
    "Red Fort",
    "India Gate",
    "Qutub Minar",
    "Lotus Temple",
    "Jama Masjid",
    "Humayun's Tomb",
    "Akshardham Temple",
  ],
  Jaipur: [
    "Amber Fort",
    "City Palace",
    "Hawa Mahal",
    "Jantar Mantar",
    "Nahargarh Fort",
    "Jal Mahal",
    "Albert Hall Museum",
  ],
};

/** Monuments for a city, or an empty array when we have no list for it yet. */
export const monumentsForCity = (city: string): string[] => {
  const match = Object.keys(cityMonuments).find(
    (key) => key.toLowerCase() === city.toLowerCase(),
  );
  return match ? cityMonuments[match] : [];
};

/** Cities we have a monument list for — used to decide whether to show the sub-picker. */
export const citiesWithMonuments = Object.keys(cityMonuments);
