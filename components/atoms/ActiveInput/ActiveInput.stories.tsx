import React, { useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';
import { ActiveInputStory, ActiveInput } from '@/components/atoms/ActiveInput';

const Default: ActiveInputStory = {
  args: {
    id: 'default',
    placeholder: '이메일 입력',
    inputSize: 'md',
  },
};
const WithError: ActiveInputStory = {
  args: {
    id: 'error',
    placeholder: '오류 예시',
    errorMessage: '필수 입력 항목입니다.',
  },
};

const Sizes: ActiveInputStory = {
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ActiveInput {...args} id="sm" inputSize="sm" placeholder="Small" />
      <ActiveInput {...args} id="md" inputSize="md" placeholder="Medium" />
      <ActiveInput {...args} id="lg" inputSize="lg" placeholder="Large" />
    </div>
  ),
};

const Controlled: ActiveInputStory = {
  render: args => {
    const [value, setValue] = useState('');
    return (
      <ActiveInput
        {...args}
        id="controlled"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="컨트롤드 입력"
      />
    );
  },
};

const Playground: ActiveInputStory = {
  args: {
    id: 'playground',
    placeholder: '값을 입력해 보세요',
  },
};

const meta: Meta<typeof ActiveInput> = {
  title: 'Atoms/ActiveInput',
  component: ActiveInput,
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    errorMessage: { control: 'text' },
    className: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export { Default, WithError, Sizes, Controlled, Playground };
