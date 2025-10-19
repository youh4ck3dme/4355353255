import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SuggestionsBanner } from "@/components/SuggestionsBanner";
import { ImageReplacementProvider } from "@/context/ImageReplacementContext";

const inter = Inter({ subsets: ["latin"], display: 'swap', variable: '--font-inter' });
const poppins = Poppins({ 
  subsets: ["latin"], 
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins' 
});


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
    <html lang="sk" className={`dark ${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <ImageReplacementProvider>
          <Header />
          <main id="main-content" className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer />
          <SuggestionsBanner />
        </ImageReplacementProvider>
      </body>
    </html>
  );
}
