'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-grow bg-brand-bg dark:bg-brand-dark-teal">
        {children}
      </main>
      <Footer />
    </div>
  );
}
