'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, Query } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { Post } from '@/lib/types';
import { useToast } from "@/components/ui/use-toast";

interface UseLiveBlogPostsOptions {
  category?: string;
  includeDrafts?: boolean;
}

export const useLiveBlogPosts = (options: UseLiveBlogPostsOptions = {}) => {
  const { category, includeDrafts = false } = options;
  const { toast } = useToast();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const queryConstraints = [];
    
    if (!includeDrafts) {
      queryConstraints.push(where('status', '==', 'published'));
    }
    if (category) {
      queryConstraints.push(where('tags', 'array-contains', category));
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
        toast({
            variant: 'destructive',
            title: 'Chyba pri načítaní článkov',
            description: 'Nepodarilo sa načítať zoznam článkov z databázy.',
        });
      }
    );

    return () => unsubscribe();
  }, [category, includeDrafts, toast]);

  return { posts, isLoading, error };
};
