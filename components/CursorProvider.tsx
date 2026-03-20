'use client';

import { useCursor } from '@/hooks/useCursor';
import { useCustomCursor } from '@/context/CustomCursorContext';

export default function CursorProvider({ children }: { children: React.ReactNode }) {
  const ctx = useCustomCursor();
  const customCursorEnabled = ctx?.customCursorEnabled ?? false;
  useCursor(customCursorEnabled);
  return <>{children}</>;
}

