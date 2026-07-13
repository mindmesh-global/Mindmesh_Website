# P11-T04: App-Frame Visual Specification

**Task ID:** P11-T04  
**Status:** done  
**Type:** Strategy / documentation (code in P11-T05+)  
**Completed:** 2026-07-10  
**Parent:** [phase-11-tasks.md](../../phase-11-tasks.md) | [phase-11-product-overview.md](../../phase-11-product-overview.md)  
**Depends on:** [P11-T01](./P11-T01-product-inventory.md), informed by [P11-T02](./P11-T02-overview-beat-sheet.md), [P11-T03](./P11-T03-product-fixtures.md)  
**Blocks:** P11-T05  
**Blocker:** Yes

---

## Goal

Specify a faithful but simplified MindMesh desktop app frame for the homepage product overview. The frame must read as the shipping product shell, use marketing design tokens, reserve stable dimensions (no CLS), and stay clearly decorative or scene-driven.

No UI in this task. Implement as `ProductOverviewFrame` in P11-T05.

---

## Quick reference

| Field | Value |
|-------|-------|
| Component (P11-T05) | `components/marketing/product-overview/ProductOverviewFrame.tsx` |
| Base pattern | Extend [`ProductFrame`](../../../components/marketing/theater/ProductFrame.tsx) ideas; do not reuse its thin `md:w-14` rail as-is |
| Sticky offset | `top: 80px` (`THEATER_STICKY_TOP_PX`) |
| Desktop frame chrome | `min-height: 70vh`, `max-height: 720px` (match `.theater-frame-chrome`) |
| Mobile frame chrome | `min-height: 60vh`, `max-height: 560px` per stacked card |
| Overview runway | ~**180vh** desktop; stacked normal flow on mobile |
| Sidebar width | **220px** desktop (`md+`); hidden on mobile cards (scene label instead) |
| Radius | `rounded-lg` (8px) |
| Border | `border-mm-outline-variant` |
| Surface | `bg-mm-surface-container-high` |
| Elevation | `shadow-mm-elevated` |
| Motion | `transform` + `opacity` only |
| Brand signal | MindMesh wordmark / logo in title bar + sidebar header |

---

## Design principles

1. **MindMesh, not Linear.** Structure may feel product-led; colors, type, radius, and chrome must come from the marketing system (`mm-*`, Manrope). No Linear-like purple glow, hairline newspaper chrome, or cream/serif look.
2. **Product-true hierarchy.** Sidebar order and labels match the desktop app; companions are overlays, not tabs.
3. **One persistent shell.** Desktop keeps window chrome + sidebar while only the main pane crossfades.
4. **Decorative by default.** Clicks that are not scene navigation do nothing visible, or are omitted.
5. **Stable box.** Reserved height/width from first paint; dynamic body fills the reserved shell.

---

## Anatomy

```text
┌─────────────────────────────────────────────────────────────┐
│ Window title bar (traffic lights · MindMesh · status)       │
├──────────────┬──────────────────────────────────────────────┤
│ Sidebar      │ Workspace header (scene title / supporting)  │
│ 220px        ├──────────────────────────────────────────────┤
│              │                                              │
│ Logo         │ Main content region                          │
│ Attention    │ (scene layers, absolute stacked for fade)    │
│ Upcoming*    │                                              │
│ Email ▾      │                                              │
│  Inbox       │                                              │
│  All         │                                              │
│  Sent        │                                              │
│  Drafts      │                                              │
│ Narrative    │                                              │
│ Apps         │                                              │
│ ─────────    │                                              │
│ Avatar       │                                              │
└──────────────┴──────────────────────────────────────────────┘
 Caption (scene-specific)
 Footer depth links (optional; Scene 4)
```

\* Upcoming events is a product tab. In the overview, Scene 2 combines Inbox + Upcoming in the **main pane**; the sidebar may highlight **Email** (and optionally show Upcoming as a secondary selected cue) rather than requiring a separate scrubbed tab switch.

---

## 1. Window chrome

### Desktop

| Element | Spec |
|---------|------|
| Height | 36–40px |
| Background | `bg-mm-surface` or slightly darker than frame body |
| Border | Bottom `border-mm-outline-variant/60` |
| Left | Three decorative window dots (12px), muted `mm-outline` / `mm-on-surface-variant`; **not** functional |
| Center / left-of-center | MindMesh mark + wordmark ("MindMesh"), `text-sm font-medium text-mm-on-surface` |
| Right | Optional muted status text: `Alex · Acme Co.` from persona fixtures; settings / bell icons decorative only |

### Do not

