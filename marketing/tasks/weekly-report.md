# Task: weekly-report

Agents: analyst, seo-strategist

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: Search Console CSV exports in `marketing/inputs/gsc/`; the previous report in `marketing/drafts/weekly-report/`.

Steps:
1. Use the analyst agent to write the report (period versus previous period, by country, page type and query intent).
2. Use the seo-strategist agent to turn the report into at most five ranked next actions.
3. Save one file: `marketing/drafts/weekly-report/YYYY-MM-DD.md`.
4. If there is no new export, write a two-line file saying so. Do not invent data.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
