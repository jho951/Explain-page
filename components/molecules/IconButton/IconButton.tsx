'use client';

import { forwardRef } from 'react';

import { Icon } from '@/components/atoms/Icon';
import { BaseButton } from '@/components/atoms/BaseButton';
import { IconButtonProps } from '@/components/molecules/IconButton';

/**
 * IconButton (아토믹 디자인: Atoms)
 *
 * 아이콘만으로 동작(액션)을 표현하는 버튼 컴포넌트입니다.
 * BaseButton을 확장하여 variant, size, loading 등 모든 속성을 지원합니다.
 * 접근성(aria-label 등) 고려 필요! (텍스트 없이 아이콘만 사용 시 필수)
 *
 * @component
 * @example
 * // 기본 사용법 (plus 아이콘)
 * <IconButton icon="plus" />
 *
 * // 크기 및 스타일 커스텀
 * <IconButton icon="search" variant="secondary" size="lg" />
 *
 * // 클릭 이벤트 및 접근성
 * <IconButton icon="edit" aria-label="수정" onClick={onEdit} />
 *
 * // 로딩/비활성화 등 BaseButton의 모든 props 사용 가능
 * <IconButton icon="sync" isLoading disabled />
 *
 * @param {IconButtonProps} props - 버튼 및 아이콘 관련 속성 (BaseButton 상속 + icon 등)
 * @param {React.Ref<HTMLButtonElement>} ref - 버튼 엘리먼트 참조
 * @returns {JSX.Element} 아이콘 버튼 컴포넌트
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, iconSize, ...rest }, ref) => {
    return (
      <BaseButton ref={ref} {...rest}>
        <Icon name={icon} size={iconSize} />
      </BaseButton>
    );
  },
);

IconButton.displayName = 'IconButton';
export { IconButton };
