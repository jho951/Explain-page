'use client';

import { usePathname } from 'next/navigation';

import { NotFoundTiles } from '@/features';
import { DEFAULT_LOCALE } from '@/shared/config';
import { PageChromeController } from '@/shared/providers';
import { Link } from '@/shared/ui';
import { resolveLocaleFromPathname } from '@/shared/utils';
import styles from '@/features/notFound/pages/NotFoundPage.module.css';

function NotFound() {
  const pathname = usePathname();
  const locale = resolveLocaleFromPathname(pathname);
  const title = locale === 'en' ? 'Page not found.' : '페이지를 찾을 수 없습니다.';
  const homeLabel = locale === 'en' ? 'Back to home' : '홈으로 돌아가기';
  const homeHref = locale === DEFAULT_LOCALE ? '/' : `/${locale}`;

  return (
    <>
      <PageChromeController hideFooter />
      <div className={styles.notFoundContainer}>
        <h1 className={styles.notFoundTitle}>{title}</h1>
        <section className={styles.notFoundTileWrapper}>
          <NotFoundTiles />
        </section>
        <Link className={styles.homeLink} href={homeHref}>
          {homeLabel}
        </Link>
      </div>
    </>
  );
}
export default NotFound;
