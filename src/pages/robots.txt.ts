/**
 * /robots.txt generowany przy buildzie.
 * Przed startem (SITE.indexable = false) blokuje wszystkie roboty.
 */
import type { APIRoute } from 'astro';
import { SITE } from '../config/site.ts';

export const GET: APIRoute = () => {
  const body = SITE.indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', SITE.url).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
