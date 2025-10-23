'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/lib/types';
import { firestore } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, QueryConstraint } from 'firebase/firestore';

interface UseLiveBlogPostsProps {
  includeDrafts?: boolean;
  filters?: {
    category?: string;
  };
}

export const useLiveBlogPosts = ({ includeDrafts = false, filters = {} }: UseLiveBlogPostsProps = {}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    
    const queryConstraints: QueryConstraint[] = [];
    
    if (!includeDrafts) {
      queryConstraints.push(where('status', '==', 'published'));
    }
    
    if (filters.category) {
      queryConstraints.push(where('tags', 'array-contains', filters.category));
    }
    
    queryConstraints.push(orderBy('date', 'desc'));

    const postsQuery = query(collection(firestore, 'blogPosts'), ...queryConstraints);

    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot) => {
        const results: Post[] = snapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Post, 'slug'>),
          slug: doc.id,
        }));
        setPosts(results);
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching live blog posts:", err);
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [includeDrafts, filters.category]);

  return { posts, isLoading, error };
};
