'use client';

import { forwardRef } from 'react';

import { BaseButton } from '@/components/atoms/BaseButton';
import { Spinner } from '@/components/atoms/Spinner';

import { ActionButtonProps } from '@/components/atoms/ActionButton';

/**
 * ActionButton (아토믹 디자인: Atoms)
 *
 * 실무에서 가장 많이 사용하는 "액션 버튼" 역할의 컴포넌트입니다.
 * `isLoading` 상태를 지원하며, loading 시 Spinner를 보여줍니다.
 * BaseButton을 감싸서 확장하므로 variant, size, 아이콘 등 모든 속성 지원.
 *
 * @component
 * @example
 * // 기본 사용법
 * <ActionButton>저장</ActionButton>
 *
 * // 프라이머리/세컨더리 등 다양한 스타일
 * <ActionButton variant="secondary" size="lg">
 *   더 알아보기
 * </ActionButton>
 *
 * // 로딩 상태 (비동기 처리)
 * <ActionButton isLoading>처리중...</ActionButton>
 *
 * // 아이콘과 함께 사용 (BaseButton의 leftIcon/rightIcon 활용)
 * <ActionButton leftIcon={<Icon name="add" />}>추가</ActionButton>
 *
 * // ref 활용
 * <ActionButton ref={btnRef}>포커스 이동</ActionButton>
 *
 * @param {ActionButtonProps} props - 버튼 속성 (BaseButton의 모든 속성 상속)
 * @param {React.Ref<HTMLButtonElement>} ref - 버튼 엘리먼트 참조
 * @returns {JSX.Element} 사용자 액션을 위한 버튼 컴포넌트
 */
const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ isLoading, children, ...rest }, ref) => (
    <BaseButton ref={ref} {...rest} disabled={isLoading || rest.disabled}>
      {isLoading ? <Spinner /> : children}
    </BaseButton>
  ),
);

ActionButton.displayName = 'ActionButton';

export { ActionButton };
