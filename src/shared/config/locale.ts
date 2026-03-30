import { Locale, LocaleMessages, LocaleOption } from '@/shared/types';

export const DEFAULT_LOCALE: Locale = 'ko';
export const LOCALE_COOKIE = 'lang';
export const SUPPORTED_LOCALES: Locale[] = ['ko', 'en'];
export const LOOKUP: Record<Locale, LocaleMessages> = {
  en: {} as LocaleMessages,
  ko: {} as LocaleMessages,
};
export const LANGUAGE_OPTIONS: LocaleOption[] = [
  { id: 1, value: 'en', label: 'English' },
  { id: 2, value: 'ko', label: '한국어' },
];
