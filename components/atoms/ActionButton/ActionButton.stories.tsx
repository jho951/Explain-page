import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ActionButton, ActionButtonProps } from '@/components/atoms/ActionButton';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '@/constants/button';

/**
 * 모든 variant(스타일)와 size(크기)를 조합해서
 * ActionButton을 한 눈에 볼 수 있는 Storybook 데모 컴포넌트입니다.
 *
 * - variant: 'primary' | 'secondary' | 'danger' | 'text'
 * - size: 'sm' | 'md' | 'lg'
 *
 * 컴포넌트 QA, 디자인 시스템 토의, 버튼 스타일 비교 등에 활용됩니다.
 *
 * @component
 * @example
 * <AllVariantsAndSizesActionButton />
 */
const AllVariantsAndSizesActionButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {BUTTON_VARIANTS.map(variant => (
      <div key={variant}>
        <strong>{variant}</strong>
        <div style={{ display: 'flex', gap: 12, margin: '8px 0' }}>
          {BUTTON_SIZES.map(size => (
            <ActionButton key={size} variant={variant} size={size}>
              {variant} {size}
            </ActionButton>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/**
 * ActionButton의 playground용 Storybook 스토리입니다.
 * - Controls(Storybook 우측 Panel)에서 props를 직접 조정하며 ActionButton을 실시간으로 테스트할 수 있습니다.
 *
 * @type {import('@storybook/react').StoryObj}
 * @see https://storybook.js.org/docs/react/api/csf
 * @property {React.ReactNode} children - 버튼 내부 내용
 * @property {'primary'|'secondary'|'danger'|'text'} variant - 버튼 스타일
 * @property {'sm'|'md'|'lg'} size - 버튼 크기
 * @property {boolean} isLoading - 로딩 스피너 표시 여부
 */
const ActionButtonPlayground: StoryObj<ActionButtonProps> = {
  args: {
    children: 'Action Button',
    variant: 'primary',
    size: 'md',
    isLoading: false,
  },
};

/**
 * ActionButton Storybook의 메타 정보 객체입니다.
 * - Storybook 좌측 메뉴 트리에서의 위치/이름, props 컨트롤러, 문서 태그 등을 지정합니다.
 *
 * @type {import('@storybook/react').Meta<ActionButtonProps>}
 * @see https://storybook.js.org/docs/react/api/csf
 * @property {string} title - Storybook 메뉴 내 표시될 이름/경로
 * @property {React.ComponentType} component - 연결된 React 컴포넌트
 * @property {object} argTypes - 각 prop별 Storybook Controls 설정
 * @property {string[]} tags - autodocs 등 문서 자동화 태그
 */

export { ActionButtonPlayground, AllVariantsAndSizesActionButton };

const meta: Meta<ActionButtonProps> = {
  title: 'Atoms/Button/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'text'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isLoading: { control: 'boolean' },
  },
};

export default meta;
