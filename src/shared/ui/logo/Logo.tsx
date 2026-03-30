import Link from 'next/link';
import Image from 'next/image';

import type { LogoProps } from './Logo.types';
import { ICON_BASE_PATH } from '@/shared/config';
import styles from './Logo.module.css';

const Logo = ({ pathname, onClick, text, size, homeAriaLabel }: LogoProps) => {
  return (
    <Link
      className={styles.link}
      href="/"
      aria-label={homeAriaLabel}
      aria-current={pathname === '/' ? 'page' : undefined}
      onClick={onClick}
    >
      <Image
        src={`${ICON_BASE_PATH}/logo.svg`}
        alt="logo"
        width={size}
        height={size}
        className={styles.icon}
      />
      <h1 className="sr-only">{text}</h1>
    </Link>
  );
};

export { Logo };
