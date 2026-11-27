# Marketing agents: what they may and may not do

This system drafts, audits and monitors around the clock. Anything that leaves the repository
(a published page, a Reddit comment, an email, a Google Business Profile post) is released by a
human. That is not caution for its own sake. The research below is why.

## Hard rules

1. **Nothing is published automatically.** Agents open pull requests that only touch
   `marketing/drafts/`. A person reviews, edits and merges.
2. **No invented facts.** Every claim comes from `marketing/facts.md` or the site's data files.
   Prices are never typed: they come from `data/plans/*.ts`. `marketing/scripts/guard.mjs`
   fails any draft that breaks this.
3. **No fake or undisclosed voices.** No sock-puppet accounts, no fake reviews, no replies that
   pose as unrelated users. Community replies are drafted with a disclosure line and posted by a
   real person from a real account.
4. **No bulk AI pages.** Quality over volume: at most two new blog posts a week, each with
   something only the company can supply (a guide's observation, a real guest question, a photo).
5. **No link schemes.** Links come from real partnerships, listings, guest contributions and press.

## Why (sources, checked 27 Nov 2026)

- **Google, scaled content abuse.** Google's spam policy targets many pages generated mainly to
  manipulate rankings, whether made by automation, humans or both. AI use is judged by volume
  and intent, not by the tool. Source: [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies).
- **Google, site reputation abuse ("parasite SEO").** Publishing third-party content on an
  established site mainly to borrow its ranking strength. Google clarified in November 2024 that
  third-party content alone is not a violation; exploiting the host's ranking signals is. Source:
  [Updating our site reputation abuse policy](https://developers.google.com/search/blog/2024/11/site-reputation-abuse).
  The legitimate version is a disclosed, relevant guest contribution or partnership on a site whose
  audience actually cares about the topic.
- **Reddit.** Self-promotion rules are set per subreddit, and trade press reports Reddit now uses
  AI to flag coordinated accounts, repeated phrasing and inhuman posting cadence. Reddit
  is a source for AI answer engines, so planted comments are a visibility and brand-safety risk.
  Sources: [eMarketer](https://www.emarketer.com/content/reddit-geo-crackdown-could-raise-stakes-ai-visibility-strategies),
  [TechWyse](https://www.techwyse.com/news/platform-updates/reddit-ai-spam-brand-safety-risk),
  [Redship](https://redship.io/blog/reddit-self-promotion-rules-2026). These are secondary sources.
  Read the subreddit's own rules before any post.
- **Wikipedia.** Editing about your own business is a conflict of interest and external links
  there are `nofollow`. Not a channel.

## What is automated, and what is not

| Automated, no human needed | Drafted by agents, released by a human |
|---|---|
| Claim and price checks on drafts | Blog posts and page updates |
| Weekly Search Console report | Google Business Profile posts, Q&A, review replies |
| IndexNow pings after content changes | Outreach emails and partnership pitches |
| Internal link and schema audits | Reddit, Quora and forum replies (disclosed) |
