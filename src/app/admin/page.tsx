import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Panel | VI&MO',
  robots: {
    index: false,
    follow: false,
  }
};

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-brand-dark-teal dark:text-brand-bright-green">
        Admin Panel
      </h1>
      <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-brand-dark-teal dark:text-brand-bg">Vitajte v administrácii</h2>
        <p className="text-brand-secondary-grey dark:text-slate-300 mb-6">
          Toto je hlavný panel pre správu obsahu vašej webovej stránky.
        </p>
        <div className="flex justify-center gap-4">
            <Link 
                href="/admin/blog"
                className="inline-block px-6 py-3 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md"
            >
                Spravovať články
            </Link>
        </div>
      </div>
    </div>
  );
}
