'use client';

import { Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';

const suggestions = [
  "Pridaj na hlavnú stránku sekciu 'Najčítanejšie články'.",
  "Implementuj možnosť filtrovania článkov podľa kategórií (tagov).",
  "Pridaj tlačidlo 'Zdieľať na sociálnych sieťach' do detailu článku.",
  "Vytvor newsletter formulár na prihlásenie sa na odber noviniek.",
  "Optimalizuj obrázky pre rýchlejšie načítanie na mobilných zariadeniach.",
  "Pridaj tmavý a svetlý režim s možnosťou prepínania.",
  "Vytvor kontaktný formulár s validáciou na samostatnej stránke 'Kontakt'.",
  "Pridaj do pätičky mapu s adresou firmy a odkazy na sociálne siete.",
  "Implementuj full-textové vyhľadávanie s našeptávačom.",
  "Vytvor animované prechody medzi stránkami pre lepší používateľský zážitok."
];

export const SuggestionsBanner = () => {
  const [currentSuggestion, setCurrentSuggestion] = useState('');

  useEffect(() => {
    // Set initial suggestion
    setCurrentSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);

    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * suggestions.length);
      setCurrentSuggestion(suggestions[randomIndex]);
    }, 7000); // Change suggestion every 7 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (!currentSuggestion) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
        <div className="bg-brand-dark-teal/90 backdrop-blur-sm border border-brand-bright-green/30 text-white rounded-lg shadow-2xl p-4 flex items-start space-x-3 animate-fade-in-up">
            <div className="flex-shrink-0 pt-1">
                <Lightbulb className="h-5 w-5 text-brand-bright-green" />
            </div>
            <div className='flex flex-col'>
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
    </div>
  );
};

// Simple fade-in animation
const styles = `
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
}
`;

// Inject styles into the document head
if (typeof window !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}
