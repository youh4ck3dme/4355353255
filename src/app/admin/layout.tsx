'use client';

import { useState, useEffect, FormEvent, ReactNode } from 'react';
import { ShieldCheck, LogIn, Loader2, UserCheck, UserX, MailQuestion } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { useFirebase } from '@/firebase/provider';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const ADMIN_EMAIL = "admin@vimo.com";

function LoginForm({ 
  onLogin, 
  onPasswordReset, 
  isLoggingIn, 
  isSendingReset,
  error 
}: { 
  onLogin: (email: string, pass: string) => void, 
  onPasswordReset: (email: string) => void,
  isLoggingIn: boolean,
  isSendingReset: boolean,
  error: string
}) {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoggingIn || isSendingReset) return;
    onLogin(email, password);
  }

  const handlePasswordReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoggingIn || isSendingReset) return;
    onPasswordReset(email);
  }

  const inputStyle = "w-full p-3 border-2 border-white/20 rounded-lg focus:border-brand-bright-green focus:ring focus:ring-brand-bright-green/50 outline-none transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-slate-400 text-center";

  if (showPasswordReset) {
    return (
      <form onSubmit={handlePasswordReset} className="space-y-4">
        <p className="text-sm text-center text-slate-300">Zadajte e-mailovú adresu vášho administrátorského účtu. Pošleme vám odkaz na obnovenie hesla.</p>
        <div>
          <label htmlFor="email_reset" className="sr-only">E-mail</label>
          <input
              id="email_reset"
              type="email"
              required
              disabled={isSendingReset}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyle}
              placeholder="admin@vimo.com"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isSendingReset || isLoggingIn}
            className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
          >
            {isSendingReset ? (
                <><Loader2 className="animate-spin" size={20} /><span>Posielam...</span></>
            ) : (
                <><MailQuestion size={20} /><span>Odoslať odkaz</span></>
            )}
          </button>
        </div>
        <button type="button" onClick={() => setShowPasswordReset(false)} className="w-full text-center text-sm text-slate-400 hover:text-white underline">Späť na prihlásenie</button>
      </form>
    );
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label htmlFor="email" className="sr-only">E-mail</label>
              <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={isLoggingIn}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(inputStyle, "hidden")} // Hidden as it defaults to admin
                  placeholder="admin@vimo.com"
              />
          </div>
          <div>
              <label htmlFor="password" className="sr-only">Heslo</label>
              <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={isLoggingIn}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputStyle}
                  placeholder="• • • • • • • •"
              />
          </div>
          {error && <p className="text-red-400 text-sm text-center font-bold">{error}</p>}
          <div>
              <button
                  type="submit"
                  disabled={isLoggingIn || isSendingReset}
                  className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-wait disabled:transform-none"
              >
                  {isLoggingIn ? (
                      <><Loader2 className="animate-spin" size={20} /><span>Overujem...</span></>
                  ) : (
                      <><LogIn size={20} /><span>Autorizovať</span></>
                  )}
              </button>
          </div>
          <div className="text-center">
            <button type="button" onClick={() => setShowPasswordReset(true)} className="text-sm text-slate-400 hover:text-white underline">Zabudli ste heslo?</button>
          </div>
      </form>
  );
}


function AuthGuard({ children }: { children: ReactNode }) {
  const { auth, user, isLoading: isFirebaseLoading } = useFirebase();
  const { toast } = useToast();
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    if (!auth) {
        setError('Služba autentifikácie nie je pripravená.');
        return;
    }
    setError('');
    setIsLoggingIn(true);
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        const firebaseError = e as { code?: string };
        let errorMessage = 'Neznáma chyba pri prihlasovaní.';
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
        }
        setError(errorMessage);
    } finally {
        setIsLoggingIn(false);
    }
  };

  const handlePasswordReset = async (email: string) => {
    if (!auth) {
      toast({ variant: 'destructive', title: 'Služba autentifikácie nie je pripravená.' });
      return;
    }
    setIsSendingReset(true);
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      toast({ variant: 'success', title: 'Odkaz na obnovu odoslaný', description: `Skontrolujte si e-mailovú schránku na adrese ${email}.` });
    } catch(e) {
      toast({ variant: 'destructive', title: 'Chyba pri odosielaní', description: 'Nepodarilo sa odoslať odkaz na obnovu. Skontrolujte e-mailovú adresu.' });
    } finally {
      setIsSendingReset(false);
    }
  };
  
  if (isFirebaseLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-brand-dark-teal">
            <Loader2 className="h-16 w-16 animate-spin text-brand-bright-green" />
        </div>
      )
  }

  if (!user) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-brand-dark-teal">
          <div className="w-full max-w-sm mx-auto">
              <GlassCard className="p-8">
                  <div className="text-center mb-8">
                      <ShieldCheck className="mx-auto h-16 w-16 text-brand-bright-green mb-4" />
                      <h1 className="text-3xl font-bold text-white text-shadow-3d">
                      Zabezpečená oblasť
                      </h1>
                      <p className="text-slate-300 mt-2">
                      Vyžaduje sa prihlásenie administrátora
                      </p>
                  </div>
                  
                  <LoginForm 
                    onLogin={handleLogin} 
                    onPasswordReset={handlePasswordReset}
                    isLoggingIn={isLoggingIn}
                    isSendingReset={isSendingReset}
                    error={error}
                  />
              </GlassCard>
          </div>
        </div>
    );
  }

  if (user.email !== ADMIN_EMAIL) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-brand-dark-teal">
          <div className="w-full max-w-sm mx-auto">
              <GlassCard className="p-8 text-center">
                  <UserX className="mx-auto h-16 w-16 text-red-400 mb-4" />
                  <h1 className="text-3xl font-bold text-white text-shadow-3d">
                    Prístup zamietnutý
                  </h1>
                  <p className="text-slate-300 mt-2">
                    Táto sekcia je dostupná len pre administrátorov.
                  </p>
                  {auth && <button onClick={() => signOut(auth)} className="mt-6 text-sm text-brand-bright-green underline">Odhlásiť sa</button>}
              </GlassCard>
          </div>
        </div>
    );
  }

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
