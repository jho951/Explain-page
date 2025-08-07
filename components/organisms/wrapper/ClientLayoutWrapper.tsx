'use client';

import { usePathname } from 'next/navigation';

import { FOOTER_EXCLUDED_PATHS, HEADER_EXCLUDED_PATHS } from '@/data/navigation';

import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { SkipNavigation } from '@/components/molecules/SkipNavigation/SkipNavigation';

function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldRenderHeader = !HEADER_EXCLUDED_PATHS.some(path => pathname.startsWith(path));
  const shouldRenderFooter = !FOOTER_EXCLUDED_PATHS.some(path => pathname.startsWith(path));

  return (
    <>
      <SkipNavigation />
      {shouldRenderHeader && <Header pathname={pathname} />}
      {children}
      {shouldRenderFooter && <Footer pathname={pathname} />}
    </>
  );
}

export { ClientLayoutWrapper };
