'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, LogIn } from 'lucide-react';

const PASSWORD = '23513900';
const SESSION_STORAGE_KEY = 'admin-authenticated';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // We need to wait for the component to mount before accessing sessionStorage
    setIsMounted(true);
    try {
      if (sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Session storage is not available.');
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === PASSWORD) {
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      } catch (e) {
        console.error('Session storage is not available.');
      }
      setIsAuthenticated(true);
      setError('');
      setPassword('');
    } else {
      setError('Nesprávne heslo. Skúste to znova.');
    }
  };
  
  // Render nothing until we've checked the session storage to prevent flash of login form
  if (!isMounted) {
    return null; 
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light-gray dark:bg-brand-dark-teal p-4">
        <div className="w-full max-w-sm mx-auto bg-brand-bg dark:bg-brand-dark-teal/80 rounded-lg shadow-xl p-8">
          <div className="text-center mb-6">
            <ShieldCheck className="mx-auto h-12 w-12 text-brand-bright-green" />
            <h1 className="text-2xl font-bold mt-4 text-brand-dark-teal dark:text-brand-bg">
              Zabezpečená oblasť
            </h1>
            <p className="text-brand-secondary-grey dark:text-slate-300">
              Pre prístup zadajte heslo.
            </p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="sr-only"
              >
                Heslo
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-bright-green 
                           focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors 
                           bg-brand-bg dark:bg-brand-dark-teal dark:text-brand-bg placeholder-brand-secondary-grey"
                placeholder="Heslo"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md"
              >
                <LogIn size={18} />
                Vstúpiť
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
