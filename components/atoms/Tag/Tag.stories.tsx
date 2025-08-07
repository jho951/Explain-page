import React from 'react';

import type { Meta } from '@storybook/nextjs-vite';

import { Tag, TagStory } from '@/components/atoms/Tag';

/**
 * @file Tag.stories.tsx
 * @description
 * 범용 Tag(뱃지/칩) 컴포넌트의 Storybook 스토리입니다.
 * - 다양한 color, active, children 옵션, 실사용 예시 등을 포함합니다.
 *
 * @usage
 * ```tsx
 * <Tag>React</Tag>
 * <Tag color="danger">긴급</Tag>
 * <Tag active>선택됨</Tag>
 * ```
 *
 * @prop {boolean} [active] - 활성(선택/강조) 스타일 여부
 * @prop {'default'|'primary'|'secondary'|'danger'} [color='default'] - 컬러 테마
 * @prop {ReactNode} children - 태그 표시 텍스트/내용
 */

/**
 * @example 기본 Tag 사용법
 */
const Default: TagStory = {
  args: {
    children: 'React',
  },
};

/**
 * @example danger 컬러, 긴급 상태 강조
 */
const Danger: TagStory = {
  args: {
    color: 'danger',
    children: '긴급',
  },
};

/**
 * @example active(선택/강조) 상태
 */
const Active: TagStory = {
  args: {
    active: true,
    children: '선택됨',
  },
};

/**
 * @example 다양한 컬러 한 번에 보기
 */
const Colors: TagStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Tag color="default">Default</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="secondary">Secondary</Tag>
      <Tag color="danger">Danger</Tag>
    </div>
  ),
};

/**
 * @example 커스텀 텍스트 사용
 */
const CustomText: TagStory = {
  args: {
    color: 'primary',
    children: 'Custom Tag Example',
  },
};

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'radio',
      options: ['default', 'primary', 'secondary', 'danger'],
      defaultValue: 'default',
    },
    active: { control: 'boolean' },
    children: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'Tag(뱃지/칩) 컴포넌트의 다양한 스타일과 상태를 테스트할 수 있습니다.',
          '- color, active prop 등 사용법은 Controls 패널과 예시를 참고하세요.',
        ].join('\n'),
      },
    },
  },
};

export default meta;

export { Default, Danger, Active, Colors, CustomText };
