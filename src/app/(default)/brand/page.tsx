import { InfoPage } from '@/features';
import { DEFAULT_LOCALE } from '@/shared/config';

export default async function BrandPage() {
  return <InfoPage locale={DEFAULT_LOCALE} pageKey="brand" />;
}
