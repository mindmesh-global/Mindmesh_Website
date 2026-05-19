/**
 * Build favicons from public/images/Logo/mindmesh-gem-mark.png
 * - Strips baked-in black so the tab icon blends with the browser chrome
 * - ~8% inset: large enough to read clearly, small enough to avoid edge clipping
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(root, 'public/images/Logo/mindmesh-gem-mark.png');
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/** Turn near-black pixels transparent (source PNG has a solid black matte). */
async function stripBlackMatte(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const threshold = 42;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      data[i + 3] = 0;
    }
  }
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png();
}

/** @param {number} marginPct horizontal+vertical inset, e.g. 0.08 = 8% */
async function renderIcon(size, marginPct = 0.08) {
  const matteFree = await stripBlackMatte(src);
  const { data } = await matteFree.trim({ threshold: 8 }).toBuffer({ resolveWithObject: true });
  const maxDim = Math.round(size * (1 - marginPct * 2));
  const resized = await sharp(data)
    .resize(maxDim, maxDim, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const left = Math.floor((size - resized.info.width) / 2);
  const top = Math.floor((size - resized.info.height) / 2);

  return sharp({
    create: { width: size, height: size, channels: 4, background: TRANSPARENT },
  })
    .composite([{ input: resized.data, left, top }])
    .png();
}

async function write(png, outPath) {
  await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
  await png.png().toFile(outPath);
  console.log('wrote', path.relative(root, outPath));
}

const sizes = [
  { file: 'app/icon.png', size: 48 },
  { file: 'app/apple-icon.png', size: 180 },
  { file: 'public/favicon-48.png', size: 48 },
  { file: 'public/favicon-96.png', size: 96 },
  { file: 'public/favicon-192.png', size: 192 },
  { file: 'public/apple-icon.png', size: 180 },
];

for (const { file, size } of sizes) {
  await write(await renderIcon(size, 0.08), path.join(root, file));
}
