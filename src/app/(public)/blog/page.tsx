
import { BlogList } from '@/components/BlogList';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Blog o sťahovaní a upratovaní v Bratislave | Tipy a triky | VI&MO',
  description: 'Prehľadajte naše tipy, triky a novinky zo sveta sťahovania a upratovania. Nájdite rady od profesionálov a uľahčite si prácu.',
  alternates: {
      canonical: '/blog',
  }
};


export default function BlogIndexPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined }}) {
  const initialCategory = typeof searchParams?.category === 'string' ? searchParams.category : undefined;

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
       <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white text-shadow-3d">Tipy, triky a novinky</h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Články zo sveta sťahovania, upratovania a logistiky. Nájdite rady od profesionálov a uľahčite si prácu s našimi praktickými návodmi.
        </p>
      </div>

      <BlogList initialCategory={initialCategory} />
    </div>
  );
}
