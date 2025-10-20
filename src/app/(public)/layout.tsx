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
    // The dark class will be applied by next-themes based on system/user preference
    <div className="bg-brand-bg dark:bg-brand-dark-teal">
      <PublicLayout>
        {children}
      </PublicLayout>
    </div>
  );
}
