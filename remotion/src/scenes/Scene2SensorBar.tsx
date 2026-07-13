import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AppWindow } from '../components/AppWindow';
import { SceneShell } from '../components/SceneShell';
import { charByChar, staggerDelay } from '../utils/animations';
import { colors, fonts, SCENE_DURATIONS } from '../theme';

const QUERY = 'How does my day look?';
const SUGGESTIONS = [
  'Do I have meetings today?',
  'Emails from Swiggy',
  "What's on my calendar tomorrow?",
];

export const Scene2SensorBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_DURATIONS.scene2;

  const barSpring = spring({ frame: frame - 8, fps, config: { damping: 18, stiffness: 100 } });
  const glowPulse = 0.6 + Math.sin(frame / 8) * 0.2;

  return (
    <SceneShell duration={duration}>
      <AppWindow title="MindMesh Desktop" height="90%" width="94%">
        <AbsoluteFill style={{ background: colors.bg }}>
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 24,
            padding: '8px 14px',
            borderRadius: 20,
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            fontSize: 12,
            color: colors.muted,
            fontFamily: fonts.ui,
            opacity: interpolate(frame, [20, 35], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          ☀️ 24°C · Partly cloudy
        </div>

        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 620, position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                inset: -20,
                borderRadius: 28,
                border: `2px solid ${colors.purple}`,
                opacity: interpolate(barSpring, [0, 1], [0, glowPulse * 0.5]),
                boxShadow: `0 0 40px ${colors.purple}44`,
              }}
            />
            <div
              style={{
                background: colors.surface,
                borderRadius: 20,
                border: `1px solid ${colors.border}`,
                padding: '16px 20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                transform: `scale(${interpolate(barSpring, [0, 1], [0.95, 1])})`,
                opacity: barSpring,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <SearchIcon
                  opacity={interpolate(
                    frame,
                    [staggerDelay(0), staggerDelay(0) + 12],
                    [0, 1],
                    { extrapolateRight: 'clamp' }
                  )}
                />
                <span style={{ color: colors.purple, fontSize: 18 }}>✦</span>
                <input
                  readOnly
                  value={charByChar(QUERY, frame - 25, 1)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: colors.white,
                    fontSize: 18,
                    fontFamily: fonts.ui,
                  }}
                />
              </div>
              <div style={{ marginTop: 14, paddingLeft: 36 }}>
                {SUGGESTIONS.map((s, i) => {
                  const show = frame > 40 + staggerDelay(i, 12);
                  const sSpring = spring({
                    frame: frame - (40 + staggerDelay(i, 12)),
                    fps,
                    config: { damping: 20, stiffness: 140 },
                  });
                  return (
                    <div
                      key={s}
                      style={{
                        padding: '10px 12px',
                        marginBottom: 6,
                        borderRadius: 8,
                        background: colors.bg,
                        color: colors.muted,
                        fontSize: 13,
                        fontFamily: fonts.ui,
                        opacity: show ? sSpring : 0,
                        transform: `translateY(${interpolate(sSpring, [0, 1], [8, 0])}px)`,
                      }}
                    >
                      {s}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AbsoluteFill>
        </AbsoluteFill>
      </AppWindow>
    </SceneShell>
  );
};

const SearchIcon: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
    <circle cx={11} cy={11} r={7} stroke={colors.muted} strokeWidth={2} />
    <path d="M16 16l5 5" stroke={colors.muted} strokeWidth={2} strokeLinecap="round" />
  </svg>
);
