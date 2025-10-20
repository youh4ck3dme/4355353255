
'use client';

import { useEffect, useState } from 'react';
import { ArrowDownToLine, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already running in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const beforeInstallPromptHandler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsReady(true);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the PWA installation');
      setIsInstalled(true);
    } else {
      console.log('User dismissed the PWA installation');
    }

    setDeferredPrompt(null);
    setIsReady(false);
  };
  
  if (!isReady || isInstalled) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full px-4 py-2 shadow-lg transition-all duration-300 transform hover:-translate-y-1",
        "bg-brand-dark-teal text-brand-bright-green border-2 border-brand-bright-green",
        "hover:bg-brand-bright-green hover:text-brand-dark-teal",
      )}
      aria-label="Inštalovať aplikáciu"
    >
      <ArrowDownToLine className="h-5 w-5" />
      <span>Inštalovať Appku</span>
    </button>
  );
}
