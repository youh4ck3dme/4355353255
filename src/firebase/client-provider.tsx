
'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

// This hook initializes Firebase on the client side and ensures it's a singleton.
function useFirebaseClient() {
  const firebaseServices = useMemo(() => {
    return initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount
  return firebaseServices;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const { firebaseApp, auth, firestore } = useFirebaseClient();

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
