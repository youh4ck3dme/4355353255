import { Post } from './types';
import slugify from 'slugify';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';

// This function is only used by the API route now to save posts.
export async function savePost(postData: Omit<Post, 'date'>): Promise<void> {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore(app);

    const { slug, ...data } = postData;
    
    const finalSlug = slug || slugify(postData.title, { lower: true, strict: true });
    
    const postRef = doc(db, 'blogPosts', finalSlug);

    const dataToSave = {
        ...data,
        updatedAt: new Date().toISOString(),
        // Note: The 'date' field is now set on the client-side when creating a new post.
        // This function primarily handles updates.
    };
    
    await setDoc(postRef, dataToSave, { merge: true });
}
