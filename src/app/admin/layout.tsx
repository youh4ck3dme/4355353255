'use client';

import { useState, useEffect, FormEvent } from 'react';
import { ShieldCheck, LogIn, Loader2 } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { PublicLayout } from '@/components/PublicLayout';
import { signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';


// Načítanie hesla z environment premenných.
const ADMIN_EMAIL = "admin@vimo.com"; // Fiktívny email pre admina
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // onAuthStateChanged is the most reliable way to check the user's status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        try {
          if (user && sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true') {
              setIsAuthenticated(true);
          } else {
              setIsAuthenticated(false);
          }
        } catch (e) {
          console.error("Failed to access sessionStorage:", e);
          setIsAuthenticated(false);
        } finally {
            setIsChecking(false);
        }
    });

    return () => unsubscribe();
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

  const handleLogin = async (password: string) => {
    if (!PASSWORD) {
        setError('Heslo pre administrátora nie je nastavené na serveri.');
        return;
    }
    setError('');
    setIsChecking(true);
    setProgress(1);

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
        if (password === PASSWORD) {
             try {
                // Sign in to firebase to get a token for API calls
                await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
                sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
            } catch (e) {
                console.error("Failed to set sessionStorage or sign in:", e);
                // If firebase sign-in fails, don't authenticate the user
                throw new Error("Firebase prihlásenie zlyhalo.");
            }
            setIsAuthenticated(true);
            setError('');
        } else {
            throw new Error("Nesprávne heslo.");
        }
    } catch (e) {
        setError((e as Error).message || 'Nesprávne heslo. Prístup zamietnutý.');
        console.error("Authentication failed:", e);
        // Clear session storage on failed login attempt
        try {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        } catch (sessionError) {
          console.error("Failed to clear sessionStorage:", sessionError);
        }
    } finally {
        setIsChecking(false);
        setProgress(0);
    }
  };
  
  if (isChecking) {
      return (
         <PublicLayout>
            <div className="min-h-screen flex items-center justify-center p-4">
                <Loader2 className="h-16 w-16 animate-spin text-brand-bright-green" />
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
                        
                        {progress > 0 && <ProgressBar progress={progress} />}
                        
                        {error && !progress && <p className="text-red-400 text-sm text-center font-bold mb-4">{error}</p>}

                        {!progress && <LoginForm onLogin={handleLogin} isChecking={isChecking} />}
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
