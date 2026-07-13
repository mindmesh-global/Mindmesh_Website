import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { AppWindow } from '../components/AppWindow';
import { SceneShell } from '../components/SceneShell';
import { typewriterWords } from '../utils/animations';
import { colors, fonts, SCENE_DURATIONS } from '../theme';

const NARRATIVE =
  "Yesterday was a productive day with significant progress on the new feature. The team completed the design review and started implementation. Three client emails still need follow-up before today's standup.";

export const Scene6DailyNarrative: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SCENE_DURATIONS.scene6;

  const text = typewriterWords(NARRATIVE, frame - 20, 2);
  const borderGlow = 0.5 + Math.sin(frame / 12) * 0.15;

  return (
    <SceneShell duration={duration}>
      <AppWindow title="MindMesh — Yesterday's Narrative">
        <AbsoluteFill style={{ padding: 24, fontFamily: fonts.ui, position: 'relative' }}>
          <div
            style={{
              padding: 28,
              borderRadius: 12,
              background: colors.bg,
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              position: 'relative',
              boxShadow: `0 0 ${30 * borderGlow}px ${colors.purple}33`,
              height: 'calc(100% - 8px)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: -2,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${colors.purple}, ${colors.indigo}, ${colors.violet})`,
                zIndex: -1,
                opacity: borderGlow,
              }}
            />
            <h2
              style={{
                fontFamily: fonts.brand,
                fontSize: 26,
                color: colors.white,
                margin: '0 0 16px',
              }}
            >
              Yesterday&apos;s Narrative
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: colors.white,
                margin: '0 0 16px',
                minHeight: 100,
              }}
            >
              {text}
              <span style={{ color: colors.purple, opacity: frame % 20 < 10 ? 1 : 0 }}>|</span>
            </p>
            <div
              style={{
                display: 'flex',
                gap: 16,
                fontSize: 12,
                color: colors.muted,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                padding: 10,
                borderRadius: 8,
                marginBottom: 12,
                opacity: interpolate(frame, [70, 85], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            >
              <span>📧 12 emails yesterday</span>
              <span>📅 3 events yesterday</span>
              <span style={{ marginLeft: 'auto', color: colors.dim }}>🎯 85% specific</span>
            </div>
            <p
              style={{
                fontSize: 12,
                color: colors.dim,
                margin: 0,
                opacity: interpolate(frame, [80, 95], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            >
              Built from your emails & calendar — not the internet.
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              right: 24,
              opacity: interpolate(frame, [60, 75], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            <MascotBubble />
          </div>
        </AbsoluteFill>
      </AppWindow>
    </SceneShell>
  );
};

const MascotBubble: React.FC = () => (
  <div style={{ position: 'relative' }}>
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${colors.violet}, ${colors.purple})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
      }}
    >
      🤖
    </div>
    <div
      style={{
        position: 'absolute',
        top: -4,
        right: -4,
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: colors.amber,
        border: `2px solid ${colors.surface}`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: 52,
        right: 0,
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: '10px 14px',
        fontSize: 12,
        color: colors.white,
        whiteSpace: 'nowrap',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      Meeting in 15 min
    </div>
  </div>
);
