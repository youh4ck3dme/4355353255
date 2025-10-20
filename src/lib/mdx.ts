
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './types';

// This file contains server-side only code.

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');

function readAndParsePost(fileName: string): Post | null {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    
    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Basic validation
        if (typeof data.title !== 'string' || typeof data.date !== 'string' || typeof data.status !== 'string') {
          console.warn(`Skipping invalid post file: ${fileName}. Missing required frontmatter.`);
          return null;
        }

        return {
            slug,
            title: data.title,
            date: data.date,
            status: data.status,
            author: data.author,
            imageUrl: data.imageUrl,
            tags: data.tags,
            excerpt: data.excerpt,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            content,
        };
    } catch (error) {
        console.error(`Error reading or parsing file: ${fileName}`, error);
        return null;
    }
}


export function getPublishedPosts(): Post[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
      .map(readAndParsePost)
      .filter((post): post is Post => post !== null && post.status === 'published');
    
    // Sort posts by date
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error(`Error reading posts directory: ${postsDirectory}`, error);
    return [];
  }
}

export function getAllPostsForAdmin(): Post[] {
    try {
        const fileNames = fs.readdirSync(postsDirectory);
        const allPosts = fileNames
            .map(readAndParsePost)
            .filter((post): post is Post => post !== null);
        
        return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error(`Error reading posts directory for admin: ${postsDirectory}`, error);
        return [];
    }
}


export function getPostBySlug(slug: string): Post | null {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    try {
        if (!fs.existsSync(fullPath)) {
            return null;
        }
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title,
            date: data.date,
            status: data.status,
            author: data.author,
            imageUrl: data.imageUrl,
            tags: data.tags,
            excerpt: data.excerpt,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            content,
        };
    } catch (err) {
        console.error(`Error reading post with slug ${slug}:`, err);
        return null;
    }
}
