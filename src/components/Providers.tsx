
'use client';

import { PWAProvider } from '@/components/PWAProvider';
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { FirebaseErrorListener } from './FirebaseErrorListener';
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <PWAProvider />
        <FirebaseClientProvider>
          <FirebaseErrorListener />
          {children}
        </FirebaseClientProvider>
      </ThemeProvider>
    );
}
