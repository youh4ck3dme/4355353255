

'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import dynamic from 'next/dynamic';

const DynamicInstallPrompt = dynamic(() => import('@/components/InstallPrompt'), { ssr: false });

export function PublicLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="bg-background text-foreground">
        <div className="liquid-glass-background">
            <div className="bg-orbs">
                <div className="orb"></div>
                <div className="orb"></div>
                <div className="orb"></div>
            </div>
        </div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main id="main-content" className="flex-grow">
              {children}
          </main>
          <Footer />
          <DynamicInstallPrompt />
        </div>
    </div>
  );
}
