import LegalPage from '@/features/legal/components/LegalPage';
import { PageProps } from '@/types/layout';

export default async function Legal({ params }: PageProps) {
  return <LegalPage params={params} />;
}
