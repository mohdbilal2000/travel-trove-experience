# Task: internal-links

Agents: internal-linker

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: The codebase.

Steps:
1. Run the internal-linker agent across all money pages listed in `marketing/facts.md`.
2. Output `marketing/drafts/internal-links/YYYY-MM-DD.md`: for each weak page, up to three proposed links (source file, exact sentence, anchor, target).
3. Prefer links from pages that already get impressions.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
