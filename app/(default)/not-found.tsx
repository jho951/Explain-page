import { Metadata } from 'next';
import NotFoundPage from '@/components/templates/not-found/not-found';

import { notFoundMetadata } from '@/constants/meta';

export default function NotFound() {
  return <NotFoundPage />;
}

export async function generateMetadata(): Promise<Metadata> {
  return notFoundMetadata;
}
