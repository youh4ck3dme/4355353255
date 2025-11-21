import { Metadata } from 'next';
import { PostForm } from '../_components/PostForm';
import { PlusSquare } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export const metadata: Metadata = {
  title: 'Nový článok | Admin Panel | VI&MO',
  robots: {
    index: false,
    follow: false,
  }
};

export default function NewPostPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
       <header className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <PlusSquare className="h-10 w-10 text-brand-bright-green"/>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white text-shadow-3d">
                Vytvoriť nový článok
            </h1>
          </div>
          <p className="text-lg text-slate-300 mt-2">
              Vyplňte formulár a uložte článok ako koncept alebo ho rovno publikujte.
          </p>
      </header>
      <GlassCard>
        <div className="p-8">
            <PostForm />
        </div>
      </GlassCard>
    </div>
  );
}
