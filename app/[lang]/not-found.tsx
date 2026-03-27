import { Metadata } from 'next';

import { notFoundMetadata } from '@/constants/meta';
import NotFoundPage from '@/features/not-found/components/NotFoundPage.tsx';

export default function NotFound() {
  return <NotFoundPage />;
}

export async function generateMetadata(): Promise<Metadata> {
  return notFoundMetadata;
}
