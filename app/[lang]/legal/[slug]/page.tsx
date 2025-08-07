import LegalPage from '@/components/templates/legal/LegalPage';
import { PageProps } from '@/types/layout';

export default async function Legal({ params }: PageProps) {
  return <LegalPage params={params} />;
}
