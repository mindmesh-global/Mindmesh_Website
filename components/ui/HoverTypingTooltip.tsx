'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { TypingText } from './TypingText';

interface HoverTypingTooltipProps {
  text: string;
  children: React.ReactNode;
  /** Delay between each character (ms) */
  speed?: number;
  /** Show info icon hint (default: true) */
  showHint?: boolean;
  /** Icon color variant for light vs dark backgrounds */
  variant?: 'light' | 'dark';
  /** Tooltip placement relative to children */
  placement?: 'right' | 'top' | 'bottom' | 'left';
  /** Allow text to wrap (for longer tooltips) */
  wrap?: boolean;
  /** Additional class for the wrapper */
  className?: string;
}

const iconVariants = {
  light: 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400',
  dark: 'text-white/80 group-hover:text-white',
};

const placementClasses: Record<NonNullable<HoverTypingTooltipProps['placement']>, string> = {
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  top: 'left-1/2 bottom-full -translate-x-1/2 mb-2',
  bottom: 'left-1/2 top-full -translate-x-1/2 mt-2',
};

export function HoverTypingTooltip({ text, children, speed = 40, showHint = true, variant = 'light', placement = 'right', wrap = false, className = '' }: HoverTypingTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`group relative inline-flex items-center gap-1.5 cursor-help ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {showHint && (
        <Info className={`w-3.5 h-3.5 shrink-0 ${iconVariants[variant]}`} aria-hidden />
      )}
      <span
        className={`absolute px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none z-[9999] min-w-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${placementClasses[placement]} ${wrap ? 'whitespace-normal max-w-[220px]' : 'whitespace-nowrap'}`}
        role="tooltip"
      >
        {isHovered && (
          <TypingText
            text={text}
            trigger={isHovered}
            speed={speed}
            startDelay={0}
            cursor
            cursorChar="|"
            className="inline"
          />
        )}
      </span>
    </span>
  );
}
