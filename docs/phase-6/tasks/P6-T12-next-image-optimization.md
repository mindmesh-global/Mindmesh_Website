# P6-T12: Enable `next/image` optimization

**Task ID:** P6-T12  
**Status:** done  
**Type:** Implementation  
**Completed:** 2026-07-09  
**Parent:** [phase-6-tasks.md](../phase-6-tasks.md) | [phase-6-polish.md](../phase-6-polish.md)  
**Depends on:** [P6-T01](./P6-T01-hero-inventory.md)  
**Blocks:** P6-T15

---

## Goal

Turn on Next.js image optimization for marketing (and depth) assets by removing the global `images.unoptimized: true` escape hatch. Keep SVG badges on per-`Image` `unoptimized` because Next does not optimize SVG by default.

---

## Deliverables

| File | Change |
|------|--------|
| [`next.config.js`](../../../next.config.js) | Removed `images.unoptimized`; set `formats: ['image/avif', 'image/webp']` and `qualities: [75, 100]` |
| [`components/marketing/sections/TrustSection.tsx`](../../../components/marketing/sections/TrustSection.tsx) | NVIDIA SVG badge: `unoptimized` |
| [`app/trust/page.tsx`](../../../app/trust/page.tsx) | NVIDIA SVG badge: `unoptimized` |

No other marketing `Image` call sites needed changes. Dashboard gem mark already used `quality={100}`; Next 16 defaults to `qualities: [75]` only, so `100` was added to the allowlist.

---

## Config

```js
images: {
  formats: ['image/avif', 'image/webp'],
  qualities: [75, 100],
},
```

Serve production with the standalone output (this repo sets `output: 'standalone'`):

```bash
npm run build
cp -R public .next/standalone/public
cp -R .next/static .next/standalone/.next/static
PORT=3003 HOSTNAME=127.0.0.1 node .next/standalone/server.js
```

`npx next start` warns that it does not match `output: 'standalone'`; prefer the standalone server for local prod checks.

---

## Acceptance criteria

- [x] Global `images.unoptimized` removed from `next.config.js`
- [x] Homepage PNGs resolve via `/_next/image` (AVIF/WebP when accepted)
- [x] NVIDIA badge served as raw SVG (`unoptimized`)
- [x] Depth pages (`/connected-apps`, `/inbox`) optimize icons / mockups
- [x] `quality={100}` gem mark still allowed (`qualities: [75, 100]`)

---

## Verification (2026-07-09)

Standalone on `http://127.0.0.1:3003`:

| Route | Result |
|-------|--------|
| `/` | 14 `/_next/image` icon URLs → 200 `image/avif`; NVIDIA badge → 200 `image/svg+xml` |
| `/trust` | Badge → 200 SVG (no raster `/_next/image`) |
| `/connected-apps` | Icon `/_next/image` → 200 AVIF |
| `/inbox` | `hero-inbox-mockup.jpg` `w=1200` / `w=3840` → 200 AVIF |
| Gem mark `q=75` / `q=100` | 200 AVIF |

Earlier 400s (`The requested resource isn't a valid image … received null`) were from probing `q=100` before the qualities allowlist, or from incomplete standalone `public/` / `.next/static` copies, not from broken source PNGs.

---

## Next steps

- **P6-T11:** Metadata title/description alignment (optional non-blocker)
- **P6-T15:** Phase 6 sign-off (after remaining blockers)
