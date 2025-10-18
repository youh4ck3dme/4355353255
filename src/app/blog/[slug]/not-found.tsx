import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center min-h-[70vh] flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-brand-dark-teal dark:text-brand-bright-green">404</h1>
      <h2 className="text-4xl font-bold my-4 text-brand-text dark:text-brand-bg">Článok nenájdený</h2>
      <p className="text-xl text-brand-secondary-grey mb-8">
        Ľutujeme, ale príspevok, ktorý hľadáte, neexistuje alebo bol presunutý.
      </p>
      <Link 
        href="/blog"
        className="inline-block px-8 py-4 bg-brand-bright-green text-brand-bg font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-xl"
      >
        Späť na všetky články
      </Link>
    </div>
  );
}
