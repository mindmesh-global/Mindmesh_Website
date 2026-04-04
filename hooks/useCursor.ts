'use client';

import { useEffect } from 'react';

const CURSOR_ID = 'custom-cursor-img';
const DEFAULT_SIZE = 52;
const HOVER_SIZE = 60;
const OFFSET_X = 24; // Image fixed on right side of cursor
const OFFSET_Y = 10; // Align with cursor

/** Last viewport pointer position — updated even while custom cursor is off so enabling places the image correctly. */
let lastClientX = 0;
let lastClientY = 0;

function trackPointer(e: MouseEvent) {
  lastClientX = e.clientX;
  lastClientY = e.clientY;
}

export function useCursor(enabled = true) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    window.addEventListener('mousemove', trackPointer, { passive: true });
    window.addEventListener('mousedown', trackPointer, { passive: true });
    window.addEventListener('contextmenu', trackPointer, { passive: true });
    return () => {
      window.removeEventListener('mousemove', trackPointer);
      window.removeEventListener('mousedown', trackPointer);
      window.removeEventListener('contextmenu', trackPointer);
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined' || !enabled) return;

    const img = document.createElement('img');
    img.id = CURSOR_ID;
    img.src = '/cursor.png';
    img.alt = '';
    img.style.cssText = `
      position: fixed;
      width: ${DEFAULT_SIZE}px;
      height: ${DEFAULT_SIZE}px;
      pointer-events: none;
      z-index: 2147483647;
      transform: translate(-50%, -50%);
      left: ${lastClientX + OFFSET_X}px;
      top: ${lastClientY + OFFSET_Y}px;
      transition: width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease-out;
    `;

    const handleMouseMove = (e: MouseEvent) => {
      trackPointer(e);
      img.style.left = `${e.clientX + OFFSET_X}px`;
      img.style.top = `${e.clientY + OFFSET_Y}px`;
    };

    const isInteractive = (el: HTMLElement | null) =>
      el?.closest?.('button, a, [role="button"]');

    const handleMouseOver = (e: MouseEvent) => {
      if (isInteractive(e.target as HTMLElement)) {
        img.style.width = `${HOVER_SIZE}px`;
        img.style.height = `${HOVER_SIZE}px`;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!isInteractive(related)) {
        img.style.width = `${DEFAULT_SIZE}px`;
        img.style.height = `${DEFAULT_SIZE}px`;
      }
    };

    document.body.appendChild(img);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    const handleMouseLeave = () => {
      img.style.opacity = '0';
    };
    const handleMouseEnter = () => {
      img.style.opacity = '1';
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Keep cursor on top when modals/chatbot/waitlist open (same z-index = DOM order wins)
    const keepOnTop = () => {
      if (img.parentNode === document.body && img.nextSibling) {
        document.body.appendChild(img);
      }
    };
    const observer = new MutationObserver(keepOnTop);
    observer.observe(document.body, { childList: true, subtree: false });

    return () => {
      observer.disconnect();
      if (img.parentNode) img.parentNode.removeChild(img);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled]);
}
