
import { Metadata } from 'next';
import Link from 'next/link';
import { Home, Briefcase, Trash2, Sparkles, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Služby | Profesionálne sťahovanie a upratovanie | VI&MO',
  description: 'Kompletný prehľad našich služieb v Bratislave: sťahovanie bytov, domov a firiem, vypratávanie, likvidácia odpadu a profesionálne upratovacie práce.',
  alternates: {
    canonical: '/sluzby',
  }
};

const services = [
  {
    icon: Home,
    title: "Sťahovanie bytov a rodinných domov",
    description: "Či už sa sťahujete z garsónky alebo veľkého rodinného domu, náš tím je pripravený zabezpečiť hladký priebeh. Postaráme sa o demontáž, bezpečné zabalenie, prevoz a opätovnú montáž nábytku. S nami je sťahovanie hračka.",
    features: [
      "Bezpečné balenie nábytku a krehkých vecí",
      "Demontáž a montáž nábytku",
      "Prevoz v rámci Bratislavy a okolia",
      "Poistenie zodpovednosti za škodu"
    ]
  },
  {
    icon: Briefcase,
    title: "Sťahovanie firiem, skladov a prevádzok",
    description: "Presťahujeme vašu kanceláriu, sklad alebo celú prevádzku s minimálnym dopadom na váš biznis. Vďaka dôkladnému plánovaniu a efektívnej logistike zabezpečíme rýchly a organizovaný presun.",
    features: [
      "Flexibilné časovanie (víkendy, nočné hodiny)",
      "Logistické plánovanie na mieru",
      "Bezpečný prevoz IT techniky a dokumentov",
      "Diskrétnosť a profesionalita"
    ]
  },
  {
    icon: Trash2,
    title: "Vypratávanie, likvidácia a odvoz odpadu",
    description: "Potrebujete sa zbaviť starého nábytku alebo vypratať pivnicu? Zabezpečíme kompletné vypratanie bytov, domov, pivníc či garáží a postaráme sa o ekologickú likvidáciu všetkého nepotrebného odpadu.",
    features: [
      "Odvoz starého nábytku a spotrebičov",
      "Vypratávanie pivníc, povál a garáží",
      "Ekologická likvidácia odpadu",
      "Upratanie priestorov po vyprataní"
    ]
  },
  {
    icon: Sparkles,
    title: "Profesionálne upratovacie práce",
    description: "Ponúkame komplexné upratovacie služby pre domácnosti a firmy. Či už potrebujete jednorazové generálne upratovanie, pravidelnú údržbu, alebo upratovanie po sťahovaní, sme tu pre vás.",
    features: [
      "Jednorazové a pravidelné upratovanie",
      "Upratovanie po rekonštrukcii alebo maľovaní",
      "Umývanie okien a tepovanie",
      "Používanie profesionálnych čistiacich prostriedkov"
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-brand-bg text-brand-text dark:bg-brand-dark-teal dark:text-brand-bg">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
            Naše Služby
          </h1>
          <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray max-w-3xl mx-auto">
            Ponúkame komplexné riešenia pre vaše sťahovanie, vypratávanie a upratovanie v Bratislave a okolí.
          </p>
        </header>

        <div className="space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <section key={index} id={service.title.toLowerCase().replace(/ /g, '-')} className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-8 rounded-xl shadow-large">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="text-center lg:text-left">
                     <div className="flex items-center justify-center lg:justify-start mb-4">
                        <div className="bg-brand-bright-green p-4 rounded-full mr-4">
                          <Icon className="h-8 w-8 text-brand-dark-teal" />
                        </div>
                        <h2 className="text-3xl font-bold text-brand-dark-teal dark:text-brand-bg">{service.title}</h2>
                      </div>
                      <p className="text-brand-secondary-grey dark:text-slate-300 mb-6">{service.description}</p>
                      <ul className="space-y-3 text-left">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-brand-secondary-grey dark:text-slate-300">
                            <CheckCircle className="h-5 w-5 mr-3 text-brand-bright-green flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                  </div>
                   <div className="flex justify-center">
                       {/* Placeholder for an image - can be added later */}
                       <div className="w-full h-64 bg-gradient-to-br from-green-700 to-green-900 dark:from-brand-bright-green/10 dark:to-brand-bright-green/5 rounded-lg flex items-center justify-center">
                          <Icon className="h-20 w-20 text-brand-bright-green/50" />
                       </div>
                   </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4 text-brand-dark-teal dark:text-brand-bg">Pripravení na zmenu?</h2>
            <p className="text-brand-secondary-grey dark:text-slate-300 mb-6">Kontaktujte nás pre nezáväznú cenovú ponuku a nechajte starosti na nás.</p>
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
