export default function KalkulackaPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
       <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
          Kalkulačka sťahovania
        </h1>
        <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray max-w-3xl mx-auto">
          Zadajte objem, poschodie, vzdialenosť – zobrazíme orientačnú cenu.
        </p>
      </header>
      <div className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-8 rounded-lg shadow-lg">
        <p className="text-center text-brand-secondary-grey dark:text-slate-300">TODO: implementuj kroky a výpočet</p>
      </div>
    </main>
  );
}
