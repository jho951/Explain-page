import { FC, SVGProps } from 'react';
import { ICON_KEYS } from '@/constants/icon';

/**
 * 사용 가능한 아이콘 이름 유니온 타입입니다.
 * 예: 'logo' | 'sun' | 'moon' | ...
 */
/**
 * IconName type 설명을 여기에 작성하세요.
 */
type IconName = keyof typeof ICON_KEYS;

/**
 * SVG 아이콘 컴포넌트 타입입니다.
 * React.FC 형태로 SVGProps를 확장합니다.
 */
/**
 * SvgComponent type 설명을 여기에 작성하세요.
 */
type SvgComponent = FC<SVGProps<SVGSVGElement>>;

/**
 * 공통 SVG 아이콘 컴포넌트에서 사용되는 props 타입입니다.
 */
/**
 * IconProps interface 설명을 여기에 작성하세요.
 */
interface IconProps extends SVGProps<SVGSVGElement> {
  /** 아이콘 이름 (iconKeys에 정의된 이름 중 하나) */
  name: IconName;
  /** 아이콘 크기 (px 단위, 기본값 설정 가능) */
  size?: number;
}

export type { IconName, SvgComponent, IconProps };
