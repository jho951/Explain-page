import { useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';

import { Textarea, TextareaStory } from '@/components/atoms/Textarea';

/**
 * @file Textarea.stories.tsx
 * @description
 * Base Textarea(자동 리사이즈 지원) 아톰 컴포넌트의 Storybook 스토리입니다.
 * - 기본 사용, 에러, autoResize off, 크기/placeholder 등 다양한 케이스 포함
 *
 * @usage
 * ```tsx
 * <Textarea value={value} onChange={e => setValue(e.target.value)} />
 * ```
 */

/**
 * @example 기본 사용법 (컨트롤드)
 */
const Default: TextareaStory = {
  render: args => {
    const [value, setValue] = useState('');
    return <Textarea {...args} value={value} onChange={e => setValue(e.target.value)} />;
  },
  args: {
    placeholder: '내용을 입력하세요',
    autoResize: true,
    rows: 4,
  },
};

/**
 * @example 에러 상태
 */
const Error: TextareaStory = {
  render: args => {
    const [value, setValue] = useState('');
    return (
      <Textarea
        {...args}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="storybook-error"
      />
    );
  },
  args: {
    placeholder: '에러 예시',
    autoResize: true,
    rows: 4,
  },
};

/**
 * @example autoResize=false (고정 높이)
 */
const NoAutoResize: TextareaStory = {
  render: args => {
    const [value, setValue] = useState('');
    return <Textarea {...args} value={value} onChange={e => setValue(e.target.value)} />;
  },
  args: {
    placeholder: '고정 높이 textarea',
    autoResize: false,
    rows: 3,
  },
};

/**
 * @example disabled
 */
const Disabled: TextareaStory = {
  render: args => <Textarea {...args} value="수정 불가" disabled />,
  args: {
    autoResize: true,
    rows: 2,
  },
};

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    autoResize: { control: 'boolean' },
    className: { control: 'text' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Base Textarea(자동 리사이즈 지원) 컴포넌트의 스토리입니다.',
          '- value/onChange 기반 컨트롤드 방식으로 사용하세요.',
          '- autoResize, error, placeholder 등 다양한 케이스를 테스트할 수 있습니다.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
export { Default, Disabled, NoAutoResize, Error };
