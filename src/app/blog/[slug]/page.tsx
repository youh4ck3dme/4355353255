import { getPostBySlug, getPublishedPosts } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Metadata } from 'next';
import { BlogCard } from '@/components/BlogCard';

type BlogPostPageProps = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const posts = await getPublishedPosts();
    return posts.map(post => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Článok nenájdený',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const description = `Prečítajte si viac o téme "${post.title}" a získajte cenné tipy od expertov z VI&MO. Váš spoľahlivý partner pre sťahovanie a upratovanie v Bratislave.`;

  return {
    title: `${post.title} | VI&MO Blog`,
    description: description,
    alternates: {
        canonical: postUrl,
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getPostBySlug(params.slug);
    const allPosts = await getPublishedPosts();

    if (!post) {
        notFound();
    }

    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    
    // Filter for related posts, excluding the current one
    const relatedPosts = allPosts
        .filter(p => p.id !== post.id) // You might want a better logic, e.g. by tags
        .slice(0, 3);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: `Prečítajte si viac o téme "${post.title}" a získajte cenné tipy od expertov z VI&MO.`,
        image: post.imageUrl || `${siteUrl}/placeholder-logo.png`,
        author: {
            '@type': 'Organization',
            name: post.author || 'VI&MO Team',
            url: siteUrl, 
        },
        publisher: {
            '@type': 'Organization',
            name: 'VI&MO S.R.O.',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`, // Uistite sa, že tento súbor existuje v /public
            },
        },
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <article className="bg-brand-bg dark:bg-brand-dark-teal/80 shadow-xl rounded-lg p-6 lg:p-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-brand-text dark:text-brand-bg">{post.title}</h1>
                    <div className="text-brand-secondary-grey dark:text-slate-300 text-sm mb-6 flex justify-between">
                        <span>Autor: <span className="font-medium">{post.author || 'VI&MO Team'}</span> | Publikované: {format(new Date(post.createdAt), 'd. M. yyyy')}</span>
                    </div>
                    
                    {post.imageUrl && (
                        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                            <Image 
                                src={post.imageUrl} 
                                alt={post.title} 
                                fill 
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 896px"
                             />
                        </div>
                    )}

                    {post.content && (
                        <div 
                            className="prose prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    )}
                </article>

                {relatedPosts.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold mb-6 text-center text-brand-dark-teal dark:text-brand-bg">Mohlo by vás zaujímať</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPosts.map(relPost => (
                                <BlogCard key={relPost.id} post={relPost} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
