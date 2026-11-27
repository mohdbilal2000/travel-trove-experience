# Task: citations-checklist

Agents: outreach-drafter

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: `docs/listings-kit.md`.

Steps:
1. For each platform in the kit, say what is needed to create or fix the profile and which exact name, address, phone and description to use.
2. List fields that must be filled by a person (verification codes, photos).
3. Save `marketing/drafts/citations/YYYY-MM-DD.md`.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
