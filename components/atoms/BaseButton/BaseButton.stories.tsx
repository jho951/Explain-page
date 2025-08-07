import React from 'react';
import type { Meta } from '@storybook/nextjs-vite';
import { Icon } from '@/components/atoms/Icon';
import { BaseButton, BaseButtonStory } from '@/components/atoms/BaseButton';

import { BUTTON_SIZES, BUTTON_VARIANTS } from '@/constants/button';

/**
 * 모든 버튼 variant와 size 조합을 한 눈에 볼 수 있는 데모 스토리 컴포넌트입니다.
 * - 각 variant(스타일 타입) 별로, 모든 size(크기) 버튼을 렌더링합니다.
 * - 컴포넌트 개발/디자인 QA용으로 활용됩니다.
 *
 * @component
 * @example
 * <AllVariantsAndSizesBaseButton />
 */
const AllVariantsAndSizesBaseButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
    {BUTTON_VARIANTS.map(variant => (
      <div key={variant}>
        <h4>{variant}</h4>
        <div style={{ display: 'flex', gap: 16 }}>
          {BUTTON_SIZES.map(size => (
            <BaseButton key={size} variant={variant} size={size}>
              {variant} {size}
            </BaseButton>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/**
 * BaseButton의 playground용 기본 스토리입니다.
 * - Storybook Controls에서 props를 조정하며 실시간으로 BaseButton을 테스트할 수 있습니다.
 * - 기본 텍스트, variant, size, isLoading 상태를 미리 정의합니다.
 *
 * @type {import('@storybook/react').StoryObj}
 */
const BaseButtonPlayground: BaseButtonStory = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    isLoading: false,
  },
};

/**
 * 아이콘(좌/우)에 아이콘을 넣은 BaseButton 스토리 예시입니다.
 * - leftIcon, rightIcon props를 사용하여 아이콘이 버튼의 양 옆에 배치됩니다.
 * - 실무 UI/UX에서 자주 사용하는 케이스를 바로 확인할 수 있습니다.
 *
 * @type {import('@storybook/react').StoryObj}
 */
const WithIcons: BaseButtonStory = {
  args: {
    children: 'Arrow',
    leftIcon: <Icon name="arrow" />,
    rightIcon: <Icon name="arrow" />,
    variant: 'secondary',
    size: 'md',
  },
};

/**
 * BaseButton Storybook 메타 정보 객체입니다.
 * - 스토리북 내에서 컴포넌트 설명, 컨트롤러, 기본값, 분류(title) 등을 설정합니다.
 *
 * @type {import('@storybook/react').Meta<typeof BaseButton>}
 * @see https://storybook.js.org/docs/react/api/csf
 *
 * @property {string} title - Storybook 좌측 트리에서의 컴포넌트 카테고리 및 이름
 * @property {React.ComponentType} component - 실제 스토리북에서 렌더링할 컴포넌트
 * @property {object} argTypes - 각 prop에 대한 Storybook 컨트롤 및 옵션
 * @property {object} parameters - 문서, 설명 등 추가 Storybook 옵션
 */
const meta: Meta<typeof BaseButton> = {
  title: 'Atoms/Button/BaseButton',
  component: BaseButton,
  argTypes: {
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
    },
    size: {
      control: 'select',
      options: BUTTON_SIZES,
    },
    isLoading: { control: 'boolean' },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: '앱에서 가장 많이 사용하는 베이스 버튼 컴포넌트입니다.',
      },
    },
  },
};

export { AllVariantsAndSizesBaseButton, BaseButtonPlayground, WithIcons };
export default meta;
