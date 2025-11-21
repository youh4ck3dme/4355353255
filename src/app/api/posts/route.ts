
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminApp } from '@/lib/firebase-admin';

// Ensure this runs on the Node.js runtime, not the edge.
export const runtime = 'nodejs';

// Initialize Firebase Admin SDK
const app = getAdminApp();
const db = app.firestore();
const auth = app.auth();

// GET all blog posts (admin-style)
export async function GET() {
  try {
    const snapshot = await db.collection('blogPosts').get();
    
    const allPosts = snapshot.docs.map(doc => ({
        slug: doc.id,
        ...doc.data()
    }));

    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('API Error: Failed to get posts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// Zod schema for validation
const postSchema = z.object({
  slug: z.string(),
  title: z.string().min(3, 'Titulok musí mať aspoň 3 znaky.'),
  content: z.string().optional(),
  author: z.string().optional(),
  imageUrl: z.string().url('Zadajte platnú URL adresu obrázka.').optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']),
});


// POST a new or updated blog post
export async function POST(request: Request) {
    try {
        // 1. Authenticate the request
        const token = request.headers.get('Authorization')?.split('Bearer ')[1];
        if (!token) {
            return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
        }
        
        const decodedToken = await auth.verifyIdToken(token);
        const uid = decodedToken.uid;

        // 2. Authorize the user (check for admin role)
        const adminRoleDoc = await db.collection('roles_admin').doc(uid).get();
        if (!adminRoleDoc.exists) {
            return NextResponse.json({ message: 'Insufficient permissions. User is not an admin.' }, { status: 403 });
        }
        
        // 3. Validate the request body
        const json = await request.json();
        const postData = postSchema.parse(json);
        
        // 4. Prepare and save data using Admin SDK
        const { slug, ...data } = postData;
        const postRef = db.collection('blogPosts').doc(slug);
        const docSnapshot = await postRef.get();

        const dataToSave = {
            ...data,
            updatedAt: new Date().toISOString(),
            // If the document doesn't exist, set the initial creation date
            ...(!docSnapshot.exists && { date: new Date().toISOString() }),
        };
    
        // Use set with merge: true to create or update
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
