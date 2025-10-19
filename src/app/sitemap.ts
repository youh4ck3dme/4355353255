import type { MetadataRoute } from 'next';

const base = 'https://app.viandmo.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls = [
    '/',
    '/sluzby',
    '/sluzby/stahovanie-bytov-domov',
    '/sluzby/stahovanie-firiem',
    '/sluzby/stahovanie-tazkych-bremien-klavirov',
    '/sluzby/vypratavanie-likvidacia',
    '/sluzby/autodoprava-s-vodicom',
    '/lokality',
    '/cennik',
    '/blog',
    '/kontakt',
    '/kalkulacka',
    '/faq',
    '/referencie'
  ];

  return urls.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7
  }));
}
