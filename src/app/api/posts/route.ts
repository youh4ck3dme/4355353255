
import { NextResponse } from 'next/server';
import { getAllPostsForAdmin } from '@/lib/mdx';

// This is a Route Handler, which is executed on the server.
// It can safely use server-side modules like 'fs'.
export async function GET() {
  try {
    const allPosts = getAllPostsForAdmin(); 
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('API Error: Failed to get posts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
