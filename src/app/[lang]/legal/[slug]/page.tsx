import LegalPage from '@/features/legal/components/LegalPage';
import type { LocalizedRouteProps } from '@/app/route-factories';

export default async function Legal({ params }: LocalizedRouteProps<{ slug?: string }>) {
  return <LegalPage params={params} />;
}
