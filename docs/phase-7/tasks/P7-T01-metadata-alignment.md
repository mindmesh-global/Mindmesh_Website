# P7-T01: Metadata Alignment (ex-P6-T11)

**Task ID:** P7-T01  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-7-tasks.md](../phase-7-tasks.md) | [phase-7-launch.md](../phase-7-launch.md)  
**Depends on:** [P6-T15](../../phase-6/tasks/P6-T15-sign-off.md), [P6-T10](../../phase-6/tasks/P6-T10-regenerate-og-image.md), [P1-T03](../../phase-1/tasks/P1-T03-hero-copy.md)  
**Blocks:** P7-T12

---

## Goal

Align root + key-route `metadata` with the approved cognitive-layer narrative. Remove leftover “AI-Powered Productivity Assistant” wording and em dashes from titles we own.

---

## Canonical copy (P1-T03)

| Field | Value |
|-------|-------|
| Title | `MindMesh - The Cognitive Layer for modern work` |
| Description | `Purpose-built for the modern professional. Connect your apps, find what matters most right now, get it done.` |
| Template | `%s \| MindMesh` for depth routes |

Shared via [`lib/seo.ts`](../../../lib/seo.ts): `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_NAME`, `OG_IMAGE`.

---

## Deliverables

| File | Change |
|------|--------|
| [`lib/seo.ts`](../../../lib/seo.ts) | Added `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_NAME`; OG alt uses `SITE_TITLE` |
| [`app/layout.tsx`](../../../app/layout.tsx) | Root default/OG/Twitter use shared constants; keywords updated |
| [`app/page.tsx`](../../../app/page.tsx) | Homepage metadata imports shared constants (already correct copy) |
| [`app/terms/page.tsx`](../../../app/terms/page.tsx) | Title/description + OG/Twitter; dropped “Cognitive OS / Productivity Assistant” |
| [`app/dashboard/layout.tsx`](../../../app/dashboard/layout.tsx) | Removed em dash; narrative-aligned description + OG/Twitter |
| [`app/billing/page.tsx`](../../../app/billing/page.tsx) | OG/Twitter titles → `MindMesh \| …` pattern |
| [`app/connected-apps/page.tsx`](../../../app/connected-apps/page.tsx) | OG/Twitter → `MindMesh \| Connected Apps` |
| [`app/sensor&mascot/page.tsx`](../../../app/sensor&mascot/page.tsx) | OG/Twitter → `MindMesh \| Sensor & Mascot` |

Depth pages that already matched (`/inbox`, `/security`, `/trust`, `/faq`, `/privacy`, `/contact`, narratives, events) were left as-is.

---

## Before → after (root)

| Field | Before | After |
|-------|--------|-------|
| Default title | `MindMesh — AI-Powered Productivity Assistant App` | `MindMesh - The Cognitive Layer for modern work` |
| Description | Meeting notes / 2+ hours daily pitch | P1-T03 purpose-built description |
| Keywords | meeting notes, task automation | cognitive layer, orchestration, local-first, … |

---

## Acceptance criteria

- [x] No “AI-Powered Productivity Assistant” in `app/` or `lib/` metadata
- [x] No em dash (`—`) in root / dashboard / terms metadata we edited
- [x] Homepage still uses absolute P1-T03 title
- [x] Shared constants in `lib/seo.ts` for title, description, OG
- [x] Key legal/dashboard/billing titles use `MindMesh | …` or segment titles (template applies)

---

## Verification

```text
rg 'AI-Powered|Productivity Assistant|Cognitive OS|MindMesh —' app lib  → clean
SITE_TITLE / SITE_DESCRIPTION exported from lib/seo.ts
Root layout imports shared constants
```

---

## Next steps

- **P7-T02:** `/terms` marketing shell (page still on SiteNav + CSS module; metadata already updated)
