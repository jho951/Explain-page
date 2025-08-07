/**
 * pc 내비게이션에 필요한 props 전체
 */

import { HeaderGnbProps } from '@/components/organisms/Header';

/**
 * PCNavProps interface 설명을 여기에 작성하세요.
 */
interface PcGnbProps extends HeaderGnbProps {
  focusIndex: number | null;
  focusToggle: (idx: number) => void;
}

export type { PcGnbProps };
