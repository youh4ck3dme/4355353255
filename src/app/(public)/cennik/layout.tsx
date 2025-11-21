
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cenník Služieb | Bratislava sťahovanie | VI&MO',
  description: 'Prehľadný cenník sťahovacích a upratovacích služieb v Bratislave. Vypočítajte si odhadovanú cenu pomocou našej online kalkulačky.',
  alternates: {
    canonical: '/cennik',
  }
};

export default function CennikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
