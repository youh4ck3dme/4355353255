'use client';

import { useState, useEffect, useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { BlogCard } from '@/components/BlogCard';
import Link from 'next/link';
import { useFirebase } from '@/firebase/provider';
import { Post } from '@/lib/types';
import { doc, onSnapshot, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

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

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { firestore, isLoading: isFirebaseLoading } = useFirebase();

    const [post, setPost] = useState<Post | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
    const [isLoadingPost, setIsLoadingPost] = useState(true);
    
    const postRef = useMemo(() => {
        if (!firestore || !slug) return null;
        return doc(firestore, 'blogPosts', slug);
    }, [firestore, slug]);

    useEffect(() => {
        if (!postRef) {
            if(!isFirebaseLoading) setIsLoadingPost(false);
            return;
        };

        setIsLoadingPost(true);
        const unsubscribe = onSnapshot(postRef, (docSnap) => {
            if (docSnap.exists()) {
                const postData = {
                    slug: docSnap.id,
                    ...docSnap.data()
                } as Post;
                
                if (postData.status === 'published') {
                    setPost(postData);
                } else {
                    setPost(null); // Treat draft as not found for public
                }
            } else {
                setPost(null);
            }
            setIsLoadingPost(false);
        }, (error) => {
            console.error("Error fetching post:", error);
            setIsLoadingPost(false);
        });

        return () => unsubscribe();
    }, [postRef, isFirebaseLoading]);

    useEffect(() => {
        if (!post || !firestore || post.tags?.length === 0) {
            setRelatedPosts([]);
            return;
        }

        const fetchRelated = async () => {
            const q = query(
                collection(firestore, "blogPosts"),
                where('status', '==', 'published'),
                where('tags', 'array-contains-any', post.tags),
                limit(4) // Fetch 4, one might be the current post
            );
            const snapshot = await getDocs(q);
            const related = snapshot.docs
                .map(doc => ({ slug: doc.id, ...doc.data() } as Post))
                .filter(p => p.slug !== post.slug) // Exclude current post
                .slice(0, 3); // Limit to 3
            setRelatedPosts(related);
        };

        fetchRelated();

    }, [post, firestore]);

    if (isLoadingPost || isFirebaseLoading) {
        return (
             <div className="container mx-auto px-4 py-20 text-center min-h-[70vh] flex flex-col justify-center items-center">
                <Loader2 className="h-16 w-16 animate-spin text-brand-bright-green" />
                <p className="mt-4 text-slate-300">Načítavam článok...</p>
            </div>
        );
    }
    
    if (!post) {
        notFound();
    }
    
    const siteUrl = 'https://stahovanie.website';
    const postUrl = `${siteUrl}/blog/${post.slug}`;

    const blogPostJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription || `Prečítajte si viac o téme "${post.title}" a získajte cenné tipy od expertov z VI&MO.`,
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
        datePublished: post.date,
        dateModified: post.updatedAt || post.date,
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
    let faqSchema = getFaqSchema(finalContent);

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
            <div className="bg-brand-bg text-brand-text dark:bg-brand-dark-teal dark:text-brand-bg">
                <div className="container mx-auto px-4 py-8 max-w-5xl">
                    <article className="bg-brand-light-gray dark:bg-brand-dark-teal/80 shadow-xl rounded-lg p-6 lg:p-10">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-brand-dark-teal dark:text-brand-bg text-center md:text-left">{post.title}</h1>
                        <div className="text-brand-secondary-grey dark:text-slate-300 text-sm mb-4 flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
                            <span>Autor: <span className="font-medium">{post.author || 'VI&MO Team'}</span> | Publikované: {format(new Date(post.date), 'd. M. yyyy')}</span>
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
