
// This corresponds to the Post type from the backend and MDX frontmatter
export type Post = {
    // from MDX
    title: string;
    date: string;
    author?: string;
    imageUrl?: string;
    tags?: string[];
    excerpt?: string;
    metaTitle?: string;
    metaDescription?: string;
    
    // from both
    slug: string;
    content?: string;
    status: 'published' | 'draft';

    // from API - can be optional now
    id?: string;
    createdAt?: string;
    updatedAt?: string;
};
