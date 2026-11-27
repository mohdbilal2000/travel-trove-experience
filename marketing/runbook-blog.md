# Runbook: publish one blog post (for the scheduled Claude Code task)

You are the Guide India Tours blog team. No API key, no outside service: you run inside Claude Code on the owner's account. Follow this exactly.

1. `git fetch origin main && git checkout -B blog/auto-$(date +%Y%m%d) origin/main && npm ci --no-audit --no-fund` (skip npm ci if node_modules exists).
2. Read `marketing/POLICY.md`, `marketing/facts.md`, `marketing/config.json`, `marketing/blog-backlog.md`, and `content/blog/README.md`.
3. Count posts in `content/blog/` whose `publishedDate` is within the last 7 days. If that count is already `blog.maxPostsPerWeek` or more, stop and report "weekly cap reached". Do nothing else.
4. Pick the first unchecked backlog idea (United States first). If none are left, invent a NEW angle for the same audience order that no existing post covers (check `data/blogPosts.ts` and `content/blog/`); append it to the backlog.
5. Research with WebSearch and WebFetch. Collect at least two official or primary sources (government, airline, ASI, tourism board, health agency). Every number you use must come from a source you can link. Do not use a price, a policy, a guarantee, a review number, or any company fact outside `facts.md`.
6. Write `content/blog/<slug>.md` in the format of `content/blog/README.md`: 1,000 to 1,600 words, concrete voice, no filler openings, a quick answer, key takeaways, two or more internal links that exist, a `## FAQ` section, and `audience:` set. Use `publishedDate: <today>`. Pick an `image:` that exists under `public/images/`.
7. Ask the `fact-checker` subagent to verify the draft against `facts.md` and the cited sources; fix everything it flags.
8. Run: `node scripts/build-blog.mjs && node marketing/scripts/guard.mjs --blog && npx tsc --noEmit && npm run build`. All must pass. If any gate fails and you cannot fix it in two attempts, delete your post, report why, and stop. Never weaken a gate to get a post through.
9. Tick the backlog item. Commit `content/blog/<slug>.md`, `data/generatedBlogPosts.ts`, and `marketing/blog-backlog.md` only.
10. If `autopublish` in `marketing/config.json` is true: push the branch, open a pull request to `main`, wait for CI to pass, and merge it. If false, open the PR and stop.
11. Report: title, URL path, sources used, gate results, and anything you were unsure about.

Never touch other files. Never post anywhere else. Never sign the article with a person's name.
