
import { Post } from './types';
import { getFirestore, doc, setDoc, getDoc } from 'firebase-admin/firestore';
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import slugify from 'slugify';

// This function should only be used on the server.
async function getDb() {
  if (getApps().length) {
    return getFirestore();
  }

  // This is a simplified and potentially insecure way to initialize for a serverless environment.
  // In a real production app, use environment variables securely.
  const serviceAccount = {
    projectId: process.env.PROJECT_ID || 'studio-6196097112-43509',
    clientEmail: process.env.CLIENT_EMAIL || 'firebase-adminsdk-vcspr@studio-6196097112-43509.iam.gserviceaccount.com',
    privateKey: (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  };

  initializeApp({
    credential: credential.cert(serviceAccount),
  });

  return getFirestore();
}

type PostData = Omit<Post, 'date'>;

// This function is only used by the API route now.
export async function savePost(postData: PostData): Promise<void> {
    const db = await getDb();
    const { slug, ...data } = postData;
    
    const finalSlug = slug || slugify(postData.title, { lower: true, strict: true });
    
    const postRef = db.collection('blogPosts').doc(finalSlug);

    const docSnapshot = await postRef.get();

    const dataToSave = {
        ...data,
        updatedAt: new Date().toISOString(),
        ...(!docSnapshot.exists && { date: new Date().toISOString() }),
    };
    
    await postRef.set(dataToSave, { merge: true });
}

// NOTE: The following functions are no longer used by the application frontend
// because all data fetching has been moved to the client-side to prevent
// build errors with 'firebase-admin'. They are kept here for potential
// future server-side use but are not actively called.

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
