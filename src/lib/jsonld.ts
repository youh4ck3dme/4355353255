export function serviceJsonLd(serviceType: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    areaServed: 'Bratislava',
    provider: {
      '@type': 'MovingCompany',
      name: 'VI&MO – Sťahovanie Bratislava',
      url: 'https://app.viandmo.com'
    }
  };
}
