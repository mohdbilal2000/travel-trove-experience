# TechLeaf — Sales Strategy for US Home Care / HHA Agencies

**Version 1.0 · Owner: Bilal · Status: draft for review**

---

## 0. Assumptions (correct these before executing)

This plan is written on the following reading of the brief. If any of it is wrong, the
strategy shifts — flag it and I'll rework the affected sections.

| # | Assumption | If wrong → what changes |
|---|---|---|
| 1 | TechLeaf is a software/web/AI development shop (Next.js, integrations, automation) selling services, not a SaaS product | Pricing model + offer ladder (§3) |
| 2 | "Comfort HHA" is a US **home health aide / non-medical home care agency** | Entire ICP (§2) |
| 3 | We have **two live US home care clients** already shipped and running | Proof engine (§4) — the whole wedge depends on this |
| 4 | Team delivers from India, sells into the US | Trust plays (§10), timezone/pricing (§3) |
| 5 | Current pipeline is inbound/referral only; no systematic outbound | 90-day plan (§11) |

**The one-line strategy:** stop selling "websites and apps" to anyone who will listen, and
become *the* technology partner for US home care agencies — a vertical where we already have
two live references, where the buyer is a reachable owner-operator, and where our work maps to
two numbers they lose sleep over: **caregivers hired** and **billable hours filled**.

---

## 1. Why vertical, and why this vertical

Two live clients in one industry is not two logos. It is a **category position** — but only if
we stop being generalists. The math behind going narrow:

- **Same discovery call, every time.** We already know their software (HHAeXchange, WellSky,
  AxisCare, AlayaCare, Smartcare), their payers, their compliance burden. Sales cycle shortens
  because we sound like an insider, not a vendor.
- **Reference density.** A prospect in Queens does not care about a travel site. They care that
  we run the systems for two agencies that look exactly like them.
- **Reusable delivery.** The second home care site costs us 40% of the first. Margin goes up
  while price stays the same.
- **Referral loops.** Agency owners talk to each other constantly — franchise owner groups,
  HCAOA state chapters, LinkedIn. In a vertical, one happy client seeds five conversations.

Market conditions that make this a good bet right now:

- ~**79% annual caregiver turnover** industry-wide; replacement cost ~$3,000–4,000 per caregiver.
  Recruiting is the #1 operational pain, and it is a *technology-solvable* pain.
- **Private-pay demand is won on speed.** Families searching "home care near me" convert to
  whoever responds first. Most agencies respond in hours or not at all after 5pm.
- **Fragmented buyers.** Tens of thousands of licensed agencies in the US, mostly independent or
  small-franchise, mostly with a 2015-era website and no marketing ops. Low competition from
  serious dev shops — their alternatives are cheap template shops or expensive US agencies.
- **Compliance tailwind.** EVV, HIPAA, state licensure reporting keeps pushing them toward
  systems integration work they can't do in-house.

---

## 2. ICP — who we sell to

### 2.1 Primary ICP (spend 80% of effort here)

| Attribute | Target |
|---|---|
| Business type | Non-medical home care / HHA / PCA agency, or Medicare-certified home health with a private-pay line |
| Size | 25–250 caregivers; $1M–$15M annual revenue |
| Ownership | Independent owner-operator, or 1–5 unit franchisee (Home Instead, Visiting Angels, Comfort Keepers, Right at Home, Senior Helpers, BrightStar, ComForCare) |
| Payer mix | Any private-pay component ≥ 30% — this is where marketing spend has ROI |
| Geography | Start in the **metros/states where our two existing clients operate** (local references close deals), then expand to high-density home care states: NY, NJ, FL, TX, CA, PA, OH, IL, GA, AZ |
| Growth signal | Actively running caregiver job ads (Indeed/ZipRecruiter), recently opened a second location, recently licensed |
| Tech signal | Website older than ~3 years, mobile-broken apply flow, no online intake, no chat, weak Google Business Profile |

### 2.2 Buyer map

| Role | What they care about | Our hook |
|---|---|---|
| **Owner / President** (primary buyer, signs) | Revenue, billable hours, cost of hiring, exit valuation | "More clients and more caregivers, measured" |
| **Administrator / Director of Ops** (day-to-day champion) | Scheduling gaps, unfilled shifts, admin busywork | "Automate intake and applicant follow-up" |
| **Director of Nursing / Clinical** (blocker on compliance) | HIPAA, documentation, EVV | "HIPAA-aware builds, BAA signed" |
| **Recruiter / HR** (loudest pain) | Applicant flow, no-shows to interviews | "Cut time-to-first-contact to under 5 minutes" |

