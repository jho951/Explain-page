import { BaseButtonProps } from '@/components/atoms/BaseButton';
import { IconName } from '@/components/atoms/Icon';

/**
 * 아이콘 전용 버튼(props) 타입입니다.
 */
interface IconButtonProps extends BaseButtonProps {
  icon: IconName;
  iconSize?: number;
}

export type { IconButtonProps };
