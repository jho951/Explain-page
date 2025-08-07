import React from 'react';

import { IconButton } from '@/components/molecules/IconButton';
import { StepperButtonProps } from '@/components/molecules/StepperButton';

import styles from '@/components/molecules/StepperButton/StepperButton.module.css';

/**
 * @file StepperButton.tsx
 * @description
 * + / - 버튼으로 값을 증감시키는 molecule 컴포넌트입니다.
 * - min/max/step 제한, 비활성(disabled), 접근성 모두 지원
 *
 * @usage
 * <StepperButton value={qty} min={1} max={10} step={1} onChange={setQty} />
 *
 * @prop {number} value - 현재 값(필수)
 * @prop {number} [min] - 최소값(기본값: MIN_SAFE_INTEGER)
 * @prop {number} [max] - 최대값(기본값: MAX_SAFE_INTEGER)
 * @prop {number} [step] - 증감 단위(기본값: 1)
 * @prop {(value: number) => void} onChange - 값 변경 핸들러(필수)
 * @prop {boolean} [disabled] - 전체 비활성화
 */

const StepperButton: React.FC<StepperButtonProps> = ({
  value,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  onChange,
  disabled = false,
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - step);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + step);
    }
  };

  return (
    <div className={styles.stepperBtnContainer}>
      <IconButton
        icon="minus"
        iconSize={24}
        aria-label="감소"
        onClick={handleDecrease}
        disabled={disabled || value <= min}
      />
      <span className={styles.stepperBtnValue}>{value}</span>
      <IconButton
        icon="plus"
        iconSize={24}
        aria-label="증가"
        onClick={handleIncrease}
        disabled={disabled || value >= max}
      />
    </div>
  );
};

export default StepperButton;
