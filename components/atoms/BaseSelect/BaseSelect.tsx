import React from 'react';
import clsx from 'clsx';
import { BaseSelectProps } from '@/components/atoms/BaseSelect';
import styles from '@/components/atoms/BaseSelect/BaseSelect.module.css';

/**
 * @file BaseSelect.tsx
 * @description
 * - 네이티브 <select>용 Atom 컴포넌트
 * - label, error, className 등 프리젠테이션 prop 지원
 * - 옵션 배열/children 모두 지원
 */
export const BaseSelect = React.forwardRef<HTMLSelectElement, BaseSelectProps>(function BaseSelect(
  { label, errorMessage, options, children, id, className, ...props },
  ref,
) {
  return (
    <div className={clsx(styles.container, className)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={clsx(styles.select, { [styles.error]: !!errorMessage })}
        aria-invalid={!!errorMessage}
        {...props}
      >
        {options
          ? options.map(opt => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      {errorMessage && (
        <span className={styles.errorMessage} role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
});
