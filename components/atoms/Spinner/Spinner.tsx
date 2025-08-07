import React from 'react';
import clsx from 'clsx';

import { Icon } from '@/components/atoms/Icon';
import { SpinnerProps } from '@/components/atoms/Spinner';

import styles from '@/components/atoms/Spinner/Spinner.module.css';

/**
 * @file Spinner.tsx
 * @description
 * Icon SVG 스피너를 불러와 회전 애니메이션을 주는 Atom 컴포넌트입니다.
 *
 * @usage
 * ```tsx
 * <Spinner />
 * <Spinner size={32} className="custom-spinner" />
 * ```
 *
 * @prop {number} [size=24] - 아이콘 크기(px)
 * @prop {string} [className] - 추가 클래스명
 */

function Spinner({ size = 24, className }: SpinnerProps) {
  return (
    <span className={clsx(styles.spinner, className)} aria-hidden="true">
      <Icon name="spinner" size={size} />
    </span>
  );
}

export { Spinner };
