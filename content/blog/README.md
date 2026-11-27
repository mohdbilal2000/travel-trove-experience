# content/blog

One markdown file per article. `node scripts/build-blog.mjs` turns them into `data/generatedBlogPosts.ts`, which the site merges with the hand-written posts. `node marketing/scripts/guard.mjs --blog` is the publish gate.

Front matter (between `---` lines): `slug`, `title` (under 65 characters), `excerpt` (100 to 160), `publishedDate` (YYYY-MM-DD, not in the future), `category`, `audience`, `image` (a file under `public/`), `tags` (`a | b`), `relatedPlans` (`1 | 2`), `relatedDestinations`, `faqQuestion`, `quickAnswer`, `takeaways:` (list of `- item`), `sources:` (list of `- https://...`, at least two), `human_review: auto-gated`.

Body: markdown, 900+ words, at least two internal links that resolve, and a final `## FAQ` with `### Question` headings.
