
'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { app, auth as authInstance, firestore as firestoreInstance } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

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
    const unsubscribe = onAuthStateChanged(authInstance, async (currentUser) => {
      // If user is already signed in, we are good
      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
      } else {
        // If no user, try to sign in anonymously. Show loader until this is done.
        try {
          const userCredential = await signInAnonymously(authInstance);
          setUser(userCredential.user);
        } catch (error) {
          console.error("Anonymous sign-in failed:", error);
          // Even on failure, we stop loading to not block the app forever
        } finally {
            setIsLoading(false);
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = { app, firestore: firestoreInstance, auth: authInstance, user, isLoading };

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
