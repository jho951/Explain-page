import React from 'react';
import clsx from 'clsx';

import { IconButton } from '@/components/molecules/IconButton';
import { RemovableTagProps } from '@/components/molecules/RemovableTag/RemoveableTag.types';

import styles from '@/components/molecules/RemovableTag/RemoveableTag.module.css';

/**
 * @file RemovableTag.tsx
 * @description
 * 삭제(×) 버튼이 포함된 RemovableTag 컴포넌트입니다.
 * - Tag(뱃지/칩) 스타일에 삭제(X) 버튼을 추가해, 태그/필터/입력값 등을 리스트에서 쉽게 제거할 수 있습니다.
 * - onRemove 콜백으로 삭제 로직을 연결할 수 있습니다.
 *
 * @usage
 * ```tsx
 * <RemovableTag onRemove={() => alert('React 태그 삭제!')}>React</RemovableTag>
 * <RemovableTag color="danger" onRemove={...}>긴급</RemovableTag>
 * ```
 *
 * @prop {'default'|'primary'|'secondary'|'danger'} [color='default'] - 컬러 테마
 * @prop {ReactNode} children - 태그 표시 텍스트/내용
 * @prop {() => void} onRemove - 삭제 버튼 클릭 시 호출할 콜백(필수)
 * @prop {boolean} [active] - 선택/강조 스타일(옵션)
 */
function RemovableTag({ active, color = 'default', children, onRemove }: RemovableTagProps) {
  return (
    <span className={clsx(styles.tag, styles[color], { [styles.active]: active })}>
      {children}
      <IconButton
        icon="close"
        iconSize={10}
        type="button"
        className={styles.removeButton}
        aria-label="태그 삭제"
        onClick={onRemove}
      />
    </span>
  );
}

export { RemovableTag };
