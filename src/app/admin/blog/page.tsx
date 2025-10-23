
'use client';

import Link from 'next/link';
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PlusCircle, Edit, Loader2, Newspaper, Info } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import GlassCard from '@/components/GlassCard';
import { useCollection, useFirebase } from '@/firebase';
import { collection, Query } from 'firebase/firestore';
import { useMemo } from 'react';

const PostRow = ({ post }: { post: Post }) => {
    return (
        <GlassCard className="mb-4" isPadded={false}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4">
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
        </GlassCard>
    );
};


export default function AdminBlogPage() {
    // useFirebase now guarantees that firestore is available because the provider handles the loading state.
    const { firestore } = useFirebase();
    const { toast } = useToast();

    // The query is only created when firestore is available. `useMemo` ensures it's not recreated on every render.
    const postsCollectionQuery = useMemo((): Query | null => {
        // This check is now a safeguard, but the provider should prevent this component
        // from rendering until firestore is ready.
        if (!firestore) return null;
        return collection(firestore, 'blogPosts');
    }, [firestore]);
    
    // The useCollection hook is now robust enough to handle an initially null query.
    const { data: posts, isLoading, error } = useCollection<Post>(postsCollectionQuery);

    if (error) {
        console.error("Failed to fetch posts:", error);
        toast({
            variant: 'destructive',
            title: 'Chyba pri načítaní článkov',
            description: 'Nepodarilo sa načítať zoznam článkov z databázy.',
        });
    }

    const sortedPosts = useMemo(() => {
        if (!posts) return [];
        return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [posts]);
    
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
                        Prehľad článkov uložených v databáze Firestore.
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
                 <div className="p-6">
                    {isLoading ? (
                        <div className="text-center py-16">
                            <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-bright-green" />
                            <p className="mt-4 text-slate-300">Načítavam články z databázy...</p>
                        </div>
                    ) : sortedPosts.length > 0 ? (
                        <div>
                            {sortedPosts.map(post => (
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
