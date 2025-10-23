
'use client';

import { FirebaseProvider } from "@/firebase/provider";
import { FirebaseErrorListener } from './FirebaseErrorListener';
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <FirebaseProvider>
          <FirebaseErrorListener />
          {children}
        </FirebaseProvider>
      </ThemeProvider>
    );
}
