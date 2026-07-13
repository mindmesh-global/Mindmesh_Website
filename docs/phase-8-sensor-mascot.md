# Phase 8: Sensor & Mascot Product Pages

**Status:** Complete (2026-07-10)  
**Prerequisite:** [Phase 7 sign-off](./phase-7/tasks/P7-T12-sign-off.md) (P7-T12, 2026-07-10)  
**Sign-off:** [P8-T19](./phase-8/tasks/P8-T19-sign-off.md)  
**Task breakdown:** [phase-8-tasks.md](./phase-8-tasks.md)  
**Parent plan:** [P1-T01](./phase-1/tasks/P1-T01-narrative.md) · [P1-T09](./phase-1/tasks/P1-T09-feature-grid.md) · [P1-T19](./phase-1/tasks/P1-T19-deprecation-reuse.md) · [phase-3-scroll-kit.md](./phase-3-scroll-kit.md) · [phase-4-theater-animation.md](./phase-4-theater-animation.md) · [phase-5-depth-pages.md](./phase-5-depth-pages.md)

Phase 8 ships **dedicated marketing depth pages** for Sensor and Mascot. Each page includes a **scroll-linked product theater** (same kit as homepage Connect / Focus / Execute) that shows exactly how the surface works, beat by beat.

---

## Goal

1. Replace legacy [`/sensor&mascot`](../app/sensor&mascot/page.tsx) with `/sensor` and `/mascot` on `MarketingDepthLayout`
2. Ship **homepage-parity scroll theaters** for both surfaces (sticky `ProductFrame` + `progress` / `step` beat sheets)
3. Reuse Phase 3–4 scroll kit; extend theater IDs for `sensor` and `mascot`
4. **No** live `ConditionalOverlays` / Lottie on these pages (coded demos only)
5. Wire discovery (FAQ, optional feature grid) + redirect the old URL
6. Keep homepage narrative free of mascot/sensor as the primary story (P1-T01)

---

## Product definitions (lock these)

| Surface | One-line | Job to be done |
|---------|----------|----------------|
| **Sensor** | Universal command bar for work and everyday tasks | Type what you need: open apps, calculate, convert, ask quick questions, jump without leaving flow |
| **Mascot** | Conversational companion on top of MindMesh memory | Ask what changed, what matters, or what is next; get answers grounded in connected email, calendar, and local context |

**Relationship (must appear on both pages):**

> Sensor is for **instant action**. Mascot is for **ongoing conversation**. Together they reduce hunting, tabs, and context switching, without replacing Connect / Focus / Execute as the homepage story.

---

## Route architecture (locked)

| Route | Role | Shell |
|-------|------|-------|
| `/sensor` | Sensor product depth + scroll theater | `MarketingDepthLayout` |
| `/mascot` | Mascot product depth + scroll theater | `MarketingDepthLayout` |
| `/sensor&mascot` | **Legacy** | Client shim: bare/`#sensor` → `/sensor`, `#mascot` → `/mascot` ([P8-T02](./phase-8/tasks/P8-T02-legacy-redirect-plan.md); implement P8-T14) |

**Overlay allowlist after Phase 8:**

| Path | Live `MascotChatbot` / `SensorBarSpotlight` |
|------|-----------------------------------------------|
| `/dashboard` | Allowed |
| `/sensor`, `/mascot` | **No** (scroll theaters only) |
| `/sensor&mascot` | Redirected away |

---

## Animation contract (homepage parity)

Reuse the Phase 3–4 stack. Do **not** invent a second scroll system.

| Piece | Reuse |
|-------|--------|
| Sticky frame | [`ProductFrame`](../components/marketing/theater/ProductFrame.tsx) |
| Tall wrapper + context | [`TheaterScrollSection`](../components/marketing/theater/TheaterScrollSection.tsx) |
| Progress / step / pause | [`useScrollSection`](../hooks/useScrollSection.ts) |
| Thresholds + helpers | Extend [`lib/marketing-theater-scroll.ts`](../lib/marketing-theater-scroll.ts) |
| Motion | Framer `transform` + `opacity` only, inside dynamically imported demos |
| Reduced motion | Jump to final progress; static caption |
| Off-screen | Pause when `isPaused` / not in view |