### 2.3 Disqualify fast (protects margin)

- Pure Medicaid managed-care agencies with zero private pay → no marketing ROI story.
- Under ~15 caregivers / pre-revenue startups → can't afford retainers, high churn.
- Anyone who opens with "how much for just a website?" and won't do a 20-minute discovery.
- Agencies mid-acquisition or mid-license-suspension.
- Buyers who want us to touch clinical/EMR data without a BAA and a defined scope.

---

## 3. Offer ladder & pricing

Sell **outcomes with names**, not hours. Four productized offers, one entry ramp.

### 3.1 The ramp: Agency Growth Audit — **free** (the wedge, see §5)
A 10-minute recorded teardown + 1-page scorecard. Zero-risk, high-signal, and it *is* the
opener for all outbound.

### 3.2 Offer 1 — **Caregiver Recruiting Engine**
*Their #1 pain. Easiest yes. Lead with this.*
- Mobile-first 60-second apply flow (no PDF, no login, resume optional)
- Instant SMS/email auto-response + automated nudge sequence to non-completers
- Self-serve interview scheduling into the recruiter's calendar
- Applicant pipeline dashboard + source attribution (which job board actually works)
- Optional: Indeed/ZipRecruiter feed integration, referral-bonus tracking for existing staff
- **Price:** $3,500–6,000 build + $600–1,200/mo
- **ROI line:** "One avoided turnover pays for two months. Ten extra hires a year is ~$35k saved."

### 3.3 Offer 2 — **24/7 Intake Agent** (AI voice + web chat)
- Answers after-hours family inquiries; qualifies payer source, ZIP, hours needed, start date
- Books the in-home assessment directly on the care coordinator's calendar
- Warm-transfers during business hours; full transcript + summary to email/CRM
- Spanish/second-language support where the market needs it
- **Price:** $2,500–5,000 build + $500–1,200/mo + usage
- **ROI line:** "One 20-hr/week private-pay client is ~$34k/yr top line, ~$11k gross profit.
  Miss one after-hours call a month and you've paid for this ten times over."

### 3.4 Offer 3 — **Local Growth Site** (site + local SEO/AEO)
- Fast Next.js site (our travel-site build proves the performance/SEO chops)
- City/service landing pages for every town in their service area
- Google Business Profile optimization + review-generation loop
- Referral-source landing pages (hospital discharge planners, SNFs, elder-law attorneys)
- Schema/AEO so they surface in AI answers, not just blue links
- **Price:** $7,000–14,000 build + $900–1,800/mo
- **ROI line:** "Care.com and A Place for Mom charge per lead forever. This is an asset you own."

### 3.5 Offer 4 — **Ops Automation & Integrations** (highest margin, land after trust)
- HHAeXchange / WellSky / AxisCare / AlayaCare integrations and data syncs
- Scheduling-gap and unfilled-shift alerting
- Owner KPI dashboard: billable hours, gross margin per client, hires vs. terminations, source ROI
- Compliance document expiry tracking (TB, CPR, licenses, in-service hours)
- **Price:** $8,000–25,000 project, or $3,000–6,000/mo growth-partner retainer

### 3.6 Packaging & pricing discipline

- **Pilot offer (the closer):** one offer, 30 days, fixed fee, one named success metric.
  E.g. *"$2,500. In 30 days your applicant response time goes from 20+ hours to under 5 minutes,
  or we refund it."* Removes the "offshore vendor risk" objection better than any case study.
- **Never quote hourly.** Hourly invites comparison to $15/hr freelancers. Quote the outcome.
- **Always three tiers** on the proposal (Essential / Growth / Partner). Most pick the middle;
  the top tier makes the middle look reasonable.
- **Retainer is the business.** Builds fund the year; retainers fund the company. Target
  **≥60% of revenue from recurring** within 12 months.
- **Annual prepay discount:** 2 months free on 12-month commit. Kills churn and funds hiring.

---

## 4. The proof engine — turning two clients into twenty

This is the highest-leverage work in the whole plan, and it is *this week's* work. Do it before
sending a single cold email.

**Step 1 — Extract the numbers.** Sit with both existing clients and pull hard before/after data:

- Applicants per month, before → after
- Time-to-first-contact with an applicant, before → after
- Hires per month and cost per hire
- Inbound family inquiries per month; % after hours; % converted to assessment
- Site speed, mobile conversion rate, keyword rankings for "[city] home care"
- Hours billed per week (the number the owner actually reports to their bank)

