import { CommonLayoutProps, LangParams } from '@/shared/types';

/** Layout에서 사용하는 props (params까지 포함) */
export interface WrapperProps extends CommonLayoutProps {
  params: LangParams;
}
