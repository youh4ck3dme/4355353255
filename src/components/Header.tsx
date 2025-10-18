import Link from 'next/link';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-brand-dark-teal shadow-lg text-brand-bg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-wider text-brand-bright-green" aria-label="Domov - VI&MO Blog">
          VI&MO Blog
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/blog" className="hover:text-brand-bright-green transition-colors">
            Články
          </Link>
          {/* ThemeToggle and other buttons can be added here */}
        </nav>
      </div>
    </header>
  );
};
