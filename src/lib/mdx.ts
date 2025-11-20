
import { Post } from './types';
import { collection, getDocs, doc, getDoc, query, where, setDoc, getFirestore } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import slugify from 'slugify';

// --- SERVER-SIDE ONLY ---

// This function safely initializes Firebase on the server-side if it hasn't been already.
// It's safe to call this multiple times.
function getDb() {
    if (getApps().length === 0) {
        initializeApp(firebaseConfig);
    }
    return getFirestore(getApp());
}


export async function getPublishedPosts(): Promise<Post[]> {
    const db = getDb();
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
    const db = getDb();
    const postsCollection = collection(db, 'blogPosts');
    const postSnapshot = await getDocs(postsCollection);

    const posts = postSnapshot.docs.map(doc => ({
        slug: doc.id,
        ...doc.data()
    } as Post));

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const db = getDb();
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
type PostData = Omit<Post, 'date'>;

export async function savePost(postData: PostData): Promise<void> {
    const db = getDb();
    const { slug, ...data } = postData;
    
    const finalSlug = slug || slugify(postData.title, { lower: true, strict: true });
    
    const postRef = doc(db, 'blogPosts', finalSlug);

    const docSnapshot = await getDoc(postRef);

    const dataToSave = {
        ...data,
        updatedAt: new Date().toISOString(),
        // Set initial date only if it's a new post (document doesn't exist)
        ...(!docSnapshot.exists() && { date: new Date().toISOString() }),
    };
    
    await setDoc(postRef, dataToSave, { merge: true });
}
