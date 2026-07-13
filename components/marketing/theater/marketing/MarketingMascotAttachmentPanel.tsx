'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';
import { MASCOT_ATTACHMENT_THEATER_FIXTURES } from '@/lib/marketing-sensor-mascot-content';
import type {
  MascotAttachmentHitMotion,
  MascotUserAskMotion,
} from '@/lib/marketing-theater-scroll';

export type MarketingMascotAttachmentPanelProps = {
  showUserAsk: boolean;
  userAskMotion: MascotUserAskMotion;
  showTyping: boolean;
  replyVisibleCount: 0 | 1 | 2;
  hitMotion: MascotAttachmentHitMotion;
  actionOpacity: number;
  userAsk?: string;
  replyLines?: readonly string[];
  hitFilename?: string;
  hitFrom?: string;
  hitDate?: string;
  hitSource?: string;
  secondaryControl?: { label: string; href: string };
};

/**
 * Coded Mascot attachment-search UI for the scroll theater (P10-T06).
 * Ask → typing → reply → hit card → Open attachment.
 * Motion: transform + opacity only. No MascotChatbot / Lottie.
 */
export function MarketingMascotAttachmentPanel({
  showUserAsk,
  userAskMotion,
  showTyping,
  replyVisibleCount,
  hitMotion,
  actionOpacity,
  userAsk = MASCOT_ATTACHMENT_THEATER_FIXTURES.userAsk,
  replyLines = MASCOT_ATTACHMENT_THEATER_FIXTURES.replyLines,
  hitFilename = MASCOT_ATTACHMENT_THEATER_FIXTURES.hit.filename,
  hitFrom = MASCOT_ATTACHMENT_THEATER_FIXTURES.hit.from,
  hitDate = MASCOT_ATTACHMENT_THEATER_FIXTURES.hit.date,
  hitSource = MASCOT_ATTACHMENT_THEATER_FIXTURES.hit.source,
  secondaryControl = MASCOT_ATTACHMENT_THEATER_FIXTURES.secondaryControl,
}: MarketingMascotAttachmentPanelProps) {
  const isIdle =
    !showUserAsk && !showTyping && replyVisibleCount === 0 && hitMotion.opacity < 0.01;

  return (
    <div
      className="mx-auto flex w-full max-w-md flex-col gap-3"
      data-marketing-mascot-attachment-panel
      data-mascot-att-reply-count={replyVisibleCount}
      data-mascot-att-typing={showTyping ? 'true' : 'false'}
    >
      <div
        className="rounded-lg border border-mm-outline-variant bg-mm-surface-container-low p-3"
        data-mascot-att-chat-shell
        aria-label="Mascot attachment search"
      >
        {isIdle ? (
          <p className="text-sm text-mm-on-surface-variant" data-mascot-att-idle>
            Companion ready. Ask anything about your connected work.
          </p>
        ) : null}

        {showUserAsk ? (
          <div
            className="flex justify-end"
            data-mascot-att-user-ask
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
            data-mascot-att-typing-indicator
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
          <div className="mt-3 flex justify-start" data-mascot-att-reply>
            <div className="max-w-[90%] space-y-2 rounded-2xl rounded-bl-md border border-mm-outline-variant/80 bg-mm-surface-container-high px-3 py-2.5">
              {replyLines.slice(0, replyVisibleCount).map((line, index) => (
                <p
                  key={line}
                  className="text-sm leading-relaxed text-mm-on-background"
                  data-mascot-att-reply-line={index + 1}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {hitMotion.opacity > 0.01 ? (
          <div
            className="mt-3 flex justify-start"
            data-mascot-att-hit
            style={{
              opacity: hitMotion.opacity,
              transform: `translateY(${hitMotion.translateY}px)`,
              willChange:
                hitMotion.opacity < 1 || hitMotion.translateY > 0.1
                  ? 'transform, opacity'
                  : undefined,
            }}
          >
            <div className="flex max-w-[90%] items-start gap-3 rounded-lg border border-mm-outline-variant/80 bg-mm-surface-container-high px-3 py-3">
              <FileText
                className="mt-0.5 h-5 w-5 shrink-0 text-mm-on-surface-variant"
                aria-hidden
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-mm-on-background">
                  {hitFilename}
                </p>
                <p className="mt-0.5 text-xs text-mm-on-surface-variant">
                  {hitFrom} · {hitDate} · {hitSource}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {actionOpacity > 0.01 ? (
        <div
          data-mascot-att-action
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
