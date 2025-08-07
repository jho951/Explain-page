import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BaseCard } from '@/components/atoms/BaseCard';

/**
 * BaseCard의 기본 예시 스토리입니다.
 * - Header, Body, Footer를 모두 사용하는 일반적인 카드 케이스입니다.
 *
 * @component
 * @example
 * <BaseCard>
 *   <BaseCard.Header>헤더</BaseCard.Header>
 *   <BaseCard.Body>본문</BaseCard.Body>
 *   <BaseCard.Footer>푸터</BaseCard.Footer>
 * </BaseCard>
 */
const Default: StoryObj = {
  render: args => (
    <BaseCard {...args}>
      <BaseCard.Header>Header Content</BaseCard.Header>
      <BaseCard.Body>
        This is the body section of the card.
        <br />
        Add any ReactNode content here.
      </BaseCard.Body>
      <BaseCard.Footer>Footer Content</BaseCard.Footer>
    </BaseCard>
  ),
  args: {
    className: '',
  },
};

/**
 * Header와 Body만 사용하는 카드 예시입니다.
 */
const HeaderAndBody: StoryObj = {
  render: args => (
    <BaseCard {...args}>
      <BaseCard.Header>Header Only</BaseCard.Header>
      <BaseCard.Body>Only Header and Body are shown in this card.</BaseCard.Body>
    </BaseCard>
  ),
};

/**
 * Footer만 사용하는 카드 예시입니다.
 */
const FooterOnly: StoryObj = {
  render: args => (
    <BaseCard {...args}>
      <BaseCard.Footer>Footer Only</BaseCard.Footer>
    </BaseCard>
  ),
};

/**
 * Storybook Playground: Controls에서 className 등 props를 조정하며 실시간 렌더링을 확인할 수 있습니다.
 */
const Playground: StoryObj = {
  args: {
    className: 'custom-card',
  },
  render: args => (
    <BaseCard {...args}>
      <BaseCard.Header>Playground Header</BaseCard.Header>
      <BaseCard.Body>Playground Body</BaseCard.Body>
      <BaseCard.Footer>Playground Footer</BaseCard.Footer>
    </BaseCard>
  ),
};

/**
 * BaseCard Storybook 메타 정보입니다.
 * - Storybook 트리의 컴포넌트 분류, Controls 패널, 문서 설명을 설정합니다.
 */
const meta: Meta<typeof BaseCard> = {
  title: 'Atoms/Card/BaseCard',
  component: BaseCard,
  argTypes: {
    className: {
      control: 'text',
      description: '추가로 적용할 CSS 클래스 이름',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '헤더, 바디, 푸터를 slot 형태로 조합하여 사용할 수 있는 범용 카드 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
export { Default, Playground, HeaderAndBody, FooterOnly };
