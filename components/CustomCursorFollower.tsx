'use client';

import { useEffect, useState } from 'react';
import { useCustomCursor } from '@/context/CustomCursorContext';

export default function CustomCursorFollower() {
  const ctx = useCustomCursor();
  const customCursorEnabled = ctx?.customCursorEnabled ?? false;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!customCursorEnabled || !mounted) return;

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [customCursorEnabled, mounted]);

  if (!customCursorEnabled || !mounted) return null;

  return (
    <div
      className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-[99999]"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      <img
        src="/custom-cursor.png"
        alt=""
        width={80}
        height={80}
        className="w-20 h-20 object-contain opacity-100"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
}
 