### Extend `TheaterId`

Today: `'connect' | 'focus' | 'execute'`.

Phase 8 adds: `'sensor' | 'mascot'`.

| Theater | Desktop wrapper | Mobile wrapper | Reduced-motion jump |
|---------|-----------------|----------------|---------------------|
| `sensor` | `min-h-[220vh]` | `min-h-[120vh]` | progress **0.90** |
| `mascot` | `min-h-[240vh]` | `min-h-[120vh]` | progress **0.88** |

(Mascot is slightly taller for typing / multi-bubble beats, same idea as Focus.)

### CSS

Add `[data-theater='sensor']` and `[data-theater='mascot']` vh rules next to existing connect/focus/execute rules in [`app/globals.css`](../app/globals.css).

### Code-split

Lazy-load Sensor/Mascot theater demos with `next/dynamic({ ssr: false })` on their pages (same pattern as [`MarketingTheaterSections.tsx`](../components/marketing/MarketingTheaterSections.tsx)) so Framer stays out of the critical depth-page shell.

---

## Sensor theater beat sheet (locked; P8-T05)

**Story:** User opens Sensor, types an intent, sees ranked results, confirms an action.

| Progress | Beat id | UI state | Motion |
|----------|---------|----------|--------|
| **0.00 – 0.12** | `sensor-idle` | Empty command bar; caret; hint “Ask or open anything…” | Bar at rest |
| **0.12 – 0.35** | `sensor-type-query` | Query types: `Open Cal` (scroll-synced char index) | Characters appear |
| **0.35 – 0.55** | `sensor-results` | Calendar, Calculator, Meetings fly in | Stagger `translateY(8px)` + `opacity` |
| **0.55 – 0.72** | `sensor-highlight` | Calendar selected / focus ring | Highlight once |
| **0.72 – 0.90** | `sensor-confirm` | Chip: Opening Calendar… | Chip fade-in |
| **0.90 – 1.00** | `sensor-hold` | Final state hold | Static |

**Reduced-motion jump:** **0.90**  
**Caption:** Sensor finds Calendar from a short command without leaving your flow.  
**Primary query:** `Open Cal` · **Confirm:** Opening Calendar…

Full fixture + helper contracts: [P8-T05](./phase-8/tasks/P8-T05-sensor-beat-sheet.md).

---

## Mascot theater beat sheet (locked; P8-T06)

**Story:** User asks a grounded question; Mascot replies from MindMesh context; Open inbox affordance.

| Progress | Beat id | UI state | Motion |
|----------|---------|----------|--------|
| **0.00 – 0.10** | `mascot-idle` | Chat shell empty / companion ready | Shell at rest |
| **0.10 – 0.28** | `mascot-user-ask` | User bubble: Did I get any emails today? | `translateY` + `opacity` |
| **0.28 – 0.55** | `mascot-typing` | Assistant typing indicator (3 dots) | Opacity pulse only |
| **0.55 – 0.78** | `mascot-reply` | Reply in 3 staged paragraphs | Paragraph `opacity` |
| **0.78 – 0.88** | `mascot-action` | Open inbox control | Button fade-in |
| **0.88 – 1.00** | `mascot-hold` | Final conversation hold | Static |

**Reduced-motion jump:** **0.88**  
**Caption:** Mascot answers from your connected inbox context in one calm thread.  
**Fixtures:** [`MASCOT_THEATER_FIXTURES`](../lib/marketing-sensor-mascot-content.ts)

Full chunking + helper contracts: [P8-T06](./phase-8/tasks/P8-T06-mascot-beat-sheet.md).

---

## Page anatomy (both pages)

