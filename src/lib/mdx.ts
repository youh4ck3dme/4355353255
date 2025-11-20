
import { Post } from './types';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeAdminApp } from '@/lib/firebase-admin';
import slugify from 'slugify';

// --- SERVER-SIDE ONLY ---

// This function safely initializes Firebase on the server-side if it hasn't been already.
// It's safe to call this multiple times.
async function getDb() {
    const adminApp = await initializeAdminApp();
    return getFirestore(adminApp);
}


export async function getPublishedPosts(): Promise<Post[]> {
    const db = await getDb();
    const postsCollection = db.collection('blogPosts');
    const q = postsCollection.where('status', '==', 'published');
    const postSnapshot = await q.get();
    
    const posts = postSnapshot.docs.map(doc => ({
        slug: doc.id,
        ...doc.data()
    } as Post));
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllPostsForAdmin(): Promise<Post[]> {
    const db = await getDb();
    const postsCollection = db.collection('blogPosts');
    const postSnapshot = await postsCollection.get();

    const posts = postSnapshot.docs.map(doc => ({
        slug: doc.id,
        ...doc.data()
    } as Post));

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const db = await getDb();
    const postDoc = db.collection('blogPosts').doc(slug);
    const postSnapshot = await postDoc.get();

    if (!postSnapshot.exists) {
        return null;
    }

    return {
        slug: postSnapshot.id,
        ...postSnapshot.data()
    } as Post;
}

// Function to save or update a post
type PostData = Omit<Post, 'date'>;

export async function savePost(postData: PostData): Promise<void> {
    const db = await getDb();
    const { slug, ...data } = postData;
    
    const finalSlug = slug || slugify(postData.title, { lower: true, strict: true });
    
    const postRef = db.collection('blogPosts').doc(finalSlug);

    const docSnapshot = await postRef.get();

    const dataToSave = {
        ...data,
        updatedAt: new Date().toISOString(),
        // Set initial date only if it's a new post (document doesn't exist)
        ...(!docSnapshot.exists && { date: new Date().toISOString() }),
    };
    
    await postRef.set(dataToSave, { merge: true });
}
