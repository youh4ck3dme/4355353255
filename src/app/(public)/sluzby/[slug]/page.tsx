
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/lib/services';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

type ServicePageProps = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    return services.map(service => ({
        slug: service.id,
    }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = services.find(s => s.id === params.slug);
  
  if (!service) {
    return {
      title: 'Služba nenájdená',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const serviceUrl = `${siteUrl}/sluzby/${service.id}`;
  
  return {
    title: `${service.name} | Služby | VI&MO`,
    description: service.description,
    alternates: {
        canonical: serviceUrl,
    }
  }
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
    const service = services.find(s => s.id === params.slug);
    
    if (!service) {
        notFound();
    }
    
    const Icon = service.icon;

    return (
        <div className="bg-brand-bg text-brand-text dark:bg-brand-dark-teal dark:text-brand-bg">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 shadow-xl rounded-lg p-6 lg:p-10">
                    <header className="text-center mb-10">
                        <div className="inline-block bg-brand-bright-green p-4 rounded-full mb-4">
                            <Icon className="h-10 w-10 text-brand-dark-teal" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bg text-shadow-3d">
                            {service.name}
                        </h1>
                        <p className="text-lg text-brand-secondary-grey dark:text-slate-300 max-w-2xl mx-auto">
                            {service.secondaryDescription}
                        </p>
                    </header>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
                        <p>{service.description}</p>

                        <h3>Čo všetko služba zahŕňa:</h3>
                        <ul className="space-y-3">
                            {service.included.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle className="h-6 w-6 mr-3 text-brand-bright-green flex-shrink-0 mt-1" />
                                <span>{feature}</span>
                              </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-12 text-center border-t border-slate-200 dark:border-slate-700 pt-8">
                        <h2 className="text-2xl font-bold mb-4 text-brand-dark-teal dark:text-brand-bg">Máte záujem o túto službu?</h2>
                        <p className="text-brand-secondary-grey dark:text-slate-300 mb-6">Radi vám pripravíme nezáväznú cenovú ponuku presne na mieru.</p>
                        <Link 
                            href="/kontakt"
                            className="inline-block px-8 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-xl"
                        >
                            Kontaktujte nás
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
