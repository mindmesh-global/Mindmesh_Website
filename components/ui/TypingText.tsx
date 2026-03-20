'use client';

import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  /** When true, start typing. When false, reset. Use for hover-triggered tooltips. */
  trigger?: boolean;
  /** Delay between each character (ms) */
  speed?: number;
  /** Delay before typing starts (ms) */
  startDelay?: number;
  /** Show blinking cursor */
  cursor?: boolean;
  /** Cursor character */
  cursorChar?: string;
  /** Optional: repeat typing (loop) */
  loop?: boolean;
  /** Delay before restart when looping (ms) */
  loopDelay?: number;
  /** Additional class names */
  className?: string;
}

export function TypingText({
  text,
  trigger = true,
  speed = 60,
  startDelay = 0,
  cursor = true,
  cursorChar = '|',
  loop = false,
  loopDelay = 2000,
  className = '',
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!trigger) {
      setDisplayText('');
      setIsComplete(false);
      return;
    }
    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const typeNext = (charIndex: number) => {
      if (cancelled) return;
      if (charIndex < text.length) {
        setDisplayText(text.slice(0, charIndex + 1));
        timeoutId = setTimeout(() => typeNext(charIndex + 1), speed);
      } else {
        setIsComplete(true);
        if (loop) {
          timeoutId = setTimeout(() => {
            if (cancelled) return;
            setDisplayText('');
            setIsComplete(false);
            timeoutId = setTimeout(() => typeNext(0), loopDelay);
          }, loopDelay);
        }
      }
    };

    const initialDelay = setTimeout(() => {
      if (!cancelled) typeNext(0);
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(initialDelay);
      clearTimeout(timeoutId);
    };
  }, [text, trigger, speed, startDelay, loop, loopDelay]);

  return (
    <span className={className}>
      {displayText}
      {cursor && !isComplete && (
        <span className="inline-block animate-pulse ml-0.5" style={{ animationDuration: '0.8s' }} aria-hidden>
          {cursorChar}
        </span>
      )}
    </span>
  );
}
