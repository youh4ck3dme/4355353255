
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow bg-brand-bg dark:bg-brand-dark-teal">
        {children}
      </main>
      <Footer />
    </>
  );
}
