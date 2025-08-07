import { BaseButtonProps } from '@/components/atoms/BaseButton';

/**
 * 토글 버튼(props) 타입입니다.
 */
interface ToggleButtonProps extends Omit<BaseButtonProps, 'onClick'> {
  /** 외부 제어용 토글 상태 (controlled) */
  toggled?: boolean;
  /** 내부 상태 기본값 (uncontrolled) */
  defaultToggled?: boolean;
  /** 토글 상태 변경 시 콜백 */
  onToggleChange?: (active: boolean) => void;
  /** 클릭 이벤트 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type { ToggleButtonProps };
