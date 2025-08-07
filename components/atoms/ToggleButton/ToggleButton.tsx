'use client';

import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import { BaseButton } from '@/components/atoms/BaseButton';
import { ToggleButtonProps } from '@/components/atoms/ToggleButton';
import styles from '@/components/atoms/ToggleButton/ToggleButton.module.css';

/**
 * ToggleButton (토글 버튼: Atoms)
 *
 * - controlled, uncontrolled(내부 상태) 모두 지원
 * - `role="switch"` + `aria-checked` 접근성 표준 적용
 * - forwardRef로 포커스/테스트에 유리
 *
 * @example
 * // Uncontrolled
 * <ToggleButton onToggleChange={active => ...}>알림</ToggleButton>
 *
 * // Controlled
 * <ToggleButton toggled={isOn} onToggleChange={setOn}>알림</ToggleButton>
 *
 * @param {ToggleButtonProps} props
 */
const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    { toggled, defaultToggled, onToggleChange, onClick, className, disabled, children, ...props },
    ref,
  ) => {
    const isControlled = toggled !== undefined;
    const [internalToggled, setInternalToggled] = useState(!!defaultToggled);
    const active = isControlled ? toggled : internalToggled;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (!isControlled) setInternalToggled(v => !v);
      onToggleChange?.(!active);
      onClick?.(e);
    };

    return (
      <BaseButton
        className={clsx(styles.toggleBtnConatiner, active && styles.active, className)}
        ref={ref}
        type="button"
        aria-checked={active}
        role="switch"
        disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {children}
      </BaseButton>
    );
  },
);

ToggleButton.displayName = 'ToggleButton';
export { ToggleButton };
