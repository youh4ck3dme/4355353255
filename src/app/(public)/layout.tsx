
import { PublicLayout } from '@/components/PublicLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'VI&MO – Sťahovanie a Upratovanie Bratislava',
    template: '%s | VI&MO',
  },
  description:
    'Profesionálne sťahovanie bytov, domov a firiem v Bratislave a okolí. Ponúkame aj vypratávanie, upratovanie a autodopravu. Získajte nezáväznú cenovú ponuku.',
  metadataBase: new URL('https://app.viandmo.com')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground">
       <div className="liquid-glass-background">
          <div className="bg-orbs">
              <div className="orb"></div>
              <div className="orb"></div>
              <div className="orb"></div>
          </div>
      </div>
      <PublicLayout>
        {children}
      </PublicLayout>
    </div>
  );
}
