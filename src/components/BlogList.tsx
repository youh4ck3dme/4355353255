'use client';

import { useState, useMemo, useEffect } from 'react';
import { Post } from '@/lib/types';
import { BlogCard } from './BlogCard';
import { cn } from '@/lib/utils';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const ALL_CATEGORIES = ['Tipy na sťahovanie', 'Upratovanie', 'Novinky', 'Vypratávanie'];

export const BlogList = ({ initialPosts, initialCategory }: { initialPosts: Post[], initialCategory?: string }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);

    useEffect(() => {
        // Sync state with URL params on initial load or when URL changes
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
            setSelectedCategory(category);
        } else {
            current.delete('category');
            setSelectedCategory(null);
        }
        
        const search = current.toString();
        const query = search ? `?${search}` : "";

        router.push(`${pathname}${query}`);
    };

    const filteredPosts = useMemo(() => {
        return initialPosts.filter(post => {
            const matchesCategory = selectedCategory ? (post.tags || []).includes(selectedCategory) : true;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [initialPosts, selectedCategory, searchQuery]);

    return (
        <div>
            <div className="mb-8 max-w-2xl mx-auto flex flex-col items-center gap-4">
                 <div className="flex flex-wrap justify-center gap-2">
                    <button 
                        onClick={() => handleCategoryClick(null)}
                        className={cn(
                            "px-4 py-2 text-sm font-bold rounded-full transition-colors",
                            !selectedCategory ? 'bg-brand-bright-green text-brand-dark-teal' : 'bg-brand-light-gray dark:bg-brand-dark-teal/80 dark:text-brand-bg hover:bg-brand-bright-green/50'
                        )}
                    >
                        Všetky
                    </button>
                    {ALL_CATEGORIES.map(category => (
                        <button 
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={cn(
                                "px-4 py-2 text-sm font-bold rounded-full transition-colors",
                                selectedCategory === category ? 'bg-brand-bright-green text-brand-dark-teal' : 'bg-brand-light-gray dark:bg-brand-dark-teal/80 dark:text-brand-bg hover:bg-brand-bright-green/50'
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
                    className="w-full max-w-lg p-3 border-2 border-brand-secondary-grey/20 rounded-lg focus:border-brand-bright-green 
                               focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors 
                               bg-brand-bg dark:bg-brand-dark-teal dark:text-brand-bg dark:placeholder-brand-secondary-grey"
                    aria-label="Vyhľadávanie článkov"
                />
            </div>

            {filteredPosts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-xl text-center text-brand-secondary-grey py-16">
                    Žiadne výsledky pre '{searchQuery || selectedCategory}'. Skúste iný filter alebo kľúčové slovo.
                </p>
            )}
        </div>
    );
};