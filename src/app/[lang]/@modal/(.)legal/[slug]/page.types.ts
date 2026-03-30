import type { Locale } from '@/shared/types';

interface LangLegalModalPageProps {
  params: Promise<{ lang: Locale; slug?: string }>;
}

export type { LangLegalModalPageProps };
