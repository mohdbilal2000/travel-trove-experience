#!/usr/bin/env node
/**
 * Ping IndexNow (Bing, Yandex and others) with the site's URLs. Google does not use IndexNow:
 * for Google, rely on the sitemap and Search Console.
 *
 *   node marketing/scripts/indexnow.mjs [--sitemap URL] [--urls "u1 u2"] [--dry-run]
 *
 * The key is the public file public/<key>.txt whose name equals its content.
 */
import { readdirSync, readFileSync } from "node:fs";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const dry = process.argv.includes("--dry-run");
const site = "https://www.guideindiatours.com";
const sitemap = arg("sitemap", `${site}/sitemap.xml`);

const keyFile = readdirSync("public").find((f) => /^[a-f0-9]{32}\.txt$/.test(f) && readFileSync(`public/${f}`, "utf8").trim() === f.replace(".txt", ""));
if (!keyFile) throw new Error("No IndexNow key file found in public/");
const key = keyFile.replace(".txt", "");

let urls = (arg("urls", "") || "").split(/\s+/).filter(Boolean);
if (!urls.length) {
  const xml = await (await fetch(sitemap)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, "&"));
}
// Only ever submit our own host; a local sitemap's host is rewritten for dry runs.
urls = [...new Set(urls.map((u) => u.replace(/^https?:\/\/localhost:\d+/, site)))].filter((u) => u.startsWith(site));
if (!urls.length) throw new Error("No URLs to submit");

const payload = { host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList: urls.slice(0, 10000) };
console.log(`IndexNow: ${payload.urlList.length} URL(s), key file ${payload.keyLocation}`);
if (dry) {
  console.log("dry run, first 5:", payload.urlList.slice(0, 5));
  process.exit(0);
}
// The engines fetch the key file to prove we own the site. Fail early if it is not live yet.
const live = await fetch(payload.keyLocation).then((r) => (r.ok ? r.text() : ""), () => "");
if (live.trim() !== key) {
  console.error(`Key file is not live at ${payload.keyLocation}. Deploy first, then re-run.`);
  process.exit(1);
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});
console.log(`IndexNow response: ${res.status} ${res.statusText}`);
if (![200, 202].includes(res.status)) process.exit(1);
