import { Metadata } from 'next';
import { Euro, Users, Truck, Home } from 'lucide-react';
import { PriceCalculator } from '@/components/PriceCalculator';

export const metadata: Metadata = {
  title: 'Cenník Služieb | VI&MO Blog',
  description: 'Prehľadný cenník sťahovacích a upratovacích služieb v Bratislave. Vypočítajte si odhadovanú cenu pomocou našej online kalkulačky.',
};

const priceItems = [
    { name: 'Garsónka', price: 'od 65 €' },
    { name: '1. izbový byt', price: 'od 70 €' },
    { name: '2. izbový byt', price: 'od 140 €' },
    { name: '3. izbový byt', price: 'od 240 €' },
    { name: '4. izbový byt', price: 'od 350 €' },
    { name: 'Rodinný dom', price: 'Cenová ponuka' },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
          Cenník našich služieb
        </h1>
        <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray max-w-3xl mx-auto">
          Transparentné a férové ceny pre vaše sťahovanie v Bratislave a okolí.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-brand-dark-teal dark:text-brand-bg text-shadow-3d">Základný cenník sťahovania</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priceItems.map((item) => (
            <div key={item.name} className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <div className="bg-brand-bright-green p-3 rounded-full mb-4">
                  <Home className="h-6 w-6 text-brand-dark-teal" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark-teal dark:text-brand-bg">{item.name}</h3>
              <p className="text-2xl font-extrabold text-brand-bright-green mt-2">{item.price}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-brand-secondary-grey dark:text-slate-400 mt-4">* Uvedené ceny sú orientačné a môžu sa líšiť v závislosti od rozsahu práce.</p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-brand-dark-teal dark:text-brand-bg text-shadow-3d">Ceny za pracovníkov a dopravu</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                    <div className="bg-brand-bright-green p-3 rounded-full mr-4">
                        <Users className="h-6 w-6 text-brand-dark-teal" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-dark-teal dark:text-brand-bg">Pracovníci</h3>
                </div>
                <ul className="space-y-2 text-brand-secondary-grey dark:text-slate-300 list-disc list-inside">
                    <li>Jeden pracovník (šofér + sťahovák): <span className="font-bold">40 € / hod.</span></li>
                    <li>Dvaja pracovníci: <span className="font-bold">od 50 € / hod.</span></li>
                    <li>Traja a viac pracovníkov: <span className="font-bold">Cena dohodou</span></li>
                </ul>
            </div>
             <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                    <div className="bg-brand-bright-green p-3 rounded-full mr-4">
                        <Truck className="h-6 w-6 text-brand-dark-teal" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-dark-teal dark:text-brand-bg">Doprava</h3>
                </div>
                <ul className="space-y-2 text-brand-secondary-grey dark:text-slate-300 list-disc list-inside">
                    <li>V rámci Bratislavy: <span className="font-bold">do 30 €</span></li>
                    <li>Mimo mesta: <span className="font-bold">0,80 € / kilometer</span></li>
                    <li className="pt-2 border-t border-slate-300 dark:border-slate-600 mt-2">Minimálna suma výjazdu: <span className="font-bold">70 €</span></li>
                </ul>
            </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-brand-dark-teal dark:text-brand-bg text-shadow-3d">Online Kalkulačka Ceny</h2>
        <div className="bg-brand-dark-teal/90 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto">
            <PriceCalculator />
        </div>
      </section>
    </div>
  );
}
