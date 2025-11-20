
'use client';

import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap').then(mod => mod.InteractiveMap), { 
  ssr: false,
  loading: () => <div className="aspect-[4/5] w-full bg-white/10 animate-pulse rounded-lg flex items-center justify-center"><p className="text-white">Načítavam mapu...</p></div>
});

export default function DynamicInteractiveMap() {
    return <InteractiveMap />;
}
