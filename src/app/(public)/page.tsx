
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import GlassCard from '@/components/GlassCard';
import dynamic from 'next/dynamic';
import { services } from '@/lib/services';
import Services from '@/components/Services';
import { getPublishedPosts } from '@/lib/mdx';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';

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


export default async function HomePage() {
  const latestPosts = (await getPublishedPosts()).slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.viandmo.com';
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VI&MO - Sťahovanie Bratislava',
    url: siteUrl,
    logo: 'https://viandmo.com/wp-content/uploads/viandmo_logo_regular_land.svg',
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
      
        <Hero />
        <Services services={services} />
        <DynamicTestimonials />
        <Blog posts={latestPosts} />
        
        <section id="faq" className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
              <header className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white text-shadow-3d">
                      Často kladené otázky
                  </h2>
                  <p className="mt-4 text-lg text-slate-200">
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

        <Contact />
    </>
  );
}
