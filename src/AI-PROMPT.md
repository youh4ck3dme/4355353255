# AI Development Prompt for VI&MO Project

This document outlines the core principles and architectural patterns for developing the VI&MO Next.js application with AI assistance. Adhering to these guidelines is crucial for maintaining code quality, stability, and consistency.

## 1. Core Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS with `clsx` and `tailwind-merge`. All styling must be done via utility classes.
- **UI Components:** ShadCN/UI. Use existing components from `src/components/ui` whenever possible.
- **State Management:** Primarily React Hooks (`useState`, `useEffect`, `useContext`, `useMemo`). No external state management libraries unless absolutely necessary.
- **Database & Auth:** Firebase (Firestore & Authentication).

## 2. The Golden Rule: Firebase Initialization

**The most critical issue in this project has been the "race condition" with Firebase initialization.** The application must **NEVER** attempt to access Firebase services (`firestore`, `auth`) before they are fully initialized and the user is authenticated (even anonymously).

**The Solution is non-negotiable and MUST be followed:**

1.  **`FirebaseProvider` is the Gatekeeper:** The main provider at `src/firebase/provider.tsx` is the single source of truth for service availability. It displays a global loader and only renders its `children` when **both `firestore` and a `user` object are available.**
2.  **Data Fetching with `useCollection`:** All real-time data fetching from Firestore **MUST** use the custom hook located at `src/firebase/firestore/use-collection.tsx`.
3.  **Safe Query Creation:** When using `useCollection` in a component, the Firestore query **MUST** be created inside a `useMemo` hook. This `useMemo` **MUST** have `firestore` and `user` (if needed for the query) in its dependency array. This ensures the query is only created when Firebase is ready.

**Example of Safe Data Fetching:**

```tsx
'use client';

import { useMemo } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { useCollection } from '@/firebase/firestore/use-collection';

function MyComponent() {
  const { firestore, user } = useFirebase();

  const myQuery = useMemo(() => {
    // This check is the most important part!
    if (!firestore || !user) return null;

    // Now it's safe to build the query
    return query(
      collection(firestore, 'myCollection'),
      where('userId', '==', user.uid)
    );
  }, [firestore, user]);

  const { data, isLoading, error } = useCollection(myQuery);

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  // ... render data
}
```

## 3. Code Style & Structure

- **`'use client'` Directive:** All components using React hooks (`useState`, `useEffect`, etc.) or interacting with the browser/Firebase on the client-side must start with the `'use client';` directive.
- **Server Components:** Use Server Components (`async function Page()`) for pages that only need to fetch data on the server (e.g., static content from `mdx.ts`).
- **File Organization:** Keep the project structure clean. Reusable components go in `src/components`. Page-specific components can live in `src/app/(public)/page/_components`. Firebase logic is strictly within `src/firebase`.
- **Styling:** Use `cn()` utility for conditional classes. Do not use inline styles.
- **Immutability:** Always treat state and props as immutable. Create new objects/arrays instead of mutating existing ones.

By strictly following these rules, especially the Firebase initialization pattern, we will prevent regressions and ensure a stable, scalable, and maintainable codebase.