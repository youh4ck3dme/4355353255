import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/api';

const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.viandmo.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  
  // Static pages
  const staticUrls = [
    '/',
    '/o-nas',
    '/cennik',
    '/blog',
    '/ochrana-sukromia',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  // Dynamic blog posts
  const posts = await getPublishedPosts();
  const postUrls = posts.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...postUrls];
}
