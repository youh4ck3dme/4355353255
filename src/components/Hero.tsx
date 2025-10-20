
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center text-center text-white px-4">
      <div className="relative z-10 animate-fade-in text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-shadow-3d-dark">
          Sťahovanie bez starostí
        </h1>
        <p className="text-2xl md:text-3xl font-light text-slate-200 text-shadow-md">
          Pevné ruky & poctivý prístup
        </p>
        <Link href="/sluzby" className="glass-button mt-8 inline-flex items-center px-8 py-4 font-bold rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
            Naše Služby <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
        </Link>
      </div>
    </section>
  );
}
