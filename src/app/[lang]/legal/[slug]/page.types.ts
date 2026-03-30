import type { Locale } from '@/shared/types';

interface LangLegalPageProps {
  params: Promise<{ lang: Locale; slug?: string }>;
}

export type { LangLegalPageProps };
