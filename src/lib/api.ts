import { Post } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9002/api';

async function fetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
    try {
        const res = await fetch(url, {
            ...options,
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!res.ok) {
            console.error(`API Error: ${res.status} ${res.statusText}`);
            throw new Error('Failed to fetch data from the API.');
        }
        return res.json();
    } catch (error) {
        console.error("Network or fetch error: ", error);
        // In a real app, you might want to throw a more specific error
        throw new Error('Network error, please try again later.');
    }
}

export async function getPublishedPosts(): Promise<Post[]> {
    return fetcher<Post[]>(`${API_URL}/posts?status=published`);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const post = await fetcher<Post>(`${API_URL}/posts/${slug}`);
    return post;
}
