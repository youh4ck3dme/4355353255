

'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import dynamic from 'next/dynamic';

const DynamicInstallPrompt = dynamic(() => import('@/components/InstallPrompt'), { ssr: false });

export function PublicLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="bg-background text-foreground dark:bg-brand-dark-teal flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-grow">
          {children}
      </main>
      <Footer />
      <DynamicInstallPrompt />
    </div>
  );
}
