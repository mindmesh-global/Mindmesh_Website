/**
 * Lighthouse CI config (P7-T04).
 *
 * Soft LCP while P6-T09 exception stands (lab median ~2.93s vs <2.5s target):
 * - CLS: hard fail above 0.1
 * - LCP: warn above 3500ms (regression ceiling, not the product target)
 * - Perf score: warn below 0.85
 *
 * Tighten `largest-contentful-paint` to error + 2500 when the exception closes.
 *
 * Local:
 *   npm run build && npx --yes @lhci/cli@0.14.x autorun
 *
 * CI: .github/workflows/lighthouse.yml
 */
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: ['http://127.0.0.1:3002/'],
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 120000,
      settings: {
        preset: 'perf',
        formFactor: 'mobile',
        throttlingMethod: 'simulate',
        onlyCategories: ['performance'],
        chromeFlags: '--no-sandbox --disable-gpu --headless=new',
      },
    },
    assert: {
      assertions: {
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        // Soft ceiling above P6 median (2.93s). Product target remains <2.5s (P1-T17).
        'largest-contentful-paint': ['warn', { maxNumericValue: 3500 }],
        'categories:performance': ['warn', { minScore: 0.85 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
