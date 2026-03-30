import { DEFAULT_LOCALE, LOOKUP, SUPPORTED_LOCALES } from '@/shared/config/locale';
import { Locale, LocaleMessages } from '@/shared/types';
import { normalizePath } from '@/shared/utils/path';

/**
 * @function getMessages
 * @description locale별 메시지 객체를 반환합니다.
 * @returns {{ common: LocaleMessages }} 메시지 객체
 * @param value
 */
const isLocale = (value?: string | null): value is Locale =>
  Boolean(value) && SUPPORTED_LOCALES.includes(value as Locale);

const resolveLocaleFromPathname = (pathname?: string | null): Locale => {
  const normalized = normalizePath(pathname);
  const [, maybeLocale] = normalized.split('/');
  return isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;
};

const getMessages = (locale?: Locale | null): { common: LocaleMessages } => {
  const resolved = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const messages = LOOKUP[resolved] ?? LOOKUP.en;
  return { common: messages };
};

export { getMessages, isLocale, resolveLocaleFromPathname };
