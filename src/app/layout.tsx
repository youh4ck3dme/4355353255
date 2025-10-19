import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "VI&MO Blog | Sťahovanie a Upratovanie Bratislava",
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
        <Header />
        <main id="main-content" className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
