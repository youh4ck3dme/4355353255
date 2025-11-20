
import { Post } from './types';
import slugify from 'slugify';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';

// Helper to initialize and get Firebase instances
function getDb() {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    return getFirestore(app);
}

// This function is only used by the API route now to save posts.
export async function savePost(postData: Omit<Post, 'date'>): Promise<void> {
    const db = getDb();
    const { slug, ...data } = postData;
    const finalSlug = slug || slugify(postData.title, { lower: true, strict: true });
    const postRef = doc(db, 'blogPosts', finalSlug);
    const dataToSave = {
        ...data,
        updatedAt: new Date().toISOString(),
    };
    await setDoc(postRef, dataToSave, { merge: true });
}

/**
 * Fetches a single post by its slug from Firestore.
 * @param slug The slug of the post to fetch.
 * @returns The post data or null if not found.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
    const db = getDb();
    const postRef = doc(db, 'blogPosts', slug);
    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
        return {
            slug: docSnap.id,
            ...docSnap.data(),
        } as Post;
    }
    return null;
}

/**
 * Fetches all posts that have the status 'published'.
 * @returns An array of published posts.
 */
export async function getPublishedPosts(): Promise<Post[]> {
    const db = getDb();
    const postsCollection = collection(db, 'blogPosts');
    const q = query(postsCollection, where('status', '==', 'published'));
    const postSnapshot = await getDocs(q);

    return postSnapshot.docs.map(doc => ({
        slug: doc.id,
        ...doc.data()
    })) as Post[];
}
