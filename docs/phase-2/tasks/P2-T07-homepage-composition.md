# P2-T07: Compose `app/page.tsx` (Replace Hero)

**Task ID:** P2-T07  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-03  
**Parent:** [phase-2-tasks.md](../phase-2-tasks.md)  
**Depends on:** P2-T03–T06, P2-T13–T23, P2-T20  
**Blocks:** P2-T26, P2-T27

---

## Quick reference

| Field | Value |
|-------|-------|
| **Page** | [`app/page.tsx`](../../../app/page.tsx) |
| **Layout shell** | [`MarketingLayout`](../../../components/marketing/MarketingLayout.tsx) |
| **Theater lazy load** | [`MarketingTheaterSections`](../../../components/marketing/MarketingTheaterSections.tsx) |
| **Root shell follow-up** | [`RootAppShell`](../../../components/layout/RootAppShell.tsx) (slim `/` branch) |

---

## Goal

Wire all 10 marketing sections in frozen order inside `MarketingLayout`, replacing the legacy `Hero` fullscreen page.

---

## Section order (locked, P1-T02)

| # | Anchor | Component |
|---|--------|-----------|
| 1 | `#hero` | `HeroSection` |
| 2 | `#problem` | `ProblemSection` |
| 3 | `#how-it-works` | `HowItWorksSection` |
| 4 | `#connect` | `ProductTheaterConnect` (dynamic) |
| 5 | `#focus` | `ProductTheaterFocus` (dynamic) |
| 6 | `#execute` | `ProductTheaterExecute` (dynamic) |
| 7 | `#features` | `FeatureGridSection` |
| 8 | `#integrations` | `IntegrationsSection` |
| 9 | `#trust` | `TrustSection` |
| 10 | `#cta` | `FinalCTASection` |

---

## What changed

### `app/page.tsx`

- Removed `Hero` import and `#0a0a14` / `h-screen overflow-hidden` wrapper.
- Composes `MarketingLayout` + all 10 sections.
- Metadata + JSON-LD updated per P1-T03 (covers P2-T24).
- Theater sections loaded via client wrapper (`MarketingTheaterSections`) because `next/dynamic({ ssr: false })` requires a Client Component in the App Router.

### `components/marketing/MarketingTheaterSections.tsx` (new)

- `'use client'` wrapper with `next/dynamic` for Connect, Focus, Execute.
- Satisfies P2-T20 code-splitting without making the page a Client Component.

### `components/layout/RootAppShell.tsx` (P2-T06 follow-up)

- Marketing branch on `/` now returns `{children}` only.
- Removed interim `UIOverlayProvider` + `DashboardViewModeRoot` (no longer needed without Hero).

---

## Acceptance criteria

- [x] 10 sections render in order with correct `id` anchors
- [x] Legacy `Hero.tsx` not imported
- [x] Page scrolls normally (no overflow hidden)
- [x] Theater chunks use `next/dynamic({ ssr: false })`
- [x] Homepage metadata + JSON-LD match P1-T03

---

## Bundled implementation

P2-T07 composition landed together with the section components and shared primitives they depend on:

| Task | Deliverable |
|------|-------------|
| P2-T08 | `MarketingSection.tsx`, `ProductFrame.tsx` |
| P2-T09–T11 | `lib/marketing-*.ts` |
| P2-T12 | `WaitlistForm.tsx` |
| P2-T13–T16 | Hero, Problem, HowItWorks, FinalCTA sections |
| P2-T17–T19 | Static theater sections |
| P2-T20 | `MarketingTheaterSections.tsx` |
| P2-T21–T23 | Feature grid, Integrations, Trust |
| P2-T24 | Metadata + JSON-LD in `page.tsx` |

---

## Verification

```bash
npm run build   # compiles; may fail on missing Resend API key for /api/contact (pre-existing)
npm run dev     # manual: scroll all 10 sections, test nav anchors
```

---

## Next steps

- **P2-T26:** Lighthouse verification on new homepage
- **P2-T27:** Phase 2 sign-off
