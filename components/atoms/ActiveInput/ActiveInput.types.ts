import { StoryObj } from '@storybook/nextjs-vite/vite-plugin';
import { BaseInputProps } from '@/components/atoms/BaseInput';
import { ActiveInput } from '@/components/atoms/ActiveInput';

type ActiveInputStory = StoryObj<typeof ActiveInput>;

interface ActiveInputProps extends BaseInputProps {
  /** 활성화(포커스/값 있음) 상태를 외부에서 강제할 수 있음 (optional) */
  forceActive?: boolean;
  /** 활성 상태 변화 감지 콜백 */
  onActiveChange?: (active: boolean) => void;
}

export type { ActiveInputStory, ActiveInputProps };
