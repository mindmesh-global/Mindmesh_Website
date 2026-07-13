import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websitePublic = path.join(__dirname, '..', '..', 'public', 'images');
const remotionPublic = path.join(__dirname, '..', 'public', 'images');

function copyDir(subdir) {
  const src = path.join(websitePublic, subdir);
  const dest = path.join(remotionPublic, subdir);
  if (!fs.existsSync(src)) {
    console.warn('Skip missing:', src);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    fs.copyFileSync(path.join(src, file), path.join(dest, file));
  }
  console.log('Synced', subdir);
}

copyDir('Logo');
copyDir('icons');
