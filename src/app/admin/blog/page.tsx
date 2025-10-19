
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/api';
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Správa článkov | Admin Panel | VI&MO',
  robots: {
    index: false,
    follow: false,
  }
};

const PostRow = ({ post }: { post: Post }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-brand-light-gray dark:bg-brand-dark-teal/80 p-4 rounded-lg shadow-subtle mb-4">
        <div className="md:col-span-2">
            <h3 className="font-bold text-lg text-brand-dark-teal dark:text-brand-bg">{post.title}</h3>
            <p className="text-sm text-brand-secondary-grey dark:text-slate-400">
                Vytvorené: {format(new Date(post.createdAt), 'd. M. yyyy HH:mm')}
            </p>
        </div>
        <div className="flex items-center gap-2">
             <span className={cn(
                "px-3 py-1 text-xs font-bold rounded-full text-white",
                post.status === 'published' ? 'bg-green-600' : 'bg-yellow-600'
             )}>
                {post.status === 'published' ? 'Publikovaný' : 'Koncept'}
            </span>
        </div>
        <div className="flex items-center justify-start md:justify-end gap-2">
            <Link href={`/admin/blog/edit/${post.slug}`} className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" aria-label="Upraviť článok">
                <Edit size={18} />
            </Link>
             <button className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors" aria-label="Zmazať článok">
                <Trash2 size={18} />
            </button>
        </div>
    </div>
);


export default async function AdminBlogPage() {
    const posts = await getAllPosts();

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <header className="flex flex-col md:flex-row justify-between items-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green text-center md:text-left">
                    Správa článkov
                </h1>
                <Link 
                    href="/admin/blog/new"
                    className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md"
                >
                    <PlusCircle size={20} />
                    Vytvoriť nový článok
                </Link>
            </header>

            <div className="bg-brand-bg dark:bg-brand-dark-teal/50 p-6 rounded-xl shadow-large">
                {posts && posts.length > 0 ? (
                    <div>
                        {posts.map(post => (
                            <PostRow key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-bold text-brand-dark-teal dark:text-brand-bg mb-2">Žiadne články</h2>
                        <p className="text-brand-secondary-grey dark:text-slate-300">Zatiaľ ste nevytvorili žiadne články. Kliknite na tlačidlo vyššie a začnite.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

    