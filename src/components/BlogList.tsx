'use client';

import { useState } from 'react';
import { Post } from '@/lib/types';
import { BlogCard } from './BlogCard';

export const BlogList = ({ initialPosts }: { initialPosts: Post[] }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = initialPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="mb-8 max-w-lg mx-auto">
                <input
                    type="text"
                    placeholder="Hľadať v článkoch..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border-2 border-brand-secondary-grey/20 rounded-lg focus:border-brand-bright-green 
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
                    Žiadne výsledky pre '{searchQuery}'. Skúste iné kľúčové slovo.
                </p>
            )}
        </div>
    );
};
