#!/usr/bin/env node
/**
 * Deterministic claim guard for marketing drafts. No LLM, no network.
 *
 *   node marketing/scripts/guard.mjs                 # every .md under marketing/drafts
 *   node marketing/scripts/guard.mjs path/to/a.md    # specific files
 *
 * Exit code 1 when any ERROR is found. This is the gate that stops an agent from
 * inventing prices, guarantees or review counts.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

// ---- allowed numbers, taken from the site's own data -----------------------
const money = (text) => [...text.matchAll(/\$\s?([\d,]+(?:\.\d+)?)/g)].map((m) => Number(m[1].replace(/,/g, "")));
const allowedPrices = new Set();
for (const f of readdirSync("data/plans")) {
  for (const line of read(join("data/plans", f)).split("\n")) if (/^\s*price:/.test(line)) money(line).forEach((n) => allowedPrices.add(n));
}
for (const line of read("app/guide-booking/page.tsx").split("\n")) if (/price:/.test(line)) money(line).forEach((n) => allowedPrices.add(n));
const extra = read("marketing/facts.md").match(/^Allowed amounts:\s*(.+)$/m);
if (extra) money(extra[1]).forEach((n) => allowedPrices.add(n));

const cfg = read("lib/siteConfig.ts");
const reviewCount = Number((cfg.match(/count:\s*"(\d+)"/) || [])[1] || 0);
const allowedReviewNumbers = new Set([reviewCount, 400, Math.floor(reviewCount / 100) * 100]);

// ---- file discovery ---------------------------------------------------------
const walk = (dir) => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : extname(p) === ".md" && basename(p) !== "README.md" ? [p] : [];
  });
};
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const files = args.length ? args : walk("marketing/drafts");

let errors = 0;
let warnings = 0;
const report = (file, level, msg) => {
  console.log(`${level === "ERROR" ? "x" : "!"} ${level} ${file}: ${msg}`);
  level === "ERROR" ? errors++ : warnings++;
};
const negated = (text, idx) => /\b(no|not|nothing|never|cannot|can't|without|isn't|aren't)\b[^.]{0,30}$/i.test(text.slice(Math.max(0, idx - 40), idx));

for (const file of files) {
  const text = read(file);
  const body = text.replace(/^---[\s\S]*?---/, "");

  // front matter
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) report(file, "ERROR", "missing front matter (status, sources, human_review)");
  else {
    for (const k of ["status", "sources", "human_review"]) if (!new RegExp(`^${k}:`, "m").test(fm[1])) report(file, "ERROR", `front matter lacks "${k}:"`);
    const hr = (fm[1].match(/^human_review:\s*(\S+)/m) || [])[1];
    if (hr && !["pending", "approved"].includes(hr)) report(file, "ERROR", `human_review must be pending or approved, got "${hr}"`);
  }

  // guarantees
  for (const m of body.matchAll(/\bguarantee[sd]?\b/gi)) if (!negated(body, m.index)) report(file, "ERROR", `"guarantee" claim near: ...${body.slice(Math.max(0, m.index - 30), m.index + 40).replace(/\n/g, " ")}...`);
  // unsupported superlatives
  for (const re of [/#1\b/, /\bnumber one\b/i, /\bno\.?\s?1\b/i, /\bcheapest\b/i, /\blowest price\b/i, /\bworld'?s best\b/i]) {
    const m = body.match(re);
    if (m) report(file, "ERROR", `unsupported superlative "${m[0]}"`);
  }
  if (/\bbest\b/i.test(body)) report(file, "WARN", `uses "best": fine for "best time to visit", not as a ranking claim`);
  if (/\b100%/.test(body)) report(file, "WARN", `uses "100%": check it is a policy, not a boast`);
  // photographer for hire
  for (const m of body.matchAll(/\b(professional|personal|hire(d)?|book(ing)?(\s+a)?|on request)\s+photographer/gi)) if (!negated(body, m.index)) report(file, "ERROR", `photographer-for-hire claim: "${m[0]}" (we offer a photography tour, not a photographer add-on)`);
  // prices
  for (const n of money(body)) if (!allowedPrices.has(n)) report(file, "ERROR", `price $${n} is not in data/plans, the guide-booking page or facts.md "Allowed amounts"`);
  // review numbers
  for (const m of body.matchAll(/([\d,]+)\+?\s+(?:google\s+)?reviews/gi)) {
    const n = Number(m[1].replace(/,/g, ""));
    if (!allowedReviewNumbers.has(n)) report(file, "ERROR", `review count ${n} does not match siteConfig (${reviewCount})`);
  }
  // known-bad or unverified facts
  if (/since\s+2007/i.test(body)) report(file, "ERROR", `"since 2007": the site says 2004`);
  if (/31\/84A/.test(body)) report(file, "ERROR", `old address "31/84A": use 31A/110, Shamsabad Road`);
  if (/15,000/.test(body)) report(file, "WARN", `"15,000" is an unverified figure (see facts.md)`);
  // Taj Friday
  if (/taj mahal[^.]{0,80}\bopen\b[^.]{0,40}friday/i.test(body) && !/closed/i.test(body)) report(file, "ERROR", `says the Taj Mahal is open on Friday: it is closed every Friday`);
  // community drafts need a disclosure line
  if (/(^|\/)community(\/|-)/.test(file) && !/^Disclosure:/m.test(body)) report(file, "ERROR", `community draft without a "Disclosure:" line`);
}

console.log(`\nChecked ${files.length} file(s): ${errors} error(s), ${warnings} warning(s). Allowed price points: ${allowedPrices.size}.`);
process.exit(errors ? 1 : 0);
