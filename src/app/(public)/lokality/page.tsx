
import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const DynamicInteractiveMap = dynamic(() => import('@/components/InteractiveMap').then(mod => mod.InteractiveMap), { 
  ssr: false,
  loading: () => <div className="aspect-[4/5] w-full bg-white/10 animate-pulse rounded-lg flex items-center justify-center"><p className="text-white">Načítavam mapu...</p></div>
});


export const metadata: Metadata = {
  title: 'Pôsobnosť a lokality sťahovania v Bratislave | VI&MO',
  description: 'Sťahujeme vo všetkých mestských častiach Bratislavy a okolí. Prehľadajte našu interaktívnu mapu lokalít, kde poskytujeme naše profesionálne služby.',
  alternates: {
    canonical: '/lokality',
  }
};


export default function LocationsPage() {
  return (
    <div className="bg-brand-bg text-brand-text dark:bg-brand-dark-teal dark:text-brand-bg">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
            Naša Pôsobnosť
          </h1>
          <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray max-w-3xl mx-auto">
            Pokrývame celú Bratislavu a jej širšie okolie. Kliknite na bod na mape a zistite viac o špecifikách sťahovania vo vašej lokalite.
          </p>
        </header>

        <div className="relative">
          <DynamicInteractiveMap />
        </div>
        
        <div className="mt-16 text-center bg-brand-dark-teal/90 text-white p-8 md:p-12 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-brand-bg text-shadow-3d">Nenašli ste svoju lokalitu?</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">Neváhajte nás kontaktovať. Po dohode realizujeme sťahovanie aj v ďalších mestách a obciach západného Slovenska.</p>
            <Link 
                href="/kontakt"
                className="inline-block px-8 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-xl"
            >
                Získať cenovú ponuku
            </Link>
        </div>

      </div>
    </div>
  );
}
