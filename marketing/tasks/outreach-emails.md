# Task: outreach-emails

Agents: outreach-drafter, fact-checker

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: A prospects file from the outreach-prospects task.

Steps:
1. Draft one personalised email per prospect, under 120 words, leading with value.
2. Run the fact-checker agent and the guard.
3. Save `marketing/drafts/outreach/YYYY-MM-DD-emails.md`. A person sends them one by one.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
