import { BaseButtonProps } from '@/components/atoms/BaseButton';

/**
 * 분할(라디오) 버튼(props) 타입입니다.
 */
interface SegmentButtonProps extends Omit<BaseButtonProps, 'onClick'> {
  isActive: boolean;
  onSelect: () => void;
  value: string; // 버튼 고유 값
}

export type { SegmentButtonProps };
