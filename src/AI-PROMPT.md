# AI Development Prompt for VI&MO Project

This document outlines the core principles and architectural patterns for developing the VI&MO Next.js application with AI assistance. Adhering to these guidelines is crucial for maintaining code quality, stability, and consistency.

## 1. Core Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS with `clsx` and `tailwind-merge`. All styling must be done via utility classes.
- **UI Components:** ShadCN/UI. Use existing components from `src/components/ui` whenever possible.
- **State Management:** Primarily React Hooks (`useState`, `useEffect`, `useContext`, `useMemo`). No external state management libraries unless absolutely necessary.
- **Database & Auth:** Firebase (Firestore & Authentication).

## 2. The Golden Rule: Firebase Simplicity and Direct Access

**The most critical issue in this project has been over-engineering Firebase integration.** The application must follow a simple, direct, and robust pattern for interacting with Firebase services.

1.  **Central Initialization:** All Firebase services (`app`, `firestore`, `auth`) are initialized **only once** in the file `src/lib/firebase.ts`. This file exports stable, ready-to-use instances. This is the single source of truth for Firebase services.

2.  **Direct Import:** Any client component (`'use client'`) that needs to interact with Firebase **MUST** import the required service instance directly from `src/lib/firebase.ts`.

    ```tsx
    'use client';
    import { firestore, auth } from '@/lib/firebase';
    import { collection, onSnapshot } from 'firebase/firestore';
    ```

3.  **No Complex Providers:** We **DO NOT** use a complex, overarching `FirebaseProvider` that wraps the entire application to manage service availability. The previous attempts to do this were the primary source of race conditions and errors. Simplicity is key. Anonymous authentication and other states are handled at the component level where needed.

4.  **Specialized Hooks for Live Data:** For real-time data fetching from Firestore, we use small, focused, single-purpose hooks.
    *   **`useLiveBlogPosts`**: This hook, located at `src/hooks/useLiveBlogPosts.tsx`, is the **ONLY** approved method for fetching a live list of blog posts. It handles its own loading and error states internally. Components that need blog data should use this hook directly.

5.  **Direct Firestore Calls for Mutations:** For writing data (create, update, delete), components should directly import the `firestore` instance and use Firestore SDK functions like `addDoc`, `setDoc`, `updateDoc`.

**Example of Safe Data Fetching (Blog):**

```tsx
'use client';

import { useLiveBlogPosts } from '@/hooks/useLiveBlogPosts';

function BlogListComponent() {
  const { posts, isLoading, error } = useLiveBlogPosts({ includeDrafts: false });

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  // ... render posts
}
```

**Example of Safe Data Writing (Contact Form):**

```tsx
'use client';
import { firestore } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

function ContactForm() {
    const onSubmit = async (data) => {
        // firestore is guaranteed to be available here.
        await addDoc(collection(firestore, 'contact_submissions'), data);
    };
    // ... rest of the form
}
```

## 3. Code Style & Structure

- **`'use client'` Directive:** All components using React hooks or browser/Firebase APIs must start with `'use client';`.
- **File Organization:** Keep the project structure clean. Reusable components in `src/components`, page-specific components in `src/app/(public)/page/_components`, and specialized hooks in `src/hooks`.
- **Styling:** Use `cn()` utility for conditional classes. Do not use inline styles.
- **Immutability:** Always treat state and props as immutable.

By strictly following these rules, especially the simplified Firebase integration pattern, we will prevent regressions and ensure a stable, scalable, and maintainable codebase.
