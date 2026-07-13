/**
 * Generates a soft synth ambient pad (~45s) as ambient.wav when no MP3 is provided.
 * Gentle chord + slow LFO — suitable as background under voiceover/UI promos.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'audio');
const mp3Path = path.join(outDir, 'ambient.mp3');
const wavPath = path.join(outDir, 'ambient.wav');

if (fs.existsSync(mp3Path) && fs.statSync(mp3Path).size > 100000) {
  console.log('ambient.mp3 present — skipping generated audio');
  process.exit(0);
}

fs.mkdirSync(outDir, { recursive: true });

const sampleRate = 44100;
const channels = 2;
const durationSec = 45;
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

const freqs = [110, 164.81, 220, 329.63];
const amps = [0.12, 0.08, 0.06, 0.04];

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const fadeIn = Math.min(1, t / 2);
  const fadeOut = Math.min(1, (durationSec - t) / 3);
  const lfo = 0.65 + 0.35 * Math.sin(2 * Math.PI * 0.06 * t);
  const lfo2 = 0.85 + 0.15 * Math.sin(2 * Math.PI * 0.015 * t + 1.2);

  let sample = 0;
  for (let f = 0; f < freqs.length; f++) {
    sample += Math.sin(2 * Math.PI * freqs[f] * t) * amps[f];
  }
  sample *= lfo * lfo2 * fadeIn * fadeOut * 0.35;

  const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
  const offset = 44 + i * blockAlign;
  buffer.writeInt16LE(intSample, offset);
  buffer.writeInt16LE(intSample, offset + 2);
}

fs.writeFileSync(wavPath, buffer);
console.log('Created soft ambient pad at public/audio/ambient.wav');
