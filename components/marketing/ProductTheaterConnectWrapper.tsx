'use client';

import dynamic from 'next/dynamic';

const ProductTheaterConnect = dynamic(
  () =>
    import('@/components/marketing/sections/ProductTheaterConnect').then((mod) => ({
      default: mod.ProductTheaterConnect,
    })),
  { ssr: false }
);

export function ProductTheaterConnectWrapper() {
  return <ProductTheaterConnect />;
}
