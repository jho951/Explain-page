import { ReactNode } from 'react';

/**
 * arrowVisibility type 설명을 여기에 작성하세요.
 */
type arrowVisibility = 'all' | 'mobile' | 'desktop' | 'none';

/**
 * FlickingProps interface 설명을 여기에 작성하세요.
 */
interface FlickingProps {
  children: ReactNode[];
  autoSlideInterval?: number;
  storageKey?: string;
  arrowVisibility: arrowVisibility;
  pagination?: boolean;
}

export type { arrowVisibility, FlickingProps };
