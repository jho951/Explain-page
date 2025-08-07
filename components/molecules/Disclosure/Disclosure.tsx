'use client';

import clsx from 'clsx';

import { DisclosureFieldProps } from '@/components/molecules/Disclosure';
import styles from '@/components/molecules/Disclosure/Disclosure.module.css';

/**
 * DisclosureField
 *
 * 조건에 따라 입력 필드나 섹션을 점진적으로 공개하는 컴포넌트
 *
 * @component
 * @example
 * <DisclosureField condition={isEmployed}>
 *   <BaseInput id="company" placeholder="회사명" />
 * </DisclosureField>
 */
function DisclosureField({
  condition,
  children,
  animated = true,
  className,
}: DisclosureFieldProps) {
  if (!condition) return null;

  return (
    <div className={clsx(styles.disclosed, animated && styles.animated, className)}>{children}</div>
  );
}

export { DisclosureField };
