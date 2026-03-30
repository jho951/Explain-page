'use client';

import { usePathname } from 'next/navigation';

import { resolveLocaleFromPathname } from '@/shared/utils';
import styles from './PortfolioLanding.module.css';

export default function WorkspaceSidebar() {
  const pathname = usePathname();
  const locale = resolveLocaleFromPathname(pathname);
  const sidebarText =
    locale === 'en'
      ? 'Document browsing is disabled on this page.'
      : '현재 페이지에서는 문서 조회를 비활성화했습니다.';

  return (
    <aside className={styles.sidePanel}>
      <p className={styles.panelLabel}>Workspace</p>
      <strong>My Documents</strong>
      <ul className={styles.sideList}>
        <li>{sidebarText}</li>
      </ul>
    </aside>
  );
}
