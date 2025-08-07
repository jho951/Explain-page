'use client';

import React from 'react';
import clsx from 'clsx';

import { BaseCard, FormCardProps } from '@/components/atoms/BaseCard';
import styles from '@/styles/card/FormCard.module.css';

/**
 *
 * 입력 폼을 카드 레이아웃으로 구성한 컴포넌트입니다.
 * 로그인, 구독 신청, 피드백 작성 등 사용자 입력 UI에 적합합니다.
 *
 * @param children - 폼 입력 요소들
 * @param className - 추가 클래스
 */

/**
 * @component
 * @example
 * <FormCard title="로그인" description="이메일과 비밀번호를 입력해주세요." footer={<button type="submit">로그인</button>}>
 *  <LabeledInput id="email" label="이메일" type="email" required />
 *  <LabeledInput id="password" label="비밀번호" type="password" required />
 * </FormCard>
 */
function FormCard({ children, className }: FormCardProps) {
  return (
    <BaseCard className={clsx(styles.container, className)}>
      <div className={styles.wrap}>{children}</div>
    </BaseCard>
  );
}

export default FormCard;
