
import { BlogList } from '@/components/BlogList';
import { Post } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Metadata } from 'next';
import { getPublishedPosts } from '@/lib/mdx';


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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bg">Tipy, triky a novinky</h1>
        <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray">
          Články zo sveta sťahovania, upratovania a logistiky.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-center text-brand-dark-teal dark:text-brand-bg text-shadow-3d-green">
        Všetky články
      </h2>
      <BlogList initialCategory={initialCategory} />
    </div>
  );
}
