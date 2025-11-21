
'use client';

import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FirebaseProvider, useFirebase } from '@/firebase/provider';
import { signInAnonymously } from 'firebase/auth';

function AuthHandler({ children }: { children: React.ReactNode }) {
  const { auth, user, isLoading } = useFirebase();

  useEffect(() => {
    // If Firebase isn't loading and there's no user, sign in anonymously.
    if (!isLoading && !user && auth) {
      signInAnonymously(auth).catch((error) => {
        console.error("Delayed anonymous sign-in failed:", error);
      });
    }
  }, [isLoading, user, auth]);

  return <>{children}</>;
}


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseProvider>
      <AuthHandler>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main id="main-content" className="flex-grow bg-brand-bg dark:bg-brand-dark-teal">
            {children}
          </main>
          <Footer />
        </div>
      </AuthHandler>
    </FirebaseProvider>
  );
}
