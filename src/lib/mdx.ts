
import { Post } from './types';
import { collection, getDocs, doc, getDoc, query, where, setDoc } from 'firebase/firestore';
import { initializeFirebaseAdmin } from './firebase-admin';
import slugify from 'slugify';

// --- SERVER-SIDE ONLY ---

async function getFirestoreInstance() {
    const { firestore } = await initializeFirebaseAdmin();
    return firestore;
}

export async function getPublishedPosts(): Promise<Post[]> {
    const db = await getFirestoreInstance();
    const postsCollection = collection(db, 'blogPosts');
    const q = query(postsCollection, where('status', '==', 'published'));
    const postSnapshot = await getDocs(q);
    
    const posts = postSnapshot.docs.map(doc => ({
        slug: doc.id,
        ...doc.data()
    } as Post));
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllPostsForAdmin(): Promise<Post[]> {
    const db = await getFirestoreInstance();
    const postsCollection = collection(db, 'blogPosts');
    const postSnapshot = await getDocs(postsCollection);

    const posts = postSnapshot.docs.map(doc => ({
        slug: doc.id,
        ...doc.data()
    } as Post));

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const db = await getFirestoreInstance();
    const postDoc = doc(db, 'blogPosts', slug);
    const postSnapshot = await getDoc(postDoc);

    if (!postSnapshot.exists()) {
        return null;
    }

    return {
        slug: postSnapshot.id,
        ...postSnapshot.data()
    } as Post;
}

// Function to save or update a post
type PostData = Omit<Post, 'date'> & { date?: string };

export async function savePost(postData: PostData): Promise<void> {
    const db = await getFirestoreInstance();
    const { slug, ...data } = postData;
    
    const finalSlug = slug || slugify(postData.title, { lower: true, strict: true });
    
    const postRef = doc(db, 'blogPosts', finalSlug);

    const docSnapshot = await getDoc(postRef);

    const dataToSave = {
        ...data,
        updatedAt: new Date().toISOString(),
        ...(docSnapshot.exists() ? {} : { date: new Date().toISOString() }), // Set initial date only if it's a new post
    };
    
    await setDoc(postRef, dataToSave, { merge: true });
}
