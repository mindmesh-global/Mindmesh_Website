import React from 'react';
import { colors, fonts } from '../theme';

type AppWindowProps = {
  children: React.ReactNode;
  title?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  transform?: string;
  /** Inner content area background (e.g. white dashboard) */
  contentBackground?: string;
};

export const AppWindow: React.FC<AppWindowProps> = ({
  children,
  title = 'MindMesh',
  width = '92%',
  height = '88%',
  style,
  transform,
  contentBackground,
}) => (
  <div
    style={{
      width,
      height,
      maxWidth: 980,
      borderRadius: 12,
      overflow: 'hidden',
      border: `1px solid ${colors.border}`,
      boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 0 60px rgba(134,50,134,0.12)',
      background: colors.surface,
      display: 'flex',
      flexDirection: 'column',
      transform,
      ...style,
    }}
  >
    <div
      style={{
        height: 36,
        background: colors.border,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 8,
        flexShrink: 0,
      }}
    >
      <TrafficLight color="#ff5f57" />
      <TrafficLight color="#febc2e" />
      <TrafficLight color="#28c840" />
      <span
        style={{
          flex: 1,
          textAlign: 'center',
          fontSize: 12,
          color: colors.muted,
          fontFamily: fonts.ui,
          fontWeight: 500,
        }}
      >
        {title}
      </span>
      <div style={{ width: 52 }} />
    </div>
    <div
      style={{
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
        background: contentBackground,
      }}
    >
      {children}
    </div>
  </div>
);

const TrafficLight: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: color,
      boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.2)',
    }}
  />
);
