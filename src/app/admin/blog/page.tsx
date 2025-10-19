'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
// import { getAllPosts, deletePost } from '@/lib/api'; // Temporarily disabled
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PlusCircle, Edit, Trash2, Loader2, RefreshCw, Newspaper } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";


const PostRow = ({ post, onDelete }: { post: Post, onDelete: (slug: string) => void }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const { toast } = useToast();

    const handleDelete = async () => {
        alert("Mazanie je pre statický blog dočasne deaktivované.");
        return;
        // if (confirm(`Naozaj chcete zmazať článok "${post.title}"?`)) {
        //     setIsDeleting(true);
        //     const success = await deletePost(post.slug);
        //     if (success) {
        //         toast({ variant: 'success', title: "Článok zmazaný", description: "Článok bol úspešne odstránený." });
        //         onDelete(post.slug);
        //     } else {
        //         toast({ variant: 'destructive', title: "Chyba", description: "Článok sa nepodarilo zmazať." });
        //     }
        //     setIsDeleting(false);
        // }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-brand-light-gray dark:bg-brand-dark-teal/80 p-4 rounded-lg shadow-subtle mb-4">
            <div className="md:col-span-2">
                <h3 className="font-bold text-lg text-brand-dark-teal dark:text-brand-bg">{post.title}</h3>
                <p className="text-sm text-brand-secondary-grey dark:text-slate-400">
                    Vytvorené: {format(new Date(post.date), 'd. M. yyyy HH:mm')}
                </p>
            </div>
            <div className="flex items-center gap-2">
                {/* <span className={cn(
                    "px-3 py-1 text-xs font-bold rounded-full text-white",
                    post.status === 'published' ? 'bg-green-600' : 'bg-yellow-600'
                )}>
                    {post.status === 'published' ? 'Publikovaný' : 'Koncept'}
                </span> */}
            </div>
            <div className="flex items-center justify-start md:justify-end gap-2">
                <p className="text-sm text-gray-500 italic">Statický</p>
                {/* <Link href={`/admin/blog/edit/${post.slug}`} className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" aria-label="Upraviť článok">
                    <Edit size={18} />
                </Link>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Zmazať článok"
                >
                    {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                </button> */}
            </div>
        </div>
    );
};


export default function AdminBlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        toast({ title: 'Info', description: 'Správa blogu je v režime čítania. Obsah sa upravuje priamo v MDX súboroch.' });
        // const fetchedPosts = await getAllPosts();
        // setPosts(fetchedPosts);
        setPosts([]); // Set to empty as we are not fetching
        setIsLoading(false);
    }, [toast]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleRefresh = () => {
        fetchPosts();
    };

    const handlePostDeleted = (deletedSlug: string) => {
        setPosts(prevPosts => prevPosts.filter(p => p.slug !== deletedSlug));
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
                        Prehľad staticky generovaných článkov. Úprava prebieha priamo v kóde.
                    </p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <button onClick={handleRefresh} disabled={isLoading} className="p-3 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-wait" aria-label="Obnoviť zoznam">
                        <RefreshCw size={20} className={cn(isLoading && "animate-spin")} />
                    </button>
                    <div className="relative">
                        <span className="absolute -top-2 -right-2 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
                        </span>
                        <button
                            disabled
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-400 text-white font-bold rounded-lg transition-colors duration-300 shadow-md cursor-not-allowed"
                            aria-label="Vytvorenie nového článku je deaktivované"
                        >
                            <PlusCircle size={20} />
                            Vytvoriť nový článok
                        </button>
                    </div>
                </div>
            </header>

            <div className="bg-brand-bg dark:bg-brand-dark-teal/50 p-6 rounded-xl shadow-large">
                {isLoading ? (
                    <div className="text-center py-16">
                        <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-dark-teal dark:text-brand-bright-green" />
                        <p className="mt-4 text-brand-secondary-grey dark:text-slate-300">Načítavam články...</p>
                    </div>
                ) : posts.length > 0 ? (
                    <div>
                        {posts.map(post => (
                            <PostRow key={post.id} post={post} onDelete={handlePostDeleted} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-bold text-brand-dark-teal dark:text-brand-bg mb-2">Statický Blog</h2>
                        <p className="text-brand-secondary-grey dark:text-slate-300">Zoznam článkov je teraz generovaný staticky. Pre úpravu alebo pridanie nového článku, prosím, upravte MDX súbory v priečinku `src/content/blog`.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
