import RssScript from '@/components/organisms/scripts/RssScript';
import DefaultLayout from '@/components/templates/layout/DefaultLayout';
import CaptchaScript from '@/components/organisms/scripts/CaptchaScript';
import { LayoutProps } from '@/types/layout';

async function Layout({ children, modal, params }: LayoutProps) {
  const { lang } = await params;

  return (
    <>
      <RssScript lang={lang} />
      <CaptchaScript />
      <DefaultLayout modal={modal} params={{ lang }}>
        {children}
      </DefaultLayout>
    </>
  );
}

export default Layout;
