import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { GridBackground } from '../components/GridBackground';
import { MindMeshLogo } from '../components/MindMeshLogo';
import { Particles } from '../components/Particles';
import { SceneShell } from '../components/SceneShell';
import { colors, fonts, SCENE_DURATIONS } from '../theme';

export const Scene8DownloadCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_DURATIONS.scene8;

  const logoSpring = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 90 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.8, 1]);
  const pulse = 1 + Math.sin(frame / 10) * 0.03;

  return (
    <SceneShell duration={duration}>
      <AbsoluteFill>
        <GridBackground opacity={0.2} />
        <Particles count={16} />
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: fonts.ui,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: 4,
              color: colors.purple,
              fontWeight: 700,
              marginBottom: 24,
              textTransform: 'uppercase',
            }}
          >
            YOUR DATA. YOUR DEVICE.
          </div>
          <div style={{ position: 'relative', marginBottom: 28 }}>
            <OrbitStars frame={frame} />
            <div style={{ transform: `scale(${logoScale})` }}>
              <MindMeshLogo variant="gem" width={120} height={120} />
            </div>
          </div>
          <h1
            style={{
              fontFamily: fonts.brand,
              fontSize: 36,
              color: colors.white,
              margin: '0 0 12px',
              transform: `scale(${pulse})`,
            }}
          >
            Download MindMesh
          </h1>
          <p style={{ fontSize: 14, color: colors.muted, margin: '0 0 24px' }}>
            Free to start · Windows & macOS
          </p>
          <div
            style={{
              padding: '14px 28px',
              borderRadius: 10,
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              fontFamily: fonts.mono,
              fontSize: 16,
              color: colors.white,
              letterSpacing: 1,
            }}
          >
            mindmesh.app
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneShell>
  );
};

const OrbitStars: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    {[0, 1, 2, 3].map((i) => {
      const angle = (frame / 20 + i * 1.57) % (Math.PI * 2);
      const r = 70;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      return (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            fontSize: 14,
            color: colors.indigo,
          }}
        >
          ✦
        </span>
      );
    })}
  </>
);
