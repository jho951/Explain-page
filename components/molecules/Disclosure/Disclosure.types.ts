import { ReactNode } from 'react';

interface DisclosureFieldProps {
  /** 조건이 true일 경우 하위 폼이 보여짐 */
  condition: boolean;
  /** 보여질 필드 JSX */
  children: ReactNode;
  /** 애니메이션 포함 여부 (기본값: true) */
  animated?: boolean;
  /** 추가 클래스 */
  className?: string;
}

export type { DisclosureFieldProps };
