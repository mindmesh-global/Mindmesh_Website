'use client';

import { createContext, useContext, ReactNode } from 'react';

const SplitViewContext = createContext(false);

export function SplitViewProvider({ children, value }: { children: ReactNode; value: boolean }) {
  return (
    <SplitViewContext.Provider value={value}>
      {children}
    </SplitViewContext.Provider>
  );
}

export function useSplitView() {
  return useContext(SplitViewContext);
}
