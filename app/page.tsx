import { Suspense } from 'react';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <Hero />
      </Suspense>
    </main>
  );
}

