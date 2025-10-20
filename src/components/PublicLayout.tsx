
'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import dynamic from 'next/dynamic';

const DynamicInstallPrompt = dynamic(() => import('@/components/InstallPrompt'), { ssr: false });


export function PublicLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: 'VI&MO – Sťahovanie Bratislava',
    url: 'https://app.viandmo.com',
    logo: 'https://viandmo.com/wp-content/uploads/viandmo_logo_regular_land.svg',
    telephone: '+421 911 275 755',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Karpatské námestie 7770/10A',
      addressLocality: 'Bratislava',
      postalCode: '831 06',
      addressCountry: 'SK'
    },
    areaServed: 'Bratislava',
    openingHours: ['Mo-Su 08:00-20:00']
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main-content" className="pt-16 min-h-screen relative z-10">
          {children}
      </main>
      <Footer />
      <DynamicInstallPrompt />
    </>
  );
}
