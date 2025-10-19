// src/app/manifest.ts
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VI&MO – Sťahovanie Bratislava',
    short_name: 'VI&MO',
    description:
      'Profesionálne sťahovanie bytov a firiem v Bratislave. Kalkulačka ceny, vypratávanie, autodoprava.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    theme_color: '#1A5255',
    background_color: '#F8F8F8',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  };
}
