'use client';

import { createContext, useContext, ReactNode } from 'react';

type MindMeshContainerContextType = {
  containerRef: React.RefObject<HTMLDivElement | null>;
};

const MindMeshContainerContext = createContext<MindMeshContainerContextType | null>(null);

export function MindMeshContainerProvider({
  containerRef,
  children,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  return (
    <MindMeshContainerContext.Provider value={{ containerRef }}>
      {children}
    </MindMeshContainerContext.Provider>
  );
}

export function useMindMeshContainer() {
  return useContext(MindMeshContainerContext);
}
