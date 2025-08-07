'use client';

import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import clsx from 'clsx';

import { TextareaProps } from '@/components/atoms/Textarea';
import styles from '@/components/atoms/Textarea/Textarea.module.css';

/**
 * @file Textarea.tsx
 * @description
 * 자동 높이 조절이 가능한 기본 textarea atom 컴포넌트입니다.
 * - value 변경 시 자동으로 높이가 조절됩니다.
 * - 외부 ref forwarding, className 커스텀, autoResize 옵션 지원
 *
 * @usage
 * <Textarea value={text} onChange={e => setText(e.target.value)} autoResize />
 *
 * @prop {boolean} [autoResize=true] - 값이 변경될 때마다 높이 자동 조절
 * @prop {string} [className] - 추가 클래스명
 * @prop {...TextareaProps} 기타 textarea 속성 확장 지원
 */

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ autoResize = true, className, ...props }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement, []);

    useEffect(() => {
      if (!autoResize || !innerRef.current) return;
      const textarea = innerRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }, [props.value, autoResize]);

    return (
      <textarea
        ref={innerRef}
        className={clsx(styles.textarea, { [styles.autoResize]: autoResize }, className)}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
export { Textarea };
