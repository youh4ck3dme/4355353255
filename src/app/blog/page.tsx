import { BlogList } from '@/components/BlogList';
import { getPublishedPosts } from '@/lib/api';
import { Post } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

const FeaturedPostCard = ({ post }: { post: Post }) => (
  <section className="mb-12">
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="relative bg-brand-dark-teal/90 rounded-xl overflow-hidden shadow-2xl p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">
        {post.imageUrl && (
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <Image 
              src={post.imageUrl} 
              alt={post.title} 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="flex flex-col text-center md:text-left">
          <p className="text-sm font-semibold text-brand-bright-green mb-2">Najnovší článok</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-brand-bg mb-4 line-clamp-3 group-hover:text-brand-bright-green transition-colors">
            {post.title}
          </h2>
          {post.content && (
            <p className="text-slate-300 line-clamp-3 mb-4 hidden sm:block">
              {post.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
            </p>
          )}
          <div className="flex items-center text-xs text-slate-400 mt-auto pt-4 border-t border-slate-700 justify-center md:justify-start">
            <span>{post.author || 'VI&MO Team'}</span>
            <span className="mx-2">|</span>
            <span>{format(new Date(post.createdAt), 'd. M. yyyy')}</span>
          </div>
        </div>
      </div>
    </Link>
  </section>
);

export default async function BlogIndexPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined }}) {
  const posts = await getPublishedPosts();
  const featuredPost = posts[0] ?? null;
  const otherPosts = posts.slice(1);

  const initialCategory = typeof searchParams?.category === 'string' ? searchParams.category : undefined;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bg">Všetky články</h1>
        <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray">
          Prehľadajte naše tipy, triky a novinky.
        </p>
      </div>

      {featuredPost && <FeaturedPostCard post={featuredPost} />}

      {otherPosts.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-12 mb-6 text-center text-brand-dark-teal dark:text-brand-bg text-shadow-3d-green">
            Ďalšie články
          </h2>
          <BlogList initialPosts={otherPosts} initialCategory={initialCategory} />
        </>
      )}

      {posts.length === 1 && (
        <p className="text-center text-brand-secondary-grey py-16">
          Zatiaľ tu máme len jeden článok. Ďalšie čoskoro pribudnú!
        </p>
      )}
      
      {posts.length === 0 && (
         <p className="text-center text-brand-secondary-grey py-16">
          Momentálne tu nie sú žiadne články.
        </p>
      )}
    </div>
  );
}
