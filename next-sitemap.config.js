/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mindmesh.global',
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    // next-sitemap v4 uses `policies` (not `rules`).
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/settings/', '/api/', '/admin/', '/sensor&mascot'],
      },
    ],
  },
  exclude: [
    '/dashboard',
    '/dashboard/*',
    '/settings',
    '/settings/*',
    '/api/*',
    '/admin/*',
    '/_not-found',
    '/icon.png',
    // Legacy combined URL: client shim only (P8-T14). Keep out of sitemap; Disallow below.
    // Indexable depth pages are /sensor and /mascot (P8-T17).
    '/sensor&mascot',
    '/sensor&mascot/*',
  ],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : 0.7,
    lastmod: new Date().toISOString(),
  }),
};
