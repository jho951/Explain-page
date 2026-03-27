import { Locale, LocaleMessages, LocaleOption } from '@/types/locale';

const DEFAULT_LOCALE: Locale = 'ko';

const LOCALE_COOKIE = 'lang';

const SUPPORTED_LOCALES: Locale[] = ['en'];

const LOOKUP: Record<Locale, LocaleMessages> = {
  en: {} as LocaleMessages,
  ko: {} as LocaleMessages,
};

const LANGUAGE_OPTIONS: LocaleOption[] = [
  { id: 1, value: 'en', label: 'English' },
  { id: 2, value: 'ko', label: '한국어' },
];

export { SUPPORTED_LOCALES, LANGUAGE_OPTIONS, DEFAULT_LOCALE, LOCALE_COOKIE, LOOKUP };
