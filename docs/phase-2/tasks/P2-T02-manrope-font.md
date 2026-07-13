# P2-T02: Add Manrope Display Font

**Task ID:** P2-T02  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-03  
**Parent:** [phase-2-tasks.md](../phase-2-tasks.md)  
**Depends on:** [P1-T14-typography.md](../phase-1/tasks/P1-T14-typography.md), [P2-T01](./P2-T01-marketing-tokens.md)  
**Blocks:** P2-T08, all section components

---

## Quick reference

| Field | Value |
|-------|-------|
| **Display font** | Manrope (600, 700, 800) via `--font-manrope` |
| **Body font** | Inter (400, 500, 600) via `--font-inter` |
| **Retired** | Syne (removed from root layout) |
| **Tailwind** | `font-display`, `font-body`, `text-display-xl`, `text-display-lg`, `text-heading` |

---

## Files changed

| File | Change |
|------|--------|
| [`app/layout.tsx`](../../../app/layout.tsx) | Manrope + expanded Inter; Syne removed; CSS vars on `<html>` |
| [`tailwind.config.ts`](../../../tailwind.config.ts) | `fontFamily.display/body`, display type scale |
| [`app/globals.css`](../../../app/globals.css) | `.font-body` under marketing theme |

---

## Root layout wiring

```tsx
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

<html className={`scroll-smooth ${inter.variable} ${manrope.variable}`}>
  <body className={`${inter.className} ...`}>
```

| Element | Classes / vars | Effect |
|---------|----------------|--------|
| `<html>` | `--font-manrope`, `--font-inter` | CSS vars available site-wide |
| `<body>` | `inter.className` | Default UI font is Inter |
| Marketing headlines | `font-display` | Manrope via `[data-marketing-theme='dark']` or Tailwind |

---

## Tailwind utilities

From [P1-T14 § Tailwind-friendly utilities](../phase-1/tasks/P1-T14-typography.md):

| Utility | Use |
|---------|-----|
| `font-display` | Section headlines, hero H1, card titles |
| `font-body` | Explicit Inter on nested elements |
| `text-display-xl` | Hero H1 base (pair with responsive `text-*` overrides) |
| `text-display-lg` | Section headlines |
| `text-heading` | Card / subsection titles |

**Responsive hero example (P1-T14):**

```tsx
<h1 className="font-display text-[2.5rem] font-bold tracking-tight md:text-[4rem] lg:text-[5rem]">
```

---

## Syne removal

| Before | After |
|--------|-------|
| `Syne` imported in root layout | Removed |
| `--font-syne` on `<body>` | Removed |
| Used in components | Never referenced (safe delete) |

Legacy Hero routes unaffected until Phase 6 deletion.

---

## Per-page Manrope loads (Phase 5 cleanup)

**Cleared in [P5-T12](../../phase-5/tasks/P5-T12-manrope-font-consolidation.md) (2026-07-09).** Manrope loads only from root [`app/layout.tsx`](../../../app/layout.tsx).

Historical list (all removed):

- `app/inbox/page.tsx`
- `app/trust/page.tsx`
- `app/billing/page.tsx`
- `app/security/page.tsx`
- `app/upcoming-events/page.tsx`
- `app/yesterdays-narrative/page.tsx`
- `app/faq/page.tsx`, `app/connected-apps/page.tsx`, `app/sensor&mascot/page.tsx`

Root `--font-manrope` on `<html>` satisfies CSS modules using `var(--font-manrope)`.

---

## Acceptance criteria checklist

- [x] Manrope loads with `display: 'swap'` (no layout shift from invisible text)
- [x] Weights 600–800 only for Manrope; Inter 400–600
- [x] `--font-manrope` and `--font-inter` on `<html>`
- [x] Marketing theme `--font-display` / `--font-body` resolve correctly
- [x] Syne removed from root layout
- [x] Tailwind `font-display` / `font-body` utilities added

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | Manrope + Inter wired at root | 2026-07-03 |

**P2-T02 status:** Done. Proceed to [P2-T03](./P2-T03-marketing-layout.md).

---

## Downstream handoff

| Task | Uses from this work |
|------|---------------------|
| P2-T08 | `font-display` on section headings |
| P2-T13 | Hero H1: `font-display` + responsive scale |
| P2-T03 | Marketing layout inherits Inter body; headlines use `font-display` |