- Implement real window controls
- Copy macOS traffic-light colors as a brand statement (keep muted / monochrome)
- Add Linear-style command palette chrome in the title bar

---

## 2. Left navigation rail

### Dimensions

| Breakpoint | Width | Visibility |
|------------|-------|------------|
| `md+` | **220px** fixed | Always visible inside frame |
| `< md` | N/A | Replaced by scene label chip on each stacked card |

### Structure (top → bottom)

| Block | Content | Behavior |
|-------|---------|----------|
| Brand | Logo + "MindMesh" | Decorative |
| Primary nav | Attention · Upcoming events · Email (expandable) · Yesterday narrative · Connected apps | Scene-driven highlight only |
| Email children | Inbox · All · Sent · Drafts + counts from fixtures | Visible when Scene 2 active (or Email expanded); decorative |
| Footer | Avatar initial "A" + Alex | Decorative |

### Active states

Map from `PRODUCT_OVERVIEW_NAV` / `getProductOverviewScene(progress)`:

| Scene | Sidebar highlight |
|-------|-------------------|
| 1 | Attention |
| 2 | Email (+ Inbox child); Upcoming may show secondary emphasis in main pane only |
| 3 | Yesterday narrative (Connected apps may show soft secondary highlight) |
| 4 | No dashboard tab primary; shell dims; companions float above |

Active item tokens:

- Background: `bg-mm-primary/15` or `bg-mm-surface-container`
- Text: `text-mm-primary` / `text-mm-on-surface`
- Icon wrap: subtle filled circle using `mm-primary` at low opacity

Do **not** port product amber (`rgba(245, 158, 11, …)`) into the marketing frame. Marketing blue accent keeps the site coherent.

### Icons

Use the same lucide set as the product where practical (`Bell`, `CalendarDays`, `Inbox`, `BookOpen`, `Plug`, folder icons). Size ~16–18px. Decorative.

### Scene 4 treatment

When companions are active:

- Entire dashboard shell (title bar + sidebar + dimmed main) stays at ~0.45–0.6 opacity
- Sensor + Mascot panels sit above in the main region (or as overlays inside the frame)
- Sidebar has no "Companions" product tab; progress nav dots outside or below the frame may still show scene 4

---

## 3. Workspace header

Inside the main column, above scene content:

| Field | Spec |
|-------|------|
| Height | ~44–52px |
| Title | Scene headline from fixtures (e.g. Attention header, inbox headline) |
| Supporting | One muted line (`text-sm text-mm-on-surface-variant`) |
| Actions | None required; if present, decorative only |

Scene 1 may use the product Attention header copy ("Here's what needs your attention.") as the workspace title instead of a separate marketing headline.

---

## 4. Main content region

| Field | Spec |
|-------|------|
| Layout | `flex-1 min-h-0 overflow-hidden` (clip scene layers; avoid nested page scroll fighting sticky) |
| Padding | `p-4 md:p-5` (slightly tighter than homepage theater `p-8` so the board fits) |
| Layers | Four absolutely positioned scene layers; inactive `opacity: 0` + `pointer-events-none` + small `translateY` |
| Background | `bg-mm-surface` or transparent over frame high surface |

### Per-scene layout hints

| Scene | Main layout |
|-------|-------------|
| 1 Attention | Single column board: Now → Later Today → Quietly Handled; overlap chip top |
| 2 Inbox + events | `grid` ~ `1.2fr / 0.8fr` (threads+focus \| upcoming); on narrow desktop stack |
| 3 Narrative + apps | `grid` ~ `1fr / 1fr` (narrative card \| 7-app strip/grid) |
| 4 Companions | Dimmed shell backdrop + two panels (Sensor \| Mascot), `gap-4` |

---

## 5. Caption + footer

Reuse ProductFrame placement rules:

- Caption and footer live **inside** the sticky box, below the chrome
- Caption updates per scene (`PRODUCT_OVERVIEW_SCENE_CAPTIONS`)
- Footer: Scene 4 depth links to `/sensor` and `/mascot` (real links OK)

---

## 6. Breakpoints and aspect

| Breakpoint | Behavior |
|------------|----------|
| `< md` (mobile) | No sticky scrub. Section chrome once. Four stacked mini-frames, each showing final scene state. Scene label chip replaces sidebar. Caption under each card. |
| `md`–`lg` | Full shell; sidebar 220px; main may stack Scene 2/3 subpanes if width < ~900px inside frame |
| `lg+` | Preferred two-pane Scene 2/3 layouts |

### Reserved desktop dimensions (CLS)

Lock these on the server-rendered shell / skeleton before the dynamic body loads:

```text
Outer section: standard MarketingSection (max-w-[1120px] px-6)
Sticky frame top: 80px
Frame chrome: min-h-[70vh] max-h-[720px] w-full
Sidebar: w-[220px] (md+)
Title bar: h-10
Caption block: reserve ~3rem below frame (min-h)
Overview wrapper (motion): min-h-[180vh] md+
```

Aspect is **fluid width × capped height**, not a fixed cinematic ratio. Prefer matching existing theater chrome over inventing a new 16:9 card.

### Mobile card dimensions

```text
Each card chrome: min-h-[60vh] max-h-[560px] w-full
No 180vh runway
Gap between cards: gap-10 / gap-12
```

---

## 7. Loading skeleton + dynamic import

P11-T11 loads the interactive body dynamically. The shell must paint first.

### Server / static shell

| Element | Skeleton treatment |
|---------|-------------------|
| Section eyebrow / title / subtitle | Real copy from `PRODUCT_OVERVIEW_SECTION` (SSR OK) |
| Frame outline | Empty chrome with title bar + sidebar placeholders + main shimmer |
| Sidebar items | 5–6 muted bars at nav positions |
| Main | Soft pulse blocks (`opacity` only pulse, or static gray bars if reduced motion) |
| Caption | Reserved empty line height |

### Rules

- Skeleton uses the **same** `min-h` / `max-h` as the live frame
- No layout jump when the client body hydrates
- Shimmer must respect `prefers-reduced-motion: reduce` (static placeholders)

---

## 8. Tokens (marketing system)

Prefer existing utilities / CSS variables:

| Role | Token / class |
|------|----------------|
| Page background | `bg-mm-background` (section) |
| Frame fill | `bg-mm-surface-container-high` |
| Inner pane | `bg-mm-surface` / `bg-mm-surface-raised` |
| Borders | `border-mm-outline-variant` |
| Primary text | `text-mm-on-surface` |
| Muted text | `text-mm-on-surface-variant` |
| Accent / active | `text-mm-primary`, `bg-mm-primary/15` |
| Elevation | `shadow-mm-elevated` |
| Radius | `rounded-lg` frame, `rounded-md` controls |

Typography: Manrope via marketing layout (`font-body` / `font-display` as elsewhere). No Inter / system UI as the expressive face.

---

## 9. Control contract

| Control | Allowed | Notes |
|---------|---------|-------|
| Scene progress dots / labels outside frame | Yes | May be pointer + keyboard to scrub or jump scenes in P11-T10 |
| Sidebar nav items | Scene-driven only | Optional: clicking jumps to scene; must not fake routing |
| Email folder rows | Decorative or scene-locked | Do not load threads |
| Window dots, settings, bell | Decorative | `aria-hidden` where appropriate |
| Depth links in footer | Real Next.js links | `/sensor`, `/mascot` |
| Compose / Send / Join / Add app | Omit or badge as non-interactive | Approval hint text OK in Scene 2 |

---

## 10. Accessibility

- Frame is a visual demo; primary section heading remains the MarketingSection title
- Decorative controls: `aria-hidden` or `tabIndex={-1}` unless they are real scene navigation
- If scene nav is interactive: `role="tablist"` / tabs or a labeled button group; keyboard operable
- Contrast: active nav and body text meet existing marketing contrast expectations on dark theme
- Reduced motion: no shimmer; jump to final companions state per P11-T02

---

## 11. Explicit non-goals

- Pixel-perfect clone of Tauri `WindowTitleBar`
- Product amber attention palette on the marketing site
- Live source-visibility toggles, OAuth, or sync island
- Thin icon-only rail (`md:w-14`) as the only nav (too weak for product recognition)
- Cards-in-cards chrome that makes the overview look like a marketing collage instead of an app

---

## Implementation checklist for P11-T05

- [ ] `ProductOverviewFrame` with title bar, 220px sidebar, workspace header, main slot
- [ ] Reserved chrome heights matching `.theater-frame-chrome`
- [ ] Sticky wrapper + `relative isolate` on the section (Phase 10 lesson)
- [ ] Caption / footer inside sticky box
- [ ] Skeleton dimensions match live frame
- [ ] Mobile stacked cards without sticky
- [ ] Tokens from `mm-*` only

---

## Acceptance checklist

- [x] Frame is recognizably MindMesh and not a Linear visual copy
- [x] Dimensions prevent layout shift
- [x] Mobile fallback is specified
- [x] Product controls are clearly decorative or scene-driven
- [x] Tokens come from the marketing design system where possible

---

## Unblocks

- **P11-T05** - implement `ProductOverviewFrame` + shell against this spec
