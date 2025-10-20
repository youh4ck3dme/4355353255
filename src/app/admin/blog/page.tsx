'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/mdx'; 
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PlusCircle, Edit, Loader2, RefreshCw, Newspaper, Info } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";


const PostRow = ({ post }: { post: Post }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-brand-light-gray dark:bg-brand-dark-teal/80 p-4 rounded-lg shadow-subtle mb-4">
            <div className="md:col-span-3">
                <h3 className="font-bold text-lg text-brand-dark-teal dark:text-brand-bg">{post.title}</h3>
                <p className="text-sm text-brand-secondary-grey dark:text-slate-400">
                    Dátum: {format(new Date(post.date), 'd. M. yyyy')} | Súbor: <code className="text-xs bg-slate-200 dark:bg-slate-700 p-1 rounded">{post.slug}.mdx</code>
                </p>
            </div>
            <div className="flex items-center justify-start md:justify-end gap-2">
                 <span className={cn(
                    "px-3 py-1 text-xs font-bold rounded-full text-white",
                    post.status === 'published' ? 'bg-green-600' : 'bg-yellow-600'
                )}>
                    {post.status === 'published' ? 'Publikovaný' : 'Koncept'}
                </span>
                <Link href={`/admin/blog/edit/${post.slug}`} className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" aria-label="Upraviť článok">
                    <Edit size={18} />
                </Link>
            </div>
        </div>
    );
};


export default function AdminBlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        const fetchedPosts = await getPublishedPosts();
        setPosts(fetchedPosts);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleRefresh = () => {
        fetchPosts();
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <header className="flex flex-col md:flex-row justify-between items-start mb-10">
                <div>
                     <div className="flex items-center gap-4 mb-2">
                        <Newspaper className="h-10 w-10 text-brand-bright-green"/>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
                            Správa článkov
                        </h1>
                    </div>
                    <p className="text-lg text-brand-secondary-grey dark:text-slate-300 mt-2">
                        Prehľad staticky generovaných článkov zo súborov v <code className="text-sm bg-slate-200 dark:bg-slate-700 p-1 rounded">src/content/blog</code>.
                    </p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <button onClick={handleRefresh} disabled={isLoading} className="p-3 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-wait" aria-label="Obnoviť zoznam">
                        <RefreshCw size={20} className={cn(isLoading && "animate-spin")} />
                    </button>
                    <Link href="/admin/blog/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md"
                        aria-label="Vytvoriť nový článok"
                    >
                        <PlusCircle size={20} />
                        Vytvoriť nový článok
                    </Link>
                </div>
            </header>
            
            <div className="bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 text-blue-800 dark:text-blue-200 p-4 rounded-r-lg mb-8 flex gap-3">
                <Info className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-bold">Statický blogový systém</h3>
                    <p className="text-sm">Tento blog je generovaný staticky z MDX súborov. Pre vytvorenie nového článku môžete použiť tlačidlo "Vytvoriť nový článok", ale pre pokročilé úpravy alebo zmazanie je potrebné editovať súbory priamo v priečinku <code className="text-xs bg-slate-200 dark:bg-slate-700 p-1 rounded">src/content/blog</code>.</p>
                </div>
            </div>

            <div className="bg-brand-bg dark:bg-brand-dark-teal/50 p-6 rounded-xl shadow-large">
                {isLoading ? (
                    <div className="text-center py-16">
                        <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-dark-teal dark:text-brand-bright-green" />
                        <p className="mt-4 text-brand-secondary-grey dark:text-slate-300">Načítavam články...</p>
                    </div>
                ) : posts.length > 0 ? (
                    <div>
                        {posts.map(post => (
                            <PostRow key={post.slug} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-bold text-brand-dark-teal dark:text-brand-bg mb-2">Žiadne články</h2>
                        <p className="text-brand-secondary-grey dark:text-slate-300">V priečinku <code className="text-sm bg-slate-200 dark:bg-slate-700 p-1 rounded">src/content/blog</code> sa nenachádzajú žiadne MDX súbory.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
