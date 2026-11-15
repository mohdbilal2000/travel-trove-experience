"""
Guide India Tours quotation, theme v2 ("Taj Dawn").
Run from this folder:  python3 build_v2.py out.html   then  node measure.cjs out.html && node render.cjs out.html out.pdf
Photos sit in ./photos and are shown at their natural aspect ratio (never cropped).
Order: cover, Your Comfort, Your Journey, What is / is not included, Your Price (per person AND total),
Services Provided (company copy), Booking terms + policies, Payment details, closing.
"""
import re,sys
T='git-quotation-reference.html'
t=open(T).read()
head=t[:t.index('<body>')]
head=head.replace('Guide India Tours &mdash; Caro &mdash; Golden Triangle','Guide India Tours &mdash; Theo &mdash; Delhi &amp; Agra')
THEME='''
/* ===== theme v2 "Taj Dawn": calm teal + sunrise saffron + warm cream ===== */
:root{
  --maroon:#0F5C6E; --maroon-dk:#0B4857; --maroon-tint:#E8F4F5;
  --gold:#F2A33A; --gold-200:#FBE3B5; --gold-50:#FFF8EA;
  --ivory:#FFF7EA; --royal:#1F2D3D; --sand:#6B7F8C; --sand-200:#E6DDCB;
  --jade:#2E9E7B; --jade-200:#CDEBDD; --jade-50:#EEF8F3;
  --ink:#1F2D3D; --body:#44546A; --muted:#6B5B3E; --line:#EDE6D8; --line2:#E6DDCB;
  --rose:#C8506E; --rose-50:#FCEBEF; --teal:#0F5C6E; --teal2:#1E8A9A; --teal-50:#E8F4F5;
}
body{background:#fff}
.head{background:linear-gradient(100deg,#0B4857,#0F5C6E 60%,#1E8A9A);border-bottom:3pt solid var(--gold)}
.brand .wm em{color:#FBE3B5}
.head .meta,.brand .tg{color:#CFE7EA}
.pill{background:var(--gold);color:#3b2a05}
.badge{background:var(--gold);color:#3b2a05}
.sec>.lbl{color:var(--gold)}
.sec>h2{color:var(--teal);border-bottom:1pt solid var(--line2);position:relative}
.sec>h2:after{content:'';position:absolute;left:0;bottom:-1.5pt;width:24mm;height:2.2pt;background:var(--gold)}
.ie .exc .bh{background:var(--rose-50);color:var(--rose);border-bottom:1pt solid #f1c9d3}
.ie .exc li:before{color:var(--rose)}
.ie .inc .bh{background:var(--jade-50);color:#1f7a5e}
.day{background:#fff}
.day .n{background:var(--teal)}
table.pr th{background:var(--teal)}
.promise2{background:linear-gradient(100deg,#0B4857,#0F5C6E 60%,#1E8A9A);border-top:2.5pt solid var(--gold);border-radius:2.2mm}
.promise2 .t{color:#fff}.promise2 .w{color:var(--gold-200)}
.svc2 .i{color:var(--gold)}
.svc2>div:nth-child(4n+2) .i,.svc2>div:nth-child(4n+3) .i{color:var(--teal2)}
.bank{border-radius:2mm;overflow:hidden}.bank .bh{background:var(--teal)}
.steps li:nth-child(even):before{background:var(--gold);color:#3b2a05}
.foot{background:var(--ivory)}

/* ===== new components ===== */
.stripe{height:2.4mm;background:linear-gradient(90deg,var(--teal) 0 25%,var(--teal2) 25% 50%,var(--gold) 50% 75%,var(--rose) 75%)}
.cover{background:linear-gradient(180deg,#FFF7EA,#fff);padding:9mm 16mm 0}
.cover h1{font:600 27pt/1.12 Playfair,Georgia,serif;color:var(--teal);margin:4mm 0 2mm}
.cover .sub{font:600 12pt/1.4 Cormorant,Georgia,serif;color:var(--royal);letter-spacing:.3pt}
.photo{display:block;width:100%;height:auto;border-radius:3mm}
.cover .photo{margin-top:6mm;box-shadow:0 1.5pt 9pt rgba(15,60,70,.22)}
.cap{font-size:6.4pt;letter-spacing:.8pt;color:var(--sand);margin-top:1.8mm;text-align:right}
.cards{display:flex;flex-wrap:wrap;gap:3mm;padding:6mm 16mm 0}
.cards>div{width:calc(33.333% - 2mm);background:#fff;border-radius:2.2mm;padding:3.2mm 4mm;
  box-shadow:0 1pt 6pt rgba(60,50,30,.14);border-top:3pt solid var(--teal)}
.cards>div:nth-child(2){border-top-color:var(--gold)}.cards>div:nth-child(3){border-top-color:var(--rose)}
.cards>div:nth-child(4){border-top-color:var(--teal2)}.cards>div:nth-child(5){border-top-color:var(--gold)}
.cards>div:nth-child(6){border-top-color:var(--rose)}
.cards .k{font-size:5.6pt;letter-spacing:1.4pt;text-transform:uppercase;color:var(--sand)}
.cards .v{font:600 9.2pt/1.3 Inter,sans-serif;color:var(--ink);margin-top:1.4mm}
.relax{background:var(--teal-50);border-radius:3mm;padding:6mm 7mm;margin-bottom:5mm}
.relax .big{font:600 15pt/1.35 Playfair,Georgia,serif;color:var(--teal)}
.relax p{margin-top:2.5mm;font-size:9.2pt;line-height:1.7}
.tiles{display:flex;flex-wrap:wrap;gap:3.4mm}
.tiles>div{width:calc(50% - 1.7mm);border-radius:2.4mm;padding:4.4mm 5mm;page-break-inside:avoid;border-top:3pt solid var(--teal);background:#fff;
  box-shadow:0 1pt 6pt rgba(60,50,30,.12)}
.tiles>div:nth-child(1){background:var(--teal-50);border-top-color:var(--teal)}
.tiles>div:nth-child(2){background:var(--gold-50);border-top-color:var(--gold)}
.tiles>div:nth-child(3){background:var(--jade-50);border-top-color:var(--jade)}
.tiles>div:nth-child(4){background:var(--rose-50);border-top-color:var(--rose)}
.tiles>div:nth-child(5){background:var(--gold-50);border-top-color:var(--gold)}
.tiles>div:nth-child(6){background:var(--teal-50);border-top-color:var(--teal2)}
.tiles .k{font:700 6pt/1 Inter,sans-serif;letter-spacing:2pt;text-transform:uppercase;color:var(--teal)}
.tiles .h{font:600 11pt/1.3 Playfair,Georgia,serif;color:var(--ink);margin:2mm 0 1.6mm}
.tiles .d{font-size:8.5pt;line-height:1.65;color:var(--body)}
.tiles .d b{color:var(--teal)}
.dayhead{display:flex;align-items:center;gap:4mm;margin:0 0 3mm;padding:3.2mm 5mm;border-radius:2.4mm;
  background:linear-gradient(100deg,var(--teal),var(--teal2));color:#fff;page-break-after:avoid}
.dayhead .no{font:700 6.4pt/1 Inter,sans-serif;letter-spacing:2pt;text-transform:uppercase;color:var(--gold-200)}
.dayhead .tt{font:600 12.5pt/1.2 Playfair,Georgia,serif;color:#fff}
.dayhead .dd{margin-left:auto;font:600 8pt/1.3 Inter,sans-serif;color:#fff;text-align:right}
.tl{margin:0 0 6mm}
.tl .r{display:flex;gap:4.5mm;padding:3.2mm 0;border-bottom:1pt dashed var(--line2);page-break-inside:avoid}
.tl .r:last-child{border-bottom:0}
.tl .tm{flex:none;width:23mm;font:700 7pt/1.35 Inter,sans-serif;letter-spacing:.9pt;text-transform:uppercase;color:var(--teal);
  background:var(--teal-50);border-radius:20mm;padding:1.8mm 2mm;text-align:center;align-self:flex-start}
.tl .r:nth-child(even) .tm{background:var(--gold-50);color:#9a6208}
.tl .tx .h{font:600 10.4pt/1.3 Playfair,Georgia,serif;color:var(--teal)}
.tl .tx .d{font-size:8.6pt;line-height:1.65;color:var(--body);margin-top:1mm}
.tl .tx .d b{color:var(--teal)}
.photorow{display:flex;gap:3mm;margin:0 0 5mm;align-items:flex-start}
.photorow figure{margin:0}
.priceboxes{display:flex;gap:4mm;margin:5mm 0 0;page-break-inside:avoid}
.priceboxes>div{flex:1;border-radius:3mm;padding:5mm 6mm;color:#fff}
.priceboxes .pp{background:linear-gradient(120deg,var(--teal),var(--teal2))}
.priceboxes .tt{background:linear-gradient(120deg,#C27A12,var(--gold))}
.priceboxes .k{font:700 6.2pt/1 Inter,sans-serif;letter-spacing:2.2pt;text-transform:uppercase;opacity:.92}
.priceboxes .amt{font:600 24pt/1.05 Playfair,Georgia,serif;margin-top:3mm;font-variant-numeric:lining-nums}
.priceboxes .sm{font-size:7.6pt;line-height:1.5;margin-top:2mm;opacity:.95}
table.pr td.r2{text-align:right;font:600 11pt/1 Playfair,Georgia,serif;color:var(--teal);white-space:nowrap}
table.pr tr.tot td{background:var(--gold-50)!important;border-top:1.5pt solid var(--gold)}
table.pr tr.tot td.v{font-weight:700}
.clarity{margin-top:5mm;border-radius:2.4mm;background:var(--gold-50);border-left:3pt solid var(--gold);padding:4.2mm 5.5mm;font-size:8.7pt;line-height:1.7;color:var(--muted);page-break-inside:avoid}
.clarity b{color:var(--teal)}
.ie li small{display:block;font-size:7.4pt;color:#7d8993;margin-top:.4mm;line-height:1.45}
'''
head=head.replace('</style></head>',THEME+'</style></head>')
logo=re.search(r'<div class="logoplate">.*?</svg></div>',t,re.S).group(0)
services='\n'.join(t.split('\n')[297:324])
a=t.index('  <div class="sec">\n    <span class="lbl">06 &mdash;'); b=t.index('<div class="sheet">',a)
terms=t[a:b].rstrip(); assert terms.endswith('</div>\n</div>'); terms=terms[:-len('</div>\n</div>')].rstrip()
a=t.index('  <div class="sec" style="padding-top:16mm">\n    <span class="lbl">07 &mdash;'); b=t.index('<div class="signoff">')
bank=t[a:b].rstrip().replace('padding-top:16mm','padding-top:0')
plat=t[t.index('  <div class="plat">'):t.index('<div class="foot">')]
foot=t[t.index('<div class="foot">'):t.index('</body>')]

