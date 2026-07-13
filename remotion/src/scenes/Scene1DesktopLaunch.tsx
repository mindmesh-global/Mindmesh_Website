import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { AppWindow } from '../components/AppWindow';
import { ConnectedAppsRow } from '../components/ConnectedAppsRow';
import { MindMeshLogo } from '../components/MindMeshLogo';
import { SceneShell } from '../components/SceneShell';
import { colors, fonts, SCENE_DURATIONS } from '../theme';

const PROGRESS_LINES = [
  'Indexing your inbox locally…',
  'Building memory layer…',
  'Qdrant vector store ready',
  'Brain engine online',
  'Sensor bar activated',
];

export const Scene1DesktopLaunch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_DURATIONS.scene1;

  const terminalPhase = frame < 35;
  const windowSpring = spring({ frame: frame - 30, fps, config: { damping: 16, stiffness: 90 } });
  const slideY = interpolate(windowSpring, [0, 1], [120, 0]);
  const rotateX = interpolate(windowSpring, [0, 1], [28, 18]);
  const rotateY = Math.sin(frame / 20) * 2;

  const taglineOpacity = interpolate(frame, [85, 100, 110, 118], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneShell duration={duration}>
      <AbsoluteFill style={{ perspective: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {terminalPhase && (
          <div
            style={{
              width: '70%',
              maxWidth: 640,
              background: '#0a0a0a',
              borderRadius: 8,
              border: `1px solid ${colors.border}`,
              padding: 20,
              fontFamily: fonts.mono,
              fontSize: 13,
              color: colors.success,
              opacity: interpolate(frame, [0, 10, 30, 35], [0, 1, 1, 0]),
            }}
          >
            <div style={{ color: colors.muted, marginBottom: 8 }}>mindmesh — tauri dev</div>
            <div>$ cargo tauri dev</div>
            <div style={{ color: colors.purple }}>▸ Compiling mindmesh-desktop…</div>
            <div style={{ color: colors.white }}>▸ Launching MindMesh Desktop v0.9</div>
            <div style={{ marginTop: 8, color: colors.dim }}>
              {frame > 15 ? '▸ Window server ready' : ''}
              {frame > 22 ? '\n▸ OAuth handler listening :1420' : ''}
            </div>
          </div>
        )}

        {!terminalPhase && (
          <AppWindow
            title="MindMesh Desktop"
            transform={`translateY(${slideY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <AbsoluteFill style={{ padding: 24, fontFamily: fonts.ui }}>
              <div style={{ display: 'flex', gap: 24, height: '100%' }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ color: colors.white, fontSize: 22, margin: '0 0 8px' }}>
                    Connect your accounts
                  </h2>
                  <p style={{ color: colors.muted, fontSize: 13, margin: '0 0 16px' }}>
                    Gmail, Outlook, SMTP & Slack — indexed locally on your device
                  </p>
                  <div
                    style={{
                      opacity: interpolate(frame, [38, 52], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                      }),
                      marginBottom: 16,
                    }}
                  >
                    <ConnectedAppsRow compact startFrame={40} columns={2} />
                  </div>
                  <div style={{ marginTop: 12 }}>
                    {PROGRESS_LINES.map((line, i) => {
                      const show = frame > 55 + i * 10;
                      return (
                        <div
                          key={line}
                          style={{
                            fontFamily: fonts.mono,
                            fontSize: 11,
                            color: show ? colors.muted : 'transparent',
                            marginBottom: 6,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <span style={{ color: show ? colors.purple : 'transparent' }}>✓</span>
                          {line}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  style={{
                    width: 280,
                    background: colors.bg,
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    padding: 12,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <NeuralMeshPattern frame={frame} />
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      paddingTop: 8,
                    }}
                  >
                    <MindMeshLogo variant="gem" width={200} />
                    <div
                      style={{
                        fontFamily: fonts.brand,
                        fontSize: 18,
                        letterSpacing: 6,
                        color: colors.purple,
                        marginTop: 8,
                        fontWeight: 700,
                      }}
                    >
                      MINDMESH
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  fontSize: 13,
                  color: colors.violet,
                  fontWeight: 500,
                  opacity: taglineOpacity,
                }}
              >
                Your data stays on your device.
              </div>
            </AbsoluteFill>
          </AppWindow>
        )}
      </AbsoluteFill>
    </SceneShell>
  );
};

const NeuralMeshPattern: React.FC<{ frame: number }> = ({ frame }) => (
  <svg
    style={{ position: 'absolute', inset: 0, opacity: 0.35 }}
    viewBox="0 0 280 200"
  >
    {Array.from({ length: 8 }).map((_, i) =>
      Array.from({ length: 6 }).map((_, j) => {
        const cx = 20 + j * 45;
        const cy = 20 + i * 22 + Math.sin(frame / 15 + i) * 3;
        return (
          <g key={`${i}-${j}`}>
            {j < 5 && (
              <line
                x1={cx}
                y1={cy}
                x2={cx + 45}
                y2={20 + i * 22 + Math.sin(frame / 15 + i + 0.5) * 3}
                stroke={colors.purple}
                strokeWidth={0.5}
                opacity={0.5}
              />
            )}
            <circle cx={cx} cy={cy} r={2} fill={colors.violet} />
          </g>
        );
      })
    )}
  </svg>
);
