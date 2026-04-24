import { FaqPage } from '@/features';
import { DEFAULT_LOCALE } from '@/shared/config';

export default async function Faq() {
  return <FaqPage locale={DEFAULT_LOCALE} />;
}
