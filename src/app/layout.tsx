import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SuggestionsBanner } from "@/components/SuggestionsBanner";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

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
    <html lang="sk" className="dark">
      <body className={inter.className}>
        <Header />
        <main id="main-content" className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
        <SuggestionsBanner />
      </body>
    </html>
  );
}
