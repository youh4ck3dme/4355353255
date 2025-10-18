import * as z from 'zod';

// Upravené pre blogové príspevky
export const postSchema = z.object({
  title: z.string().min(3, { message: 'Názov musí mať aspoň 3 znaky.' }),
  slug: z.string().min(3, { message: 'Slug musí mať aspoň 3 znaky.' }),
  content: z.string().optional(),
  author: z.string().optional(),
  status: z.enum(['published', 'draft']),
  tags: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(),
});

export type PostFormValues = z.infer<typeof postSchema>;

export type Post = PostFormValues & {
    id: string;
    createdAt: string;
    updatedAt: string;
}
