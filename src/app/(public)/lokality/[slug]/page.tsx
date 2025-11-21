
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locations } from '@/lib/locations';
import { CheckCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

type LocationPageProps = {
    params: {
        slug: string;
    };
};

// Objekty s unikátnym obsahom pre jednotlivé lokality
const uniqueContent: Record<string, { title: string; paragraphs: string[] }> = {
    'stare-mesto': {
        title: 'Sťahovanie v srdci Bratislavy? Žiadny problém!',
        paragraphs: [
            'Plánujete nový začiatok v pulzujúcom Starom Meste? Dokonale poznáme jeho špecifiká. Úzke uličky, historické budovy často bez výťahov a zložité parkovanie pre nás nie sú prekážkou, ale každodennou výzvou, ktorú s prehľadom zvládneme.',
            'Vďaka našim skúsenostiam s vybavovaním dočasných parkovacích povolení a s využitím menších, no výkonných vozidiel, zabezpečíme, aby sa váš majetok dostal na miesto bezpečne a bez stresu. Nechajte logistiku v centre mesta na nás a vy si užívajte atmosféru historickej Bratislavy.',
        ],
    },
    'petrzalka': {
        title: 'Sťahovanie v Petržalke? Sme na to pripravení!',
        paragraphs: [
            'Petržalka, najväčšie sídlisko na Slovensku, má svoje vlastné pravidlá. Sťahovanie vo výškových panelových domoch si vyžaduje perfektnú organizáciu, rýchlu prácu vo výťahoch a efektívnu logistiku pri parkovaní. A presne na to sme experti.',
            'Náš zohratý tím je zvyknutý na dynamiku veľkého sídliska. Vieme, ako naplánovať prácu tak, aby sme čo najmenej obmedzovali susedov a zároveň presťahovali váš byt rýchlo a efektívne. Či už sa sťahujete na 1. alebo 12. poschodie, s nami to bude bez starostí.',
        ],
    },
    'ruzinov': {
        title: 'Sťahovanie v zelenom Ružinove? Spoľahnite sa na nás.',
        paragraphs: [
            'Ružinov je známy svojou rozmanitosťou – od starších tehlových domov a pokojných dvorov až po moderné novostavby a biznis centrá. Táto rôznorodosť si vyžaduje flexibilný prístup, ktorý je našou silnou stránkou.',
            'Máme skúsenosti so sťahovaním z bytov s úzkymi schodiskami, ako aj s logistikou v nových komplexoch s podzemnými garážami. Prispôsobíme našu techniku a postupy presne podľa charakteru vašej nehnuteľnosti, aby všetko prebehlo hladko a bezpečne.',
        ]
    },
    'default': {
        title: 'Prečo si vybrať nás pre sťahovanie v lokalite {LOCATION_NAME}?',
        paragraphs: [
            'Každá mestská časť má svoje jedinečné výzvy. V lokalite {LOCATION_NAME} si zakladáme na profesionálnom prístupe, spoľahlivosti a férových cenách. Náš tím je pripravený poradiť si s akoukoľvek výzvou, ktorú sťahovanie v tejto oblasti prináša.'
        ]
    }
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

    // Získanie unikátneho obsahu, alebo default ak neexistuje
    const content = uniqueContent[location.id] || uniqueContent.default;
    const populatedContent = {
        title: content.title.replace('{LOCATION_NAME}', location.name),
        paragraphs: content.paragraphs.map(p => p.replace('{LOCATION_NAME}', location.name))
    };


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
                     <GlassCard>
                        <div className="p-6 lg:p-10">
                            <header className="text-center mb-10">
                                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white text-shadow-3d">
                                    Sťahovanie {location.name}
                                </h1>
                                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                                    Váš spoľahlivý partner pre sťahovacie služby v mestskej časti Bratislava - {location.name}.
                                </p>
                            </header>
                            
                            <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
                                {/* START: Sekcia pre unikátny obsah */}
                                <div className="bg-brand-dark-teal/20 dark:bg-brand-dark-teal/60 rounded-lg my-8 p-6">
                                    <h3 className="!mt-0 !text-brand-bright-green">{populatedContent.title}</h3>
                                    {populatedContent.paragraphs.map((p, index) => <p key={index}>{p}</p>)}
                                </div>
                                {/* END: Sekcia pre unikátny obsah */}

                                <h3>Naše hlavné služby v tejto lokalite:</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-6 w-6 mr-3 text-brand-bright-green flex-shrink-0 mt-1" />
                                        <span>Kompletné sťahovanie bytov, domov a kancelárií.</span>
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
                            </div>

                            <div className="mt-12 text-center border-t border-white/10 pt-8 bg-brand-dark-teal/20 dark:bg-brand-dark-teal/60 p-8 rounded-lg">
                                <h2 className="text-2xl font-bold mb-4 text-white">Získajte ponuku na mieru pre {location.name}</h2>
                                <p className="text-slate-300 mb-6">Kontaktujte nás a my vám radi pripravíme nezáväznú cenovú ponuku pre vaše sťahovanie.</p>
                                <Link 
                                    href="/kontakt"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-xl"
                                >
                                    <Phone className="h-5 w-5" /> Kontaktujte nás
                                </Link>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </>
    );
}
