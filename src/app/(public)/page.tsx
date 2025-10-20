

import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import GlassCard from '@/components/GlassCard';
import dynamic from 'next/dynamic';

const DynamicTestimonials = dynamic(() => import('@/components/Testimonials'), { 
  loading: () => <div className="min-h-[300px]"></div>,
  ssr: false 
});

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
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.viandmo.com';
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
        <section className="relative min-h-screen flex items-center justify-center text-center text-white px-4 -mt-16">
          <div className="relative z-10 animate-fade-in text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-shadow-3d-dark">
              Sťahovanie bez starostí
            </h1>
            <p className="text-2xl md:text-3xl font-light text-slate-200 text-shadow-md">
              Pevné ruky & poctivý prístup
            </p>
            <Link href="/sluzby" className="glass-button mt-8 inline-flex items-center px-8 py-4 font-bold rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Naše Služby <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <DynamicTestimonials />

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
              <header className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white text-shadow-3d">
                      Často kladené otázky
                  </h2>
                  <p className="mt-4 text-lg text-slate-300">
                      Rýchle odpovede na vaše najčastejšie otázky.
                  </p>
              </header>
              <GlassCard>
                <div className="p-4 sm:p-8">
                  <FaqAccordion items={faqItems} />
                </div>
              </GlassCard>
          </div>
        </section>
    </>
  );
}
