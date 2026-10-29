'use client';

import dynamic from 'next/dynamic';

const ProductTheaterExecute = dynamic(
  () =>
    import('@/components/marketing/sections/ProductTheaterExecute').then((mod) => ({
      default: mod.ProductTheaterExecute,
    })),
  { ssr: false }
);

export function ProductTheaterExecuteWrapper() {
  return <ProductTheaterExecute />;
}
