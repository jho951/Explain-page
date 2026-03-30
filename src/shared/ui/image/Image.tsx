'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import NextImage from 'next/image';
import clsx from 'clsx';
import { BLUR_DATA_URL, FALL_BACK_IMAGE } from './Image.constants';
import type { ImageProps } from './Image.types';
import styles from '@/shared/ui/image/Image.module.css';

const Image = ({
  src,
  alt,
  className,
  fill,
  width,
  height,
  placeholder = 'empty',
  blurDataURL,
  loading = 'lazy',
  sizes,
  priority = false,
  unoptimized = false,
  fallbackSrc = FALL_BACK_IMAGE,
  containerClassName,
  containerStyle,
  aspectRatio,
  showSkeleton = true,
  onLoad,
  onError,
  ...rest
}: ImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const shouldFill = Boolean(fill || !width || !height);
  const finalSrc = !src || hasError ? fallbackSrc : src;
  const resolvedAspectRatio = aspectRatio ?? (width && height ? `${width}/${height}` : '16/9');
  const resolvedLoading = priority ? undefined : loading;
  const figureStyle = useMemo(
    () => (shouldFill ? { aspectRatio: resolvedAspectRatio, ...containerStyle } : containerStyle),
    [containerStyle, resolvedAspectRatio, shouldFill],
  );

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError: NonNullable<ImageProps['onError']> = useCallback(
    event => {
      if (!hasError && finalSrc !== fallbackSrc) {
        setHasError(true);
        setIsLoaded(false);
      }
      onError?.(event);
    },
    [fallbackSrc, finalSrc, hasError, onError],
  );

  const handleLoad: NonNullable<ImageProps['onLoad']> = useCallback(
    event => {
      setIsLoaded(prev => (prev ? prev : true));
      onLoad?.(event);
    },
    [onLoad],
  );

  return (
    <figure
      className={clsx(
        styles.imageContainer,
        showSkeleton && !isLoaded && styles.skeleton,
        containerClassName,
      )}
      style={figureStyle}
    >
      <NextImage
        className={clsx(styles.image, isLoaded && styles.loaded, className)}
        src={finalSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? (blurDataURL ?? BLUR_DATA_URL) : undefined}
        loading={resolvedLoading}
        unoptimized={unoptimized}
        sizes={sizes ?? (shouldFill ? '100vw' : undefined)}
        priority={priority}
        {...(shouldFill ? { fill: true } : { width, height })}
        {...rest}
      />
    </figure>
  );
};

const MemoizedImage = memo(Image);
export { MemoizedImage as Image };
