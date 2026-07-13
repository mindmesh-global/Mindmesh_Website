'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { UseScrollSectionResult } from '@/hooks/useScrollSection';
import type { ProductOverviewVisualState } from '@/lib/marketing-product-overview-scroll';

export type ProductOverviewContextValue = UseScrollSectionResult & {
  visual: ProductOverviewVisualState;
};

const ProductOverviewContext = createContext<ProductOverviewContextValue | null>(
  null
);

type ProductOverviewProviderProps = {
  value: ProductOverviewContextValue;
  children: ReactNode;
};

export function ProductOverviewProvider({
  value,
  children,
}: ProductOverviewProviderProps) {
  return (
    <ProductOverviewContext.Provider value={value}>
      {children}
    </ProductOverviewContext.Provider>
  );
}

export function useProductOverview(): ProductOverviewContextValue {
  const value = useContext(ProductOverviewContext);
  if (!value) {
    throw new Error(
      'useProductOverview must be used within ProductOverviewProvider'
    );
  }
  return value;
}

export function useOptionalProductOverview(): ProductOverviewContextValue | null {
  return useContext(ProductOverviewContext);
}
