import { CheckCircle, Truck, Building, Sparkles, Trash2, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    icon: Truck,
    title: "Sťahovanie bytov a rodinných domov",
    shortDescription: "Bezstarostné sťahovanie bytov a domov v Bratislave a okolí.",
    description: "Náš tím zabezpečí všetko od demontáže nábytku až po jeho bezpečný prevoz a opätovné zloženie. Vy sa len nasťahujete do nového. Pracujeme rýchlo, precízne a s dôrazom na ochranu vášho majetku.",
    included: [
      "Balenie a zabezpečenie vecí",
      "Prenos a prevoz nábytku a spotrebičov",
      "Znesenie a vynesenie aj bez výťahu",
      "Poistenie zodpovednosti",
    ]
  },
  {
    icon: Building,
    title: "Sťahovanie firiem, skladov a prevádzok",
    shortDescription: "Efektívne sťahovanie firiem a kancelárií bez zdržania.",
    description: "Či ste malá firma alebo väčší podnik, vaše pracovné priestory presťahujeme tak, aby bol výpadok v prevádzke minimálny. Naplánujeme všetko dopredu a pripravíme logistiku.",
    included: [
      "Sťahovanie techniky, nábytku, archívov",
      "Časovo presný plán a logistika",
      "Možnosť víkendového alebo nočného sťahovania",
      "Skúsený tím s dlhoročnými skúsenosťami",
    ]
  },
  {
    icon: Trash2,
    title: "Vypratávanie, odvoz a likvidácia odpadu",
    shortDescription: "Vypratávanie a ekologický odvoz odpadu – bez starostí.",
    description: "Vypratáme starý byt, pivnicu, dom, sklad alebo garáž a všetko nepotrebné odvezieme a ekologicky zlikvidujeme. Starý nábytok, stavebný odpad či elektrospotrebiče – nemusíte sa o nič starať.",
    included: [
      "Vypratávanie interiérov a exteriérov",
      "Odvoz do zberného dvora alebo spaľovne",
      "Likvidácia a triedenie ekologického odpadu",
      "Zabezpečenie likvidácie podľa legislatívy",
    ]
  },
  {
    icon: Sparkles,
    title: "Profesionálne čistiace a upratovacie práce",
    shortDescription: "Čisté bývanie a pracovisko – pravidelne alebo jednorazovo.",
    description: "Ponúkame upratovanie domácností, firiem, spoločných priestorov, po maľovaní či rekonštrukcii. Používame profesionálne čistiace prostriedky a pracujeme s dôrazom na detail.",
    included: [
      "Generálne upratovanie",
      "Pravidelné čistenie (denne/týždenne)",
      "Upratovanie po stavebných prácach",
      "Upratovanie pred/po sťahovaní",
    ]
  }
];


export default function HomePage() {
  return (
    <div className="bg-brand-bg text-brand-text dark:bg-brand-dark-teal dark:text-brand-bg">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white px-4">
        <Image 
          src="/images/f27ddb6a-9fbe-4410-946b-766230e10a60.png"
          alt="Profesionálny sťahovací tím pri práci"
          fill
          className="object-cover"
          priority
          data-ai-hint="moving team"
        />
        <div className="absolute inset-0 bg-brand-dark-teal/70"></div>
        <div className="relative z-10 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-brand-bright-green">
            VI&MO
          </h1>
          <p className="text-2xl md:text-3xl font-light text-slate-200">
            Pevné ruky & poctivý prístup
          </p>
          <Link href="#sluzby" className="mt-8 inline-flex items-center px-8 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-90 transition-colors duration-300 shadow-xl">
              Naše Služby <ArrowDown className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="sluzby" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal dark:text-brand-bright-green">Naše Služby</h2>
          </div>
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center`}>
                  <div className={`order-2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-6 lg:p-8 rounded-lg shadow-lg">
                      <div className="flex items-center mb-4">
                        <Icon className="h-8 w-8 mr-4 text-brand-bright-green" />
                        <h3 className="text-2xl font-bold text-brand-dark-teal dark:text-brand-bg">{service.title}</h3>
                      </div>
                      <p className="font-semibold text-brand-secondary-grey dark:text-slate-300 italic mb-4">{service.shortDescription}</p>
                      <p className="text-brand-secondary-grey dark:text-slate-300 mb-6">{service.description}</p>
                      <ul className="space-y-2">
                        {service.included.map((item, i) => (
                          <li key={i} className="flex items-center text-brand-secondary-grey dark:text-slate-300">
                            <CheckCircle className="h-5 w-5 mr-2 text-brand-bright-green flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={`order-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                     <div className="p-8 bg-brand-dark-teal/90 rounded-lg text-white text-center">
                        <h4 className="text-xl font-bold text-brand-bright-green mb-2">{index % 2 === 0 ? "Rýchlo, bezpečne a so zodpovednosťou" : "Efektívne plánovanie a spoľahlivá logistika"}</h4>
                        <p className="text-slate-300">{service.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-brand-bright-green text-brand-dark-teal py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Nezáväzná cenová ponuka už dnes</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Plánujete sťahovanie v Bratislave alebo okolí? Vyplňte krátky formulár a my Vám bezplatne pripravíme cenovú ponuku šitú presne na Vaše potreby.
          </p>
          <Link href="/o-nas#kontakt" className="inline-block px-8 py-4 bg-brand-dark-teal text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors duration-300 shadow-xl">
            Získať cenovú ponuku
          </Link>
        </div>
      </section>
    </div>
  );
}
