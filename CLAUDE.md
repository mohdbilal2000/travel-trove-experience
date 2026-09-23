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

## Section order — do not change

```
COVER / QUOTATION HEADER
01  Client & Trip Overview
02  Your Journey
03  Highlights & Experiences
04  Our Services
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

**04 Our Services** — short premium intro line, then only the services actually
included in this quotation. Communicates value before the price appears. No
unsupported promises.

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
