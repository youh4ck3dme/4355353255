

import Link from "next/link";
import GlassCard from "./GlassCard";


export default function Contact() {
  return (
    <section id="kontakt" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <GlassCard className="bg-brand-bright-green/10 p-8 md:p-12 rounded-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white text-shadow-3d">
                    Pripravení na zmenu?
                </h2>
                <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                    Kontaktujte nás pre nezáväznú cenovú ponuku a nechajte starosti na nás. Sme tu pre vás 7 dní v týždni.
                </p>
                <div className="mt-8">
                    <Link 
                        href="/kontakt"
                        className="glass-button inline-block px-8 py-4 font-bold rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                        Získať cenovú ponuku
                    </Link>
                </div>
            </GlassCard>
        </div>
    </section>
  );
}
