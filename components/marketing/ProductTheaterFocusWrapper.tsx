'use client';

import dynamic from 'next/dynamic';

const ProductTheaterFocus = dynamic(
  () =>
    import('@/components/marketing/sections/ProductTheaterFocus').then((mod) => ({
      default: mod.ProductTheaterFocus,
    })),
  { ssr: false }
);

export function ProductTheaterFocusWrapper() {
  return <ProductTheaterFocus />;
}
