# P6-T15: Phase 6 Sign-Off Checklist

**Task ID:** P6-T15  
**Status:** done  
**Type:** Formal gate (documentation + verification)  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** P6-T01–T14 (blockers required; non-blockers optional)  
**Unblocks:** [Phase 7 launch hardening](../phase-7-launch.md) · [phase-7-tasks.md](../phase-7-tasks.md)

---

## Verdict

**Phase 6 is complete.** All **blocker** tasks are `done`. Optional polish (P6-T13, P6-T14) is also done. One non-blocker remains open by design: **P6-T11** metadata alignment (carried to Phase 7).

| Gate | Result |
|------|--------|
| Blocker tasks (11) | ✅ All done |
| Optional polish (T05, T13, T14) | ✅ Done |
| Non-blocker open | ⏸ P6-T11 → Phase 7 |
| Child task docs | ✅ 14/15 in `docs/phase-6/tasks/` (+ this sign-off; T11 deferred) |
| Hero deleted + redirects live | ✅ |
| Homepage LCP gate | ✅ Exception signed ([P6-T09](./P6-T09-homepage-lighthouse-rebaseline.md)) |
| OG + `next/image` | ✅ |
| Phase 7 entry + task list | ✅ [phase-7-launch.md](../phase-7-launch.md), [phase-7-tasks.md](../phase-7-tasks.md) |

---

## Master checklist (from phase-6-polish.md)

- [x] Remaining Hero traffic routes redirect or are plain marketing pages
- [x] `Hero.tsx`, Hero windows, and `mindmesh-hero-routes.ts` deleted (zero callers)
- [x] Homepage LCP gate closed **via signed exception** (median 2.93s; H1 is LCP element)
- [x] OG image refreshed
- [x] `images.unoptimized` no longer required for marketing
- [x] P6-T15 sign-off recorded (this doc)

---

## Blocker task sign-off

| ID | Task | Deliverable | Status |
|----|------|-------------|--------|
| P6-T01 | Hero inventory | [P6-T01](./P6-T01-hero-inventory.md) | ✅ |
| P6-T02 | Legacy redirects | [P6-T02](./P6-T02-legacy-hero-redirects.md) | ✅ |
| P6-T03 | `/contact` marketing page | [P6-T03](./P6-T03-contact-marketing-page.md) | ✅ |
| P6-T04 | `/waitlist` retirement | [P6-T04](./P6-T04-waitlist-retirement.md) | ✅ |
| P6-T06 | Clean Hero route lists | [P6-T06](./P6-T06-clean-hero-route-lists.md) | ✅ |
| P6-T07 | Delete Hero + windows | [P6-T07](./P6-T07-delete-hero-windows.md) | ✅ |
| P6-T08 | LCP font / H1 strategy | [P6-T08](./P6-T08-homepage-lcp-font-strategy.md) | ✅ |
| P6-T09 | Lighthouse re-baseline | [P6-T09](./P6-T09-homepage-lighthouse-rebaseline.md) | ✅ |
| P6-T10 | OG / social image | [P6-T10](./P6-T10-regenerate-og-image.md) | ✅ |
| P6-T12 | `next/image` optimization | [P6-T12](./P6-T12-next-image-optimization.md) | ✅ |
| P6-T15 | This sign-off | This doc | ✅ |

### Non-blockers / optional (status)

| ID | Task | Deliverable | Status |
|----|------|-------------|--------|
| P6-T05 | `/billing` marketing shell | [P6-T05](./P6-T05-billing-marketing-shell.md) | ✅ |
| P6-T11 | Metadata alignment | — | ⏸ Deferred → **P7-T01** |
| P6-T13 | FAQ + privacy shell | [P6-T13](./P6-T13-faq-privacy-marketing-shell.md) | ✅ |
| P6-T14 | `content-visibility` | [P6-T14](./P6-T14-content-visibility.md) | ✅ |

---

## Verification snapshot (2026-07-09)

| Check | Result |
|-------|--------|
| `node scripts/verify-marketing-routes.mjs` | ok (`/faq`, `/privacy`, `/billing` gated) |
| `components/Hero.tsx` | Deleted |
| `lib/mindmesh-hero-routes.ts` | Deleted; replaced by `lib/mindmesh-legacy-routes.ts` |
| `next.config.js` global `images.unoptimized` | Removed; AVIF/WebP + qualities `[75, 100]` |
| `public/og-image.png` | 1200×630 marketing frame |
| Homepage Lighthouse median | LCP **2.93s** · CLS **0** · score **95** |
| `content-visibility` on `#features` / `#integrations` / `#trust` | Applied; theaters excluded; CLS 0 |

---

## Performance summary (Phase 6)

| Check | Result | Doc |
|-------|--------|-----|
| Font / H1 LCP path | Pass (H1 is LCP element) | [P6-T08](./P6-T08-homepage-lcp-font-strategy.md) |
| Lighthouse × 3 | Median LCP 2.93s; exception signed | [P6-T09](./P6-T09-homepage-lighthouse-rebaseline.md) |
| vs Phase 3 | −1.13s LCP; score 84 → 95 | Baselines |
| `next/image` | Enabled; icons/mockups AVIF | [P6-T12](./P6-T12-next-image-optimization.md) |
| Below-fold CV | Sections 7–9 only | [P6-T14](./P6-T14-content-visibility.md) |

**LCP exception remains in force** until field CWV or a later lab pass closes the &lt; 2.5s gap (Phase 7 monitoring).

---

## Explicit deferrals (do not block Phase 7 start)

| Item | Phase 7 task | Notes |
|------|--------------|-------|
| Root / route metadata narrative alignment | P7-T01 | Was P6-T11; root still has older “AI-Powered…” titles + em dash |
| `/terms` marketing shell | P7-T02 | Still CSS module + legacy chrome |
| `/inbox` depth LCP follow-up | P7-T03 | Advisory from P5-T14 (~5.4s) |
| Lighthouse CI | P7-T04 | Deferred from P1-T18 / Phase 6 optional |
| Field CWV / CrUX monitoring | P7-T05 | After Phase 6 “production monitoring” |
| README / migration doc Hero cleanup | P7-T06 | `QUICK_START.md`, `README-MIGRATION.md` still mention Hero |
| Bundle analyzer wiring | P7-T07 | Optional; verify Framer stays theater-only |
| Content / theater copy iteration | P7-T08+ | No shell churn |

---

## Code inventory (Phase 7 starting point)

| Module | Path |
|--------|------|
| Marketing homepage | `app/page.tsx`, `components/marketing/*` |
| Route gate | `lib/marketing-routes.ts` (includes `/faq`, `/privacy`, `/billing`) |
| Depth layout | `components/marketing/MarketingDepthLayout.tsx` |
| Legacy dashboard chrome | `lib/mindmesh-legacy-routes.ts`, `/dashboard`, `/sensor&mascot` |
| Image config | `next.config.js` → optimization on |
| OG asset | `public/og-image.png` |
| Still legacy shell | `app/terms/*` (CSS module) |
| Stale metadata | `app/layout.tsx` default title / Twitter copy |

---

## Next steps

1. Start **Phase 7** from [phase-7-launch.md](../phase-7-launch.md)
2. First recommended task: **P7-T01** metadata alignment (ex-P6-T11)
3. Parallel: `/terms` shell (P7-T02) and Lighthouse CI sketch (P7-T04) when ready for CI
