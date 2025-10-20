
import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { PostForm } from '../../_components/PostForm';
import { FilePen } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

type EditPostPageProps = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: EditPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  return {
    title: `Upraviť: ${post?.title || 'Článok'} | Admin Panel | VI&MO`,
    robots: {
      index: false,
      follow: false,
    }
  }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <header className="mb-10">
                 <div className="flex items-center gap-4 mb-4">
                    <FilePen className="h-10 w-10 text-brand-bright-green"/>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white text-shadow-3d">
                        Upraviť článok
                    </h1>
                </div>
                <p className="text-lg text-slate-300 mt-2">
                    Aktualizujte obsah a nastavenia existujúceho článku.
                </p>
            </header>
             <GlassCard>
                <div className="p-8">
                    <PostForm post={post} />
                </div>
            </GlassCard>
        </div>
    );
}
