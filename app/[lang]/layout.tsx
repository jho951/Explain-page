import CaptchaScript from '@/components/organisms/scripts/CaptchaScript';
import DefaultLayout from '@/components/templates/layout/DefaultLayout';
import { LayoutProps } from '@/types/layout';

export default async function Layout({ children, modal, params }: LayoutProps) {
  const { lang } = await params;

  return (
    <>
      <CaptchaScript />
      <DefaultLayout modal={modal} params={{ lang }}>
        {children}
      </DefaultLayout>
    </>
  );
}
