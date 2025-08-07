import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Image } from '@/components/atoms/Image';

/**
 * Playground: Controls에서 이미지 src, alt, fill, width/height, skeleton, className 등 실시간 조정!
 */
const Playground: StoryObj = {
  args: {
    src: '/sample.jpg',
    alt: '샘플 이미지',
    width: 180,
    height: 120,
    fill: false,
    className: '',
  },
  argTypes: {
    src: { control: 'text', description: '이미지 URL' },
    alt: { control: 'text', description: '대체 텍스트' },
    width: {
      control: { type: 'number', min: 20, max: 800, step: 1 },
      description: '너비(px, fill=false)',
    },
    height: {
      control: { type: 'number', min: 20, max: 800, step: 1 },
      description: '높이(px, fill=false)',
    },
    fill: { control: 'boolean', description: 'fill 모드(부모 영역 가득)' },
    className: { control: 'text', description: '추가 CSS 클래스' },
  },
  render: args => <Image src="/sample.jpg" alt="샘플 이미지" {...args} />,
};

/**
 * 기본 사용 예시: width/height로 사이즈 지정
 */
const Default: StoryObj = {
  render: () => <Image src="/sample.jpg" alt="기본 이미지" width={200} height={120} />,
};

/**
 * fill 모드 예시: 부모 컨테이너를 가득 채우는 스타일
 */
const FillMode: StoryObj = {
  render: () => (
    <div style={{ position: 'relative', width: 320, height: 160 }}>
      <Image src="/sample.jpg" alt="Fill 이미지" fill className="rounded-xl" />
    </div>
  ),
};

/**
 * 에러 발생 시 fallback 이미지 자동 적용 예시
 */
const FallbackDemo: StoryObj = {
  render: () => <Image src="/not-exist.jpg" alt="에러 fallback 예시" width={180} height={120} />,
};

/**
 * skeleton 스타일 예시 (로딩 시 흐릿한 배경)
 */
const SkeletonDemo: StoryObj = {
  render: () => (
    <Image src="/slow-loading-image.jpg" alt="스켈레톤 예시" width={180} height={120} />
  ),
};

/**
 * Image Storybook 메타 정보
 *
 * @type {import('@storybook/react').Meta<typeof Image>}
 */
const meta: Meta<typeof Image> = {
  title: 'Atoms/Image/Image',
  component: Image,
  parameters: {
    docs: {
      description: {
        component:
          'Next.js의 Image를 래핑해 로딩/에러/fallback/skeleton/fill 등 실전에서 자주 쓰는 이미지 패턴을 모두 지원하는 범용 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
export { Playground, Default, FillMode, FallbackDemo, SkeletonDemo };
