'use client';

import { useRef, useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { FlickingProps } from '@/components/molecules/Flicking';

import { useDeviceType } from '@/hooks/useDevice';
import { useScrollSyncIndex } from '@/hooks/useScroll';
import { usePersistentIndex } from '@/hooks/usePersistentIndex';

import styles from '@/components/molecules/Flicking/Flicking.module.css';
import { Icon } from '@/components/atoms/Icon';

function Flicking({
  children,
  autoSlideInterval = 3000,
  storageKey = 'flicking-index',
  arrowVisibility = 'all',
  pagination = false,
}: FlickingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const length = children.length;

  const [index, setIndex] = usePersistentIndex(storageKey, length);
  const [isPaused, setIsPaused] = useState(false);
  const { isMobile } = useDeviceType();

  // 🔄 슬라이드 인덱스 동기화
  useScrollSyncIndex(containerRef, setIndex, 150);

  // ▶ 자동 슬라이드 (index 클로저 최적화)
  useEffect(() => {
    if (isPaused || !containerRef.current) return;

    const container = containerRef.current;
    const interval = setInterval(() => {
      setIndex(prev => {
        const next = (prev + 1) % length;
        container.scrollTo({
          left: container.offsetWidth * next,
          behavior: 'smooth',
        });
        return next;
      });
    }, autoSlideInterval);

    const stop = () => clearInterval(interval);
    container.addEventListener('touchstart', stop);
    container.addEventListener('mousedown', stop);
    container.addEventListener('wheel', stop);

    return () => {
      clearInterval(interval);
      container.removeEventListener('touchstart', stop);
      container.removeEventListener('mousedown', stop);
      container.removeEventListener('wheel', stop);
    };
  }, [length, autoSlideInterval, isPaused, setIndex]);

  // 🔍 inView 애니메이션 (unobserve 최적화)
  useEffect(() => {
    const slides = containerRef.current?.children;
    if (!slides) return;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.3 },
    );

    for (const slide of slides) {
      observer.observe(slide);
    }

    return () => observer.disconnect();
  }, []);

  // 📏 ResizeObserver 디바운스 적용
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = debounce(() => {
      container.scrollTo({
        left: container.offsetWidth * index,
        behavior: 'auto',
      });
    }, 100);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      handleResize.cancel?.();
    };
  }, [index]);

  const scrollByAmount = (amount: number) => {
    containerRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const showArrow =
    (arrowVisibility === 'all' ||
      (arrowVisibility === 'mobile' && isMobile) ||
      (arrowVisibility === 'desktop' && !isMobile)) &&
    length > 1;

  return (
    <section className={styles.flickingSection}>
      <div className={styles.scrollControls}>
        {showArrow && (
          <button
            aria-label="Scroll Left"
            className={styles.scrollButton}
            onClick={() => scrollByAmount(-240)}
          >
            <Icon name="arrow" size={20} className={styles.leftArrow} />
          </button>
        )}

        <div
          className={styles.flickingWrapper}
          ref={containerRef}
          tabIndex={0}
          role="region"
          aria-label="슬라이드 콘텐츠"
          onKeyDown={e => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              scrollByAmount(-240);
            }
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              scrollByAmount(240);
            }
          }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className={styles.slide}
              data-testid={`slide-${i}`}
              role="group"
              aria-label={`슬라이드 ${i + 1} / ${length}`}
            >
              {child}
            </div>
          ))}
        </div>

        {showArrow && (
          <button
            aria-label="Scroll Right"
            className={styles.scrollButton}
            onClick={() => scrollByAmount(240)}
          >
            <Icon name="arrow" size={20} />
          </button>
        )}
      </div>

      {pagination && (
        <div className={styles.pagination}>
          <button
            onClick={() => setIsPaused(p => !p)}
            className={styles.playPauseButton}
            aria-label={isPaused ? '재생' : '일시정지'}
            aria-pressed={isPaused}
          >
            <Icon name={isPaused ? 'play' : 'pause'} size={20} />
          </button>

          <span className={styles.rangeText}>
            <Icon name="arrow" size={10} /> {index + 1} - {Math.min(index + 5, length)}
            <Icon name="arrow" size={10} />
          </span>

          <div className={styles.paginationDots}>
            {Array.from({ length }).map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${index === i ? styles.active : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`슬라이드 ${i + 1}`}
                aria-current={index === i}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export { Flicking };
