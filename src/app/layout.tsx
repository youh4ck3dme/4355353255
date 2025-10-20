
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/components/Providers'
import { PublicLayout } from '@/components/PublicLayout'

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
           <div className="bg-background text-foreground">
              <div className="liquid-glass-background">
                  <div className="bg-orbs">
                      <div className="orb"></div>
                      <div className="orb"></div>
                      <div className="orb"></div>
                  </div>
              </div>
              <PublicLayout>
                {children}
              </PublicLayout>
            </div>
            <Toaster />
        </Providers>
      </body>
    </html>
  )
}
