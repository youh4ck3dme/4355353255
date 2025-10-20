
// src/app/(public)/layout.tsx
import { PublicLayout } from '@/components/PublicLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VI&MO – Sťahovanie Bratislava',
  description:
    'Sťahovanie bytov a firiem v Bratislave. Kalkulačka ceny, vypratávanie, autodoprava.',
  metadataBase: new URL('https://app.viandmo.com')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="liquid-glass-background">
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>
      <PublicLayout>
        {children}
      </PublicLayout>
    </div>
  );
}
