import { SUPPORTED_LOCALES } from '@/shared/config';
import { notFound } from 'next/navigation';
import type { LangHomePageProps } from '@/app/[lang]/page.types';

import { PortfolioLanding } from '@/features';

async function Page({ params }: LangHomePageProps) {
  const { lang } = await params;
  if (!SUPPORTED_LOCALES.includes(lang)) {
    notFound();
  }
  return <PortfolioLanding locale={lang} />;
}

export default Page;
