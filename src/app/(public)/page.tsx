
import { CheckCircle, Truck, Building, Sparkles, Trash2, ArrowDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import dynamic from 'next/dynamic';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DynamicContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { ssr: false });
const DynamicPriceCalculator = dynamic(() => import('@/components/PriceCalculator').then(mod => mod.PriceCalculator), { ssr: false });

const services = [
  {
    icon: Truck,
    title: "Sťahovanie bytov a rodinných domov",
    shortDescription: "Bezstarostné sťahovanie bytov a domov v Bratislave a okolí.",
    description: "Náš tím zabezpečí všetko od demontáže nábytku až po jeho bezpečný prevoz a opätovné zloženie. Vy sa len nasťahujete do nového. Pracujeme rýchlo, precízne a s dôrazom na ochranu vášho majetku.",
    secondaryDescription: "Rýchlo, bezpečne a so zodpovednosťou",
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
    secondaryDescription: "Efektívne plánovanie a spoľahlivá logistika",
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
    secondaryDescription: "Rýchlo, bezpečne a so zodpovednosťou",
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
    secondaryDescription: "Efektívne plánovanie a spoľahlivá logistika",
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
    name: 'VI&MO - Sťahovanie Bratislava',
    url: siteUrl,
    logo: `${siteUrl}/images/viandmo-logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+421-911-275-755',
      contactType: 'customer service',
      areaServed: 'SK',
      availableLanguage: ['Slovak']
    },
    sameAs: [
    ]
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VI&MO - Sťahovanie Bratislava',
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
          <div className="relative z-10 animate-fade-in text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-brand-bright-green text-shadow-3d-green">
              Sťahovanie bez starostí
            </h1>
            <p className="text-2xl md:text-3xl font-light text-slate-200">
              Pevné ruky & poctivý prístup
            </p>
            <Link href="#sluzby" className="liquid-glass-button mt-8 inline-flex items-center px-8 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-90 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Naše Služby <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