1. **Depth hero** (`MarketingDepthLayout`): eyebrow · H1 · subtitle · back link  
2. **How it works** (3 steps; text only)  
3. **Scroll theater** (primary “show how it works” moment; sticky frame + beats above)  
4. **Capabilities** (3–5 concrete abilities)  
5. **When to use Sensor vs Mascot** (comparison strip)  
6. **Privacy / trust note** → `/security`  
7. **CTA** → `/#cta` + sibling page

Theater sits **below** the depth hero, same visual weight as homepage `#connect` / `#focus` / `#execute` (not a tiny static card).

---

## Demo / performance contract

| Rule | Value |
|------|-------|
| Motion | `transform` + `opacity` only |
| Pause | Off-screen + reduced-motion |
| Lottie / live overlays | **Forbidden** on `/sensor` and `/mascot` |
| Images | Local `public/` or pure coded UI; **no** remote `lh3.googleusercontent` |
| Lazy load | Theater demos via `next/dynamic` |
| Homepage | Do not change Connect/Focus/Execute beat sheets |
| LCP | Depth pages advisory; theaters must not block first paint of H1 |

---

## Discovery & IA

| Surface | Change |
|---------|--------|
| FAQ | “Learn more →” to `/sensor` and `/mascot` |
| Feature grid | **Add** Sensor + Mascot cards (7 total); order locked in [P8-T01](./phase-8/tasks/P8-T01-ia-decision.md) |
| Sitemap | Include new routes; drop legacy soft-200 |

---

## Recommended PR sequence

| PR | Scope | Exit criteria |
|----|-------|---------------|
| **PR1** | IA + copy + beat sheets + scroll-kit extension | Thresholds compile; IDs typed |
| **PR2** | Sensor theater demo + `/sensor` page | Scroll scrub works; reduced-motion OK |
| **PR3** | Mascot theater demo + `/mascot` page | Same bar as Sensor |
| **PR4** | Redirect + discovery + overlay allowlist | Legacy URL gone |
| **PR5** | A11y / Lighthouse / sign-off | P8-T19 |

---

## Design / product contract

| Rule | Source |
|------|--------|
| Homepage does not lead with mascot/sensor | P1-T01 |
| Depth pages **show** how each works via scroll theater | This phase |
| Same scroll kit as homepage theaters | Phase 3–4 |
| No live overlay chrome on marketing funnel | P1-T19 / P1-T17 |
| No em dash in new prose | Workspace rule |

---

## Explicit non-goals

- Live Sensor/Mascot overlays on `/` or funnel routes  
- Rewriting Connect / Focus / Execute theaters  
- Live API data in demos  
- Full interactive onboarding tour parity with the desktop app  
- `/dashboard` redesign  

---

## Definition of done

- [x] `/sensor` and `/mascot` on marketing shell with **scroll-linked** theaters  
- [x] Beat sheets implemented (progress scrub + reduced-motion finals)  
- [x] `TheaterId` includes `sensor` / `mascot`; CSS vh rules present  
- [x] Legacy `/sensor&mascot` redirected; overlays allowlist updated  
- [x] FAQ (+ optional feature grid) discover both pages  
- [x] No Lottie / remote hero images on new pages  
- [x] P8-T19 sign-off recorded ([P8-T19](./phase-8/tasks/P8-T19-sign-off.md))  

---

## After Phase 8

| Focus | Notes |
|-------|-------|
| **Phase 9: Slack Marketplace compliance** | [phase-9-slack-compliance.md](./phase-9-slack-compliance.md) · [phase-9-tasks.md](./phase-9-tasks.md): `/sub-processors`, Privacy Slack alignment, GDPR, security contact, no placeholder URLs |
| **Phase 10: Theater upgrades** | [phase-10-theater-upgrades.md](./phase-10-theater-upgrades.md): Sensor calc/definition; Mascot attachment search; mascot icon showcase |
| In-app tours | Product app |
| Combined hub | Only if split URLs confuse |
| Homepage grid analytics | Tune card order if needed |
| Homepage lab LCP exception | Still open from P6 (~2.93s); field CWV via P7-T05 |
