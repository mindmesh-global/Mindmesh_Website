# P1-T14: Typography System (Manrope + Inter)

**Task ID:** P1-T14  
**Status:** done  
**Type:** Strategy and documentation (no code; Phase 2 wires fonts in layout)  
**Completed:** 2026-07-03  
**Parent:** [phase-1-tasks.md](../phase-1-tasks.md) | [phase-1-foundation.md](../phase-1-foundation.md) §3.3  
**Depends on:** nothing  
**Blocks:** P1-T15, P1-T16, Phase 2 `components/marketing/*`

---

## Quick reference

| Field | Value |
|-------|-------|
| **Display font** | Manrope (headlines, section titles, card titles) |
| **Body / UI font** | Inter (paragraphs, buttons, labels, nav, forms) |
| **Logo wordmark** | Asul (unchanged, Logo component only) |
| **Retired for marketing** | Syne |
| **Hero H1 token** | `display-xl`: 80px desktop, 64px tablet, 40px mobile |
| **Loading** | `next/font/google` with `display: 'swap'` |

---

## Font roles

| Role | Font | Scope | Notes |
|------|------|-------|-------|
| **Display** | Manrope | Marketing homepage, section headlines, feature page heroes | Weights 600–800 |
| **Body / UI** | Inter | Body copy, CTAs, nav, forms, eyebrows, captions | Weights 400–600 |
| **Logo** | Asul | [`Logo.tsx`](../../../components/Logo.tsx) wordmark only | Weight 700; not for marketing headlines |
| **Monospace** | System stack | Theater demo UI only (if needed) | `ui-monospace, monospace`; no webfont load |
| **Syne** | — | **Remove** from marketing | Legacy root layout variable; unused in components today |

**Principle:** Linear-style hierarchy. Fewer sizes, bigger jumps. Manrope carries weight at large sizes; Inter stays readable at 16px for long copy and UI.

---

## Syne removal vs keep

| Surface | Manrope | Inter | Syne | Asul |
|---------|---------|-------|------|------|
| New homepage (`components/marketing/*`) | Yes (display) | Yes (body/UI) | **No** | No |
| `MarketingLayout.tsx` | Yes | Yes | **No** | No |
| Feature pages (inbox, security, …) | Already used per-page | Via root body | **No** (Phase 5 cleanup) | No |
| Root [`app/layout.tsx`](../../../app/layout.tsx) | Add global load (Phase 2) | Keep | **Remove** when Hero retired | Keep for Logo |
| Legacy [`Hero.tsx`](../../../components/Hero.tsx) | N/A | N/A | Remove with Hero | N/A |
| Dashboard shell | No | Yes | No | No |
| Logo floating wordmark | No | No | No | Yes |

**Phase 2:** Add Manrope to root layout; drop `Syne` import and `--font-syne` variable.  
**Phase 5/6:** Consolidate per-page Manrope duplicates (inbox, trust, billing, etc.) onto root `--font-manrope`.

Syne is loaded in [`app/layout.tsx`](../../../app/layout.tsx) but **not referenced** elsewhere in the codebase. Safe to remove once marketing homepage replaces macOS Hero.

---

## Font loading plan

### Manrope (display)

Load once at root (Phase 2). Matches pattern already used on feature pages ([`app/inbox/page.tsx`](../../../app/inbox/page.tsx)).

```ts
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});
```

| Weight | Usage |
|--------|-------|
| 600 | Card titles (`heading`), emphasis subheads |
| 700 | Section headlines (`display-lg`), default display |
| 800 | Hero H1 (`display-xl`) optional; 700 is acceptable default |

**Trim note:** Feature pages currently load weights 200–800. Marketing needs **600, 700, 800** only. Lighter weights (200–500) are not used on marketing surfaces; omit from root load to reduce bytes.

### Inter (body / UI)

Expand root Inter config beyond default subset (Phase 2):

```ts
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});
```

| Weight | Usage |
|--------|-------|
| 400 | Body, subheads, descriptions |
| 500 | Eyebrows, captions, nav links |
| 600 | Buttons, primary CTA labels |

### Apply on marketing root

```tsx
<html lang="en" className={`${inter.variable} ${manrope.variable}`}>
  <body className="font-inter antialiased" data-marketing-theme="dark">
```

```css
[data-marketing-theme='dark'] {
  --font-display: var(--font-manrope), 'Manrope', system-ui, sans-serif;
  --font-body: var(--font-inter), 'Inter', system-ui, sans-serif;
}

.font-display {
  font-family: var(--font-display);
}
.font-body {
  font-family: var(--font-body);
}
```

Display elements: `className="font-display"`. Everything else inherits Inter from `body`.

---

## Type scale

Linear-style: **6 text tokens + button**. Values in px and rem (16px base).

| Token | Desktop | Tablet (`md`) | Mobile | Line-height | Letter-spacing | Weight | Font |
|-------|---------|---------------|--------|-------------|----------------|--------|------|
| `display-xl` | 80px / 5rem | 64px / 4rem | 40px / 2.5rem | 1.08 | -0.03em | 700 | Manrope |
| `display-lg` | 48px / 3rem | 44px / 2.75rem | 32px / 2rem | 1.1 | -0.02em | 700 | Manrope |
| `heading` | 28px / 1.75rem | 24px / 1.5rem | 24px / 1.5rem | 1.25 | -0.01em | 600 | Manrope |
| `body-lg` | 20px / 1.25rem | 20px | 18px / 1.125rem | 1.5 | 0 | 400 | Inter |
| `body` | 16px / 1rem | 16px | 16px | 1.5 | 0 | 400 | Inter |
| `body-sm` | 14px / 0.875rem | 14px | 14px | 1.45 | 0 | 400 | Inter |
| `caption` | 14px / 0.875rem | 14px | 13px / 0.8125rem | 1.4 | 0.01em | 500 | Inter |
| `button` | 16px / 1rem | 16px | 16px | 1 | 0 | 600 | Inter |

