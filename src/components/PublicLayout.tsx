
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from '@/lib/firebase-config';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const DynamicInstallPrompt = dynamic(() => import('@/components/InstallPrompt'), { ssr: false });

// --- Firebase Context ---
interface FirebaseContextValue {
  app: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null);

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};

// --- Fullscreen Loader ---
const FullscreenLoader = () => (
    <div className="fixed inset-0 bg-brand-dark-teal flex flex-col items-center justify-center z-[200]">
        <Loader2 className="h-16 w-16 animate-spin text-brand-bright-green mb-4" />
        <p className="text-white text-lg">Pripájam sa k službám...</p>
    </div>
);


export function PublicLayout({ children }: { children: ReactNode }) {
  const [firebaseContext, setFirebaseContext] = useState<FirebaseContextValue | null>(null);

  useEffect(() => {
    // Initialize Firebase and set the context
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    setFirebaseContext({ app, firestore, auth });
  }, []);

  if (!firebaseContext) {
    return <FullscreenLoader />;
  }

  return (
    <FirebaseContext.Provider value={firebaseContext}>
      <Header />
      <main id="main-content" className="flex-grow">
          {children}
      </main>
      <Footer />
      <DynamicInstallPrompt />
    </FirebaseContext.Provider>
  );
}
