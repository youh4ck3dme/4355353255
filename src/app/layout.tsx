import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase/client-provider";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "Bratislava sťahovanie | VI&MO | Tipy a Rady",
  description: "Nájdete tu najlepšie tipy a rady pre sťahovanie, upratovanie a vypratávanie v Bratislave a okolí. Prečítajte si náš blog!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={`dark ${inter.variable}`}>
      <body>
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
