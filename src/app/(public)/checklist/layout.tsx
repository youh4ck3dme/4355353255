
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interaktívny Sťahovací Checklist | VI&MO',
  description: 'Naplánujte si sťahovanie krok za krokom s naším interaktívnym checklistom. Odškrtnite si úlohy a majte všetko pod kontrolou.',
  alternates: {
    canonical: '/checklist',
  }
};

export default function ChecklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
