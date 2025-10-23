
'use client';

import { useState, useEffect } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
export type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useCollection hook.
 * @template T Type of the document data.
 */
export interface UseCollectionResult<T> {
  data: WithId<T>[] | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

/**
 * React hook to subscribe to a Firestore collection or query in real-time.
 * Handles nullable references/queries safely.
 *
 * IMPORTANT! YOU MUST MEMOIZE the `memoizedTargetRefOrQuery` input using React's `useMemo` hook,
 * or you risk creating infinite re-renders. The memoized query should only be re-created
 * when its dependencies (like a user ID) actually change.
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {CollectionReference<DocumentData> | Query<DocumentData> | null | undefined} memoizedTargetRefOrQuery -
 * The Firestore CollectionReference or Query, memoized with `useMemo`. The hook waits if this is null/undefined.
 * @returns {UseCollectionResult<T>} Object with data, isLoading, error.
 */
export function useCollection<T = any>(
    memoizedTargetRefOrQuery: CollectionReference<DocumentData> | Query<DocumentData> | null | undefined,
): UseCollectionResult<T> {
  type ResultItemType = WithId<T>;
  type StateDataType = ResultItemType[] | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    // If the query/ref is not provided or not ready, set loading and wait.
    // This is the primary safeguard against the "Expected first argument to collection()" error.
    if (!memoizedTargetRefOrQuery) {
      setIsLoading(true);
      setData(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      memoizedTargetRefOrQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const results: ResultItemType[] = snapshot.docs.map(doc => ({
            ...(doc.data() as T),
            id: doc.id
        }));
        setData(results);
        setError(null);
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        // Attempt to get the path for better error context.
        const path: string | null = (memoizedTargetRefOrQuery as any)?._query?.path?.canonicalString() ?? (memoizedTargetRefOrQuery as any)?.path ?? null;

        if (path) {
            const contextualError = new FirestorePermissionError({
              operation: 'list',
              path,
            })
            setError(contextualError);
            // trigger global error propagation
            errorEmitter.emit('permission-error', contextualError);
        } else {
             setError(error);
        }

        setData(null)
        setIsLoading(false)
      }
    );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    // or when the query changes.
    return () => unsubscribe();
  }, [memoizedTargetRefOrQuery]); // Effect runs only when the memoized query object changes

  return { data, isLoading, error };
}
