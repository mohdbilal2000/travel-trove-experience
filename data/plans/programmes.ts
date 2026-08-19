import { TravelPlan, VehicleTier, MonumentTicket } from "../types/travelPlanTypes";

// ---------------------------------------------------------------------------
// The 11 real Guide India Tours programmes with published from-prices.
//
// PRICING SOURCE OF TRUTH: GIT_Rate_Card.xlsx (international selling price,
// sedan, 2 pax, English guide, foreigner tickets). Display prices are the
// exact per-person rate rounded DOWN to the nearest €5 (e.g. €47 → "from €45").
// Sedan tier totals are the exact 2-pax package total (2 × per-person rate).
// SUV / Crysta / Urbania tier totals are null until confirmed from the rate
// card — they render as "quote on WhatsApp".
// TODO: verify — fill SUV/Crysta/Urbania totals from GIT_Rate_Card.xlsx.
//
// Monument ticket prices are the published ASI/monument foreigner rates and
// are always displayed with "official rates, paid at actuals — verify current
// prices". TODO: verify current ticket prices before each deploy.
// ---------------------------------------------------------------------------

const vehicleTiers = (sedanTotalEUR: number): VehicleTier[] => [
  {
    tier: "Sedan",
    models: "Dzire, Etios",
    capacity: "1–3 travellers",
    totalEUR: sedanTotalEUR,
    basis: "total for 2 travellers",
  },
  { tier: "SUV", models: "Innova, Ertiga", capacity: "4–6 travellers", totalEUR: null },
  { tier: "Innova Crysta", models: "Crysta", capacity: "5–7 travellers", totalEUR: null },
  { tier: "Force Urbania", models: "Urbania van", capacity: "8–12 travellers", totalEUR: null },
];

const GUIDE_INCLUDED = "Government-licensed local guide — English or Hindi included";
const LANGUAGE_SUPPLEMENT =
  "Spanish, French, German, Russian or Italian-speaking guide: +₹1,000 per day (male or female guides available)";
const TICKETS_NOTE =
  "Official ASI/monument rates for foreign visitors, paid at actuals — verify current prices before travel. Children under 15 enter most ASI monuments free.";
const NOT_INCLUDED = [
  "Hotels (quoted separately to match your budget)",
  "Meals and drinks",
  "Tips (optional, at your discretion)",
];
const PRICING_BASIS =
  "Per-person from-price based on 2 travellers sharing a private sedan, international visitor tickets and an English-speaking guide. Prices are indicative for the stated group size and season; monument tickets at official rates. Final quote on WhatsApp within 2 hours.";

// Ticket line items (published foreigner rates — paid at actuals)
const TAJ_TICKET: MonumentTicket = {
  monument: "Taj Mahal",
  foreignerPrice: "₹1,100 (+₹200 optional main mausoleum)",
};
const AGRA_FORT_TICKET: MonumentTicket = { monument: "Agra Fort", foreignerPrice: "₹650" };
const FATEHPUR_TICKET: MonumentTicket = { monument: "Fatehpur Sikri", foreignerPrice: "₹610" };

