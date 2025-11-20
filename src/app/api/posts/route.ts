
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, query } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from '@/lib/firebase-config';

// Initialize Firebase app if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// This is a Route Handler, which is executed on the server.
export async function GET() {
  try {
    const postsCollection = collection(db, 'blogPosts');
    const q = query(postsCollection);
    const postSnapshot = await getDocs(q);
    
    const allPosts = postSnapshot.docs.map(doc => ({
        slug: doc.id,
        ...doc.data()
    }));

    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('API Error: Failed to get posts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

const postSchema = z.object({
  slug: z.string(),
  title: z.string().min(3, 'Titulok musí mať aspoň 3 znaky.'),
  content: z.string().optional(),
  author: z.string().optional(),
  imageUrl: z.string().url('Zadajte platnú URL adresu obrázka.').optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']),
});


export async function POST(request: Request) {
    try {
        // Basic auth simulation, replace with real auth in production
        // For now, we assume if you can call this endpoint, you are authorized.
        // A real implementation would verify a JWT token.
        
        const json = await request.json();
        const postData = postSchema.parse(json);
        
        const { slug, ...data } = postData;
        const postRef = doc(db, 'blogPosts', slug);
        const docSnapshot = await getDoc(postRef);

        const dataToSave = {
            ...data,
            updatedAt: new Date().toISOString(),
            ...(!docSnapshot.exists() && { date: new Date().toISOString() }),
        };
    
        await setDoc(postRef, dataToSave, { merge: true });

        return NextResponse.json({ message: 'Post saved successfully' });

    } catch (error) {
        console.error('Failed to save post:', error);
        if (error instanceof z.ZodError) {
             return NextResponse.json({ message: 'Invalid data', errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
    }
}
