'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import clsx from 'clsx';

import { ImageProps } from '@/components/atoms/Image';

import { BLUR_DATA_URL, FALL_BACK_IMAGE } from '@/constants/image';

import styles from '@/components/atoms/Image/Image.module.css';

/**
 * 범용 이미지 컴포넌트(Image)
 *
 * Next.js의 Image 컴포넌트 래퍼로,
 * - 에러 발생 시 fallback 이미지 자동 처리
 * - 로딩 상태 및 skeleton 스타일 지원
 * - placeholder, blur, sizes 등 Next Image 고급 기능 대응
 * - fill 여부, width/height 자동 분기
 *
 * @component
 * @param {ImageProps} props - 이미지 컴포넌트 속성
 * @param {string} props.src - 이미지 소스(URL)
 * @param {string} props.alt - 대체 텍스트(접근성 필수)
 * @param {string} [props.className] - 추가 CSS 클래스
 * @param {boolean} [props.fill] - 부모 영역을 가득 채울지 여부
 * @param {string} [props.placeholder] - Next.js 이미지 placeholder 전략
 * @param {number} [props.width] - 이미지 너비 (fill=false일 때만)
 * @param {number} [props.height] - 이미지 높이 (fill=false일 때만)
 * @param {string} [props.loading='lazy'] - lazy, eager 등 로딩 전략
 * @param {boolean} [props.unoptimized] - 최적화 비활성화 플래그
 * @param {string} [props.sizes='100vw'] - sizes 속성
 * @param {boolean} [props.priority] - Next.js 우선 로딩 플래그
 * @param {...object} [props.rest] - 기타 Next.js Image에 전달할 속성들
 *
 * @example
 * // 일반 사용
 * <Image src="/profile.jpg" alt="프로필" width={120} height={120} />
 *
 * // fill 모드
 * <Image src="/banner.jpg" alt="배너" fill className="rounded-lg" />
 *
 * // 오류 발생 시 fallback 처리
 * <Image src="/not-exist.jpg" alt="대체" />
 */
function Image({ src, alt, className, fill, placeholder, ...rest }: ImageProps) {
  /**
   * 이미지 로딩 에러 감지 상태
   * @type {boolean}
   */
  const [hasError, setHasError] = useState(false);

  /**
   * 이미지 로딩 완료 여부 (skeleton 표시용)
   * @type {boolean}
   */
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * 실제로 사용할 이미지 src (에러 또는 빈 src 시 fallback 이미지로 대체)
   * @type {string}
   */
  const finalSrc = !src || hasError ? FALL_BACK_IMAGE : src;

  /**
   * 이미지 에러 발생 시 fallback 처리 함수
   */
  const handleError = () => {
    if (!hasError) setHasError(true);
  };

  return (
    <figure className={clsx(styles.ImageContainer, !isLoaded && styles.skeleton, className)}>
      <NextImage
        className={clsx(styles.image, isLoaded && styles.loaded, className)}
        src={finalSrc}
        alt={alt}
        onError={handleError}
        onLoadingComplete={() => setIsLoaded(true)}
        placeholder={placeholder}
        blurDataURL={BLUR_DATA_URL}
        loading={rest.loading ?? 'lazy'}
        unoptimized={rest.unoptimized ?? false}
        sizes={rest.sizes ?? '100vw'}
        priority={rest.priority ?? false}
        {...(fill ? { fill: true } : { width: rest.width, height: rest.height })}
        {...rest}
      />
    </figure>
  );
}

export { Image };
