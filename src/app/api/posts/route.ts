import { NextResponse } from 'next/server';
import { getPublishedPosts, getAllPostsForAdmin, savePost } from '@/lib/mdx';
import { z } from 'zod';
import { initializeFirebaseAdmin } from '@/lib/firebase-admin';

// This is a Route Handler, which is executed on the server.
// It can safely use server-side modules.
export async function GET() {
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
        const { auth } = await initializeFirebaseAdmin();
        const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];

        if (!idToken) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
    
        // This is a simplified auth check. In a real app, you'd check for a specific admin claim.
        // For this project, any valid token is considered an admin.
        // The password protection on the frontend is the main gatekeeper.
        await auth.verifyIdToken(idToken);
        
        const json = await request.json();
        const postData = postSchema.parse(json);

        await savePost(postData);

        return NextResponse.json({ message: 'Post saved successfully' });

    } catch (error) {
        console.error('Failed to save post:', error);
        if (error instanceof z.ZodError) {
             return NextResponse.json({ message: 'Invalid data', errors: error.errors }, { status: 400 });
        }
        if ((error as any).code === 'auth/id-token-expired') {
            return NextResponse.json({ message: 'Authentication token has expired' }, { status: 401 });
        }
         if ((error as any).code === 'auth/argument-error') {
            return NextResponse.json({ message: 'Invalid authentication token' }, { status: 401 });
        }
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
