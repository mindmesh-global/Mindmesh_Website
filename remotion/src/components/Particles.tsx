import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors } from '../theme';

const SEEDS = Array.from({ length: 24 }, (_, i) => ({
  x: (i * 47) % 100,
  y: (i * 31) % 100,
  size: 2 + (i % 3),
  speed: 0.3 + (i % 5) * 0.1,
}));

export const Particles: React.FC<{ count?: number }> = ({ count = 24 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {SEEDS.slice(0, count).map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${(p.y + frame * p.speed * 0.15) % 100}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: i % 2 === 0 ? colors.violet : colors.indigo,
            opacity: 0.4 + (i % 3) * 0.15,
            boxShadow: `0 0 ${p.size * 3}px ${colors.purple}66`,
          }}
        />
      ))}
    </>
  );
};
