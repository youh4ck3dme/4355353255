
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Providers } from '@/components/Providers';
import DynamicInstallPrompt from '@/components/DynamicInstallPrompt';
import { FirebaseClientInitializer } from '@/components/FirebaseClientInitializer';
import { FirebaseProvider } from '@/firebase/provider';
import { ToastProvider } from '@/components/ui/use-toast';
import PushNotificationManager from '@/components/PushNotificationManager';


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const APP_NAME = "VI&MO - Sťahovanie Bratislava";
const APP_DEFAULT_TITLE = "VI&MO - Profesionálne sťahovanie a upratovanie v Bratislave";
const APP_TITLE_TEMPLATE = "%s | VI&MO";
const APP_DESCRIPTION = "Spoľahlivé sťahovacie a upratovacie služby v Bratislave a okolí. Sťahovanie bytov, firiem, klavírov. Vypratávanie, montáž a doprava. Získajte cenovú ponuku.";

export const metadata: Metadata = {
  metadataBase: new URL('https://stahovanie.website'),
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
    url: new URL('https://stahovanie.website'),
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
            <ToastProvider>
              <FirebaseClientInitializer />
              <PushNotificationManager />
              {children}
              <DynamicInstallPrompt />
            </ToastProvider>
          </FirebaseProvider>
        </Providers>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TT4HP7501H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TT4HP7501H');
          `}
        </Script>
      </body>
    </html>
  );
}
