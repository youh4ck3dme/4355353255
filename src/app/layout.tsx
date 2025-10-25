
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/Providers';
import { FirebaseProvider } from '@/firebase/provider';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const APP_NAME = "VI&MO - Sťahovanie Bratislava";
const APP_DEFAULT_TITLE = "VI&MO - Profesionálne sťahovanie a upratovanie v Bratislave";
const APP_TITLE_TEMPLATE = "%s | VI&MO";
const APP_DESCRIPTION = "Spoľahlivé sťahovacie a upratovacie služby v Bratislave a okolí. Sťahovanie bytov, firiem, klavírov. Vypratávanie, montáž a doprava. Získajte cenovú ponuku.";

const DynamicInstallPrompt = dynamic(() => import('@/components/InstallPrompt'), { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://stahovanie.website'),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://stahovanie.website'),
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#0B4556',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <FirebaseProvider>
              <div className="flex flex-col min-h-screen">
                  <Header />
                  <main id="main-content" className="flex-grow bg-brand-bg dark:bg-brand-dark-teal">
                      {children}
                  </main>
                  <Footer />
              </div>
              <DynamicInstallPrompt />
          </FirebaseProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
