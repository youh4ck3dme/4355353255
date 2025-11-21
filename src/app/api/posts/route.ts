
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, query } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAdminApp } from '@/lib/firebase-admin';

// Initialize Firebase app if not already initialized
const app = getAdminApp();
const db = app.firestore();


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
        const token = request.headers.get('Authorization')?.split('Bearer ')[1];
        if (!token) {
            return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
        }
        
        const auth = app.auth();
        
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;

        const adminRoleDoc = await db.collection('roles_admin').doc(uid).get();

        if (!adminRoleDoc.exists) {
            return NextResponse.json({ message: 'Insufficient permissions. User is not an admin.' }, { status: 403 });
        }
        
        const json = await request.json();
        const postData = postSchema.parse(json);
        
        const { slug, ...data } = postData;
        const postRef = db.collection('blogPosts').doc(slug);
        const docSnapshot = await getDoc(postRef);

        const dataToSave = {
            ...data,
            updatedAt: new Date().toISOString(),
            ...(!docSnapshot.exists() && { date: new Date().toISOString() }),
        };
    
        await postRef.set(dataToSave, { merge: true });

        return NextResponse.json({ message: 'Post saved successfully' });

    } catch (error: any) {
        console.error('Failed to save post:', error);

        if (error.code === 'auth/id-token-expired') {
            return NextResponse.json({ message: 'Token expired. Please log in again.' }, { status: 401 });
        }
        if (error instanceof z.ZodError) {
             return NextResponse.json({ message: 'Invalid data', errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
