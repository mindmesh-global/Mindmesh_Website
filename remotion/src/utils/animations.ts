import { interpolate, spring, SpringConfig } from 'remotion';

const SPRING: Partial<SpringConfig> = { damping: 18, stiffness: 120, mass: 0.8 };

export const sceneEnter = (frame: number, fps: number) =>
  spring({ frame, fps, config: SPRING });

export const sceneExit = (frame: number, duration: number, fps: number) =>
  spring({ frame: frame - (duration - 18), fps, config: SPRING });

export const sceneScaleOpacity = (
  frame: number,
  duration: number,
  fps: number
): { scale: number; opacity: number } => {
  const enter = sceneEnter(frame, fps);
  const exit = sceneExit(frame, duration, fps);
  const enterScale = interpolate(enter, [0, 1], [0.95, 1]);
  const exitScale = interpolate(exit, [0, 1], [1, 0.95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity =
    interpolate(enter, [0, 1], [0, 1]) *
    interpolate(exit, [0, 1], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  return { scale: enterScale * exitScale, opacity };
};

export const staggerDelay = (index: number, staggerFrames = 6) => index * staggerFrames;

export const typewriterText = (text: string, frame: number, charsPerFrame = 1) =>
  text.slice(0, Math.floor(frame / charsPerFrame));

export const typewriterWords = (text: string, frame: number, wordsPerFrame = 2) => {
  const words = text.split(' ');
  const count = Math.min(words.length, Math.floor(frame / wordsPerFrame));
  return words.slice(0, count).join(' ');
};

export const charByChar = (text: string, frame: number, framesPerChar = 1) =>
  text.slice(0, Math.min(text.length, Math.floor(frame / framesPerChar)));
