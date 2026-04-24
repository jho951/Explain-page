import { notFound } from 'next/navigation';

import { InfoPage } from '@/features';
import { SUPPORTED_LOCALES } from '@/shared/config';
import type { Locale } from '@/shared/types';

interface LangInfoPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function BrandPage({ params }: LangInfoPageProps) {
  const { lang } = await params;

  if (!SUPPORTED_LOCALES.includes(lang)) {
    notFound();
  }

  return <InfoPage locale={lang} pageKey="brand" />;
}
