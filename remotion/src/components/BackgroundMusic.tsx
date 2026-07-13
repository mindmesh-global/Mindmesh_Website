import React from 'react';
import { Audio, interpolate, staticFile, useVideoConfig } from 'remotion';
import { TOTAL_FRAMES } from '../theme';

/**
 * Place a calm ambient track at public/audio/ambient.mp3 (or .wav) before rendering.
 * 1s fade-in, 2s fade-out, 35% peak volume.
 */
export const BackgroundMusic: React.FC = () => {
  const { fps } = useVideoConfig();
  const fadeInFrames = fps;
  const fadeOutFrames = fps * 2;
  const fadeOutStart = TOTAL_FRAMES - fadeOutFrames;

  return (
    <Audio
      src={staticFile('audio/ambient.wav')}
      volume={(f) => {
        const fadeIn = interpolate(f, [0, fadeInFrames], [0, 0.35], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const fadeOut = interpolate(f, [fadeOutStart, TOTAL_FRAMES], [0.35, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return Math.min(fadeIn, fadeOut);
      }}
    />
  );
};
