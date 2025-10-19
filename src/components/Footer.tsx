
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

const footerLinks = [
  { href: '/', label: 'Domov' },
  { href: '/sluzby', label: 'Služby' },
  { href: '/cennik', label: 'Cenník' },
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/ochrana-sukromia', label: 'Ochrana osobných údajov' },
];

export const Footer = () => {
  return (
    <footer className="bg-black text-brand-bg/90 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          
          {/* Column 1: Rýchly kontakt */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">Rýchly kontakt</h4>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-300">Sťahovanie</p>
                <p className="text-sm text-slate-400">Miroslav Danihel</p>
                <a href="tel:+421911275755" className="liquid-glass-button flex items-center justify-center md:justify-start space-x-2 text-slate-300 hover:text-brand-bright-green transition-colors group">
                  <Phone size={16} className="text-brand-bright-green/80 group-hover:text-brand-bright-green" />
                  <span>+421 911 275 755</span>
                </a>
              </div>
              <div>
                <p className="font-semibold text-slate-300">Upratovanie</p>
                <p className="text-sm text-slate-400">Barbora Danihelová Huňková</p>
                 <a href="tel:+421918895730" className="liquid-glass-button flex items-center justify-center md:justify-start space-x-2 text-slate-300 hover:text-brand-bright-green transition-colors group">
                  <Phone size={16} className="text-brand-bright-green/80 group-hover:text-brand-bright-green" />
                  <span>+421 918 895 730</span>
                </a>
              </div>
              <div>
                 <a href="mailto:info@viandmo.com" className="liquid-glass-button flex items-center justify-center md:justify-start space-x-2 text-slate-300 hover:text-brand-bright-green transition-colors group">
                  <Mail size={16} className="text-brand-bright-green/80 group-hover:text-brand-bright-green" />
                  <span>info@viandmo.com</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 2: Navigácia */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">Navigácia</h4>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="liquid-glass-button text-slate-300 hover:text-brand-bright-green hover:underline underline-offset-4 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Business Info */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">Fakturačné údaje</h4>
            <address className="not-italic text-sm text-slate-300 space-y-1">
              <p className="font-bold">VI and MO s. r. o.</p>
              <p>Karpatské námestie 7770/10A</p>
              <p>831 06 Bratislava - Rača</p>
              <p>Slovensko</p>
              <p className="pt-2"><strong>IČO:</strong> 56 811 322</p>
              <p><strong>DIČ:</strong> 2122461176</p>
            </address>
          </div>

        </div>

        {/* Sub-footer */}
        <div className="border-t border-white/10 pt-6 mt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} VI&MO S.R.O. Všetky práva vyhradené.</p>
          <div className="mt-2 space-x-4">
             <a href="https://viandmo.com" target="_blank" rel="noopener noreferrer" className="liquid-glass-button hover:text-brand-bright-green transition-colors">
              viandmo.com
            </a>
            <span className="text-slate-600">|</span>
            <Link href="/ochrana-sukromia" className="liquid-glass-button hover:text-brand-bright-green transition-colors">
              Ochrana osobných údajov
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
