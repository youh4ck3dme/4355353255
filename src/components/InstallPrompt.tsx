'use client';
import { useEffect, useState } from 'react';

export default function InstallPrompt() {
  const [ready, setReady] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    const onReady = () => setReady(true);
    document.addEventListener('viandmo:pwa:install-ready', onReady);
    return () => document.removeEventListener('viandmo:pwa:install-ready', onReady);
  }, []);

  const onInstall = async () => {
    const promptEvt = (window as any).__deferredInstallPrompt;
    if (!promptEvt) return;
    setInstalling(true);
    await promptEvt.prompt();
    // voliteľne: skontroluj výsledok
    (window as any).__deferredInstallPrompt = null;
    setInstalling(false);
    setReady(false);
  };

  if (!ready) return null;
  return (
    <button
      onClick={onInstall}
      className="fixed bottom-4 right-4 rounded-xl px-4 py-2 shadow-lg"
      aria-label="Pridať aplikáciu"
    >
      {installing ? 'Inštalujem…' : 'Pridať ako appku'}
    </button>
  );
}
