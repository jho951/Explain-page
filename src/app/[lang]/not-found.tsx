import { Metadata } from 'next';
import { NotFoundPage, notFoundMetadata } from '@/features';

export const generateMetadata = async (): Promise<Metadata> => {
  return notFoundMetadata;
};

async function NotFound() {
  return <NotFoundPage />;
}
export default NotFound;
