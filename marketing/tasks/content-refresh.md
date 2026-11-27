# Task: content-refresh

Agents: analyst, content-writer, fact-checker

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: Latest Search Console export. Candidate pages: position 8 to 20, or impressions falling, or older than 12 months.

Steps:
1. Pick at most three pages. For each, read the current page, compare it with the queries that bring impressions, and list what is missing or out of date (prices, timings, fees, links).
2. Draft the changes as a before and after patch in `marketing/drafts/refresh/YYYY-MM-DD-<page>.md`. Do not edit site files.
3. Check every changed fact against `marketing/facts.md` and the data files with the fact-checker agent.
4. Note the date to show as "last reviewed"; do not claim a refresh that did not change anything.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
