
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './types';

// This file contains server-side only code.
// It should not be imported into any client-side components.

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');

// This function is intended to be used only in server-side environments 
// (like API routes, getStaticProps, getServerSideProps, or generateStaticParams).
export function getPublishedPosts(): Post[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .map(fileName => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        
        try {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          return {
            slug,
            ...data,
            content, // Content is included for API route to pass to client
          } as Post;
        } catch (readError) {
          console.error(`Error reading or parsing file: ${fileName}`, readError);
          return null; // Skip this file if it's unreadable
        }
      })
      .filter((post): post is Post => post !== null); // Filter out any nulls from failed reads

    // Sort posts by date and filter for published posts
    return allPostsData
      .filter(post => post.status === 'published')
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  } catch (dirError) {
    console.error(`Error reading posts directory: ${postsDirectory}`, dirError);
    return []; // Return empty array if directory can't be read
  }
}

export function getAllPostsForAdmin(): Post[] {
    try {
        const fileNames = fs.readdirSync(postsDirectory);
        const allPostsData = fileNames.map(fileName => {
            const slug = fileName.replace(/\.mdx$/, '');
            const fullPath = path.join(postsDirectory, fileName);
             try {
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const { data, content } = matter(fileContents);
                return { slug, ...data, content } as Post;
            } catch (readError) {
                console.error(`Error reading or parsing file for admin: ${fileName}`, readError);
                return null;
            }
        }).filter((post): post is Post => post !== null);

        return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (dirError) {
        console.error(`Error reading posts directory for admin: ${postsDirectory}`, dirError);
        return [];
    }
}


export function getPostBySlug(slug: string): Post | null {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            ...data,
            content,
        } as Post;
    } catch (err) {
        // This is expected if the file doesn't exist (e.g., during build time for a bad link)
        // We log a more detailed error only if it's not a simple file-not-found case
        if (typeof err === 'object' && err !== null && 'code' in err && err.code !== 'ENOENT') {
             console.error(`Error reading post with slug ${slug}:`, err);
        }
        return null;
    }
}
