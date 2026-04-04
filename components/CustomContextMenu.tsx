'use client';

import { useEffect, useState, useRef } from 'react';
import { useCustomCursor } from '@/context/CustomCursorContext';

export default function CustomContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const customCursor = useCustomCursor();

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      const menuWidth = 180;
      const menuHeight = 120;
      const x = Math.min(e.clientX, window.innerWidth - menuWidth - 8);
      const y = Math.min(e.clientY, window.innerHeight - menuHeight - 8);
      setPosition({ x: Math.max(8, x), y: Math.max(8, y) });
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

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] min-w-[180px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl py-1"
      style={{ left: position.x, top: position.y }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-3 py-1.5 border-b border-gray-100 dark:border-gray-700">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Cursor</span>
      </div>
      <button
        type="button"
        onClick={() => {
          enableCustomCursor();
          setVisible(false);
        }}
        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors flex items-center gap-2 ${
          customCursorEnabled ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'
        }`}
      >
        {customCursorEnabled ? (
          <>
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Customize (on)
          </>
        ) : (
          <>Customize</>
        )}
      </button>
      <button
        type="button"
        onClick={() => {
          disableCustomCursor();
          setVisible(false);
        }}
        className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
      >
        Default
      </button>
    </div>
  );
}
