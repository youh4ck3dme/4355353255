
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './types';

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');

export async function getPublishedPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // Remove ".mdx" from file name to get slug
    const slug = fileName.replace(/\.mdx$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data,
      content: matterResult.content,
    } as Post;
  });

  // Sort posts by date and filter for published posts
  return allPostsData
    .filter(post => post.status === 'published')
    .sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      } else {
        return -1;
      }
    });
}


export async function getPostBySlug(slug: string): Promise<Post | null> {
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
        console.error(`Error reading post with slug ${slug}:`, err);
        return null;
    }
}
