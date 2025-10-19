'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const Header = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Domov' },
    { href: '/blog', label: 'Články' },
    { href: '/cennik', label: 'Cenník' },
    { href: '/o-nas', label: 'O nás' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-dark-teal/95 backdrop-blur-sm shadow-medium text-brand-bg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-wider text-brand-bright-green hover:opacity-90 transition-opacity" aria-label="Domov - Bratislava sťahovanie | VI&MO">
          Bratislava sťahovanie | VI&MO
        </Link>
        <nav className="hidden sm:flex items-center space-x-6">
          {navLinks.map(link => (
            <Link 
              key={link.href}
              href={link.href} 
              className={cn(
                "relative text-lg hover:text-brand-bright-green transition-colors pb-1",
                { "text-brand-bright-green": pathname === link.href }
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-bright-green animate-fade-in"></span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
