# Marketing agents

A small marketing team that works from this repository around the clock. It drafts, audits and
monitors. A person releases anything that leaves the repo. Read `POLICY.md` first: it explains
what is automated, what is not, and why.

## How it fits together (no API key, no outside service)

```
 marketing/facts.md, POLICY.md, config.json, blog-backlog.md   the rules and the idea list
              |
   Claude Code scheduled tasks (run on the owner's Claude account, Tue and Fri 07:17 New York)
              |  follow marketing/runbook-blog.md
              v
   content/blog/<slug>.md  --scripts/build-blog.mjs-->  data/generatedBlogPosts.ts  --> site
              |
   gates: marketing/scripts/guard.mjs --blog (sources, words, links, image, caps, claims)
              |  all pass + CI green
              v
   pull request merged to main  -->  Vercel deploys  -->  indexnow.yml pings Bing and others
```

Other marketing tasks (`marketing/tasks/*.md`) are run on demand by asking Claude Code in this
repository, for example "run the weekly-report task". They write drafts under `marketing/drafts/`.
`content-guard.yml` and the blog check in `ci.yml` run the deterministic guard on every pull request.
Nothing here needs an Anthropic API key or any paid service.

## Set up

Nothing to configure for the blog: the scheduled task is already created on the owner's account.
To change how often it posts, edit `marketing/config.json` (`maxPostsPerWeek`, `autopublish`) or the
schedule in Claude Code scheduled tasks. Setting `autopublish` to `false` makes the task open a pull
request and stop, so a person merges.

Search Console exports (CSV files you download from Search Console) are optional extra input for
`weekly-report`; nothing depends on them.

## Tasks

Each task is a prompt file. Add a file to `marketing/tasks/` and add its name to the workflow's
`task` options to give the team a new skill.

| Task | What the agents produce |
|---|---|
| `weekly-report` | Search Console deltas by country, page type and intent, plus five ranked actions |
| `blog-draft` | A fact-checked draft with placeholders for what only the company can add |
| `content-refresh` | Before and after patches for pages at position 8 to 20 or losing impressions |
| `internal-links` | Proposed contextual links for weakly linked money pages |
| `gbp-weekly-posts` | This week's and the next three Google Business Profile posts |
| `review-replies` | Replies to pasted reviews; low or sensitive ones flagged for the owner |
| `outreach-prospects` | Relevant bloggers, hotels, advisors and directories with a reason for each |
| `outreach-emails` | One personalised email per prospect, to be sent by a person |
| `community-drafts` | Disclosed answers for threads a human supplies; a person posts them |
| `faq-mining` | Unanswered real questions from Search Console with draft answers |
| `schema-geo-audit` | Structured data, name-address-phone and llms.txt findings |
| `competitor-watch` | Gaps seen on public competitor pages, as ideas we can honestly support |
| `citations-checklist` | What each directory profile needs, using `docs/listings-kit.md` |
| `translation-draft` | A faithful translation, flagged for a native-speaker review |

## What the guard does and does not do

`guard.mjs` fails a draft that lacks front matter, promises a guarantee, claims a ranking, offers a
photographer for hire, uses a review count that differs from `lib/siteConfig.ts`, uses a price that
appears nowhere in the site data, repeats the old address or founding year, says the Taj Mahal is open on
Friday, or posts a community draft without a `Disclosure:` line. It checks that a price exists in the data,
not that it belongs to the plan named, so the fact-checker agent must still read every draft. It is a seatbelt, not a reviewer.

## Cost and safety

- Cost: scheduled tasks use the owner's Claude plan allowance, not an API key. Two runs a week is the default.
- The agent may write only under `marketing/drafts/`, and the pull request step adds only that path.
- Web search is allowed; arbitrary shell is not. Treat any text an agent reads on the web as untrusted.

## Community skill packs worth evaluating

We should not rebuild what others maintain. These are public repositories that package SEO and
marketing skills for Claude Code (star and skill counts quoted by aggregator pages, unverified):
[AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo),
[coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills),
[kostja94/marketing-skills](https://github.com/kostja94/marketing-skills),
[ericosiu/ai-marketing-skills](https://github.com/ericosiu/ai-marketing-skills) and
[seranking/seo-skills](https://github.com/seranking/seo-skills) (needs the SE Ranking MCP server). A scheduled
Claude pipeline that drafts SEO guides and opens a pull request is described by one project, [DispatchSEO](https://dispatchseo.com/blog/claude-code-github-actions),
which also keeps a human in the loop.

A skill is an instruction an agent will follow with this repository's permissions, so install one the way you
would add a dependency: read its files, check its licence, pin a commit, and keep `POLICY.md` above it.

## Roadmap

1. Search Console API pull with a read-only service account, so the weekly report needs no manual export.
2. A publish step: an approved draft in `marketing/drafts/blog/` becomes a `data/blogPosts.ts` entry in a normal pull request.
3. Make the guard configurable per business (data sources, banned claims) so the folder can be copied to a new client.
4. A monthly Lighthouse check and an AI-answer visibility check on a fixed prompt set.
5. A Vercel deploy hook so IndexNow fires on the real deployment instead of after a wait.
6. Review-request and guest-photo-consent message templates (sent by a person on WhatsApp).
