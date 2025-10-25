
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locations } from '@/lib/locations';
import { CheckCircle, Truck, Phone } from 'lucide-react';
import Link from 'next/link';

type LocationPageProps = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    return locations.map(loc => ({
        slug: loc.id,
    }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = locations.find(l => l.id === params.slug);
  
  if (!location) {
    return {
      title: 'Lokalita nenájdená',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://stahovanie.website';
  const locationUrl = `${siteUrl}/lokality/${location.id}`;
  const title = `Sťahovanie ${location.name} | Rýchlo a spoľahlivo | Stahovanie.Website`;
  const description = `Hľadáte profesionálne sťahovanie v lokalite Bratislava - ${location.name}? Ponúkame kompletné sťahovacie služby, od bytov po firmy. Získajte nezáväznú ponuku.`;

  return {
    title,
    description,
    alternates: {
        canonical: locationUrl,
    },
    openGraph: {
        title,
        description,
        url: locationUrl,
        type: 'website',
        images: [
            {
                url: `${siteUrl}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: `Sťahovanie v lokalite ${location.name}`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`${siteUrl}/og-image.jpg`],
    },
  }
}

export default function LocationDetailPage({ params }: LocationPageProps) {
    const location = locations.find(l => l.id === params.slug);
    
    if (!location) {
        notFound();
    }
    
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://stahovanie.website';
    const locationUrl = `${siteUrl}/lokality/${location.id}`;

    const localBusinessJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'MovingCompany',
        name: `Stahovanie.Website - Sťahovanie ${location.name}`,
        url: locationUrl,
        image: `${siteUrl}/og-image.jpg`,
        telephone: '+421 911 275 755',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Karpatské námestie 7770/10A',
            addressLocality: 'Bratislava',
            postalCode: '831 06',
            addressCountry: 'SK'
        },
        areaServed: {
            '@type': 'Place',
            name: `Bratislava - ${location.name}`
        },
        description: `Profesionálne sťahovacie služby pre byty, domy a firmy v lokalite Bratislava - ${location.name}.`,
        priceRange: '€€',
    };

    return (
        <>
             <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />
            <div className="bg-brand-bg text-brand-text dark:bg-brand-dark-teal dark:text-brand-bg">
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 shadow-xl rounded-lg p-6 lg:p-10">
                        <header className="text-center mb-10">
                            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bg text-shadow-3d">
                                Sťahovanie {location.name}
                            </h1>
                            <p className="text-lg text-brand-secondary-grey dark:text-slate-300 max-w-2xl mx-auto">
                                Váš spoľahlivý partner pre sťahovacie služby v mestskej časti Bratislava - {location.name}.
                            </p>
                        </header>
                        
                        <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
                            <p>Plánujete sťahovanie do, z, alebo v rámci lokality <strong>{location.name}</strong>? Náš tím Stahovanie.Website je vám plne k dispozícii. S našimi dlhoročnými skúsenosťami zabezpečíme, aby vaše sťahovanie prebehlo hladko, rýchlo a bez zbytočného stresu. Poznáme špecifiká každej mestskej časti, od dopravnej situácie až po možnosti parkovania.</p>

                            <h3>Naše služby v lokalite {location.name}:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 mr-3 text-brand-bright-green flex-shrink-0 mt-1" />
                                    <span>Kompletné sťahovanie bytov a rodinných domov.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 mr-3 text-brand-bright-green flex-shrink-0 mt-1" />
                                    <span>Sťahovanie kancelárií a firiem s minimálnym dopadom na prevádzku.</span>
                                </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 mr-3 text-brand-bright-green flex-shrink-0 mt-1" />
                                    <span>Bezpečná preprava nábytku, spotrebičov a osobných vecí.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 mr-3 text-brand-bright-green flex-shrink-0 mt-1" />
                                    <span>Vypratávanie priestorov a ekologická likvidácia odpadu.</span>
                                </li>
                            </ul>

                             <h4>Prečo si vybrať nás?</h4>
                             <p>V Stahovanie.Website si zakladáme na profesionálnom prístupe, spoľahlivosti a férových cenách. Náš tím je pripravený poradiť si s akoukoľvek výzvou, ktorú sťahovanie v lokalite {location.name} prináša.</p>
                        </div>

                        <div className="mt-12 text-center border-t border-slate-200 dark:border-slate-700 pt-8 bg-brand-dark-teal/20 dark:bg-brand-dark-teal/60 p-8 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4 text-brand-dark-teal dark:text-brand-bg">Získajte cenovú ponuku na mieru</h2>
                            <p className="text-brand-secondary-grey dark:text-slate-300 mb-6">Kontaktujte nás a my vám radi pripravíme nezáväznú cenovú ponuku pre vaše sťahovanie v lokalite {location.name}.</p>
                            <Link 
                                href="/kontakt"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-xl"
                            >
                                <Phone className="h-5 w-5" /> Kontaktujte nás
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
