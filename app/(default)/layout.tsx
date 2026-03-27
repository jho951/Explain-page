import DefaultLayout from '@/shared/layout/DefaultLayout/DefaultLayout';
import { LayoutProps } from '@/types/layout';

async function Layout({ children, modal, params }: LayoutProps) {
  const { lang } = params;

  return (
    <DefaultLayout modal={modal} params={{ lang }}>
      {children}
    </DefaultLayout>
  );
}

export default Layout;
