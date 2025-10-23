
'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { Auth } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

interface FirebaseServices {
    firebaseApp: FirebaseApp | null;
    auth: Auth | null;
    firestore: Firestore | null;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo((): FirebaseServices => {
    // Initialize Firebase on the client side, once per component mount.
    // This can return null if initialization fails, which provider will handle.
    try {
        const { firebaseApp, auth, firestore } = initializeFirebase();
        return { firebaseApp, auth, firestore };
    } catch(e) {
        console.error("Firebase initialization failed:", e);
        return { firebaseApp: null, auth: null, firestore: null };
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
