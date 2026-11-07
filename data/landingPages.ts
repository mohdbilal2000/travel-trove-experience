/**
 * Editorial landing pages for the tour searches that buy: same-day Agra from
 * Delhi, Taj Mahal sunrise, and the 10-day Rajasthan route.
 *
 * Every fact here comes from this site's own plan data, its Taj Mahal guides,
 * its blog or the company's itinerary documents. Prices are NOT typed in the
 * copy: the options table reads them from the plan records so the page can
 * never disagree with /plans.
 */

export type LandingFaq = { question: string; answer: string };
export type LandingSection = { heading: string; paragraphs?: string[]; bullets?: string[]; table?: { head: string[]; rows: string[][] } };

export type LandingConfig = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  h1: string;
  subtitle: string;
  /** "Quick answer" box: bold lead + text per line. */
  quick: { lead: string; text: string }[];
  optionsHeading: string;
  optionsIntro: string;
  /** Plan ids shown in the options grid, in order. */
  planIds: number[];
  sections: LandingSection[];
  /** Optional day-by-day timeline. */
  days?: { title: string; text: string }[];
  daysHeading?: string;
  faqs: LandingFaq[];
  related: { href: string; label: string }[];
  whatsappText: string;
};

export const sameDayAgra: LandingConfig = {
  slug: "same-day-agra-tour-from-delhi",
  metaTitle: "Same Day Agra Tour from Delhi by Private Car, From $149 | Guide India Tours",
  metaDescription:
    "Private same-day Taj Mahal tour from Delhi with an English-speaking guide, air-conditioned car and all monument entrance fees. Delhi to Agra is about 230 km, 3.5 to 4 hours each way.",
  badge: "Updated 2026",
  h1: "Same Day Agra Tour from Delhi",
  subtitle: "A private car, an English-speaking guide and the monument entrance fees: Delhi to the Taj Mahal and back in one day.",
  quick: [
    { lead: "Distance:", text: "Agra is about 230 km from Delhi, 3.5 to 4 hours each way by private car on the Yamuna Expressway." },
    { lead: "What you see:", text: "Taj Mahal, Agra Fort, Fatehpur Sikri and Itimad-ud-Daulah (the Baby Taj), with lunch in Agra." },
    { lead: "Included on the standard tour:", text: "round-trip transport from Delhi in a private air-conditioned vehicle, an English-speaking guide, all monument entrance fees, breakfast, lunch and bottled water." },
    { lead: "Sunrise version:", text: "a midnight pickup from anywhere in Delhi NCR so you reach the Taj Mahal at sunrise." },
    { lead: "Not on Fridays:", text: "the Taj Mahal is closed every Friday, so choose another day for the Taj." },
  ],
  optionsHeading: "Choose your same-day Agra tour",
  optionsIntro: "All of these are private, door to door from Delhi and back the same day. Prices are per adult and a starting price; we confirm the exact figure in a written quote.",
  planIds: [2001, 2000, 2016, 2017, 2004, 126, 25],
  sections: [
    {
      heading: "What the standard day looks like",
      paragraphs: [
        "The standard Same Day Agra Tour leaves Delhi early in the morning. You visit the Taj Mahal, explore Agra Fort, a UNESCO World Heritage site, and visit Fatehpur Sikri, the abandoned Mughal capital. You also stop at Itimad-ud-Daulah, the Baby Taj, enjoy a traditional lunch and have time in the local market before the evening return to Delhi.",
        "Some elements can change with bad weather, traffic or monument closures. If that happens we arrange the best alternative so the day still works.",
      ],
    },
    {
      heading: "Standard or sunrise pickup?",
      paragraphs: [
        "The sunrise version starts in the middle of the night so that you reach the Taj Mahal as the gates open. We pick you up from any hotel, airport or address in Delhi NCR, and your exact pickup time is confirmed when you book.",
        "Opening times shift with the season. Our Taj Mahal opening hours guide lists the winter, spring, summer and monsoon timings.",
      ],
    },
    {
      heading: "Is a same-day trip right for you?",
      paragraphs: [
        "It is a long day: roughly 230 km each way, about 3.5 to 4 hours of driving in each direction. It works well if you have one day in Delhi and want the Taj Mahal without changing hotels.",
        "If you would rather not do the round trip in a day, an overnight in Agra lets you see the Taj Mahal at sunrise and sunset, and our Golden Triangle tours combine Delhi, Agra and Jaipur.",
      ],
    },
    {
      heading: "Friday closure",
      paragraphs: [
        "The Taj Mahal is closed to visitors every Friday. Other Agra monuments stay open, so a Friday trip can focus on Agra Fort, Itimad-ud-Daulah and Fatehpur Sikri, and we can adjust the itinerary accordingly. Check your weekday before you pick a date.",
      ],
    },
    {
      heading: "Children and entrance fees",
      paragraphs: [
        "Children under 15 enter ASI-run monuments, including the Taj Mahal, free of charge. Tell us your children's ages and we confirm the tour price in your quote.",
      ],
    },
  ],
  faqs: [
    { question: "How far is Agra from Delhi and how long does the drive take?", answer: "Agra is roughly 230 km south of Delhi. By private car on the Yamuna Expressway the journey takes 3.5 to 4 hours each way, so a same-day trip involves about 7 to 8 hours on the road in total." },
    { question: "What time does the tour start?", answer: "The standard tour typically starts at 6:00 AM from Delhi, reaching Agra around 9:00 AM. The sunrise version starts in the middle of the night so you reach the Taj Mahal for sunrise, and your exact pickup time is confirmed when you book." },
    { question: "Can I be picked up from anywhere in Delhi?", answer: "For the sunrise tour we pick up from anywhere in Delhi NCR, including hotels, airports, railway stations and residential addresses. Tell us your pickup point when you book." },
    { question: "Is the Taj Mahal open on Fridays?", answer: "No. The Taj Mahal is closed every Friday for prayers. Other monuments in Agra remain open and we can adjust the itinerary accordingly." },
    { question: "What is included in the standard same-day tour price?", answer: "Round-trip transportation from Delhi in a private air-conditioned vehicle, an English-speaking guide, all monument entrance fees, breakfast and lunch, and bottled water." },
    { question: "What if the weather or traffic is bad?", answer: "While we follow the itinerary as planned, some elements can vary because of bad weather, traffic, monument closures or other unforeseen circumstances. We always do our best to arrange alternatives so you still have a memorable day." },
    { question: "Do you offer a same-day tour by train or by flight?", answer: "Yes. We offer a Same Day Agra Tour by Train and a Same Day Agra Tour by Flight. Their current starting prices are in the options above." },
    { question: "Do children pay to enter the Taj Mahal?", answer: "Children under 15 enter ASI monuments, including the Taj Mahal, free of charge. Tell us the ages of your children and we will confirm the tour price in your quote." },
  ],
  related: [
    { href: "/plans/2001", label: "Same Day Agra Tour: full itinerary" },
    { href: "/taj-mahal-sunrise-tour", label: "Taj Mahal sunrise tour" },
    { href: "/taj-mahal-opening-hours", label: "Taj Mahal opening hours" },
    { href: "/taj-mahal-tickets", label: "Taj Mahal ticket prices" },
    { href: "/blog/delhi-to-agra-distance-and-travel-time", label: "Delhi to Agra: distance and travel time" },
    { href: "/agra-tours", label: "All Agra tours" },
  ],
  whatsappText: "Hi Guide India Tours! I'd like a quote for a same-day Agra tour from Delhi.",
};

