# Marketing agents

A small marketing team that works from this repository around the clock. It drafts, audits and
monitors. A person releases anything that leaves the repo. Read `POLICY.md` first: it explains
what is automated, what is not, and why.

## How it fits together

```
 marketing/facts.md  ──┐  the only source of claims (prices come from data/plans)
 marketing/POLICY.md ──┤
 marketing/tasks/*.md ─┼─►  GitHub Action "Marketing agent"  ──►  Claude Code with the subagents in .claude/agents/
                       │        (manual run, weekly, monthly)            │
 marketing/inputs/     ─┘  Search Console CSV exports                     ▼
                                                              marketing/drafts/**  (only place it may write)
                                                                           │
                                          marketing/scripts/guard.mjs  ◄───┤  claim guard (no AI): prices, guarantees,
                                                                           │  review counts, addresses, Taj Friday, disclosure
                                                                           ▼
                                                              Draft pull request  ──►  a human reviews and merges
```

Separate, no AI involved: `indexnow.yml` pings Bing and other IndexNow engines when content
changes, and `content-guard.yml` runs the claim guard on every pull request that touches drafts.

## Set up (once, about ten minutes)

1. Repository secret `ANTHROPIC_API_KEY`.
2. Repository variable `MARKETING_AGENTS_ENABLED` set to `true`. Without it the agent workflow does nothing, so it is safe to merge before you are ready.
3. Settings, Actions, General: tick "Allow GitHub Actions to create and approve pull requests".
4. Put Search Console exports (CSV) in `marketing/inputs/gsc/`. A service-account pull is on the roadmap.
5. Run it: Actions, "Marketing agent", Run workflow, choose a task. Mondays it writes the weekly report by itself; on the 1st of the month it runs the schema and entity audit.

Pin third-party actions to a commit SHA before you rely on this in production.

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

- Cost is the Claude API usage of each run. Each run is capped at 40 turns and 45 minutes, and the weekly schedule runs one task. Watch the first runs in your Anthropic console before adding more schedules.
- The agent may write only under `marketing/drafts/`, and the pull request step adds only that path.
- Web search is allowed; arbitrary shell is not. Treat any text an agent reads on the web as untrusted.
- Pull requests opened with `GITHUB_TOKEN` do not start other workflows, which is why the agent workflow runs the guard itself. A personal access token or GitHub App token would let `content-guard.yml` run on them too.

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
