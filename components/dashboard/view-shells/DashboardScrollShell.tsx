import type { ReactNode } from 'react';

type DashboardScrollShellProps = {
  children: ReactNode;
  headerRight?: ReactNode;
};

/**
 * MindMesh window interior: light gray canvas, wide column, header + weather.
 * White cards come from panels (e.g. Today's Overview) — not one giant outer card.
 * View switcher is portaled to viewport top-right separately.
 */
export function DashboardScrollShell({ children, headerRight }: DashboardScrollShellProps) {
  return (
    <main
      className="min-h-screen bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
      aria-label="Dashboard"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Welcome back, User</p>
          </div>
          {headerRight ? (
            <div className="flex shrink-0 flex-wrap items-start justify-end gap-3">{headerRight}</div>
          ) : null}
        </header>
        <div className="flex flex-col gap-8">{children}</div>
      </div>
    </main>
  );
}
