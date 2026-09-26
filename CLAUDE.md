# Guide India Tours — working notes

This repo is the Guide India Tours website (Next.js 16 / React 19 / Tailwind / app router),
deployed to Vercel at www.guideindiatours.com.

Alongside the site, this project is used to produce **client quotation PDFs**. The
framework below is the company standard and applies to every quotation.

---

# Quotation framework

## Design system — preserve, do not redesign

The existing quotation look is the design system. Keep it exactly:

- Guide India Tours branding and logo treatment
- Maroon `#800000`, gold `#D6B641`, ivory `#FAF4E1`, royal/navy `#2C3E50`, sandalwood `#A38454`
- Fonts: Playfair Display (headings), Inter (body), Cormorant Garamond (wordmark)
- Existing heading hierarchy, letter-spacing, section-number style, divider lines,
  cards, tables, header and footer
- Premium editorial / travel-brochure feel, generous spacing

Never turn it into a generic corporate quote, a Word document, an invoice, or a
colourful flyer.

## Logo and platform badges

- The **company logo mark** (`public/favicon.svg` — maroon rounded square, gold Mughal
  motif) sits in the masthead to the left of the wordmark, on an ivory plate so it reads
  against the maroon band.
- The **last page**, between the closing and the footer, carries an "Also find us on"
  strip: Tripadvisor (with the green `#34E0A1` circle), GetYourGuide `#FF5533`,
  Klook `#FF5722`, Viator `#328E6E` — set as wordmarks in the platforms' own colours,
  exactly as `components/home/HomeSections.tsx` does on the website. Do not draw
  imitation versions of those companies' logos.
- Only list platforms Guide India Tours is genuinely on.

## Section order — do not change

```
COVER / QUOTATION HEADER
01  Client & Trip Overview
02  Your Journey
03  Highlights & Experiences
04  Services Provided
05  Inclusions & Exclusions
06  Package Price
    Important Information      (only when relevant)
07  Booking Process & Terms
08  Payment Details
FINAL PERSONALISED CLOSING
```

**Price must never appear before** the client has seen their trip details, the
itinerary, the highlights, our services, and the inclusions/exclusions. The document
reads as a prepared proposal, not a price sheet.

## Section rules

**01 Client & Trip Overview** — information-card layout. Only fields that exist for
this client: Prepared For, Travellers, Adults, Children + ages, Travel Dates, Duration,
Route, Guide/Language, Pickup, Drop-off, Nationality, Special Requirements. Omit any
field with no data. Never invent one.

**02 Your Journey** — day-by-day. Each day: day number, date (if known), route, short
day title, detailed text. Only the itinerary supplied for this client. Never add
attractions because they are popular locally. May run across pages; do not shrink type
to force a fit.

**03 Highlights & Experiences** — never call this "Monuments" (the template must suit
wildlife, beach, Kerala, Andaman, cultural tours too). Pull the major highlights that
are *actually in this client's itinerary*. Each: name, city, one short factual line.
Concise, not an encyclopedia.

**04 Services Provided** (section title on the page: "Services Provided") — this is
standard company copy and is used **verbatim** on every quotation. Layout: heading, the subtitle line, the intro line, then a **two-column card
grid** (one card per item, bold maroon title, short line under it, gold top rule),
closing with the gold "Your Comfort Is Our Priority" band. Do not reword, shorten or
re-order the items.

> **SERVICES PROVIDED**
> Quality &middot; Comfort &middot; Safety &middot; Personal Care
>
> With Guide India Tours, your journey is more than sightseeing. We take care of the
> details so you can relax, explore and enjoy India with complete peace of mind.
>
> - **Government-Approved Professional Tourist Guide** — Experienced, knowledgeable and
>   dedicated to making every monument meaningful, interesting and enjoyable.
> - **Private Sanitized AC Transportation** — Clean, comfortable and well-maintained
>   private vehicle with a professional and courteous chauffeur.
> - **Personal Assistance Throughout Your Journey** — From arrival to departure, our team
>   is available to assist you with travel arrangements and practical needs.
> - **Smooth & Convenient Sightseeing** — Assistance with monument visits and
>   skip-the-line options wherever officially available.
> - **Complimentary Drinking Water** — Fresh bottled drinking water provided during
>   sightseeing and travel.
> - **Shoe Covers & Battery Shuttle Assistance** — Provided where applicable for added
>   comfort and convenience at selected monuments.
> - **Photography Assistance** — We help you discover beautiful viewpoints and memorable
>   photo locations and are happy to assist with taking your photographs.
> - **Authentic Local Experiences** — Discover India's history, culture, local art,
>   traditional handicrafts and live demonstrations where included in your itinerary.
> - **Flexible & Personalized Service** — We respect your interests, preferred pace and
>   comfort, adapting the experience whenever practical.
> - **Clear & Transparent Service** — Straightforward pricing with no hidden charges and
>   no unnecessary stops.
> - **Your Comfort Comes First** — If you have any special requirement, personal
>   preference, concern or difficulty at any time during your journey, please feel free to
>   tell us. We are here to listen, assist and do our best to make your experience
>   comfortable, smooth and worry-free.
>
> **YOUR COMFORT IS OUR PRIORITY**
> Professional Service &middot; Local Knowledge &middot; Personal Attention &middot;
> Genuine Hospitality &middot; Peace of Mind

The emoji in the source copy are for WhatsApp only — the PDF uses the card styling
instead. This section is company-wide service standard, not client-specific, so it does
not count as carrying content over from another client's quotation.

**05 Inclusions & Exclusions** — existing two-column Included / Not Included layout.
Concise, scannable. Invent nothing on either side.

**06 Package Price** — existing premium pricing-table style. Vehicle option, per-person
price, total, travellers, currency; original price / discount / final price where
applicable. Multiple vehicle options clearly separated. Use the exact supplied figures;
never alter commercial numbers or hide mandatory charges.

**Important Information** — small elegant callout, only when genuinely relevant:
monument closure days, seasonal operating periods, wildlife sightings not guaranteed,
government fee changes, timing constraints. No generic filler.

**07 Booking Process & Terms** — Part A the numbered booking steps; Part B the company
terms actually supplied (advance, balance, cancellation, amendment, monument/government
fee changes, vehicle and hotel conditions). Never invent a policy to fill space.

**08 Payment Details** — existing bank-transfer card. Only the banking information
supplied, exactly as supplied. Never guess, complete or modify banking data.

**Closing** — short, human, personalised. Then contact person, designation, company,
phone/WhatsApp, email, website, office address. Keep the existing footer.

## Content rules

Read the client's actual information first, then generate each section from it.

**Never carry over** names, dates, prices, hotels, monuments, vehicle types, guide
languages, bank details or booking terms from another client's quotation — unless the
item is fixed company policy.

**Never invent.** If something is missing, omit it. Do not guess, do not assume, and do
not present generic travel information as client-specific.

## Layout rules

Page count follows the content — 4, 5, 6 or more is all fine. But:

- No heading stranded alone at the foot of a page; keep headings with their content
- Do not split tables awkwardly, or a single itinerary day, without reason
- A section continuing overleaf should look intentional
- Consistent margins, typography and spacing throughout
- Avoid both large dead space and overcrowding
- Do not shrink the font to save space

## Standing checks before any quotation goes out

- **Taj Mahal is closed every Friday.** Verify the weekday of the Taj day.
- **Children under 15 enter ASI monuments free.**
- Verify every stated weekday against the actual calendar.
- Check the arithmetic: cost → margin → per-person → currency conversion, both ways.
- Quote in the client's own currency.
- Sanity-check supplier notes; handwritten totals do not always match their line items.
