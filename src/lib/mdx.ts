
import { Post } from './types';
import slugify from 'slugify';
import { getAdminApp } from '@/lib/firebase-admin';

// Helper to get the Firestore DB instance from the admin app
function getDb() {
    const adminApp = getAdminApp();
    return adminApp.firestore();
}

// This function is only used by the API route now to save posts.
// Note: This function remains as a placeholder, actual saving happens in the API route.
export async function savePost(postData: Omit<Post, 'date'>): Promise<void> {
    const db = getDb();
    const { slug, ...data } = postData;
    const finalSlug = slug || slugify(postData.title, { lower: true, strict: true });
    const postRef = db.collection('blogPosts').doc(finalSlug);
    
    const dataToSave = {
        ...data,
        updatedAt: new Date().toISOString(),
    };
    await postRef.set(dataToSave, { merge: true });
}

/**
 * Fetches a single post by its slug from Firestore using the Admin SDK.
 * @param slug The slug of the post to fetch.
 * @returns The post data or null if not found.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const db = getDb();
        const postRef = db.collection('blogPosts').doc(slug);
        const docSnap = await postRef.get();

        if (docSnap.exists) {
            const data = docSnap.data();
            return {
                slug: docSnap.id,
                ...data,
            } as Post;
        }
        return null;
    } catch (error) {
        console.error(`[getPostBySlug] Error fetching post '${slug}':`, error);
        return null;
    }
}

/**
 * Fetches all posts that have the status 'published' using the Admin SDK.
 * @returns An array of published posts.
 */
export async function getPublishedPosts(): Promise<Post[]> {
    try {
        const db = getDb();
        const postsCollection = db.collection('blogPosts');
        const q = postsCollection.where('status', '==', 'published');
        const postSnapshot = await q.get();

        if (postSnapshot.empty) {
            return [];
        }

        return postSnapshot.docs.map(doc => ({
            slug: doc.id,
            ...doc.data()
        })) as Post[];
    } catch (error) {
        console.error('[getPublishedPosts] Error fetching posts:', error);
        return [];
    }
}
