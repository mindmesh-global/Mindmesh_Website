import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AppWindow } from '../components/AppWindow';
import { SceneShell } from '../components/SceneShell';
import { colors, fonts, SCENE_DURATIONS } from '../theme';

const INBOX = [
  { sender: 'Anthropic', subject: 'API usage summary — February', unread: true },
  { sender: 'Swiggy', subject: 'Your order is on the way', unread: true },
  { sender: 'HDFC Bank', subject: 'Credit card statement ready', unread: false },
  { sender: 'Linear', subject: 'Sprint review reminder', unread: false, selected: true },
];

const EVENTS = [
  { title: 'Design Review', time: 'Wed 2:00 PM', color: colors.violet },
  { title: '1:1 with PM', time: 'Wed 4:30 PM', color: colors.indigo },
  { title: 'Sprint Planning', time: 'Fri 10:00 AM', color: colors.purple },
];

export const Scene5InboxCalendar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = SCENE_DURATIONS.scene5;

  const focusSlide = spring({ frame: frame - 70, fps, config: { damping: 20, stiffness: 90 } });
  const showFocus = frame > 65;

  return (
    <SceneShell duration={duration}>
      <AppWindow title="MindMesh — Inbox & Calendar">
        <AbsoluteFill style={{ display: 'flex', fontFamily: fonts.ui, position: 'relative' }}>
          <div style={{ width: '50%', borderRight: `1px solid ${colors.border}`, padding: 12 }}>
            <div style={{ fontSize: 11, color: colors.dim, marginBottom: 8, fontWeight: 600 }}>
              INBOX
            </div>
            {INBOX.map((row) => (
              <div
                key={row.sender}
                style={{
                  display: 'flex',
                  gap: 10,
                  padding: '10px 8px',
                  borderRadius: 8,
                  marginBottom: 4,
                  background: row.selected ? `${colors.purple}33` : 'transparent',
                  border: row.selected ? `1px solid ${colors.purple}` : '1px solid transparent',
                }}
              >
                <Avatar label={row.sender[0]} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: row.unread ? 600 : 400,
                      color: colors.white,
                    }}
                  >
                    {row.sender}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: colors.muted,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.subject}
                  </div>
                </div>
                {row.unread && (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: colors.purple,
                      marginTop: 6,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <div style={{ width: '50%', padding: 12 }}>
            <div style={{ fontSize: 11, color: colors.dim, marginBottom: 12, fontWeight: 600 }}>
              UPCOMING
            </div>
            {EVENTS.map((ev) => (
              <div
                key={ev.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10,
                  padding: 10,
                  borderRadius: 8,
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 36,
                    borderRadius: 2,
                    background: ev.color,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: colors.white }}>{ev.title}</div>
                  <div style={{ fontSize: 11, color: colors.muted }}>{ev.time}</div>
                </div>
                <button
                  style={{
                    fontSize: 10,
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: 'none',
                    background: colors.purple,
                    color: colors.white,
                    fontWeight: 600,
                  }}
                >
                  Join Meet
                </button>
              </div>
            ))}
          </div>
          {showFocus && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 48,
                width: 320,
                background: colors.surface,
                borderLeft: `1px solid ${colors.purple}`,
                padding: 16,
                transform: `translateX(${interpolate(focusSlide, [0, 1], [100, 0])}%)`,
                boxShadow: `-20px 0 40px rgba(0,0,0,0.4)`,
              }}
            >
              <div style={{ fontSize: 11, color: colors.purple, marginBottom: 8 }}>
                EMAIL FOCUS
              </div>
              <div style={{ fontSize: 15, color: colors.white, fontWeight: 600, marginBottom: 12 }}>
                Linear — Sprint review reminder
              </div>
              <p style={{ fontSize: 12, color: colors.muted, lineHeight: 1.6, margin: '0 0 16px' }}>
                Thread summary: Sprint review scheduled Friday. Action items due before standup.
              </p>
              <div style={{ fontSize: 11, color: colors.dim }}>Key dates extracted:</div>
              <div
                style={{
                  marginTop: 8,
                  padding: 8,
                  borderRadius: 6,
                  background: colors.bg,
                  fontSize: 12,
                  color: colors.muted,
                }}
              >
                📅 Fri 10:00 AM — Sprint Planning
              </div>
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px 16px',
              textAlign: 'center',
              fontSize: 11,
              color: colors.dim,
              borderTop: `1px solid ${colors.border}`,
              background: colors.bg,
            }}
          >
            Read-only · Searchable · Never sends on your behalf.
          </div>
        </AbsoluteFill>
      </AppWindow>
    </SceneShell>
  );
};

const Avatar: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${colors.indigo}, ${colors.purple})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 13,
      fontWeight: 700,
      color: colors.white,
      flexShrink: 0,
    }}
  >
    {label}
  </div>
);
