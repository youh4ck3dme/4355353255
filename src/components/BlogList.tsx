
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Post } from '@/lib/types';
import { BlogCard } from './BlogCard';
import { cn } from '@/lib/utils';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import GlassCard from './GlassCard';
import { Loader2 } from 'lucide-react';
import { collection, onSnapshot, query, where, orderBy, Query, DocumentData } from 'firebase/firestore';
import { useFirebase } from './PublicLayout';

const ALL_CATEGORIES = ['Tipy na sťahovanie', 'Upratovanie', 'Novinky', 'Vypratávanie'];

export const BlogList = ({ initialPosts, initialCategory }: { initialPosts: Post[], initialCategory?: string }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { firestore } = useFirebase();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);

    const [livePosts, setLivePosts] = useState<Post[] | null>(initialPosts);
    const [areLivePostsLoading, setAreLivePostsLoading] = useState(true);

    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        setSelectedCategory(categoryFromUrl || null);
    }, [searchParams]);

    const postsQuery = useMemo(() => {
        if (!firestore) return null;
        
        const postsCollectionRef = collection(firestore, 'blogPosts');
        const queryConstraints = [
            where('status', '==', 'published'),
            orderBy('date', 'desc')
        ];

        if (selectedCategory) {
            queryConstraints.push(where('tags', 'array-contains', selectedCategory));
        }

        return query(postsCollectionRef, ...queryConstraints as any);
    }, [firestore, selectedCategory]);


    useEffect(() => {
        if (!postsQuery) {
            if (firestore) setAreLivePostsLoading(false);
            return;
        }

        setAreLivePostsLoading(true);
        
        const unsubscribe = onSnapshot(
          postsQuery,
          (snapshot) => {
            const results: Post[] = snapshot.docs.map(doc => ({
                ...(doc.data() as Post),
                slug: doc.id,
            }));
            setLivePosts(results);
            setAreLivePostsLoading(false);
          },
          (err) => {
            console.error("Error fetching live blog posts:", err);
            setAreLivePostsLoading(false);
          }
        );

        return () => unsubscribe();
    }, [postsQuery, firestore]);

    const handleCategoryClick = (category: string | null) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (category) {
            current.set('category', category);
        } else {
            current.delete('category');
        }

        const search = current.toString();
        const query = search ? `?${search}` : "";

        router.push(`${pathname}${query}`, { scroll: false });
    };

    const filteredBySearch = useMemo(() => {
        const postsToFilter = livePosts || [];
        if (!searchQuery) return postsToFilter;
        return postsToFilter.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [livePosts, searchQuery]);
    
    return (
        <div>
            <div className="mb-8 max-w-2xl mx-auto flex flex-col items-center gap-4">
                 <div className="flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => handleCategoryClick(null)}
                        className={cn(
                            "px-4 py-2 text-sm font-bold rounded-full transition-colors glass-button-sm",
                            !selectedCategory ? 'bg-brand-bright-green text-brand-dark-teal' : 'text-white'
                        )}
                    >
                        Všetky
                    </button>
                    {ALL_CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={cn(
                                "px-4 py-2 text-sm font-bold rounded-full transition-colors glass-button-sm",
                                selectedCategory === category ? 'bg-brand-bright-green text-brand-dark-teal' : 'text-white'
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Hľadať v článkoch..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-lg p-3 border-2 border-white/20 rounded-lg focus:border-brand-bright-green
                               focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors
                               bg-white/10 backdrop-blur-sm text-white placeholder-slate-400"
                    aria-label="Vyhľadávanie článkov"
                />
            </div>

            {areLivePostsLoading && (!livePosts || livePosts.length === 0) ? (
                <div className="text-center py-16">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-bright-green" />
                </div>
            ) : filteredBySearch.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBySearch.map(post => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            ) : (
                <GlassCard>
                    <p className="text-xl text-center text-slate-300 py-16">
                        Žiadne výsledky pre &apos;{searchQuery || selectedCategory}&apos;. Skúste iný filter alebo kľúčové slovo.
                    </p>
                </GlassCard>
            )}
        </div>
    );
};
