/**
 * @file SectionTitle.tsx
 * @description
 * 섹션/페이지의 타이틀+설명을 표시하는 molecule 컴포넌트입니다.
 * - 레이아웃(정렬/방향) 옵션과 추가 클래스 확장을 지원합니다.
 *
 * @usage
 * ```tsx
 * <SectionTitle
 *   title="회원가입"
 *   desc="서비스 이용을 위해 정보를 입력해주세요"
 *   align="center"
 *   direction="column"
 * />
 * ```
 *
 * @prop {ReactNode} title - 타이틀(필수)
 * @prop {ReactNode} [desc] - 부가 설명(옵션)
 * @prop {'left'|'center'|'right'} [align="center"] - 텍스트/레이아웃 정렬
 * @prop {'column'|'row'|'column-reverse'|'row-reverse'} [direction="column"] - 레이아웃 방향
 * @prop {string} [className] - 추가 CSS 클래스
 */

import React from 'react';
import clsx from 'clsx';

import { SectionTitleProps } from '@/components/molecules/SectionTitle';
import styles from '@/components/molecules/SectionTitle/SectionTitle.module.css';

function SectionTitle({
  title,
  desc,
  align = 'center',
  direction = 'column',
  className,
}: SectionTitleProps) {
  return (
    <section className={clsx(styles.sectionTitle, styles[align], styles[direction], className)}>
      {title}
      {desc}
    </section>
  );
}

export { SectionTitle };
