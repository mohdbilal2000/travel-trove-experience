# Task: gbp-weekly-posts

Agents: gbp-manager, fact-checker

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: Run input: which photos are available and have guest consent. Recent posts are in `marketing/drafts/gbp/`.

Steps:
1. Draft one post for this week plus the next three, each about a different page and a different angle. Never repeat an angle from the last eight posts.
2. Each post: text under 1,500 characters, button text, UTM link, which photo, and a consent note.
3. Run the fact-checker agent, then `node marketing/scripts/guard.mjs`.
4. Save `marketing/drafts/gbp/YYYY-MM-DD.md`. A person posts them; nothing is scheduled by an agent.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
