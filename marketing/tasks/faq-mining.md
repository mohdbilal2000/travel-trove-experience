# Task: faq-mining

Agents: analyst, content-writer

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: The Queries sheet of the latest Search Console export.

Steps:
1. Collect real question-shaped queries (who, what, when, how, can, is, does) with impressions.
2. Group them by topic and mark which already have an answer on the site.
3. For each unanswered group draft a two to four sentence answer from `marketing/facts.md` and a suggested page for it.
4. Save `marketing/drafts/faq/YYYY-MM-DD.md`.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