> Even a single defensible number — *"applicant response time went from 26 hours to 4 minutes"* —
> outsells ten paragraphs of capability copy.

**Step 2 — Package three assets per client:**
1. **One-page case study** (PDF): situation → what we built → 3 numbers → owner quote.
2. **A 2-minute screen-recorded walkthrough** of the actual working system. Agency owners are
   not readers; they are watchers.
3. **A reference call slot** — get explicit permission, and ask what they're willing to say.

**Step 3 — Ask for referrals properly.** Not "know anyone?" — that gets nothing. Instead:
> "You're in the HCAOA [state] chapter. Which two owners there are always complaining about
> recruiting? Would you be okay if I mentioned we work together when I reach out?"

Offer a referral fee ($1,000 on a closed deal, or a free month of retainer). Owners refer other
owners constantly — they are not competitors when they're 40 miles apart.

**Step 4 — Publish under the vertical name.** A dedicated section on the TechLeaf site:
*"Technology for home care agencies."* Same reason our travel work needed its own identity —
the buyer needs to see themselves on the page in the first three seconds.

---

## 5. The wedge: mystery-shop audit

The single most effective cold opener in this vertical, because it is *true, specific, and about
them*. Generic "we build websites" email gets 0.5% replies. This gets 5–10%.

**How to run it (≈12 minutes per prospect, batchable):**

1. **Submit a caregiver application** on their site — Tuesday evening, ~7pm their time. Use a
   real, dedicated inbox/number. Note the exact timestamp.
2. **Submit a family "I need care for my mother" inquiry** through their contact form. Same.
3. **Call the main line after hours.** Record what happens: voicemail? answering service? nothing?
4. **Time every response.** Hours to first reply, or no reply at all. This is the headline.
5. **Score the basics:** mobile page speed, does the apply form work on a phone, number of steps,
   Google Business Profile completeness, review count vs. the top 3 local competitors, whether
   they rank for "[city] home care" and "[city] caregiver jobs".
6. **Record a 6–10 minute Loom** walking through it. Face on camera. Name the owner. Be
   respectful and useful, never mocking — these are proud operators.
7. **One-page scorecard PDF** with a red/yellow/green table and the top 3 fixes.

**Why it converts:** you have already done work for them, for free, and you are holding a number
they did not know and will not like. That is a meeting.

**Ethics & hygiene:** identify yourself honestly the moment anyone replies to a test submission,
never occupy a real caregiver's or family's slot, use a clearly dedicated test identity, and
delete the test records when done. Do not fabricate an emergency care need.

---

## 6. Lead sourcing — building the list

Target: **1,500–2,500 qualified, verified agency contacts** in the first 60 days. Sources, in
order of quality:

1. **State licensure registries (public, and the best list in the industry).**
   - NY: LHCSA / licensed home care services agency directory
   - CA: CDSS Home Care Organization (HCO) registry
   - FL: AHCA licensed facility/agency lookup
   - TX: HHSC long-term care provider search
   - NJ, PA, OH, IL, GA, AZ: equivalent state health-department directories
   These give legal name, address, license date, and administrator name. **Newly licensed
   agencies (0–18 months) are the softest targets** — they have no website, no applicant flow,
   and budget allocated.
2. **Job boards as an intent signal.** Agencies running paid caregiver ads on Indeed/ZipRecruiter
   *right now* are (a) growing and (b) in recruiting pain. Scrape/monitor weekly by metro. This
   is our highest-intent segment — prioritize it.
3. **Franchise directories.** Home Instead, Visiting Angels, Comfort Keepers, Right at Home,
   Senior Helpers, ComForCare location finders list every franchisee with a local site and phone.
   Franchisees have corporate-template sites they are usually frustrated by, and they talk to
   each other at conventions.
4. **Associations & events.** HCAOA (Home Care Association of America) national + state chapters,
   the National Alliance for Care at Home, Home Care Pulse benchmarking community, HHCN (Home
   Health Care News) events, state association annual conferences. Member directories = lists.
   Sponsoring one state chapter event ≈ the cost of one month of outbound and puts us in a room
   of 200 owners.
5. **LinkedIn Sales Navigator.** Filter: industry = Hospitals & Health Care / Individual & Family
   Services, title = Owner/President/Administrator/Director of Operations, company size 11–200,
   keyword "home care", "home health", "senior care", geography by metro.
6. **Adjacent partners (channel, §9).** Home care consultants, billing companies, staffing
   agencies, insurance brokers, franchise development reps — they all sell to our ICP already.

