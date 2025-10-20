
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Phone, Mail, Building, MapPin } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

const DynamicContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { ssr: false });

export const metadata: Metadata = {
  title: 'Kontakt | Nezáväzná cenová ponuka | VI&MO',
  description: 'Kontaktujte nás pre bezplatnú a nezáväznú cenovú ponuku na sťahovanie alebo upratovanie. Sme tu pre vás - telefonicky, emailom alebo cez kontaktný formulár.',
};

export default function ContactPage() {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'VI and MO s. r. o.',
    image: `${siteUrl}/images/f27ddb6a-9fbe-4410-946b-766230e10a60.png`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+421 911 275 755',
    email: 'info@viandmo.com',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Karpatské námestie 7770/10A',
      addressLocality: 'Bratislava - Rača',
      postalCode: '831 06',
      addressCountry: 'SK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.2045, 
      longitude: 17.1537
    },
     openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ],
          opens: '00:00',
          closes: '23:59'
        }
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white text-shadow-3d">
            Kontaktujte nás
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Či už potrebujete nezáväznú cenovú ponuku, alebo máte akékoľvek otázky, sme tu pre vás. Vyplňte formulár, zavolajte nám, alebo napíšte e-mail.
          </p>
        </header>

        <section id="kontakt" className="grid lg:grid-cols-2 gap-12">
           <GlassCard>
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Sťahujete sa? Napíšte nám.</h2>
                <DynamicContactForm />
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
        </section>
      </div>
    </>
  );
}
