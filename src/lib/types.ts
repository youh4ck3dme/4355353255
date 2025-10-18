// This corresponds to the Post type from the backend
export type Post = {
    id: string;
    title: string;
    slug: string;
    content?: string;
    author?: string;
    status: 'published' | 'draft';
    tags?: string[];
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
};
