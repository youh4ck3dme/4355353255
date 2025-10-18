import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VI&MO Blog | Sťahovanie a Upratovanie Bratislava",
  description: "Oficiálny blog firmy VI&MO: Tipy a rady pre sťahovanie, upratovanie a vypratávanie v Bratislave.",
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
      </body>
    </html>
  );
}
