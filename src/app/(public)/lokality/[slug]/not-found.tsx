import GlassCard from '@/components/GlassCard';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-[70vh] flex flex-col justify-center items-center">
      <GlassCard className="p-8 md:p-12 text-center">
        <h1 className="text-9xl font-extrabold text-brand-bright-green tracking-tighter text-shadow-3d">404</h1>
        <h2 className="text-4xl font-bold my-4 text-white">Lokalita nenájdená</h2>
        <p className="text-xl text-slate-300 mb-8">
          Ľutujeme, ale lokalita, ktorú hľadáte, neexistuje alebo bola presunutá.
        </p>
        <Link 
          href="/lokality"
          className="glass-button inline-block px-8 py-4 font-bold rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Späť na prehľad lokalít
        </Link>
      </GlassCard>
    </div>
  );
}
