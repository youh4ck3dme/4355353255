
import { WifiOff } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-xl text-center min-h-screen flex flex-col justify-center items-center">
      <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-8 md:p-12 rounded-lg shadow-xl">
        <WifiOff className="mx-auto h-16 w-16 text-brand-secondary-grey dark:text-slate-500 mb-6" />
        <h1 className="text-3xl font-bold text-brand-dark-teal dark:text-brand-bright-green mb-4">
          Ste offline
        </h1>
        <p className="mt-4 text-brand-secondary-grey dark:text-slate-300">
          Zdá sa, že momentálne nemáte pripojenie na internet. Niektoré funkcie nie sú dostupné, ale základný obsah stránky by mal byť prístupný.
        </p>
        <Link 
            href="/" 
            className="mt-8 inline-block px-6 py-3 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md">
          Späť na Domovskú stránku
        </Link>
      </div>
    </main>
  );
}