**Data hygiene:** verify every email (bounce rate must stay under 3% or domain reputation dies),
enrich with owner first name + city + one specific observation from the audit. Never send a
sequence to an unverified list.

---

## 7. Outbound playbooks & scripts

### 7.1 Email sequence (5 touches over 18 days, one thread)

Rules: plain text, no images, no attachments on touch 1, one link max, under 120 words, one ask.
Send from a secondary domain (e.g. `techleaf.io` for outbound, keep the primary clean), warm it
for 3 weeks, cap at 30–40 sends/mailbox/day, run 3–5 mailboxes.

**Touch 1 — the mystery shop (Day 0)**
> **Subject:** applied to [Agency] Tuesday 7:12pm
>
> Hi [First name],
>
> I applied as a caregiver on [agency].com Tuesday at 7:12pm to see what your applicants
> experience. First reply came 26 hours later.
>
> Recorded a 7-minute walkthrough of what I found — the apply form, what happens on a phone,
> and how you show up against [Competitor] for "[city] caregiver jobs": [link]
>
> No pitch in it. If it's useful, I'll show you what we built for two agencies your size.
>
> — Bilal, TechLeaf

**Touch 2 — the number (Day 3)**
> Following up on the video. The part worth 90 seconds is at 4:10 — 61% of your applicants start
> the form on a phone and drop at the resume-upload step.
>
> [Client A] had the same issue. After we rebuilt the flow: applicants up 3x, first contact under
> 5 minutes. Happy to send the one-pager.

**Touch 3 — the case study (Day 7)**
> One page on how [Client A], a [size]-caregiver agency in [city], went from [X] to [Y] hires a
> month without raising ad spend: [link]
>
> Worth 15 minutes to see if the same thing applies to [Agency]?

**Touch 4 — the other pain (Day 12)**
> Different angle: we called your main line at 8:40pm Thursday and got voicemail.
>
> Families searching at night call three agencies and go with whoever picks up. We build an
> intake agent that answers 24/7, qualifies payer source and hours, and books the assessment.
> [Client B] books ~4 extra assessments a month from after-hours calls alone.

**Touch 5 — the close-out (Day 18)**
> Last one from me — I'll assume recruiting is handled for now.
>
> If it changes, the audit and the video are yours regardless: [link]. Reply "later" and I'll
> check back in a quarter.

### 7.2 Cold call (owner-operators genuinely answer; call 8:00–9:15am or 4:30–6pm local)

> **Opener:** "Hi [Name], this is Bilal with TechLeaf. Straight up — this is a cold call. Can I
> have 30 seconds and you tell me if it's worth continuing?"
>
> **[Yes]**
>
> **Reason:** "We work with home care agencies on the two things that decide the year: applicant
> flow and after-hours family calls. I ran a quick audit on [Agency] — applied as a caregiver
> Tuesday evening, heard back a day later."
>
> **Question:** "How are you handling applicant follow-up right now — is someone chasing them, or
> does it wait until the next morning?"
>
> **[They talk. Let them. Recruiting frustration pours out.]**
>
> **Ask:** "That's exactly what we fixed for two agencies about your size. I'd rather show than
> tell — 15 minutes Thursday or Friday morning?"

**Voicemail (leave it, then email within 2 minutes referencing it):**
> "[Name], Bilal from TechLeaf. I applied as a caregiver on your site Tuesday night and want to
> tell you what happened — nothing bad, just useful. Sending a 7-minute video to your email now.
> [number]."

### 7.3 LinkedIn (best for franchisees and administrators)

- **Connection request, no pitch:** "Hi [Name] — I work with home care agencies on caregiver
  recruiting funnels. Following along."
- **After accept, wait 2 days, then:** "Not selling anything today. I run free 10-minute audits
  on agency apply flows — I mystery-shop the form and show what applicants actually hit on
  mobile. Want me to run one on [Agency]?"
- **Post 3×/week** in-feed: one number, one screenshot, one lesson from real work. Owner-operators
  lurk. Franchise owner Facebook groups matter even more than LinkedIn — get invited by clients.

### 7.4 Compliance for outreach

- **CAN-SPAM:** accurate from/subject lines, a real physical address, working one-click opt-out
  honored within 10 days. B2B cold email is legal in the US when these hold.
- **Cold calling:** business-to-business calls are permitted, but scrub against the National DNC
  for numbers registered as residential (many small agency owners use cell numbers), and respect
  state calling-hour rules.
