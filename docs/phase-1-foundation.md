# Phase 1: Foundation

**Status:** Complete (2026-07-03). Sign-off: [P1-T24-sign-off.md](./phase-1/tasks/P1-T24-sign-off.md). Next: [Phase 2 tasks](./phase-2-tasks.md).

Part of the larger [Linear-Style MindMesh Site plan](../.cursor/plans/linear-style_mindmesh_site_4a34906f.plan.md). This document is the detailed spec for Phase 1 only: narrative, information architecture, design tokens, performance budget, and the cleanup list. Nothing here touches code; Phase 2 is where implementation starts.

Phase 1 has one job: **remove every open decision** so that Phase 2-6 are pure execution, not debate.

**Task breakdown:** [phase-1-tasks.md](./phase-1-tasks.md) (24 tasks, expandable one at a time)

---

## 1. Product narrative (messaging stack)

### Hero headline

> **The Cognitive Layer for modern work**

### Hero taglines

> Purpose-built for the modern professional.  
> Designed for the AI era.

### Functional thesis (Connect / Prioritize / Execute)

> MindMesh connects your apps, finds the one thing that matters most right now, and gets it done for you.

**Audience strategy (hybrid):** Wide category in the headline (modern work / information across apps). **Proof wedge** in problem copy and product demos: product development teams (PMs, engineers). Slack and Jira lead the demo story; others self-select without being excluded from the H1.

Three beats everything on the homepage must reinforce, in order:

1. **Connect** - your tools become sources MindMesh can see.
2. **Prioritize** - MindMesh cuts through the noise to surface the single most important focus.
3. **Execute** - MindMesh acts on it (drafts, schedules, checks off, summarizes) instead of just telling you.

Anything that doesn't map to Connect / Prioritize / Execute does not belong on the homepage.

**Narrative spec (done):** [phase-1/tasks/P1-T01-narrative.md](./phase-1/tasks/P1-T01-narrative.md)

**Section map (done):** [phase-1/tasks/P1-T02-section-map.md](./phase-1/tasks/P1-T02-section-map.md)

**Hero copy (done):** [phase-1/tasks/P1-T03-hero-copy.md](./phase-1/tasks/P1-T03-hero-copy.md)

**Problem copy (done):** [phase-1/tasks/P1-T04-problem-copy.md](./phase-1/tasks/P1-T04-problem-copy.md)

**How it works copy (done):** [phase-1/tasks/P1-T05-how-it-works-copy.md](./phase-1/tasks/P1-T05-how-it-works-copy.md)

---

## 2. Homepage section map and copy briefs

Long-scroll single page at `/`. Ten sections, in this order. Each row is a brief, not final copy, drafts to refine in Phase 5 when we write the actual section components.

| # | Section | Purpose | Copy brief | Depth link |
|---|---------|---------|------------|------------|
| 1 | Hero | Land category + era in under 3 seconds | H1: "The Cognitive Layer for modern work." Subhead: "Purpose-built for the modern professional. Designed for the AI era." Body: functional thesis. Optional wedge line: "Built for the teams who ship first." CTAs unchanged. | - |
| 2 | Problem | Earn the "why" (wide hook, wedge proof) | Open wide: information across apps, no clear "what now." Then 3 wedge lines (Slack/Jira/email sprawl for product teams). Do not say "PMs only." | - |
| 3 | How it works | Set up the 3-beat structure before showing it | Three numbered steps: Connect your apps -> MindMesh finds your one priority -> MindMesh takes the action. This section is text + icons only, no demo yet (the demo sections prove it next). | - |
| 4 | Product theater: Connect | Prove step 1 visually | "Bring every app into one place." Sequence shows Gmail, Google Calendar, Outlook Email, Outlook Calendar, SMTP, Slack, and Jira connecting live. | `/connected-apps` |
| 5 | Product theater: Focus | Prove step 2, the core differentiator | "One thing. Right now." Sequence shows noisy inbox + calendar collapsing into a single priority card with a plain-English reason. | `/yesterdays-narrative` |
| 6 | Product theater: Execute | Prove step 3, close the loop | "MindMesh doesn't just tell you. It does it." Sequence shows a drafted reply, a scheduled block, a checked-off task. | `/upcoming-events`, `/inbox` |
| 7 | Feature grid | Give depth-seekers a map | 5-6 cards linking to existing feature pages (see table below). | multiple |
| 8 | Integrations | Show breadth without overclaiming | Logo row of the 7 apps we support today (see Section 6). Framed as "Connect what you already use" with "More integrations added regularly" instead of implying a large catalog. | `/connected-apps` |
| 9 | Social proof | Build trust pre-conversion | Lead with credibility over vanity numbers: "NVIDIA Inception Program member" + security/privacy trust line. Keep waitlist count as secondary context only ("Early users: 10+") until numbers are meaningful. | `/security`, `/trust` |
| 10 | Final CTA | Convert | Repeat primary CTA, restate the one-sentence thesis, waitlist form inline. | - |

