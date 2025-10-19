import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov | VI&MO',
  description: 'Informácie o spracúvaní a ochrane osobných údajov v súlade s GDPR v spoločnosti VI and MO s. r. o.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
          Ochrana osobných údajov
        </h1>
        <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray max-w-3xl mx-auto">
          Informácie o spracúvaní osobných údajov (GDPR)
        </p>
      </header>
      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto bg-brand-light-gray dark:bg-brand-dark-teal/80 p-8 rounded-lg shadow-lg">
        <h2>Úvod</h2>
        <p>
          Spoločnosť <strong>VI and MO s. r. o.</strong>, so sídlom Karpatské námestie 7770/10A, 831 06 Bratislava - Rača, IČO: 56 811 322 (ďalej len „prevádzkovateľ“), venuje veľkú pozornosť ochrane osobných údajov. V tomto dokumente nájdete informácie o tom, aké osobné údaje spracúvame, prečo ich spracúvame, na aké účely ich používame a aké sú vaše práva.
        </p>

        <h2>Aké údaje spracúvame?</h2>
        <p>
          Spracúvame osobné údaje, ktoré nám poskytnete pri využívaní našich služieb, najmä prostredníctvom kontaktného formulára na našej webovej stránke:
        </p>
        <ul>
          <li><strong>Meno a priezvisko / Názov firmy:</strong> Pre identifikáciu a oslovenie.</li>
          <li><strong>Telefónne číslo:</strong> Pre rýchlu komunikáciu ohľadom vašej požiadavky.</li>
          <li><strong>E-mailová adresa:</strong> Pre zaslanie cenovej ponuky a ďalšiu komunikáciu.</li>
          <li><strong>Adresa sťahovania:</strong> Pre presný výpočet ceny a plánovanie logistiky.</li>
        </ul>
        <p>
            Všetky tieto údaje sú uložené v našej databáze Firestore hostovanej na platforme Google Cloud.
        </p>

        <h2>Na aký účel údaje spracúvame?</h2>
        <p>
          Vaše osobné údaje spracúvame výhradne na účely:
        </p>
        <ul>
          <li>Vybavenia vašej požiadavky na sťahovacie alebo upratovacie služby.</li>
          <li>Vypracovania a zaslania nezáväznej cenovej ponuky.</li>
          <li>Komunikácie súvisiacej s realizáciou objednanej služby.</li>
          <li>Plnenia našich zmluvných a zákonných povinností.</li>
        </ul>

        <h2>Ako dlho údaje uchovávame?</h2>
        <p>
          Osobné údaje uchovávame po dobu nevyhnutnú na splnenie účelu, na ktorý boli zhromaždené, a následne po dobu stanovenú príslušnými právnymi predpismi (napr. zákon o účtovníctve).
        </p>

        <h2>Kto má prístup k vašim údajom?</h2>
        <p>
          Vaše osobné údaje sú v bezpečí. Sprístupňujeme ich iba v nevyhnutnom rozsahu našim zamestnancom a zmluvným partnerom (napr. účtovná firma), ktorí sú viazaní mlčanlivosťou a dodržiavajú naše štandardy ochrany údajov. Vaše údaje neposkytujeme tretím stranám na marketingové účely.
        </p>

        <h2>Aké sú vaše práva?</h2>
        <p>
          V súlade s nariadením GDPR máte právo na:
        </p>
        <ul>
          <li>Prístup k svojim osobným údajom.</li>
          <li>Opravu nesprávnych alebo neúplných údajov.</li>
          <li>Vymazanie osobných údajov (právo „byť zabudnutý“).</li>
          <li>Obmedzenie spracúvania.</li>
          <li>Namietať proti spracúvaniu.</li>
          <li>Podanie sťažnosti na dozorný orgán, ktorým je Úrad na ochranu osobných údajov Slovenskej republiky.</li>
        </ul>

        <h2>Kontakt</h2>
        <p>
          Ak máte akékoľvek otázky týkajúce sa ochrany osobných údajov, alebo si chcete uplatniť svoje práva, neváhajte nás kontaktovať e-mailom na <a href="mailto:info@viandmo.com">info@viandmo.com</a>.
        </p>

        <p>Tieto zásady ochrany osobných údajov sú platné od 1. 1. 2024.</p>

        <div className="mt-8 text-center">
            <Link href="/" className="inline-block px-6 py-3 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md">
                Späť na domovskú stránku
            </Link>
        </div>
      </div>
    </main>
  );
}
