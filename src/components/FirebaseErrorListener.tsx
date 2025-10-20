
'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * An invisible component that listens for globally emitted 'permission-error' events.
 * It throws any received error to be caught by Next.js's global-error.tsx.
 */
export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      setError(error);
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  if (error) {
    // In a production environment, you might want to log this error to a monitoring service
    // instead of throwing it, which would crash the client-side app.
    if (process.env.NODE_ENV === 'development') {
      throw error;
    } else {
      console.error("Firestore Permission Error:", error);
      // Maybe show a generic error toast to the user
    }
  }

  return null;
}
