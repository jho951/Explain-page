'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';

import { BaseButton } from '@/components/atoms/BaseButton';
import { SegmentButtonProps } from '@/components/atoms/SegmentButton';
import styles from '@/components/molecules/button/segment/SegmentButton.module.css';

/**
 * SegmentedButton (BaseButton 확장)
 * @see Atoms/SegmentedButton
 */
const SegmentButton = forwardRef<HTMLButtonElement, SegmentButtonProps>(
  (
    {
      children,
      isActive,
      isLoading = false,
      onSelect,
      variant = 'secondary',
      size = 'md',
      className,
      leftIcon,
      rightIcon,
      ...rest
    },
    ref,
  ) => (
    <BaseButton
      className={clsx(styles.segmentBtnConatiner, isActive && styles.active, className)}
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={onSelect}
      variant={variant}
      size={size}
      isLoading={isLoading}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      {...rest}
    >
      <span>{children}</span>
    </BaseButton>
  ),
);

SegmentButton.displayName = 'SegmentButton';
export default SegmentButton;
