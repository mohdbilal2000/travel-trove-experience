"""
Guide India Tours quotation, theme v2 ("Taj Dawn").
Run from this folder:  python3 build_v2.py quotes/<client>.json out.html   then  node measure.cjs out.html && node render.cjs out.html out.pdf
Photos sit in ./photos and are shown at their natural aspect ratio (never cropped).
Order: cover, Your Comfort, Your Journey, What is / is not included, Your Price (per person AND total),
Services Provided (company copy), Booking terms + policies, Payment details, closing.
"""
import re,sys,json
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

# ----------------------------- CONTENT comes from a JSON file (see quotes/example-theo.json) -----------------------------
Q=json.load(open(sys.argv[1])); OUT=sys.argv[2]
M=Q['meta']
LB=Q.get('labels',{})
def L(k,d): return LB.get(k,d)
if Q.get('itinerary_only'):
    Q.setdefault('included',[]); Q.setdefault('not_included',[])
    Q.setdefault('price',{'rows':[],'total_label':'','total_value':'','boxes':[('','',''),('','','')],'note':''})
head=head.replace('Guide India Tours &mdash; Theo &mdash; Delhi &amp; Agra','Guide India Tours &mdash; '+M['client']+' &mdash; '+M['title'])
foot=foot.replace('Quotation GIT-2027-0225-CA','Quotation '+M['ref'])
def tile(k,h,d): return f'<div><div class="k">{k}</div><div class="h">{h}</div><div class="d">{d}</div></div>'
def row(tm,h,d): return f'<div class="r"><div class="tm">{tm}</div><div class="tx"><div class="h">{h}</div><div class="d">{d}</div></div></div>'
def img(p,alt,cap=None,flex=None):
    st=f' style="flex:{flex}"' if flex else ''
    c=f'<div class="cap" style="text-align:left">{cap}</div>' if cap else ''
    return f'<figure{st}><img class="photo" src="{p["file"]}" alt="{p["alt"]}">{c}</figure>'
C=Q['cover']
cards=''.join(f'<div><div class="k">{k}</div><div class="v">{v}</div></div>' for k,v in Q['cards'])
s1=f'''<div class="sheet">
<div class="head">
  <div class="brand brandrow">{logo}
    <div><div class="wm"><em>Guide</em> India Tours</div>
    <div class="tg">Government-Approved Tourist Guides &middot; Private Travel Services &middot; Since 2004</div></div></div>
  <div class="meta">{M.get('meta_html') or ("Quotation <b>"+M['ref']+"</b><br>Issued "+M['issued']+"<br>Valid until "+M['valid'])}</div>
</div>
<div class="stripe"></div>
<div class="cover">
  <span class="pill">{C['pill']}</span>
  <h1>{C['title']}</h1>
  <div class="sub">{C['sub']}</div>
  <img class="photo" src="{C['photo']['file']}" alt="{C['photo']['alt']}">
  <div class="cap">{C['photo']['cap']}</div>
</div>
<div class="cards">{cards}</div>
</div>
'''
CM=Q['comfort']
tiles=''.join(tile(*t) for t in CM['tiles'])
prow=''.join(f'<figure style="flex:1"><img class="photo" src="{p["file"]}" alt="{p["alt"]}"></figure>' for p in CM['photos'])
s2=f'''<div class="sheet">
<div class="body">
  <div class="sec" style="padding-top:12mm">
    <span class="lbl">{L('comfort_lbl','01 &mdash; Your Comfort')}</span>
    <h2>{CM['heading']}</h2>
    <div class="relax"><div class="big">{CM['quote']}</div><p>{CM['intro']}</p></div>
    <div class="tiles">{tiles}</div>
    <div class="photorow" style="margin-top:6mm">{prow}</div>
  </div>
</div>
</div>
'''
def day_html(dday):
    h=f'<div class="dayhead"><div><div class="no">{dday["no"]}</div><div class="tt">{dday["title"]}</div></div><div class="dd">{dday["date"]}</div></div>\n<div class="tl">'+''.join(row(*r) for r in dday['rows'])+'</div>\n'
    if dday.get('photos'):
        h+='<div class="photorow" style="width:54%;margin-bottom:4mm">'+''.join(f'<figure style="flex:{p.get("flex",1.5)}"><img class="photo" src="{p["file"]}" alt="{p["alt"]}"><div class="cap" style="text-align:left">{p.get("cap","")}</div></figure>' for p in dday['photos'])+'</div>\n'
    return h
