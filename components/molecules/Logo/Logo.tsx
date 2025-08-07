import Link from 'next/link';

import { Icon } from '@/components/atoms/Icon';
import { LogoProps } from '@/components/molecules/Logo';

function Logo({ pathname, onClick, text = 'Skill Blog' }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="홈으로 이동"
      aria-current={pathname === '/' ? 'page' : undefined}
      onClick={onClick}
    >
      <Icon name="logo" size={40} />
      <h1 className="sr-only">{text}</h1>
    </Link>
  );
}

export { Logo };
