
import Link from 'next/link';
import type { Service } from '@/lib/services';

interface ServicesProps {
    services: Service[];
}

export default function Services({ services }: ServicesProps) {
  return (
    <section id="sluzby" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-shadow-3d">
                Naše Služby
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                Od jednoduchého prevozu nábytku až po komplexné sťahovanie firiem. Všetko s profesionálnym prístupom.
            </p>
        </header>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.id} href={`/sluzby/${service.id}`} className="block group">
                <div className="bg-black/20 backdrop-blur-lg border border-white/10 p-6 rounded-2xl text-center h-full flex flex-col items-center justify-start transition-all duration-300 hover:bg-white/10 hover:border-white/20 transform hover:-translate-y-2">
                    <div className="bg-brand-bright-green/20 p-4 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-8 w-8 text-brand-bright-green" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 h-14 flex items-center">{service.name}</h3>
                    <p className="text-sm text-slate-400 flex-grow">{service.shortDescription}</p>
                    <span className="mt-4 text-sm font-bold text-brand-bright-green group-hover:underline underline-offset-4">
                        Viac info
                    </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
