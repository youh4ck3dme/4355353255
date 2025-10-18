import { NextResponse } from 'next/server';
import type { Post } from '@/app/dashboard/products/schema';

// V REÁLNEJ APLIKÁCII BY TOTO BOLA DATABÁZA
let posts: Post[] = [
    {
        id: "post-1",
        title: "Ako začať s fitness",
        slug: "ako-zacat-s-fitness",
        content: "Toto je obsah príspevku o tom, ako začať s fitness...",
        author: "Ján Tréner",
        status: "published",
        tags: ["fitness", "začiatočníci"],
        imageUrl: "https://picsum.photos/seed/p1/400/250",
        createdAt: "2024-05-10T10:00:00Z",
        updatedAt: "2024-05-10T10:00:00Z",
    },
    {
        id: "post-2",
        title: "Najlepšie proteínové recepty",
        slug: "najlepsie-proteinove-recepty",
        content: "Objavte chutné a jednoduché recepty plné proteínov...",
        author: "Zuzana Kuchárka",
        status: "published",
        tags: ["recepty", "proteín"],
        imageUrl: "https://picsum.photos/seed/p2/400/250",
        createdAt: "2024-05-12T14:30:00Z",
        updatedAt: "2024-05-12T14:30:00Z",
    },
];

/**
 * @swagger
 * /api/posts/{slug}:
 *   get:
 *     summary: Získa jeden blogový príspevok podľa slug
 *     description: Vráti detail jedného príspevku na základe jeho unikátneho slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Unikátny slug príspevku.
 *     responses:
 *       200:
 *         description: Úspešná operácia.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Príspevok sa nenašiel.
 */
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return NextResponse.json({ error: 'Príspevok nebol nájdený' }, { status: 404 });
  }

  // Vrátime len publikované príspevky, pokiaľ nepríde špeciálny "preview" token
  if (post.status !== 'published') {
     return NextResponse.json({ error: 'Príspevok nebol nájdený' }, { status: 404 });
  }

  return NextResponse.json(post);
}
