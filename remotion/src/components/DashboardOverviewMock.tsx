import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { staggerDelay } from '../utils/animations';
import { colors, fonts } from '../theme';

type DashboardOverviewMockProps = {
  animateFromFrame?: number;
};

export const DashboardOverviewMock: React.FC<DashboardOverviewMockProps> = ({
  animateFromFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - animateFromFrame);

  return (
    <div
      style={{
        background: colors.bg,
        borderRadius: 12,
        boxShadow: `0 0 40px ${colors.purple}22`,
        border: `1px solid ${colors.border}`,
        padding: 20,
        fontFamily: fonts.ui,
        color: colors.white,
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: colors.white }}>
          Today&apos;s Overview
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 10, color: colors.muted }}>Last updated: 1:55 PM</span>
          <button
            style={{
              border: 'none',
              borderRadius: 999,
              background: `linear-gradient(135deg, ${colors.purple}, ${colors.indigo})`,
              color: colors.white,
              fontSize: 11,
              fontWeight: 600,
              padding: '8px 14px',
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      <AttentionBlock frame={f} fps={fps} />

      <div style={{ marginTop: 14 }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600, color: colors.white }}>
          Inferred Facts
        </h3>
        {[
          '💡 Flight confirmation for Mumbai · Mar 8',
          '💡 Payment due: AWS invoice',
        ].map((fact, i) => {
          const s = spring({ frame: f - 50 - staggerDelay(i, 6), fps, config: { damping: 18, stiffness: 110 } });
          return (
            <div
              key={fact}
              style={{
                padding: 10,
                marginBottom: 6,
                borderRadius: 8,
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                fontSize: 12,
                color: colors.muted,
                opacity: s,
                transform: `scale(${interpolate(s, [0, 1], [0.98, 1])})`,
              }}
            >
              {fact}
              <div style={{ fontSize: 10, color: colors.dim, marginTop: 6, marginLeft: 20 }}>
                📧 9:30 AM · Today
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AttentionBlock: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => (
  <div
    style={{
      borderRadius: 12,
      border: `1px solid ${colors.border}`,
      background: `${colors.surface}cc`,
      padding: 16,
    }}
  >
    <p
      style={{
        margin: 0,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        color: colors.muted,
      }}
    >
      Attention
    </p>
    <h3 style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 700, color: colors.white }}>
      Good morning, Rohit 👋
    </h3>
    <p style={{ margin: '4px 0 12px', fontSize: 12, color: colors.muted }}>
      Here&apos;s what needs your attention.
    </p>

    <NowCard frame={frame} fps={fps} />
    <AttentionCard
      title="Later Today"
      description="All other ranked items for today"
      borderColor={colors.violet}
      titleColor={colors.violet}
      iconBg={`${colors.violet}33`}
      items={[
        {
          message: 'Team standup at 4pm',
          tag: 'Calendar',
          tagColor: `${colors.success}22`,
          tagBorder: `${colors.success}55`,
          tagText: colors.success,
        },
      ]}
      start={18}
      frame={frame}
      fps={fps}
    />
    <AttentionCard
      title="Quietly Handled"
      description="Completed or archived items"
      borderColor={colors.success}
      titleColor={colors.success}
      iconBg={`${colors.success}22`}
      badge="3 items"
      items={[
        { message: 'Newsletter pile → archived. Your inbox breathes again.' },
        { message: 'Reply to client about invoice — snoozed to afternoon' },
      ]}
      start={28}
      frame={frame}
      fps={fps}
      muted
    />
  </div>
);

const NowCard: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const s = spring({ frame: frame - 8, fps, config: { damping: 16, stiffness: 110 } });
  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${colors.border}`,
        borderLeft: `4px solid #ef4444`,
        background: colors.surface,
        marginBottom: 10,
        overflow: 'hidden',
        opacity: s,
        transform: `scale(${interpolate(s, [0, 1], [0.98, 1])})`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px' }}>
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#ef444422',
            color: '#fca5a5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          🔔
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fca5a5' }}>Now</div>
          <div style={{ fontSize: 11, color: colors.muted }}>Urgent items that need your immediate attention</div>
        </div>
        <span
          style={{
            fontSize: 10,
            padding: '4px 10px',
            borderRadius: 999,
            background: '#ef444422',
            color: '#fca5a5',
            fontWeight: 600,
            border: '1px solid #ef444444',
          }}
        >
          2 items
        </span>
      </div>
      <div style={{ borderTop: `1px solid ${colors.border}`, padding: '10px 14px 10px 52px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: colors.white }}>Reply to client about invoice</div>
        <div style={{ fontSize: 11, color: colors.muted, marginTop: 4 }}>Urgent — needs response before standup</div>
      </div>
    </div>
  );
};

const AttentionCard: React.FC<{
  title: string;
  description: string;
  borderColor: string;
  titleColor: string;
  iconBg: string;
  badge?: string;
  items: { message: string; tag?: string; tagColor?: string; tagBorder?: string; tagText?: string }[];
  start: number;
  frame: number;
  fps: number;
  muted?: boolean;
}> = ({ title, description, borderColor, titleColor, iconBg, badge, items, start, frame, fps, muted }) => {
  const s = spring({ frame: frame - start, fps, config: { damping: 16, stiffness: 110 } });
  return (
    <div
      style={{
        borderRadius: 8,
        border: `1px solid ${colors.border}`,
        borderLeft: `4px solid ${borderColor}`,
        background: colors.surface,
        marginBottom: 10,
        overflow: 'hidden',
        opacity: s,
        transform: `scale(${interpolate(s, [0, 1], [0.98, 1])})`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px' }}>
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          {title === 'Later Today' ? '🕐' : '✓'}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: titleColor }}>{title}</div>
          <div style={{ fontSize: 11, color: colors.muted }}>{description}</div>
        </div>
        {badge && (
          <span
            style={{
              fontSize: 10,
              padding: '4px 10px',
              borderRadius: 999,
              background: `${colors.success}22`,
              color: colors.success,
              border: `1px solid ${colors.success}44`,
            }}
          >
            {badge}
          </span>
        )}
      </div>
      {items.map((item) => (
        <div
          key={item.message}
          style={{
            borderTop: `1px solid ${colors.border}`,
            padding: '10px 14px',
            background: muted ? `${colors.success}11` : colors.bg,
          }}
        >
          {item.tag && (
            <span
              style={{
                fontSize: 10,
                padding: '2px 8px',
                borderRadius: 999,
                border: `1px solid ${item.tagBorder}`,
                background: item.tagColor,
                color: item.tagText,
                marginRight: 8,
              }}
            >
              {item.tag}
            </span>
          )}
          <span
            style={{
              fontSize: 12,
              fontWeight: muted ? 400 : 600,
              color: muted ? colors.dim : colors.white,
              textDecoration: muted ? 'line-through' : 'none',
            }}
          >
            {item.message}
          </span>
        </div>
      ))}
    </div>
  );
};
