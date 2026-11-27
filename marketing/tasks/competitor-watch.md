# Task: competitor-watch

Agents: seo-strategist

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: Run input: up to five competitor URLs. Public pages only.

Steps:
1. Read only public pages. Record what they publish that we do not: page types, questions answered, trust signals.
2. Do not copy text. Do not name competitors in anything meant for publication.
3. Turn the gaps into at most five page ideas that we can honestly support from `marketing/facts.md`.
4. Save `marketing/drafts/competitors/YYYY-MM-DD.md`.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
