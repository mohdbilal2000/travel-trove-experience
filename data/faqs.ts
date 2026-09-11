export interface FaqEntry {
    id: string;
    question: string;
    /** Concise, self-contained answer (2–4 sentences) — quotable by search and AI engines. */
    answer: string;
    /** Optional dedicated guide/blog page that answers the question in depth. */
    guide?: { href: string; label: string };
}

export interface FaqCategory {
    id: string;
    title: string;
    blurb: string;
    entries: FaqEntry[];
}

export const FAQ_LAST_UPDATED = "2026-09-11";

// Fact-based FAQs only. Prices, hours and refund windows either quote figures
// already published on dedicated pages or point to them — nothing invented.
export const faqCategories: FaqCategory[] = [
    {
        id: "popular-questions",
        title: "Popular Search Questions",
        blurb: "The questions travelers type into Google and ask AI assistants before an India trip — answered directly, each with a full guide.",
        entries: [
            {
                id: "delhi-to-agra-distance",
                question: "How far is Agra from Delhi, and how long does it take?",
                answer: "Agra is about 230 km (145 miles) south of Delhi. By private car on the Yamuna Expressway the drive takes 3.5–4 hours door to door; by train the Gatimaan Express covers Hazrat Nizamuddin to Agra Cantt in about 1 hour 40 minutes (08:10 to 09:50). Flying is not practical for this route.",
                guide: { href: "/blog/delhi-to-agra-distance-and-travel-time", label: "Delhi to Agra: distance, drive time and train options" },
            },
            {
                id: "how-many-days",
                question: "How many days do you need for the Golden Triangle?",
                answer: "Four days is the realistic minimum to see Delhi, Agra and Jaipur without rushing; five to seven days lets you add a Taj Mahal sunrise, Fatehpur Sikri and a slower pace. If you only have one day, a same-day Agra tour from Delhi is possible, but the full triangle in under four days means skipping sights.",
                guide: { href: "/blog/how-many-days-for-the-golden-triangle", label: "How many days for the Golden Triangle (with sample itineraries)" },
            },
            {
                id: "is-it-safe",
                question: "Is the Golden Triangle safe for tourists and solo female travelers?",
                answer: "Yes. Delhi, Agra and Jaipur are India's most visited tourist circuit and are well policed, with dedicated tourist police at major monuments. The common issues are touts and small scams rather than violent crime; a private tour with a licensed guide and your own driver removes almost all of them.",
                guide: { href: "/blog/is-the-golden-triangle-safe-for-tourists", label: "Is the Golden Triangle safe? Scams to know and how a private tour helps" },
            },
            {
                id: "india-visa",
                question: "Do I need a visa to visit India?",
                answer: "Almost all foreign nationals need a visa, and most can apply for an Indian e-Visa online at indianvisaonline.gov.in. The e-Tourist Visa is offered in 30-day, 1-year and 5-year versions; apply at least four days before you fly, and carry a printout of the approval to show at immigration.",
                guide: { href: "/blog/india-e-visa-guide-for-tourists", label: "India e-Visa guide: how to apply, timing and what to carry" },
            },
            {
                id: "tipping",
                question: "How much should I tip my guide and driver in India?",
                answer: "Tipping is customary but never compulsory. As a guideline, travelers commonly tip a guide ₹500–1,000 per day and a driver ₹300–500 per day on a multi-day tour, handed over in cash on the last day. Restaurants that do not add a service charge usually receive 5–10%.",
                guide: { href: "/blog/tipping-in-india-guide-and-driver", label: "Tipping in India: guides, drivers, hotels and restaurants" },
            },
            {
                id: "cash-or-card",
                question: "Can I use credit cards in India, or do I need cash?",
                answer: "Cards work at hotels, larger restaurants and shops, but you still need cash for auto-rickshaws, small vendors, monument gate counters and tips. Withdraw rupees from bank ATMs after you land rather than exchanging large sums abroad — the rupee is a closed currency and airport exchange rates are poor.",
                guide: { href: "/blog/cash-cards-and-atms-in-india", label: "Cash, cards and ATMs in India: what actually works" },
            },
            {
                id: "uber-in-agra",
                question: "Is Uber available in Agra? How do I get around the city?",
                answer: "Yes, Uber and Ola both operate in Agra, alongside auto-rickshaws and cycle rickshaws. Note that no petrol or diesel vehicles are allowed within about 500 metres of the Taj Mahal, so the last stretch to any gate is on foot, by electric golf cart or by e-rickshaw regardless of how you arrive.",
                guide: { href: "/blog/getting-around-agra-taxis-uber-and-autos", label: "Getting around Agra: Uber, autos, the Taj no-vehicle zone" },
            },
            {
                id: "what-to-pack",
                question: "What should I pack for a Golden Triangle trip?",
                answer: "Light, modest layers (shoulders and knees covered for temples and mosques), comfortable closed shoes, a scarf, sunscreen, a Type C/D/M power adapter, a small day bag that will pass monument security, and a light jacket for cool winter mornings. Leave drones and tripods at home — they are not allowed inside the Taj Mahal.",
                guide: { href: "/blog/what-to-pack-for-the-golden-triangle", label: "What to pack for Delhi, Agra and Jaipur, season by season" },
            },
            {
                id: "taj-closed-friday",
                question: "Is the Taj Mahal closed on Fridays?",
                answer: "Yes. The Taj Mahal is closed to visitors all day every Friday so the mosque inside the complex can be used for prayers. It stays open on Indian public holidays; Friday is the only weekly closure, so plan your Agra day around it.",
                guide: { href: "/taj-mahal-opening-hours", label: "Taj Mahal opening hours and closures" },
            },
            {
                id: "taj-ticket-price",
                question: "How much is a Taj Mahal ticket for foreigners?",
                answer: "Foreign visitors pay ₹1,100 for entry to the complex plus ₹200 for the main mausoleum, a total of ₹1,300 per adult. Children under 15 enter free. Prices are set by the Archaeological Survey of India and can change, so verify on the official portal before you travel.",
                guide: { href: "/taj-mahal-tickets", label: "Taj Mahal tickets: every visitor category" },
            },
            {
                id: "taj-sunrise-time",
                question: "What time does the Taj Mahal open for sunrise?",
                answer: "Gates open roughly 30 minutes before sunrise — around 06:30 in winter and as early as 05:45 in summer. Arrive at the East gate 30 minutes before opening with tickets bought online the night before, and you will be inside with the first visitors of the day.",
                guide: { href: "/taj-mahal-sunrise-guide", label: "Taj Mahal sunrise guide" },
            },
            {
                id: "taj-dress-code",
                question: "Is there a dress code for the Taj Mahal?",
                answer: "No formal dress code is enforced, but modest clothing with shoulders and knees covered is recommended. Shoes are removed or covered with the free disposable covers on the marble platform, and large bags, food, tripods and drones are not allowed inside.",
                guide: { href: "/taj-mahal-dress-code", label: "Taj Mahal dress code and banned items" },
            },
        ],
    },
    {
        id: "booking",
        title: "Booking & Reservations",
        blurb: "How to book, how far ahead, and what confirms your dates.",
        entries: [
            {
                id: "how-to-book",
                question: "How do I book a tour with Guide India Tours?",
                answer: "Choose a tour plan and use the booking button to start a WhatsApp chat with our team, fill in the contact form for a custom quote, or call +91 8979810991. Booking is direct with the team that runs your tour — no third-party markup.",
            },
            {
                id: "how-far-ahead",
                question: "How far in advance should I book?",
                answer: "For the best choice of hotels and guides, book 2–4 months ahead for the October–March peak season. Shorter notice is usually fine outside peak months, and same-day Agra tours can often be arranged with a few days' notice.",
            },
            {
                id: "deposit",
                question: "How much deposit is required to confirm a booking?",
                answer: "A 25% deposit confirms your booking, with the balance due 30 days before your tour starts. For bookings made within 30 days of travel, full payment is taken at the time of booking.",
            },
            {
                id: "direct-vs-marketplace",
                question: "How is booking direct different from Viator or GetYourGuide?",
                answer: "Booking directly means no marketplace commission built into your price, a WhatsApp line to the people actually running your tour, and a fully customizable private itinerary instead of a fixed product listing.",
            },
        ],
    },
    {
        id: "pricing",
        title: "Pricing & Payments",
        blurb: "Every tour is priced as a custom quote — here is how that works.",
        entries: [
            {
                id: "tour-cost",
                question: "How much does a Golden Triangle tour cost?",
                answer: "Prices depend on the number of days, hotel category, group size and season, so every tour is quoted individually — all-inclusive, private, with no hidden fees. Message us on WhatsApp with your dates and group size for a free quote within 2 hours.",
            },
            {
                id: "payment-methods",
                question: "What payment methods and currencies do you accept?",
                answer: "We accept USD, EUR, GBP and INR by credit or debit card, bank transfer or UPI. Your written quote confirms the currency and accepted methods before you pay anything.",
            },
            {
                id: "refund-policy",
                question: "What is your cancellation and refund policy?",
                answer: "Refunds are tiered by how far ahead you cancel: 85% back at 60+ days before the tour, 60% at 30–59 days, 40% at 15–29 days, 20% at 7–14 days, and no refund inside 7 days or for no-shows. Full terms are on the Refund Policy page.",
                guide: { href: "/refund-policy", label: "Read the full refund policy" },
            },
        ],
    },
    {
        id: "guides",
        title: "Guides & Languages",
        blurb: "Who will be showing you around.",
        entries: [
            {
                id: "licensed-guides",
                question: "Are your guides government-approved and licensed?",
                answer: "Yes. We work only with government-approved, licensed guides, including our lead guide Avneesh Dixit, so you get accurate history and a safe, professional experience at every monument.",
                guide: { href: "/about/avneesh-dixit", label: "Meet our lead guide" },
            },
            {
                id: "languages",
                question: "What languages do your guides speak?",
                answer: "English and Hindi as standard, with German, French, Italian and Spanish-speaking guides available on request and other languages by prior arrangement. Tell us your preferred language when you enquire, as language-specific guides book up early in peak season.",
            },
            {
                id: "local-vs-escort",
                question: "Do I get one guide for the whole trip, or a local guide in each city?",
                answer: "Either. Most private tours use a licensed local guide in each city, which keeps you with a genuine specialist at every monument. If you prefer one escort travelling with you throughout, we can arrange that too — the quote states which arrangement you are getting.",
            },
        ],
    },
    {
        id: "safety",
        title: "Safety & Comfort",
        blurb: "What we do so you can relax.",
        entries: [
            {
                id: "solo-female",
                question: "Is a private tour safe for solo female travelers?",
                answer: "Yes. On a private tour you are accompanied by a government-authorized guide and a professional chauffeur in your own vehicle at all times, which removes the situations where travelers most often feel uncomfortable — negotiating taxis, touts at monument gates and navigating alone after dark.",
                guide: { href: "/blog/is-the-golden-triangle-safe-for-tourists", label: "Our full safety guide" },
            },
            {
                id: "vehicle-hygiene",
                question: "What is your health and safety policy?",
                answer: "Vehicles are cleaned daily, sealed bottled water is provided, and our guides and drivers follow current local safety guidance. Tell us about allergies or medical needs when booking and we will plan around them.",
            },
            {
                id: "mobility",
                question: "Can you accommodate travelers with mobility needs?",
                answer: "Yes. Because every tour is private, we can choose a suitable vehicle, adjust the pace and re-order monuments to limit walking. Share your requirements when you enquire and we will plan accordingly — wheelchairs are available at the Taj Mahal, for example.",
            },
        ],
    },
    {
        id: "itinerary",
        title: "Tour Customization & Logistics",
        blurb: "Pickups, routes and changing the plan.",
        entries: [
            {
                id: "customize",
                question: "Can I customize the Golden Triangle itinerary?",
                answer: "Absolutely — tailor-made tours are what we do. Add days in any city, extend to Udaipur, Ranthambore or Varanasi, or focus on photography, food or architecture. Every plan on this site is a starting point, not a fixed product.",
            },
            {
                id: "airport-pickup",
                question: "Do you provide airport and hotel pickup?",
                answer: "Yes. Every tour includes private pickup and drop-off in an air-conditioned vehicle, available around the clock, including Delhi airport arrivals at any hour and hotel pickups in Delhi, Agra and Jaipur.",
            },
            {
                id: "best-time",
                question: "When is the best time to visit Agra and the Taj Mahal?",
                answer: "October to March brings the most comfortable weather; visiting the Taj Mahal at sunrise gives the softest light and the smallest crowds. Tours run year-round — summer visits simply start earlier and rest through the midday heat.",
                guide: { href: "/taj-mahal-best-time-to-visit", label: "Best time to visit the Taj Mahal" },
            },
            {
                id: "hotels-own",
                question: "Can I book my own hotels and only use you for the car and guide?",
                answer: "Yes. Many travelers book their own hotels and take a guide-and-car package from us, or a guide-only service in a single city. Tell us what you already have arranged and we will quote just the parts you need.",
                guide: { href: "/guide-booking", label: "Book a guide only" },
            },
        ],
    },
];

export const allFaqs: FaqEntry[] = faqCategories.flatMap((c) => c.entries);