export const programmes: TravelPlan[] = [
  // 1 ----------------------------------------------------------------------
  {
    id: 5001,
    slug: "agra-local-sightseeing",
    title: "Agra Local Sightseeing (Taj Mahal + Agra Fort)",
    duration: "1 Day",
    price: "From €45 per person",
    fromPriceEUR: 45,
    description:
      "Agra's two UNESCO World Heritage giants in one unhurried morning: the Taj Mahal at sunrise, when the marble glows and the crowds are thinnest, followed by the mighty red-sandstone Agra Fort with your licensed local guide.\n\nThis is our most-booked programme and the best introduction to Agra if you are staying in the city. Everything is private — your own car, your own guide, your own pace.",
    highlights: [
      "Taj Mahal at sunrise — softest light, smallest crowds",
      "Skip-the-line assistance at the ticket gate",
      "Agra Fort with the famous Taj view from Musamman Burj",
      "Licensed, government-approved local guide throughout",
      "Private AC car with hotel pickup and drop-off",
    ],
    inclusions: [
      "Private AC vehicle with professional driver",
      "Government-licensed guide (English/Hindi)",
      "Hotel or railway station pickup and drop-off in Agra",
      "All parking, fuel and driver charges",
    ],
    image: "/images/agra/pankaj-singh-3okI5js2yIc-unsplash.jpg",
    rating: 4.9,
    reviews: 0,
    popular: true,
    destinations: ["Agra"],
    itinerary: [
      {
        day: 1,
        title: "Sunrise Taj Mahal & Agra Fort",
        description:
          "Pre-dawn pickup from your Agra hotel, two guided hours inside the Taj Mahal at sunrise, breakfast break, then a full guided visit of Agra Fort. Optional marble-inlay workshop before your early-afternoon drop-off.",
        accommodation: "None (day tour)",
        meals: "None (guide recommends good local options)",
      },
    ],
    timeline: [
      {
        time: "05:45",
        title: "Hotel pickup in Agra",
        description:
          "Your guide and driver meet you in the lobby. Pickup time shifts with sunrise through the year — we confirm the exact time the evening before.",
      },
      {
        time: "06:00",
        title: "Taj Mahal at sunrise",
        description:
          "Enter as the gates open, roughly 30 minutes before sunrise. Your guide handles tickets and security lines, then walks you through the story of Shah Jahan and Mumtaz Mahal, the calligraphy, the pietra dura inlay and the classic photo spots. About 2 hours inside. Note: the Taj Mahal is closed on Fridays.",
      },
      {
        time: "08:30",
        title: "Breakfast break",
        description:
          "Return to your hotel for breakfast, or stop at a café near the Taj — whichever you prefer (meal cost not included).",
      },
      {
        time: "10:00",
        title: "Agra Fort",
        description:
          "About 90 minutes inside the walled Mughal city-palace: Diwan-i-Am, Jahangir's Palace and the Musamman Burj, where Shah Jahan spent his last years gazing at the Taj across the river.",
      },
      {
        time: "12:00",
        title: "Optional craft stop or early lunch",
        description:
          "See how Agra's marble-inlay families still work pietra dura by hand (a no-pressure visit — say no and we skip it), or head straight to a lunch spot your guide recommends.",
      },
      {
        time: "13:00",
        title: "Drop-off",
        description:
          "Back at your hotel — or at Agra Cantt railway station if you are travelling onward. Want more? Add Mehtab Bagh at sunset or Itmad-ud-Daulah (the 'Baby Taj') when you book.",
      },
    ],
    pricing: {
      basis: PRICING_BASIS,
      vehicleTiers: vehicleTiers(94),
      guideIncluded: GUIDE_INCLUDED,
      languageSupplement: LANGUAGE_SUPPLEMENT,
      tickets: [TAJ_TICKET, AGRA_FORT_TICKET],
      ticketsNote: TICKETS_NOTE,
      notIncluded: NOT_INCLUDED,
    },
    faqs: [
      {
        question: "Is the Taj Mahal open every day?",
        answer:
          "No — the Taj Mahal is closed to tourists every Friday. We schedule this tour on any other day of the week; if your dates only allow a Friday, we can rework the day around Agra Fort, Itmad-ud-Daulah and Mehtab Bagh instead.",
      },
      {
        question: "Why visit the Taj Mahal at sunrise?",
        answer:
          "Sunrise has the coolest temperatures, the softest light on the white marble and by far the smallest crowds. Gates open about 30 minutes before sunrise, so most guests are inside before the big tour buses arrive.",
      },
      {
        question: "Are monument tickets included in the price?",
        answer:
          "Tickets are listed separately and paid at actuals at official rates — currently ₹1,100 for foreign visitors at the Taj Mahal (plus ₹200 if you want to enter the main mausoleum) and ₹650 at Agra Fort. Your guide buys them for you so you never stand in a queue.",
      },
      {
        question: "Do children pay entry fees?",
        answer:
          "Children under 15 enter the Taj Mahal and Agra Fort free of charge. Please carry a passport or copy as proof of age.",
      },
      {
        question: "Can we extend this tour with more Agra sights?",
        answer:
          "Yes — the most popular add-ons are Mehtab Bagh (the sunset view of the Taj across the river), Itmad-ud-Daulah ('Baby Taj') and Akbar's Tomb at Sikandra. Tell us on WhatsApp and we will re-quote the day.",
      },
    ],
  },

  // 2 ----------------------------------------------------------------------
  {
    id: 5002,
    slug: "agra-fatehpur-sikri",
    title: "Agra + Fatehpur Sikri Day Tour",
    duration: "1 Day",
    price: "From €55 per person",
    fromPriceEUR: 55,
    description:
      "The full Mughal story in one day: sunrise at the Taj Mahal, the imperial power of Agra Fort, and then Fatehpur Sikri — Emperor Akbar's perfectly preserved red-sandstone capital, abandoned barely 14 years after it was finished.\n\nFatehpur Sikri sits 40 km west of Agra, and most day-trippers never make it there. With a private car and a licensed guide it slots naturally into an Agra day, and for many guests it ends up the surprise favourite.",
    highlights: [
      "Taj Mahal at sunrise with skip-the-line assistance",
      "Agra Fort's palaces and Taj views",
      "Fatehpur Sikri — UNESCO ghost capital of Emperor Akbar",
      "Buland Darwaza, one of the tallest gateways in the world",
      "Private AC car, licensed guide, hotel pickup included",
    ],
    inclusions: [
      "Private AC vehicle with professional driver",
      "Government-licensed guide (English/Hindi)",
      "Hotel or railway station pickup and drop-off in Agra",
      "All parking, fuel, tolls and driver charges",
    ],
    image: "/images/agra/getty-images-x83xvTdlITo-unsplash.jpg",
    rating: 4.9,
    reviews: 0,
    popular: false,
    destinations: ["Agra", "Fatehpur Sikri"],
    itinerary: [
      {
        day: 1,
        title: "Taj Mahal, Agra Fort & Fatehpur Sikri",
        description:
          "Sunrise at the Taj Mahal, guided Agra Fort visit, then a one-hour drive to Fatehpur Sikri for a two-hour tour of Akbar's abandoned capital before returning to Agra by late afternoon.",
        accommodation: "None (day tour)",
        meals: "None (lunch stop en route)",
      },
    ],
    timeline: [
      {
        time: "05:45",
        title: "Hotel pickup in Agra",
        description: "Pre-dawn start so you are at the Taj gates when they open (exact time confirmed the evening before).",
      },
      {
        time: "06:00",
        title: "Taj Mahal at sunrise",
        description:
          "Two guided hours inside at the quietest time of day. Closed on Fridays — we plan around it.",
      },
      {
        time: "08:30",
        title: "Breakfast break",
        description: "Back to your hotel or a café near the Taj (own expense).",
      },
      {
        time: "09:45",
        title: "Agra Fort",
        description: "Around 90 minutes in the red-sandstone fortress: Diwan-i-Am, Jahangir's Palace, Musamman Burj.",
      },
      {
        time: "11:30",
        title: "Drive to Fatehpur Sikri",
        description: "40 km west of Agra — about an hour on the highway, with a lunch stop on the way (own expense).",
      },
      {
        time: "13:30",
        title: "Fatehpur Sikri guided tour",
        description:
          "Two hours in Akbar's capital: the Buland Darwaza victory gate, Jama Masjid, the tomb of Sufi saint Salim Chishti, Panch Mahal and the Diwan-i-Khas debate hall. Shoes come off in the mosque complex — socks recommended.",
      },
      {
        time: "15:30",
        title: "Return drive to Agra",
        description: "Roughly one hour back.",
      },
      {
        time: "16:45",
        title: "Drop-off",
        description: "At your Agra hotel or railway station.",
      },
    ],
    pricing: {
      basis: PRICING_BASIS,
      vehicleTiers: vehicleTiers(114),
      guideIncluded: GUIDE_INCLUDED,
      languageSupplement: LANGUAGE_SUPPLEMENT,
      tickets: [TAJ_TICKET, AGRA_FORT_TICKET, FATEHPUR_TICKET],
      ticketsNote: TICKETS_NOTE,
      notIncluded: NOT_INCLUDED,
    },
    faqs: [
      {
        question: "Is Fatehpur Sikri worth adding to an Agra day?",
        answer:
          "If you have the hours, yes. It is one of the best-preserved Mughal cities anywhere — a complete 16th-century capital frozen in time. Because it is 40 km outside Agra, it needs a private car; that is exactly what this programme adds over the standard Agra day.",
      },
      {
        question: "What should I wear at Fatehpur Sikri?",
        answer:
          "Modest dress (shoulders and knees covered) is respectful throughout, and shoes must be removed inside the Jama Masjid complex. Bring socks in summer — the stone gets hot underfoot.",
      },
      {
        question: "What days does this tour run?",
        answer:
          "Any day except Friday, when the Taj Mahal is closed. Fatehpur Sikri itself is open daily, so on a Friday we can run the day as Agra Fort + Fatehpur Sikri instead.",
      },
      {
        question: "How much driving is involved?",
        answer:
          "About two hours total: roughly one hour each way between Agra and Fatehpur Sikri on a good highway, in a private air-conditioned car.",
      },
      {
        question: "Are the entry tickets included?",
        answer:
          "Tickets are itemized and paid at actuals at official rates: Taj Mahal ₹1,100 (foreigner), Agra Fort ₹650, Fatehpur Sikri ₹610. Your guide purchases them so you skip the queues.",
      },
    ],
  },

  // 3 ----------------------------------------------------------------------
  {
    id: 5003,
    slug: "agra-mathura-vrindavan-day",
    title: "Agra + Mathura Vrindavan Day Tour",
    duration: "1 Day",
    price: "From €50 per person",
    fromPriceEUR: 50,
    description:
      "Two very different Indias in one day: the imperial marble of the Taj Mahal and Agra Fort in the morning, then the living devotion of Mathura and Vrindavan — the birthplace of Lord Krishna and the temple town where he grew up — in the afternoon.\n\nWhere Agra is about monuments, Mathura and Vrindavan are about atmosphere: chanting, temple bells, and pilgrims from across India. A private car and a guide who knows both worlds make the combination effortless.",
    highlights: [
      "Taj Mahal at sunrise and Agra Fort with a licensed guide",
      "Shri Krishna Janmabhoomi — the birthplace shrine of Lord Krishna",
      "Banke Bihari Temple's electric darshan atmosphere",
      "ISKCON Vrindavan and the white-marble Prem Mandir",
      "Private AC car throughout — no shared buses",
    ],
    inclusions: [
      "Private AC vehicle with professional driver",
      "Government-licensed guide (English/Hindi)",
      "Hotel pickup and drop-off in Agra",
      "All parking, fuel, tolls and driver charges",
    ],
    image: "/images/agra/ritu-dahiya-9Ni10c7a428-unsplash.jpg",
    rating: 4.9,
    reviews: 0,
    popular: false,
    destinations: ["Agra", "Mathura", "Vrindavan"],
    itinerary: [
      {
        day: 1,
        title: "Taj Mahal, Agra Fort, Mathura & Vrindavan",
        description:
          "Sunrise Taj Mahal and Agra Fort in the morning, then a 90-minute drive to Mathura for Shri Krishna Janmabhoomi, followed by Vrindavan's great temples, returning to Agra by evening.",
        accommodation: "None (day tour)",
        meals: "None (lunch stop in Mathura)",
      },
    ],
    timeline: [
      {
        time: "05:45",
        title: "Hotel pickup in Agra",
        description: "Early start for sunrise at the Taj (exact time confirmed the evening before).",
      },
      {
        time: "06:00",
        title: "Taj Mahal at sunrise",
        description: "Two guided hours inside. Closed on Fridays — we plan the date around it.",
      },
      {
        time: "08:30",
        title: "Breakfast, then Agra Fort",
        description: "A quick breakfast break, then about 90 minutes inside Agra Fort.",
      },
      {
        time: "11:00",
        title: "Drive to Mathura",
        description: "Around 60 km north — roughly 90 minutes with a lunch stop on arrival (own expense).",
      },
      {
        time: "13:30",
        title: "Shri Krishna Janmabhoomi, Mathura",
        description:
          "The temple complex marking Krishna's birthplace. Security is airport-style: phones, cameras and bags must be left in the lockers provided.",
      },
      {
        time: "15:00",
        title: "Vrindavan temples",
        description:
          "Banke Bihari Temple's famous darshan, then ISKCON Vrindavan and — if timing allows — Prem Mandir, whose carved white marble glows at dusk.",
      },
      {
        time: "17:30",
        title: "Return drive to Agra",
        description: "About 90 minutes back.",
      },
      {
        time: "19:00",
        title: "Drop-off in Agra",
        description: "A long, full day — worth it.",
      },
    ],
    pricing: {
      basis: PRICING_BASIS,
      vehicleTiers: vehicleTiers(108),
      guideIncluded: GUIDE_INCLUDED,
      languageSupplement: LANGUAGE_SUPPLEMENT,
      tickets: [
        TAJ_TICKET,
        AGRA_FORT_TICKET,
        {
          monument: "Mathura & Vrindavan temples",
          foreignerPrice: "Free entry (small donations optional)",
        },
      ],
      ticketsNote: TICKETS_NOTE,
      notIncluded: NOT_INCLUDED,
    },
    faqs: [
      {
        question: "Can I take my phone and camera into the temples?",
        answer:
          "Not everywhere. Shri Krishna Janmabhoomi in Mathura has airport-style security — phones, cameras and large bags must be stored in the lockers at the entrance. Most Vrindavan temples allow phones but restrict photography inside sanctums; your guide will tell you at each stop.",
      },
      {
        question: "Is there a dress code for the temples?",
        answer:
          "Modest dress — shoulders and knees covered — is expected, and shoes are removed before entering every temple. Slip-on footwear makes the day much easier.",
      },
      {
        question: "How long is this day?",
        answer:
          "Around 13 hours door to door. It is the fullest single day we offer from Agra. If you would rather split it, see our separate Agra local and Agra-to-Mathura day tours.",
      },
      {
        question: "Do the temples charge entry fees?",
        answer:
          "No — Mathura and Vrindavan temples are free to enter. Donations are entirely optional. Only the Agra monuments have tickets, paid at official rates at actuals.",
      },
      {
        question: "Does this tour run on Fridays?",
        answer:
          "The Taj Mahal is closed on Fridays, so on a Friday we run the day as Agra Fort + Mathura + Vrindavan, or shift your date by a day — your choice.",
      },
    ],
  },

  // 4 ----------------------------------------------------------------------
  {
    id: 5004,
    slug: "agra-2-days",
    title: "2 Days Agra In-Depth Tour",
    duration: "2 Days",
    price: "From €80 per person",
    fromPriceEUR: 80,
    description:
      "Agra deserves more than a day trip. Over two unhurried days you see the icons at their best — the Taj Mahal at sunrise, Agra Fort without the clock ticking — plus the Agra most visitors miss: the jewel-box Itmad-ud-Daulah ('Baby Taj'), the Taj sunset view from Mehtab Bagh, Akbar's monumental tomb at Sikandra and the ghost capital of Fatehpur Sikri.\n\nStay overnight in Agra (we quote hotels separately at every budget) and let the city slow down around you after the day-trippers leave.",
    highlights: [
      "Taj Mahal at sunrise — the very best time to be inside",
      "Mehtab Bagh sunset view of the Taj across the Yamuna",
      "Itmad-ud-Daulah, the 'Baby Taj' that inspired the original",
      "Akbar's Tomb at Sikandra and Fatehpur Sikri",
      "Marble pietra dura workshop visit (optional, no pressure)",
    ],
    inclusions: [
      "Private AC vehicle for both days",
      "Government-licensed guide (English/Hindi) on both days",
      "Hotel or railway station pickup and drop-off in Agra",
      "All parking, fuel, tolls and driver charges",
    ],
    image: "/images/agra/getty-images-T4Mak2qRXSg-unsplash.jpg",
    rating: 4.9,
    reviews: 0,
    popular: false,
    destinations: ["Agra", "Fatehpur Sikri"],
    itinerary: [
      {
        day: 1,
        title: "Taj Mahal sunrise, Agra Fort, Baby Taj & Mehtab Bagh sunset",
        description:
          "Sunrise inside the Taj Mahal, breakfast, Agra Fort, an optional marble-inlay workshop, then across the river for Itmad-ud-Daulah and the sunset Taj view from Mehtab Bagh.",
        accommodation: "Your Agra hotel (quoted separately)",
        meals: "None (guide recommends local favourites)",
      },
      {
        day: 2,
        title: "Sikandra, Fatehpur Sikri & Agra's bazaars",
        description:
          "Akbar's Tomb at Sikandra in the morning light, drive out to Fatehpur Sikri for a two-hour guided visit, then back for a walk through Agra's old bazaars — petha and paratha included if you are brave — before drop-off.",
        accommodation: "None (tour ends)",
        meals: "None",
      },
    ],
    timeline: [
      {
        day: 1,
        time: "05:45",
        title: "Pickup & Taj Mahal at sunrise",
        description:
          "Meet your guide in the hotel lobby and be at the gates as they open. Two hours inside at the quietest hour. (Taj closed Fridays — the two days flex around it.)",
      },
      {
        day: 1,
        time: "08:30",
        title: "Breakfast break",
        description: "Back at your hotel or a café nearby (own expense).",
      },
      {
        day: 1,
        time: "10:00",
        title: "Agra Fort",
        description: "A full 90 minutes to take in the palaces, audience halls and river views without rushing.",
      },
      {
        day: 1,
        time: "12:00",
        title: "Lunch & optional craft stop",
        description:
          "Lunch at a local favourite (own expense), then an optional visit to a marble pietra dura workshop — the same inlay craft used on the Taj.",
      },
      {
        day: 1,
        time: "15:30",
        title: "Itmad-ud-Daulah ('Baby Taj')",
        description:
          "The exquisite 1628 tomb whose marble inlay directly inspired the Taj Mahal — and it is blissfully quiet.",
      },
      {
        day: 1,
        time: "17:15",
        title: "Sunset at Mehtab Bagh",
        description:
          "The Mughal 'Moonlight Garden' directly across the Yamuna from the Taj — the classic sunset photograph, then back to your hotel.",
      },
      {
        day: 2,
        time: "08:30",
        title: "Akbar's Tomb, Sikandra",
        description:
          "The great emperor's red-sandstone mausoleum on Agra's edge, with deer grazing its gardens in the morning.",
      },
      {
        day: 2,
        time: "10:30",
        title: "Drive to Fatehpur Sikri",
        description: "About an hour west, with a two-hour guided visit of Akbar's abandoned capital: Buland Darwaza, Panch Mahal, Salim Chishti's tomb.",
      },
      {
        day: 2,
        time: "14:00",
        title: "Lunch & old-city bazaar walk",
        description:
          "Back in Agra, lunch (own expense) and a stroll through the bazaars — try Agra's famous petha sweet — before the tour ends.",
      },
      {
        day: 2,
        time: "16:00",
        title: "Drop-off",
        description: "At your hotel or Agra Cantt station, or ask us to extend with an onward transfer to Delhi or Jaipur.",
      },
    ],
    pricing: {
      basis: PRICING_BASIS,
      vehicleTiers: vehicleTiers(162),
      guideIncluded: GUIDE_INCLUDED,
      languageSupplement: LANGUAGE_SUPPLEMENT,
      tickets: [
        TAJ_TICKET,
        AGRA_FORT_TICKET,
        { monument: "Itmad-ud-Daulah (Baby Taj)", foreignerPrice: "₹310" },
        { monument: "Mehtab Bagh", foreignerPrice: "₹300" },
        { monument: "Akbar's Tomb, Sikandra", foreignerPrice: "₹310" },
        FATEHPUR_TICKET,
      ],
      ticketsNote: TICKETS_NOTE,
      notIncluded: NOT_INCLUDED,
    },
    faqs: [
      {
        question: "Is two days in Agra really worth it?",
        answer:
          "If you care about Mughal history or photography, absolutely. Day-trippers see two monuments at rush pace; in two days you see six at leisure, including the sunset Taj view from Mehtab Bagh that most visitors never get.",
      },
      {
        question: "Is the hotel included?",
        answer:
          "No — hotels are quoted separately so you choose the budget. We work with reliable properties from clean 3-star to the Oberoi Amarvilas and will book whichever you pick alongside the tour.",
      },
      {
        question: "What if one of my days is a Friday?",
        answer:
          "No problem. The Taj Mahal is closed on Fridays, so we simply arrange the two days so the sunrise Taj visit lands on the non-Friday. Everything else in the programme is open daily.",
      },
      {
        question: "Can this tour start from Delhi instead of Agra?",
        answer:
          "Yes — see our Delhi to Agra Overnight programme, or ask us on WhatsApp to add Delhi pickup and drop-off to this itinerary and we will re-quote the transport.",
      },
      {
        question: "How much walking is involved?",
        answer:
          "Expect 3–4 km of easy walking spread across each day, mostly on paved paths. The pace is yours — this programme is deliberately unhurried, and the car is never far away.",
      },
    ],
  },

  // 5 ----------------------------------------------------------------------
  {
    id: 5005,
    slug: "delhi-local-sightseeing",
    title: "Delhi Local Sightseeing Tour",
    duration: "1 Day",
    price: "From €45 per person",
    fromPriceEUR: 45,
    description:
      "Old Delhi and New Delhi are two different centuries sharing one city — and this full-day private tour covers both. Ride a cycle-rickshaw through the lanes of Chandni Chowk, stand in the courtyard of India's greatest mosque, then swap Mughal Delhi for Lutyens' imperial boulevards, Humayun's garden tomb and the soaring Qutub Minar.\n\nWith your own car, driver and licensed guide, you cover in one day what takes most visitors three.",
    highlights: [
      "Jama Masjid and a cycle-rickshaw ride through Chandni Chowk",
      "Red Fort — the seat of Mughal power",
      "Humayun's Tomb, the garden-tomb that prefigured the Taj",
      "Qutub Minar, Delhi's 73-metre victory tower",
      "India Gate and the Presidential Palace drive-past",
    ],
    inclusions: [
      "Private AC vehicle with professional driver",
      "Government-licensed guide (English/Hindi)",
      "Hotel or airport pickup and drop-off in Delhi",
      "Cycle-rickshaw ride in Chandni Chowk",
      "All parking, fuel and driver charges",
    ],
    image: "/images/delhi/axp-photography--hwq4OHDJWI-unsplash.jpg",
    rating: 4.9,
    reviews: 0,
    popular: false,
    destinations: ["Delhi"],
    itinerary: [
      {
        day: 1,
        title: "Old & New Delhi in one day",
        description:
          "Morning in Old Delhi — Jama Masjid, Chandni Chowk rickshaw ride, Red Fort and Raj Ghat — then the afternoon across New Delhi: Humayun's Tomb, Qutub Minar, India Gate and the government quarter.",
        accommodation: "None (day tour)",
        meals: "None (legendary lunch options en route)",
      },
    ],
    timeline: [
      {
        time: "08:30",
        title: "Hotel pickup in Delhi",
        description: "Meet your guide and driver after breakfast — Delhi traffic is kindest to a mid-morning start in Old Delhi.",
      },
      {
        time: "09:15",
        title: "Jama Masjid & Chandni Chowk rickshaw ride",
        description:
          "India's largest historic mosque, then a cycle-rickshaw through the spice, silver and wedding-lane bazaars of Chandni Chowk — the most fun you can have at 8 km/h.",
      },
      {
        time: "11:00",
        title: "Red Fort",
        description:
          "The sandstone seat of the Mughal empire (closed Mondays — we swap in Raj Ghat and Agrasen ki Baoli when needed).",
      },
      {
        time: "12:45",
        title: "Raj Ghat & lunch",
        description:
          "A short, quiet stop at Mahatma Gandhi's memorial, then lunch — your guide knows where locals actually eat (own expense).",
      },
      {
        time: "14:15",
        title: "Humayun's Tomb",
        description:
          "The 1570 garden tomb that set the template the Taj Mahal perfected. Recently restored and glorious in afternoon light.",
      },
      {
        time: "15:45",
        title: "Qutub Minar",
        description: "The 73-metre victory tower and the ruins of Delhi's first sultanate city around it.",
      },
      {
        time: "17:15",
        title: "India Gate & Lutyens' Delhi drive",
        description:
          "Drive the ceremonial Kartavya Path past India Gate, Parliament and the Presidential Palace as the day cools.",
      },
      {
        time: "18:00",
        title: "Drop-off",
        description: "At your hotel or Delhi airport — this tour doubles nicely as a layover programme.",
      },
    ],
    pricing: {
      basis: PRICING_BASIS,
      vehicleTiers: vehicleTiers(96),
      guideIncluded: GUIDE_INCLUDED,
      languageSupplement: LANGUAGE_SUPPLEMENT,
      tickets: [
        { monument: "Red Fort", foreignerPrice: "₹500" },
        { monument: "Humayun's Tomb", foreignerPrice: "₹600" },
        { monument: "Qutub Minar", foreignerPrice: "₹600" },
        { monument: "Jama Masjid", foreignerPrice: "Free entry (camera fee ₹300)" },
      ],
      ticketsNote: TICKETS_NOTE,
      notIncluded: NOT_INCLUDED,
    },
    faqs: [
      {
        question: "Are all the monuments open every day?",
        answer:
          "Almost — the Red Fort is closed on Mondays. On a Monday we substitute Agrasen ki Baoli stepwell or the Lotus Temple area and you still get a full day. Everything else on the route is open daily.",
      },
      {
        question: "Can this tour work as an airport layover?",
        answer:
          "Yes — with 8+ hours between flights it works well. We pick you up and drop you back at Delhi airport, and can trim the route to fit your window. Tell us your flight times on WhatsApp.",
      },
      {
        question: "What should I wear for the mosque?",
        answer:
          "At Jama Masjid, shoulders and knees must be covered and shoes come off; robes can be borrowed at the gate if needed. Comfortable walking shoes help everywhere else.",
      },
      {
        question: "Is Delhi traffic going to eat the day?",
        answer:
          "We route the day so it doesn't: Old Delhi in the morning before it clogs, New Delhi's spread-out sights in the afternoon, and the government quarter at dusk. Your driver knows every shortcut.",
      },
      {
        question: "Can we swap in Akshardham or the Lotus Temple?",
        answer:
          "Yes. Akshardham (closed Mondays, no phones or cameras allowed inside) and the Lotus Temple are popular swaps — mention them when booking and we will rebalance the route.",
      },
    ],
  },

  // 6 ----------------------------------------------------------------------
  {
    id: 5006,
    slug: "delhi-agra-same-day",
    title: "Delhi to Agra Same Day Tour (Taj Mahal Day Trip)",
    duration: "1 Day",
    price: "From €70 per person",
    fromPriceEUR: 70,
    germanPath: "/de/delhi-agra-same-day",
    description:
      "The classic Taj Mahal day trip, done properly: an early private pickup in Delhi, the smooth Yamuna Expressway down to Agra, two guided hours inside the Taj Mahal, lunch, Agra Fort, and back in Delhi by evening.\n\nNo shared buses, no fixed seats, no waiting for strangers — your own car, driver and licensed guide, timed so you are inside the Taj before the midday crowds and heat.",
    highlights: [
      "Door-to-door private car from your Delhi hotel or airport",
      "Yamuna Expressway — Delhi to Agra in about 3.5 hours",
      "Two fully guided hours inside the Taj Mahal",
      "Agra Fort and its balcony view of the Taj",
      "Skip-the-line ticket assistance at both monuments",
    ],
    inclusions: [
      "Private AC vehicle, Delhi–Agra–Delhi",
      "Government-licensed guide in Agra (English/Hindi)",
      "Hotel or airport pickup and drop-off in Delhi",
      "All expressway tolls, parking, fuel and driver charges",
    ],
    image: "/images/agra/getty-images-WQ6WY27_uhQ-unsplash.jpg",
    rating: 4.9,
    reviews: 0,
    popular: true,
    destinations: ["Delhi", "Agra"],
    itinerary: [
      {
        day: 1,
        title: "Delhi → Taj Mahal → Agra Fort → Delhi",
        description:
          "Early pickup in Delhi, expressway drive to Agra, guided Taj Mahal and Agra Fort visits with a relaxed lunch between them, and an evening return to your Delhi hotel.",
        accommodation: "None (day tour)",
        meals: "None (lunch stop in Agra)",
      },
    ],
    timeline: [
      {
        time: "06:30",
        title: "Pickup in Delhi",
        description:
          "Your driver meets you at your hotel (or the airport). Early enough to beat Delhi's traffic out of the city — want sunrise at the Taj instead? We can start at 03:30; just ask.",
      },
      {
        time: "07:00",
        title: "Yamuna Expressway to Agra",
        description:
          "About 3.5 hours on India's smoothest highway, with a clean rest-stop for coffee midway.",
      },
      {
        time: "10:15",
        title: "Meet your guide & enter the Taj Mahal",
        description:
          "Your licensed Agra guide joins you at the gate with tickets in hand. Two hours inside: the story, the symmetry, the photo spots — and the main mausoleum if you take the optional ₹200 ticket. Closed Fridays.",
      },
      {
        time: "12:45",
        title: "Lunch in Agra",
        description: "A relaxed lunch at a recommended restaurant (own expense) — try the Mughlai classics.",
      },
      {
        time: "13:45",
        title: "Agra Fort",
        description:
          "About 90 minutes in the fortress-palace where Shah Jahan was imprisoned by his son — with the famous Taj view from Musamman Burj.",
      },
      {
        time: "15:30",
        title: "Optional stop, then return drive",
        description:
          "Time permitting: Mehtab Bagh's river-bank Taj view or a marble-inlay workshop. Then back up the expressway.",
      },
      {
        time: "19:30",
        title: "Drop-off in Delhi",
        description: "At your hotel or straight to the airport — this itinerary pairs well with a late-night flight.",
      },
    ],
    pricing: {
      basis: PRICING_BASIS,
      vehicleTiers: vehicleTiers(148),
      guideIncluded: GUIDE_INCLUDED,
      languageSupplement: LANGUAGE_SUPPLEMENT,
      tickets: [
        TAJ_TICKET,
        AGRA_FORT_TICKET,
        { monument: "Mehtab Bagh (optional)", foreignerPrice: "₹300", optional: true },
      ],
      ticketsNote: TICKETS_NOTE,
      notIncluded: NOT_INCLUDED,
    },
    faqs: [
      {
        question: "How long is the drive from Delhi to Agra?",
        answer:
          "About 3.5 hours each way on the Yamuna Expressway (roughly 230 km), in a private air-conditioned car with a rest stop midway. Door to door, the full day runs about 13 hours.",
      },
      {
        question: "Can we see the Taj Mahal at sunrise on a day trip?",
        answer:
          "Yes — we offer a sunrise departure leaving Delhi around 03:30 so you enter the Taj as the gates open. It is an early alarm but the light and the quiet are unbeatable. Ask for the sunrise option on WhatsApp.",
      },
      {
        question: "Which days does this tour run?",
        answer:
          "Every day except Friday, when the Taj Mahal is closed to visitors. If Friday is your only free day, we can run Agra Fort, Itmad-ud-Daulah and Mehtab Bagh instead — the Taj view from Mehtab Bagh is open daily.",
      },
      {
        question: "Is this by car or train?",
        answer:
          "This programme is by private car door-to-door, which most guests find easiest. Prefer the Gatimaan Express train? We can build the same day around it — message us and we will quote it.",
      },
      {
        question: "Are monument tickets included?",
        answer:
          "Tickets are itemized and paid at actuals at official rates — ₹1,100 for the Taj Mahal (foreign visitors, +₹200 optional mausoleum entry) and ₹650 for Agra Fort. Your guide buys them in advance so you skip the lines.",
      },
      {
        question: "Is the car safe and comfortable for the highway?",
        answer:
          "Yes — commercial-permit vehicles with seat belts, verified professional drivers who do this route daily, and AC throughout. We never overload: sedans take up to 3 guests, and larger groups get an SUV, Crysta or Urbania van.",
      },
    ],
  },

  // 7 ----------------------------------------------------------------------
  {
    id: 5007,
    slug: "delhi-agra-overnight",
    title: "Delhi to Agra Overnight Tour",
    duration: "2 Days",
    price: "From €105 per person",
    fromPriceEUR: 105,
    description:
      "The civilised way to do the Taj Mahal from Delhi: drive down after breakfast, spend the afternoon in Agra Fort and watch the sun set on the Taj from Mehtab Bagh — then be inside the Taj Mahal at sunrise the next morning, hours before the day-trippers arrive, and back in Delhi by mid-afternoon.\n\nOne night in Agra (hotel quoted separately, any budget) turns the world's most beautiful building from a rushed photo stop into the experience it deserves.",
    highlights: [
      "Sunrise inside the Taj Mahal — the main event, done right",
      "Sunset Taj view from Mehtab Bagh the evening before",
      "Agra Fort and Itmad-ud-Daulah with a licensed guide",
      "Private car Delhi–Agra–Delhi on the Yamuna Expressway",
      "Overnight in Agra at the hotel of your choice",
    ],
    inclusions: [
      "Private AC vehicle for both days",
      "Government-licensed guide in Agra (English/Hindi)",
      "Hotel or airport pickup and drop-off in Delhi",
      "All expressway tolls, parking, fuel and driver charges",
    ],
    image: "/images/agra/naveen-kumar-dusi-tsvjaIFFo1A-unsplash.jpg",
    rating: 4.9,
    reviews: 0,
    popular: false,
    destinations: ["Delhi", "Agra"],
    itinerary: [
      {
        day: 1,
        title: "Delhi → Agra: fort, Baby Taj & sunset at Mehtab Bagh",
        description:
          "Morning drive from Delhi, lunch in Agra, guided Agra Fort and Itmad-ud-Daulah visits, then sunset across the river from the Taj at Mehtab Bagh. Overnight in Agra.",
        accommodation: "Your Agra hotel (quoted separately)",
        meals: "None",
      },
      {
        day: 2,
        title: "Sunrise Taj Mahal → return to Delhi",
        description:
          "Inside the Taj Mahal as the gates open, back for a leisurely breakfast, optional craft or shopping stop, then the expressway back to Delhi with drop-off by mid-afternoon.",
        accommodation: "None (tour ends)",
        meals: "Hotel breakfast (per your hotel plan)",
      },
    ],
    timeline: [
      {
        day: 1,
        time: "08:00",
        title: "Pickup in Delhi",
        description: "A sensible post-breakfast start — no alarm-clock heroics needed on this version.",
      },
      {
        day: 1,
        time: "11:30",
        title: "Arrive Agra, check-in & lunch",
        description: "Check in to your hotel, freshen up and have lunch (own expense).",
      },
      {
        day: 1,
        time: "13:30",
        title: "Agra Fort",
        description: "A full guided visit of the fortress-palace, unhurried.",
      },
      {
        day: 1,
        time: "15:30",
        title: "Itmad-ud-Daulah ('Baby Taj')",
        description: "The intricate riverside tomb that inspired the Taj's inlay work — and a fraction of its crowds.",
      },
      {
        day: 1,
        time: "17:15",
        title: "Sunset at Mehtab Bagh",
        description:
          "Watch the Taj turn gold, then pink, from the Mughal garden directly across the Yamuna. Evening free — your guide can point you to Agra's best kebabs.",
      },
      {
        day: 2,
        time: "05:45",
        title: "Taj Mahal at sunrise",
        description:
          "Gates open about 30 minutes before sunrise; you are among the first inside. Two guided hours while the light is soft and the reflecting pools are still.",
      },
      {
        day: 2,
        time: "08:15",
        title: "Breakfast at your hotel",
        description: "Back for breakfast and checkout at leisure.",
      },
      {
        day: 2,
        time: "10:30",
        title: "Optional stop, then drive to Delhi",
        description:
          "A marble workshop or quick bazaar run if you like, then the expressway north.",
      },
      {
        day: 2,
        time: "15:00",
        title: "Drop-off in Delhi",
        description: "At your hotel or the airport — evening international departures work perfectly.",
      },
    ],
    pricing: {
      basis: PRICING_BASIS,
      vehicleTiers: vehicleTiers(214),
      guideIncluded: GUIDE_INCLUDED,
      languageSupplement: LANGUAGE_SUPPLEMENT,
      tickets: [
        TAJ_TICKET,
        AGRA_FORT_TICKET,
        { monument: "Itmad-ud-Daulah (Baby Taj)", foreignerPrice: "₹310" },
        { monument: "Mehtab Bagh", foreignerPrice: "₹300" },
      ],
      ticketsNote: TICKETS_NOTE,
      notIncluded: NOT_INCLUDED,
    },
    faqs: [
      {
        question: "Why overnight instead of the same-day trip?",
        answer:
          "Two reasons: sunrise and sanity. Overnighting means you are inside the Taj at dawn — the best light and smallest crowds of the day — without a 03:30 departure from Delhi, and you also get the sunset view from Mehtab Bagh. The same-day trip is great; this is better.",
      },
      {
        question: "Which hotel will I stay in?",
        answer:
          "Your choice — hotels are quoted separately so you set the budget, from clean well-run 3-stars to the Oberoi Amarvilas with its Taj-view rooms. Tell us your preference on WhatsApp and we book it alongside the tour.",
      },
      {
        question: "What about the Friday closure?",
        answer:
          "The Taj is closed on Fridays, so we simply schedule the itinerary so your sunrise visit falls on any other morning — arriving Thursday for a Saturday sunrise also works with a relaxed middle day.",
      },
      {
        question: "Can we extend to Jaipur instead of returning to Delhi?",
        answer:
          "Easily — Agra to Jaipur is about 4.5 hours via Fatehpur Sikri, turning this into a Golden Triangle. See our 3-day Golden Triangle programme or ask us to customise.",
      },
      {
        question: "How much driving is there per day?",
        answer:
          "About 3.5 hours on day one and the same on day two, all on the smooth Yamuna Expressway with rest stops. Everything inside Agra is short hops.",
      },
    ],
  },

  // 8 ----------------------------------------------------------------------
  {
    id: 5008,
    slug: "delhi-agra-mathura-same-day",
    title: "Delhi–Agra + Mathura Same Day Tour",
    duration: "1 Day",
    price: "From €80 per person",
    fromPriceEUR: 80,
    description:
      "The Taj Mahal and Krishna's birthplace in a single sweep from Delhi. Mathura and Vrindavan sit right on the Delhi–Agra corridor, so a private car turns the classic Taj day trip into something few visitors ever combine: Mughal marble in the morning, living temple devotion in the afternoon.\n\nThis is a long, rich day — around 14 hours door to door — for travellers who want maximum India per day of holiday.",
    highlights: [
      "Two guided hours inside the Taj Mahal",
      "Agra Fort's palaces and Taj views",
      "Shri Krishna Janmabhoomi temple in Mathura",
      "Vrindavan's Banke Bihari Temple and Prem Mandir",
      "Private car door-to-door from Delhi — no bus schedules",
    ],
    inclusions: [
      "Private AC vehicle, Delhi–Agra–Mathura–Delhi",
      "Government-licensed guide (English/Hindi)",
      "Hotel or airport pickup and drop-off in Delhi",
      "All expressway tolls, parking, fuel and driver charges",
    ],
    image: "/images/agra/akshat-jhingran-_YRfF6YOhx0-unsplash.jpg",
    rating: 4.9,
    reviews: 0,
    popular: false,
    destinations: ["Delhi", "Agra", "Mathura", "Vrindavan"],
    itinerary: [
      {
        day: 1,
        title: "Delhi → Taj Mahal & Agra Fort → Mathura & Vrindavan → Delhi",
        description:
          "Early expressway run to Agra for the Taj Mahal and Agra Fort, lunch, then Mathura's Krishna Janmabhoomi and Vrindavan's temples on the way back to Delhi.",
        accommodation: "None (day tour)",
        meals: "None (lunch stop in Agra)",
      },
    ],
    timeline: [
      {
        time: "06:00",
        title: "Pickup in Delhi",
        description: "An early start makes the whole day work — coffee stop on the expressway included in the plan.",
      },
      {
        time: "09:30",
        title: "Taj Mahal",
        description:
          "Meet your licensed guide and spend two hours inside the Taj while the morning is still cool. Closed Fridays — we plan the date around it.",
      },
      {
        time: "11:45",
        title: "Agra Fort",
        description: "A focused one-hour highlights visit: Diwan-i-Am, Musamman Burj and the river view of the Taj.",
      },
      {
        time: "13:00",
        title: "Lunch in Agra",
        description: "A proper sit-down lunch before the spiritual half of the day (own expense).",
      },
      {
        time: "14:15",
        title: "Drive to Mathura",
        description: "About an hour north on the highway.",
      },
      {
        time: "15:15",
        title: "Shri Krishna Janmabhoomi",
        description:
          "The shrine complex at Krishna's traditional birthplace. Phones and cameras are not permitted inside — free lockers at the gate.",
      },
      {
        time: "16:45",
        title: "Vrindavan temples",
        description:
          "Banke Bihari's charged darshan and, timing permitting, Prem Mandir as its white marble lights up at dusk.",
      },
      {
        time: "18:30",
        title: "Return drive to Delhi",
        description: "Around 2.5–3 hours back up the expressway.",
      },
      {
        time: "21:15",
        title: "Drop-off in Delhi",
        description: "A very full day — bring an appetite for it.",
      },
    ],
    pricing: {
      basis: PRICING_BASIS,
      vehicleTiers: vehicleTiers(162),
      guideIncluded: GUIDE_INCLUDED,
      languageSupplement: LANGUAGE_SUPPLEMENT,
      tickets: [
        TAJ_TICKET,
        AGRA_FORT_TICKET,
        {
          monument: "Mathura & Vrindavan temples",
          foreignerPrice: "Free entry (small donations optional)",
        },
      ],
      ticketsNote: TICKETS_NOTE,
      notIncluded: NOT_INCLUDED,
    },
    faqs: [
      {
        question: "How long is this day really?",
        answer:
          "Around 14 hours door to door, with roughly 7 hours of comfortable expressway driving split across four legs. It is our fullest one-day programme — fantastic value for time, but choose the Agra overnight if you prefer a gentler pace.",
      },
      {
        question: "Can we spend more time in Vrindavan and skip Agra Fort?",
        answer:
          "Yes — many pilgrims do exactly that. The itinerary is private and flexible; tell us your priorities on WhatsApp and we will rebalance the hours before you travel.",
      },
      {
        question: "Are phones allowed in the temples?",
        answer:
          "Not at Shri Krishna Janmabhoomi — security there is airport-style and phones, cameras and bags go into free lockers at the entrance. Most Vrindavan temples allow phones but restrict sanctum photography; your guide advises at each stop.",
      },
      {
        question: "What is the dress code?",
        answer:
          "Modest dress covering shoulders and knees works for both the mosque-adjacent Agra monuments and the temples. Shoes come off at every temple, so slip-ons save time.",
      },
      {
        question: "Does the tour run on Fridays?",
        answer:
          "The Taj Mahal is closed on Fridays. On a Friday we run the day as Agra Fort + Mathura + Vrindavan with extra temple time, or shift your date — your call.",
      },
    ],
  },

  // 9 ----------------------------------------------------------------------
  {
    id: 5009,
    slug: "golden-triangle-3-days",
    title: "3 Days Golden Triangle Tour (Delhi–Agra–Jaipur)",
    duration: "3 Days",
    price: "From €180 per person",
    fromPriceEUR: 180,
    germanPath: "/de/golden-triangle-3-days",
    description:
      "India's most famous circuit — Delhi, Agra and Jaipur — in three tightly planned, privately guided days. Old Delhi's lanes and Lutyens' boulevards, sunrise inside the Taj Mahal, Akbar's ghost capital at Fatehpur Sikri, and the pink city of Jaipur crowned by the Amber Fort.\n\nThree days is the fastest the Golden Triangle can be done well. With your own car, driver and licensed guides in each city, there is zero waiting and zero herding — just the highlights, at the right time of day.",
    highlights: [
      "Sunrise inside the Taj Mahal on day two",
      "Old Delhi rickshaw ride and Humayun's Tomb",
      "Fatehpur Sikri en route from Agra to Jaipur",
      "Amber Fort, City Palace and Hawa Mahal in Jaipur",
      "Licensed local guides in every city, private car throughout",
    ],
    inclusions: [
      "Private AC vehicle for all three days",
      "Government-licensed guides in Delhi, Agra and Jaipur",
      "Hotel/airport pickup and final drop-off (Delhi or Jaipur)",
      "All tolls, parking, fuel and driver charges",
    ],
    image: "/images/jaipur/getty-images-QRHY4d6wJAs-unsplash.jpg",
    rating: 4.9,
    reviews: 0,
    popular: true,
    destinations: ["Delhi", "Agra", "Jaipur"],
    itinerary: [
      {
        day: 1,
        title: "Delhi sightseeing, evening drive to Agra",
        description:
          "Morning and early afternoon across Old and New Delhi — Jama Masjid, Chandni Chowk rickshaw ride, Humayun's Tomb, Qutub Minar and the India Gate circuit — then the expressway to Agra for the night.",
        accommodation: "Your Agra hotel (quoted separately)",
        meals: "None",
      },
      {
        day: 2,
        title: "Sunrise Taj Mahal, Agra Fort, Fatehpur Sikri, on to Jaipur",
        description:
          "Inside the Taj Mahal at dawn, breakfast, Agra Fort, then the drive to Jaipur breaking at Fatehpur Sikri for a guided visit of Akbar's abandoned capital.",
        accommodation: "Your Jaipur hotel (quoted separately)",
        meals: "Hotel breakfast (per your hotel plan)",
      },
      {
        day: 3,
        title: "Jaipur: Amber Fort, City Palace & the pink city",
        description:
          "Amber Fort in the morning light, the Jal Mahal photo stop, City Palace and Jantar Mantar, and the Hawa Mahal façade — then drive back to Delhi or drop at Jaipur airport.",
        accommodation: "None (tour ends)",
        meals: "Hotel breakfast (per your hotel plan)",
      },
    ],
    timeline: [
      {
        day: 1,
        time: "08:30",
        title: "Delhi pickup & Old Delhi morning",
        description:
          "Jama Masjid, a cycle-rickshaw through Chandni Chowk and a Red Fort photo stop with your Delhi guide.",
      },
      {
        day: 1,
        time: "13:00",
        title: "Lunch, then New Delhi",
        description: "Humayun's Tomb and Qutub Minar, with a drive past India Gate and the Presidential Palace.",
      },
      {
        day: 1,
        time: "16:30",
        title: "Expressway to Agra",
        description: "About 3.5 hours; check in and rest — tomorrow starts before dawn.",
      },
      {
        day: 2,
        time: "05:45",
        title: "Taj Mahal at sunrise",
        description:
          "Two hours inside as the gates open, with your Agra guide. (Fridays the Taj is closed — we sequence your dates around it.)",
      },
      {
        day: 2,
        time: "08:30",
        title: "Breakfast & Agra Fort",
        description: "Back to the hotel to eat and check out, then 90 minutes in the great red fort.",
      },
      {
        day: 2,
        time: "11:30",
        title: "Fatehpur Sikri en route",
        description:
          "One hour west of Agra: Buland Darwaza, Panch Mahal and Salim Chishti's tomb, with lunch nearby.",
      },
      {
        day: 2,
        time: "14:30",
        title: "Drive to Jaipur",
        description: "About 3.5 hours across into Rajasthan; evening at leisure in the pink city.",
      },
      {
        day: 3,
        time: "08:30",
        title: "Amber Fort",
        description:
          "Jaipur's hilltop palace-fortress in the morning light — mirrored halls, ramparts and lake views.",
      },
      {
        day: 3,
        time: "11:00",
        title: "Jal Mahal & City Palace",
        description:
          "The lake-palace photo stop, then the royal City Palace and the astronomical instruments of Jantar Mantar.",
      },
      {
        day: 3,
        time: "14:30",
        title: "Hawa Mahal & bazaars",
        description:
          "The pink honeycomb façade of the Palace of Winds and, if you like, an hour in Jaipur's block-print and gem bazaars.",
      },
      {
        day: 3,
        time: "16:00",
        title: "Departure",
        description:
          "Drive back to Delhi (about 5 hours) or drop-off at Jaipur airport / your Jaipur hotel — your choice at booking.",
      },
    ],
    pricing: {
      basis: PRICING_BASIS,
      vehicleTiers: vehicleTiers(364),
      guideIncluded: GUIDE_INCLUDED,
      languageSupplement: LANGUAGE_SUPPLEMENT,
      tickets: [
        { monument: "Humayun's Tomb", foreignerPrice: "₹600" },
        { monument: "Qutub Minar", foreignerPrice: "₹600" },
        TAJ_TICKET,
        AGRA_FORT_TICKET,
        FATEHPUR_TICKET,
        { monument: "Amber Fort", foreignerPrice: "₹550" },
        { monument: "City Palace, Jaipur", foreignerPrice: "₹700" },
        { monument: "Jantar Mantar", foreignerPrice: "₹200" },
        { monument: "Hawa Mahal (façade free)", foreignerPrice: "₹200 to enter", optional: true },
      ],
      ticketsNote: TICKETS_NOTE,
      notIncluded: NOT_INCLUDED,
    },
    faqs: [
      {
        question: "Are hotels included in the from-price?",
        answer:
          "No — the from-price covers private transport, licensed guides and the logistics; hotels are quoted separately so you pick the budget, from good 3-star to palace hotels. We book them for you alongside the tour.",
      },
      {
        question: "Is three days enough for the Golden Triangle?",
        answer:
          "Three days covers every headline sight comfortably using the schedule above. If you want slower mornings, a Ranthambhore safari or more bazaar time, our 4–6 day versions and the 10-day Rajasthan Grand exist for exactly that.",
      },
      {
        question: "How much driving is involved?",
        answer:
          "Delhi–Agra about 3.5 hours, Agra–Jaipur about 4.5 hours including the Fatehpur Sikri stop, and Jaipur–Delhi about 5 hours (or skip it by flying out of Jaipur). All in a private AC car with breaks whenever you want them.",
      },
      {
        question: "What happens if my dates include a Friday?",
        answer:
          "The Taj Mahal closes on Fridays, so we sequence the three days so your Agra morning is not a Friday — usually by flipping the direction of the triangle. We check this the moment you send us dates.",
      },
      {
        question: "Can we start and end in Jaipur or Agra instead of Delhi?",
        answer:
          "Yes — the triangle runs in any direction and can start from any of the three cities or their airports. Tell us your arrival point on WhatsApp and we will re-sequence the same programme.",
      },
    ],
  },

  // 10 ---------------------------------------------------------------------
  {
    id: 5010,
    slug: "rajasthan-grand-10-days",
    title: "10 Days Delhi–Agra–Ranthambhore–Jaipur–Pushkar–Udaipur",
    duration: "10 Days",
    price: "From €465 per person",
    fromPriceEUR: 465,
    description:
      "The Golden Triangle is the overture; this is the whole opera. Ten days arcing from Delhi's imperial avenues to the Taj Mahal at dawn, then deep into Rajasthan: wild tigers at Ranthambhore, the pink city of Jaipur, the sacred lake of Pushkar, and finally Udaipur — the white marble city on Lake Pichola that many guests call the most beautiful in India.\n\nOne private car, one expert driver for the whole route, and licensed local guides in every city. The pace is humane: no day is only driving, and every drive ends somewhere worth arriving.",
    highlights: [
      "Sunrise inside the Taj Mahal",
      "Tiger safari in Ranthambhore National Park",
      "Amber Fort and Jaipur's bazaars",
      "Pushkar's holy lake and Brahma Temple",
      "Udaipur's City Palace and Lake Pichola at sunset",
      "One dedicated car and driver for all ten days",
    ],
    inclusions: [
      "Private AC vehicle with the same driver for all 10 days",
      "Government-licensed local guides in each city",
      "Hotel/airport pickup in Delhi and final drop-off in Udaipur",
      "All tolls, parking, interstate taxes, fuel and driver charges",
    ],
    image: "/images/udaipur/getty-images-Cjohb1N1Ikw-unsplash.jpg",
    rating: 4.9,
    reviews: 0,
    popular: false,
    destinations: ["Delhi", "Agra", "Ranthambore", "Jaipur", "Pushkar", "Udaipur"],
    itinerary: [
      {
        day: 1,
        title: "Arrive Delhi",
        description:
          "Airport pickup, hotel check-in and — depending on your landing time — a gentle first walk through Lutyens' Delhi or Connaught Place to shake off the flight.",
        accommodation: "Your Delhi hotel (quoted separately)",
        meals: "None",
      },
      {
        day: 2,
        title: "Delhi full day",
        description:
          "Old Delhi's Jama Masjid and Chandni Chowk rickshaw ride, Raj Ghat, then Humayun's Tomb, Qutub Minar and the India Gate circuit with your Delhi guide.",
        accommodation: "Your Delhi hotel",
        meals: "Hotel breakfast",
      },
      {
        day: 3,
        title: "Delhi → Agra: fort and sunset at Mehtab Bagh",
        description:
          "Expressway to Agra with a stop at Akbar's Tomb in Sikandra, afternoon in Agra Fort, sunset Taj view from Mehtab Bagh.",
        accommodation: "Your Agra hotel",
        meals: "Hotel breakfast",
      },
      {
        day: 4,
        title: "Sunrise Taj Mahal → Fatehpur Sikri → Ranthambhore",
        description:
          "Dawn inside the Taj Mahal, breakfast, then west via Fatehpur Sikri's ghost capital and on to Ranthambhore National Park by evening.",
        accommodation: "Your Ranthambhore lodge",
        meals: "Hotel breakfast",
      },
      {
        day: 5,
        title: "Ranthambhore safaris",
        description:
          "Morning safari in the park's dry-deciduous tiger country; afternoon second safari (optional) or Ranthambhore Fort above the lakes.",
        accommodation: "Your Ranthambhore lodge",
        meals: "Hotel breakfast",
      },
      {
        day: 6,
        title: "Ranthambhore → Jaipur",
        description:
          "A short half-day drive to Jaipur; afternoon City Palace, Jantar Mantar and an evening walk in the old pink-washed bazaars.",
        accommodation: "Your Jaipur hotel",
        meals: "Hotel breakfast",
      },
      {
        day: 7,
        title: "Jaipur full day",
        description:
          "Amber Fort in the morning light, the Jal Mahal photo stop, Hawa Mahal façade, then block-printing and gem workshops or Nahargarh's sunset ramparts.",
        accommodation: "Your Jaipur hotel",
        meals: "Hotel breakfast",
      },
      {
        day: 8,
        title: "Jaipur → Pushkar",
        description:
          "Drive to the holy lake town of Pushkar; visit the rare Brahma Temple and watch evening aarti on the ghats.",
        accommodation: "Your Pushkar hotel",
        meals: "Hotel breakfast",
      },
      {
        day: 9,
        title: "Pushkar → Udaipur",
        description:
          "The longest drive of the trip (about 5 hours) rewarded by first sight of Lake Pichola; evening free on Udaipur's ghats and rooftop restaurants.",
        accommodation: "Your Udaipur hotel",
        meals: "Hotel breakfast",
      },
      {
        day: 10,
        title: "Udaipur & departure",
        description:
          "City Palace and Jagdish Temple with your Udaipur guide, an optional Lake Pichola boat ride, then airport drop-off — Udaipur has direct flights to Delhi and Mumbai.",
        accommodation: "None (tour ends)",
        meals: "Hotel breakfast",
      },
    ],
    timeline: [
      { day: 1, time: "On arrival", title: "Delhi airport pickup", description: "Meet your driver — the same one for all ten days — and settle into your hotel." },
      { day: 2, time: "09:00", title: "Old & New Delhi", description: "Jama Masjid, Chandni Chowk by rickshaw, Humayun's Tomb, Qutub Minar, India Gate." },
      { day: 3, time: "08:00", title: "Drive to Agra", description: "Sikandra en route; afternoon Agra Fort; 17:15 sunset at Mehtab Bagh." },
      { day: 4, time: "05:45", title: "Sunrise Taj Mahal", description: "Two hours inside at dawn, then Fatehpur Sikri and on to Ranthambhore by evening." },
      { day: 5, time: "06:00", title: "Tiger safari", description: "Morning safari (afternoon safari optional) in Ranthambhore's tiger territory; permits booked as soon as you confirm." },
      { day: 6, time: "09:00", title: "To Jaipur", description: "Roughly 3.5 hours; afternoon City Palace and Jantar Mantar; evening bazaar walk." },
      { day: 7, time: "08:30", title: "Amber Fort & the pink city", description: "Amber's mirrored halls in morning light, Jal Mahal, Hawa Mahal, craft workshops or Nahargarh at sunset." },
      { day: 8, time: "10:00", title: "To Pushkar", description: "About 3 hours; Brahma Temple and evening aarti on the holy lake's ghats." },
      { day: 9, time: "09:00", title: "To Udaipur", description: "About 5 hours south; evening free by Lake Pichola." },
      { day: 10, time: "09:00", title: "Udaipur & farewell", description: "City Palace, Jagdish Temple, optional boat ride; airport drop-off whenever your flight requires." },
    ],
    pricing: {
      basis: PRICING_BASIS,
      vehicleTiers: vehicleTiers(934),
      guideIncluded: GUIDE_INCLUDED,
      languageSupplement: LANGUAGE_SUPPLEMENT,
      tickets: [
        { monument: "Humayun's Tomb", foreignerPrice: "₹600" },
        { monument: "Qutub Minar", foreignerPrice: "₹600" },
        TAJ_TICKET,
        AGRA_FORT_TICKET,
        FATEHPUR_TICKET,
        {
          monument: "Ranthambhore safari (per person, per safari)",
          foreignerPrice: "From ₹1,700 shared canter; private jeep higher — at actuals",
        },
        { monument: "Amber Fort", foreignerPrice: "₹550" },
        { monument: "City Palace, Jaipur", foreignerPrice: "₹700" },
        { monument: "Jantar Mantar", foreignerPrice: "₹200" },
        { monument: "City Palace, Udaipur", foreignerPrice: "₹400" },
      ],
      ticketsNote: TICKETS_NOTE,
      notIncluded: NOT_INCLUDED,
    },
    faqs: [
      {
        question: "Will we actually see a tiger at Ranthambhore?",
        answer:
          "No honest operator guarantees a wild tiger. Ranthambhore has among the best sighting odds in India, and doing two safaris (day 5 offers an optional second) roughly doubles your chances — many guests see one, some see three, a few see none and still love the park.",
      },
      {
        question: "How far in advance should safari permits be booked?",
        answer:
          "As early as possible — Ranthambhore permits are limited and sell out weeks ahead in peak season (October–April). We book your safari the moment your tour is confirmed, which is one more reason not to leave this trip to the last minute.",
      },
      {
        question: "Are hotels included?",
        answer:
          "Hotels are quoted separately so the trip fits your budget — the same route works with sensible 3-stars, heritage havelis or palace hotels. Tell us your comfort level and we send a hotel list with the quote.",
      },
      {
        question: "How much driving is this, really?",
        answer:
          "The longest leg is Pushkar–Udaipur at about 5 hours; most days are 3–4 hours or none at all, always in a private AC car with the same trusted driver, stopping whenever you like. No day is spent only driving.",
      },
      {
        question: "Do we fly home from Udaipur?",
        answer:
          "Most guests do — Udaipur has direct flights to Delhi and Mumbai, which beats a two-day drive back. We can also extend the route to Jodhpur and Jaisalmer instead; ask on WhatsApp.",
      },
      {
        question: "Is this trip suitable for older travellers?",
        answer:
          "Yes — the pace is deliberately humane and everything is private, so any day can be lightened. The main physical asks are Amber Fort's ramps and the safari's bumpy jeep track; tell us about mobility needs and we plan around them.",
      },
    ],
  },

  // 11 ---------------------------------------------------------------------
  {
    id: 5011,
    slug: "agra-mathura-vrindavan",
    title: "Agra to Mathura Vrindavan Tour",
    duration: "1 Day",
    price: "From €40 per person",
    fromPriceEUR: 40,
    description:
      "A day of pure Braj: from Agra straight into the heartland of Krishna devotion. Mathura, where tradition places his birth in a prison cell; and Vrindavan, the temple town of his childhood, where the chant of 'Radhe Radhe' follows you down every lane.\n\nNo monuments, no tickets, no museum fatigue — this is living India, and it pairs perfectly with an Agra monument day either side of it.",
    highlights: [
      "Shri Krishna Janmabhoomi — the birthplace shrine in Mathura",
      "Banke Bihari Temple's famous darshan",
      "ISKCON Vrindavan and the carved marble Prem Mandir",
      "Vishram Ghat on the Yamuna",
      "Private AC car from Agra with licensed guide",
    ],
    inclusions: [
      "Private AC vehicle with professional driver",
      "Government-licensed guide (English/Hindi)",
      "Hotel pickup and drop-off in Agra",
      "All parking, fuel, tolls and driver charges",
    ],
    image: "/images/agra/getty-images-geMKuY-Oqco-unsplash.jpg",
    rating: 4.9,
    reviews: 0,
    popular: false,
    destinations: ["Agra", "Mathura", "Vrindavan"],
    itinerary: [
      {
        day: 1,
        title: "Mathura & Vrindavan from Agra",
        description:
          "Morning drive from Agra to Mathura for Shri Krishna Janmabhoomi and Vishram Ghat, lunch, then Vrindavan's great temples — Banke Bihari, ISKCON and Prem Mandir — before the evening return.",
        accommodation: "None (day tour)",
        meals: "None (vegetarian thali lunch stop)",
      },
    ],
    timeline: [
      {
        time: "08:00",
        title: "Pickup in Agra",
        description: "A civilised start — Mathura is only about 90 minutes north.",
      },
      {
        time: "09:30",
        title: "Shri Krishna Janmabhoomi, Mathura",
        description:
          "The temple complex at Krishna's traditional birthplace. Phones and cameras stay in the free lockers — security is airport-style.",
      },
      {
        time: "11:00",
        title: "Vishram Ghat",
        description: "The main bathing ghat on the Yamuna where pilgrims have gathered for centuries.",
      },
      {
        time: "12:00",
        title: "Vegetarian lunch",
        description: "Braj is strictly vegetarian and does it superbly — thali time (own expense).",
      },
      {
        time: "13:15",
        title: "Banke Bihari Temple, Vrindavan",
        description:
          "The most charged darshan in Braj — the curtain opens and closes over the deity to protect devotees from the intensity of his gaze, so tradition says.",
      },
      {
        time: "14:45",
        title: "ISKCON Vrindavan",
        description: "The Krishna-Balaram temple with its constant kirtan — visitors from every continent, singing.",
      },
      {
        time: "16:00",
        title: "Prem Mandir",
        description:
          "Vrindavan's newest landmark: 54 acres of carved white marble that glows as the light fades.",
      },
      {
        time: "17:15",
        title: "Return drive to Agra",
        description: "About 90 minutes; drop-off at your hotel around 18:45.",
      },
    ],
    pricing: {
      basis: PRICING_BASIS,
      vehicleTiers: vehicleTiers(88),
      guideIncluded: GUIDE_INCLUDED,
      languageSupplement: LANGUAGE_SUPPLEMENT,
      tickets: [
        {
          monument: "Mathura & Vrindavan temples",
          foreignerPrice: "Free entry (small donations optional)",
        },
      ],
      ticketsNote: "Temples in Mathura and Vrindavan have no entry fee. Some charge a small camera fee where photography is permitted at all — your guide advises at each stop.",
      notIncluded: NOT_INCLUDED,
    },
    faqs: [
      {
        question: "Is there a dress code for Mathura and Vrindavan?",
        answer:
          "Modest dress — shoulders and knees covered — is expected everywhere, and shoes come off at every temple. Slip-on footwear and a small shoulder bag make the day far smoother.",
      },
      {
        question: "Can I take photos inside the temples?",
        answer:
          "At Shri Krishna Janmabhoomi, no — phones and cameras must be left in the free lockers at the gate. Elsewhere rules vary temple by temple; Prem Mandir's exterior is freely photographable and spectacular at dusk.",
      },
      {
        question: "Why is there no monument ticket line on this tour?",
        answer:
          "Because the temples of Braj are free to enter — this is a day of living pilgrimage sites, not ticketed monuments. Donations are entirely optional and never required.",
      },
      {
        question: "Is the food really all vegetarian?",
        answer:
          "Yes — Mathura and Vrindavan are sacred towns where meat, fish and eggs are not served. The vegetarian food is exceptional; ask your guide for the best kachori and lassi stops.",
      },
      {
        question: "Can this be combined with the Taj Mahal?",
        answer:
          "Absolutely — see our Agra + Mathura Vrindavan day tour for the one-day combination, or do this tour on its own day alongside our Agra Local Sightseeing programme for a more relaxed pace.",
      },
    ],
  },
];

/** Look up a real programme by its URL slug. */
export const getProgrammeBySlug = (slug: string): TravelPlan | undefined =>
  programmes.find((p) => p.slug === slug);
