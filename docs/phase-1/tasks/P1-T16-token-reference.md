# P1-T16: Marketing Token Reference Sheet

**Task ID:** P1-T16  
**Status:** done  
**Type:** Strategy and documentation (Phase 2 copies into `globals.css`)  
**Completed:** 2026-07-03  
**Parent:** [phase-1-tasks.md](../phase-1-tasks.md) | [phase-1-foundation.md](../phase-1-foundation.md) §3.5  
**Depends on:** [P1-T13-color-tokens.md](./P1-T13-color-tokens.md), [P1-T14-typography.md](./P1-T14-typography.md), [P1-T15-layout-rules.md](./P1-T15-layout-rules.md)  
**Blocks:** Phase 2 `components/marketing/*` (sign-off gate)

---

## One-page reference

**Theme scope:** `[data-marketing-theme="dark"]` on [`MarketingLayout.tsx`](../../../components/marketing/MarketingLayout.tsx) root.

**Source docs:** Colors [P1-T13](./P1-T13-color-tokens.md) · Type [P1-T14](./P1-T14-typography.md) · Layout [P1-T15](./P1-T15-layout-rules.md)

---

## Marketing vs legacy (no ambiguity)

| Context | Background | Fonts | Token system | Status |
|---------|------------|-------|--------------|--------|
| **New homepage** (`components/marketing/*`) | `#060e20` (`--mm-bg`) | Manrope + Inter | Semantic `--mm-*` | **Use this sheet** |
| **Legacy macOS Hero** | `#0a0a14` | Syne variable (unused) | Ad hoc | Retire Phase 2 |
| **`globals.css` body today** | `#0a0a14` | Inter default | shadcn HSL | Override under marketing scope |
| **Dashboard / shadcn** | shadcn vars | Inter | `--background`, `--primary`, … | Do not mix into marketing |
| **Feature pages** (inbox, security, …) | Mixed local vars | Manrope per-page | Partial `--mm-*` | Align Phase 5/6 |

**Rule:** If you are building under `components/marketing/`, use only tokens in this sheet. Never `#0a0a14`, never shadcn `bg-background`, never Tailwind `emerald-*` for success.

---

## Colors (17 tokens)

| CSS variable | Hex | Tailwind utility |
|--------------|-----|------------------|
| `--mm-bg` | `#060e20` | `bg-mm-background` |
| `--mm-surface` | `#0a1836` | `bg-mm-surface-container` |
| `--mm-surface-raised` | `#0f1e3f` | `bg-mm-surface-container-high` |
| `--mm-border` | `#364770` | `border-mm-outline-variant` |
| `--mm-text` | `#dee5ff` | `text-mm-on-background` |
| `--mm-text-muted` | `#99aad9` | `text-mm-on-surface-variant` |
| `--mm-accent` | `#adc6ff` | `text-mm-primary` |
| `--mm-accent-strong` | `#4388fd` | `bg-mm-primary-fixed` |
| `--mm-accent-muted` | `#699cff` | `text-mm-primary-dim` |
| `--mm-accent-hover` | `#317bef` | `bg-mm-primary-fixed-dim` |
| `--mm-on-accent` | `#000000` | `text-mm-on-primary-fixed` |
| `--mm-outline` | `#6475a1` | `border-mm-outline` |
| `--mm-input-bg` | `#06122c` | `bg-mm-surface-container-low` |
| `--mm-input-border` | `#364770` | `border-mm-outline-variant` |
| `--mm-error` | `#fa746f` | `text-mm-error` |
| `--mm-error-text` | `#ff9993` | `text-mm-on-error-container` |
| `--mm-error-bg` | `#871f21` | `bg-mm-error-container` |

### Common color recipes

| UI | CSS | Tailwind |
|----|-----|----------|
| Page | `background: var(--mm-bg)` | `bg-mm-background` |
| Section card | `background: var(--mm-surface); border: 1px solid var(--mm-border)` | `bg-mm-surface-container border border-mm-outline-variant` |
| Primary button | `bg: var(--mm-accent-strong); color: var(--mm-on-accent)` | `bg-mm-primary-fixed text-mm-on-primary-fixed hover:bg-mm-primary-fixed-dim` |
| Ghost button | `border: 1px solid var(--mm-border); color: var(--mm-text)` | `border border-mm-outline-variant text-mm-on-background` |
| Link | `color: var(--mm-accent)` | `text-mm-primary hover:text-mm-primary-dim` |
| Input | `bg: var(--mm-input-bg); border: var(--mm-input-border)` | `bg-mm-surface-container-low border-mm-outline-variant focus:border-mm-primary` |

