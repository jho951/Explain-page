import React from 'react';
import { BaseCheckboxProps } from '@/components/atoms/BaseCheckbox';

/**
 * 완전 네이티브용 Checkbox Atom 컴포넌트입니다.
 * - <input type="checkbox" />만 담당
 * - 스타일/레이블/에러 등은 따로 조합해서 사용
 * - forwardRef 지원 (폼 라이브러리 연동시 필요)
 */
const BaseCheckbox = React.forwardRef<HTMLInputElement, BaseCheckboxProps>(
  function BaseCheckbox(props, ref) {
    return <input type="checkbox" ref={ref} {...props} />;
  },
);

export { BaseCheckbox };
