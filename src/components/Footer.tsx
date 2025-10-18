export const Footer = () => {
  return (
    <footer className="mt-12 py-8 bg-brand-dark-teal text-brand-bg">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-light">
          &copy; {new Date().getFullYear()} VI&MO S.R.O. - Sťahovacie a Upratovacie Služby Bratislava. 
          Všetky práva vyhradené.
        </p>
        <p className="mt-2 text-xs text-slate-400">
            Poháňané pomocou Next.js a lásky k čistému kódu.
        </p>
      </div>
    </footer>
  );
};
