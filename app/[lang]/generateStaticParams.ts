import { SUPPORTED_LOCALES } from '@/constants/locale';

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.filter(lang => lang !== 'ko').map(lang => ({ lang }));
}
