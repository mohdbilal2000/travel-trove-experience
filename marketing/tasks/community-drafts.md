# Task: community-drafts

Agents: community-drafter, fact-checker

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: Run input: thread URLs and the question text, supplied by a human. Do not go looking for threads.

Steps:
1. Draft at most three answers under the community-drafter rules.
2. Each ends with a `Disclosure:` line. Add a note on which subreddit or forum rule you checked.
3. Save under `marketing/drafts/community/` (the path matters: the guard requires the disclosure line there).
4. A real person posts from a real, disclosed account.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
