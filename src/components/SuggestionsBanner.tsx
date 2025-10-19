'use client';

import { Lightbulb, RotateCcw, Shield, Brush, Rocket, Search, UserCheck, Wrench, FunctionSquare } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

const allSuggestions = {
  Funkcionalita: [
    "Pridaj na hlavnú stránku sekciu 'Najčítanejšie články'.",
    "Implementuj možnosť filtrovania článkov podľa kategórií (tagov).",
    "Pridaj tlačidlo 'Zdieľať na sociálnych sieťach' do detailu článku.",
    "Vytvor newsletter formulár na prihlásenie sa na odber noviniek.",
    "Vytvor kontaktný formulár s validáciou na samostatnej stránke 'Kontakt'.",
    "Implementuj full-textové vyhľadávanie s našeptávačom.",
    "Pridaj sekciu komentárov pod každý článok pomocou služby ako Disqus.",
    "Vytvor stránku 'O nás' s predstavením firmy VI&MO.",
    "Pridaj kalkulačku odhadovanej ceny sťahovania.",
    "Implementuj systém hodnotenia článkov (1-5 hviezdičiek)."
  ],
  'Generovanie Funkcií': [
    "Vygeneruj kompletnú sekciu 'Login/Register' s využitím Firebase Authentication.",
    "Implementuj 'Cloud Storage' pre nahrávanie a správu súborov cez Firebase.",
    "Vytvor dashboard pre správu používateľov s prepojením na Firestore.",
    "Pridaj do aplikácie systém notifikácií v reálnom čase."
  ],
  Dizajn: [
    "Pridaj tmavý a svetlý režim s možnosťou prepínania.",
    "Vytvor animované prechody medzi stránkami pre lepší používateľský zážitok.",
    "Redizajnuj hlavičku, aby bola menšia pri skrolovaní nadol.",
    "Pridaj jemné 'hover' efekty na všetky interaktívne prvky.",
    "Vytvor unikátne ikony pre jednotlivé kategórie služieb (sťahovanie, upratovanie).",
    "Zjednoť paletu farieb podľa brand manuálu VI&MO.",
    "Použi iný, modernejší font pre nadpisy."
  ],
  Výkon: [
    "Optimalizuj obrázky pre rýchlejšie načítanie na mobilných zariadeniach.",
    "Analyzuj a optimalizuj metriky Core Web Vitals.",
    "Implementuj 'lazy loading' pre obrázky a videá mimo viditeľnej časti stránky.",
    "Zváž použitie statického generovania stránok (SSG) pre blogové príspevky.",
    "Minifikuj CSS a JavaScript súbory pre produkciu."
  ],
  SEO: [
    "Automaticky generuj štruktúrované dáta (Schema.org) pre blogové príspevky.",
    "Vytvor dynamickú sitemap.xml pre všetky stránky a články.",
    "Pridaj 'alt' texty ku všetkým obrázkom pre lepšiu prístupnosť a SEO.",
    "Optimalizuj meta popisy pre lepšiu mieru prekliku (CTR) z Google.",
    "Implementuj kanonické URL, aby sa predišlo duplicitnému obsahu."
  ],
  Bezpečnosť: [
    "Pridaj Content Security Policy (CSP) hlavičky na ochranu pred XSS útokmi.",
    "Aktualizuj všetky závislosti na najnovšie verzie kvôli bezpečnostným opravám.",
    "Zabezpeč formuláre proti CSRF útokom.",
    "Použi 'HttpOnly' a 'Secure' atribúty pre cookies, ak nejaké používaš."
  ],
  UX: [
    "Pridaj breadcrumbs (omrvinkovú navigáciu) na stránke detailu článku.",
    "Zobraz indikátor priebehu čítania článku (scroll progress bar).",
    "Vytvor lepšiu '404 Not Found' stránku s odkazmi na hlavné sekcie.",
    "Umožni používateľom filtrovať články podľa dátumu alebo popularity.",
    "Pridaj tlačidlo 'Späť na vrch' (Back to Top) na dlhších stránkach."
  ]
};

type Category = keyof typeof allSuggestions;

const categoryIcons: Record<Category, React.ElementType> = {
  Funkcionalita: Wrench,
  'Generovanie Funkcií': FunctionSquare,
  Dizajn: Brush,
  Výkon: Rocket,
  SEO: Search,
  Bezpečnosť: Shield,
  UX: UserCheck,
};

const categories = Object.keys(allSuggestions) as Category[];

export const SuggestionsBanner = () => {
  const [currentCategory, setCurrentCategory] = useState<Category>('Funkcionalita');
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [currentSuggestion, setCurrentSuggestion] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const suggestionsForCategory = useMemo(() => allSuggestions[currentCategory], [currentCategory]);

  useEffect(() => {
    if (!isClient) return;

    const getNewSuggestion = () => {
        const randomIndex = Math.floor(Math.random() * suggestionsForCategory.length);
        setCurrentSuggestion(suggestionsForCategory[randomIndex]);
    };
    
    getNewSuggestion();
    const intervalId = setInterval(getNewSuggestion, 7000);

    return () => clearInterval(intervalId);
  }, [isClient, suggestionsForCategory]);

  const resetCategory = () => {
    setCurrentCategory('Funkcionalita');
  }

  if (!isClient) {
    return null;
  }

  const activeCategoryLabel = hoveredCategory || currentCategory;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
        <div className="bg-brand-dark-teal/90 backdrop-blur-sm border border-brand-bright-green/30 text-white rounded-lg shadow-2xl p-4 flex flex-col space-y-3 animate-fade-in-up">
            <div className='flex items-start space-x-3'>
                <div className="flex-shrink-0 pt-1">
                    <Lightbulb className="h-5 w-5 text-brand-bright-green" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-brand-bright-green">Návrh na vylepšenie:</h3>
                    <p className="text-sm text-brand-bg">{currentSuggestion}</p>
                    <button
                        onClick={() => navigator.clipboard.writeText(currentSuggestion)}
                        className="mt-2 text-xs text-left text-slate-400 hover:text-brand-bright-green transition-colors duration-200"
                        title="Kopírovať prompt"
                    >
                        Kopírovať prompt
                    </button>
                </div>
            </div>
            <div className="border-t border-brand-bright-green/20 pt-3">
                 <div className="h-6 mb-1 text-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-bright-green">
                      {activeCategoryLabel}
                    </span>
                 </div>
                <div 
                    className="flex items-center space-x-2 flex-wrap"
                    onMouseLeave={() => setHoveredCategory(null)}
                >
                    {categories.map(category => {
                        const Icon = categoryIcons[category];
                        return (
                            <button 
                                key={category}
                                onClick={() => setCurrentCategory(category)}
                                onMouseEnter={() => setHoveredCategory(category)}
                                title={category}
                                className={`p-2 rounded-full transition-colors ${currentCategory === category ? 'bg-brand-bright-green text-brand-dark-teal' : 'bg-white/10 hover:bg-white/20'}`}
                            >
                                <Icon className="h-4 w-4" />
                            </button>
                        )
                    })}
                     <button 
                        onClick={resetCategory}
                        title="Resetovať kategóriu"
                        className="p-2 rounded-full transition-colors bg-white/10 hover:bg-white/20"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};
