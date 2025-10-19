'use client';
import { useEffect } from 'react';

export default function PWAProvider() {
  useEffect(() => {
    // --- Service Worker register ---
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((e) => console.error('SW register fail', e));
    }

    // --- beforeinstallprompt (custom install UX) ---
    const handler = (e: any) => {
      // zabrániť default bublinovaniu banneru; uložíme event do window
      e.preventDefault();
      (window as any).__deferredInstallPrompt = e;
      document.dispatchEvent(new CustomEvent('viandmo:pwa:install-ready'));
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  return null;
}
