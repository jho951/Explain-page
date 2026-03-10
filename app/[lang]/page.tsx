import HomePage from '@/components/templates/home/HomeTemplate';
import { SUPPORTED_LOCALES } from '@/constants/locale';
import { PageProps } from '@/types/layout';

import { notFound } from 'next/navigation';

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  if (!SUPPORTED_LOCALES.includes(lang)) {
    notFound();
  }
  return <HomePage />;
}
