# Task: outreach-prospects

Agents: outreach-drafter

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: Run input: a theme, for example 'travel bloggers who write about Agra', 'hotels in Agra and Delhi', or 'travel advisors in Spain and Mexico'.

Steps:
1. Use web search to find up to 15 relevant, active prospects for the theme.
2. Record name, URL, one specific reason they are relevant, and the published contact route. No guessed emails.
3. Save `marketing/drafts/outreach/YYYY-MM-DD-prospects.md`.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
