
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

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
        <Providers>
            {children}
            <Toaster />
        </Providers>
      </body>
    </html>
  )
}
