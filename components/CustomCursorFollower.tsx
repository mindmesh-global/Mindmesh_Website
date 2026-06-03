'use client';

import { useEffect, useRef, useState } from 'react';
import { useCustomCursor } from '@/context/CustomCursorContext';

export default function CustomCursorFollower() {
  const ctx = useCustomCursor();
  const customCursorEnabled = ctx?.customCursorEnabled ?? false;
  const nodeRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!customCursorEnabled || !mounted) return;

    const applyPosition = () => {
      rafRef.current = 0;
      const el = nodeRef.current;
      if (!el) return;
      const { x, y } = positionRef.current;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };

    const handleMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(applyPosition);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [customCursorEnabled, mounted]);

  if (!customCursorEnabled || !mounted) return null;

  return (
    <div
      ref={nodeRef}
      className="pointer-events-none fixed left-0 top-0 z-[99999] h-20 w-20"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <img
        src="/custom-cursor.png"
        alt=""
        width={80}
        height={80}
        className="h-20 w-20 object-contain opacity-100"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
}
