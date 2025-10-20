
'use client';

import { FirebaseClientProvider } from "@/firebase/client-provider";
import { FirebaseErrorListener } from './FirebaseErrorListener';
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <FirebaseClientProvider>
          <FirebaseErrorListener />
          {children}
        </FirebaseClientProvider>
      </ThemeProvider>
    );
}
