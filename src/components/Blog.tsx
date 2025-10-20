
import { Post } from '@/lib/types';
import { BlogCard } from './BlogCard';
import Link from 'next/link';

interface BlogProps {
    posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
    if (!posts || posts.length === 0) {
        return null;
    }
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-shadow-3d">
                Z nášho Blogu
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                Tipy, triky a novinky zo sveta sťahovania, ktoré vám uľahčia život.
            </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
                <BlogCard key={post.slug} post={post} />
            ))}
        </div>
        
        <div className="mt-12 text-center">
            <Link href="/blog" className="glass-button inline-flex items-center px-8 py-4 font-bold rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Všetky články
            </Link>
        </div>
      </div>
    </section>
  );
}
