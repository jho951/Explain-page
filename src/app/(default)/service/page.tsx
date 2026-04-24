import { InfoPage } from '@/features';
import { DEFAULT_LOCALE } from '@/shared/config';

export default async function ServicePage() {
  return <InfoPage locale={DEFAULT_LOCALE} pageKey="service" />;
}
