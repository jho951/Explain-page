'use client';

import React from 'react';
import clsx from 'clsx';

import { SegmentedGroupProps } from '@/components/organisms/group';
import styles from '@/organisms/group/SegmentedGroup.module.css';
import SegmentButton from '@/components/atoms/SegmentButton/SegmentButton';

/**
 * SegmentGroup (세그먼트 버튼 묶음, 아토믹 디자인: Molecules)
 *
 * 여러 개의 SegmentButton(세그먼트 버튼)을 그룹핑해 라디오형 옵션 UI를 구현합니다.
 * (토글·필터·탭·카테고리 선택 등 모두 대응)
 *
 * @example
 * ```tsx
 * <SegmentGroup
 *   options={[
 *     { value: 'all', label: '전체' },
 *     { value: 'active', label: '활성' },
 *     { value: 'inactive', label: '비활성' },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * ```
 *
 * @param {SegmentedGroupProps} props - 옵션 배열, 현재 선택값, 변경 핸들러, variant, size 등
 * @returns {JSX.Element}
 *
 * @see SegmentButton (Atom)
 */

const SegmentGroup = ({
  options,
  value,
  onChange,
  variant = 'secondary',
  size = 'md',
  className,
}: SegmentedGroupProps) => {
  return (
    <div className={clsx(styles.segmentedGroup, className)} role="radiogroup">
      {options.map(option => (
        <SegmentButton
          key={option.value}
          isActive={value === option.value}
          isLoading={option.isLoading}
          onSelect={() => onChange(option.value)}
          variant={variant}
          size={size}
          leftIcon={option.leftIcon}
          rightIcon={option.rightIcon}
          value={''}
        >
          {option.label}
        </SegmentButton>
      ))}
    </div>
  );
};

export default SegmentGroup;
