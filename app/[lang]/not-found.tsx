import { Metadata } from 'next';

import { notFoundMetadata } from '@/constants/meta';
import NotFoundPage from '@/components/templates/not-found/not-found';

export default function NotFound() {
  return <NotFoundPage />;
}

export async function generateMetadata(): Promise<Metadata> {
  return notFoundMetadata;
}
