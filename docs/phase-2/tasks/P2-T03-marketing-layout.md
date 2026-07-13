# P2-T03: Build `MarketingLayout` Shell

**Task ID:** P2-T03  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-03  
**Parent:** [phase-2-tasks.md](../phase-2-tasks.md)  
**Depends on:** [P2-T01](./P2-T01-marketing-tokens.md), [P2-T02](./P2-T02-manrope-font.md)  
**Blocks:** P2-T07, all section components

---

## Quick reference

| Field | Value |
|-------|-------|
| **Root component** | [`components/marketing/MarketingLayout.tsx`](../../../components/marketing/MarketingLayout.tsx) |
| **Theme attribute** | `data-marketing-theme="dark"` |
| **Background** | `bg-mm-background` (`#060e20`) |
| **Structure** | Nav → `<main>` → Footer |

---

## Files created

| File | Role |
|------|------|
| [`MarketingLayout.tsx`](../../../components/marketing/MarketingLayout.tsx) | Theme root + composition |
| [`MarketingNav.tsx`](../../../components/marketing/MarketingNav.tsx) | Sticky anchor nav ([P2-T04](./P2-T04-marketing-nav.md)) |
| [`MarketingFooter.tsx`](../../../components/marketing/MarketingFooter.tsx) | Marketing footer ([P2-T05](./P2-T05-marketing-footer.md)) |

---

## Layout structure

```tsx
<div data-marketing-theme="dark" className="min-h-screen bg-mm-background ...">
  <MarketingNav />       {/* fixed h-16 */}
  <main className="pt-16">{children}</main>
  <MarketingFooter />
</div>
```

| Rule | Implementation |
|------|----------------|
| Theme scope | `data-marketing-theme="dark"` activates P2-T01 CSS vars |
| No overflow lock | No `h-screen overflow-hidden` |
| Fixed nav offset | `main` has `pt-16` (64px) |
| Body font | `font-body` (Inter) on layout root |
| Headlines | Sections use `font-display` (Manrope) |

---

## Explicit exclusions (P1-T19)

Not imported in marketing shell:

- `Hero`, `ConditionalOverlays`, `CustomCursorFollower`
- `HomeSectionProvider`, cursor/onboarding providers
- Legacy `#0a0a14` backgrounds

---

## Stubs vs follow-up tasks

Nav and footer are implemented in [P2-T04](./P2-T04-marketing-nav.md) and [P2-T05](./P2-T05-marketing-footer.md).

---

## Usage (P2-T07)

```tsx
import { MarketingLayout } from '@/components/marketing/MarketingLayout';

export default function HomePage() {
  return (
    <MarketingLayout>
      {/* 10 sections */}
    </MarketingLayout>
  );
}
```

Not wired to [`app/page.tsx`](../../../app/page.tsx) until P2-T07.

---

## Acceptance criteria checklist

- [x] `MarketingLayout.tsx` with `data-marketing-theme="dark"`
- [x] `min-h-screen`, `bg-mm-background`, `text-mm-on-background`
- [x] Nav + `<main>` + footer composition
- [x] No Hero / overlay / cursor imports
- [x] No `h-screen overflow-hidden` on layout root
- [x] `main` clears fixed nav (`pt-16`)

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | Marketing layout shell approved | 2026-07-03 |

**P2-T03 status:** Done. Proceed to [P2-T04](./P2-T04-marketing-nav.md) or [P2-T08](./P2-T08-section-primitives.md).

---

## Downstream handoff

| Task | Uses from this work |
|------|---------------------|
| P2-T04 | Replace nav stub with full sticky nav |
| P2-T05 | Expand footer if needed |
| P2-T07 | Wrap homepage sections in `MarketingLayout` |
| P2-T13+ | Sections render as `children` of `<main>` |
