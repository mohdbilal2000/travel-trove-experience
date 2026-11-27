# Task: review-replies

Agents: gbp-manager

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: Run input: pasted reviews (reviewer first name, rating, text). Without input, do nothing.

Steps:
1. Draft a reply to each review under the gbp-manager rules.
2. Flag any review under four stars, or mentioning safety, money or a named guide, for the owner to answer personally.
3. Save `marketing/drafts/reviews/YYYY-MM-DD.md`.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
