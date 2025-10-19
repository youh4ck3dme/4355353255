'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Post } from '@/lib/types';
import { createPost, updatePost } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Save, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [submitAction, setSubmitAction] = useState<'draft' | 'published'>('draft');

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
    
    const postData = {
      ...data,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      status: submitAction,
    };
    
    try {
      let result;
      if (post) {
        result = await updatePost(post.slug, postData);
      } else {
        result = await createPost(postData);
      }

      if (result) {
        toast({
          variant: 'success',
          title: `Článok ${post ? 'uložený' : 'vytvorený'}!`,
          description: `Článok "${result.title}" bol úspešne ${post ? 'aktualizovaný' : 'vytvorený'}.`,
        });
        // Wait for revalidation then navigate
        setTimeout(() => router.push('/admin/blog'), 1000); 
        router.refresh();
      } else {
        throw new Error('Nepodarilo sa uložiť článok.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Chyba',
        description: `Vyskytla sa chyba pri ukladaní článku. Skúste to znova.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Titulok *</label>
        <input {...register('title')} id="title" className={cn("w-full p-3 rounded-lg bg-brand-light-gray dark:bg-brand-dark-teal border-2", errors.title ? "border-red-500" : "border-slate-300 dark:border-slate-600")} />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Obsah (HTML & SEO bloky)</label>
        <textarea {...register('content')} id="content" rows={15} className="w-full p-3 rounded-lg bg-brand-light-gray dark:bg-brand-dark-teal border-2 border-slate-300 dark:border-slate-600 font-mono text-sm" placeholder='<p>Váš text...</p> \n\n<div data-seo-meta="description">Vlastný SEO popis.</div> \n\n<h2>FAQ</h2> \n<h3>Otázka?</h3><p>Odpoveď.</p>' />
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
        <p className="text-sm text-brand-secondary-grey dark:text-slate-400">{post ? `Naposledy upravené: ${format(new Date(post.updatedAt), 'd.M.yyyy HH:mm')}` : "Nový článok"}</p>
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
                <span>{post?.status === 'published' ? 'Aktualizovať a publikovať' : 'Publikovať'}</span>
            </button>
        </div>
      </div>
    </form>
  );
};
