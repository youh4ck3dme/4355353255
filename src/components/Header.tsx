'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Menu, X, KeyRound } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Domov' },
    { href: '/blog', label: 'Články' },
    { href: '/cennik', label: 'Cenník' },
    { href: '/o-nas', label: 'O nás' },
  ];

  useEffect(() => {
    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);
  
  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);


  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-sm shadow-medium text-brand-text">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity" aria-label="Domov - VI&MO">
            <Image 
              src="/images/viandmo-logo.svg" 
              alt="VI&MO Logo" 
              width={120} 
              height={40} 
              priority 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link 
                key={link.href}
                href={link.href} 
                className={cn(
                  "relative text-lg text-brand-text hover:text-brand-bright-green transition-colors pb-1",
                  { "text-brand-bright-green font-bold": pathname === link.href }
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-bright-green animate-fade-in"></span>
                )}
              </Link>
            ))}
             <Link href="/admin" aria-label="Admin Login" className={cn("relative text-brand-text hover:text-brand-bright-green transition-colors pb-1 pl-4", { "text-brand-bright-green": pathname.startsWith('/admin') })}>
                <KeyRound size={22} />
                {pathname.startsWith('/admin') && (
                  <span className="absolute bottom-0 left-4 w-[22px] h-0.5 bg-brand-bright-green animate-fade-in"></span>
                )}
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-brand-dark-teal hover:text-brand-bright-green transition-colors"
              aria-label="Otvoriť menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-brand-dark-teal/95 backdrop-blur-lg transition-opacity duration-500 sm:hidden",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 h-full flex flex-col">
          <div className="h-16 flex items-center justify-between">
             <Link href="/" className="flex items-center">
              <Image 
                src="/images/viandmo-logo-white.svg" 
                alt="VI&MO Logo" 
                width={120} 
                height={40}
                priority
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-brand-bright-green hover:text-white transition-colors"
              aria-label="Zavrieť menu"
            >
              <X size={32} />
            </button>
          </div>
          
          <nav className="flex flex-col items-center justify-center flex-grow space-y-8">
            {navLinks.map((link, index) => (
              <Link 
                key={link.href}
                href={link.href}
                className={cn(
                  "text-3xl font-bold transition-all duration-300",
                  pathname === link.href ? "text-brand-bright-green" : "text-brand-bg hover:text-brand-bright-green",
                  isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {link.label}
              </Link>
            ))}
             <Link 
                href="/admin"
                aria-label="Admin Login"
                className={cn(
                  "flex items-center gap-2 text-3xl font-bold transition-all duration-300 mt-4",
                  pathname.startsWith('/admin') ? "text-brand-bright-green" : "text-brand-bg hover:text-brand-bright-green",
                  isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
                )}
                style={{ transitionDelay: `${navLinks.length * 100}ms` }}
              >
                <KeyRound size={28} /> Admin
              </Link>
          </nav>
        </div>
      </div>
    </>
  );
};