- **SMS:** do **not** cold-text prospects. TCPA exposure is real and expensive. SMS only after
  express written consent — which is exactly what the apply flows we build collect *for clients*.
- **HIPAA:** never touch client PHI during sales. The mystery shop must use fictional-but-labeled
  test data, never a real patient scenario.

---

## 8. Objection handling

| Objection | Response |
|---|---|
| **"We already have a website."** | "Understood — this isn't a redesign pitch. The question is what happens between 6pm and 8am when a caregiver applies or a daughter calls. Right now on your site: nothing. That's the gap." |
| **"You're overseas / offshore."** | "Fair concern. Three things: a US number and a named person you reach, daily overlap 8am–12pm ET, and a fixed-fee 30-day pilot so you can judge us on delivered work, not promises. Both current clients are US agencies — talk to either." |
| **"Too expensive."** | "One 20-hour/week private-pay client is about $34,000 a year in billings. This is $1,100 a month. What's the number of new clients per year at which this is obviously worth it — and is that number bigger or smaller than one and a half?" |
| **"We use HHAeXchange/WellSky — can you work with that?"** | "Yes — we don't replace it. We sit in front of it: intake and applicants come in clean, and hand off to the system you already run payroll and EVV through." |
| **"HIPAA?"** | "We sign a BAA before touching anything with PHI. Most of what we build — apply flows, marketing site, intake qualification — is scoped to stay outside PHI on purpose." |
| **"Send me some information."** | "I'll send one page. But the useful thing is the audit I already recorded on your agency — 7 minutes, specific to you. Can I text you the link now?" |
| **"Corporate handles our marketing."** (franchisee) | "Corporate handles the brand site. Recruiting in [city] is your P&L, and the template doesn't do local applicant follow-up. That's where we work — and it doesn't conflict with the franchise agreement." |
| **"Not the right time."** | "Understood. When you next post a caregiver job, that's the moment this matters. Can I check in then — and should I put you down for [Q]?" |

---

## 9. Channel & partnership plays (compounding, start in month 2)

1. **Referral fees to consultants.** Home care startup consultants, licensure consultants, and
   billing companies advise dozens of agencies. $1,000/closed deal or 10% of first-year retainer.
2. **Franchise-level entry.** Land 3–4 franchisees of the *same* brand, then approach the
   franchisor about becoming a preferred vendor in their supplier directory. One approval = an
   inbound channel of hundreds of units.
3. **Association sponsorship.** One state HCAOA chapter sponsorship + a talk titled
   *"What we learned mystery-shopping 100 agency websites"* — deliver real data, sell nothing on
   stage. Best lead-gen per dollar in this vertical.
4. **Software-adjacent partners.** Agencies implementing AxisCare/AlayaCare need integration help
   the vendor won't do. Get on implementation partners' radar.
5. **Content moat.** Publish the mystery-shop dataset quarterly:
   *"We applied to 100 home care agencies. 61% never replied."* That's a press-able stat, and
   Home Health Care News covers this kind of thing. It also makes every cold email warmer.

---

## 10. Trust plays (specific to selling US healthcare services from India)

Handle these before objections, not after:

- US phone number, US-hours calendar, one named account owner with a face and a LinkedIn.
- Signed BAA template and a one-page security posture doc ready to send unprompted.
- Two reference clients willing to take a call — the single strongest asset we have.
- Fixed-fee pilots, never open-ended time-and-materials, on the first engagement.
- Weekly Loom updates during delivery. Owner-operators are not going to read a Jira board.
- Contract with clear IP assignment, data handling, and a 30-day out on retainers. Confidence
  sells; lock-in reads as fear.

---

## 11. Sales process, funnel math & targets

### 11.1 Pipeline stages (keep it to six; use a real CRM — HubSpot free tier or Pipedrive)

| Stage | Exit criteria |
|---|---|
| 1. Sourced | Verified contact + agency qualifies on ICP filters |
| 2. Audited | Mystery shop run, video + scorecard recorded |
| 3. Engaged | Replied / connected / answered the call |
| 4. Discovery | 20-min call held; pain, payer mix, current numbers, budget owner confirmed |
| 5. Proposal | Three-tier proposal or pilot offer sent, walked through live (never emailed cold) |
| 6. Closed–Won | Signed + deposit received |

Discipline rules: no proposal without a discovery call; every call ends with a scheduled next
step on the calendar; every deal has a named champion *and* a confirmed signer.

### 11.2 Funnel math (per month, one full-time seller + audit support)

