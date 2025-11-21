
'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { app, auth, firestore } from '@/lib/firebase-client';

// Define the shape of the context
interface FirebaseContextType {
  app: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
  user: User | null;
  isLoading: boolean;
}

// Create the context with a default value
const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  firestore: null,
  auth: null,
  user: null,
  isLoading: true,
});

// Fullscreen loader component
const FullscreenLoader = () => (
  <div className="fixed inset-0 bg-brand-dark-teal flex flex-col items-center justify-center z-[200]">
    <Loader2 className="h-16 w-16 animate-spin text-brand-bright-green mb-4" />
    <p className="text-white text-lg">Pripájam sa k službám...</p>
  </div>
);

// The provider component
export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up the auth state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    }, (error) => {
      console.error("Auth state listener error:", error);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = { app, firestore, auth, user, isLoading };

  return (
    <FirebaseContext.Provider value={value}>
      {isLoading ? <FullscreenLoader /> : children}
    </FirebaseContext.Provider>
  );
};

// Custom hook to use the Firebase context
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
