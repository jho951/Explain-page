import React, { useState, forwardRef, useCallback, FocusEvent } from 'react';
import clsx from 'clsx';

import { BaseInput, BaseInputProps } from '@/components/atoms/BaseInput';

/**
 * ActiveInput 컴포넌트
 *
 * - BaseInput을 래핑하여, 포커스 또는 입력값이 존재할 때 'active' 클래스를 동적으로 추가해주는 컴포넌트입니다.
 * - 활성화(포커스 or 값 있음) 상태를 자동으로 감지하여, CSS로 스타일 변화(테두리 강조, 배경 변화 등)에 사용할 수 있습니다.
 * - 기존 BaseInput의 모든 props와 기능(에러 메시지, 크기, aria 등)을 그대로 지원합니다.
 * - 커스텀 className, value, defaultValue, onFocus/onBlur/onChange 핸들러도 모두 확장 가능합니다.
 *
 * @component
 * @example
 * // 기본 사용법
 * <ActiveInput id="email" placeholder="이메일 입력" />
 *
 * @example
 * // 컨트롤드 컴포넌트로 사용
 * const [value, setValue] = useState('');
 * <ActiveInput
 *   id="password"
 *   type="password"
 *   value={value}
 *   onChange={e => setValue(e.target.value)}
 * />
 *
 * @param {BaseInputProps} props - BaseInput에서 상속된 input 관련 props
 * @param {string} [props.className] - 사용자 정의 클래스명(기존 클래스와 합쳐짐)
 * @param {string} [props.value] - 입력 값(컨트롤드)
 * @param {string} [props.defaultValue] - 초기 입력 값(언컨트롤드)
 * @param {(e) => void} [props.onFocus] - 포커스 진입 시 콜백
 * @param {(e) => void} [props.onBlur] - 포커스 해제 시 콜백
 * @param {(e) => void} [props.onChange] - 입력 값 변경 시 콜백
 *
 * @returns {JSX.Element} 활성화 상태(className='active')가 자동 부여되는 BaseInput 컴포넌트
 */
const ActiveInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, onFocus, onBlur, onChange, value, defaultValue, ...props }, ref) => {
    const [isActive, setIsActive] = useState(false);
    const [hasValue, setHasValue] = useState(!!(value ?? defaultValue));

    // focus/blur 핸들러
    const handleFocus = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        setIsActive(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        setIsActive(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(e.target.value.length > 0);
        onChange?.(e);
      },
      [onChange],
    );

    return (
      <BaseInput
        ref={ref}
        className={clsx(className, {
          active: isActive || hasValue,
        })}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        defaultValue={defaultValue}
        {...props}
      />
    );
  },
);

ActiveInput.displayName = 'ActiveInput';
export { ActiveInput };
