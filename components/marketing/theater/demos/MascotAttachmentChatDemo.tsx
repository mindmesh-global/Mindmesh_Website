'use client';

import { useEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';

type Beat = { at: number; state: Partial<ChatState> };

type ChatState = {
  showUserAsk: boolean;
  showTyping: boolean;
  replyCount: number;
  showFile: boolean;
  showFollowUp: boolean;
  showUserConfirm: boolean;
  showSendTyping: boolean;
  showEmailSent: boolean;
};

const INITIAL: ChatState = {
  showUserAsk: false,
  showTyping: false,
  replyCount: 0,
  showFile: false,
  showFollowUp: false,
  showUserConfirm: false,
  showSendTyping: false,
  showEmailSent: false,
};

const BEATS: Beat[] = [
  { at: 400,  state: { showUserAsk: true } },
  { at: 900,  state: { showTyping: true } },
  { at: 2000, state: { showTyping: false, replyCount: 1 } },
  { at: 2800, state: { replyCount: 2 } },
  { at: 3600, state: { showFile: true } },
  { at: 4600, state: { showFollowUp: true } },
  { at: 5400, state: { showUserConfirm: true, showSendTyping: true } },
  { at: 6400, state: { showSendTyping: false, showEmailSent: true } },
];

const USER_Q = 'Draft a reply to Dana confirming the rollout scope';
const REPLY = [
  "Here's a draft based on your thread with Dana and the current scope document:",
  '"Hi Dana — confirmed. Q2 scope is aligned, PROD-142 dependencies are cleared. Looking forward to the 2pm call."',
];
const FOLLOW_UP = 'Shall I send this email?';
const USER_YES = 'Yes';

export function MascotAttachmentChatDemo({ isPaused }: { isPaused: boolean }) {
  const [state, setState] = useState<ChatState>(INITIAL);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      setState(INITIAL);
      return;
    }
    BEATS.forEach(({ at, state: patch }) => {
      const t = setTimeout(() => setState((prev) => ({ ...prev, ...patch })), at);
      timersRef.current.push(t);
    });
    return () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
  }, [isPaused]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  return (
    <div ref={scrollRef} className="flex h-full flex-col gap-3 overflow-y-auto">
      {state.showUserAsk ? (
        <div className="flex justify-end">
          <p className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm text-white shadow-sm">{USER_Q}</p>
        </div>
      ) : null}

      {state.showTyping ? (
        <div className="flex justify-start">
          <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-gray-200/80 bg-gray-100 px-4 py-3">
            {[0,1,2].map((d) => (
              <span key={d} className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-pulse"
                style={{ animationDuration: '1s', animationDelay: `${d * 0.15}s` }} />
            ))}
          </div>
        </div>
      ) : null}

      {state.replyCount > 0 ? (
        <div className="flex justify-start">
          <div className="max-w-[85%] space-y-2 rounded-2xl rounded-bl-md border border-gray-200/60 bg-gray-100 px-4 py-3 shadow-sm">
            {REPLY.slice(0, state.replyCount).map((p) => (
              <p key={p} className="text-sm leading-relaxed text-gray-900">{p}</p>
            ))}
          </div>
        </div>
      ) : null}

      {state.showFile ? (
        <div className="flex justify-start">
          <div className="flex max-w-[85%] items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">Re: Q2 rollout timeline</p>
              <p className="mt-0.5 text-xs text-gray-500">Dana Reyes · Today, 9:14 AM · Gmail</p>
            </div>
          </div>
        </div>
      ) : null}

      {state.showFollowUp ? (
        <div className="flex justify-start">
          <p className="max-w-[85%] rounded-2xl rounded-bl-md border border-gray-200/60 bg-gray-100 px-4 py-3 text-sm text-gray-900 shadow-sm">{FOLLOW_UP}</p>
        </div>
      ) : null}

      {state.showUserConfirm ? (
        <div className="flex justify-end">
          <p className="max-w-[30%] rounded-2xl rounded-br-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm text-white shadow-sm">{USER_YES}</p>
        </div>
      ) : null}

      {state.showSendTyping ? (
        <div className="flex justify-start">
          <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-gray-200/80 bg-gray-100 px-4 py-3">
            {[0,1,2].map((d) => (
              <span key={d} className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-pulse"
                style={{ animationDuration: '1s', animationDelay: `${d * 0.15}s` }} />
            ))}
          </div>
        </div>
      ) : null}

      {state.showEmailSent ? (
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-blue-200 bg-blue-50 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-base">📨</span>
              <p className="text-sm font-medium text-blue-800">Email sent to Dana Reyes.</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
