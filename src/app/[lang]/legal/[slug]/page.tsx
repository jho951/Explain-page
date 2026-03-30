import LegalPage from '@/features/legal/components/LegalPage';
import type { LangLegalPageProps } from '@/app/[lang]/legal/[slug]/page.types';

export default async function Legal({ params }: LangLegalPageProps) {
  return <LegalPage params={params} />;
}
