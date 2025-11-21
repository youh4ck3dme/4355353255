'use client';

import Link from 'next/link';
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PlusCircle, Edit, Loader2, Newspaper, Info, ShieldAlert } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { useState, useEffect, useMemo } from 'react';
import { useFirebase } from '@/firebase/provider';
import { collection, query, orderBy, onSnapshot, Query, DocumentData } from 'firebase/firestore';


const PostRow = ({ post }: { post: Post }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors">
            <div className="md:col-span-3">
                <h3 className="font-bold text-lg text-white">{post.title}</h3>
                <p className="text-sm text-slate-400">
                    Dátum: {format(new Date(post.date), 'd. M. yyyy')} | Slug: <code className="text-xs bg-white/10 p-1 rounded">{post.slug}</code>
                </p>
            </div>
            <div className="flex items-center justify-start md:justify-end gap-2">
                <span className={cn(
                    "px-3 py-1 text-xs font-bold rounded-full text-black",
                    post.status === 'published' ? 'bg-green-400' : 'bg-yellow-400'
                )}>
                    {post.status === 'published' ? 'Publikovaný' : 'Koncept'}
                </span>
                <Link href={`/admin/blog/edit/${post.slug}`} className="p-2 text-blue-400 hover:text-blue-300 transition-colors" aria-label="Upraviť článok">
                    <Edit size={18} />
                </Link>
            </div>
        </div>
    );
};


export default function AdminBlogPage() {
    const { firestore, isLoading: isFirebaseLoading } = useFirebase();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const postsQuery: Query<DocumentData> | null = useMemo(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'blogPosts'), orderBy('date', 'desc'));
    }, [firestore]);


    useEffect(() => {
        if (!postsQuery) {
            if(!isFirebaseLoading) setIsLoadingPosts(false);
            return;
        };

        setIsLoadingPosts(true);
        const unsubscribe = onSnapshot(
            postsQuery,
            (snapshot) => {
                const results: Post[] = snapshot.docs.map((doc) => ({
                    ...(doc.data() as Omit<Post, 'slug'>),
                    slug: doc.id,
                }));
                setPosts(results);
                setIsLoadingPosts(false);
            },
            (err) => {
                console.error("Error fetching live blog posts:", err);
                setError(err);
                setIsLoadingPosts(false);
            }
        );

        return () => unsubscribe();
    }, [postsQuery, isFirebaseLoading]);
    
    const isLoading = isFirebaseLoading || isLoadingPosts;

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <header className="flex flex-col md:flex-row justify-between items-start mb-10">
                <div>
                     <div className="flex items-center gap-4 mb-2">
                        <Newspaper className="h-10 w-10 text-brand-bright-green"/>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-shadow-3d">
                            Správa článkov
                        </h1>
                    </div>
                    <p className="text-lg text-slate-300 mt-2">
                        Prehľad všetkých článkov (publikovaných aj konceptov).
                    </p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <Link href="/admin/blog/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md"
                        aria-label="Vytvoriť nový článok"
                    >
                        <PlusCircle size={20} />
                        Vytvoriť nový článok
                    </Link>
                </div>
            </header>
            
            <GlassCard isPadded={false}>
                <div className="bg-blue-900/30 border-l-4 border-blue-400 text-blue-200 p-4 rounded-t-2xl flex gap-3">
                    <Info className="h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold">Dynamický blogový systém</h3>
                        <p className="text-sm">Tento blog je načítavaný priamo z Firestore databázy. Akákoľvek zmena sa prejaví v reálnom čase.</p>
                    </div>
                </div>
                 <div className="p-2 sm:p-6">
                    {isLoading ? (
                        <div className="text-center py-16">
                            <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-bright-green" />
                            <p className="mt-4 text-slate-300">Načítavam články z databázy...</p>
                        </div>
                    ) : error ? (
                         <div className="text-center py-16 text-red-400 bg-red-900/20 rounded-lg">
                            <ShieldAlert className="mx-auto h-12 w-12 mb-4" />
                            <h2 className="text-2xl font-bold mb-2">Chyba pri načítaní</h2>
                            <p className="font-mono text-xs">{error.message}</p>
                        </div>
                    ) : posts && posts.length > 0 ? (
                        <div>
                            {posts.map(post => (
                                <PostRow key={post.slug} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-bold text-white mb-2">Žiadne články</h2>
                            <p className="text-slate-300">V databáze sa zatiaľ nenachádzajú žiadne články.</p>
                        </div>
                    )}
                 </div>
            </GlassCard>
        </div>
    );
}
