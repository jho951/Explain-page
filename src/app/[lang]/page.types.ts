import type { Locale } from '@/shared/types';

interface LangHomePageProps {
  params: Promise<{ lang: Locale }>;
}

export type { LangHomePageProps };
