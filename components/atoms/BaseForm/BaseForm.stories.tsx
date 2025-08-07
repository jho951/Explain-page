import React, { useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';

import { ActiveInput } from '@/components/atoms/ActiveInput';
import { BaseForm, BaseFormStory } from '@/components/atoms/BaseForm';

const Default: BaseFormStory = {
  render: args => (
    <BaseForm {...args}>
      <div>폼 컨텐츠 영역</div>
    </BaseForm>
  ),
};

const WithInputs: BaseFormStory = {
  render: args => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <BaseForm {...args} onSubmit={handleSubmit}>
        <ActiveInput
          id="email"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          inputSize="md"
          style={{ marginBottom: 12 }}
        />
        <ActiveInput
          id="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          inputSize="md"
        />
        <button type="submit" style={{ marginTop: 16 }}>
          로그인
        </button>
        {submitted && <div style={{ color: '#14804b', marginTop: 8 }}>폼이 제출되었습니다!</div>}
      </BaseForm>
    );
  },
};

const CustomClassName: BaseFormStory = {
  args: {
    className: 'storybook-custom-form',
  },
  render: args => (
    <BaseForm {...args}>
      <div>클래스명으로 커스텀 스타일 적용 테스트</div>
    </BaseForm>
  ),
};

const meta: Meta<typeof BaseForm> = {
  title: 'Atoms/BaseForm',
  component: BaseForm,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    onSubmit: { action: 'submitted' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export { Default, WithInputs, CustomClassName };
