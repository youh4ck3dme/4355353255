import { Post } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

async function fetcher<T>(url: string, options: RequestInit = {}): Promise<T | null> {
    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            // Cache invalidation for dynamic operations
            cache: (options.method && options.method !== 'GET') ? 'no-store' : 'default',
             next: { revalidate: (options.method && options.method !== 'GET') ? 0 : 3600 }
        });

        if (!res.ok) {
            console.error(`API Error: ${res.status} ${res.statusText} for URL: ${url}`);
            try {
                const errorBody = await res.json();
                console.error('Error Body:', errorBody);
            } catch (e) {
                // Ignore if body is not json
            }
            return null;
        }

        // Handle no content response for DELETE
        if (res.status === 204) {
            return {} as T;
        }

        return res.json();
    } catch (error) {
        console.error(`Network or fetch error for URL: ${url}`, error);
        return null;
    }
}

// --- Public Read Queries ---

export async function getPublishedPosts(): Promise<Post[]> {
    const posts = await fetcher<Post[]>(`${API_URL}/posts?status=published`);
    return posts || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const post = await fetcher<Post>(`${API_URL}/posts/${slug}`);
    return post;
}

// --- Admin/Protected Queries ---

export async function getAllPosts(): Promise<Post[]> {
    // This should be a protected route on your backend
    const posts = await fetcher<Post[]>(`${API_URL}/posts`);
    return posts || [];
}

export async function createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'slug'>): Promise<Post | null> {
    return await fetcher<Post>(`${API_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(postData),
    });
}

export async function updatePost(slug: string, postData: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Post | null> {
    return await fetcher<Post>(`${API_URL}/posts/${slug}`, {
        method: 'PATCH',
        body: JSON.stringify(postData),
    });
}

export async function deletePost(slug: string): Promise<boolean> {
    const result = await fetcher<{}>(`${API_URL}/posts/${slug}`, {
        method: 'DELETE',
    });
    return result !== null;
}
