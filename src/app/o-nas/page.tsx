import Image from 'next/image';
import { Metadata } from 'next';
import { Users, Target, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'O nás | VI&MO Blog',
  description: 'Zistite viac o firme VI&MO. Náš príbeh, hodnoty a tím, ktorý poskytuje kvalitné sťahovacie a upratovacie služby v Bratislave.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bright-green">
          O spoločnosti VI&MO
        </h1>
        <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray max-w-3xl mx-auto">
          Vaši spoľahliví partneri pre sťahovanie a upratovanie v Bratislave a okolí.
        </p>
      </header>

      <section className="mb-16">
        <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="https://picsum.photos/seed/vimo-team/1200/800"
            alt="Tím VI&MO pri práci"
            fill
            className="object-cover"
            data-ai-hint="team working"
          />
          <div className="absolute inset-0 bg-brand-dark-teal/50" />
        </div>
      </section>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-brand-dark-teal dark:text-brand-bg">Náš príbeh</h2>
            <p className="text-brand-secondary-grey dark:text-slate-300 mb-4">
              Spoločnosť VI&MO vznikla z jednoduchej myšlienky: poskytovať sťahovacie a upratovacie služby, na ktoré sa môžete naozaj spoľahnúť. Po rokoch skúseností v odbore sme sa rozhodli založiť vlastnú firmu, ktorá stavia na hodnotách profesionality, dôvery a stopercentnej orientácie na zákazníka.
            </p>
            <p className="text-brand-secondary-grey dark:text-slate-300">
              Od nášho založenia sme pomohli stovkám rodín a firiem s bezproblémovým presunom a zabezpečili dokonale čisté priestory. Naša cesta je dláždená spokojnosťou našich klientov a neustálou snahou zlepšovať sa.
            </p>
          </div>
          <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-xl">
             <Image
                src="https://picsum.photos/seed/vimo-van/800/600"
                alt="Sťahovacie vozidlo VI&MO"
                fill
                className="object-cover"
                data-ai-hint="moving van"
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-light-gray dark:bg-brand-dark-teal/80 rounded-lg p-8 md:p-12 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-brand-dark-teal dark:text-brand-bg">Naša misia a hodnoty</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-brand-bright-green p-4 rounded-full mb-4">
              <Users className="h-8 w-8 text-brand-dark-teal" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-brand-dark-teal dark:text-brand-bg">Zákazník na prvom mieste</h3>
            <p className="text-brand-secondary-grey dark:text-slate-300 text-sm">Každý projekt je pre nás jedinečný. Počúvame vaše potreby a prispôsobujeme naše služby tak, aby sme prekonali vaše očakávania.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-brand-bright-green p-4 rounded-full mb-4">
              <Target className="h-8 w-8 text-brand-dark-teal" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-brand-dark-teal dark:text-brand-bg">Spoľahlivosť a efektivita</h3>
            <p className="text-brand-secondary-grey dark:text-slate-300 text-sm">Dodržiavame termíny a pracujeme systematicky. Váš čas je pre nás cenný, a preto garantujeme hladký a rýchly priebeh služieb.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-brand-bright-green p-4 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-brand-dark-teal" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-brand-dark-teal dark:text-brand-bg">Dôraz na detail</h3>
            <p className="text-brand-secondary-grey dark:text-slate-300 text-sm">Či už ide o balenie krehkého porcelánu alebo čistenie ťažko dostupných miest, naša práca je precízna a dôkladná.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
