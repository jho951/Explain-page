import LegalPage from '@/features/legal/components/LegalPage';
import type { SlugRouteProps } from '@/app/route-factories';

async function Legal({ params }: SlugRouteProps) {
  return <LegalPage params={params} />;
}
export default Legal;
