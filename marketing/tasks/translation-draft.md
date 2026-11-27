# Task: translation-draft

Agents: content-writer, fact-checker

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: Run input: the page or post to translate and the target language.

Steps:
1. Translate faithfully; do not add claims. Keep facts, numbers, prices and policies identical to the source.
2. Use the site's own guide-language data to check which languages the company really serves (`data/multilingualGuide.ts`).
3. A native speaker must review before publishing: mark `human_review: pending` and say so.
4. Save `marketing/drafts/translations/YYYY-MM-DD-<slug>-<lang>.md` and note the hreflang pairing needed.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
