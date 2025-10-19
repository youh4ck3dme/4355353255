import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const navLinks = [
  { href: '/#sluzby', label: 'Sťahovanie bytov' },
  { href: '/#sluzby', label: 'Sťahovanie firiem' },
  { href: '/#sluzby', label: 'Vypratávanie' },
  { href: '/#sluzby', label: 'Upratovanie' },
  { href: '/cennik', label: 'Cenník' },
  { href: '/blog', label: 'Blog' },
];

export const Footer = () => {
  return (
    <footer className="bg-brand-dark-teal text-brand-bg/90 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black tracking-wider text-brand-bright-green">
              Bratislava sťahovanie | VI&MO
            </h3>
            <p className="text-slate-300 text-sm">
              Pevné ruky & poctivý prístup. Váš spoľahlivý partner pre sťahovanie a upratovanie v Bratislave a okolí.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-brand-bright-green transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-brand-bright-green transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">Navigácia</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-300 hover:text-brand-bright-green hover:underline underline-offset-4 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider">Rýchly kontakt</h4>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-300">Sťahovanie</p>
                <p className="text-sm text-slate-400">Miroslav Danihel</p>
                <a href="tel:+421911275755" className="flex items-center space-x-2 text-slate-300 hover:text-brand-bright-green transition-colors group">
                  <Phone size={16} className="text-brand-bright-green/80 group-hover:text-brand-bright-green" />
                  <span>+421 911 275 755</span>
                </a>
              </div>
              <div>
                <p className="font-semibold text-slate-300">Upratovanie</p>
                <p className="text-sm text-slate-400">Barbora Danihelová Huňková</p>
                 <a href="tel:+421918895730" className="flex items-center space-x-2 text-slate-300 hover:text-brand-bright-green transition-colors group">
                  <Phone size={16} className="text-brand-bright-green/80 group-hover:text-brand-bright-green" />
                  <span>+421 918 895 730</span>
                </a>
              </div>
              <div>
                 <a href="mailto:info@viandmo.com" className="flex items-center space-x-2 text-slate-300 hover:text-brand-bright-green transition-colors group">
                  <Mail size={16} className="text-brand-bright-green/80 group-hover:text-brand-bright-green" />
                  <span>info@viandmo.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Business Info */}
          <div className="space-y-4">
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
             <a href="https://viandmo.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-bright-green transition-colors">
              viandmo.com
            </a>
            <span className="text-slate-600">|</span>
            <Link href="/ochrana-sukromia" className="hover:text-brand-bright-green transition-colors">
              Ochrana osobných údajov
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
