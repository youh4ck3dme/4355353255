'use client';

import { useEffect } from 'react';
import { app } from '@/lib/firebase-client';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

export function FirebaseClientInitializer() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize App Check
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (siteKey) {
        try {
          initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(siteKey),
            isTokenAutoRefreshEnabled: true,
          });
          console.log('App Check initialized.');
        } catch (error) {
          console.error("Failed to initialize App Check:", error);
        }
      } else {
        console.warn("ReCaptcha site key not found, App Check not initialized.");
      }

      // Initialize Analytics
      isSupported().then((supported) => {
        if (supported) {
          getAnalytics(app);
          console.log('Firebase Analytics initialized.');
        }
      });
    }
  }, []);

  return null; // This component does not render anything
}
