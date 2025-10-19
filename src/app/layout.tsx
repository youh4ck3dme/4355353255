'use client';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { PWAProvider } from '@/components/PWAProvider'
import { FirebaseClientProvider } from "@/firebase/client-provider";

const inter = Inter({ subsets: ['latin'] })

// Metadata can still be exported from a client component layout
export const metadata: Metadata = {
  title: 'VI&MO - Sťahovanie Bratislava',
  description: 'Profesionálne sťahovacie služby v Bratislave a okolí.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <body className={inter.className}>
        <PWAProvider>
          <FirebaseClientProvider>
            {children}
            <Toaster />
          </FirebaseClientProvider>
        </PWAProvider>
      </body>
    </html>
  )
}
