'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { initiateAnonymousSignIn } from './non-blocking-login';
import { Loader2 } from 'lucide-react';
import { PublicLayout } from '@/components/PublicLayout';
import { firebaseApp, auth, firestore } from '@/firebase'; // Import initialized services

interface FirebaseProviderProps {
  children: ReactNode;
}

// Combined state for the Firebase context
export interface FirebaseContextState {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  // User authentication state
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// Return type for useFirebase() hook
export interface FirebaseServicesAndUser {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// React Context
export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);


const FullscreenLoader = ({ message }: { message: string }) => (
    <PublicLayout>
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-bright-green" />
                <p className="mt-4 text-slate-300">{message}</p>
            </div>
        </div>
    </PublicLayout>
);


/**
 * FirebaseProvider manages and provides Firebase services and user authentication state.
 * It ensures that children components are only rendered after a user (anonymous or otherwise) is authenticated.
 */
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const [userAuthState, setUserAuthState] = useState<{
    user: User | null;
    isUserLoading: boolean;
    userError: Error | null;
  }>({
    user: null,
    isUserLoading: true, // Start in loading state
    userError: null,
  });


  // Effect to subscribe to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
            // User is signed in (could be anonymous)
            setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
        } else {
            // No user, initiate anonymous sign-in
            // The listener will be called again with the new user state.
            initiateAnonymousSignIn(auth);
        }
      },
      (error) => {
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const contextValue = useMemo((): FirebaseContextState => ({
      firebaseApp,
      firestore,
      auth,
      user: userAuthState.user,
      isUserLoading: userAuthState.isUserLoading,
      userError: userAuthState.userError,
  }), [userAuthState]);

  // This is the core of the fix:
  // Render a loader if the initial user authentication process (including anonymous sign-in) is not yet complete.
  // This guarantees that any child component will have access to a valid `user` object.
  if (userAuthState.isUserLoading) {
      return <FullscreenLoader message="Pripájam sa k službám..." />;
  }
  
  // Once everything is ready, render the children within the provider.
  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};


/**
 * Hook to access core Firebase services and user authentication state.
 * Throws error if used outside provider.
 */
export const useFirebase = (): FirebaseServicesAndUser => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }
  
  return context;
};

/** Hook to access Firebase Auth instance. */
export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  return auth;
};

/** Hook to access Firestore instance. */
export const useFirestore = (): Firestore => {
  const { firestore } = useFirebase();
  return firestore;
};

/** Hook to access Firebase App instance. */
export const useFirebaseApp = (): FirebaseApp => {
  const { firebaseApp } = useFirebase();
  return firebaseApp;
};

/**
 * Hook specifically for accessing the authenticated user's state.
 * @returns {UserHookResult} Object with user, isUserLoading, userError.
 */
export interface UserHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}
export const useUser = (): UserHookResult => {
  const { user, isUserLoading, userError } = useFirebase();
  return { user, isUserLoading, userError };
};
