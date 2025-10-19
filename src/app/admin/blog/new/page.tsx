
import { Metadata } from 'next';
import { PostForm } from '../_components/PostForm';

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
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
              Vytvoriť nový článok
          </h1>
          <p className="text-lg text-brand-secondary-grey dark:text-slate-300 mt-2">
              Vyplňte formulár a uložte článok ako koncept alebo ho rovno publikujte.
          </p>
      </header>
      <div className="bg-brand-bg dark:bg-brand-dark-teal/50 p-8 rounded-xl shadow-large">
        <PostForm />
      </div>
    </div>
  );
}
