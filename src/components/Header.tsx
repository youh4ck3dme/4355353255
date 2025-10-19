'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const Header = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Domov' },
    { href: '/blog', label: 'Články' },
    { href: '/o-nas', label: 'O nás' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-dark-teal shadow-lg text-brand-bg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-wider text-brand-bright-green" aria-label="Domov - VI&MO Blog">
          VI&MO Blog
        </Link>
        <nav className="flex items-center space-x-6">
          {navLinks.map(link => (
            <Link 
              key={link.href}
              href={link.href} 
              className={cn(
                "text-lg hover:text-brand-bright-green transition-colors pb-1",
                { "border-b-2 border-brand-bright-green text-brand-bright-green": pathname === link.href }
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
