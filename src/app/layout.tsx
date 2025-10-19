
import type { Metadata } from 'next';
import './globals.css';
import PWAProvider from '@/components/PWAProvider';
import InstallPrompt from '@/components/InstallPrompt';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'VI&MO – Sťahovanie Bratislava',
  description:
    'Sťahovanie bytov a firiem v Bratislave. Kalkulačka ceny, vypratávanie, autodoprava.',
  metadataBase: new URL('https://app.viandmo.com')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: 'VI&MO – Sťahovanie Bratislava',
    url: 'https://app.viandmo.com',
    telephone: '+421 911 275 755',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Karpatské námestie 7770/10A',
      addressLocality: 'Bratislava',
      postalCode: '831 06',
      addressCountry: 'SK'
    },
    areaServed: 'Bratislava',
    openingHours: ['Mo-Su 08:00-20:00']
  };

  return (
    <html lang="sk" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="bg-brand-bg text-brand-text dark:bg-brand-dark-teal dark:text-brand-bg">
        {/* PWA behaviors */}
        <PWAProvider />
        <InstallPrompt />

        {/* JSON-LD: MovingCompany */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <FirebaseClientProvider>
          <Header />
          <main id="main-content" className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
