# Task: schema-geo-audit

Agents: schema-geo-auditor

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: The codebase.

Steps:
1. Run the schema-geo-auditor agent over the whole site.
2. Save `marketing/drafts/audits/YYYY-MM-DD-schema-geo.md` with severity, file, problem and fix.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
