
import { Metadata } from 'next';
import { Checklist } from '@/components/Checklist';
import { checklistData } from '@/lib/checklist-data';

export const metadata: Metadata = {
  title: 'Interaktívny Sťahovací Checklist | VI&MO',
  description: 'Naplánujte si sťahovanie krok za krokom s naším interaktívnym checklistom. Odškrtnite si úlohy a majte všetko pod kontrolou.',
  alternates: {
    canonical: '/checklist',
  }
};

export default function ChecklistPage() {
  return (
    <div className="bg-brand-bg text-brand-text dark:bg-brand-dark-teal dark:text-brand-bg">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
            Váš Sťahovací Checklist
          </h1>
          <p className="text-lg text-brand-secondary-grey dark:text-brand-light-gray max-w-3xl mx-auto">
            Sťahovanie bez stresu začína dobrým plánom. Odškrtávajte si úlohy a majte istotu, že ste na nič nezabudli.
          </p>
        </header>

        <Checklist categories={checklistData} />

      </div>
    </div>
  );
}
