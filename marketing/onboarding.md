# Onboarding another business or a marketing team

The pieces that belong to Guide India Tours are `facts.md`, the page list inside it, and the data
sources the guard reads (`data/plans`, `lib/siteConfig.ts`, `app/guide-booking/page.tsx`). Everything
else (policy, agents, tasks, workflows) is business-neutral.

## Access to ask for, and nothing more

| Access | Level | How |
|---|---|---|
| The site repository | Write through pull requests, not direct pushes to main | Collaborator or fork. A marketer can add blog drafts as pull requests under `marketing/drafts/` |
| Search Console | Restricted (read-only) user | Add the service account's email as a restricted user in Settings, Users and permissions |
| Analytics | Viewer | Invite by email |
| Google Business Profile | Manager, used by a person | Posts and replies are drafted by agents and pasted in by a human |
| Hosting (Vercel) | None needed for marketing | Only for a deploy hook later |

Never accept passwords. Use delegated access that can be revoked.

## Steps for a new business

1. Copy `marketing/`, `.claude/agents/` and the three marketing workflows into the repository.
2. Rewrite `facts.md`: identity, services, prices source, languages, "Never claim" and "Unverified" lists. This is the file that stops invented claims, so spend the time here.
3. Point `guard.mjs` at that business's data (a configurable guard is on the roadmap in `README.md`).
4. Add the secret and variable from `README.md`, then run `weekly-report` first.

## How a team adds work

- **Their own blog posts:** a pull request that adds a file under `marketing/drafts/blog/` with the front matter the guard needs. The guard and a reviewer check it.
- **Guest posts and partnerships on other sites:** `outreach-prospects` finds relevant hosts, `outreach-emails` drafts the pitch, a person sends it. The contributed piece is disclosed and relevant to the host's audience, which is the version Google's site reputation policy allows.
- **Reddit and forums:** a person supplies a thread, `community-drafts` drafts a disclosed answer, the same person posts it from a real account.