export const taj_sunrise: LandingConfig = {
  slug: "taj-mahal-sunrise-tour",
  metaTitle: "Taj Mahal Sunrise Tour from Delhi or Agra | Guide India Tours",
  metaDescription:
    "Private Taj Mahal sunrise tour with a government-approved guide, from Delhi with a pickup from anywhere in Delhi NCR or from your Agra hotel. Gates open about 30 minutes before sunrise.",
  badge: "Updated 2026",
  h1: "Taj Mahal Sunrise Tour",
  subtitle: "Be at the Taj Mahal as the gates open, with a government-approved guide, from Delhi or from your Agra hotel.",
  quick: [
    { lead: "Gate opening:", text: "visitors are admitted from about 30 minutes before sunrise, around 06:30 in winter and as early as 05:45 in summer." },
    { lead: "From Delhi:", text: "the Same Day Agra Sunrise Tour picks you up from anywhere in Delhi NCR so you reach Agra in time for the golden hour." },
    { lead: "Staying in Agra:", text: "an overnight in Agra avoids the long early drive and lets you see the Taj Mahal at sunrise and sunset." },
    { lead: "Entrance fees:", text: "all monument entrance fees are included in the same-day sunrise tour." },
    { lead: "Not on Fridays:", text: "the Taj Mahal is closed every Friday, so book the sunrise for another day." },
  ],
  optionsHeading: "Taj Mahal sunrise tour options",
  optionsIntro: "Prices are per adult and a starting price; we confirm the exact figure in a written quote.",
  planIds: [2000, 2016, 2002, 9],
  sections: [
    {
      heading: "Why sunrise",
      paragraphs: [
        "Our photography guide calls sunrise the prime window: the first 30 minutes of light turn the marble pink, then gold, then cool white as the day starts. Our sunrise guide also notes that the east gate stays calm at sunrise because most tour groups concentrate at other entrances.",
        "Your guide will advise on the best gate and timing on the day, and the full month-by-month sunrise times are in our Taj Mahal sunrise guide.",
      ],
    },
    {
      heading: "Sunrise from Delhi in one day",
      paragraphs: [
        "On the Same Day Agra Sunrise Tour you are picked up from your location in Delhi NCR, whether a hotel, the airport or any address, and driven to Agra to arrive for sunrise at the Taj Mahal. After the Taj Mahal the day continues with Agra Fort, a UNESCO World Heritage site, Fatehpur Sikri, Itimad-ud-Daulah (the Baby Taj), breakfast, lunch and a return to Delhi NCR.",
      ],
    },
    {
      heading: "Winter fog",
      paragraphs: [
        "Late December and early January carry a real fog risk that can hide the Taj Mahal for hours. Our best-time guide has the month-by-month detail if you are choosing dates.",
      ],
    },
    {
      heading: "What to carry and what to leave",
      bullets: [
        "Travel light: phone, camera, water and ID. Security is similar to an airport.",
        "Tripods, monopods, gimbals and drones are not allowed.",
        "Photography is allowed in the gardens and on the platform, and banned only inside the central mausoleum chamber.",
        "There is no enforced dress code, but covered shoulders and knees is a sensible rule of thumb. Shoes come off or get covers at the main marble platform.",
      ],
    },
    {
      heading: "Friday closure",
      paragraphs: [
        "The Taj Mahal is closed all day every Friday. If your Agra day is a Friday, use it for Agra Fort, Fatehpur Sikri or Mehtab Bagh and plan the sunrise visit for another day.",
      ],
    },
  ],
  faqs: [
    { question: "What time does the Taj Mahal open for sunrise?", answer: "Gates admit visitors from roughly 30 minutes before the official sunrise time. In peak winter that means around 06:30, and in summer as early as 05:45." },
    { question: "Can I do a Taj Mahal sunrise tour as a day trip from Delhi?", answer: "Yes. Our Same Day Agra Sunrise Tour picks you up from anywhere in Delhi NCR and returns you there the same day. The pickup is in the middle of the night so that you reach the Taj Mahal for sunrise, and we confirm your exact pickup time when you book." },
    { question: "Are entrance fees included?", answer: "Yes, all monument entrance fees are included in the same-day sunrise tour. The foreign-visitor ticket is currently ₹1,100 for the complex plus ₹200 for the main mausoleum, and children under 15 enter free." },
    { question: "Is the Taj Mahal open on Fridays?", answer: "No. The Taj Mahal is closed all day every Friday. Plan the sunrise visit for another day." },
    { question: "What happens if it is foggy?", answer: "Late December and early January carry a real fog risk that can hide the Taj Mahal for hours. If you have flexibility, our best-time guide shows the lower-risk months; if not, your guide will adjust the day around the weather." },
    { question: "Can I bring a tripod?", answer: "No. Tripods, monopods and gimbals are not permitted inside the Taj Mahal complex for general visitors, and drones are prohibited." },
  ],
  related: [
    { href: "/taj-mahal-sunrise-guide", label: "Taj Mahal sunrise guide" },
    { href: "/same-day-agra-tour-from-delhi", label: "Same day Agra tour from Delhi" },
    { href: "/taj-mahal-best-time-to-visit", label: "Best time to visit the Taj Mahal" },
    { href: "/taj-mahal-photography-guide", label: "Taj Mahal photography guide" },
    { href: "/taj-mahal-opening-hours", label: "Taj Mahal opening hours" },
    { href: "/agra-tour-guide", label: "Private Agra tour guide" },
  ],
  whatsappText: "Hi Guide India Tours! I'd like a quote for a Taj Mahal sunrise tour.",
};