### CSS custom properties (Phase 2)

```css
[data-marketing-theme='dark'] {
  --mm-text-display-xl: clamp(2.5rem, 5vw + 1rem, 5rem);
  --mm-text-display-lg: clamp(2rem, 3vw + 0.5rem, 3rem);
  --mm-text-heading: clamp(1.5rem, 1vw + 1rem, 1.75rem);
  --mm-text-body-lg: clamp(1.125rem, 0.5vw + 1rem, 1.25rem);
  --mm-text-body: 1rem;
  --mm-text-body-sm: 0.875rem;
  --mm-text-caption: clamp(0.8125rem, 0.25vw + 0.75rem, 0.875rem);
  --mm-text-button: 1rem;

  --mm-leading-display: 1.08;
  --mm-leading-heading: 1.25;
  --mm-leading-body: 1.5;
}
```

Prefer explicit breakpoint classes in Tailwind for marketing components; `clamp()` is optional polish in Phase 6.

---

## Hero `display-xl` sizing (64px and 80px)

**Approved sizes** for H1 "The Cognitive Layer for modern work" ([P1-T03](./P1-T03-hero-copy.md)):

| Breakpoint | Size | Rationale |
|------------|------|-----------|
| **Desktop (`lg+`, ≥1024px)** | **80px** | Primary hero impact; fits ~2 lines at 720px text block width |
| **Tablet (`md`, 768–1023px)** | **64px** | Acceptance test size; prevents overflow on narrow laptop |
| **Mobile (`<768px`)** | **40px** | Readable; 2-line wrap without horizontal scroll |

P1-T03 originally listed 72px desktop; **80px is approved** as the canonical `display-xl` desktop value (foundation range 64–80px). Update hero implementation to 80px / 64px / 40px, not 72px.

### Visual check (manual QA in Phase 2)

| Test | Pass criteria |
|------|---------------|
| 80px at 1280px viewport | H1 readable, max ~2 lines, no clipping |
| 64px at 768px viewport | H1 readable, no overflow |
| 40px at 375px viewport | Full headline visible; CTAs remain above fold or one scroll |
| `text-wrap: balance` on H1 | Optional; improves multi-line headline rag |

---

## Element → token mapping (homepage)

| Section / element | Token | Font |
|-------------------|-------|------|
| Hero eyebrow | `caption` | Inter |
| Hero H1 | `display-xl` | Manrope |
| Hero subheads A + B | `body-lg` | Inter |
| Hero thesis body | `body-lg` | Inter |
| Hero CTAs | `button` | Inter |
| Section headlines (problem, theaters, features, …) | `display-lg` | Manrope |
| Section subheads | `body-lg` | Inter |
| Feature card title | `heading` | Manrope |
| Feature card description | `body` | Inter |
| Integration logo label | `body-sm` | Inter |
| Trust disclaimer | `body-sm` | Inter |
| Waitlist form labels | `body-sm` | Inter |
| Waitlist inputs | `body` | Inter |
| Sticky nav links | `caption` | Inter |
| Sticky nav CTA | `button` | Inter |

Aligns with typography tables in P1-T03 through P1-T12 task docs.

---

## Tailwind-friendly utilities (Phase 2 optional)

Add to [`tailwind.config.ts`](../../../tailwind.config.ts) `theme.extend`:

```ts
fontFamily: {
  display: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
  body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
},
fontSize: {
  'display-xl': ['5rem', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '700' }],
  'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
  heading: ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
},
```

Responsive overrides via `text-4xl md:text-[4rem] lg:text-[5rem]` on hero H1.

---

## Monospace (optional)

Use only inside product theater frames when demo UI shows code-like strings (Jira keys, email headers):

```css
--font-mono: ui-monospace, 'SF Mono', 'Cascadia Code', monospace;
```

Do not load JetBrains Mono or similar unless a theater beat requires it. PROD-142-style labels can use Inter `body-sm` with `tabular-nums` instead.

---

## Acceptance criteria checklist

- [x] Font loading plan: Manrope (600–800) + Inter (400–600) via `next/font/google`, `display: 'swap'`
- [x] Type scale with px/rem, line-heights, and weights
- [x] Syne removal rule documented (marketing + root layout Phase 2)
- [x] Hero `display-xl` approved at 80px desktop, 64px tablet, 40px mobile
- [x] Asul retained for Logo only

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | Approved Manrope + Inter scale; Syne retired for marketing | 2026-07-03 |

**P1-T14 status:** Done. Unblocks P1-T15 (layout), P1-T16 (token reference), Phase 2 marketing build.

---

## Downstream handoff

| Consumer | Uses from this doc |
|----------|-------------------|
| Phase 2 `MarketingLayout.tsx` | Font variables on root |
| Phase 2 `HeroSection.tsx` | `display-xl` 80/64/40px |
| P1-T16 token reference | Type scale consolidated |
| P1-T03 hero doc | Desktop H1 updates from 72px → 80px at implementation |
| Feature pages Phase 5/6 | Consolidate duplicate Manrope loads to root |