### Feature grid destinations (Section 7)

Reuse pages that already exist instead of inventing new ones:

| Card | Links to |
|------|----------|
| Inbox | [`app/inbox/page.tsx`](../app/inbox/page.tsx) |
| Connected apps | [`app/connected-apps/page.tsx`](../app/connected-apps/page.tsx) |
| Daily narrative | [`app/yesterdays-narrative/page.tsx`](../app/yesterdays-narrative/page.tsx) |
| Upcoming events | [`app/upcoming-events/page.tsx`](../app/upcoming-events/page.tsx) |
| Security | [`app/security/page.tsx`](../app/security/page.tsx) |
| Sensor & mascot (optional, lower priority) | [`app/sensor&mascot/page.tsx`](../app/sensor&mascot/page.tsx) |

---

## 3. Design system consolidation

### 3.1 Decision: single source of truth

Today there are three competing visual systems (Hero dark `#0a0a14`, `mm-*` tokens, shadcn HSL vars). Phase 1 output: **one marketing theme**, dark-first, built on the existing `mm-*` palette in [`tailwind.config.ts`](../tailwind.config.ts) because it's the richest and most on-brand set already in the codebase.

### 3.2 Semantic aliases to add

Add these on top of the existing `mm-*` raw tokens so components reference intent, not raw color names. Values map to existing `mm-*` entries, no new colors invented:

| Semantic token | Maps to existing `mm-*` value |
|---|---|
| `--mm-bg` | `mm.background` (`#060e20`) |
| `--mm-surface` | `mm.surface-container` (`#0a1836`) |
| `--mm-surface-raised` | `mm.surface-container-high` (`#0f1e3f`) |
| `--mm-border` | `mm.outline-variant` (`#364770`) |
| `--mm-text` | `mm.on-background` (`#dee5ff`) |
| `--mm-text-muted` | `mm.on-surface-variant` (`#99aad9`) |
| `--mm-accent` | `mm.primary` (`#adc6ff`) |
| `--mm-accent-strong` | `mm.primary-fixed` (`#4388fd`) |

### 3.3 Typography

| Role | Font | Notes |
|---|---|---|
| Body / UI | Inter (already loaded in [`app/layout.tsx`](../app/layout.tsx)) | Keep as-is |
| Display / headlines | Manrope (new primary marketing display font) | Move away from Syne. Use a crisp geometric sans closer to Linear-style typography for hero and section headlines. |
| Monospace (optional, for demo UI code-like bits) | System mono or `next/font` addition | Only if a theater sequence needs it |

Type scale (Linear-style: fewer sizes, bigger jumps):

| Token | Size | Usage |
|---|---|---|
| `display-xl` | 64-80px | Hero headline |
| `display-lg` | 40-48px | Section headlines |
| `heading` | 24-28px | Card/subsection titles |
| `body-lg` | 18-20px | Hero subhead, lead paragraphs |
| `body` | 16px | Default body copy |
| `caption` | 13-14px | Labels, eyebrow text |

### 3.4 Spacing, radius, layout

