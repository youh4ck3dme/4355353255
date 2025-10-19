export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
          Najčastejšie otázky
        </h1>
        <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray max-w-3xl mx-auto">
            Stále si nie ste istý? Tu nájdete odpovede na všetko podstatné.
        </p>
      </header>
      <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-8 rounded-lg shadow-lg">
          <ul className="list-disc pl-6 space-y-4 text-brand-secondary-grey dark:text-slate-300">
            <li>Koľko stojí sťahovanie v Bratislave?</li>
            <li>Čo ak v dome nie je výťah?</li>
            <li>Aké sú termíny a víkendy?</li>
          </ul>
      </div>
    </main>
  );
}
