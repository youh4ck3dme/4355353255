'use client';

import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import dynamic from 'next/dynamic';
import { FirebaseProvider } from '@/firebase/provider';
import { Toaster } from './ui/toaster';

const DynamicInstallPrompt = dynamic(() => import('@/components/InstallPrompt'), { ssr: false });

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseProvider>
      <Header />
      <main id="main-content" className="flex-grow bg-brand-bg dark:bg-brand-dark-teal">
          {children}
      </main>
      <Footer />
      <DynamicInstallPrompt />
      <Toaster />
    </FirebaseProvider>
  );
}
