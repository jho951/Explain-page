import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { legalDocuments } from '@/features/legal/constants';
import styles from '@/features/legal/components/LegalPage.module.css';

interface LegalPageParams {
  slug?: string;
}

interface LegalPageProps {
  params: Promise<LegalPageParams>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LegalPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const document = slug ? legalDocuments[slug] : null;
  return {
    title: document ? `Legal - ${document.title}` : 'Legal',
  };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const document = slug ? legalDocuments[slug] : null;

  if (!slug || !document) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{document.title}</h1>
      <p className={styles.content}>{document.content}</p>
    </main>
  );
}
