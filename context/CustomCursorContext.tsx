'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

const STORAGE_KEY = 'mindmesh-custom-cursor';

type CustomCursorContextType = {
  customCursorEnabled: boolean;
  enableCustomCursor: () => void;
  disableCustomCursor: () => void;
};

const CustomCursorContext = createContext<CustomCursorContextType | null>(null);

export function CustomCursorProvider({ children }: { children: ReactNode }) {
  const [customCursorEnabled, setCustomCursorEnabled] = useState(false);

  const enableCustomCursor = useCallback(() => {
    setCustomCursorEnabled(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
      document.body.classList.add('custom-cursor-active');
    }
  }, []);

  const disableCustomCursor = useCallback(() => {
    setCustomCursorEnabled(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      document.body.classList.remove('custom-cursor-active');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'true') {
      setCustomCursorEnabled(true);
      document.body.classList.add('custom-cursor-active');
    }
  }, []);

  return (
    <CustomCursorContext.Provider value={{ customCursorEnabled, enableCustomCursor, disableCustomCursor }}>
      {children}
    </CustomCursorContext.Provider>
  );
}

export function useCustomCursor() {
  const ctx = useContext(CustomCursorContext);
  return ctx;
}
