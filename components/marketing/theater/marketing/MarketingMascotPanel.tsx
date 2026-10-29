'use client';

import Link from 'next/link';
import { MASCOT_THEATER_FIXTURES } from '@/lib/marketing-sensor-mascot-content';
import type { MascotUserAskMotion } from '@/lib/marketing-theater-scroll';

export type MarketingMascotPanelProps = {
  showUserAsk: boolean;
  userAskMotion: MascotUserAskMotion;
  showTyping: boolean;
  replyVisibleCount: 0 | 1 | 2 | 3;
  actionOpacity: number;
  showFollowUp?: boolean;
  showUserConfirm?: boolean;
  showCalendarTyping?: boolean;
  showCalendarDone?: boolean;
  userAsk?: string;
  replyParagraphs?: readonly string[];
  secondaryControl?: { label: string; href: string };
};

/**
 * Coded Mascot chat UI for the scroll theater (P8-T11).
 * Motion: transform + opacity only; driven by parent scroll helpers.
 * No MascotChatbot / Lottie.
 */
export function MarketingMascotPanel({
  showUserAsk,
  userAskMotion,
  showTyping,
  replyVisibleCount,
  actionOpacity,
  showFollowUp = false,
  showUserConfirm = false,
  showCalendarTyping = false,
  showCalendarDone = false,
  userAsk = MASCOT_THEATER_FIXTURES.userAsk,
  replyParagraphs = MASCOT_THEATER_FIXTURES.replyParagraphs,
  secondaryControl = MASCOT_THEATER_FIXTURES.secondaryControl,
}: MarketingMascotPanelProps) {
  const isIdle = !showUserAsk && !showTyping && replyVisibleCount === 0;

  return (
    <div
      className="flex h-full w-full flex-col gap-3"
      data-marketing-mascot-panel
      data-mascot-reply-count={replyVisibleCount}
      data-mascot-typing={showTyping ? 'true' : 'false'}
    >
      <div
        className="flex flex-1 flex-col gap-3 overflow-y-auto"
        data-mascot-chat-shell
        aria-label="Mascot conversation"
      >
        {isIdle ? (
          /* Real app empty state — privacy message */
          <div className="flex flex-1 flex-col items-center justify-center px-4 py-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(20,184,166,0.15), rgba(59,130,246,0.15))', border: '1px solid rgba(16,185,129,0.25)' }}>
              <span style={{ fontSize: '24px' }}>🔒</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800">Your privacy matters</h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-500">
              MindMesh does not use your data to train any AI or LLM models. All your data is encrypted at rest (AES-256) and in transit (TLS 1.2+).
            </p>
            <div className="mt-5 w-full space-y-2">
              {['What happened yesterday?', 'Any urgent emails?', 'What should I focus on?'].map((s) => (
                <div key={s} className="cursor-default rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-left text-xs text-gray-600 hover:bg-gray-100">
                  {s}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {showUserAsk ? (
          <div
            className="flex justify-end"
            data-mascot-user-ask
            style={{
              opacity: userAskMotion.opacity,
              transform: `translateY(${userAskMotion.translateY}px)`,
              willChange: userAskMotion.opacity < 1 ? 'transform, opacity' : undefined,
            }}
          >
            <p className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm text-white shadow-sm">
              {userAsk}
            </p>
          </div>
        ) : null}

        {showTyping ? (
          <div className="mt-3 flex justify-start" data-mascot-typing-indicator aria-hidden>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-gray-200/80 bg-gray-100 px-4 py-3">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-pulse"
                  style={{ animationDuration: '1s', animationDelay: `${dot * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        ) : null}

        {replyVisibleCount > 0 ? (
          <div className="mt-3 flex justify-start" data-mascot-reply>
            <div className="max-w-[85%] space-y-2 rounded-2xl rounded-bl-md border border-gray-200/60 bg-gray-100 px-4 py-3 shadow-sm">
              {replyParagraphs.slice(0, replyVisibleCount).map((paragraph, index) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-gray-900"
                  data-mascot-reply-paragraph={index + 1}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {actionOpacity > 0.01 ? (
        <div
          data-mascot-action
          style={{ opacity: actionOpacity, willChange: actionOpacity < 1 ? 'opacity' : undefined }}
        >
          <span
            className="inline-flex cursor-default rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
            aria-hidden
          >
            {secondaryControl.label}
          </span>
        </div>
      ) : null}

      {/* Extended turn: Mascot follow-up question */}
      {showFollowUp ? (
        <div className="flex justify-start" data-mascot-followup>
          <p className="max-w-[85%] rounded-2xl rounded-bl-md border border-gray-200/60 bg-gray-100 px-4 py-3 text-sm text-gray-900 shadow-sm">
            {MASCOT_THEATER_FIXTURES.followUpQuestion}
          </p>
        </div>
      ) : null}

      {/* User confirms */}
      {showUserConfirm ? (
        <div className="flex justify-end" data-mascot-user-confirm>
          <p className="max-w-[40%] rounded-2xl rounded-br-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm text-white shadow-sm">
            {MASCOT_THEATER_FIXTURES.userConfirm}
          </p>
        </div>
      ) : null}

      {/* Calendar typing indicator */}
      {showCalendarTyping ? (
        <div className="flex justify-start" aria-hidden>
          <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-gray-200/80 bg-gray-100 px-4 py-3">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-pulse"
                style={{ animationDuration: '1s', animationDelay: `${dot * 0.15}s` }} />
            ))}
          </div>
        </div>
      ) : null}

      {/* Calendar done */}
      {showCalendarDone ? (
        <div className="flex justify-start" data-mascot-calendar-done>
          <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-green-200 bg-green-50 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-base">✅</span>
              <p className="text-sm font-medium text-green-800">
                {MASCOT_THEATER_FIXTURES.calendarDone}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
