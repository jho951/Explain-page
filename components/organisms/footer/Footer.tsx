import { Fnb } from '@/components/molecules/Fnb';
import { FNB } from '@/constants/navigation.ts';
import styles from '@/components/organisms/Footer/Footer.module.css';
import { FooterProps } from '@/components/organisms/Footer';
import { FooterMeta } from '@/components/molecules/footer-meta/FooterMeta';

function Footer({ pathname }: FooterProps) {
  return (
    <footer className={styles.footerContainer}>
      <Fnb fnb={FNB} />
      <FooterMeta pathname={pathname} />
    </footer>
  );
}

export { Footer };
