import { Fnb } from '@/shared/navigation/Fnb';
import { FNB } from '@/constants/navigation.ts';
import styles from '@/shared/layout/Footer/Footer.module.css';
import { FooterProps } from '@/shared/layout/Footer';
import { FooterMeta } from '@/shared/layout/Footer/FooterMeta';

function Footer({ pathname }: FooterProps) {
  return (
    <footer className={styles.footerContainer}>
      <Fnb fnb={FNB} />
      <FooterMeta pathname={pathname} />
    </footer>
  );
}

export { Footer };
