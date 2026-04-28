---
type: plan
status: in-progress
created: 2026-04-28
target: 2026-04-28 (tonight)
---

# Plan — Soft Launch (V1)

## Why

The Cleveland Magazine print issue with Mel on the cover is shipping this week (April 28-29 newsstand, subscriber mailboxes through ~May 6). Online publication is May 8. Anyone who Googles "Mel McGee" or "Exocognition" after picking up the print issue needs to land on a real page tonight, not a parked domain.

Soft launch is intentionally minimal. Per the superseded `~/ops/personal/projects/exocognition/tasks/2026-04-19__exocog-holding-page-build.md` notes: "Over-investment here is worse than under-investment; an over-designed page with no product behind it reads as theater."

## Scope (in)

- Single-page, single-scroll static HTML
- Hero: ExoCog wordmark + standing line from brand-strategy §10.1
- One paragraph expansion (what this is, who built it, what's next)
- Single CTA: Buttondown waitlist form
- Minimal footer (copyright, no parent-entity reference per article scope)
- Open Graph image so link previews work in iMessage / Slack / LinkedIn
- WCAG AA contrast
- Mobile-first responsive
- Cloudflare Pages deployed at `exocog.ai`

## Scope (out — defer to V2)

- Methodology page (`/operator-pattern`)
- Build journal index (`/journal`)
- Logo refinement (use wordmark text-mark until designer delivers)
- Astro migration
- Analytics dashboard
- Email auto-responder (Buttondown handles its own welcome)

## Acceptance Criteria

### Content
- [ ] Hero shows "Exocognition" as the primary mark
- [ ] Standing line from `~/ops/personal/sources/brand-strategy__source-of-truth.md` §10.1 appears verbatim
- [ ] No mention of Overthink, Inc. as parent entity (per article scope decision 2026-04-28)
- [ ] No mention of SkillSpout or WCCI (those have their own surfaces; this is the ExoCog page)
- [ ] No em-dashes in any copy (brand voice rule)
- [ ] Complete sentences only

### Visual
- [ ] Color palette matches `sources/brand-tokens.yaml` (Indigo #5860A8, Coral #D25A3C, Jade #4A635D, Dusk Sky #EFF0F8, Ink #10143A)
- [ ] Type: Inter for UI, JetBrains Mono if any code-style elements
- [ ] Mobile (375px), tablet (768px), desktop (1280px) all render correctly
- [ ] WCAG AA contrast on all text (4.5:1 normal, 3:1 large)

### Infrastructure
- [ ] Repo at `github.com/ExoCog/website`, public
- [ ] Cloudflare Pages connected, auto-deploy on push to `main`
- [ ] Custom domain `exocog.ai` resolves to deployed page
- [ ] `exocognition.ai` redirects to `exocog.ai`

### Form
- [ ] Buttondown form embedded, posts to Mel's account, success message after submit
- [ ] Form has accessible labels, keyboard navigable
- [ ] No third-party JS bloat beyond what Buttondown requires

### Verification (Verify: lines)
- [ ] **Verify:** Page loads under 2 seconds on a 4G throttled connection
- [ ] **Verify:** Lighthouse mobile performance ≥ 90, accessibility = 100, best practices ≥ 95
- [ ] **Verify:** No PII in rendered HTML — `curl https://exocog.ai | grep -iE "@gmail|@skillspout|@wcci|hubspot|melanie\.k\.mcgee"` returns empty
- [ ] **Verify:** OG image preview renders correctly when URL pasted into iMessage and Slack
- [ ] **Verify:** Form submission lands in Buttondown subscriber list
- [ ] **Verify:** Both `exocog.ai` and `exocognition.ai` resolve (latter to a 301 redirect)

## Open dependencies

- Mel creates Buttondown account → provides username for form action
- Mel connects Cloudflare Pages to GitHub repo (browser, ~5 min)
- Mel adds custom domain in Cloudflare Pages (browser, ~2 min)

## Done definition

All acceptance boxes above checked. URL is live and surveyable from any device. Form actually accepts subscribers.

## Notes

- The form action will use a `[BUTTONDOWN_USERNAME]` placeholder in V1 commit; Mel provides username, single edit + push lights it up.
- If Buttondown signup blocks tonight, the page still ships with a `mailto:hello@exocog.ai` fallback CTA so the page isn't dead on arrival. Cloudflare Email Routing already forwards `hello@exocog.ai` to Mel's personal Gmail per `brand-assets__source-of-truth.md`.
