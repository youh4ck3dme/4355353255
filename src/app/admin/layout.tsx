'use client';

import { useState, useEffect, FormEvent, ReactNode } from 'react';
import { ShieldCheck, LogIn, Loader2 } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { useFirebase } from '@/firebase/provider';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const ADMIN_EMAIL = "admin@vimo.com";
const PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
const SESSION_STORAGE_KEY = 'admin-authenticated';

function LoginForm({ onLogin, isLoggingIn }: { onLogin: (password: string) => void, isLoggingIn: boolean }) {
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoggingIn) return;
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
                  disabled={isLoggingIn}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 border-2 border-white/20 rounded-lg focus:border-brand-bright-green focus:ring focus:ring-brand-bright-green/50 outline-none transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-slate-400 text-lg text-center"
                  placeholder="• • • • • • • •"
              />
          </div>
          <div>
              <button
                  type="submit"
                  disabled={isLoggingIn || !PASSWORD}
                  className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-wait disabled:transform-none"
              >
                  {isLoggingIn ? (
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


function AuthGuard({ children }: { children: ReactNode }) {
  const { auth, user, isLoading: isFirebaseLoading } = useFirebase();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);


  useEffect(() => {
    if (isFirebaseLoading) return;

    const isAdminSessionActive = typeof window !== 'undefined' && sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
    setIsAuthenticated(!!user && user.email === ADMIN_EMAIL && isAdminSessionActive);
  }, [user, isFirebaseLoading]);

  const handleLogin = async (password: string) => {
    if (!PASSWORD) {
        setError('Heslo pre administrátora nie je nastavené na serveri.');
        return;
    }
    if (!auth) {
        setError('Služba autentifikácie nie je pripravená. Skúste znova o chvíľu.');
        return;
    }

    setError('');
    setIsLoggingIn(true);

    try {
        if (password === PASSWORD) {
             try {
                await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
                sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
                setIsAuthenticated(true);
            } catch (e) {
                console.error("Failed to set sessionStorage or sign in:", e);
                throw new Error("Firebase prihlásenie zlyhalo.");
            }
            setError('');
        } else {
            throw new Error("Nesprávne heslo.");
        }
    } catch (e) {
        setError((e as Error).message || 'Nesprávne heslo. Prístup zamietnutý.');
        console.error("Authentication failed:", e);
        try {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        } catch (sessionError) {
          console.error("Failed to clear sessionStorage:", sessionError);
        }
        setIsAuthenticated(false);
    } finally {
        setIsLoggingIn(false);
    }
  };
  
  if (isFirebaseLoading || isAuthenticated === null) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-brand-dark-teal">
            <Loader2 className="h-16 w-16 animate-spin text-brand-bright-green" />
        </div>
      )
  }

  if (!isAuthenticated) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-brand-dark-teal">
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
                      
                      {error && <p className="text-red-400 text-sm text-center font-bold mb-4">{error}</p>}

                      <LoginForm onLogin={handleLogin} isLoggingIn={isLoggingIn} />
                  </div>
              </GlassCard>
          </div>
        </div>
    );
  }

  return <>{children}</>;
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <AuthGuard>
        <Header />
        <main id="main-content" className="flex-grow bg-brand-bg dark:bg-brand-dark-teal">
          {children}
        </main>
        <Footer />
      </AuthGuard>
  );
}
