'use client';

import { Link } from '@/components/atoms/Link';
import styles from '@/styles/features/SignIn.module.css';

function LegalBtn() {
  return (
    <p className={styles.disclaimer}>
      계속을 클릭하면
      <Link className={styles.link} href="#">
        약관
      </Link>
      및
      <Link className={styles.link} href="#">
        개인 정보 정책
      </Link>
      에 동의하는 것입니다.
    </p>
  );
}

export { LegalBtn };
