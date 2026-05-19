/**
 * Build favicons from public/images/Logo/mindmesh-gem-mark.png
 * - Opaque black background (Google shows transparent as white circle → tiny logo)
 * - Multiple sizes for Google Search (48px+ recommended)
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(root, 'public/images/Logo/mindmesh-gem-mark.png');
const BLACK = { r: 0, g: 0, b: 0, alpha: 1 };

/** @param {number} marginPct horizontal+vertical inset, e.g. 0.05 = 5% */
async function renderIcon(size, marginPct = 0.05) {
  const { data } = await sharp(src).trim({ threshold: 15 }).toBuffer({ resolveWithObject: true });
  const maxDim = Math.round(size * (1 - marginPct * 2));
  const resized = await sharp(data)
    .resize(maxDim, maxDim, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const left = Math.floor((size - resized.info.width) / 2);
  const top = Math.floor((size - resized.info.height) / 2);

  return sharp({
    create: { width: size, height: size, channels: 4, background: BLACK },
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
  await write(await renderIcon(size, 0.05), path.join(root, file));
}
