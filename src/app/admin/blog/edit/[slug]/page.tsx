
import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { PostForm } from '../../_components/PostForm';

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
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
                    Upraviť článok
                </h1>
                <p className="text-lg text-brand-secondary-grey dark:text-slate-300 mt-2">
                    Aktualizujte obsah a nastavenia existujúceho článku.
                </p>
            </header>
             <div className="bg-brand-bg dark:bg-brand-dark-teal/50 p-8 rounded-xl shadow-large">
                <PostForm post={post} />
            </div>
        </div>
    );
}
