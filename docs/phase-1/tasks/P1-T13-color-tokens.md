# P1-T13: Semantic Color Token Map

**Task ID:** P1-T13  
**Status:** done  
**Type:** Strategy and documentation (no code; Phase 2 wires `globals.css`)  
**Completed:** 2026-07-03  
**Parent:** [phase-1-tasks.md](../phase-1-tasks.md) | [phase-1-foundation.md](../phase-1-foundation.md) §3.2  
**Depends on:** nothing  
**Blocks:** P1-T15, P1-T16, Phase 2 `components/marketing/*`

---

## Quick reference

| Field | Value |
|-------|-------|
| **Theme scope** | `[data-marketing-theme="dark"]` on marketing layout root |
| **Raw source** | `mm.*` keys in [`tailwind.config.ts`](../../../tailwind.config.ts) |
| **Baseline tokens** | 8 (foundation §3.2) |
| **Extended tokens** | 9 (all map to existing `mm-*`; no new hex) |
| **Legacy color to retire** | Hero canvas `#0a0a14` on new homepage |
| **Marketing canvas** | `--mm-bg` → `#060e20` |

---

## Decision: single marketing theme

Per [phase-1-foundation.md §3.1](../phase-1-foundation.md#31-decision-single-source-of-truth):

| System | Disposition |
|--------|-------------|
| **`mm-*` palette** | **Source of truth** for new marketing homepage and aligned feature pages |
| **shadcn HSL vars** (`--background`, `--primary`, …) | Keep for dashboard / shadcn components; do not use on marketing sections |
| **Legacy Hero `#0a0a14`** | Retire on `/` and primary marketing routes; replace with `--mm-bg` (`#060e20`) |

New homepage components reference **semantic `--mm-*` CSS variables** or Tailwind `mm-*` utilities, not raw hex or shadcn tokens.

---

## Baseline semantic tokens (8)

Approved mapping from [phase-1-foundation.md §3.2](../phase-1-foundation.md#32-semantic-aliases-to-add). Every value is an existing `mm.*` entry in [`tailwind.config.ts`](../../../tailwind.config.ts).

| Semantic token | Hex | `mm.*` key | Tailwind utility (examples) | Usage |
|----------------|-----|------------|-------------------------------|-------|
| `--mm-bg` | `#060e20` | `background` | `bg-mm-background` | Page canvas, marketing root |
| `--mm-surface` | `#0a1836` | `surface-container` | `bg-mm-surface-container` | Cards, nav bar, section panels |
| `--mm-surface-raised` | `#0f1e3f` | `surface-container-high` | `bg-mm-surface-container-high` | Elevated cards, sticky theater frame |
| `--mm-border` | `#364770` | `outline-variant` | `border-mm-outline-variant` | Card borders, ghost button outlines |
| `--mm-text` | `#dee5ff` | `on-background` | `text-mm-on-background` | Headlines, body on dark bg |
| `--mm-text-muted` | `#99aad9` | `on-surface-variant` | `text-mm-on-surface-variant` | Subheads, captions, privacy microcopy |
| `--mm-accent` | `#adc6ff` | `primary` | `text-mm-primary` | Links, focus rings, icon tints |
| `--mm-accent-strong` | `#4388fd` | `primary-fixed` | `bg-mm-primary-fixed` | Primary CTA fill, success accent |

---

## Extended semantic tokens (9)

Added for forms, hover states, and errors. **All values reuse existing `mm.*` keys.** No new hex invented.

| Semantic token | Hex | `mm.*` key | Justification |
|----------------|-----|------------|---------------|
| `--mm-accent-muted` | `#699cff` | `primary-dim` | Softer accent for hover on links, secondary highlights |
| `--mm-accent-hover` | `#317bef` | `primary-fixed-dim` | Primary button `:hover` / `:active` |
| `--mm-on-accent` | `#000000` | `on-primary-fixed` | Text and icons on `--mm-accent-strong` buttons |
| `--mm-outline` | `#6475a1` | `outline` | Stronger dividers, input focus border (optional step above `--mm-border`) |
| `--mm-input-bg` | `#06122c` | `surface-container-low` | Waitlist form field background ([P1-T12](./P1-T12-final-cta.md)) |
| `--mm-input-border` | `#364770` | `outline-variant` | Default input border (alias of `--mm-border`; explicit for forms) |
| `--mm-error` | `#fa746f` | `error` | Validation border / icon |
| `--mm-error-text` | `#ff9993` | `on-error-container` | Inline error messages |
| `--mm-error-bg` | `#871f21` | `error-container` | Error alert panel background |

### Success states (no new token)

There is **no green** in the `mm-*` palette. Success UI (waitlist confirmation) uses existing accent tokens:

| State | Tokens |
|-------|--------|
| Success icon | `--mm-accent-strong` or `--mm-accent` on `--mm-surface-raised` |
| Success headline | `--mm-text` |
| Success body | `--mm-text-muted` |

Do **not** import Tailwind `emerald-*` on marketing sections. Keeps one coherent blue accent system (Linear-style).

---

## Full token map (17 semantic → raw)

| # | Semantic CSS var | Hex | Tailwind `mm-*` class prefix |
|---|------------------|-----|------------------------------|
| 1 | `--mm-bg` | `#060e20` | `mm-background` |
| 2 | `--mm-surface` | `#0a1836` | `mm-surface-container` |
| 3 | `--mm-surface-raised` | `#0f1e3f` | `mm-surface-container-high` |
| 4 | `--mm-border` | `#364770` | `mm-outline-variant` |
| 5 | `--mm-text` | `#dee5ff` | `mm-on-background` |
| 6 | `--mm-text-muted` | `#99aad9` | `mm-on-surface-variant` |
| 7 | `--mm-accent` | `#adc6ff` | `mm-primary` |
| 8 | `--mm-accent-strong` | `#4388fd` | `mm-primary-fixed` |
| 9 | `--mm-accent-muted` | `#699cff` | `mm-primary-dim` |
| 10 | `--mm-accent-hover` | `#317bef` | `mm-primary-fixed-dim` |
| 11 | `--mm-on-accent` | `#000000` | `mm-on-primary-fixed` |
| 12 | `--mm-outline` | `#6475a1` | `mm-outline` |
| 13 | `--mm-input-bg` | `#06122c` | `mm-surface-container-low` |
| 14 | `--mm-input-border` | `#364770` | `mm-outline-variant` |
| 15 | `--mm-error` | `#fa746f` | `mm-error` |
| 16 | `--mm-error-text` | `#ff9993` | `mm-on-error-container` |
| 17 | `--mm-error-bg` | `#871f21` | `mm-error-container` |

---

## Component usage guide

### Hero and sections

| Element | Tokens |
|---------|--------|
| Page background | `--mm-bg` |
| Section card / nav | `--mm-surface` |
| H1 / body | `--mm-text` |
| Subhead / eyebrow | `--mm-text-muted` |
| Primary CTA | bg `--mm-accent-strong`, text `--mm-on-accent`, hover `--mm-accent-hover` |
| Ghost CTA | border `--mm-border`, text `--mm-text`, hover border `--mm-outline` |

### Feature grid cards

| Element | Tokens |
|---------|--------|
| Card bg | `--mm-surface` |
| Card border default | `--mm-border` |
| Card border hover | `--mm-accent` |
| Title | `--mm-text` |
| Description | `--mm-text-muted` |
| Arrow link | `--mm-accent` |

### Waitlist form ([P1-T12](./P1-T12-final-cta.md))

| Element | Tokens |
|---------|--------|
| Input bg | `--mm-input-bg` |
| Input border | `--mm-input-border` |
| Input border focus | `--mm-accent` + ring `--mm-accent-muted` at 30% opacity |
| Input text | `--mm-text` |
| Placeholder | `--mm-text-muted` |
| Error text | `--mm-error-text` |
| Error border | `--mm-error` |
| Submit button | same as primary CTA |

### Product theater frame

| Element | Tokens |
|---------|--------|
| Sticky frame outer | `--mm-surface-raised` |
| Frame border | `--mm-border` |
| Demo UI inside frame | May keep light `bg-white` product chrome from `Static*` components (intentional contrast) |

---

## Legacy vs marketing canvas

| Context | Background | Action |
|---------|------------|--------|
| New homepage `/` | `#060e20` (`--mm-bg`) | Phase 2 `MarketingLayout` |
| Legacy Hero | `#0a0a14` | Remove from `/` in Phase 2 |
| `globals.css` `html, body` | `#0a0a14` today | Phase 2: set body to `--mm-bg` when `[data-marketing-theme="dark"]` |
| Feature pages (inbox, security, …) | Mixed local vars | Align to semantic tokens in Phase 5/6; not blocking Phase 2 homepage |

---

## Phase 2 implementation (target: `globals.css`)

Wire under `[data-marketing-theme="dark"]` per foundation §3.5. **Documentation only in Phase 1; no code change yet.**

```css
[data-marketing-theme='dark'] {
  /* Baseline (8) */
  --mm-bg: #060e20;
  --mm-surface: #0a1836;
  --mm-surface-raised: #0f1e3f;
  --mm-border: #364770;
  --mm-text: #dee5ff;
  --mm-text-muted: #99aad9;
  --mm-accent: #adc6ff;
  --mm-accent-strong: #4388fd;

  /* Extended (9) */
  --mm-accent-muted: #699cff;
  --mm-accent-hover: #317bef;
  --mm-on-accent: #000000;
  --mm-outline: #6475a1;
  --mm-input-bg: #06122c;
  --mm-input-border: #364770;
  --mm-error: #fa746f;
  --mm-error-text: #ff9993;
  --mm-error-bg: #871f21;
}
```

### Tailwind usage (no config change required)

`mm.*` colors already exist in [`tailwind.config.ts`](../../../tailwind.config.ts). Prefer semantic CSS vars in new components for portability; Tailwind is acceptable when faster:

```tsx
<section style={{ background: 'var(--mm-bg)', color: 'var(--mm-text)' }}>
<button className="bg-mm-primary-fixed text-mm-on-primary-fixed hover:bg-mm-primary-fixed-dim">
```

### Rules for Phase 2 engineers

| Do | Don't |
|----|-------|
| Use semantic `--mm-*` or `mm-*` Tailwind | Hardcode `#060e20` in new marketing components |
| Use `--mm-error-*` for form validation | Use shadcn `destructive` on marketing forms |
| Use accent tokens for success | Use `emerald-*` or new greens |
| Scope marketing theme via `data-marketing-theme` | Mix Hero `#0a0a14` on new homepage |

---

## Tokens intentionally excluded

| Requested / considered | Decision |
|------------------------|----------|
| New success green | Rejected; use `--mm-accent-strong` |
| New hex for marketing | Rejected unless future brand audit |
| shadcn `--primary` on marketing | Rejected; separate systems |
| `mm.inverse-*` tokens | Not exposed semantically; marketing stays dark-on-dark |
| Per-page inbox vars (`--inbox-bg`) | Legacy; migrate in Phase 5/6, not Phase 2 homepage |

---

## Acceptance criteria checklist

- [x] Approved table mapping semantic tokens → `mm-*` raw values (8 baseline + 9 extended)
- [x] Additions beyond baseline documented with justification (all existing `mm.*` keys)
- [x] No new hex values introduced
- [x] Tokens cover bg, surface, text, accent, border at minimum
- [x] Error tokens defined for CTA forms
- [x] Legacy `#0a0a14` vs `--mm-bg` documented

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | Approved 17-token semantic map on `mm-*` palette | 2026-07-03 |

**P1-T13 status:** Done. Unblocks P1-T15 (layout), P1-T16 (token reference sheet), and Phase 2 marketing components.

---

## Downstream handoff

| Consumer | Uses from this doc |
|----------|-------------------|
| P1-T16 token reference | Consolidates colors + type + spacing |
| Phase 2 `MarketingLayout.tsx` | `data-marketing-theme="dark"` + CSS vars |
| P1-T03 Hero, P1-T12 CTA | Button and form token assignments |
| P1-T09–11 sections | Card, link, trust surface colors |
