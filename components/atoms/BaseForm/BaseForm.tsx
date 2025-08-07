'use client';

import clsx from 'clsx';
import { BaseFormProps } from '@/components/atoms/BaseForm';
import styles from '@/components/atoms/BaseForm/BaseForm.module.css';

/**
 * 재사용 가능한 Form 컴포넌트
 *
 * @param onSubmit - 폼 제출 시 실행할 콜백
 * @param children - 내부에 렌더링될 입력 컴포넌트들
 * @param className - 커스텀 클래스 이름
 */
function BaseForm({ children, onSubmit, className, ...rest }: BaseFormProps) {
  return (
    <form onSubmit={onSubmit} className={clsx(styles.container, className)} noValidate {...rest}>
      {children}
    </form>
  );
}
export { BaseForm };
