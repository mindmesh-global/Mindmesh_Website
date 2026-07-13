import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CONNECTED_APPS, type ConnectedApp } from '../data/connectedApps';
import { AppIcon } from './AppIcon';
import { colors } from '../theme';

type ConnectedAppsRowProps = {
  compact?: boolean;
  startFrame?: number;
  columns?: number;
};

export const ConnectedAppsRow: React.FC<ConnectedAppsRowProps> = ({
  compact = false,
  startFrame = 0,
  columns = 3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: compact ? 8 : 12,
        width: '100%',
      }}
    >
      {CONNECTED_APPS.map((app, i) => {
        const s = spring({
          frame: frame - startFrame - i * 4,
          fps,
          config: { damping: 18, stiffness: 120 },
        });
        return (
          <ConnectedAppCard key={app.id} app={app} compact={compact} opacity={s} scale={interpolate(s, [0, 1], [0.92, 1])} />
        );
      })}
    </div>
  );
};

const ConnectedAppCard: React.FC<{
  app: ConnectedApp;
  compact: boolean;
  opacity: number;
  scale: number;
}> = ({ app, compact, opacity, scale }) => (
  <div
    style={{
      padding: compact ? 10 : 14,
      borderRadius: 10,
      border: `1px solid ${colors.border}`,
      background: colors.surface,
      opacity,
      transform: `scale(${scale})`,
      boxShadow: `0 4px 12px rgba(0,0,0,0.25)`,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 10, minWidth: 0 }}>
        <div
          style={{
            width: compact ? 36 : 40,
            height: compact ? 36 : 40,
            borderRadius: 8,
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <AppIcon src={app.icon} size={compact ? 24 : 28} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: compact ? 12 : 13,
              fontWeight: 600,
              color: colors.white,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {app.name}
          </div>
          <div style={{ fontSize: 10, color: colors.muted }}>{app.subtitle}</div>
        </div>
      </div>
      {app.connected && (
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            padding: '3px 8px',
            borderRadius: 4,
            background: `${colors.success}22`,
            color: colors.success,
            border: `1px solid ${colors.success}44`,
            flexShrink: 0,
          }}
        >
          connected
        </span>
      )}
    </div>
  </div>
);