---

## Typography (8 tokens)

| Token | Desktop | Tablet (`md`) | Mobile | LH | Weight | Font | Tailwind pattern |
|-------|---------|---------------|--------|-----|--------|------|------------------|
| `display-xl` | 80px | 64px | 40px | 1.08 | 700 | Manrope | `font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem]` |
| `display-lg` | 48px | 44px | 32px | 1.1 | 700 | Manrope | `font-display text-[2rem] md:text-[2.75rem] lg:text-5xl` |
| `heading` | 28px | 24px | 24px | 1.25 | 600 | Manrope | `font-display text-2xl lg:text-[1.75rem]` |
| `body-lg` | 20px | 20px | 18px | 1.5 | 400 | Inter | `text-lg lg:text-xl` |
| `body` | 16px | 16px | 16px | 1.5 | 400 | Inter | `text-base` |
| `body-sm` | 14px | 14px | 14px | 1.45 | 400 | Inter | `text-sm` |
| `caption` | 14px | 14px | 13px | 1.4 | 500 | Inter | `text-sm font-medium` |
| `button` | 16px | 16px | 16px | 1 | 600 | Inter | `text-base font-semibold` |

**Font utilities:** `font-display` → Manrope · `font-body` → Inter (default on marketing `body`)

---

## Spacing and layout

| Token | Value | Tailwind |
|-------|-------|----------|
| Max content width | 1120px | `max-w-[1120px]` |
| Section padding Y | 96px → 128px | `py-24 lg:py-32` |
| Section padding X | 24px | `px-6` |
| Grid gutter | 24px | `gap-6` |
| Nav height | 64px | `h-16` |
| Scroll / sticky offset | 80px | `scroll-margin-top: 80px`, theater `top: 80px` |
| Hero text max | 720px | `max-w-[720px]` |
| Problem text max | 640px | `max-w-[640px]` |

### Spacing scale (quick)

| Name | px | Tailwind |
|------|-----|----------|
| md | 16 | `gap-4` |
| lg | 24 | `gap-6`, `p-6` |
| xl | 32 | `gap-8` |
| 2xl | 48 | `gap-12` |

### Radius

| Element | px | Tailwind |
|---------|-----|----------|
| Button, input | 6 | `rounded-md` |
| Card, theater frame | 8 | `rounded-lg` |

### Section shell (copy-paste)

```tsx
<section id="example" className="bg-mm-background py-24 lg:py-32">
  <div className="mx-auto w-full max-w-[1120px] px-6">
    <h2 className="font-display text-[2rem] font-bold tracking-tight text-mm-on-background md:text-[2.75rem] lg:text-5xl">
      Section headline
    </h2>
    <p className="mt-4 text-lg text-mm-on-surface-variant">Subhead copy.</p>
  </div>
</section>
```

---

## Theater layout (Phase 3 quick ref)

| Property | Desktop | Mobile (`<md`) |
|----------|---------|---------------|
| Scroll wrapper (Connect / Execute) | `min-h-[220vh]` | `min-h-[120vh]` |
| Scroll wrapper (Focus) | `min-h-[240vh]` | `min-h-[120vh]` |
| Sticky `top` | `80px` | `80px` |
| Frame height | `min-h-[70vh] max-h-[720px]` | `min-h-[60vh] max-h-[560px]` |
| Frame padding | `p-6 md:p-8` | `p-4` |
| Reduced motion | Static final frame | Static final frame |

---

## Phase 2: full `globals.css` block

Paste under [`app/globals.css`](../../../app/globals.css) after Tailwind directives. Wire fonts in [`app/layout.tsx`](../../../app/layout.tsx) first (`--font-manrope`, `--font-inter`).

