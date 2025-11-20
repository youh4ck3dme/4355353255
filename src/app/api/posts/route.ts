
import { NextResponse } from 'next/server';
import { getAllPostsForAdmin, savePost } from '@/lib/mdx';
import { z } from 'zod';
import { initializeAdminApp } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';

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


async function verifyAdminToken(idToken: string) {
    const adminApp = await initializeAdminApp();
    const auth = getAuth(adminApp);
    
    // This verifies the token and decodes it.
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // For this app, we'll just check if the email is the admin email.
    // In a more complex app, you might check for custom claims.
    if (decodedToken.email !== 'admin@vimo.com') {
      throw new Error('User is not authorized to perform this action.');
    }

    return decodedToken;
}


export async function POST(request: Request) {
    try {
        const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];

        if (!idToken) {
            return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
        }
    
        await verifyAdminToken(idToken);
        
        const json = await request.json();
        const postData = postSchema.parse(json);

        await savePost(postData);

        return NextResponse.json({ message: 'Post saved successfully' });

    } catch (error) {
        console.error('Failed to save post:', error);
        if (error instanceof z.ZodError) {
             return NextResponse.json({ message: 'Invalid data', errors: error.errors }, { status: 400 });
        }
        if ((error as any).code?.startsWith('auth/')) {
            return NextResponse.json({ message: 'Authentication error: ' + (error as any).message }, { status: 401 });
        }
        return NextResponse.json({ message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
    }
}
