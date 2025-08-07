import React, { forwardRef } from 'react';
import clsx from 'clsx';

import { BaseInputProps } from '@/components/atoms/BaseInput';
import styles from '@/components/atoms/BaseInput/BaseInput.module.css';

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ errorMessage, className, id, inputSize = 'md', ...props }, ref) => (
    <div className={styles.inputContainer}>
      <input
        id={id}
        ref={ref}
        className={clsx(styles.input, styles[inputSize], className, {
          [styles.error]: !!errorMessage,
        })}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${id}-error` : undefined}
        {...props}
      />
      {errorMessage && (
        <p id={`${id}-error`} className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  ),
);

BaseInput.displayName = 'BaseInput';
export { BaseInput };
