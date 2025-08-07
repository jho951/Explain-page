'use client';

import { Link } from '@/components/atoms/Link';
import styles from '@/components/molecules/SkipNavigation/SkipNavigayion.module.css';

function SkipNavigation() {
  return (
    <Link href="#main-content" className={styles.container}>
      본문 바로가기
    </Link>
  );
}

export { SkipNavigation };
