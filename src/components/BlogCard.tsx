import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/types';
import { format } from 'date-fns';

interface BlogCardProps {
  post: Post;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full group">
      <div className="bg-brand-light-gray dark:bg-brand-dark-teal/90 rounded-xl overflow-hidden shadow-subtle group-hover:shadow-medium transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col">
        {post.imageUrl && (
            <div className="relative w-full h-48 overflow-hidden">
                 <Image 
                    src={post.imageUrl} 
                    alt={post.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    priority
                />
            </div>
        )}
        <div className="p-6 flex-grow flex flex-col">
          <h2 className="text-xl font-bold mb-3 text-brand-text dark:text-brand-bg line-clamp-2 group-hover:text-brand-bright-green">
            {post.title}
          </h2>
          <div className="flex justify-between items-center text-xs text-brand-secondary-grey dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-700 mt-auto">
            <span>{post.author || 'VI&MO Team'}</span>
            <span>{format(new Date(post.createdAt), 'd. M. yyyy')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
