
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Post } from '@/lib/types';
import { BlogCard } from './BlogCard';
import { cn } from '@/lib/utils';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import GlassCard from './GlassCard';

const ALL_CATEGORIES = ['Tipy na sťahovanie', 'Upratovanie', 'Novinky', 'Vypratávanie'];

export const BlogList = ({ initialPosts, initialCategory }: { initialPosts: Post[], initialCategory?: string }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);

    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        } else {
            setSelectedCategory(null);
        }
    }, [searchParams]);

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

    const filteredPosts = useMemo(() => {
        let postsToFilter = initialPosts;

        if (selectedCategory) {
            postsToFilter = postsToFilter.filter(post => (post.tags || []).includes(selectedCategory));
        }

        if (searchQuery) {
            postsToFilter = postsToFilter.filter(post => 
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        return postsToFilter;
    }, [initialPosts, selectedCategory, searchQuery]);

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

            {filteredPosts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map(post => (
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
