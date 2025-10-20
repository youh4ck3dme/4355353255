
import { NextResponse } from 'next/server';
import { getAllPostsForAdmin } from '@/lib/mdx';

export async function GET() {
  try {
    // This function can now be different from getPublishedPosts if needed for the admin panel
    const allPosts = getAllPostsForAdmin(); 
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('API Error: Failed to get posts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
