
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { initiateAnonymousSignIn } from './non-blocking-login';
import { Loader2 } from 'lucide-react';
import { PublicLayout } from '@/components/PublicLayout';
import { initializeFirebase } from '@/firebase'; // Import initialize function

interface FirebaseProviderProps {
  children: ReactNode;
}

// Internal state for user authentication
interface UserAuthState {
  user: User | null;
  isUserLoading: boolean; // True only during the very initial auth check
  userError: Error | null;
}

// Combined state for the Firebase context
export interface FirebaseContextState {
  areServicesAvailable: boolean; // True if core services (app, firestore, auth instance) are provided
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
  // User authentication state
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// Return type for useFirebase() hook
export interface FirebaseServicesAndUser {
  areServicesAvailable: boolean;
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
 * It ensures that children components are only rendered after Firebase services are available
 * AND a user (anonymous or otherwise) is authenticated.
 */
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
    const { firebaseApp, auth, firestore } = useMemo(() => {
        try {
            return initializeFirebase();
        } catch (e) {
            console.error("Firebase initialization failed in provider:", e);
            return { firebaseApp: null, auth: null, firestore: null };
        }
    }, []);


  const [userAuthState, setUserAuthState] = useState<UserAuthState>({
    user: null,
    isUserLoading: true, // Start in loading state
    userError: null,
  });

  const areServicesAvailable = !!(firebaseApp && firestore && auth);

  // Effect to subscribe to Firebase auth state changes
  useEffect(() => {
    if (!auth) {
      setUserAuthState({ user: null, isUserLoading: false, userError: new Error("Auth service not available.") });
      return;
    }

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
  }, [auth]);

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const contextValue = useMemo((): FirebaseContextState => ({
      areServicesAvailable,
      firebaseApp,
      firestore,
      auth,
      user: userAuthState.user,
      isUserLoading: userAuthState.isUserLoading,
      userError: userAuthState.userError,
  }), [firebaseApp, firestore, auth, userAuthState, areServicesAvailable]);

  // This is the core of the fix:
  // Render a loader if either the core Firebase services are not yet available
  // OR the initial user authentication process (including anonymous sign-in) is not yet complete.
  // This guarantees that any child component will have access to a valid `firestore` and `user` object.
  if (!areServicesAvailable || userAuthState.isUserLoading) {
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
 * Throws error if core services are not available or used outside provider.
 */
export const useFirebase = (): FirebaseServicesAndUser => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }

  // This check is now mostly for developer error, as the provider shouldn't render children
  // without these services.
  if (!context.firebaseApp || !context.firestore || !context.auth) {
    throw new Error('Firebase core services not available. Check FirebaseProvider setup.');
  }

  return {
    areServicesAvailable: context.areServicesAvailable,
    firebaseApp: context.firebaseApp,
    firestore: context.firestore,
    auth: context.auth,
    user: context.user,
    isUserLoading: context.isUserLoading,
    userError: context.userError,
  };
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
