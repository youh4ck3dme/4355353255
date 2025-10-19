
'use client';

import { useEffect, useState } from 'react';
import { ArrowDownToLine, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InstallPrompt() {
  const [ready, setReady] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      return;
    }

    const onReady = () => setReady(true);
    document.addEventListener('viandmo:pwa:install-ready', onReady);
    return () => document.removeEventListener('viandmo:pwa:install-ready', onReady);
  }, []);

  const onInstall = async () => {
    const promptEvt = (window as any).__deferredInstallPrompt;
    if (!promptEvt) return;

    setInstalling(true);
    
    try {
        await promptEvt.prompt();
        const choiceResult = await promptEvt.userChoice;
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
            setInstalled(true);
        } else {
            console.log('User dismissed the install prompt');
        }
    } catch (error) {
        console.error('Error during install prompt:', error);
    } finally {
        (window as any).__deferredInstallPrompt = null;
        setInstalling(false);
        setReady(false);
    }
  };

  if (!ready || installed) return null;

  return (
    <button
      onClick={onInstall}
      disabled={installing}
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full px-4 py-2 shadow-lg transition-all duration-300 transform hover:-translate-y-1",
        "bg-brand-dark-teal text-brand-bright-green border-2 border-brand-bright-green",
        "hover:bg-brand-bright-green hover:text-brand-dark-teal",
        "disabled:opacity-50 disabled:cursor-wait"
      )}
      aria-label="Pridať aplikáciu na domovskú obrazovku"
    >
      {installing ? (
          <>
            <Check className="h-5 w-5 animate-pulse" />
            <span>Inštalujem...</span>
          </>
      ) : (
          <>
            <ArrowDownToLine className="h-5 w-5" />
            <span>Inštalovať Appku</span>
          </>
      )}
    </button>
  );
}