if Q.get('pages'):
    s3=''
    for i,pg in enumerate(Q['pages']):
        lbl=L('itin_lbl','02 &mdash; Itinerary') if i==0 else L('itin_lbl2','02 &mdash; Itinerary continued')
        body=''.join(day_html(Q['days'][k]) for k in pg)
        gk=f'<div class="clarity">{Q["good_to_know"]}</div>' if i==len(Q['pages'])-1 and Q.get('good_to_know') else ''
        s3+=f'''<div class="sheet">
<div class="body">
  <div class="sec" style="padding-top:12mm">
    <span class="lbl">{lbl}</span>
    <h2>{L('journey','Your Journey')}</h2>
    {body}
  </div>
  {gk}
</div>
</div>
'''
else:
    days=''.join(day_html(d) for d in Q['days'])
    s3=f'''<div class="sheet">
<div class="body">
  <div class="sec" style="padding-top:12mm">
    <span class="lbl">{L('itin_lbl','02 &mdash; Itinerary')}</span>
    <h2>{L('journey','Your Journey')}</h2>
    {days}
  </div>
  <div class="clarity">{Q['good_to_know']}</div>
</div>
</div>
'''
def li(x):
    return f'<li>{x[0]}<small>{x[1]}</small></li>' if isinstance(x,list) else f'<li>{x}</li>'
inc=''.join(li(x) for x in Q['included']); exc=''.join(li(x) for x in Q['not_included'])
P=Q['price']
SINGLE=P.get('single')
prows=''.join(f'<tr><td class="v">{r[0]}' + (f'<i>{r[1]}</i>' if r[1] else '') + f'</td><td class="r2">{r[2]}</td></tr>' for r in P['rows'])
boxes=''.join(f'<div class="{c}"><div class="k">{b[0]}</div><div class="amt">{b[1]}</div><div class="sm">{b[2]}</div></div>' for c,b in zip(('pp','tt'),P['boxes']))
OPT=P.get('options')
if OPT:
    _cards=''
    for _c,_o in zip(('pp','tt'),OPT):
        _rows=''.join(f'<tr><td style="padding:1.6mm 0;border-bottom:.6pt solid rgba(255,255,255,.35)">{r[0]}<br><span style="opacity:.85;font-size:6.8pt">{r[1]}</span></td><td style="padding:1.6mm 0;border-bottom:.6pt solid rgba(255,255,255,.35);text-align:right;white-space:nowrap;font-weight:600">{r[2]}</td></tr>' for r in _o['rows'])
        _cards+=f'<div class="{_c}"><div class="k">{_o["label"]}</div><div style="font:600 11pt/1.3 Playfair,Georgia,serif;margin-top:2mm">{_o["name"]}</div><table style="width:100%;margin-top:3mm;font-size:7.8pt;color:#fff;border-collapse:collapse">{_rows}</table><div class="sm" style="margin-top:3.5mm">{_o["total_label"]}</div><div class="amt" style="font-size:21pt;margin-top:1mm">{_o["total"]}</div><div class="sm">{_o["pp"]}</div></div>'
    price_block=f'<div class="priceboxes" style="margin-top:2mm;align-items:stretch">{_cards}</div>'
elif SINGLE:
    price_block=f'<div class="priceboxes" style="margin-top:2mm"><div class="tt" style="flex:1;text-align:center;padding:9mm 6mm"><div class="k">{SINGLE["label"]}</div><div class="amt" style="font-size:34pt">{SINGLE["total"]}</div><div class="sm" style="font-size:8.6pt">{SINGLE["sub"]}</div></div></div>'
else:
    price_block=f'<table class="pr"><thead><tr><th style="width:62%">What</th><th class="c">Amount</th></tr></thead><tbody>{prows}<tr class="tot"><td class="v">{P["total_label"]}</td><td class="r2">{P["total_value"]}</td></tr></tbody></table><div class="priceboxes">{boxes}</div>'
