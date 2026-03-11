import Link from 'next/link';
import NotFoundTiles from '../../organisms/notFoundTile/NotFoundTiles.tsx';

import styles from './NotFoundPage.module.css';

export default function NotFound() {
  return (
    <main className={styles.wrapper}>
      <h1>
        페이지를 <br /> 찾을 수 없습니다.
      </h1>
      <NotFoundTiles />
      <Link className={styles.homeLink} href="/">
        홈으로 돌아가기
      </Link>
    </main>
  );
}
