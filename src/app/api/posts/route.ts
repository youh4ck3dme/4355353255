
import { NextResponse } from 'next/server';
import { getPublishedPosts, getAllPostsForAdmin, savePost } from '@/lib/mdx';
import { z } from 'zod';
import { auth } from 'firebase-admin';
import { initializeFirebaseAdmin } from '@/lib/firebase-admin';

// This is a Route Handler, which is executed on the server.
// It can safely use server-side modules like 'fs'.
export async function GET() {
  // NOTE: This now fetches from Firestore via the updated mdx.ts functions
  try {
    const allPosts = await getAllPostsForAdmin(); 
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
        await initializeFirebaseAdmin();
        const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];

        if (!idToken) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
    
        const decodedToken = await auth().verifyIdToken(idToken);
        const isAdmin = decodedToken.admin === true;

        if (!isAdmin) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }
        
        const json = await request.json();
        const postData = postSchema.parse(json);

        await savePost(postData);

        return NextResponse.json({ message: 'Post saved successfully' });

    } catch (error) {
        console.error('Failed to save post:', error);
        if (error instanceof z.ZodError) {
             return NextResponse.json({ message: 'Invalid data', errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
