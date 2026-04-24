import { notFound } from 'next/navigation';

import { FaqPage } from '@/features';
import { SUPPORTED_LOCALES } from '@/shared/config';
import type { Locale } from '@/shared/types';

interface LangFaqPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function Faq({ params }: LangFaqPageProps) {
  const { lang } = await params;

  if (!SUPPORTED_LOCALES.includes(lang)) {
    notFound();
  }

  return <FaqPage locale={lang} />;
}
