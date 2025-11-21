'use client';

import { useState, useEffect, FormEvent, ReactNode } from 'react';
import { ShieldCheck, LogIn, Loader2, UserCheck, UserX } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { useFirebase } from '@/firebase/provider';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const ADMIN_EMAIL = "admin@vimo.com";

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
                  disabled={isLoggingIn}
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
          </div>
      </form>
  );
}


function AuthGuard({ children }: { children: ReactNode }) {
  const { auth, user, isLoading: isFirebaseLoading } = useFirebase();
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (password: string) => {
    if (!auth) {
        setError('Služba autentifikácie nie je pripravená. Skúste znova o chvíľu.');
        return;
    }

    setError('');
    setIsLoggingIn(true);

    try {
        await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
        setError('');
    } catch (e) {
        const firebaseError = e as { code?: string; message: string };
        let errorMessage = 'Neznáma chyba pri prihlasovaní.';
        if (firebaseError.code) {
          switch (firebaseError.code) {
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
              errorMessage = 'Nesprávne heslo alebo e-mail.';
              break;
            case 'auth/user-not-found':
              errorMessage = 'Používateľ s týmto e-mailom neexistuje.';
              break;
            case 'auth/too-many-requests':
              errorMessage = 'Príliš veľa neúspešných pokusov. Skúste to neskôr.';
              break;
            default:
              errorMessage = firebaseError.message;
          }
        } else {
            errorMessage = firebaseError.message;
        }
        setError(`Prihlásenie zlyhalo: ${errorMessage}`);
    } finally {
        setIsLoggingIn(false);
    }
  };
  
  if (isFirebaseLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-brand-dark-teal">
            <Loader2 className="h-16 w-16 animate-spin text-brand-bright-green" />
        </div>
      )
  }

  // User is not logged in at all
  if (!user) {
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
                          Vyžaduje sa prihlásenie administrátora
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

  // User is logged in, but is not the admin user
  if (user.email !== ADMIN_EMAIL) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-brand-dark-teal">
          <div className="w-full max-w-sm mx-auto">
              <GlassCard>
                  <div className="p-8 text-center">
                      <UserX className="mx-auto h-16 w-16 text-red-400 mb-4" />
                      <h1 className="text-3xl font-bold text-white text-shadow-3d">
                        Prístup zamietnutý
                      </h1>
                      <p className="text-slate-300 mt-2">
                        Táto sekcia je dostupná len pre administrátorov.
                      </p>
                      {auth && <button onClick={() => signOut(auth)} className="mt-6 text-sm text-brand-bright-green underline">Odhlásiť sa</button>}
                  </div>
              </GlassCard>
          </div>
        </div>
    );
  }

  // User is logged in and has the correct email, show admin content
  return (
    <>
      {children}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="flex items-center gap-2 text-xs bg-black/50 text-white p-2 rounded-lg backdrop-blur-sm">
          <UserCheck className="h-4 w-4 text-green-400"/>
          <span>Prihlásený ako admin</span>
          <button onClick={() => auth && signOut(auth)} className="ml-2 font-bold hover:underline text-red-400">Odhlásiť</button>
        </div>
      </div>
    </>
  );
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-dark-teal text-white">
      <AuthGuard>
          {children}
      </AuthGuard>
    </div>
  );
}
