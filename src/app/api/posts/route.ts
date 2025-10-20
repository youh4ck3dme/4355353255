
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/lib/types';

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');

export async function GET() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        ...data,
        content, // Sending content for client-side rendering if needed, can be removed for optimization
      } as Post;
    });

    // Sort posts by date (newest first)
    const sortedPosts = allPostsData.sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      } else {
        return -1;
      }
    });

    return NextResponse.json(sortedPosts);
  } catch (error) {
    console.error('Failed to get posts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
