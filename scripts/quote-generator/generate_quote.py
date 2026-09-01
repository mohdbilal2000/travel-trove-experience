#!/usr/bin/env python3
"""
Guide India Tours — branded PDF quotation generator.

Renders a quote from a plain dict (or a JSON file) to
    output/quote_<guest_name>.pdf

Brand tokens are taken from the website source in this repo — tailwind.config.ts
for the palette, app/layout.tsx for the typefaces, components/layout/Navbar.tsx
for the wordmark and components/layout/Footer.tsx for the contact block — so the
PDF and the site stay in step.

Usage
    python3 generate_quote.py                  # renders the sample quote below
    python3 generate_quote.py my_quote.json    # renders a quote from JSON
"""

import json
import re
import sys
from datetime import date
from pathlib import Path

from weasyprint import HTML, CSS

BASE_DIR = Path(__file__).resolve().parent
FONT_DIR = BASE_DIR / "fonts"
OUTPUT_DIR = BASE_DIR / "output"

# --------------------------------------------------------------------------
# Brand tokens — lifted from the website source, not guessed.
# --------------------------------------------------------------------------
BRAND = {
    # tailwind.config.ts
    "maroon_600": "#800000",   # primary — the "Guide" wordmark, buttons, headings
    "maroon_700": "#600000",
    "maroon_50": "#f9e6e6",
    "gold_500": "#D6B641",     # accent rule under the header
    "gold_100": "#F6EFD9",
    "gold_700": "#806D27",
    "sandalwood_600": "#A38454",
    "sandalwood_700": "#7A633F",
    "ivory_300": "#FAF4E1",    # footer ground on the site
    "ivory_50": "#FBF8F0",
    "royal_600": "#2C3E50",    # deep navy — price panel
    "jade_700": "#4D7361",     # inclusions
    "line": "#EBDBC3",
    "line_soft": "#EFE8D8",
    "ink": "#2C3E50",
    "ink_2": "#4a5761",
    "ink_3": "#7A633F",
    # app/layout.tsx
    "font_display": "Cormorant Garamond",  # wordmark
    "font_serif": "Playfair Display",      # headings
    "font_sans": "Inter",                  # body
}

# components/layout/Footer.tsx
COMPANY = {
    "name": "Guide India Tours",
    "tagline": "Government-Approved Tourist Guides · Professional Travel Services",
    "established": "2007",
    "address": "31/84A Jangjeet Nagar, Shamsabad Road, Agra 282001",
    "address_full": "31/84A, Jangjeet Nagar, Shamsabad Road, Agra 282001, Uttar Pradesh, India",
    "phone": "+91 8979810991",
    "whatsapp": "+91 8979810991",
    "email": "info@guideindiatours.com",
    "website": "www.guideindiatours.com",
    "socials": "Facebook · Instagram · X · YouTube",
}


BANK = {
    "account_name": "MOHD BILAL",
    "account_no": "922010008916354",
    "bank": "Axis Bank Limited",
    "branch": "Tajlink Road, Agra 282001",
    "ifsc": "UTIB0000643",
    "swift": "AXISINBBXXX",
}