# ----------------------------- CONTENT (this quote) -----------------------------
D=dict(
 ref='GIT-2026-1130-TH', issued='15 November 2026', valid='22 November 2026',
 name='Theo', pax='1 Traveller', dates='Mon 30 Nov &ndash; Tue 1 Dec 2026', duration='2 Days / 1 Night',
 route='Delhi &rarr; Agra &rarr; Delhi', pickup='Le M&eacute;ridien New Delhi', drop='ITC Mughal, Agra &middot; then Delhi / Gurgaon',
 guide='Licensed, English-speaking', vehicle='Private AC sedan',
 per_person_main='&#8377;27,000', total_main='&#8377;27,000',
)
foot=foot.replace('Quotation GIT-2027-0225-CA','Quotation '+D['ref'])
def tile(k,h,d): return f'<div><div class="k">{k}</div><div class="h">{h}</div><div class="d">{d}</div></div>'
def row(tm,h,d): return f'<div class="r"><div class="tm">{tm}</div><div class="tx"><div class="h">{h}</div><div class="d">{d}</div></div></div>'

s1=f'''<div class="sheet">
<div class="head">
  <div class="brand brandrow">{logo}
    <div><div class="wm"><em>Guide</em> India Tours</div>
    <div class="tg">Government-Approved Tourist Guides &middot; Private Travel Services &middot; Since 2004</div></div></div>
  <div class="meta">Quotation <b>{D['ref']}</b><br>Issued {D['issued']}<br>Valid until {D['valid']}</div>
</div>
<div class="stripe"></div>
<div class="cover">
  <span class="pill">Private Two-Day Tour &middot; Delhi &rarr; Agra &rarr; Delhi</span>
  <h1>Two Relaxed Days in Agra</h1>
  <div class="sub">Your time, your pace &middot; Private car &middot; Licensed guide &middot; Tickets included</div>
  <img class="photo" src="photos/taj-reflecting-pool.jpg" alt="The Taj Mahal and its gardens">
  <div class="cap">THE TAJ MAHAL, AGRA</div>
</div>
<div class="cards">
  <div><div class="k">Prepared for</div><div class="v">{D['name']}</div></div>
  <div><div class="k">Travellers</div><div class="v">{D['pax']}</div></div>
  <div><div class="k">Travel dates</div><div class="v">{D['dates']}</div></div>
  <div><div class="k">Route</div><div class="v">{D['route']}</div></div>
  <div><div class="k">Pickup</div><div class="v">{D['pickup']}</div></div>
  <div><div class="k">Drop-off</div><div class="v">{D['drop']}</div></div>
</div>
</div>
'''
s2=f'''<div class="sheet">
<div class="body">
  <div class="sec" style="padding-top:12mm">
    <span class="lbl">01 &mdash; Your Comfort</span>
    <h2>Relax. We have taken care of it.</h2>
    <div class="relax">
      <div class="big">&ldquo;Tell us the time, and that is the time.&rdquo;</div>
      <p>Say 8:00 in the morning and your driver is at your hotel at 8:00. Say 9:00 and it is 9:00. Nothing in this plan is
      fixed against your wishes &mdash; this page tells you exactly how your two days will feel, so there is nothing to wonder about.</p>
    </div>
    <div class="tiles">
      {tile('Your clock','You choose the time','Pickup is at the time <b>you</b> tell us, whether that is 8 or 9 AM. We confirm it with you the evening before, and your driver is there on the minute.')}
      {tile('Your meals','Eat when you are hungry','There are no fixed meal stops. Tell your guide or driver what you like, and they suggest clean, comfortable places close to where you are, with mild-spice options. Meals are at your own cost.')}
      {tile('Your pace','Slow down, swap or skip','Want longer at a monument, a rest, or to change the order? Just say so. The plan bends to you, within the opening hours of each place.')}
      {tile('Your team','One driver, one clear plan','The same professional driver stays with you the whole time, and a licensed English-speaking guide joins you at the monuments. The driver takes you to your hotel at the end of each day.')}
      {tile('No surprises','Nothing hidden, no shopping stops','There are no compulsory shopping stops. Every price is on page 4, and monument tickets are charged at the exact official price with nothing added.')}
      {tile('Always reachable','A message away, day and night','Your WhatsApp line to our team stays open during your trip. Any change or question, just write.')}
    </div>
    <div class="photorow" style="margin-top:6mm"><figure style="flex:1"><img class="photo" src="photos/taj-through-arch.jpg" alt="The Taj Mahal framed by a Mughal arch"></figure><figure style="flex:1"><img class="photo" src="photos/taj-blue-pool.jpg" alt="The Taj Mahal gardens"></figure></div>
  </div>
</div>
</div>
'''
s3=f'''<div class="sheet">
<div class="body">
  <div class="sec" style="padding-top:12mm">
    <span class="lbl">02 &mdash; Itinerary</span>
    <h2>Your Journey</h2>
    <div class="dayhead"><div><div class="no">Day One</div><div class="tt">Delhi to Agra &middot; Baby Taj and sunset</div></div><div class="dd">Monday<br>30 November 2026</div></div>
    <div class="tl">
      {row('Your time<br>8 or 9 AM','Pickup from Le M&eacute;ridien New Delhi','Your driver meets you at the hotel at the time you choose &mdash; 8:00 or 9:00, exactly as you say. Then the private transfer to Agra, about 3.5&ndash;4 hours depending on traffic, with a comfort break on the way.')}
      {row('Afternoon','Itimad-ud-Daulah &middot; the Baby Taj','Your licensed English-speaking guide takes you through this delicate marble tomb on the river, famous for its inlay work and often called the &ldquo;Baby Taj&rdquo;.')}
      {row('Sunset','Mehtab Bagh','The garden across the Yamuna, with the best view of the Taj Mahal as the evening light changes.')}
      {row('Evening','Drop at ITC Mughal, Agra','Your driver takes you to your hotel. Dinner and rest are at your own pace.')}
    </div>
    <div class="dayhead"><div><div class="no">Day Two</div><div class="tt">Taj Mahal at sunrise &middot; Agra Fort &middot; back to Delhi</div></div><div class="dd">Tuesday<br>1 December 2026</div></div>
    <div class="tl">
      {row('Sunrise','The Taj Mahal','Early start, with a pickup time agreed with you the evening before. Your guide shows you the Taj Mahal in the first light, <b>including the main mausoleum</b>, with its story, its inlay work and time for photographs.')}
      {row('Morning','Breakfast at ITC Mughal','Back to the hotel for a relaxed breakfast and your check-out, at your pace.')}
      {row('After check-out','Agra Fort','Your guide takes you through the red sandstone fort, the great Mughal palace by the river.')}
      {row('Afternoon','Private transfer to Delhi / Gurgaon','The drive back, about 3.5&ndash;4 hours depending on traffic, to the address you give us. End of services.')}
    </div>
  </div>
  <div class="clarity"><b>Good to know.</b> The Taj Mahal is closed every Friday; your visit is on Tuesday 1 December, so you are clear.
  Monument opening and closing times are set by the authorities, so we plan each visit inside them. Driving times depend on traffic.</div>
</div>
</div>
'''
s4=f'''<div class="sheet">
<div class="body">
  <div class="sec" style="padding-top:12mm">
    <span class="lbl">03 &mdash; Total Clarity</span>
    <h2>What You Get, and What You Do Not</h2>
    <div class="ie">
      <div class="box inc"><div class="bh">Included in your price</div><ul>
        <li><b>Private AC sedan with driver</b> for both days<small>Fuel, tolls, parking and taxes are all included.</small></li>
        <li><b>Licensed English-speaking guide</b> for both days</li>
        <li><b>All monument tickets</b><small>Itimad-ud-Daulah, Mehtab Bagh, the Taj Mahal including the main mausoleum, and Agra Fort, at the exact official price.</small></li>
        <li>Pickup from Le M&eacute;ridien and your drop in Delhi / Gurgaon</li>
        <li>Drop at ITC Mughal on Day 1</li>
        <li>Bottled drinking water in the car</li></ul></div>
      <div class="box exc"><div class="bh">Not included</div><ul>
        <li><b>Hotels</b><small>You have already booked yours.</small></li>
        <li>Meals and drinks<small>Breakfast at your hotel is part of your own booking.</small></li>
        <li>Tips and personal expenses</li>
        <li>Camera or video fees at monuments, where charged</li>
        <li>Anything not listed under &ldquo;Included&rdquo;</li></ul></div>
    </div>
  </div>
  <div class="sec">
    <span class="lbl">04 &mdash; Your Price</span>
    <h2>Per Person and in Total</h2>
    <table class="pr">
      <thead><tr><th style="width:62%">What</th><th class="c">Amount</th></tr></thead>
      <tbody>
        <tr><td class="v">Private AC sedan and driver, 2 days<i>Fuel, tolls, parking and taxes included</i></td><td class="r2">&#8377;20,000</td></tr>
        <tr><td class="v">Licensed English-speaking guide, 2 days</td><td class="r2">&#8377;7,000</td></tr>
        <tr><td class="v">Monument tickets, at actual cost<i>The official price, with no markup</i></td><td class="r2">&#8377;_____</td></tr>
        <tr class="tot"><td class="v">Total for 1 traveller</td><td class="r2">&#8377;27,000 + tickets</td></tr>
      </tbody>
    </table>
    <div class="priceboxes">
      <div class="pp"><div class="k">Per person</div><div class="amt">&#8377;27,000 + tickets</div><div class="sm">Shared by one traveller</div></div>
      <div class="tt"><div class="k">Total &middot; 1 traveller</div><div class="amt">&#8377;27,000 + tickets</div><div class="sm">The whole amount, nothing more to add</div></div>
    </div>
    <div class="clarity"><b>No hidden charges.</b> The amounts above are the full price. Monument tickets are charged at exactly what the authorities charge. Reference exchange rate 94.95 INR = 1 USD; payment may also be made in USD, AED or INR.</div>
  </div>
</div>
</div>
'''
terms_x=terms.replace('Reply to confirm your dates, your chosen vehicle and your preferred final drop','Reply to confirm your dates and your pickup times').replace('Monument, elephant ride and government fees','Monument and government fees')
s6=f'''<div class="sheet">
<div class="body">
{terms_x.replace('<div class="sec">','<div class="sec" style="padding-top:12mm">',1)}
{bank.replace('  <div class="sec" style="padding-top:0">','  <div class="sec" style="padding-top:6mm">',1)}
</div>
</div>
'''
s7=f'''<div class="sheet">
<div class="body" style="padding-top:14mm">
  <div class="photorow" style="margin:0 0 3mm"><figure style="flex:1.5"><img class="photo" src="photos/india-gate.jpg" alt="India Gate, Delhi"><div class="cap" style="text-align:left">DELHI</div></figure><figure style="flex:1.333"><img class="photo" src="photos/humayuns-tomb.jpg" alt="Humayun's Tomb, Delhi"><div class="cap" style="text-align:left">DELHI</div></figure><figure style="flex:1.5"><img class="photo" src="photos/taj-blue-pool.jpg" alt="The Taj Mahal, Agra"><div class="cap" style="text-align:left">AGRA</div></figure></div>
  <div class="cap" style="text-align:center;margin:0 0 8mm">Photographs: Unsplash (free licence) &middot; illustrative</div>
  <div class="signoff" style="margin-top:0;border-top:0;padding-top:0">
    Thank you, {D['name']}, for planning your two days with Guide India Tours. Once you confirm, we will reserve your vehicle and guide, and send you the driver and guide details before you arrive. If a time, a place or a plan changes at any moment, just tell us, and we will arrange it around you.
    <div class="nm">Guide India Tours</div>
    <div class="rl">Government-Approved Tourist Guides &middot; Private Travel Services &middot; Since 2004</div>
  </div>
{plat}{foot}'''
sheets=[s1,s2,s3,s4,services,s6,s7]
open(sys.argv[1],'w').write(head+'<body>\n'+'\n'.join(sheets)+'\n</body></html>\n')
