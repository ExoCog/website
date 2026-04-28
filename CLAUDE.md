@~/.claude/dev-standards.md

# ExoCog Web (CLAUDE.md)

The public website for Exocognition / ExoCog. Lives at exocog.ai (canonical) with exocognition.ai redirecting in. Owned by Overthink, Inc., operated under the ExoCog brand.

## What this repo is

A static website. Tonight's V1 is a single soft-launch page; the planned hybrid V2 adds a methodology page (the operator pattern) and a build journal. Built lean — no frameworks until the page count justifies them.

## Public/private boundary

This repo is public. **Nothing private goes in here.** No prospect names, no financial data, no internal voice notes verbatim, no client context. The only voice/brand inputs are the vendored `sources/brand-tokens.yaml` and any explicitly-public copy. Cross-references back to `~/ops/` are reference-only and never imported into the build output.

## Directory structure

```
exocog-web/
├── public/             # Static assets served as-is (favicon, OG image, logo)
├── sources/            # Vendored brand tokens, copy decisions
│   └── brand-tokens.yaml
├── directives/         # Repo-specific SOPs (deploy, content, pre-launch)
├── tasks/              # Spec-driven dev plan files
├── index.html          # V1 soft launch entry point (will move to src/ when Astro is added)
├── CLAUDE.md           # This file
└── README.md
```

When the V2 hybrid expansion lands, this becomes an Astro project: `src/pages/index.astro`, `src/pages/operator-pattern.mdx`, `src/pages/journal/`. Until then, plain HTML keeps the deploy surface flat.

## Stack

- **V1 (tonight):** static HTML, Tailwind CSS via Play CDN, Buttondown form embed
- **V2 (planned):** Astro 5 + Tailwind v4 + MDX
- **Hosting:** Cloudflare Pages (free, auto-deploys from main)
- **DNS:** Cloudflare (`dean.ns.cloudflare.com` / `vida.ns.cloudflare.com`) — both `.ai` domains
- **List capture:** Buttondown (single embed, also sends the build journal when ready)
- **Analytics:** Cloudflare Web Analytics (cookieless, privacy-first)

## Working in this repo

- Brand tokens are vendored, not symlinked. When `~/ops/.../brand-tokens.yaml` updates, sync intentionally.
- All copy must pass Mel's voice rules per `sources/brand-tokens.yaml` `rules:` block: complete sentences, no em-dashes, WCAG AA contrast, light-mode-first.
- Spec-driven dev: every multi-file change ships with a plan file in `tasks/` carrying explicit `Verify:` lines per `directives/spec-driven-dev.md` (in `~/ops/`, not duplicated here).
- Public/private check before every commit: search for any `mel@`, `skillspout`, financial figure, internal voice quirk that doesn't belong public.

## Cross-repo references

These live in `~/ops/` and are reference-only — read on demand, do not import:

| What | Path in ~/ops |
|------|---------------|
| Brand strategy + standing line | `personal/sources/brand-strategy__source-of-truth.md` |
| Brand assets SoT | `personal/projects/exocognition/sources/brand-assets__source-of-truth.md` |
| Voice profile | `personal/sources/voice/voice-profile__source-of-truth.md` |
| Positioning options | `personal/projects/exocognition/deliverables/2026-04-27__public-positioning-options.md` |
| Naming architecture | `personal/projects/exocognition/deliverables/2026-04-16__naming-architecture__v1.md` |

## Deploy

Pushed to `github.com/ExoCog/website`. Cloudflare Pages watches `main` and auto-deploys to production. Preview deploys on branches. `exocog.ai` is the canonical custom domain; `exocognition.ai` redirects via Cloudflare.

## Safety

- Never commit `.env` or any secret. Buttondown is form-embed only — no API key in this repo.
- Public/private grep before push: `git diff --staged | grep -iE "skillspout|@gmail|@melanie|hubspot|prospect"` should return nothing surprising.
