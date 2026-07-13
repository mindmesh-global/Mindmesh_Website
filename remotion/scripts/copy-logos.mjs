import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, '..', '..', 'public', 'images', 'Logo');
const dest = path.join(__dirname, '..', 'public', 'images', 'Logo');

if (!fs.existsSync(src)) {
  console.warn('Website logos not found at', src);
  process.exit(0);
}

fs.mkdirSync(dest, { recursive: true });
for (const file of fs.readdirSync(src)) {
  fs.copyFileSync(path.join(src, file), path.join(dest, file));
}
console.log('Synced MindMesh logos to remotion/public/images/Logo/');
