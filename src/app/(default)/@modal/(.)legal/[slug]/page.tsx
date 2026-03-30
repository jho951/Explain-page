import { notFound } from 'next/navigation';

import { LegalModal } from '@/features/legal/components';
import { legalDocuments } from '@/features/legal/constants';
import type { DefaultLegalModalPageProps } from '@/app/(default)/@modal/(.)legal/[slug]/page.types';

export default async function LegalModalPage({ params }: DefaultLegalModalPageProps) {
  const { slug } = await params;
  const document = slug ? legalDocuments[slug] : null;

  if (!slug || !document) notFound();

  return <LegalModal title={document.title} content={document.content} />;
}
