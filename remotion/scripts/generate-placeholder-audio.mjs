/**
 * Creates a 40s silent stereo WAV (no ffmpeg required).
 * Replace with ambient.mp3 when you have a real track (update BackgroundMusic path).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'audio');
const outFile = path.join(outDir, 'ambient.mp3');

if (fs.existsSync(outFile)) {
  console.log('ambient.mp3 already exists — skipping');
  process.exit(0);
}

fs.mkdirSync(outDir, { recursive: true });

const sampleRate = 44100;
const channels = 2;
const durationSec = 40;
const numSamples = sampleRate * durationSec;
const bitsPerSample = 16;
const byteRate = (sampleRate * channels * bitsPerSample) / 8;
const blockAlign = (channels * bitsPerSample) / 8;
const dataSize = numSamples * blockAlign;
const buffer = Buffer.alloc(44 + dataSize);

buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(channels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(bitsPerSample, 34);
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

// Write as .wav — Remotion accepts WAV; rename for convenience
const wavPath = path.join(outDir, 'ambient.wav');
fs.writeFileSync(wavPath, buffer);
console.log('Created public/audio/ambient.wav (silent placeholder).');
