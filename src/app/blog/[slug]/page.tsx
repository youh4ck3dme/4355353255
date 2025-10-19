
import { getPostBySlug, getPublishedPosts } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Metadata } from 'next';
import { BlogCard } from '@/components/BlogCard';
import Link from 'next/link';

// Helper function to extract meta description from post content using regex
const getMetaDescription = (content: string): string | null => {
    const match = content.match(/<div data-seo-meta="description".*?>(.*?)<\/div>/s);
    return match ? match[1].trim().replace(/<[^>]*>?/gm, '') : null;
};

// Helper function to extract FAQ schema data from post content using regex
const getFaqSchema = (content: string): object | null => {
    const faqRegex = /<h2>FAQ<\/h2>([\s\S]*)/;
    const faqSectionMatch = content.match(faqRegex);
    if (!faqSectionMatch) return null;

    const questionRegex = /<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/g;
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

// Helper function to remove special SEO blocks from the content to be rendered
const cleanContent = (content: string): string => {
    // Use the 's' flag (dotAll) to ensure '.' matches newline characters
    return content
        .replace(/<div data-seo-meta="description"[\s\S]*?<\/div>/, '')
        .replace(/<h2>FAQ<\/h2>[\s\S]*/, '');
};


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
  
  let description = `Prečítajte si viac o téme "${post.title}" a získajte cenné tipy od expertov z VI&MO. Váš spoľahlivý partner pre sťahovanie a upratovanie v Bratislave.`;
  if (post.content) {
    const customDescription = getMetaDescription(post.content);
    if (customDescription) {
        description = customDescription;
    }
  }
  
  return {
    title: `${post.title} | Bratislava sťahovanie | VI&MO`,
    description: description,
    alternates: {
        canonical: postUrl,
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getPostBySlug(params.slug);
    
    if (!post || post.status !== 'published') {
        notFound();
    }
    
    const allPosts = await getPublishedPosts();

    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    
    const relatedPosts = allPosts
        .filter(p => p.id !== post.id && (post.tags || []).some(tag => (p.tags || []).includes(tag)))
        .slice(0, 3);

    const blogPostJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: getMetaDescription(post.content || '') || `Prečítajte si viac o téme "${post.title}" a získajte cenné tipy od expertov z VI&MO.`,
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
                url: `${siteUrl}/logo.png`,
            },
        },
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl,
        },
        keywords: post.tags?.join(', ')
    };

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Domov",
          "item": siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${siteUrl}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title
        }
      ]
    };


    let finalContent = post.content || '';
    let faqSchema = null;
    if (post.content) {
        faqSchema = getFaqSchema(finalContent);
        finalContent = cleanContent(finalContent);
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {faqSchema && (
                 <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <article className="bg-brand-light-gray dark:bg-brand-dark-teal/80 shadow-xl rounded-lg p-6 lg:p-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-brand-dark-teal dark:text-brand-bg text-center md:text-left">{post.title}</h1>
                    <div className="text-brand-secondary-grey dark:text-slate-300 text-sm mb-4 flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
                        <span>Autor: <span className="font-medium">{post.author || 'VI&MO Team'}</span> | Publikované: {format(new Date(post.createdAt), 'd. M. yyyy')}</span>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                            {post.tags.map(tag => (
                                <Link key={tag} href={`/blog?category=${encodeURIComponent(tag)}`} className="bg-brand-bright-green/20 text-brand-dark-teal dark:bg-brand-bright-green dark:text-brand-dark-teal text-xs font-bold px-3 py-1 rounded-full hover:bg-brand-bright-green/40 transition-colors">
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}
                    
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

                    {finalContent && (
                        <div 
                            className="prose prose-lg dark:prose-invert max-w-none text-left"
                            dangerouslySetInnerHTML={{ __html: finalContent }}
                        />
                    )}
                </article>

                {relatedPosts.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold mb-6 text-center text-brand-dark-teal dark:text-brand-bg text-shadow-3d-green">Mohlo by vás zaujímať</h2>
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
