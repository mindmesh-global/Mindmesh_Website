# Homepage bundle spot-check (P7-T07)

**Date:** 2026-07-10  
**Tooling:** `@next/bundle-analyzer@16.2.10` via `npm run analyze` (`ANALYZE=true next build --webpack`)  
**Next.js:** 16.1.1 (webpack analyze build)  
**Reports (local, gitignored under `.next/`):** `.next/analyze/client.html`, `nodejs.html`, `edge.html`

---

## Verdict

| Check | Result |
|-------|--------|
| Framer Motion in `/` **sync** chunks | **Absent** |
| Theater demos in `/` **sync** chunks | **Absent** (only `next/dynamic` loaders) |
| `dotlottie` in `/` **sync** chunks | **Absent** |
| Theater UI in **async** chunks | Present (`r.e(48)`, `219`, `810` / `115` / `182`) |
| Framer Motion on homepage theater path | **Absent** (scroll kit no longer imports `framer-motion`; library remains for `/dashboard`) |

---

## `/` sync client chunks (from `page_client-reference-manifest.js`)

| Chunk | ~bytes | Notes |
|-------|--------|--------|
| `app/layout-*.js` | ~20 KB | Marketing root shell path |
| `app/page-*.js` | ~12 KB | Homepage + theater **dynamic import stubs** only |
| `743-*.js` / `437-*.js` | ~10–14 KB | Shared sync helpers |

All four: no `framer-motion`, `MotionValue`, `AnimatePresence`, `dotlottie`, or `useScrollSection` module bodies.

Page async loader groups (from page chunk): `48`, `219`, `810` (Connect), `115` (Focus), `182` (Execute).

---

## Theater async (representative)

| Chunk | Role | ~bytes |
|-------|------|--------|
| `810.*.js` / `115.*.js` / `182.*.js` | Per-theater entry stubs | &lt; 1 KB each |
| `219.*.js` | Shared theater scroll / frame modules | ~19 KB |
| `48-*.js` | Shared async vendor for theaters | ~44 KB |

---

## Not on `/` (still in app)

| Chunk | ~bytes | Owner |
|-------|--------|--------|
| `535-*.js` | ~117 KB | Framer-heavy; referenced from **dashboard** client graph |
| `f58c171e.*.js` | ~571 KB | `dotlottie`; not in `/` sync graph |

---

## How to re-run

```bash
npm run analyze
# open .next/analyze/client.html
```

Default `npm run build` stays on Turbopack. Analyzer uses `--webpack` because `@next/bundle-analyzer` is webpack-only. Optional Turbopack UI: `next build --experimental-analyze` (no separate package).
