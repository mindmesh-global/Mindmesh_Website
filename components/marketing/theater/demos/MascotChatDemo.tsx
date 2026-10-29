'use client';

import { useEffect, useRef, useState } from 'react';

type Beat = {
  at: number; // ms after chat opens
  state: Partial<ChatState>;
};

type ChatState = {
  showUserAsk: boolean;
  replyCount: number; // 0-3
  showFollowUp: boolean;
  showUserConfirm: boolean;
  showCalendarTyping: boolean;
  showCalendarDone: boolean;
  showTyping: boolean;
};

const INITIAL: ChatState = {
  showUserAsk: false,
  replyCount: 0,
  showFollowUp: false,
  showUserConfirm: false,
  showCalendarTyping: false,
  showCalendarDone: false,
  showTyping: false,
};

const BEATS: Beat[] = [
  { at: 400,  state: { showUserAsk: true } },
  { at: 900,  state: { showTyping: true } },
  { at: 2000, state: { showTyping: false, replyCount: 1 } },
  { at: 2600, state: { replyCount: 2 } },
  { at: 3200, state: { replyCount: 3 } },
  { at: 4200, state: { showFollowUp: true } },
  { at: 5000, state: { showUserConfirm: true, showTyping: true } },
  { at: 5800, state: { showTyping: false, showCalendarTyping: true } },
  { at: 7000, state: { showCalendarTyping: false, showCalendarDone: true } },
];

const USER_Q = 'What did I leave open with Acme last week?';
const REPLY = [
  "Three things are still open: the Q2 scope needs your sign-off, PROD-142 is pending a final check, and Dana's waiting on your reply about the rollout timeline.",
  "The Q2 scope thread is most urgent — she needs a response before your 2pm call today.",
  "Nothing else is blocking on the Acme side.",
];
const FOLLOW_UP = 'Should I block some prep time in your calendar before the call?';
const USER_YES = 'Yes';
const CALENDAR_DONE = 'Done. 30-minute prep block added at 1:30 PM.';

export function MascotChatDemo({ isPaused }: { isPaused: boolean }) {
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

  // Auto-scroll to bottom on each state change
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

      {state.showTyping && !state.showUserConfirm ? (
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

      {state.showCalendarTyping ? (
        <div className="flex justify-start">
          <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-gray-200/80 bg-gray-100 px-4 py-3">
            {[0,1,2].map((d) => (
              <span key={d} className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-pulse"
                style={{ animationDuration: '1s', animationDelay: `${d * 0.15}s` }} />
            ))}
          </div>
        </div>
      ) : null}

      {state.showCalendarDone ? (
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-green-200 bg-green-50 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-base">✅</span>
              <p className="text-sm font-medium text-green-800">{CALENDAR_DONE}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
