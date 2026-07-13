# P1-T21: Slack and Jira Brand Assets for Marketing

**Task ID:** P1-T21  
**Status:** done  
**Type:** Asset + documentation (Phase 2 wires into `IntegrationsSection.tsx`, Phase 4 Connect theater)  
**Completed:** 2026-07-03  
**Parent:** [phase-1-tasks.md](../phase-1-tasks.md) | [phase-1-foundation.md](../phase-1-foundation.md)  
**Depends on:** [P1-T10-integrations.md](./P1-T10-integrations.md), [P1-T20-integrations-audit.md](./P1-T20-integrations-audit.md)  
**Blocks:** Phase 2 `#integrations` grid, Phase 4 Connect theater, [P1-T23](./P1-T23-theater-reuse-map.md) fixture paths

---

## Quick reference

| App | Primary asset | Size | Source |
|-----|---------------|------|--------|
| **Slack** | [`public/images/icons/slack.png`](../../../public/images/icons/slack.png) | 512×512 | Rasterized from desktop `AppBrandIcon.tsx` inline SVG |
| **Slack (source)** | [`public/images/icons/slack.svg`](../../../public/images/icons/slack.svg) | 24×24 viewBox | Same paths as product app |
| **Jira** | [`public/images/icons/jira.png`](../../../public/images/icons/jira.png) | 512×512 | Copied from `mindmesh_app/apps/desktop/public/img/apps/jira.png` |

**Bonus (same pass):** [`outlook-calendar.png`](../../../public/images/icons/outlook-calendar.png) normalized from 48×48 → 512×512 for visual weight parity ([P1-T10](./P1-T10-integrations.md)).

---

## Asset inventory

### Slack

| Property | Value |
|----------|-------|
| **Website path** | `/images/icons/slack.png` |
| **Format** | PNG, RGBA, transparent background |
| **Dimensions** | 512×512 px |
| **File size** | ~19 KB |
| **Logo type** | Slack hash mark (4-color) |
| **Colors** | `#E01E5A`, `#36C5F0`, `#2EB67D`, `#ECB22E` |
| **Alt text** | `Slack integration` |
| **Product source** | Inline SVG in `mindmesh_app/apps/desktop/components/AppBrandIcon.tsx` (`SlackBrandIcon`); **no PNG** in desktop `public/img/apps/` |

**Why SVG → PNG:** Marketing site uses PNG icons for all integrations ([P1-T10](./P1-T10-integrations.md)). Slack exists only as inline SVG in the desktop app; exported to match Gmail/Jira grid pattern.

### Jira

| Property | Value |
|----------|-------|
| **Website path** | `/images/icons/jira.png` |
| **Format** | PNG, RGBA |
| **Dimensions** | 512×512 px |
| **File size** | ~8 KB |
| **Logo type** | Jira Software app icon (blue tile + white chevrons) |
| **Alt text** | `Jira integration` |
| **Product source** | `mindmesh_app/apps/desktop/public/img/apps/jira.png` (already 512×512) |

**Note:** Desktop app also has `jira-temp.png` (legacy); **do not use** on marketing site. Use `jira.png` only.

---

## Dark background check (`#060e20`)

Marketing sections use `--mm-bg` `#060e20` ([P1-T13](./P1-T13-color-tokens.md)).

| Asset | On dark bg | Verdict |
|-------|------------|---------|
| **Slack** | 4-color hash on transparent; no white plate | ✅ Readable; matches Gmail/Calendar weight |
| **Jira** | Blue app tile (self-contained square) | ✅ Strong contrast; same pattern as other app-tile icons |

**Render context:** Icons sit inside integration cells at 48–64px display size ([P1-T10 layout](./P1-T10-integrations.md)); no additional dark-mode variant needed.

---

## Visual weight parity

Compared to existing `public/images/icons/` at 512×512:

| Icon | Style | Notes |
|------|-------|-------|
| Gmail | Full-color app tile | Reference weight |
| Google Calendar | Full-color app tile | Reference weight |
| Outlook Email | Full-color app tile | Reference weight |
| Outlook Calendar | Full-color app tile | **Upscaled** 48→512 in this task |
| SMTP Mailbox | Full-color app tile | Reference weight |
| **Slack** | Hash mark, ~85% of canvas | Matches desktop `BRAND_VISUAL_SCALE.slack = 1` |
| **Jira** | Full blue tile | Matches Gmail tile density |

**Phase 2 CSS:** Use `object-contain` in a fixed square; optional per-icon scale only if grid review shows mismatch (Slack/Jira should not need adjustment).

---

## Usage guidelines

### Minimum size

