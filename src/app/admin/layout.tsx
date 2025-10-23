
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { ShieldCheck, LogIn, Loader2 } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { PublicLayout } from '@/components/PublicLayout';
import { useFirebase } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Načítanie hesla z environment premenných.
// V produkcii sa nastavuje na hostingovej platforme (napr. Vercel, Netlify).
const PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
const SESSION_STORAGE_KEY = 'admin-authenticated';

function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="space-y-2">
            <p className="text-sm text-center text-slate-400">Overujem prístup... {progress}%</p>
            <div className="w-full bg-slate-700/50 rounded-full h-2.5">
                <div 
                    className="bg-brand-bright-green h-2.5 rounded-full transition-all duration-150 ease-linear" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}

function LoginForm({ onLogin, isChecking }: { onLogin: (password: string) => void, isChecking: boolean }) {
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isChecking) return;
    onLogin(password);
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
          <div>
              <label htmlFor="password" className="sr-only">Heslo</label>
              <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={isChecking}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 border-2 border-white/20 rounded-lg focus:border-brand-bright-green focus:ring focus:ring-brand-bright-green/50 outline-none transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-slate-400 text-lg text-center"
                  placeholder="• • • • • • • •"
              />
          </div>
          <div>
              <button
                  type="submit"
                  disabled={isChecking || !PASSWORD}
                  className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-wait disabled:transform-none"
              >
                  {isChecking ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Overujem...</span>
                      </>
                  ) : (
                      <>
                        <LogIn size={20} />
                        <span>Autorizovať</span>
                      </>
                  )}
              </button>
               {!PASSWORD && <p className="text-center text-red-400 text-xs mt-2">Admin heslo nie je nastavené v .env</p>}
          </div>
      </form>
  );
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth, isUserLoading } = useFirebase();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check session storage first for quick access
    try {
      if (sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Failed to access sessionStorage:", e);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isChecking && progress < 100) {
      timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 1, 100));
      }, 20); 
    }
    return () => clearTimeout(timer);
  }, [isChecking, progress]);

  const handleLogin = (password: string) => {
    if (!PASSWORD) {
        setError('Heslo pre administrátora nie je nastavené na serveri.');
        return;
    }
    setError('');
    setIsChecking(true);
    setProgress(1);

    setTimeout(() => {
      if (password === PASSWORD) {
        try {
          sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
        } catch (e) {
         console.error("Failed to set sessionStorage:", e);
        }
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Nesprávne heslo. Prístup zamietnutý.');
      }
      setIsChecking(false);
      setProgress(0);
    }, 2200); 
  };
  
  if (isUserLoading) {
      return (
        <PublicLayout>
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-bright-green" />
                    <p className="mt-4 text-slate-300">Inicializujem Firebase...</p>
                </div>
            </div>
        </PublicLayout>
      )
  }

  if (!isAuthenticated) {
    return (
       <PublicLayout>
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-sm mx-auto">
                <GlassCard>
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <ShieldCheck className="mx-auto h-16 w-16 text-brand-bright-green mb-4" />
                            <h1 className="text-3xl font-bold text-white text-shadow-3d">
                            Zabezpečená oblasť
                            </h1>
                            <p className="text-slate-300 mt-2">
                            Vyžaduje sa autorizácia
                            </p>
                        </div>
                        
                        {isChecking && progress > 0 && <ProgressBar progress={progress} />}
                        
                        {!isChecking && error && <p className="text-red-400 text-sm text-center font-bold mb-4">{error}</p>}

                        {!isChecking && <LoginForm onLogin={handleLogin} isChecking={isChecking} />}
                    </div>
                </GlassCard>
            </div>
          </div>
       </PublicLayout>
    );
  }

  return (
     <PublicLayout>
        {children}
      </PublicLayout>
  );
}
