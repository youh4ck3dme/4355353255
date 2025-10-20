
import { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/services';
import GlassCard from '@/components/GlassCard';

export const metadata: Metadata = {
  title: 'Služby | Profesionálne sťahovanie VI&MO',
  description: 'Kompletný prehľad našich sťahovacích a upratovacích služieb v Bratislave: sťahovanie bytov, firiem, klavírov, vypratávanie, montáž nábytku a autodoprava.',
  alternates: {
    canonical: '/sluzby',
  }
};

export default function ServicesPage() {
  return (
    <div className="bg-transparent text-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white text-shadow-3d">
            Naše Služby
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Ponúkame komplexné riešenia pre vaše sťahovanie, vypratávanie a upratovanie v Bratislave a okolí. Spoľahnite sa na profesionálov.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.id} href={`/sluzby/${service.id}`} className="block h-full group">
                <GlassCard className="h-full flex flex-col text-center items-center p-6">
                  <div className="bg-brand-bright-green/20 dark:bg-brand-bright-green/20 p-4 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-8 w-8 text-brand-bright-green" />
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-white flex-grow">{service.name}</h2>
                  <p className="text-slate-300 text-sm mb-4">{service.shortDescription}</p>
                   <span className="mt-auto text-sm font-bold text-brand-bright-green group-hover:underline underline-offset-4">
                    Zistiť viac &rarr;
                  </span>
                </GlassCard>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 text-center">
             <GlassCard isPadded={false}>
                <div className="bg-brand-bright-green/10 p-8 md:p-12 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-white text-shadow-md">Pripravení na zmenu?</h2>
                    <p className="text-slate-300 mb-6 max-w-2xl mx-auto">Kontaktujte nás pre nezáväznú cenovú ponuku a nechajte starosti na nás. Sme tu pre vás 7 dní v týždni.</p>
                    <Link 
                        href="/kontakt"
                        className="glass-button inline-block px-8 py-4 font-bold rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                        Získať cenovú ponuku
                    </Link>
                </div>
            </GlassCard>
        </div>

      </div>
    </div>
  );
}
