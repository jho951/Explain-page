import { ReactNode } from 'react';
import { BaseCardBody, BaseCardFooter, BaseCardHeader } from '@/components/atoms/BaseCard';

type SectionProps = React.PropsWithChildren<{ className?: string }>;

/** 공통 카드 베이스 */
type BaseCardProps = React.HTMLAttributes<HTMLElement> & {
  /** 사용자 정의 클래스명 */
  className?: string;
  /** 카드 본문 콘텐츠 */
  children?: ReactNode;
};

type BaseCardComponent = React.ForwardRefExoticComponent<
  BaseCardProps & React.RefAttributes<HTMLElement>
> & {
  Header: typeof BaseCardHeader;
  Body: typeof BaseCardBody;
  Footer: typeof BaseCardFooter;
};

/** 폼 전용 카드 */
type FormCardProps = BaseCardProps;

export type { SectionProps, BaseCardProps, BaseCardComponent, FormCardProps };