```css
[data-marketing-theme='dark'] {
  /* ── Colors (baseline) ── */
  --mm-bg: #060e20;
  --mm-surface: #0a1836;
  --mm-surface-raised: #0f1e3f;
  --mm-border: #364770;
  --mm-text: #dee5ff;
  --mm-text-muted: #99aad9;
  --mm-accent: #adc6ff;
  --mm-accent-strong: #4388fd;

  /* ── Colors (extended) ── */
  --mm-accent-muted: #699cff;
  --mm-accent-hover: #317bef;
  --mm-on-accent: #000000;
  --mm-outline: #6475a1;
  --mm-input-bg: #06122c;
  --mm-input-border: #364770;
  --mm-error: #fa746f;
  --mm-error-text: #ff9993;
  --mm-error-bg: #871f21;

  /* ── Typography ── */
  --font-display: var(--font-manrope), 'Manrope', system-ui, sans-serif;
  --font-body: var(--font-inter), 'Inter', system-ui, sans-serif;

  /* ── Layout ── */
  --mm-layout-max: 70rem;
  --mm-layout-gutter: 1.5rem;
  --mm-section-py: 6rem;
  --mm-section-py-lg: 8rem;
  --mm-radius-button: 0.375rem;
  --mm-radius-card: 0.5rem;
  --mm-nav-height: 4rem;
  --mm-scroll-offset: 5rem;
  --mm-theater-height: 70vh;
  --mm-theater-height-max: 720px;

  /* Canvas + type defaults */
  background-color: var(--mm-bg);
  color: var(--mm-text);
  font-family: var(--font-body);
}

[data-marketing-theme='dark'] .font-display {
  font-family: var(--font-display);
}

[data-marketing-theme='dark'] [id] {
  scroll-margin-top: var(--mm-scroll-offset);
}
```

### MarketingLayout wrapper

```tsx
// components/marketing/MarketingLayout.tsx
export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-marketing-theme="dark" className="min-h-screen bg-mm-background text-mm-on-background antialiased">
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
```

---

## Component cheat sheet

| Component | Key classes |
|-----------|-------------|
| **Primary CTA** | `rounded-md bg-mm-primary-fixed px-6 py-3 text-base font-semibold text-mm-on-primary-fixed hover:bg-mm-primary-fixed-dim` |
| **Ghost CTA** | `rounded-md border border-mm-outline-variant px-6 py-3 text-base font-medium text-mm-on-background hover:border-mm-outline` |
| **Feature card** | `rounded-lg border border-mm-outline-variant bg-mm-surface-container p-6 transition hover:-translate-y-0.5 hover:border-mm-primary` |
| **Nav bar** | `fixed inset-x-0 top-0 z-50 h-16 bg-mm-surface-container/90 backdrop-blur-md` |
| **Form input** | `rounded-md border border-mm-outline-variant bg-mm-surface-container-low px-4 py-3 text-mm-on-background placeholder:text-mm-on-surface-variant focus:border-mm-primary focus:outline-none` |
| **Eyebrow** | `text-sm font-medium text-mm-on-surface-variant` |

---

## Breakpoints (Tailwind defaults)

| Token | Min | Use |
|-------|-----|-----|
| `sm` | 640px | 2-col grids |
| `md` | 768px | Theater mobile cutoff |
| `lg` | 1024px | `py-32`, 3-col grids |
| `xl` | 1280px | Integrations single row |

---

## Acceptance criteria checklist

- [x] One-page reference: colors, type, spacing, radius
- [x] Target location: `[data-marketing-theme="dark"]` in `globals.css`
- [x] Example snippets: CSS vars + Tailwind classes + section shell
- [x] Marketing `#060e20` vs legacy Hero `#0a0a14` documented
- [x] Signed off before `components/marketing/` code

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | Approved marketing token reference; Phase 2 may proceed | 2026-07-03 |

**P1-T16 status:** Done. **Design system workstream (P1-T13–T16) complete.** Phase 2 implementation of `components/marketing/` is unblocked.

---

## Downstream handoff

| Consumer | Action |
|----------|--------|
| Phase 2 engineer | Copy `globals.css` block; create `MarketingLayout` with `data-marketing-theme="dark"` |
| Phase 2 sections | Use cheat sheet + section shell pattern |
| Phase 3 theater | Use theater layout quick ref |
| P1-T24 sign-off | Design tokens gate satisfied |
