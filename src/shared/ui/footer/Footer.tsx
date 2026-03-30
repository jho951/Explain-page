import { Fnb } from '@/shared/ui/footer/components';
import { FNB } from '@/shared/config';
import styles from '@/shared/ui/footer/Footer.module.css';
import type { FooterProps } from './Footer.types';
import { FooterMeta } from './FooterMeta';

function Footer({ pathname }: FooterProps) {
  return (
    <footer className={styles.footerContainer}>
      <nav className={styles.fnbContainer}>
        <Fnb fnb={FNB} />
      </nav>
      <FooterMeta pathname={pathname} />
    </footer>
  );
}

export { Footer };
