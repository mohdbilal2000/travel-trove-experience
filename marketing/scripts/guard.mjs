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
const blogMode = process.argv.includes("--blog");
const files = args.length ? args : walk(blogMode ? "content/blog" : "marketing/drafts");
const config = JSON.parse(read("marketing/config.json") || "{}").blog || {};


// ---- blog-specific gates (content/blog/*.md auto-publish when these pass) ----------------------
const slugsIn = (f) => new Set([...read(f).matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]));
const knownBlogSlugs = new Set([...slugsIn("data/blogPosts.ts"), ...walk("content/blog").map((f) => basename(f, ".md"))]);
const planIds = new Set(readdirSync("data/plans").flatMap((f) => [...read(join("data/plans", f)).matchAll(/^\s*id:\s*(\d+)/gm)].map((m) => m[1])));
const landing = read("data/landingPages.ts") + read("data/countries.ts");
const routeOk = (path) => {
  const [seg, rest] = path.split("/").filter(Boolean);
  if (!seg) return true;
  if (seg === "blog" && rest) return knownBlogSlugs.has(rest);
  if (seg === "plans" && rest) return planIds.has(rest);
  return existsSync(join("app", seg)) || landing.includes(`"${seg}"`) || landing.includes(`'${seg}'`);
};
const weekly = [];
function checkBlog(file, fmText, body) {
  const meta = {};
  for (const l of fmText.split("\n")) { const m = l.match(/^([A-Za-z]\w*):\s*(.*)$/); if (m) meta[m[1]] = m[2].trim(); }
  for (const k of ["title", "excerpt", "publishedDate", "image", "category", "quickAnswer", "audience"]) if (!meta[k]) report(file, "ERROR", `front matter lacks "${k}:"`);
  if (meta.title && meta.title.length > 70) report(file, "WARN", `title is ${meta.title.length} characters; keep it under about 65`);
  if (meta.excerpt && (meta.excerpt.length < 80 || meta.excerpt.length > 200)) report(file, "WARN", `excerpt is ${meta.excerpt.length} characters; aim for 100 to 160`);
  if (meta.publishedDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.publishedDate)) report(file, "ERROR", `publishedDate must be YYYY-MM-DD`);
    else if (meta.publishedDate > new Date().toISOString().slice(0, 10)) report(file, "ERROR", `publishedDate ${meta.publishedDate} is in the future`);
    else weekly.push({ file, d: Date.parse(meta.publishedDate) });
  }
  if (meta.image && !existsSync(join("public", meta.image))) report(file, "ERROR", `image ${meta.image} does not exist in public/`);
  const srcs = (fmText.match(/https:\/\/[^\s|]+/g) || []);
  if (new Set(srcs).size < (config.minSources || 2)) report(file, "ERROR", `needs at least ${config.minSources || 2} distinct https sources (official or primary), found ${new Set(srcs).size}`);
  const words = body.split(/\s+/).filter(Boolean).length;
  if (words < (config.minWords || 900)) report(file, "ERROR", `only ${words} words; minimum ${config.minWords || 900}`);
  const links = [...body.matchAll(/\]\((\/[^)\s#]*)/g)].map((m) => m[1]);
  if (links.length < 2) report(file, "ERROR", `needs at least 2 internal links (found ${links.length})`);
  for (const l of links) if (!routeOk(l)) report(file, "ERROR", `internal link ${l} does not resolve to a page`);
  if (!/^##\s+FAQ\s*$/m.test(body)) report(file, "ERROR", `needs a "## FAQ" section with ### questions`);
  if (/[\u{1F300}-\u{1FAFF}\u2705\u274C]/u.test(body)) report(file, "WARN", `contains emoji; keep articles plain`);
  if (/\b(in conclusion|in today's fast-paced|unlock the|delve|tapestry|bustling)\b/i.test(body)) report(file, "WARN", `contains stock AI phrasing; rewrite in a concrete voice`);
  if (/^author:/m.test(fmText) && !/^author:\s*Guide India Tours\s*$/m.test(fmText)) report(file, "ERROR", `author must be "Guide India Tours" (generated posts are not signed with a person's name)`);
}

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
  const isBlog = file.replace(/\\/g, "/").startsWith("content/blog/");
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) report(file, "ERROR", "missing front matter");
  else if (isBlog) checkBlog(file, fm[1], body);
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

if (blogMode) {
  const cap = config.maxPostsPerWeek || 2;
  for (const { file, d } of weekly) {
    const inWindow = weekly.filter((o) => o.d <= d && d - o.d < 7 * 86400000).length;
    if (inWindow > cap) report(file, "ERROR", `${inWindow} posts in the 7 days ending on its date; cap is ${cap} per week`);
  }
}
console.log(`\nChecked ${files.length} file(s): ${errors} error(s), ${warnings} warning(s). Allowed price points: ${allowedPrices.size}.`);
process.exit(errors ? 1 : 0);
