import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/shared/config';

export const generateStaticParams = async () => {
  return SUPPORTED_LOCALES.filter(lang => lang !== DEFAULT_LOCALE).map(lang => ({ lang }));
};
