import { BaseCardProps } from '@/components/atoms/BaseCard';

/** 이미지 전용 카드 */
interface ImageCardProps extends Omit<BaseCardProps, 'header' | 'footer'> {
  /** 카드에 표시될 이미지 URL */
  imageSrc: string;
  /** 대체 텍스트 (접근성) */
  alt?: string;
  /** 카드 제목 */
  title: string;
  /** 카드 설명 */
  description?: string;
}
export type { ImageCardProps };
