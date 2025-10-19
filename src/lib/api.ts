import { Post } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9002/api';

async function fetcher<T>(url: string, options: RequestInit = {}): Promise<T | null> {
    try {
        const res = await fetch(url, {
            ...options,
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!res.ok) {
            console.error(`API Error: ${res.status} ${res.statusText} for URL: ${url}`);
            return null;
        }
        return res.json();
    } catch (error) {
        console.error(`Network or fetch error for URL: ${url}`, error);
        return null;
    }
}

export async function getPublishedPosts(): Promise<Post[]> {
    const posts = await fetcher<Post[]>(`${API_URL}/posts?status=published`);
    return posts || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const post = await fetcher<Post>(`${API_URL}/posts/${slug}`);
    return post;
}
