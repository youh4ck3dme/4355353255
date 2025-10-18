import { NextResponse } from 'next/server';
import { Post, postSchema } from '@/app/dashboard/products/schema';

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
    {
        id: "post-3",
        title: "Sprievodca suplementami",
        slug: "sprievodca-suplementami",
        content: "Všetko, čo potrebujete vedieť o doplnkoch výživy.",
        author: "Ján Tréner",
        status: "draft",
        tags: ["suplementy", "doplnky"],
        imageUrl: "https://picsum.photos/seed/p3/400/250",
        createdAt: "2024-05-15T09:00:00Z",
        updatedAt: "2024-05-15T09:00:00Z",
    }
];


/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Získa zoznam všetkých blogových príspevkov
 *     description: Vráti pole všetkých príspevkov alebo len publikované, ak je prítomný query parameter `status=published`.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [published]
 *         description: Filtruje príspevky podľa statusu.
 *     responses:
 *       200:
 *         description: Úspešná operácia
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let data = posts;

  if (status === 'published') {
    data = posts.filter(p => p.status === 'published');
  }

  return NextResponse.json(data);
}


/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Vytvorí nový blogový príspevok
 *     description: Vytvorí nový príspevok na základe poskytnutých dát.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostFormValues'
 *     responses:
 *       201:
 *         description: Príspevok úspešne vytvorený.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Neplatné vstupné dáta.
 */
export async function POST(request: Request) {
    try {
        const jsonData = await request.json();
        const parsed = postSchema.safeParse(jsonData);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
        }

        const newPost: Post = {
            id: `post-${Date.now()}`,
            ...parsed.data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        posts.unshift(newPost); // Pridá nový príspevok na začiatok poľa

        return NextResponse.json(newPost, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
}
