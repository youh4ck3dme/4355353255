
'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FirebaseProvider } from '@/firebase/provider';


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main id="main-content" className="flex-grow bg-brand-bg dark:bg-brand-dark-teal">
            {children}
          </main>
          <Footer />
        </div>
    </FirebaseProvider>
  );
}
