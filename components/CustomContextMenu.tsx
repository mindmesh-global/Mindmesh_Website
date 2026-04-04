'use client';

import { useEffect, useState, useRef } from 'react';
import { MousePointer2, Sparkles, RefreshCw } from 'lucide-react';
import { useCustomCursor } from '@/context/CustomCursorContext';

const MENU_W = 216;
const MENU_H = 200;

export default function CustomContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const customCursor = useCustomCursor();

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      const x = Math.min(e.clientX, window.innerWidth - MENU_W - 12);
      const y = Math.min(e.clientY, window.innerHeight - MENU_H - 12);
      setPosition({ x: Math.max(12, x), y: Math.max(12, y) });
      setVisible(true);
    };

    const handleClick = () => setVisible(false);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!visible || !customCursor) return null;

  const { customCursorEnabled, enableCustomCursor, disableCustomCursor } = customCursor;

  const itemBase =
    'w-full px-3 py-2.5 text-left text-sm flex items-center gap-3 rounded-lg transition-colors duration-150 text-gray-700 dark:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset';
  const itemHover = 'hover:bg-gray-100 dark:hover:bg-gray-800';
  const itemHoverActive = 'hover:bg-blue-100 dark:hover:bg-blue-900';

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Page menu"
      className="fixed z-[9999] w-[216px] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18),0_4px_16px_-4px_rgba(0,0,0,0.08)]"
      style={{ left: position.x, top: position.y }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-3.5 pt-3 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Cursor
        </p>
      </div>

      <div className="px-1.5 pb-1.5 space-y-0.5">
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            enableCustomCursor();
            setVisible(false);
          }}
          className={`${itemBase} ${customCursorEnabled ? `text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 ${itemHoverActive}` : itemHover}`}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            <Sparkles className="h-4 w-4" strokeWidth={2} aria-hidden />
          </span>
          <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <span className="font-medium leading-tight">Customize</span>
            {customCursorEnabled && (
              <span className="text-[11px] font-normal text-blue-600 dark:text-blue-400">On</span>
            )}
          </span>
          {customCursorEnabled ? (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.25)]" />
          ) : null}
        </button>

        <button
          type="button"
          role="menuitem"
          onClick={() => {
            disableCustomCursor();
            setVisible(false);
          }}
          className={`${itemBase} ${itemHover}`}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            <MousePointer2 className="h-4 w-4" strokeWidth={2} aria-hidden />
          </span>
          <span className="font-medium">Default</span>
        </button>
      </div>

      <div className="mx-3 h-px bg-gray-200 dark:bg-gray-700" />

      <div className="p-1.5 pt-2 pb-2">
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            setVisible(false);
            window.location.reload();
          }}
          className={`${itemBase} ${itemHover}`}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            <RefreshCw className="h-4 w-4" strokeWidth={2} aria-hidden />
          </span>
          <span className="font-medium">Refresh</span>
        </button>
      </div>
    </div>
  );
}
