import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Icon } from '@/components/atoms/Icon/Icon';
import { ICON_KEYS } from '@/constants/icon';

/**
 * ICON_KEYS에서 자동으로 아이콘 이름 배열 추출
 * 타입 안정성, 자동완성 모두 보장됨
 */
const ICON_NAMES = Object.keys(ICON_KEYS) as Array<keyof typeof ICON_KEYS>;

/**
 * 모든 아이콘을 한눈에 볼 수 있는 데모 컴포넌트입니다.
 *
 * @component
 */
const AllIcons = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
    {ICON_NAMES.map(name => (
      <div
        key={name}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 80,
        }}
      >
        <Icon name={name} size={32} />
        <span style={{ marginTop: 6, fontSize: 12 }}>{name}</span>
      </div>
    ))}
  </div>
);

/**
 * Playground: Controls에서 name/size/className을 실시간으로 조정할 수 있습니다.
 *
 * @type {import('@storybook/react').StoryObj}
 */
const Playground: StoryObj = {
  args: {
    name: 'google',
    size: 24,
    className: '',
  },
  argTypes: {
    name: {
      control: 'select',
      options: ICON_NAMES,
      description: '아이콘 이름 (ICON_KEYS에 정의된 이름만 허용)',
    },
    size: {
      control: { type: 'number', min: 8, max: 128, step: 1 },
      description: '아이콘 크기(px)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
  render: args => <Icon name="google" {...args} />,
};

/**
 * Icon Storybook의 메타 정보입니다.
 *
 * @type {import('@storybook/react').Meta<typeof Icon>}
 */
const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'SVG 아이콘을 name props로 지정해 동적으로 렌더링하는 범용 컴포넌트입니다. ' +
          'name 값은 ICON_KEYS에서 자동 동기화되어 타입 안전성이 보장됩니다.',
      },
    },
  },
};

export default meta;
export { Playground, AllIcons };
