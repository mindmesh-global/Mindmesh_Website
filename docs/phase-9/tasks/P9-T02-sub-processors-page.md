# P9-T02: Build `/sub-processors` Page + Route Gate + Sitemap

**Task ID:** P9-T02  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-10  
**Parent:** [phase-9-tasks.md](../phase-9-tasks.md) | [phase-9-slack-compliance.md](../phase-9-slack-compliance.md)  
**Depends on:** [P9-T01](./P9-T01-sub-processors-copy.md), [P5-T02](../../phase-5/tasks/P5-T02-marketing-depth-layout.md), [P8-T08](../../phase-8/tasks/P8-T08-marketing-route-gate.md)  
**Blocks:** P9-T07, P9-T08  
**Blocker:** Yes

---

## Goal

Ship `/sub-processors` on `MarketingDepthLayout` from the locked P9-T01 content module, add it to the marketing funnel gate, and regenerate the sitemap.

---

## Deliverables

| File | Change |
|------|--------|
| [`app/sub-processors/page.tsx`](../../../app/sub-processors/page.tsx) | Depth page: table, connected-services note, contact |
| [`lib/marketing-routes.ts`](../../../lib/marketing-routes.ts) | Append `/sub-processors` to `MARKETING_FUNNEL_PATHS` |
| [`scripts/verify-marketing-routes.mjs`](../../../scripts/verify-marketing-routes.mjs) | Expect `/sub-processors`; assert trailing slash / query |
| [`public/sitemap.xml`](../../../public/sitemap.xml) | Regenerated via `npm run build` / `postbuild` |

Content source: [`lib/marketing-sub-processors.ts`](../../../lib/marketing-sub-processors.ts) (P9-T01). Footer cross-links deferred to P9-T07.

---

## Funnel paths (locked after this task)

15 paths, including `/sub-processors`. Legacy `/sensor&mascot` remains out of the gate.

---

## Page structure

1. Intro + last updated  
2. Sub-processors table (name, purpose, privacy link)  
3. Connected services note → Privacy  
4. Contact → `team@mindmesh.global`  

Metadata / OG from content module (`https://mindmesh.global/sub-processors`).

---

## Acceptance

- [x] `/sub-processors` on `MarketingDepthLayout`  
- [x] Renders all five locked processors from content module  
- [x] `isMarketingRoute('/sub-processors')` true (incl. trailing slash / query)  
- [x] `node scripts/verify-marketing-routes.mjs` → ok  
- [x] Sitemap includes `https://mindmesh.global/sub-processors`  
- [x] `npm run build` succeeds; route listed in build output  

---

## Verification

```bash
node scripts/verify-marketing-routes.mjs
# verify-marketing-routes: ok

npm run build
# Route (app) includes ○ /sub-processors
# postbuild next-sitemap includes /sub-processors
```

---

## Out of scope

- Footer / security / privacy cross-links (P9-T07)  
- Privacy Slack rewrite (P9-T04)  
- Placeholder URL audit (P9-T03)  

---

## Next

**P9-T03:** Placeholder URL audit now that the real sub-processors URL exists.