- Max content width: `1120-1200px`
- Section vertical padding: `py-24` (mobile) to `py-32` (desktop)
- Corner radius: `6-8px` for cards and buttons (tighter than current defaults, matches Linear's crisp feel)
- Grid: 12-column, `24px` gutter on desktop

### 3.5 Deliverable for this subsection

Marketing token reference (done): [P1-T16-token-reference.md](./phase-1/tasks/P1-T16-token-reference.md). Phase 2 copies the CSS block into [`app/globals.css`](../app/globals.css) under `[data-marketing-theme="dark"]` before writing `components/marketing/*`.

---

## 4. Performance budget

Concrete, testable targets. Every later phase gets checked against this list, not vibes.

| Metric | Target | How we'll measure |
|---|---|---|
| LCP | < 2.5s on throttled mid-tier mobile | Lighthouse (mobile preset) |
| INP | < 200ms | Lighthouse / Chrome DevTools Performance panel |
| CLS | < 0.1 | Lighthouse |
| Homepage initial JS | Hero + layout only; theater sections code-split | `next build` bundle analyzer |
| Scroll animations | `transform` and `opacity` only, no layout-triggering properties | Manual code review per section |
| Below-fold sections | `next/dynamic({ ssr: false })` + `content-visibility: auto` | Implementation checklist in Phase 6 |
| Images | Next.js image optimization enabled (currently `unoptimized: true` in [`next.config.js`](../next.config.js)) | Config change, Phase 6 |
| Reduced motion | All scroll-linked sections render a static final frame under `prefers-reduced-motion: reduce` | Manual QA per sequence |

Tooling to set up in Phase 1 (light lift, just wiring):

- Confirm Lighthouse CI or a manual Lighthouse run is part of the workflow before merging Phase 2+.
- Decide whether to add `@next/bundle-analyzer` now (cheap, useful going forward).

---

## 5. Deprecation and reuse list

### 5.1 Remove or relocate (Hero replacement)

| Item | Disposition |
|---|---|
| [`components/Hero.tsx`](../components/Hero.tsx) | Remove from `/` in Phase 2; delete entirely once all Hero routes are migrated (Phase 6) |
| `FeaturesWindow`, `DocsWindow`, `SocialWindow`, `PricingWindow`, `ContactWindow`, `AppDirectoryWindow`, `MovieWindow` | Remove once their routes are migrated to plain pages or homepage sections |
| [`lib/mindmesh-hero-routes.ts`](../lib/mindmesh-hero-routes.ts) | Delete after redirects are in place (Phase 6) |
| [`components/ConditionalOverlays.tsx`](../components/ConditionalOverlays.tsx) (mascot, sensor bar) | Gate off the new homepage and all primary marketing routes; keep mascot/sensor experience on dedicated pages only (for example [`app/sensor&mascot/page.tsx`](../app/sensor&mascot/page.tsx)). |
| [`components/CustomCursorFollower.tsx`](../components/CustomCursorFollower.tsx), [`CustomContextMenu.tsx`](../components/CustomContextMenu.tsx) | Remove from marketing routes, too heavy for a Linear-style feel |

### 5.2 Reuse as-is (source of truth for product theater)

| Item | Use |
|---|---|
| [`components/dashboard/StaticConnectedApps.tsx`](../components/dashboard/StaticConnectedApps.tsx) | Base for Sequence A (Connect) |
| [`components/dashboard/StaticDailySummaryPanel.tsx`](../components/dashboard/StaticDailySummaryPanel.tsx), [`StaticInboxList.tsx`](../components/dashboard/StaticInboxList.tsx), [`StaticCalendarEvents.tsx`](../components/dashboard/StaticCalendarEvents.tsx) | Base for Sequence B (Focus) |
| [`components/dashboard/StaticDailyNarrativeCard.tsx`](../components/dashboard/StaticDailyNarrativeCard.tsx) | Base for Sequence C (Execute) |
| [`components/ui/TypingText.tsx`](../components/ui/TypingText.tsx) | Reuse for the draft-typing beat in Sequence C |
| [`components/WaitlistModal.tsx`](../components/WaitlistModal.tsx) + [`app/api/waitlist/route.ts`](../app/api/waitlist/route.ts) | Reuse for final CTA, unchanged |

---

## 6. Known content and asset gaps (surface now, decide before Phase 5)

Real inventory found in the codebase, called out so nobody assumes we have more than we do:

- **Integrations messaging needs alignment across repos.** Full audit: [P1-T20-integrations-audit.md](./phase-1/tasks/P1-T20-integrations-audit.md). All 7 apps (Gmail, Google Calendar, Outlook Email, Outlook Calendar, SMTP, **Slack**, **Jira**) are **production-ready** in the desktop app (`mindmesh_app`). The **website** still lags: [`app/connected-apps/page.tsx`](../app/connected-apps/page.tsx) lists 5 apps, and [`StaticConnectedApps.tsx`](../components/dashboard/StaticConnectedApps.tsx) renders 4.
- **No testimonials or customer logos exist yet, but we do have credibility signals.** Section 9 will lead with "NVIDIA Inception Program member" plus security/privacy trust messaging. Waitlist size is early-stage ("10+" users), so it should be secondary, not the headline claim.
- **OG image and hero screenshot** ([`public/og-image.png`](../public/og-image.png)) will need to be regenerated once the new hero frame exists (Phase 6 task, flagged here so it's not forgotten).

---

## 7. Definition of done for Phase 1

**Phase 1 complete:** 2026-07-03. Formal sign-off: [P1-T24-sign-off.md](./phase-1/tasks/P1-T24-sign-off.md).

Phase 1 is complete when all of the following exist as agreed decisions (not code):

- [x] Section map above is approved (order, count, and purpose of all 10 homepage sections) — [P1-T02-section-map.md](./phase-1/tasks/P1-T02-section-map.md)
- [x] Product narrative and messaging pillars locked ([P1-T01-narrative.md](./phase-1/tasks/P1-T01-narrative.md))
- [x] Hero copy brief approved — [P1-T03-hero-copy.md](./phase-1/tasks/P1-T03-hero-copy.md)
- [x] Problem copy brief approved — [P1-T04-problem-copy.md](./phase-1/tasks/P1-T04-problem-copy.md)
- [x] How it works copy brief approved — [P1-T05-how-it-works-copy.md](./phase-1/tasks/P1-T05-how-it-works-copy.md)
- [x] Semantic `--mm-*` token list approved and mapped to existing raw values — [P1-T13-color-tokens.md](./phase-1/tasks/P1-T13-color-tokens.md)
- [x] Typography scale and font choice for headlines confirmed (Manrope display, Inter body; Syne retired) — [P1-T14-typography.md](./phase-1/tasks/P1-T14-typography.md)
- [x] Performance budget table accepted as the standard Phase 2-6 will be checked against — [P1-T17-performance-budget.md](./phase-1/tasks/P1-T17-performance-budget.md)
- [x] Deprecation list confirmed: mascot/sensor are kept on dedicated pages, not primary marketing flow — [P1-T19-deprecation-reuse.md](./phase-1/tasks/P1-T19-deprecation-reuse.md)
- [x] Decision made on Section 9 (social proof): lead with NVIDIA Inception + trust messaging, keep waitlist "10+" secondary
- [x] Integrations section copy direction confirmed: include Slack and Jira alongside existing email/calendar sources — [P1-T10-integrations.md](./phase-1/tasks/P1-T10-integrations.md), [P1-T21-slack-jira-assets.md](./phase-1/tasks/P1-T21-slack-jira-assets.md)
- [x] Phase 1 sign-off recorded — [P1-T24-sign-off.md](./phase-1/tasks/P1-T24-sign-off.md)

---

## 8. Decision log (locked)

- **Social proof direction:** Lead with NVIDIA Inception Program credibility and security/privacy trust language. Keep waitlist count present but secondary ("10+ early users").
- **Mascot and sensor bar direction:** Keep on dedicated pages only, not on the primary homepage or top-of-funnel marketing flow.
- **Display typography direction:** Replace Syne in marketing headlines with a crisper geometric sans (Manrope).
- **Integrations scope direction:** Market a 7-app baseline in the new homepage story: Gmail, Google Calendar, Outlook Email, Outlook Calendar, SMTP, Slack, Jira.
