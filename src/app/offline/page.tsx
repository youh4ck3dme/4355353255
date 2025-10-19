export default function OfflinePage() {
  return (
    <main className="mx-auto max-w-xl p-6 text-center min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-brand-dark-teal dark:text-brand-bright-green">Ste offline</h1>
      <p className="mt-4 text-brand-secondary-grey dark:text-slate-300">
        Niektoré funkcie nie sú dostupné bez internetového pripojenia.
        Základné informácie však môžete prehliadať a po opätovnom pripojení sa obsah automaticky obnoví.
      </p>
      <a href="/" className="mt-8 inline-block px-6 py-3 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md">
        Späť na Domovskú stránku
      </a>
    </main>
  );
}
