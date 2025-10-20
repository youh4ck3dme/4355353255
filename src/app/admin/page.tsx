import { Metadata } from 'next';
import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

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
      <div className="flex items-center justify-center gap-4 mb-8">
          <LayoutDashboard className="h-10 w-10 text-brand-bright-green" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white text-shadow-3d">
            Admin Panel
          </h1>
      </div>
      <GlassCard>
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Vitajte v administrácii</h2>
            <p className="text-slate-300 mb-6">
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
      </GlassCard>
    </div>
  );
}
