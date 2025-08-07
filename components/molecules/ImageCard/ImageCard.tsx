'use client';

import React from 'react';
import clsx from 'clsx';

import { Image } from '@/components/atoms/Image';
import { BaseCard } from '@/components/atoms/BaseCard';
import { ImageCardProps } from '@/components/molecules/ImageCard';
import styles from '@/components/molecules/ImageCard/ImageCard.module.css';

/**
 * 이미지 기반 카드 컴포넌트
 *
 * 썸네일 또는 비주얼 중심의 카드에 사용됩니다.
 * @param imageSrc - 카드 섬네일 이미지
 * @param alt - 이미지 설명
 * @param title - 카드 상단 제목
 * @param description - 부제목 또는 설명
 * @param children - 폼 입력 요소들
 * @param className - 추가 클래스
 */

/**
 * @example
 * <ImageCard
 *   imageSrc="/images/sample.jpg"
 *   alt="샘플 이미지"
 *   title="카드 제목"
 *   description="설명 텍스트"
 * >
 *   <Button>더 보기</Button>
 * </ImageCard>
 */
function ImageCard({
  imageSrc,
  alt = '',
  title,
  description,
  children,
  className,
}: ImageCardProps) {
  return (
    <BaseCard className={clsx(styles.card, className)}>
      <Image src={imageSrc} alt={alt} className={styles.image} fill />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {children && <div className={styles.footer}>{children}</div>}
      </div>
    </BaseCard>
  );
}

export default ImageCard;