def esc(value) -> str:
    return (
        str(value)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def rupees(amount) -> str:
    """Indian digit grouping: 1,23,456."""
    if not isinstance(amount, (int, float)):
        return esc(amount)
    n = int(round(amount))
    s = str(abs(n))
    if len(s) > 3:
        head, tail = s[:-3], s[-3:]
        head = re.sub(r"(?<=\d)(?=(\d\d)+$)", ",", head)
        s = f"{head},{tail}"
    return ("-" if n < 0 else "") + "₹" + s


def slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", str(text).lower()).strip("_") or "quote"


# --------------------------------------------------------------------------
# Stylesheet
# --------------------------------------------------------------------------
def build_css() -> str:
    faces = [
        ("Playfair Display", "PlayfairDisplay-SemiBold.ttf", 600),
        ("Playfair Display", "PlayfairDisplay-Bold.ttf", 700),
        ("Inter", "Inter-Regular.ttf", 400),
        ("Inter", "Inter-Medium.ttf", 500),
        ("Inter", "Inter-SemiBold.ttf", 600),
        ("Inter", "Inter-Bold.ttf", 700),
        ("Cormorant Garamond", "CormorantGaramond-SemiBold.ttf", 600),
    ]
    font_faces = "\n".join(
        f"@font-face {{ font-family: '{family}'; font-weight: {weight};"
        f" font-style: normal; src: url('file://{FONT_DIR / filename}') format('truetype'); }}"
        for family, filename, weight in faces
        if (FONT_DIR / filename).exists()
    )
    b = BRAND
    return f"""
{font_faces}

@page {{
  size: A4;
  margin: 24mm 0 21mm;
  @top-center {{ content: element(letterhead); width: 210mm; vertical-align: top; }}
  @bottom-center {{ content: element(pagefoot); width: 210mm; vertical-align: bottom; }}
}}

* {{ box-sizing: border-box; }}
html {{ font-family: '{b['font_sans']}', sans-serif; color: {b['ink']}; font-size: 10pt; }}
body {{ margin: 0; }}

.px {{ padding-left: 14mm; padding-right: 14mm; }}

/* ---------- running header / footer ---------- */
#letterhead {{
  position: running(letterhead); width: 210mm; height: 24mm; overflow: hidden;
  background: {b['maroon_600']};
  color: #fff;
  padding: 6mm 14mm 5mm;
  border-bottom: 2.5pt solid {b['gold_500']};
}}
#letterhead .wm {{ font-family: '{b['font_display']}', serif; font-size: 19pt; font-weight: 600; line-height: 1; }}
#letterhead .wm .g {{ color: {b['gold_100']}; }}
#letterhead .meta {{ text-align: right; vertical-align: top; font-size: 6.8pt; letter-spacing: .5pt; color: {b['gold_100']}; padding-top: 2mm; }}

#pagefoot {{
  position: running(pagefoot); width: 210mm; height: 21mm; overflow: hidden;
  background: {b['ivory_300']};
  border-top: 2pt solid {b['gold_500']};
  padding: 3.2mm 14mm;
  font-size: 6.7pt;
  color: {b['ink_3']};
  line-height: 1.5;
}}
#pagefoot td {{ padding: 0; vertical-align: top; width: 58%; }}
#pagefoot td.r {{ width: 42%; }}
#pagefoot td.r {{ text-align: right; }}
#pagefoot table {{ width: 100%; border-collapse: collapse; }}
#letterhead table {{ width: 100%; border-collapse: collapse; }}
#letterhead td {{ padding: 0; vertical-align: middle; }}
#pagefoot b {{ color: {b['maroon_600']}; }}
#pagefoot .valid {{ color: {b['maroon_600']}; font-weight: 700; }}

/* ---------- title band ---------- */
.band {{
  background: {b['ivory_300']};
  border-bottom: 1pt solid {b['line']};
  padding: 7mm 14mm;
  margin-bottom: 7mm;
}}
.band .qt {{ font-size: 7pt; letter-spacing: 2pt; text-transform: uppercase; color: {b['sandalwood_600']}; }}
.band h1 {{ font-family: '{b['font_serif']}', serif; font-size: 20pt; font-weight: 600; color: {b['maroon_600']}; margin: 2.5mm 0 1.5mm; }}
.band .route {{ font-family: '{b['font_display']}', serif; font-size: 13pt; color: {b['ink']}; letter-spacing: .3pt; }}

.facts {{ width: 100%; border-collapse: separate; border-spacing: 4mm 0; margin: 6mm 0 0 -4mm; }}
.facts td {{ background: #fff; border: 1pt solid {b['line']}; border-left: 2.5pt solid {b['gold_500']}; padding: 2.6mm 4mm; }}
.facts .k {{ font-size: 6.4pt; letter-spacing: 1pt; text-transform: uppercase; color: {b['sandalwood_600']}; }}
.facts .v {{ font-size: 10pt; font-weight: 600; color: {b['ink']}; padding-top: .8mm; }}

/* ---------- sections ---------- */
.sec {{ margin-bottom: 6.5mm; }}
h2 {{ page-break-after: avoid; }}
.confirm, table.ie {{ page-break-inside: avoid; }}
h2 {{
  font-family: '{b['font_serif']}', serif;
  font-size: 12pt; font-weight: 600; color: {b['maroon_600']};
  margin: 0 0 3.5mm; padding-bottom: 1.8mm;
  border-bottom: 1pt solid {b['line']};
}}
h2 .n {{ font-family: '{b['font_sans']}', sans-serif; font-size: 7pt; font-weight: 700; color: {b['gold_700']}; letter-spacing: 1pt; margin-right: 2.5mm; }}

.note {{
  background: {b['ivory_50']};
  border-left: 2.5pt solid {b['gold_500']};
  padding: 3.4mm 4.5mm;
  font-size: 8.4pt; line-height: 1.55; color: {b['ink_3']};
}}
.note b {{ color: {b['maroon_600']}; }}

/* ---------- pricing ---------- */
table.price {{ width: 100%; border-collapse: collapse; }}
table.price th, table.price td {{ border: 1pt solid {b['line']}; padding: 3mm 4mm; }}
table.price thead th {{
  background: {b['royal_600']}; color: #fff;
  font-size: 7.4pt; letter-spacing: 1pt; text-transform: uppercase; font-weight: 600;
  text-align: right;
}}
table.price thead th:first-child {{ text-align: left; }}
table.price tbody th {{
  background: {b['ivory_50']}; text-align: left; font-size: 9pt; font-weight: 600; color: {b['ink']};
  width: 42%;
}}
table.price tbody th .sub {{ display: block; font-size: 7.4pt; font-weight: 400; color: {b['ink_3']}; padding-top: .8mm; }}
table.price tbody td {{
  text-align: right; font-size: 12pt; font-weight: 600;
  font-family: '{b['font_serif']}', serif; color: {b['royal_600']};
}}
table.price tbody tr.best th {{ background: {b['maroon_50']}; }}
table.price tbody tr.best td {{ color: {b['maroon_600']}; }}
.pricenote {{ font-size: 7.6pt; color: {b['ink_3']}; padding-top: 2.5mm; line-height: 1.5; }}

/* ---------- itinerary ---------- */
table.itin {{ width: 100%; border-collapse: collapse; }}
table.itin tr {{ page-break-inside: avoid; }}
table.itin td {{ border-bottom: 1pt solid {b['line_soft']}; padding: 3mm 0; vertical-align: top; }}
table.itin tr:last-child td {{ border-bottom: none; }}
td.daynum {{ width: 15mm; }}
td.daynum .circle {{
  background: {b['maroon_600']}; color: #fff;
  font-family: '{b['font_serif']}', serif; font-size: 11pt; font-weight: 700;
  width: 9mm; height: 9mm; border-radius: 4.5mm;
  text-align: center; line-height: 9mm;
}}
td.daybody .dt {{ font-size: 7pt; letter-spacing: 1pt; text-transform: uppercase; color: {b['sandalwood_600']}; }}
td.daybody .dh {{ font-size: 10pt; font-weight: 700; color: {b['ink']}; padding: .8mm 0 1mm; }}
td.daybody .dd {{ font-size: 8.8pt; line-height: 1.55; color: {b['ink_2']}; }}

/* ---------- inclusions / exclusions ---------- */
table.ie {{ width: 100%; border-collapse: separate; border-spacing: 5mm 0; margin-left: -5mm; }}
table.ie > tbody > tr > td {{ width: 50%; vertical-align: top; border: 1pt solid {b['line']}; padding: 0; }}
.iehd {{ padding: 2.6mm 4mm; font-size: 7.4pt; font-weight: 700; letter-spacing: 1pt; text-transform: uppercase; }}
.iehd.inc {{ background: #F2F9F6; color: {b['jade_700']}; border-bottom: 1pt solid #CCE6DA; }}
.iehd.exc {{ background: {b['maroon_50']}; color: {b['maroon_600']}; border-bottom: 1pt solid #f3cccc; }}
.iebody {{ padding: 3.4mm 4mm; }}
.iebody div {{ font-size: 8.6pt; line-height: 1.6; color: {b['ink_2']}; padding: .7mm 0 .7mm 5mm; text-indent: -5mm; }}
.iebody .tick {{ color: {b['jade_700']}; font-weight: 700; }}
.iebody .cross {{ color: #B0342C; font-weight: 700; }}


/* ---------- why us ---------- */
.why {{ display: grid; grid-template-columns: 1fr 1fr; gap: 4mm 8mm; }}
.why .item {{ padding-left: 5mm; position: relative; font-size: 8.8pt; line-height: 1.55; color: {b['ink_2']}; }}
.why .item::before {{ content: '✦'; position: absolute; left: 0; top: 0; color: {b['gold_500']}; font-size: 8pt; }}
.why .item b {{ color: {b['ink']}; }}

/* ---------- bank ---------- */
.bankwrap {{ display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; align-items: start; }}
.bank {{ border: 1pt solid {b['gold_500']}; background: {b['ivory_50']}; }}
.bankhd {{ background: {b['maroon_600']}; color: #fff; padding: 2.6mm 4mm; font-size: 7.4pt; font-weight: 700; letter-spacing: 1pt; text-transform: uppercase; }}
table.bt {{ width: 100%; border-collapse: collapse; }}
table.bt td {{ padding: 2mm 4mm; border-bottom: 1pt dotted {b['line']}; font-size: 8.6pt; }}
table.bt tr:last-child td {{ border-bottom: none; }}
table.bt td:first-child {{ color: {b['sandalwood_600']}; font-size: 6.8pt; letter-spacing: .7pt; text-transform: uppercase; width: 34mm; }}
table.bt td:last-child {{ font-weight: 600; color: {b['ink']}; }}
.steps {{ counter-reset: st; }}
.steps li {{ list-style: none; counter-increment: st; position: relative; padding-left: 8mm; font-size: 8.8pt; line-height: 1.6; color: {b['ink_2']}; margin-bottom: 2.6mm; }}
.steps li::before {{ content: counter(st); position: absolute; left: 0; top: 0; width: 5mm; height: 5mm; background: {b['maroon_600']}; color: #fff; border-radius: 50%; font-size: 7pt; font-weight: 700; text-align: center; line-height: 5mm; }}
.steps li b {{ color: {b['ink']}; }}

/* ---------- confirm ---------- */
.confirm {{ background: {b['royal_600']}; color: #fff; padding: 5mm 6mm; }}
.confirm .h {{ font-family: '{b['font_serif']}', serif; font-size: 11.5pt; margin-bottom: 2mm; }}
.confirm .p {{ font-size: 8.6pt; line-height: 1.6; color: #c7d1db; }}
.confirm .p b {{ color: #fff; }}
.clear {{ clear: both; }}
"""


# --------------------------------------------------------------------------
# Markup
# --------------------------------------------------------------------------
def build_html(q: dict) -> str:
    b = BRAND
    contact = {**COMPANY, **(q.get("contact") or {})}
    # A config that still carries placeholders falls back to the real details.
    for key in ("phone", "whatsapp", "email", "website"):
        value = str(contact.get(key, ""))
        if not value or value.startswith("PUT_YOUR"):
            contact[key] = COMPANY[key]

    # --- facts row -------------------------------------------------------
    facts = [
        ("Guest", q.get("guest_name", "")),
        ("Travellers", q.get("pax", "")),
        ("Travel dates", q.get("travel_dates", "")),
        ("Duration", q.get("duration", "")),
    ]
    facts_html = "".join(
        f'<td><div class="k">{esc(k)}</div><div class="v">{esc(v)}</div></td>'
        for k, v in facts
    )

    # --- pricing table ---------------------------------------------------
    tiers = q.get("pricing_tiers") or []
    vehicles = []
    for tier in tiers:
        for opt in tier.get("options", []):
            if opt["vehicle"] not in vehicles:
                vehicles.append(opt["vehicle"])

    price_html = ""
    if tiers and vehicles:
        head = "".join(f"<th>{esc(v)}</th>" for v in vehicles)
        rows = ""
        for i, tier in enumerate(tiers):
            by_vehicle = {o["vehicle"]: o.get("price") for o in tier.get("options", [])}
            cells = "".join(
                f"<td>{rupees(by_vehicle[v]) if by_vehicle.get(v) is not None else '&mdash;'}</td>"
                for v in vehicles
            )
            sub = tier.get("sub", "")
            sub_html = f'<span class="sub">{esc(sub)}</span>' if sub else ""
            klass = ' class="best"' if i == len(tiers) - 1 else ""
            rows += f"<tr{klass}><th>{esc(tier.get('tier_name',''))}{sub_html}</th>{cells}</tr>"
        price_html = f"""
    <div class="sec px">
      <h2><span class="n">02</span>Pricing</h2>
      <table class="price">
        <thead><tr><th>Package</th>{head}</tr></thead>
        <tbody>{rows}</tbody>
      </table>
      <div class="pricenote">{esc(q.get('price_note', 'All prices are the total for the party, not per person. A 25% advance confirms the booking; the balance is payable on arrival in India.'))}</div>
    </div>"""

    # --- itinerary -------------------------------------------------------
    itin_rows = ""
    for i, day in enumerate(q.get("itinerary") or [], start=1):
        itin_rows += f"""
        <tr>
          <td class="daynum"><div class="circle">{i}</div></td>
          <td class="daybody">
            <div class="dt">{esc(day.get('day',''))}</div>
            <div class="dh">{esc(day.get('title',''))}</div>
            <div class="dd">{esc(day.get('details',''))}</div>
          </td>
        </tr>"""

    inc = "".join(
        f'<div><span class="tick">✓</span>&nbsp; {esc(x)}</div>'
        for x in (q.get("inclusions") or [])
    )
    exc = "".join(
        f'<div><span class="cross">✕</span>&nbsp; {esc(x)}</div>'
        for x in (q.get("exclusions") or [])
    )

    note_html = ""
    if q.get("note"):
        note_html = f"""
    <div class="sec px"><div class="note"><b>Please note &mdash;</b> {esc(q['note'])}</div></div>"""

    return f"""<!doctype html>
<html><head><meta charset="utf-8"><title>{esc(COMPANY['name'])} — Quotation {esc(q.get('quote_ref',''))}</title></head>
<body>

  <div id="letterhead">
    <table><tr>
      <td><div class="wm"><span class="g">Guide</span> India Tours</div></td>
      <td class="meta">Quotation {esc(q.get('quote_ref',''))}<br>Issued {esc(q.get('date_issued',''))}</td>
    </tr></table>
  </div>

  <div id="pagefoot">
    <table><tr>
      <td><b>{esc(COMPANY['name'])}</b> &nbsp;·&nbsp; {esc(COMPANY['address'])}<br>
          {esc(contact['phone'])} &nbsp;·&nbsp; WhatsApp {esc(contact['whatsapp'])} &nbsp;·&nbsp; {esc(contact['email'])}</td>
      <td class="r">{esc(contact['website'])} &nbsp;·&nbsp; {esc(COMPANY['socials'])}<br>
          <span class="valid">Valid until {esc(q.get('valid_until','—'))}</span></td>
    </tr></table>
  </div>

  <div class="band">
    <div class="qt">Quotation &nbsp;·&nbsp; Established {esc(COMPANY['established'])}</div>
    <h1>{esc(q.get('title') or (q.get('duration','') + ' Private Tour'))}</h1>
    <div class="route">{esc(q.get('route',''))}</div>
    <table class="facts"><tr>{facts_html}</tr></table>
  </div>

  <div class="sec px">
    <h2><span class="n">01</span>Your Trip</h2>
    <div class="dd" style="font-size:8.8pt;line-height:1.6;color:{b['ink_2']};">
      A private tour for <b>{esc(q.get('pax',''))}</b> covering <b>{esc(q.get('route',''))}</b>,
      travelling {esc(q.get('travel_dates',''))} over {esc(q.get('duration',''))}.
      Your vehicle and chauffeur are yours alone throughout &mdash; never shared, and never on a fixed departure.
    </div>
  </div>
{note_html}
{price_html}

  <div class="sec px">
    <h2><span class="n">03</span>Day by Day</h2>
    <table class="itin">{itin_rows}</table>
  </div>

  <div class="sec px">
    <h2><span class="n">04</span>Inclusions &amp; Exclusions</h2>
    <table class="ie"><tr>
      <td><div class="iehd inc">What is included</div><div class="iebody">{inc}</div></td>
      <td><div class="iehd exc">Not included</div><div class="iebody">{exc}</div></td>
    </tr></table>
  </div>

  <div class="sec px">
    <h2><span class="n">05</span>Why Guide India Tours</h2>
    <div class="why">
      <div class="item"><b>Government-approved guides only.</b> Every guide is licensed, English-speaking and briefed on your plan in advance.</div>
      <div class="item"><b>No forced shopping, ever.</b> No commission stops, no showroom detours &mdash; the day is yours.</div>
      <div class="item"><b>One point of contact throughout.</b> Direct WhatsApp access to us for the whole trip, not a call centre.</div>
      <div class="item"><b>Serving guests since 2007.</b> Family-run, Agra-based, and it shows in the detail.</div>
    </div>
  </div>

  <div class="sec px">
    <h2><span class="n">06</span>How to Confirm Your Booking</h2>
    <div class="bankwrap">
      <div>
        <ol class="steps">
          <li>Reply to <b>approve this itinerary</b> and your travel dates</li>
          <li>Transfer a <b>25% advance</b> to the account shown to secure your vehicle and guide</li>
          <li>Send the transfer confirmation &mdash; we issue your <b>written booking confirmation</b></li>
          <li>Pay the <b>balance on arrival</b> in India</li>
        </ol>
      </div>
      <div class="bank">
        <div class="bankhd">Bank Transfer Details</div>
        <table class="bt">
          <tr><td>Account Name</td><td>{esc(BANK['account_name'])}</td></tr>
          <tr><td>Account No.</td><td>{esc(BANK['account_no'])}</td></tr>
          <tr><td>Bank</td><td>{esc(BANK['bank'])}</td></tr>
          <tr><td>Branch</td><td>{esc(BANK['branch'])}</td></tr>
          <tr><td>IFSC</td><td>{esc(BANK['ifsc'])}</td></tr>
          <tr><td>SWIFT / BIC</td><td>{esc(BANK['swift'])}</td></tr>
        </table>
      </div>
    </div>
  </div>

  <div class="sec px">
    <div class="confirm">
      <div class="h">Ready to confirm?</div>
      <div class="p">
        <b>WhatsApp {esc(contact['whatsapp'])}</b> &nbsp;·&nbsp; <b>{esc(contact['email'])}</b>
        &nbsp;·&nbsp; <b>{esc(contact['website'])}</b>
      </div>
    </div>
  </div>

</body></html>"""


def generate(quote: dict, output_dir: Path = OUTPUT_DIR) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    path = output_dir / f"quote_{slug(quote.get('guest_name', 'guest'))}.pdf"
    HTML(string=build_html(quote), base_url=str(BASE_DIR)).write_pdf(
        path, stylesheets=[CSS(string=build_css())]
    )
    return path


# --------------------------------------------------------------------------
# Sample quote — replace, or pass a JSON file as argv[1]
# --------------------------------------------------------------------------
quote_data = {
    "quote_ref": "GIT-2026-0828-MV",
    "date_issued": "28 Aug 2026",
    "valid_until": "15 Sep 2026",
    "guest_name": "Maila Varraso",
    "pax": "2 Adults",
    "travel_dates": "23–26 October 2026",
    "route": "Jaipur → Agra → Delhi",
    "duration": "4 Days / 3 Nights",
    "note": "Your enquiry mentioned 3 days — based on pickup 23 Oct through drop-off 26 Oct, this works out to 4 taxi days.",

    "pricing_tiers": [
        {
            "tier_name": "Taxi Only",
            "sub": "4 days, vehicle and chauffeur only",
            "options": [
                {"vehicle": "Sedan", "price": 17800},
                {"vehicle": "SUV", "price": 20200},
                {"vehicle": "Toyota Innova Crysta", "price": 25100},
            ],
        },
        {
            "tier_name": "Taxi + Guide + Monument Tickets",
            "sub": "4 days, all-inclusive for 2 adults",
            "options": [
                {"vehicle": "Sedan", "price": 33700},
                {"vehicle": "SUV", "price": 36100},
                {"vehicle": "Toyota Innova Crysta", "price": 41000},
            ],
        },
    ],

    "itinerary": [
        {"day": "23 October", "title": "Arrival Jaipur",
         "details": "Jaipur Airport pickup at 4:00 PM → Hotel transfer → Overnight Jaipur"},
        {"day": "24 October", "title": "Jaipur Sightseeing → Agra",
         "details": "Amber Fort, City Palace, Jantar Mantar, Hawa Mahal → Drive to Agra → Hotel check-in"},
        {"day": "25 October", "title": "Taj Mahal & Agra → Delhi",
         "details": "Early morning Taj Mahal visit with English-speaking Government-Approved Guide → Agra Fort → Baby Taj (time permitting) → Drive to Delhi → Hotel transfer"},
        {"day": "26 October", "title": "Departure",
         "details": "Early morning private transfer to Delhi Airport for 6:00 AM departure"},
    ],

    "inclusions": [
        "Private AC taxi with professional chauffeur",
        "Professional English-speaking guide",
        "Monument entrance tickets for 2 adults",
        "Airport transfers",
        "Sightseeing assistance",
        "WhatsApp support throughout",
    ],
    "exclusions": [
        "Hotel accommodation (guest booking independently)",
        "Meals",
        "Personal expenses",
        "Tips/gratuities",
    ],

    "contact": {
        "phone": "+91 8979810991",
        "whatsapp": "+91 8979810991",
        "email": "info@guideindiatours.com",
        "website": "www.guideindiatours.com",
    },
}


if __name__ == "__main__":
    data = quote_data
    if len(sys.argv) > 1:
        data = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    out = generate(data)
    print(f"Wrote {out}")
