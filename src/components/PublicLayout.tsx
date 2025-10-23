

'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import dynamic from 'next/dynamic';

const DynamicInstallPrompt = dynamic(() => import('@/components/InstallPrompt'), { ssr: false });

export function PublicLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow">
          {children}
      </main>
      <Footer />
      <DynamicInstallPrompt />
    </>
  );
}
