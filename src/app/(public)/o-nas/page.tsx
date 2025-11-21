
import Image from 'next/image';
import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { services } from '@/lib/services';
import Services from '@/components/Services';
import GlassCard from '@/components/GlassCard';

export const metadata: Metadata = {
  title: 'O nás - Profesionálne sťahovanie a upratovanie v Bratislave | VI&MO',
  description: 'Zistite viac o firme VI&MO. Sme experti na sťahovanie bytov, domov a firiem, vypratávanie a upratovacie služby v Bratislave a okolí už 7 rokov. Rýchlo, spoľahlivo a výhodne.',
};

export default function AboutPage() {
  const siteUrl = 'https://stahovanie.website';
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'VI and MO s. r. o.',
    image: 'https://stahovanie.website/wp-content/uploads/viandmo_logo_regular_land.svg',
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+421 911 275 755',
    email: 'info@viandmo.com',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Karpatské námestie 7770/10A',
      addressLocality: 'Bratislava - Rača',
      postalCode: '831 06',
      addressCountry: 'SK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.2045, 
      longitude: 17.1537
    },
     openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ],
          opens: '00:00',
          closes: '23:59'
        }
    ],
    serviceType: services.map(s => s.name)
  };

  const aboutTeamImage = placeholderImages.aboutTeam;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
            Profesionálne sťahovanie a upratovanie v Bratislave
          </h1>
          <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray max-w-3xl mx-auto">
            Sme VI&MO - váš spoľahlivý partner pre sťahovanie bytov, domov, firiem, odvoz odpadu a upratovanie. Rýchlo, spoľahlivo a výhodne už 7 rokov.
          </p>
        </header>
        
        <GlassCard className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={aboutTeamImage.src}
                    alt={aboutTeamImage.alt}
                    fill
                    className="object-cover"
                    data-ai-hint={aboutTeamImage.hint}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4 text-white text-shadow-md">Sme silná partia v oblasti „moving & logistic“ služieb</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Disponujeme viac než 7-ročnými skúsenosťami v oblasti profesionálneho sťahovania, odvozu ekologického odpadu a nadštandardných upratovacích služieb. Sťahujeme byty, domy, kancelárie aj celé firmy, odvezieme nepotrebné veci a postaráme sa o dokonalý poriadok.
                  </p>
                  <p>
                    Pracujeme rýchlo, efektívne a s ľudským prístupom. Zakladáme si na férovom prístupe, spoľahlivosti a poctivej práci. Naše služby zahŕňajú aj balenie, sťahovanie klavíra či trezoru, a to aj počas víkendov a nocí.
                  </p>
                </div>
              </div>
          </div>
        </GlassCard>

        <div className="mb-16">
          <Services services={services.slice(0, 4)} />
        </div>

        <GlassCard className="mb-16 text-center text-white">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-brand-bright-green"/>
          <h2 className="text-3xl font-bold mb-4 text-white text-shadow-md">Pôsobíme v Bratislave a širokom okolí</h2>
          <p className="max-w-4xl mx-auto text-slate-300">
              Naše služby poskytujeme najmä v lokalitách Bratislava (Ružinov, Petržalka, Nové Mesto, Rača, Karlova Ves, Dúbravka) a v okolí miest ako Senec, Pezinok, Šamorín a Malacky.
          </p>
        </GlassCard>
      </div>
    </>
  );
}
