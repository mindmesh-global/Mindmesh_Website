# P3-T10: Verify Framer Motion Only in Theater Chunks

**Task ID:** P3-T10  
**Status:** done  
**Type:** Verification (+ bundle split fix)  
**Completed:** 2026-07-04  
**Parent:** [phase-3-tasks.md](../phase-3-tasks.md)  
**Depends on:** P3-T04, P3-T06–T08, P1-T17

---

## Goal

Confirm the Phase 3 scroll kit did not pull Framer Motion, legacy Hero, or dotlottie into the `/` page entry bundle. Framer should load only when theater async chunks hydrate.

---

## Verification method

Production build (`npm run build`) + RSC client manifest parse (`.next/server/app/page_client-reference-manifest.js`) + grep of `.next/static/chunks/*.js`.

No `@next/bundle-analyzer` wired yet ([P1-T18](../phase-1/tasks/P1-T18-perf-workflow.md)); manual chunk inspection used instead.

**Build:** Next.js 16.1.1 (Turbopack) · 2026-07-04

---

## Results

### Initial `/` sync chunks (4 total)

| Chunk | framer / useScroll | dotlottie | Hero / mascot |
|-------|-------------------|-----------|---------------|
| `ff1a16fafef87110.js` | absent | absent | absent |
| `2f3b0b462ac90336.js` | absent | absent | absent |
| `897d7b87d52fa2f5.js` | absent | absent | absent |
| `1b3f90a3b5bb1d30.js` | absent | absent | absent |

Includes: layout shell, `MarketingNav`, `MarketingTheaterSections` dynamic loader (import stubs only), `WaitlistForm`.

### Framer Motion / `useScroll` chunks (async only)

| Chunk | Theater | Size |
|-------|---------|------|
| `754ac56c87e8354a.js` | `ProductTheaterConnect` + `TheaterScrollSection` | ~15 KiB |
| `b1c537298303b830.js` | `ProductTheaterFocus` + `TheaterScrollSection` | ~15 KiB |
| `4b46ad09cdbf69bb.js` | `ProductTheaterExecute` + `TheaterScrollSection` | ~16 KiB |

Framer `useScroll` is inlined into each theater chunk (no shared `node_modules/framer-motion` chunk on `/` initial load).

---

## Fix applied during verification

**Issue:** Pre-split, `RootAppShell` statically imported `ConditionalOverlays` (and full legacy provider tree). Turbopack bundled dotlottie (~652 KiB layout chunk) into `/` sync chunks even though marketing `/` never rendered those components.

**Fix:** Extracted legacy tree to [`LegacyAppShell.tsx`](../../../components/layout/LegacyAppShell.tsx) and load it via `next/dynamic` from [`RootAppShell.tsx`](../../../components/layout/RootAppShell.tsx) only on non-marketing routes.

After fix: dotlottie absent from all `/` sync chunks; initial sync chunk count dropped from 8 to 4.

---

## Acceptance criteria

- [x] `/` page entry chunk has no `framer-motion` / `useScroll` import
- [x] `Hero.tsx`, `dotlottie` absent from `/` initial chunks
- [x] Framer present only in theater async chunks

---

## Import chain (unchanged, verified)

```
app/page.tsx
  └─ MarketingTheaterSections (client, sync loader only)
       └─ dynamic(() => ProductTheaterConnect)  → async chunk + useScroll
       └─ dynamic(() => ProductTheaterFocus)    → async chunk + useScroll
       └─ dynamic(() => ProductTheaterExecute)  → async chunk + useScroll
```

`hooks/useScrollSection.ts` imports `framer-motion` but is reachable only through theater async chunks.

---

## Next steps

- **P3-T12:** Reduced-motion QA
- **P3-T13:** Off-screen pause QA
- Optional: wire `@next/bundle-analyzer` per P1-T18 for visual treemap in future PRs
