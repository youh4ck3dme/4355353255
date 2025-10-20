
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { services } from '@/lib/services';
import FaqAccordion from '@/components/FaqAccordion';

const faqItems = [
    {
      id: "faq-1",
      question: "Aká je cena za sťahovanie?",
      answer: "Cena sťahovania je individuálna. Závisí od rozsahu sťahovaných vecí, vzdialenosti, poschodia a počtu pracovníkov. Pre presnú cenovú ponuku nás neváhajte kontaktovať alebo použite našu online kalkulačku na stránke Cenník."
    },
    {
      id: "faq-2",
      question: "Poskytujete aj baliaci materiál?",
      answer: "Áno, na požiadanie vieme zabezpečiť kvalitný baliaci materiál, ako sú krabice, bublinkové fólie, stretch fólie a lepiace pásky, aby bol váš majetok počas prepravy v úplnom bezpečí."
    },
    {
      id: "faq-3",
      question: "Sťahujete aj počas víkendov a sviatkov?",
      answer: "Áno, sme vám k dispozícii 7 dní v týždni. Po dohode pracujeme aj počas víkendov alebo vo večerných hodinách, aby sme sa maximálne prispôsobili vašim potrebám, a to bez príplatkov."
    },
    {
      id: "faq-4",
      question: "Je môj majetok počas sťahovania poistený?",
      answer: "Samozrejme. Máme uzatvorené poistenie zodpovednosti za škodu do výšky 50 000 €, takže váš majetok je počas celého procesu sťahovania plne krytý."
    },
    {
      id: "faq-5",
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
            <Link href="/sluzby" className="liquid-glass-button mt-8 inline-flex items-center px-8 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-90 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Naše Služby <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24 bg-brand-light-gray dark:bg-brand-dark-teal/80">
          <div className="container mx-auto px-4 max-w-4xl">
              <header className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark-teal dark:text-brand-bg text-shadow-3d">
                      Často kladené otázky
                  </h2>
                  <p className="mt-4 text-lg text-brand-secondary-grey dark:text-slate-300">
                      Rýchle odpovede na vaše najčastejšie otázky.
                  </p>
              </header>
              <FaqAccordion items={faqItems} />
          </div>
        </section>
    </>
  );
}
