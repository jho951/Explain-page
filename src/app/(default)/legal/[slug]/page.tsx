import LegalPage from '@/features/legal/components/LegalPage';
import type { DefaultLegalPageProps } from '@/app/(default)/legal/[slug]/page.types';

async function Legal({ params }: DefaultLegalPageProps) {
  return <LegalPage params={params} />;
}
export default Legal;
