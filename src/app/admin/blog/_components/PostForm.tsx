'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Post } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import slugify from 'slugify';
import { auth } from '@/lib/firebase';

const postSchema = z.object({
  title: z.string().min(3, 'Titulok musí mať aspoň 3 znaky.'),
  content: z.string().optional(),
  author: z.string().optional(),
  imageUrl: z.string().url('Zadajte platnú URL adresu obrázka.').optional().or(z.literal('')),
  tags: z.string().optional(),
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
    watch
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      author: post?.author || 'VI&MO Team',
      imageUrl: post?.imageUrl || '',
      tags: post?.tags?.join(', ') || '',
    },
  });
  
  const watchedTitle = watch("title");
  const slug = post?.slug || slugify(watchedTitle || '', { lower: true, strict: true });

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    setIsSubmitting(true);
    
    if (!auth.currentUser) {
        toast({
            variant: 'destructive',
            title: 'Chyba autorizácie',
            description: 'Musíte byť prihlásený, aby ste mohli uložiť článok. Skúste znova o chvíľu.',
        });
        setIsSubmitting(false);
        return;
    }

    const user = auth.currentUser;

    try {
        const idToken = await user.getIdToken();
        const payload = {
            slug: slug,
            title: data.title,
            content: data.content || '',
            author: data.author || 'VI&MO Team',
            imageUrl: data.imageUrl || '',
            tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
            status: submitAction,
        };

        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Nastala neznáma chyba na serveri.');
        }

        toast({
          variant: 'success',
          title: 'Úspešne uložené!',
          description: `Článok "${data.title}" bol uložený ako ${submitAction === 'published' ? 'publikovaný' : 'koncept'}.`,
        });
        
        router.push('/admin/blog');
        router.refresh();

    } catch (error) {
        console.error("Failed to save post:", error);
        toast({
            variant: 'destructive',
            title: 'Chyba pri ukladaní',
            description: (error as Error).message || 'Nepodarilo sa uložiť článok.',
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Titulok *</label>
        <input {...register('title')} id="title" className={cn("w-full p-3 rounded-lg bg-white/10 backdrop-blur-sm border-2 text-white", errors.title ? "border-red-500" : "border-white/20")} />
        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
        <p className="text-xs text-slate-400 mt-1">Slug: <code className="bg-white/10 p-1 rounded">{slug}</code></p>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-1">Obsah (HTML)</label>
        <textarea {...register('content')} id="content" rows={15} className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 font-mono text-sm text-white" placeholder='<p>Váš text...</p>' />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         <div>
          <label htmlFor="author" className="block text-sm font-medium text-slate-300 mb-1">Autor</label>
          <input {...register('author')} id="author" className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white" />
        </div>
         <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-300 mb-1">URL adresa obrázka</label>
          <input {...register('imageUrl')} id="imageUrl" placeholder="https://..." className={cn("w-full p-3 rounded-lg bg-white/10 backdrop-blur-sm border-2 text-white", errors.imageUrl ? "border-red-500" : "border-white/20")} />
           {errors.imageUrl && <p className="text-red-400 text-sm mt-1">{errors.imageUrl.message}</p>}
        </div>
      </div>

       <div>
          <label htmlFor="tags" className="block text-sm font-medium text-slate-300 mb-1">Tagy (oddelené čiarkou)</label>
          <input {...register('tags')} id="tags" placeholder="Tipy na sťahovanie, Novinky, ..." className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white" />
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6 border-t border-white/20">
        <div className="text-sm text-slate-400 mr-auto flex items-center gap-2">
          <span>Status:</span>
           <select 
             value={submitAction}
             onChange={(e) => setSubmitAction(e.target.value as 'draft' | 'published')}
             className="bg-white/10 p-2 rounded-md border-white/20 border"
           >
             <option value="draft">Koncept</option>
             <option value="published">Publikovaný</option>
           </select>
        </div>
        <div className="flex gap-4">
             <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-slate-500 text-white font-bold rounded-lg hover:bg-slate-600 transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-wait"
            >
                {isSubmitting ? <Loader2 className="animate-spin" size={20}/> : <Save size={20} />}
                <span>Uložiť</span>
            </button>
        </div>
      </div>
    </form>
  );
};
