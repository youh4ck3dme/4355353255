'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { app, auth, firestore } from '@/lib/firebase-client';
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

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-brand-dark-teal">
        <Loader2 className="h-12 w-12 animate-spin text-brand-bright-green" />
      </div>
    )
  }

  return (
    <FirebaseContext.Provider value={value}>
      {children}
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
