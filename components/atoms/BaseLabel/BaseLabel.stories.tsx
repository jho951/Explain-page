import type { Meta } from '@storybook/nextjs-vite';
import { BaseLabel, LabelStory } from '@/components/atoms/BaseLabel';

/**
 * @file BaseLabel.stories.tsx
 *
 * @description
 * BaseLabel 컴포넌트의 Storybook 스토리입니다.
 * - 다양한 variant(스타일)와 필수표시, 커스텀 클래스 테스트 등을 포함합니다.
 *
 * @usage
 * ```tsx
 * // 기본 사용
 * <BaseLabel htmlFor="username">이름</BaseLabel>
 *
 * // variant, required 적용
 * <BaseLabel htmlFor="password" variant="filled" required>
 *   비밀번호
 * </BaseLabel>
 * ```
 *
 * @prop {string} htmlFor - 연결할 input의 id
 * @prop {boolean} [required=false] - 필수 입력 표시
 * @prop {"default"|"filled"|"outlined"|...} [variant="default"] - 스타일 타입
 * @prop {string} [className] - 추가 클래스명
 * @prop {ReactNode} children - 라벨 텍스트
 */

/**
 * @example 기본 BaseLabel 사용법
 */
const Default: LabelStory = {
  args: {
    htmlFor: 'username',
    children: '이름',
  },
};

/**
 * @example 필수 입력 라벨 (required)
 */
const Required: LabelStory = {
  args: {
    htmlFor: 'email',
    required: true,
    children: '이메일',
  },
};

/**
 * @example variant: filled 스타일 라벨
 */
const Filled: LabelStory = {
  args: {
    htmlFor: 'password',
    variant: 'filled',
    children: '비밀번호',
  },
};

/**
 * @example variant: outlined 스타일 라벨
 */
const Outlined: LabelStory = {
  args: {
    htmlFor: 'phone',
    variant: 'outlined',
    children: '휴대폰',
  },
};

/**
 * @example 커스텀 클래스 적용
 */
const CustomClass: LabelStory = {
  args: {
    htmlFor: 'nickname',
    className: 'storybook-custom-label',
    children: '닉네임 (커스텀)',
  },
};

export { Default, Required, Filled, Outlined, CustomClass };

const meta: Meta<typeof BaseLabel> = {
  title: 'Atoms/BaseLabel',
  component: BaseLabel,
  tags: ['autodocs'],
  argTypes: {
    htmlFor: { control: 'text' },
    required: { control: 'boolean' },
    variant: {
      control: 'radio',
      options: ['default', 'inline', 'capsule', 'error', 'floating', 'filled', 'outlined'],
      defaultValue: 'default',
    },
    className: { control: 'text' },
    children: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          '공통 BaseLabel 컴포넌트 스토리입니다.',
          '- variant, required, 커스텀 클래스, children prop 사용 예시를 확인할 수 있습니다.',
          '- 사용법은 상단 JSDoc 또는 Controls 패널에서 확인하세요.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
