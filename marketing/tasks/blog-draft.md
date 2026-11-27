# Task: blog-draft

Agents: content-writer, fact-checker

Before starting read `marketing/POLICY.md` and `marketing/facts.md`.

Input: Run input: a topic or target query, and optionally the page it should support. If empty, pick the query with the most impressions and no matching page from the latest export.

Steps:
1. Check the site for an existing page that already answers the query (`app/`, `data/blogPosts.ts`). If one exists, switch to the content-refresh task instead and say so.
2. Use the content-writer agent to draft 900 to 1,400 words. Direct answer first, specific detail from the site's data, real FAQ questions, internal links from `marketing/facts.md`, placeholders for guide notes, photos and guest questions.
3. Use the fact-checker agent. Apply its corrections.
4. Save `marketing/drafts/blog/YYYY-MM-DD-<slug>.md` with the front matter required by the guard.
5. Run `node marketing/scripts/guard.mjs` and fix every error.

Output goes only under `marketing/drafts/`. Every file needs the front matter `status`, `sources`, `human_review: pending`.
Finish by running `node marketing/scripts/guard.mjs` and fixing every error. Never publish, post, send or schedule anything.
