import React, { Children, cloneElement, isValidElement } from 'react';
import clsx from 'clsx';

import { SegmentButtonProps } from '@/components/atoms/SegmentButton';
import { SegmentButtonGroupProps } from '@/components/molecules/SegmentButtonGroup';

import styles from '@/components/molecules/SegmentButtonGroup/SegmentButtonGroup.module.css';

/**
 * @file SegmentButtonGroup.tsx
 * @description
 * 여러 개의 SegmentButton(세그먼트/토글 버튼)을 그룹으로 묶어,
 * 한 번에 단일(혹은 멀티) 선택 상태를 관리하는 컴포넌트입니다.
 * 라디오그룹 역할(role="radiogroup") 및 키보드 접근성(좌우/탭)까지 대응 가능합니다.
 *
 * @usage
 * ```tsx
 * <SegmentButtonGroup value={selected} onChange={setSelected}>
 *   <SegmentButton value="day">일간</SegmentButton>
 *   <SegmentButton value="week">주간</SegmentButton>
 *   <SegmentButton value="month">월간</SegmentButton>
 * </SegmentButtonGroup>
 * ```
 *
 * @prop {string} value - 현재 선택된 값
 * @prop {(value: string) => void} onChange - 선택 값 변경 핸들러
 * @prop {ReactNode} children - SegmentButton 컴포넌트 리스트
 * @prop {string} [className] - 추가 클래스명
 */

export function SegmentButtonGroup({
  value,
  onChange,
  children,
  className,
}: SegmentButtonGroupProps) {
  return (
    <div className={clsx(styles.segmentGroupContainer, className)} role="radiogroup">
      {Children.map(children, child => {
        if (!isValidElement<SegmentButtonProps>(child)) return child;

        return cloneElement(child, {
          isActive: child.props.value === value,
          onSelect: () => onChange(child.props.value),
        });
      })}
    </div>
  );
}
