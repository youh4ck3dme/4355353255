
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pôsobnosť a lokality sťahovania v Bratislave | VI&MO',
  description: 'Sťahujeme vo všetkých mestských častiach Bratislavy. Prehľad lokalít, kde poskytujeme naše služby - od Petržalky po Devínsku Novú Ves.',
  alternates: {
    canonical: '/lokality',
  }
};

const districts = [
    { id: "petrzalka", name: "Petržalka", slug: 'stahovanie-petrzalka-kompletny-sprievodca' },
    { id: "ruzinov", name: "Ružinov", slug: 'stahovanie-ruzinov-moderne-sidliska' },
    { id: "stare-mesto", name: "Staré Mesto", slug: 'stahovanie-stare-mesto-parkovacie-povolenia' },
    { id: "nove-mesto", name: "Nové Mesto", slug: 'stahovanie-nove-mesto-mlada-energia' },
    { id: "dubravka", name: "Dúbravka", slug: 'stahovanie-dubravka-panelaky-rodinne-domy' },
    { id: "karlova-ves", name: "Karlova Ves", slug: 'stahovanie-karlova-ves-zelena-oaza' },
    { id: "raca", name: "Rača", slug: 'stahovanie-raca-tipy-pre-rodiny' },
    { id: "vrakuna", name: "Vrakuňa", slug: 'stahovanie-vrakuna-nova-bratislava' },
    { id: "podunajske-biskupice", name: "Podunajské Biskupice", slug: 'stahovanie-podunajske-biskupice-mesto-a-vidiek' },
    { id: "devinska-nova-ves", name: "Devínska Nová Ves", slug: 'stahovanie-devinska-nova-ves-dunaj-a-priemysel' },
    { id: "lamac", name: "Lamač", slug: 'stahovanie-lamac-komorna-cast-mesta' },
    { id: "devin", name: "Devín", slug: 'stahovanie-devin-malebna-lokalita' },
    { id: "zahorska-bystrica", name: "Záhorská Bystrica", slug: 'stahovanie-zahorska-bystrica-pod-karpatmi' },
    { id: "jarovce", name: "Jarovce", slug: 'stahovanie-jarovce-juzna-cast-bratislavy' },
    { id: "rusovce", name: "Rusovce", slug: 'rychle-stahovanie-rusovce' }
];

export default function LocationsPage() {
  return (
    <div className="bg-brand-bg text-brand-text dark:bg-brand-dark-teal dark:text-brand-bg">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
            Naša Pôsobnosť v Bratislave
          </h1>
          <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray max-w-3xl mx-auto">
            Pokrývame všetky mestské časti Bratislavy. Zistite viac o špecifikách sťahovania vo vašej lokalite a prečítajte si naše tipy v blogu.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {districts.map((district) => (
            <Link 
              key={district.id} 
              href={`/blog/${district.slug}`}
              className="block group"
            >
              <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-6 rounded-lg shadow-subtle group-hover:shadow-large transition-all duration-300 transform group-hover:-translate-y-2 h-full flex flex-col text-center items-center justify-center">
                <MapPin className="h-10 w-10 text-brand-bright-green mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h2 className="text-lg font-bold text-brand-dark-teal dark:text-brand-bg group-hover:text-brand-bright-green">
                  {district.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center bg-brand-dark-teal/90 text-white p-8 md:p-12 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-brand-bg text-shadow-3d">Nenašli ste svoju lokalitu?</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">Neváhajte nás kontaktovať. Po dohode realizujeme sťahovanie aj v širšom okolí Bratislavy.</p>
            <Link 
                href="/kontakt"
                className="inline-block px-8 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-xl"
            >
                Získať cenovú ponuku
            </Link>
        </div>

      </div>
    </div>
  );
}
