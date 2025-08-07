/**
 * @file Tag.tsx
 * @description
 * 범용 Tag(뱃지/칩) 컴포넌트입니다.
 * - 카테고리, 속성, 상태 등 강조용 UI에 사용합니다.
 * - active(선택/강조), removable(삭제), color 스타일 등 다양한 옵션을 지원합니다.
 *
 * @usage
 * ```tsx
 * <Tag>React</Tag>
 * <Tag color="danger">긴급</Tag>
 * <Tag active>선택됨</Tag>
 * <Tag removable onRemove={() => alert('삭제!')}>삭제가능</Tag>
 * ```
 *
 * @prop {boolean} [active] - 활성(선택됨/강조) 스타일 여부
 * @prop {'default'|'primary'|'secondary'|'danger'} [color='default'] - 컬러 테마
 * @prop {ReactNode} children - 태그 표시 텍스트/내용
 */

import React from 'react';
import clsx from 'clsx';

import { TagProps } from '@/components/atoms/Tag';
import styles from '@/components/atoms/Tag/Tag.module.css';

function Tag({ active, color = 'default', children }: TagProps) {
  return (
    <span className={clsx(styles.tag, styles[color], { [styles.active]: active })}>{children}</span>
  );
}

export { Tag };
