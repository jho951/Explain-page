'use client';

import clsx from 'clsx';
import { BaseLabelProps } from '@/components/atoms/BaseLabel';
import styles from '@/components/atoms/BaseLabel/BaseLabel.module.css';

/**
 * 공통 BaseLabel 컴포넌트 - 다양한 variant 지원
 */
function BaseLabel({
  children,
  htmlFor,
  required = false,
  variant = 'default',
  className,
  ...props
}: BaseLabelProps) {
  return (
    <label htmlFor={htmlFor} className={clsx(styles.label, styles[variant], className)} {...props}>
      {children}
      {required && <span className={styles.required}> *</span>}
    </label>
  );
}

export { BaseLabel };
