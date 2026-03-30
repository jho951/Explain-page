import type { Locale } from '@/shared/types';

interface LangSignInPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export type { LangSignInPageProps };
