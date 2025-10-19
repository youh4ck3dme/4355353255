import type { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.viandmo.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Only include pages that actually exist
  const urls = [
    '/',
    '/o-nas',
    '/cennik',
    '/blog',
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
