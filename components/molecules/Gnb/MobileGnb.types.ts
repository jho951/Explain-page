import { HeaderGnbProps, HeaderMenuOpenProps } from '@/components/organisms/Header';

/**
 * 모바일 내비게이션에 필요한 props 전체
 */
interface MobileGnbProps extends HeaderMenuOpenProps, HeaderGnbProps {
  openIndex: number | null;
  onToggle: (idx: number) => void;
}

export type { MobileGnbProps };
