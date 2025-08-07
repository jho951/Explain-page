'use client';
import { useMemo } from 'react';
import { IconProps, getIconComponent, SvgComponent } from '@/components/atoms/Icon';

/**
 * 범용 SVG Icon 컴포넌트
 *
 * - 전달받은 name에 따라 지정된 SVG 아이콘 컴포넌트를 렌더링합니다.
 * - size, className, 기타 SVG 속성 등을 모두 확장 지원합니다.
 * - 동적으로 컴포넌트를 가져오므로, 모든 아이콘이 동일한 인터페이스로 사용 가능합니다.
 *
 * @component
 * @param {IconProps} props - 아이콘 관련 props
 * @param {string} props.name - 렌더링할 아이콘의 이름 (아이콘 리소스에 정의된 이름)
 * @param {number} [props.size=24] - 아이콘 크기(px 단위, width/height에 적용)
 * @param {string} [props.className] - 추가 CSS 클래스
 * @param {...object} [props.props] - 기타 SVG 요소에 적용될 속성들
 *
 * @example
 * <Icon name="arrow" size={32} className="text-primary" />
 * <Icon name="check" />
 */
function Icon({ name, size = 24, ...props }: IconProps) {
  /**
   * SVG 아이콘 컴포넌트 동적 선택
   * @type {React.ComponentType<React.SVGProps<SVGSVGElement>> | null}
   */
  const SvgIcon: SvgComponent = useMemo(() => getIconComponent(name), [name]);

  if (!SvgIcon) return null;

  return <SvgIcon width={size} height={size} aria-hidden="true" focusable="false" {...props} />;
}

export { Icon };
