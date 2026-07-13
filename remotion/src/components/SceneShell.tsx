import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { sceneScaleOpacity } from '../utils/animations';
import { colors } from '../theme';
import { GridBackground } from './GridBackground';

type SceneShellProps = {
  children: React.ReactNode;
  duration: number;
  showGrid?: boolean;
};

export const SceneShell: React.FC<SceneShellProps> = ({
  children,
  duration,
  showGrid = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { scale, opacity } = sceneScaleOpacity(frame, duration, fps);

  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      {showGrid && <GridBackground />}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
