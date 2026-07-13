/**
 * Path-list verification for P5-T01 / P8-T08 / P9-T02 (no Jest in this repo).
 * Run: node scripts/verify-marketing-routes.mjs
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(__dirname, '../lib/marketing-routes.ts'), 'utf8');

const expected = [
  '/',
  '/inbox',
  '/connected-apps',
  '/yesterdays-narrative',
  '/upcoming-events',
  '/security',
  '/trust',
  '/contact',
  '/billing',
  '/faq',
  '/privacy',
  '/terms',
  '/sensor',
  '/mascot',
  '/sub-processors',
];

const arrayMatch = source.match(
  /export const MARKETING_FUNNEL_PATHS = \[([\s\S]*?)\] as const/
);
assert.ok(arrayMatch, 'MARKETING_FUNNEL_PATHS export not found');

const listed = [...arrayMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
assert.deepEqual(listed, expected, 'MARKETING_FUNNEL_PATHS must match Phase 9 funnel list');
assert.ok(!listed.includes('/sensor&mascot'), 'legacy /sensor&mascot must not be in funnel');

assert.match(source, /export function isMarketingRoute/);
assert.match(source, /export function isMarketingHomepage/);
assert.match(source, /export function normalizeMarketingPathname/);
assert.match(source, /export function homepageSectionHref/);
assert.match(source, /export const MARKETING_NAV_LINKS/);
assert.match(source, /export const MARKETING_FOOTER_LINKS/);
assert.match(source, /export const MARKETING_DEPTH_BACK_LINKS/);
assert.match(source, /export const MARKETING_CTA_HREF/);

assert.match(
  source,
  /hash: MARKETING_SECTION_HASHES\.connect/,
  'Nav Product must target #connect'
);
assert.match(
  source,
  /hash: MARKETING_SECTION_HASHES\.features/,
  'Nav Features must target #features'
);
assert.match(
  source,
  /hash: MARKETING_SECTION_HASHES\.trust/,
  'Nav Security must target #trust'
);
assert.match(
  source,
  /href: '\/security'/,
  'Footer must include /security'
);
assert.match(
  source,
  /href: '\/sub-processors'/,
  'Footer must include /sub-processors'
);

const shell = readFileSync(
  join(__dirname, '../components/layout/RootAppShell.tsx'),
  'utf8'
);
assert.match(shell, /isMarketingRoute/, 'RootAppShell must gate on isMarketingRoute');
assert.doesNotMatch(
  shell,
  /isMarketingHomepage/,
  'RootAppShell must not use homepage-only gate'
);

// Runtime behavior mirror (keep in sync with lib/marketing-routes.ts)
const PATH_SET = new Set(expected);

function normalizeMarketingPathname(pathname) {
  if (!pathname) return null;
  const withoutQuery = pathname.split(/[?#]/, 1)[0] ?? pathname;
  if (withoutQuery === '/') return '/';
  return withoutQuery.replace(/\/+$/, '') || '/';
}

function isMarketingHomepage(pathname) {
  return normalizeMarketingPathname(pathname) === '/';
}

function isMarketingRoute(pathname) {
  const normalized = normalizeMarketingPathname(pathname);
  if (!normalized) return false;
  return PATH_SET.has(normalized);
}

assert.equal(isMarketingHomepage('/'), true);
assert.equal(isMarketingHomepage('/inbox'), false);
assert.equal(isMarketingRoute('/'), true);
assert.equal(isMarketingRoute('/inbox'), true);
assert.equal(isMarketingRoute('/inbox/'), true);
assert.equal(isMarketingRoute('/inbox?ref=nav'), true);
assert.equal(isMarketingRoute('/security#section'), true);
assert.equal(isMarketingRoute('/contact'), true);
assert.equal(isMarketingRoute('/billing'), true);
assert.equal(isMarketingRoute('/faq'), true);
assert.equal(isMarketingRoute('/privacy'), true);
assert.equal(isMarketingRoute('/terms'), true);
assert.equal(isMarketingRoute('/sensor'), true);
assert.equal(isMarketingRoute('/sensor/'), true);
assert.equal(isMarketingRoute('/sensor?ref=grid'), true);
assert.equal(isMarketingRoute('/mascot'), true);
assert.equal(isMarketingRoute('/mascot#theater'), true);
assert.equal(isMarketingRoute('/sub-processors'), true);
assert.equal(isMarketingRoute('/sub-processors/'), true);
assert.equal(isMarketingRoute('/sub-processors?ref=privacy'), true);
assert.equal(isMarketingRoute('/sensor&mascot'), false);
assert.equal(isMarketingRoute('/dashboard'), false);
assert.equal(isMarketingRoute(null), false);

// Keep in sync with lib/marketing-routes.ts homepageSectionHref
function homepageSectionHref(hash, onHomepage) {
  return onHomepage ? hash : `/${hash}`.replace('//#', '/#');
}

assert.equal(homepageSectionHref('#connect', true), '#connect');
assert.equal(homepageSectionHref('#connect', false), '/#connect');
assert.equal(homepageSectionHref('#features', false), '/#features');
assert.equal(homepageSectionHref('#trust', false), '/#trust');
assert.equal(homepageSectionHref('#cta', false), '/#cta');

console.log('verify-marketing-routes: ok');