| Metric | Target | Notes |
|---|---|---|
| Contacts added | 600 | verified, ICP-filtered |
| Audits recorded | 120 | prioritize job-board-intent + newly licensed |
| Emails sent | 2,400 | 600 contacts × 4 touches |
| Calls dialed | 400 | |
| Replies / conversations | 60 | ~5% blended with the audit hook |
| Discovery calls held | 15 | ~25% of conversations |
| Proposals presented | 8 | |
| **Closed–Won** | **2–3** | mix of pilots and full builds |

**Steady-state economics at that rate:** ~2.5 wins/month → **~30 clients in year one** is the
ceiling if nothing churns; plan realistically for **12–18 retained clients in 12 months** at an
average $1,200/mo retainer + one build each. That's roughly **$220k–$330k ARR-equivalent** with
build revenue on top. The lever that matters most is not more emails — it is **retention and
referral density inside the vertical**.

### 11.3 90-day execution plan

**Weeks 1–2 — Foundation (no outbound yet)**
- Extract real numbers from both existing clients; write 2 case studies + 2 walkthrough videos
- Ask both for referrals and for reference-call permission
- Stand up outbound domain + 3 mailboxes; begin warming
- Build the vertical landing page: *Technology for home care agencies*
- Write the audit scorecard template and record 3 practice audits
- Choose CRM, build the 6 stages, define the disqualify rules

**Weeks 3–4 — First list & first blood**
- Build list #1: 300 agencies in our existing clients' metros (local reference = highest close rate)
- Run 60 audits; launch email sequence + 40 dials/day
- Target: 10 conversations, 4 discovery calls, **1 pilot closed**
- Post 3×/week on LinkedIn from day one

**Weeks 5–8 — Scale the machine**
- List #2: 600 agencies filtered by *active caregiver job ads* (highest intent)
- List #3: newly licensed agencies (last 18 months) from state registries
- Systematize the audit — template, checklist, target 12 minutes each
- Approach 5 consultants/partners with the referral offer
- Book one state association event for Q+1
- Target: **3–4 clients closed**, first case study from a *new* client in flight

**Weeks 9–12 — Compound**
- Publish the mystery-shop dataset (aim for 100+ agencies audited) as a public report; pitch it to
  Home Health Care News and post it in owner groups
- Franchise play: identify the brand where we have the most traction, approach corporate
- Convert every won pilot to a retainer; run a referral ask on each at day 45
- Target: **cumulative 6–9 clients, ≥60% on recurring**

### 11.4 Scoreboard (review every Monday, 30 minutes, no exceptions)

Leading: audits recorded · dials · sequence sends · conversations · discovery calls booked
Lagging: proposals presented · win rate · new MRR · average deal size · cash collected
Health: reply rate by segment · bounce rate (<3%) · time from audit → conversation · churn ·
referrals generated per client · **case studies produced per quarter** (target ≥2)

---

## 12. Risks & how we blunt them

| Risk | Mitigation |
|---|---|
| Both reference clients churn → proof collapses | Over-serve them. Monthly value report showing their numbers. They are marketing assets, not just revenue. |
| Domain reputation burned by aggressive sending | Separate outbound domain, warmed mailboxes, verified lists, hard cap per mailbox, monitor bounce/spam rates weekly |
| Audits eat all our time | Cap at 12 min, template the scorecard, only audit ICP-qualified prospects, batch on a fixed day |
| Custom work per client kills margin | Productize hard — one recruiting-funnel codebase, one intake agent, configured per client. Reuse is the entire profit model. |
| "Offshore" objection blocks late-stage deals | Fixed-fee pilot + reference call + US number + BAA. Address it on the discovery call before they raise it. |
| We drift back to generalist work (travel sites, random builds) | Take the work if it pays, but ring-fence one person's full time on the vertical. Verticals die from dilution, not competition. |
| Compliance misstep in outreach | Follow §7.4. No cold SMS. No PHI in sales. |

---

## 13. Do this week

1. Get the before/after numbers out of both existing clients. **Nothing else in this plan works without them.**
2. Record the two case-study videos and write the two one-pagers.
3. Ask both clients for two referrals each and permission to use their name.
4. Register + warm the outbound domain and mailboxes.
5. Build list #1: 300 agencies in those same metros.
6. Record 10 mystery-shop audits and send the first sequence.

The compounding asset here is **case studies × references × reusable code**, all inside one
vertical. Three more home care clients makes the fourth easy; three clients across three
unrelated industries makes the fourth exactly as hard as the first.
