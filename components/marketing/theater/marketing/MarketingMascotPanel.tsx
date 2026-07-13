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
  userAsk = MASCOT_THEATER_FIXTURES.userAsk,
  replyParagraphs = MASCOT_THEATER_FIXTURES.replyParagraphs,
  secondaryControl = MASCOT_THEATER_FIXTURES.secondaryControl,
}: MarketingMascotPanelProps) {
  const isIdle = !showUserAsk && !showTyping && replyVisibleCount === 0;

  return (
    <div
      className="mx-auto flex w-full max-w-md flex-col gap-3"
      data-marketing-mascot-panel
      data-mascot-reply-count={replyVisibleCount}
      data-mascot-typing={showTyping ? 'true' : 'false'}
    >
      <div
        className="rounded-lg border border-mm-outline-variant bg-mm-surface-container-low p-3"
        data-mascot-chat-shell
        aria-label="Mascot conversation"
      >
        {isIdle ? (
          <p
            className="text-sm text-mm-on-surface-variant"
            data-mascot-idle
          >
            Companion ready. Ask anything about your connected work.
          </p>
        ) : null}

        {showUserAsk ? (
          <div
            className="flex justify-end"
            data-mascot-user-ask
            style={{
              opacity: userAskMotion.opacity,
              transform: `translateY(${userAskMotion.translateY}px)`,
              willChange:
                userAskMotion.opacity < 1 ? 'transform, opacity' : undefined,
            }}
          >
            <p className="max-w-[85%] rounded-2xl rounded-br-md bg-mm-primary-container px-3 py-2 text-sm text-mm-on-primary-container">
              {userAsk}
            </p>
          </div>
        ) : null}

        {showTyping ? (
          <div
            className="mt-3 flex justify-start"
            data-mascot-typing-indicator
            aria-hidden
          >
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-mm-outline-variant/80 bg-mm-surface-container-high px-3 py-2.5">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="h-1.5 w-1.5 rounded-full bg-mm-on-surface-variant animate-pulse"
                  style={{
                    animationDuration: '1s',
                    animationDelay: `${dot * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        ) : null}

        {replyVisibleCount > 0 ? (
          <div
            className="mt-3 flex justify-start"
            data-mascot-reply
          >
            <div className="max-w-[90%] space-y-2 rounded-2xl rounded-bl-md border border-mm-outline-variant/80 bg-mm-surface-container-high px-3 py-2.5">
              {replyParagraphs.slice(0, replyVisibleCount).map((paragraph, index) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-mm-on-background"
                  data-mascot-reply-paragraph={index + 1}
                  style={{ opacity: 1 }}
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
          style={{
            opacity: actionOpacity,
            willChange: actionOpacity < 1 ? 'opacity' : undefined,
          }}
        >
          <Link
            href={secondaryControl.href}
            className="inline-flex rounded-md border border-mm-primary/40 bg-mm-surface-container-high px-3 py-2 text-sm font-medium text-mm-primary transition-colors hover:border-mm-primary/60 hover:text-mm-primary-dim"
            tabIndex={actionOpacity < 0.9 ? -1 : undefined}
          >
            {secondaryControl.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
