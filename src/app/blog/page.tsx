import { BlogList } from '@/components/BlogList';
import { getPublishedPosts } from '@/lib/api';

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bg">Všetky články</h1>
        <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray">
          Prehľadajte naše tipy, triky a novinky.
        </p>
      </div>
      <BlogList initialPosts={posts} />
    </div>
  );
}
