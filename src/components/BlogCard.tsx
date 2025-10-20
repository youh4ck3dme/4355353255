
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import GlassCard from './GlassCard';

interface BlogCardProps {
  post: Post;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full group">
      <GlassCard className="h-full flex flex-col overflow-hidden p-0">
        {post.imageUrl && (
            <div className="relative w-full h-48 overflow-hidden">
                 <Image 
                    src={post.imageUrl} 
                    alt={post.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
        )}
        <div className="p-6 flex-grow flex flex-col">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="bg-white/10 text-brand-bright-green text-xs font-bold px-2 py-1 rounded-full">
                      {tag}
                  </span>
                ))}
              </div>
            )}
          <h3 className="text-xl font-bold mb-3 text-white line-clamp-2 group-hover:text-brand-bright-green">
            {post.title}
          </h3>
          <div className="flex justify-between items-center text-xs text-slate-400 pt-4 border-t border-white/10 mt-auto">
            <span>{post.author || 'VI&MO Team'}</span>
            <span>{format(new Date(post.date), 'd. M. yyyy')}</span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
};
