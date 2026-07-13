'use client';

import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  /** When set, show `text.slice(0, charIndex)` without timer animation (scroll-scrubbed). */
  charIndex?: number;
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
  charIndex,
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
  const isScrollScrubbed = charIndex !== undefined;

  useEffect(() => {
    if (isScrollScrubbed) return undefined;
    if (!trigger) {
      setDisplayText('');
      setIsComplete(false);
      return undefined;
    }
    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const typeNext = (index: number) => {
      if (cancelled) return;
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        timeoutId = setTimeout(() => typeNext(index + 1), speed);
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
  }, [text, trigger, speed, startDelay, loop, loopDelay, isScrollScrubbed]);

  if (isScrollScrubbed) {
    const clampedIndex = Math.min(text.length, Math.max(0, charIndex));
    const scrubbedText = text.slice(0, clampedIndex);
    const scrubComplete = clampedIndex >= text.length;

    return (
      <span className={className}>
        {scrubbedText}
        {cursor && !scrubComplete && clampedIndex > 0 ? (
          <span className="ml-0.5 inline-block animate-pulse" style={{ animationDuration: '0.8s' }} aria-hidden>
            {cursorChar}
          </span>
        ) : null}
      </span>
    );
  }

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
