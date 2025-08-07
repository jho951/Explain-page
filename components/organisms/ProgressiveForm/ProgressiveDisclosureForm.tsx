'use client';

import { useState } from 'react';

import styles from '@/styles/disclosure/ProgressiveForm.module.css';

import { DisclosureField } from '@/components/molecules/Disclosure/Disclosure';
import { BaseForm } from '@/components/atoms/BaseForm';
import { ActiveInput } from '@/components/atoms/ActiveInput';
import { ActionButton } from '@/components/atoms/ActionButton';

/**
 * ProgressiveDisclosureForm
 *
 * 사용자 상호작용에 따라 입력 필드를 점진적으로 표시하는 폼 컴포넌트 예시입니다.
 * 조건부 렌더링으로 입력 부담을 줄이고 UX를 향상시킵니다.
 */
function ProgressiveDisclosureForm() {
  const [isEmployed, setIsEmployed] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('제출되었습니다!');
  };

  return (
    <BaseForm onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Progressive Disclosure Form</h2>

      <ActiveInput id="name" placeholder="이름" required />

      <label className={styles.toggleSection}>
        <input
          type="checkbox"
          checked={isEmployed}
          onChange={e => setIsEmployed(e.target.checked)}
        />
        직장인이신가요?
      </label>

      <DisclosureField condition={isEmployed}>
        <ActiveInput id="company" placeholder="회사명" required />
        <ActiveInput id="jobTitle" placeholder="직책" required />
      </DisclosureField>

      <button
        type="button"
        onClick={() => setShowPhone(prev => !prev)}
        className={styles.linkButton}
      >
        {showPhone ? '연락처 숨기기' : '추가 연락처 입력'}
      </button>

      <DisclosureField condition={showPhone}>
        <ActiveInput id="phone" placeholder="연락처 (선택)" />
      </DisclosureField>

      <ActionButton type="submit">제출하기</ActionButton>
    </BaseForm>
  );
}

export default ProgressiveDisclosureForm;
