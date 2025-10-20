
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Post } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Save, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const postSchema = z.object({
  title: z.string().min(3, 'Titulok musí mať aspoň 3 znaky.'),
  content: z.string().optional(),
  author: z.string().optional(),
  imageUrl: z.string().url('Zadajte platnú URL adresu obrázka.').optional().or(z.literal('')),
  tags: z.string().optional(),
  status: z.enum(['draft', 'published']),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  post?: Post;
}

export const PostForm = ({ post }: PostFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAction, setSubmitAction] = useState<'draft' | 'published'>(post?.status || 'draft');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      author: post?.author || 'VI&MO Team',
      imageUrl: post?.imageUrl || '',
      tags: post?.tags?.join(', ') || '',
      status: post?.status || 'draft',
    },
  });

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    setIsSubmitting(true);
    
    // This is a placeholder for the actual API call
    // In a real app, you would send this data to a serverless function
    // that creates/updates the MDX file.
    console.log('Submitting data to serverless function (placeholder):', {
      slug: post?.slug, // undefined for new posts
      ...data,
      status: submitAction,
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      variant: 'success',
      title: 'Simulácia úspešná!',
      description: `Článok "${data.title}" by bol ${post ? 'aktualizovaný' : 'vytvorený'}. (Toto je len ukážka)`,
    });
    
    // In a real app, you'd wait for revalidation before navigating
    router.push('/admin/blog');
    router.refresh();

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Titulok *</label>
        <input {...register('title')} id="title" className={cn("w-full p-3 rounded-lg bg-brand-light-gray dark:bg-brand-dark-teal border-2", errors.title ? "border-red-500" : "border-slate-300 dark:border-slate-600")} />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Obsah (MDX/HTML)</label>
        <textarea {...register('content')} id="content" rows={15} className="w-full p-3 rounded-lg bg-brand-light-gray dark:bg-brand-dark-teal border-2 border-slate-300 dark:border-slate-600 font-mono text-sm" placeholder='<p>Váš text...</p>' />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         <div>
          <label htmlFor="author" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Autor</label>
          <input {...register('author')} id="author" className="w-full p-3 rounded-lg bg-brand-light-gray dark:bg-brand-dark-teal border-2 border-slate-300 dark:border-slate-600" />
        </div>
         <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">URL adresa obrázka</label>
          <input {...register('imageUrl')} id="imageUrl" placeholder="https://..." className={cn("w-full p-3 rounded-lg bg-brand-light-gray dark:bg-brand-dark-teal border-2", errors.imageUrl ? "border-red-500" : "border-slate-300 dark:border-slate-600")} />
           {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
        </div>
      </div>

       <div>
          <label htmlFor="tags" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Tagy (oddelené čiarkou)</label>
          <input {...register('tags')} id="tags" placeholder="Tipy na sťahovanie, Novinky, ..." className="w-full p-3 rounded-lg bg-brand-light-gray dark:bg-brand-dark-teal border-2 border-slate-300 dark:border-slate-600" />
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm text-brand-secondary-grey dark:text-slate-400 mr-auto">
          {post ? `Stav: ` : "Nový článok"}
          {post && (
             <span className={cn(
                    "px-2 py-0.5 text-xs font-bold rounded-full text-white",
                    post.status === 'published' ? 'bg-green-600' : 'bg-yellow-600'
                )}>
                    {post.status === 'published' ? 'Publikovaný' : 'Koncept'}
              </span>
          )}
        </p>
        <div className="flex gap-4">
             <button
                type="submit"
                onClick={() => setSubmitAction('draft')}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-slate-500 text-white font-bold rounded-lg hover:bg-slate-600 transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-wait"
            >
                {isSubmitting && submitAction === 'draft' ? <Loader2 className="animate-spin" size={20}/> : <Save size={20} />}
                <span>Uložiť koncept</span>
            </button>
            <button
                type="submit"
                onClick={() => setSubmitAction('published')}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-wait"
            >
                {isSubmitting && submitAction === 'published' ? <Loader2 className="animate-spin" size={20}/> : <Send size={20} />}
                <span>{post?.status === 'published' ? 'Aktualizovať' : 'Publikovať'}</span>
            </button>
        </div>
      </div>
    </form>
  );
};
