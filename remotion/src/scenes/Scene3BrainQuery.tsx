import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AppWindow } from '../components/AppWindow';
import { SceneShell } from '../components/SceneShell';
import { colors, fonts, SCENE_DURATIONS } from '../theme';

const PIPELINE = [
  'Classifying query',
  'Calendar search',
  'Memory retrieval',
  'Composing answer',
];

const STRATEGIES = '5 search strategies · Sender · Keyword · Hybrid · Semantic · Calendar';

export const Scene3BrainQuery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_DURATIONS.scene3;

  const streamChars = Math.min(
    'You have 2 meetings — Design Review (Wed 2pm) and Sprint Planning (Fri 10am)'.length,
    Math.floor(Math.max(0, frame - 90) / 1.2)
  );
  const response =
    'You have 2 meetings — Design Review (Wed 2pm) and Sprint Planning (Fri 10am)'.slice(
      0,
      streamChars
    );

  return (
    <SceneShell duration={duration}>
      <AppWindow title="MindMesh — Brain">
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', fontFamily: fonts.ui }}>
          <div style={{ flex: 1, display: 'flex', padding: 16, gap: 12, minHeight: 0 }}>
            <div style={{ width: '28%' }}>
              <div
                style={{
                  background: colors.bg,
                  borderRadius: 10,
                  padding: 12,
                  border: `1px solid ${colors.border}`,
                  fontSize: 13,
                  color: colors.white,
                }}
              >
                Any meetings with the design team this week?
              </div>
            </div>
            <div style={{ width: '32%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PIPELINE.map((step, i) => {
                const done = frame > 25 + i * 18;
                const active = frame > 15 + i * 18 && !done;
                return (
                  <div
                    key={step}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      fontFamily: fonts.mono,
                      fontSize: 11,
                      color: done ? colors.muted : active ? colors.white : colors.dim,
                    }}
                  >
                    <span style={{ color: done ? colors.purple : colors.border }}>
                      {done ? '✓' : '○'}
                    </span>
                    {step}
                  </div>
                );
              })}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                style={{
                  flex: 1,
                  background: colors.bg,
                  borderRadius: 10,
                  padding: 14,
                  border: `1px solid ${colors.border}`,
                  fontSize: 14,
                  color: colors.white,
                  lineHeight: 1.5,
                }}
              >
                {response}
                {streamChars > 0 && (
                  <span style={{ color: colors.purple }}>|</span>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <SourceChip label="Design Review · Wed 2pm" show={frame > 100} fps={fps} delay={0} />
                <SourceChip label="Sprint Planning · Fri 10am" show={frame > 108} fps={fps} delay={8} />
                <span
                  style={{
                    fontSize: 10,
                    padding: '4px 8px',
                    borderRadius: 4,
                    background: `${colors.success}22`,
                    color: colors.success,
                    border: `1px solid ${colors.success}44`,
                    opacity: frame > 115 ? 1 : 0,
                  }}
                >
                  Grounded
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: '10px 16px',
              borderTop: `1px solid ${colors.border}`,
              fontFamily: fonts.mono,
              fontSize: 10,
              color: colors.dim,
            }}
          >
            {STRATEGIES}
          </div>
        </AbsoluteFill>
      </AppWindow>
    </SceneShell>
  );
};

const SourceChip: React.FC<{
  label: string;
  show: boolean;
  fps: number;
  delay: number;
}> = ({ label, show, fps, delay }) => {
  const frame = useCurrentFrame();
  const s = spring({ frame: frame - (100 + delay), fps, config: { damping: 20, stiffness: 120 } });
  if (!show) return null;
  return (
    <span
      style={{
        fontSize: 10,
        padding: '4px 10px',
        borderRadius: 6,
        background: colors.surface,
        border: `1px solid ${colors.calendar}55`,
        color: colors.muted,
        opacity: s,
        transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})`,
      }}
    >
      📅 {label}
    </span>
  );
};
