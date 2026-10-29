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
      className="flex h-full w-full flex-col gap-3"
      data-marketing-mascot-attachment-panel
      data-mascot-att-reply-count={replyVisibleCount}
      data-mascot-att-typing={showTyping ? 'true' : 'false'}
    >
      <div
        className="flex flex-1 flex-col gap-3 overflow-hidden"
        data-mascot-att-chat-shell
        aria-label="Mascot conversation"
      >

        {showUserAsk ? (
          <div
            className="flex justify-end"
            data-mascot-att-user-ask
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
          <div className="mt-3 flex justify-start" data-mascot-att-typing-indicator aria-hidden>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-gray-200/80 bg-gray-100 px-4 py-3">
              {[0, 1, 2].map((dot) => (
                <span key={dot} className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-pulse"
                  style={{ animationDuration: '1s', animationDelay: `${dot * 0.15}s` }} />
              ))}
            </div>
          </div>
        ) : null}

        {replyVisibleCount > 0 ? (
          <div className="mt-3 flex justify-start" data-mascot-att-reply>
            <div className="max-w-[85%] space-y-2 rounded-2xl rounded-bl-md border border-gray-200/60 bg-gray-100 px-4 py-3 shadow-sm">
              {replyLines.slice(0, replyVisibleCount).map((line, index) => (
                <p key={line} className="text-sm leading-relaxed text-gray-900" data-mascot-att-reply-line={index + 1}>
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
              willChange: hitMotion.opacity < 1 || hitMotion.translateY > 0.1 ? 'transform, opacity' : undefined,
            }}
          >
            <div className="flex max-w-[85%] items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" aria-hidden />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {hitFilename}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
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
          <span
            className="inline-flex cursor-default rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
            aria-hidden
          >
            {secondaryControl.label}
          </span>
        </div>
      ) : null}
    </div>
  );
}
