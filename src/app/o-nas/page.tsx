import Image from 'next/image';
import { Metadata } from 'next';
import { Users, Target, Sparkles, Phone, Mail, Building, Home, Briefcase, Trash2, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import placeholderImages from '@/lib/placeholder-images.json';
import dynamic from 'next/dynamic';

const DynamicContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { ssr: false });

export const metadata: Metadata = {
  title: 'O nás - Profesionálne sťahovanie a upratovanie v Bratislave | VI&MO',
  description: 'Zistite viac o firme VI&MO. Sme experti na sťahovanie bytov, domov a firiem, vypratávanie a upratovacie služby v Bratislave a okolí už 7 rokov. Rýchlo, spoľahlivo a výhodne.',
};

const services = [
    {
        icon: Home,
        title: "Sťahovanie bytov a rodinných domov",
        description: "Presťahujeme vás bez stresu. Zabezpečíme demontáž, montáž nábytku, balenie krehkých vecí a bezpečný prevoz."
    },
    {
        icon: Briefcase,
        title: "Sťahovanie firiem, skladov a prevádzok",
        description: "Minimalizujeme výpadky vo vašej prevádzke vďaka efektívnemu plánovaniu, spoľahlivej logistike a skúsenému tímu."
    },
    {
        icon: Trash2,
        title: "Vypratávanie, likvidácia a odvoz odpadu",
        description: "Postaráme sa o vypratanie bytov, pivníc či garáží vrátane ekologickej likvidácie nepotrebného nábytku a odpadu."
    },
    {
        icon: Sparkles,
        title: "Profesionálne upratovacie práce",
        description: "Jednorazové aj pravidelné upratovanie bytov, domov a kancelárií. Zabezpečíme čistotu, na ktorú sa môžete spoľahnúť."
    }
]

export default function AboutPage() {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'VI and MO s. r. o.',
    image: `${siteUrl}/images/f27ddb6a-9fbe-4410-946b-766230e10a60.png`,
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
      latitude: 48.2045, // Približné súradnice, odporúča sa upresniť
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
    serviceType: [
      "Sťahovanie bytov a rodinných domov",
      "Sťahovanie firiem, skladov a prevádzok",
      "Vypratávanie, likvidácia a odvoz odpadu",
      "Profesionálne upratovacie práce"
    ]
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
        
        <section className="mb-16 grid md:grid-cols-2 gap-12 items-center">
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
              <h2 className="text-3xl font-bold mb-4 text-brand-dark-teal dark:text-brand-bg text-shadow-3d">Sme silná partia v oblasti „moving & logistic“ služieb</h2>
              <p className="text-brand-secondary-grey dark:text-slate-300 mb-4">
                Disponujeme viac než 7-ročnými skúsenosťami v oblasti profesionálneho sťahovania, odvozu ekologického odpadu a nadštandardných upratovacích služieb. Sťahujeme byty, domy, kancelárie aj celé firmy, odvezieme nepotrebné veci a postaráme sa o dokonalý poriadok.
              </p>
              <p className="text-brand-secondary-grey dark:text-slate-300">
                 Pracujeme rýchlo, efektívne a s ľudským prístupom. Zakladáme si na férovom prístupe, spoľahlivosti a poctivej práci. Naše služby zahŕňajú aj balenie, sťahovanie klavíra či trezoru, a to aj počas víkendov a nocí.
              </p>
            </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-brand-dark-teal dark:text-brand-bg text-shadow-3d">Naše kľúčové služby</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map(service => {
                  const Icon = service.icon;
                  return (
                      <div key={service.title} className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-6 rounded-lg shadow-lg flex flex-col text-center items-center">
                          <div className="bg-brand-bright-green p-4 rounded-full mb-4">
                              <Icon className="h-8 w-8 text-brand-dark-teal" />
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-brand-dark-teal dark:text-brand-bg h-14 flex items-center justify-center">{service.title}</h3>
                          <p className="text-brand-secondary-grey dark:text-slate-300 text-sm">{service.description}</p>
                      </div>
                  );
              })}
          </div>
        </section>

        <section className="bg-brand-dark-teal/90 rounded-lg p-8 md:p-12 mb-16 text-center text-white">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-brand-bright-green"/>
          <h2 className="text-3xl font-bold mb-4 text-brand-bg text-shadow-3d">Pôsobíme v Bratislave a širokom okolí</h2>
          <p className="max-w-4xl mx-auto text-slate-300">
              Naše služby poskytujeme najmä v lokalitách Bratislava (Ružinov, Petržalka, Nové Mesto, Rača, Karlova Ves, Dúbravka) a v okolí miest ako Senec, Pezinok, Šamorín a Malacky.
          </p>
        </section>

        <section id="kontakt" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-brand-dark-teal dark:text-brand-bg text-shadow-3d">Kontaktujte nás</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-6 rounded-lg shadow-lg text-center md:text-left">
                  <h3 className="text-2xl font-bold text-brand-dark-teal dark:text-brand-bg mb-4">Kontaktné údaje</h3>
                  <div className="space-y-4">
                      <div>
                          <h4 className="font-bold text-brand-secondary-grey dark:text-slate-400">Sťahovanie</h4>
                          <p className="flex items-center justify-center md:justify-start text-brand-dark-teal dark:text-brand-bg font-semibold"><Phone className="w-4 h-4 mr-2 text-brand-bright-green" /> +421 911 275 755</p>
                           <p className="flex items-center justify-center md:justify-start text-brand-dark-teal dark:text-brand-bg font-semibold"><Mail className="w-4 h-4 mr-2 text-brand-bright-green" /> info@viandmo.com</p>
                          <p className="text-sm text-brand-secondary-grey dark:text-slate-400 mt-1">Miroslav Danihel</p>
                      </div>
                       <div>
                          <h4 className="font-bold text-brand-secondary-grey dark:text-slate-400">Upratovanie</h4>
                          <p className="flex items-center justify-center md:justify-start text-brand-dark-teal dark:text-brand-bg font-semibold"><Phone className="w-4 h-4 mr-2 text-brand-bright-green" /> +421 918 895 730</p>
                      </div>
                  </div>
              </div>
              <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-6 rounded-lg shadow-lg text-center md:text-left">
                  <h3 className="text-2xl font-bold text-brand-dark-teal dark:text-brand-bg mb-4">Obchodné údaje</h3>
                  <div className="space-y-2 text-brand-secondary-grey dark:text-slate-300">
                      <p className="flex items-center justify-center md:justify-start"><Building className="w-4 h-4 mr-2 text-brand-bright-green" /> <strong>VI and MO s. r. o.</strong></p>
                      <p>Karpatské námestie 7770/10A</p>
                      <p>831 06 Bratislava - Rača, Slovensko</p>
                      <p><strong>IČO:</strong> 56 811 322 | <strong>DIČ:</strong> 2122461176</p>
                  </div>
              </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-brand-dark-teal dark:text-brand-bg text-shadow-3d">Sťahujete sa? Napíšte nám.</h2>
          <div className="max-w-2xl mx-auto bg-brand-light-gray dark:bg-brand-dark-teal/80 p-8 rounded-lg shadow-2xl">
            <DynamicContactForm />
          </div>
        </section>

      </div>
    </>
  );
}
