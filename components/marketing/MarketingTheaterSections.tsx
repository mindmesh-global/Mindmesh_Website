'use client';

import dynamic from 'next/dynamic';

const ProductTheaterConnect = dynamic(
  () =>
    import('@/components/marketing/sections/ProductTheaterConnect').then((mod) => ({
      default: mod.ProductTheaterConnect,
    })),
  { ssr: false }
);

const ProductTheaterFocus = dynamic(
  () =>
    import('@/components/marketing/sections/ProductTheaterFocus').then((mod) => ({
      default: mod.ProductTheaterFocus,
    })),
  { ssr: false }
);

const ProductTheaterExecute = dynamic(
  () =>
    import('@/components/marketing/sections/ProductTheaterExecute').then((mod) => ({
      default: mod.ProductTheaterExecute,
    })),
  { ssr: false }
);

export function MarketingTheaterSections() {
  return (
    <>
      <ProductTheaterConnect />
      <ProductTheaterFocus />
      <ProductTheaterExecute />
    </>
  );
}
