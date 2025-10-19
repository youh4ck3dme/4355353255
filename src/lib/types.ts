// Represents the structure of the frontmatter in each MDX blog post file.
export type Post = {
    slug: string;
    title: string;
    date: string;
    status: 'published' | 'draft';
    author?: string;
    imageUrl?: string;
    tags?: string[];
    excerpt?: string;
    metaTitle?: string;
    metaDescription?: string;
    
    // The content of the MDX file
    content: string;

    // Optional fields that are not part of frontmatter but can be added
    id?: string;
    createdAt?: string;
    updatedAt?: string;
};
