
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { BlogCard } from '@/components/BlogCard';
import Link from 'next/link';
import { Post } from '@/lib/types';
import { getPostBySlug, getPublishedPosts } from '@/lib/mdx';
import { Metadata } from 'next';
import { Loader2 } from 'lucide-react'; // Placeholder, loading is handled by Next.js

type BlogPostPageProps = {
    params: {
        slug: string;
    };
};

// Helper to extract FAQ schema data from post content using regex
const getFaqSchema = (content: string): object | null => {
    const faqRegex = /<h2>FAQ<\/h2>([\s\S]*)/;
    const faqSectionMatch = content.match(faqRegex);
    if (!faqSectionMatch) return null;

    const questionRegex = /<h3>(.*?)<\/h3>[\s\S]*?<p>(.*?)<\/p>/g;
    let match;
    const mainEntity = [];
    while ((match = questionRegex.exec(faqSectionMatch[1])) !== null) {
        mainEntity.push({
            "@type": "Question",
            name: match[1].trim(),
            acceptedAnswer: {
                "@type": "Answer",
                text: match[2].trim().replace(/<[^>]*>?/gm, '') // Strip HTML from answer
            }
        });
    }

    if (mainEntity.length === 0) return null;

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity
    };
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if (!post || post.status !== 'published') {
        return {
            title: 'Článok nenájdený'
        }
    }

    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://stahovanie.website';
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const title = post.metaTitle || `${post.title} | Blog | VI&MO`;
    const description = post.metaDescription || post.excerpt || `Prečítajte si viac o téme "${post.title}" a získajte cenné tipy od expertov z VI&MO.`;

    return {
        title,
        description,
        keywords: post.tags?.join(', '),
        alternates: {
            canonical: postUrl,
        },
        openGraph: {
            title,
            description,
            url: postUrl,
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.updatedAt || post.date,
            authors: [post.author || 'VI&MO Team'],
            images: [
                {
                    url: post.imageUrl || `${siteUrl}/opengraph-image.png`,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post || post.status !== 'published') {
        notFound();
    }
    
    // Fetch related posts (simple logic based on the first tag)
    const allPosts = await getPublishedPosts();
    const relatedPosts = post.tags && post.tags.length > 0
        ? allPosts
            .filter(p => p.slug !== post.slug && p.tags?.includes(post.tags![0]))
            .slice(0, 3)
        : [];
    
    const siteUrl = 'https://stahovanie.website';
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const finalContent = post.content || '';
    const faqSchema = getFaqSchema(finalContent);

    const blogPostJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription || post.excerpt || `Prečítajte si viac o téme "${post.title}"`,
        image: post.imageUrl || `${siteUrl}/opengraph-image.png`,
        author: {
            '@type': 'Organization',
            name: post.author || 'VI&MO Team',
            url: siteUrl, 
        },
        publisher: {
            '@type': 'Organization',
            name: 'VI and MO s. r. o.',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.svg`,
            },
        },
        datePublished: post.date,
        dateModified: post.updatedAt || post.date,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl,
        },
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Domov", "item": siteUrl },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteUrl}/blog` },
        { "@type": "ListItem", "position": 3, "name": post.title },
      ]
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
            
            <div className="bg-brand-bg dark:bg-brand-dark-teal text-brand-text dark:text-brand-bg">
                <div className="container mx-auto px-4 py-8 max-w-5xl">
                    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-brand-secondary-grey dark:text-slate-400">
                        <ol className="flex items-center space-x-2">
                            <li><Link href="/" className="hover:underline">Domov</Link></li>
                            <li><span className="mx-2">/</span></li>
                            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                             <li><span className="mx-2">/</span></li>
                             <li className="truncate" aria-current="page">{post.title}</li>
                        </ol>
                    </nav>

                    <article className="bg-brand-light-gray dark:bg-brand-dark-teal/80 shadow-xl rounded-lg overflow-hidden">
                        {post.imageUrl && (
                            <div className="relative w-full h-64 md:h-96">
                                <Image 
                                    src={post.imageUrl} 
                                    alt={post.title} 
                                    fill 
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 896px"
                                 />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                        )}

                        <div className="p-6 lg:p-10">
                            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bg">{post.title}</h1>
                            
                            <div className="text-brand-secondary-grey dark:text-slate-300 text-sm mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                                <span>Autor: <span className="font-medium text-brand-dark-teal dark:text-slate-200">{post.author || 'VI&MO Team'}</span></span>
                                <span className="hidden md:inline">|</span>
                                <span>Publikované: <span className="font-medium text-brand-dark-teal dark:text-slate-200">{format(new Date(post.date), 'd. M. yyyy')}</span></span>
                            </div>

                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {post.tags.map(tag => (
                                        <Link key={tag} href={`/blog?category=${encodeURIComponent(tag)}`} className="bg-brand-bright-green/20 text-brand-dark-teal dark:bg-brand-bright-green dark:text-brand-dark-teal text-xs font-bold px-3 py-1 rounded-full hover:bg-brand-bright-green/40 transition-colors">
                                            #{tag.replace(/\s+/g, '-').toLowerCase()}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {finalContent && (
                                <div 
                                    className="prose prose-lg dark:prose-invert max-w-none text-left"
                                    dangerouslySetInnerHTML={{ __html: finalContent }}
                                />
                            )}
                        </div>
                    </article>

                    {relatedPosts.length > 0 && (
                        <section className="mt-16">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-center text-brand-dark-teal dark:text-brand-bg text-shadow-3d-green">Mohlo by vás zaujímať</h2>
                                <p className="text-lg text-brand-secondary-grey dark:text-slate-300 mt-2">Podobné články na súvisiace témy.</p>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedPosts.map(relPost => (
                                    <BlogCard key={relPost.slug} post={relPost} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}

    