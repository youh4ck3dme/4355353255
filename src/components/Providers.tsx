'use client';

import { PWAProvider } from '@/components/PWAProvider';
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { FirebaseErrorListener } from './FirebaseErrorListener';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PWAProvider>
          <FirebaseClientProvider>
            <FirebaseErrorListener />
            {children}
          </FirebaseClientProvider>
        </PWAProvider>
    );
}