| Context | Min size | Recommended |
|---------|----------|-------------|
| `#integrations` logo grid | 32×32 px | 48–64 px |
| Connect theater app card | 40×40 px | 48 px |
| `/connected-apps` list row | 24×24 px | 32 px |

Do not render below **24×24 px**; hash mark detail degrades.

### Clear space

| Brand | Rule |
|-------|------|
| **Slack** | Minimum clear space = height of one hash "pill" on all sides ([Slack brand guidelines](https://slack.com/intl/en-gb/media-kit)) |
| **Jira** | Minimum clear space = 25% of icon height on all sides ([Atlassian brand resources](https://www.atlassian.com/company/news/press-kit)) |

In the integrations grid, cell padding (`gap` + internal padding from [P1-T15](./P1-T15-layout-rules.md)) satisfies clear space at 48px+ render size.

### Do

- Use official colors unchanged
- Use transparent PNG background (no forced white plate on Slack)
- Use canonical display names: **Slack**, **Jira** ([P1-T10](./P1-T10-integrations.md))
- Set alt text: `{Display name} integration`

### Do not

- Recolor, rotate, skew, or add shadows/glow to logos
- Use Slack wordmark in place of hash mark in the icon grid
- Imply partnership beyond "integration" copy
- Use `jira-temp.png` or unofficial third-party icons

---

## Brand compliance

| Brand | Resource | MindMesh usage |
|-------|----------|----------------|
| Slack | [Slack media kit](https://slack.com/intl/en-gb/media-kit) | Hash mark only; integration context |
| Atlassian / Jira | [Atlassian press kit](https://www.atlassian.com/company/news/press-kit) | Jira Software icon; integration context |

**Copy pairing (from [P1-T10](./P1-T10-integrations.md)):**

| App | Category label |
|-----|----------------|
| Slack | Messaging |
| Jira | Tasks |

**Legal pages (Phase 5/6):** Privacy and trust copy must name Slack and Jira as third-party data processors ([P1-T20 gaps](./P1-T20-integrations-audit.md)).

---

## Provenance log

| File | Action | Date | Source |
|------|--------|------|--------|
| `slack.svg` | Created | 2026-07-03 | Paths from `mindmesh_app/.../AppBrandIcon.tsx` `SlackBrandIcon` |
| `slack.png` | Exported 512×512 | 2026-07-03 | `sharp` rasterize from `slack.svg` |
| `jira.png` | Copied + verified | 2026-07-03 | `mindmesh_app/apps/desktop/public/img/apps/jira.png` |
| `outlook-calendar.png` | Upscaled 512×512 | 2026-07-03 | Existing website 48×48 source (visual weight fix) |

**Desktop app path (authoritative product backup):**  
`/Users/rohittripathi/Desktop/mindmesh_app/apps/desktop/public/img/apps/`

---

## Phase 2 implementation

### Shared constant (from P1-T10)

```ts
// lib/marketing-integrations.ts — entries 6–7 now have real assets
{
  id: 'slack',
  displayName: 'Slack',
  category: 'Messaging',
  iconSrc: '/images/icons/slack.png',
},
{
  id: 'jira',
  displayName: 'Jira',
  category: 'Tasks',
  iconSrc: '/images/icons/jira.png',
},
```

### Next/image usage

```tsx
<Image
  src="/images/icons/slack.png"
  alt="Slack integration"
  width={512}
  height={512}
  className="h-12 w-12 object-contain"
/>
```

Same pattern for Jira. Prefer static PNG imports or public paths; no Lucide placeholders on homepage.

---

## Acceptance criteria checklist

- [x] `slack.png` and `jira.png` in `public/images/icons/`
- [x] Assets readable on dark `#060e20` background
- [x] Consistent visual weight with existing Gmail/Outlook icons (512×512 grid)
- [x] Usage guidelines (minimum size, clear space) documented
- [x] Source provenance recorded (desktop app + AppBrandIcon SVG)

---

## Stakeholder sign-off

| Role | Name | Decision | Date |
|------|------|----------|------|
| Product / founder | Rohit | Approved Slack/Jira assets for marketing | 2026-07-03 |

**P1-T21 status:** Done. All 7 integration icons present in `public/images/icons/`. Proceed to [P1-T24](../phase-1-tasks.md#p1-t24--phase-1-sign-off-checklist) sign-off or Phase 2 build.

---

## Downstream handoff

| Consumer | Uses from this task |
|----------|---------------------|
| Phase 2 `IntegrationsSection.tsx` | `slack.png`, `jira.png` |
| Phase 4 Connect theater | Same paths via `CONNECTED_APP_FIXTURES_ACME` ([P1-T23](./P1-T23-theater-reuse-map.md)) |
| Phase 5 `/connected-apps` | Replace Lucide placeholders |
| Phase 5/6 legal copy | Named third-party list |
