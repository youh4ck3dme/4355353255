
import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/mdx';
import { services } from '@/lib/services';

const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.viandmo.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  
  // Static pages
  const staticUrls = [
    '/',
    '/sluzby',
    '/lokality',
    '/cennik',
    '/blog',
    '/kontakt',
    '/o-nas',
    '/ochrana-sukromia',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  // Dynamic service pages
  const serviceUrls = services.map(service => ({
    url: `${base}/sluzby/${service.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Dynamic blog posts
  const posts = getPublishedPosts();
  const postUrls = posts.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...serviceUrls, ...postUrls];
}
