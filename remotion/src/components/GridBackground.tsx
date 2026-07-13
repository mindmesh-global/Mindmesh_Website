import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../theme';

export const GridBackground: React.FC<{ opacity?: number }> = ({ opacity = 0.15 }) => (
  <AbsoluteFill
    style={{
      background: colors.bg,
      backgroundImage: `
        linear-gradient(${colors.border}33 1px, transparent 1px),
        linear-gradient(90deg, ${colors.border}33 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
      opacity,
    }}
  />
);