s4=f'''<div class="sheet">
<div class="body">
  <div class="sec" style="padding-top:12mm">
    <span class="lbl">{L('clarity_lbl','03 &mdash; Total Clarity')}</span>
    <h2>{L('clarity_h','What You Get, and What You Do Not')}</h2>
    <div class="ie">
      <div class="box inc"><div class="bh">{L('inc_h','Included in your price')}</div><ul>{inc}</ul></div>
      <div class="box exc"><div class="bh">{L('exc_h','Not included')}</div><ul>{exc}</ul></div>
    </div>
  </div>
  <div class="sec">
    <span class="lbl">{L('price_lbl','04 &mdash; Your Price')}</span>
    <h2>{L('price_h','Your Price, All in One Place') if SINGLE else 'Per Person and in Total'}</h2>
    {price_block}
    <div class="clarity">{P['note']}</div>
  </div>
</div>
</div>
'''
terms=terms
terms_x=terms.replace('Reply to confirm your dates, your chosen vehicle and your preferred final drop',Q.get('step1','Reply to confirm your dates')).replace('Monument, elephant ride and government fees','Monument and government fees')
if Q.get('payment_policy'):
    old=re.search(r'(<tr><td class="pc">40%</td><td>At the time of confirmation</td></tr>\s*<tr><td class="pc">40%</td><td>One month before the tour date</td></tr>\s*<tr><td class="pc">20%</td><td>15 days before the tour date</td></tr>)',terms_x)
    assert old, 'policy rows not found'
    terms_x=terms_x.replace(old.group(1),''.join(f'<tr><td class="pc">{p}</td><td>{t}</td></tr>' for p,t in Q['payment_policy']))
    terms_x=terms_x.replace('Pay the remaining instalments as set out below',Q['step_last'])
    terms_x=terms_x.replace('Transfer the <b>40% confirmation payment</b> to the account shown',Q['step_pay'])
s6=f'''<div class="sheet">
<div class="body">
{terms_x.replace('<div class="sec">','<div class="sec" style="padding-top:12mm">',1)}
{bank.replace('  <div class="sec" style="padding-top:0">','  <div class="sec" style="padding-top:6mm">',1).replace('Payment may be made in USD or INR. The balance is payable on arrival in India.',Q.get('bank_note','Payment may be made in USD or INR. The balance is payable on arrival in India.'))}
</div>
</div>
'''
G=Q['closing']
gal=''.join(img(p,None,p.get('cap'),p.get('flex')) for p in G['photos'])
s7=f'''<div class="sheet">
<div class="body" style="padding-top:14mm">
  <div class="photorow" style="margin:0 0 3mm">{gal}</div>
  <div class="cap" style="text-align:center;margin:0 0 8mm">{L('photo_credit','Photographs: Unsplash (free licence) &middot; illustrative')}</div>
  <div class="signoff" style="margin-top:0;border-top:0;padding-top:0">
    {G['text']}
    <div class="nm">Guide India Tours</div>
    <div class="rl">Government-Approved Tourist Guides &middot; Private Travel Services &middot; Since 2004</div>
  </div>
{plat}{foot}'''
if Q.get('itinerary_only'):
    VP=Q['vehicle_page']
    vt=''.join(tile(*t) for t in VP['tiles'])
    s_v=f'''<div class="sheet">
<div class="body">
  <div class="sec" style="padding-top:12mm">
    <span class="lbl">03 &mdash; How We Travel</span>
    <h2>{VP['heading']}</h2>
    <div class="relax"><div class="big">{VP['quote']}</div><p>{VP['intro']}</p></div>
    <div class="tiles">{vt}</div>
  </div>
  <div class="clarity">{VP['note']}</div>
</div>
</div>
'''
    sheets=[s1,s2,s3,s_v,s7]
else:
    sheets=[s1,s2,s3,s4,services,s6,s7]
open(OUT,'w').write(head+'<body>\n'+'\n'.join(sheets)+'\n</body></html>\n')
