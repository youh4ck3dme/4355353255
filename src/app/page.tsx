import { CheckCircle, Truck, Building, Sparkles, Trash2, ArrowDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { ContactForm } from '@/components/ContactForm';
import dynamic from 'next/dynamic';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DynamicContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { ssr: false });

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

const faqItems = [
    {
      question: "Aká je cena za sťahovanie?",
      answer: "Cena sťahovania je individuálna. Závisí od rozsahu sťahovaných vecí, vzdialenosti, poschodia a počtu pracovníkov. Pre presnú cenovú ponuku nás neváhajte kontaktovať alebo použite našu online kalkulačku na stránke Cenník."
    },
    {
      question: "Poskytujete aj baliaci materiál?",
      answer: "Áno, na požiadanie vieme zabezpečiť kvalitný baliaci materiál, ako sú krabice, bublinkové fólie, stretch fólie a lepiace pásky, aby bol váš majetok počas prepravy v úplnom bezpečí."
    },
    {
      question: "Sťahujete aj počas víkendov a sviatkov?",
      answer: "Áno, sme vám k dispozícii 7 dní v týždni. Po dohode pracujeme aj počas víkendov alebo vo večerných hodinách, aby sme sa maximálne prispôsobili vašim potrebám, a to bez príplatkov."
    },
    {
      question: "Je môj majetok počas sťahovania poistený?",
      answer: "Samozrejme. Máme uzatvorené poistenie zodpovednosti za škodu do výšky 50 000 €, takže váš majetok je počas celého procesu sťahovania plne krytý."
    },
    {
      question: "Ako dlho dopredu si mám objednať sťahovanie?",
      answer: "Odporúčame objednať si sťahovacie služby aspoň týždeň vopred, najmä ak plánujete sťahovanie v rušnejších obdobiach (napríklad na konci mesiaca). V prípade urgentnej potreby sa však vždy snažíme nájsť riešenie a dohodnúť sa na skoršom termíne."
    }
];


export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bratislava sťahovanie | VI&MO',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`, // Uistite sa, že tento súbor existuje v /public
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+421-911-275-755',
      contactType: 'customer service',
      areaServed: 'SK',
      availableLanguage: ['Slovak']
    },
    sameAs: [
      // Tu pridajte linky na sociálne siete, ak existujú
      // "https://www.facebook.com/vimo.stahovanie",
    ]
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bratislava sťahovanie | VI&MO',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
  
    const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const heroImage = placeholderImages.hero;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="bg-brand-bg text-brand-text dark:bg-brand-dark-teal dark:text-brand-bg">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center text-white px-4">
          <Image 
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.hint}
          />
          <div className="absolute inset-0 bg-brand-dark-teal/70"></div>
          <div className="relative z-10 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-brand-bright-green text-shadow-3d-green">
              VI&MO
            </h1>
            <p className="text-2xl md:text-3xl font-light text-slate-200">
              Pevné ruky & poctivý prístup
            </p>
            <Link href="#sluzby" className="liquid-glass-button mt-8 inline-flex items-center px-8 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-90 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Naše Služby <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section id="sluzby" className="min-h-screen flex flex-col justify-center py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">Naše Služby</h2>
            </div>
            <div className="space-y-16">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center`}>
                    <div className={`order-2 text-center md:text-left ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                      <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-6 lg:p-8 rounded-lg shadow-subtle hover:shadow-medium transition-shadow duration-300">
                        <div className="flex items-center justify-center md:justify-start mb-4">
                          <Icon className="h-8 w-8 mr-4 text-brand-bright-green" />
                          <h3 className="text-2xl font-bold text-brand-dark-teal dark:text-brand-bg">{service.title}</h3>
                        </div>
                        <p className="font-semibold text-brand-secondary-grey dark:text-slate-300 italic mb-4">{service.shortDescription}</p>
                        <p className="text-brand-secondary-grey dark:text-slate-300 mb-6">{service.description}</p>
                        <ul className="space-y-2">
                          {service.included.map((item, i) => (
                            <li key={i} className="flex items-center text-center md:text-left justify-center md:justify-start text-brand-secondary-grey dark:text-slate-300">
                              <CheckCircle className="h-5 w-5 mr-2 text-brand-bright-green flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={`order-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} text-center md:text-left`}>
                       <div className="p-8 bg-brand-dark-teal/90 rounded-lg text-white shadow-subtle">
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

        {/* FAQ Section */}
        <section id="faq" className="min-h-screen flex flex-col justify-center py-16">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
                        Často Kladené Otázky
                    </h2>
                    <p className="mt-4 text-lg text-brand-secondary-grey dark:text-brand-light-gray">
                        Rýchle odpovede na najčastejšie otázky. Ak tu nenájdete, čo hľadáte, neváhajte nás kontaktovať.
                    </p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                            <AccordionTrigger className="text-lg text-center md:text-left font-semibold hover:no-underline text-brand-dark-teal dark:text-brand-bg">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-brand-secondary-grey dark:text-slate-300 text-center md:text-left">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-brand-bright-green text-brand-dark-teal min-h-screen flex flex-col justify-center py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-extrabold mb-4 text-shadow-3d">Nezáväzná cenová ponuka už dnes</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Plánujete sťahovanie v Bratislave alebo okolí? Vyplňte krátky formulár a my Vám bezplatne pripravíme cenovú ponuku šitú presne na Vaše potreby.
            </p>
            <Link href="/o-nas#kontakt" className="liquid-glass-button inline-block px-8 py-4 bg-brand-dark-teal text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Získať cenovú ponuku
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
