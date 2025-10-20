

'use client';

import { useState, useEffect, FormEvent } from 'react';
import { ShieldCheck, LogIn } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

const PASSWORD = '23513900';
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
                  disabled={isChecking}
                  className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-wait disabled:transform-none"
              >
                  <LogIn size={20} />
                  <span>{isChecking ? 'Overujem...' : 'Autorizovať'}</span>
              </button>
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
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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

  const handleLogin = (password: string) => {
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
      } else {
        setError('Nesprávne heslo. Prístup zamietnutý.');
      }
      setIsChecking(false);
      setProgress(0);
    }, 2200); 
  };
  
  if (!isAuthenticated) {
    return (
      <div className="bg-brand-dark-teal min-h-screen flex items-center justify-center p-4">
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
                    
                    {isChecking && <ProgressBar progress={progress} />}
                    
                    {!isChecking && error && <p className="text-red-400 text-sm text-center font-bold mb-4">{error}</p>}

                    {!isChecking && <LoginForm onLogin={handleLogin} isChecking={isChecking} />}
                </div>
            </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-dark-teal">
       <div className="liquid-glass-background">
          <div className="bg-orbs">
              <div className="orb"></div>
              <div className="orb"></div>
              <div className="orb"></div>
          </div>
      </div>
       <div className="relative z-10">{children}</div>
    </div>
  );
}
