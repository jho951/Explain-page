import { Metadata } from 'next';
import NotFoundPage from '@/features/not-found/components/NotFoundPage.tsx';
import { notFoundMetadata } from '@/constants/meta.ts';

export default function NotFound() {
  return <NotFoundPage />;
}

export async function generateMetadata(): Promise<Metadata> {
  return notFoundMetadata;
}