export const rajasthan10: LandingConfig = {
  slug: "rajasthan-golden-triangle-tour",
  metaTitle: "10-Day Rajasthan and Golden Triangle Private Tour | Guide India Tours",
  metaDescription:
    "Private 10-day tour of Delhi, Agra, Jaipur, Jodhpur and Udaipur with heritage hotels, expert local guides, all entrance fees and airport transfers. Itinerary, driving times and options.",
  badge: "Updated 2026",
  h1: "Rajasthan and Golden Triangle Private Tour",
  subtitle: "Delhi, Agra, Jaipur, Jodhpur and Udaipur in 10 days, with heritage hotel stays, local guides and your own vehicle.",
  quick: [
    { lead: "Duration:", text: "10 days and 9 nights." },
    { lead: "Route:", text: "Delhi, Agra, Jaipur, Jodhpur, then Udaipur with a stop at the Ranakpur Jain Temples." },
    { lead: "Included:", text: "9 nights in heritage hotels, daily breakfast and select meals, luxury transportation, expert local guides, all entrance fees, cultural activities and airport transfers." },
    { lead: "Private:", text: "your own vehicle and guides, and the itinerary can be adapted to your interests and pace." },
    { lead: "Taj Mahal:", text: "closed every Friday, so the Agra day is planned around it." },
  ],
  optionsHeading: "Rajasthan tour options",
  optionsIntro: "From the 10-day route below to six-day Golden Triangle extensions and a 17-day all-Rajasthan tour. Prices are per adult and a starting price; we confirm the exact figure in a written quote.",
  planIds: [9, 4009, 4010, 4005, 4006, 4035, 4036, 26],
  daysHeading: "Day by day: the 10-day route",
  days: [
    { title: "Day 1: Arrival in Delhi", text: "Arrive in Delhi and transfer to a heritage hotel. Welcome dinner with a cultural briefing." },
    { title: "Day 2: Delhi exploration", text: "A full day through the highlights of Old and New Delhi." },
    { title: "Day 3: Delhi to Agra", text: "Morning drive to Agra. In the afternoon, Agra Fort and Itimad-ud-Daulah." },
    { title: "Day 4: Agra to Jaipur", text: "Sunrise visit to the Taj Mahal, then the drive to Jaipur via Fatehpur Sikri." },
    { title: "Day 5: Jaipur exploration", text: "A full day with Amber Fort, the City Palace and other sights, with a cultural performance in the evening." },
    { title: "Day 6: Jaipur to Jodhpur", text: "Drive to Jodhpur and an evening walk through the old blue city." },
    { title: "Day 7: Jodhpur exploration", text: "Mehrangarh Fort, Jaswant Thada and local markets, then a village safari in the afternoon." },
    { title: "Day 8: Jodhpur to Udaipur", text: "A scenic drive to Udaipur, visiting the Ranakpur Jain Temples on the way." },
    { title: "Day 9: Udaipur exploration", text: "The City Palace complex, a boat ride on Lake Pichola and local arts." },
    { title: "Day 10: Udaipur departure", text: "A relaxed morning, then the transfer to the airport for your departure." },
  ],
  sections: [
    {
      heading: "Driving times between cities",
      paragraphs: ["Distances and times are approximate and depend on traffic and stops."],
      table: {
        head: ["Leg", "Distance", "Time"],
        rows: [
          ["Delhi to Agra", "about 230 km", "3.5 to 4 hours"],
          ["Agra to Fatehpur Sikri", "about 40 km", "about 1 hour"],
          ["Fatehpur Sikri to Jaipur", "200 to 220 km", "4 to 5 hours"],
          ["Jaipur to Jodhpur", "330 to 340 km", "5 to 6 hours"],
          ["Jodhpur to Ranakpur", "160 to 170 km", "3 to 4 hours"],
          ["Ranakpur to Udaipur", "90 to 100 km", "2 to 2.5 hours"],
          ["Udaipur to Delhi", "650 to 700 km by road, or a flight of about 1 hour 15 to 1 hour 30", "11 to 13 hours by road"],
        ],
      },
    },
    {
      heading: "Make it longer or shorter",
      paragraphs: [
        "If ten days is more than you need, our six-day Golden Triangle extensions add a single Rajasthan city, such as Jodhpur or Udaipur. If you want more, the 17-day tour covers all the Rajasthan cities, and Jaisalmer, Ranthambore, Pushkar and Ajmer can be added to a Golden Triangle route.",
      ],
    },
    {
      heading: "Returning from Udaipur to Delhi",
      paragraphs: [
        "Udaipur is far from Delhi by road, about 650 to 700 km and 11 to 13 hours. A flight takes about 1 hour 15 to 1 hour 30 and saves most of a day. Flight availability and timings must be checked for your date.",
      ],
    },
    {
      heading: "Taj Mahal and Friday",
      paragraphs: [
        "The Taj Mahal is closed every Friday. We plan the Agra days so that your Taj Mahal visit, ideally at sunrise, falls on another day of the week.",
      ],
    },
  ],
  faqs: [
    { question: "How many days do I need for Rajasthan and the Golden Triangle?", answer: "Our packages range from six-day Golden Triangle extensions that add one Rajasthan city to a 17-day tour of all the Rajasthan cities. The 10-day route here covers Delhi, Agra, Jaipur, Jodhpur and Udaipur at a steady pace." },
    { question: "Is the tour private?", answer: "Yes. The tour is private, with your own vehicle and expert local guides, and the itinerary can be adjusted to your interests and pace." },
    { question: "Are hotels included?", answer: "The 10-day Rajasthan Royal Heritage tour includes 9 nights in heritage hotels, daily breakfast and select meals. Other packages list their hotel and meal inclusions on their own pages, and some are guide-and-vehicle only." },
    { question: "How do I get from Udaipur back to Delhi?", answer: "By flight, which takes about 1 hour 15 to 1 hour 30, or by road, about 650 to 700 km and 11 to 13 hours. We recommend the flight for comfort and time, and can arrange it if you wish." },
    { question: "Can I add Jaisalmer, Ranthambore or Pushkar?", answer: "Yes. Jaisalmer, Ranthambore, Pushkar and Ajmer, as well as Bikaner, Chittorgarh, Mount Abu and Mandawa, can be added to a Golden Triangle route. Tell us what you would like and we send a written quote." },
    { question: "When is the best time to travel?", answer: "Our guides recommend October to March for the Taj Mahal because the weather is cool and dry. Our best-time guide for the Golden Triangle gives the month-by-month detail." },
  ],
  related: [
    { href: "/golden-triangle-tours", label: "Golden Triangle tours" },
    { href: "/plans?city=Udaipur", label: "Udaipur tours" },
    { href: "/jaipur-tours", label: "Jaipur tours" },
    { href: "/blog/best-time-to-visit-golden-triangle", label: "Best time to visit the Golden Triangle" },
    { href: "/blog/how-many-days-for-the-golden-triangle", label: "How many days for the Golden Triangle" },
    { href: "/taj-mahal-opening-hours", label: "Taj Mahal opening hours" },
  ],
  whatsappText: "Hi Guide India Tours! I'd like a quote for the 10-day Rajasthan and Golden Triangle tour.",
};

export const landingPages = [sameDayAgra, taj_sunrise, rajasthan10];
