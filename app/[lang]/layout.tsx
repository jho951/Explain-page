import DefaultLayout from '@/shared/layout/DefaultLayout/DefaultLayout';
import { LayoutProps } from '@/types/layout';

export default async function Layout({ children, modal, params }: LayoutProps) {
  const { lang } = await params;

  return (
    <DefaultLayout modal={modal} params={{ lang }}>
      {children}
    </DefaultLayout>
  );
}
