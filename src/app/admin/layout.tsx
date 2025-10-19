'use client';

import { useState, useEffect, FormEvent } from 'react';
import { ShieldCheck, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    try {
      if (sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Session storage is not available.');
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isChecking && progress < 100) {
      timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 1, 100));
      }, 20); // Animate over 2 seconds
    }
    return () => clearTimeout(timer);
  }, [isChecking, progress]);

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isChecking) return;

    setError('');
    setIsChecking(true);
    setProgress(1);

    setTimeout(() => {
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
        setError('Nesprávne heslo. Prístup zamietnutý.');
      }
      setIsChecking(false);
      setProgress(0);
    }, 2200); // Wait for animation to finish + a little buffer
  };
  
  if (!isMounted) {
    return null; 
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light-gray dark:bg-brand-dark-teal p-4">
        <div className="w-full max-w-sm mx-auto bg-brand-bg dark:bg-brand-dark-teal/80 rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-white/10">
          <div className="text-center mb-8">
            <ShieldCheck className="mx-auto h-16 w-16 text-brand-bright-green mb-4" />
            <h1 className="text-3xl font-bold text-brand-dark-teal dark:text-brand-bg text-shadow-3d">
              Zabezpečená oblasť
            </h1>
            <p className="text-brand-secondary-grey dark:text-slate-300 mt-2">
              Vyžaduje sa autorizácia
            </p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
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
                disabled={isChecking}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-bright-green 
                           focus:ring focus:ring-brand-bright-green/50 outline-none transition-all duration-300
                           bg-brand-light-gray dark:bg-brand-dark-teal dark:text-brand-bg placeholder-brand-secondary-grey text-lg"
                placeholder="• • • • • • • •"
              />
            </div>

            {isChecking && (
              <div className="space-y-2">
                  <p className="text-sm text-center text-brand-secondary-grey dark:text-slate-400">Overujem prístup... {progress}%</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                      <div 
                          className="bg-brand-bright-green h-2.5 rounded-full transition-all duration-150 ease-linear" 
                          style={{ width: `${progress}%` }}
                      ></div>
                  </div>
              </div>
            )}
            
            {error && !isChecking && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={isChecking}
                className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-wait disabled:transform-none"
              >
                <LogIn size={20} />
                <span>{isChecking ? 'Overujem...' : 'Autorizovať'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
