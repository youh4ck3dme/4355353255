
'use client';

import { Metadata } from 'next';
import { Users, Truck, Home, Calculator } from 'lucide-react';
import dynamic from 'next/dynamic';
import GlassCard from '@/components/GlassCard';

const DynamicPriceCalculator = dynamic(() => import('@/components/PriceCalculator').then(mod => mod.PriceCalculator), { 
  ssr: false,
  loading: () => <p className="text-white">Načítavam kalkulačku...</p> 
});

/*
// Metadata can't be exported from a client component. 
// It should be defined in a parent layout or page.
export const metadata: Metadata = {
  title: 'Cenník Služieb | Bratislava sťahovanie | VI&MO',
  description: 'Prehľadný cenník sťahovacích a upratovacích služieb v Bratislave. Vypočítajte si odhadovanú cenu pomocou našej online kalkulačky.',
  alternates: {
    canonical: '/cennik',
  }
};
*/

const priceItems = [
    { id: 'garsonka', name: 'Garsónka', price: 'od 65 €', priceNumeric: 65 },
    { id: '1-izbovy', name: '1. izbový byt', price: 'od 70 €', priceNumeric: 70 },
    { id: '2-izbovy', name: '2. izbový byt', price: 'od 140 €', priceNumeric: 140 },
    { id: '3-izbovy', name: '3. izbový byt', price: 'od 240 €', priceNumeric: 240 },
    { id: '4-izbovy', name: '4. izbový byt', price: 'od 350 €', priceNumeric: 350 },
    { id: 'dom', name: 'Rodinný dom', price: 'Cenová ponuka', priceNumeric: null },
];

export default function PricingPage() {
  const offerCatalogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Cenník sťahovacích služieb',
    itemListElement: priceItems.filter(item => item.priceNumeric !== null).map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: `Sťahovanie - ${item.name}`
      },
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: item.priceNumeric,
        priceCurrency: 'EUR',
        valueAddedTaxIncluded: false, 
        description: 'Cena je orientačná, začína od uvedenej sumy.'
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogJsonLd) }}
      />
      <div className="bg-brand-bg text-brand-text dark:bg-brand-dark-teal dark:text-brand-bg">
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
                <GlassCard key={item.id} className="flex flex-col items-center text-center p-6">
                  <div className="bg-brand-bright-green/20 p-3 rounded-full mb-4">
                      <Home className="h-6 w-6 text-brand-bright-green" />
                  </div>
                  <h3 className="text-xl font-bold text-white flex-grow">{item.name}</h3>
                  <p className="text-2xl font-extrabold text-brand-bright-green mt-2">{item.price}</p>
                </GlassCard>
              ))}
            </div>
            <p className="text-center text-sm text-slate-400 mt-4">* Uvedené ceny sú orientačné a môžu sa líšiť v závislosti od rozsahu práce.</p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-brand-dark-teal dark:text-brand-bg text-shadow-3d">Ceny za pracovníkov a dopravu</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <GlassCard className="p-6 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start mb-4">
                        <div className="bg-brand-bright-green/20 p-3 rounded-full mr-4">
                            <Users className="h-6 w-6 text-brand-bright-green" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Pracovníci</h3>
                    </div>
                    <ul className="space-y-2 text-slate-300 list-disc list-inside">
                        <li>Jeden pracovník (šofér + sťahovák): <span className="font-bold text-white">40 € / hod.</span></li>
                        <li>Dvaja pracovníci: <span className="font-bold text-white">od 50 € / hod.</span></li>
                        <li>Traja a viac pracovníkov: <span className="font-bold text-white">Cena dohodou</span></li>
                    </ul>
                </GlassCard>
                 <GlassCard className="p-6 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start mb-4">
                        <div className="bg-brand-bright-green/20 p-3 rounded-full mr-4">
                            <Truck className="h-6 w-6 text-brand-bright-green" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Doprava</h3>
                    </div>
                    <ul className="space-y-2 text-slate-300 list-disc list-inside">
                        <li>V rámci Bratislavy: <span className="font-bold text-white">do 30 €</span></li>
                        <li>Mimo mesta: <span className="font-bold text-white">0,80 € / kilometer</span></li>
                        <li className="pt-2 border-t border-white/10 mt-2">Minimálna suma výjazdu: <span className="font-bold text-white">70 €</span></li>
                    </ul>
                </GlassCard>
            </div>
          </section>

          <section>
            <GlassCard>
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-block bg-brand-bright-green/20 p-4 rounded-full mb-4">
                      <Calculator className="h-8 w-8 text-brand-bright-green" />
                  </div>
                  <h2 className="text-3xl font-bold text-white text-shadow-md">Online Kalkulačka Ceny</h2>
                  <p className="text-slate-300 mt-2">Získajte rýchly a nezáväzný odhad ceny vášho sťahovania.</p>
                </div>
                <DynamicPriceCalculator />
              </div>
            </GlassCard>
          </section>
        </div>
      </div>
    </>
  );
}
