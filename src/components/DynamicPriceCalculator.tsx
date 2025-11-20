
'use client';

import dynamic from 'next/dynamic';

const PriceCalculator = dynamic(() => import('@/components/PriceCalculator').then(mod => mod.PriceCalculator), { 
  ssr: false,
  loading: () => <p>Načítavam kalkulačku...</p> 
});

export default function DynamicPriceCalculator() {
    return <PriceCalculator />;
}
