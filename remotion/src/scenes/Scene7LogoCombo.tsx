import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ConnectedAppsRow } from '../components/ConnectedAppsRow';
import { MindMeshLogo } from '../components/MindMeshLogo';
import { Particles } from '../components/Particles';
import { SceneShell } from '../components/SceneShell';
import { colors, fonts, SCENE_DURATIONS } from '../theme';

export const Scene7LogoCombo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_DURATIONS.scene7;

  const partA = frame < 55;
  const partB = frame >= 55 && frame < 115;
  const partC = frame >= 115;

  return (
    <SceneShell duration={duration} showGrid>
      <AbsoluteFill>
        <Particles count={20} />
        {partA && <NeuralIntro frame={frame} fps={fps} />}
        {partB && <IntroducingText frame={frame - 55} fps={fps} />}
        {partC && <IntegrationsGrid startFrame={115} />}
      </AbsoluteFill>
    </SceneShell>
  );
};

const NeuralIntro: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const burst = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  return (
    <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', zIndex: 2, opacity: burst }}>
        <MindMeshLogo variant="gem" width={140} />
      </div>
      <svg width={400} height={400} viewBox="0 0 400 400" style={{ position: 'relative', zIndex: 1 }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2 + frame / 30;
          const r1 = 40 + burst * 80;
          const r2 = 160 - burst * 40;
          const x1 = 200 + Math.cos(angle) * r1;
          const y1 = 200 + Math.sin(angle) * r1;
          const x2 = 200 + Math.cos(angle + 0.3) * r2;
          const y2 = 200 + Math.sin(angle + 0.3) * r2;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 2 ? colors.indigo : colors.violet}
              strokeWidth={1.5}
              opacity={0.6}
            />
          );
        })}
        <circle
          cx={200}
          cy={200}
          r={interpolate(burst, [0, 1], [0, 60])}
          fill="none"
          stroke={colors.purple}
          strokeWidth={3}
          opacity={0.8}
        />
      </svg>
    </AbsoluteFill>
  );
};

const IntroducingText: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const words1 = '✦ Introducing ✦'.split(' ');
  const words2 = 'Your Cognitive OS Layer'.split(' ');
  const sub = ['Brain', 'Sensor', 'Memory', 'Attention'];

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: 12, opacity: spring({ frame, fps, config: { damping: 20, stiffness: 100 } }) }}>
        <MindMeshLogo variant="tight" width={220} />
      </div>
      <div style={{ marginBottom: 16 }}>
        {words1.map((w, i) => {
          const s = spring({ frame: frame - i * 6, fps, config: { damping: 20, stiffness: 120 } });
          return (
            <span
              key={i}
              style={{
                fontFamily: fonts.brand,
                fontSize: 28,
                color: colors.violet,
                marginRight: 8,
                opacity: s,
                display: 'inline-block',
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
      <div>
        {words2.map((w, i) => {
          const s = spring({ frame: frame - 15 - i * 8, fps, config: { damping: 18, stiffness: 100 } });
          return (
            <span
              key={i}
              style={{
                fontFamily: fonts.brand,
                fontSize: 52,
                color: colors.white,
                marginRight: 12,
                opacity: s,
                display: 'inline-block',
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 20,
          fontFamily: fonts.mono,
          fontSize: 14,
          color: colors.muted,
          letterSpacing: 2,
        }}
      >
        {sub.map((item, i) => (
          <span key={item} style={{ opacity: frame > 35 + i * 5 ? 1 : 0.3 }}>
            {item}
            {i < sub.length - 1 ? ' · ' : ''}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const IntegrationsGrid: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  return (
  <AbsoluteFill
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      fontFamily: fonts.ui,
    }}
  >
    <div style={{ width: '100%', maxWidth: 720, marginBottom: 28 }}>
      <ConnectedAppsRow startFrame={startFrame} columns={3} />
    </div>
    <p
      style={{
        fontSize: 12,
        color: colors.dim,
        textAlign: 'center',
        maxWidth: 640,
        lineHeight: 1.6,
        opacity: interpolate(frame - startFrame, [25, 40], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      }}
    >
      Gmail · Google Calendar · Outlook · SMTP · Slack — all connected locally
    </p>
  </AbsoluteFill>
  );
};
