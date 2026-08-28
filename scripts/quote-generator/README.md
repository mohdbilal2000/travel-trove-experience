# Quote Generator

Renders a branded Guide India Tours PDF quotation from a plain data dict.

## Usage

```bash
pip install weasyprint
python3 generate_quote.py                    # renders the sample at the bottom of the script
python3 generate_quote.py example_quote.json # renders a quote from JSON
```

Output lands in `output/quote_<guest_name>.pdf`.

## Where the branding comes from

Brand values are read off the website source in this repo, so the PDF and the
site cannot drift apart:

| Token | Source |
|---|---|
| Maroon `#800000`, gold `#D6B641`, ivory `#FAF4E1`, royal `#2C3E50` | `tailwind.config.ts` |
| Cormorant Garamond / Playfair Display / Inter | `app/layout.tsx` |
| "**Guide** India Tours" wordmark | `components/layout/Navbar.tsx` |
| Address, phone, email, socials | `components/layout/Footer.tsx` |

Fonts are vendored as TTFs in `fonts/` so rendering needs no network.

## Data shape

Every key is optional except `guest_name`. Unknown keys are ignored.

```python
{
  "quote_ref": "GIT-2026-0828-MV",
  "date_issued": "28 Aug 2026",
  "valid_until": "15 Sep 2026",       # printed in the footer of every page
  "guest_name": "Maila Varraso",      # also names the output file
  "pax": "2 Adults",
  "travel_dates": "23-26 October 2026",
  "route": "Jaipur > Agra > Delhi",
  "duration": "4 Days / 3 Nights",
  "title": "...",                     # optional; defaults to "<duration> Private Tour"
  "note": "...",                      # optional highlighted callout
  "price_note": "...",                # optional line under the pricing table

  "pricing_tiers": [                  # rows = tiers, columns = vehicles
    {"tier_name": "Taxi Only",
     "sub": "4 days, vehicle and chauffeur only",
     "options": [{"vehicle": "Sedan", "price": 17800}]}
  ],

  "itinerary":  [{"day": "23 October", "title": "Arrival Jaipur", "details": "..."}],
  "inclusions": ["..."],
  "exclusions": ["..."],
  "contact":    {"phone": "...", "whatsapp": "...", "email": "...", "website": "..."}
}
```

Notes:

- Vehicle columns are derived from the tiers, in first-seen order. A tier that
  omits a vehicle renders an em dash for that cell.
- Prices are integers in rupees; the script formats them with Indian digit
  grouping (`₹1,23,456`). Pass a string instead to print it verbatim, which is
  how you quote in a foreign currency.
- The last tier is highlighted as the recommended one.
- `contact` values left as `PUT_YOUR_...` placeholders fall back to the real
  company details rather than printing the placeholder.
