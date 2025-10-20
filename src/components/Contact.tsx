
import { ContactForm } from './ContactForm';
import GlassCard from './GlassCard';
import { Phone, Mail, Building, MapPin } from 'lucide-react';


export default function Contact() {
  return (
    <section id="kontakt" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
             <header className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white text-shadow-3d">
                    Napíšte nám
                </h2>
                <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                    Či už potrebujete nezáväznú cenovú ponuku, alebo máte akékoľvek otázky, sme tu pre vás.
                </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-12">
                <GlassCard>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold mb-6 text-center text-white">Získajte nezáväznú ponuku</h3>
                        <ContactForm />
                    </div>
                </GlassCard>

                <GlassCard>
                    <div className="p-8 flex flex-col justify-center h-full">
                        <h3 className="text-2xl font-bold text-brand-bright-green mb-6 text-center">Naše Kontaktné Údaje</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-300">Sťahovanie</h4>
                                <p className="flex items-center text-lg text-white"><Phone className="w-5 h-5 mr-3 text-brand-bright-green" /> +421 911 275 755 (Miroslav Danihel)</p>
                                <p className="flex items-center text-lg text-white"><Mail className="w-5 h-5 mr-3 text-brand-bright-green" /> info@viandmo.com</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-300">Upratovanie</h4>
                                <p className="flex items-center text-lg text-white"><Phone className="w-5 h-5 mr-3 text-brand-bright-green" /> +421 918 895 730</p>
                            </div>
                            <div className="pt-4 border-t border-white/10">
                                <h4 className="font-bold text-slate-300">Obchodné údaje</h4>
                                <div className="space-y-1 text-slate-300">
                                    <p className="flex items-center text-white"><Building className="w-5 h-5 mr-3 text-brand-bright-green" /> <strong>VI and MO s. r. o.</strong></p>
                                    <p className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-brand-bright-green" /> Karpatské námestie 7770/10A, 831 06 Bratislava - Rača</p>
                                    <p><strong>IČO:</strong> 56 811 322 | <strong>DIČ:</strong> 2122461176</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    </section>
  );
}
