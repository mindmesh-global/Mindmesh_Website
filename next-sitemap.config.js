/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mindmesh.global',
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/settings/', '/api/', '/admin/'],
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
